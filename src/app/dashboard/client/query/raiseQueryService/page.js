// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { createSupabaseClient } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

/**
 * Fetches all queries for the currently authenticated client.
 * @returns {Promise<Array>} A promise that resolves with the list of queries.
 */
export async function fetchQueries() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc('get_client_queries_with_details');
  if (error) {
    console.error('Error fetching queries:', error);
    throw new Error(error.message || 'Failed to fetch queries.');
  }
  return data;
}

/**
 * Submits a new query, handles an optional file upload, and links the file to the query.
 * @param {Object} payload - The submission payload.
 * @param {string} payload.title - The query title.
 * @param {string} payload.description - The query description.
 * @param {string} payload.category - The query category.
 * @param {File} [payload.fileToUpload] - The optional file to be uploaded.
 * @returns {Promise<Object>} A promise that resolves with the newly created query data.
 */
export async function submitQuery(payload) {
  const { title, description, category, fileToUpload } = payload;
  const supabase = createSupabaseClient();

  try {
    // Step 1: Submit the text-based query data to get a query ID.
    const { data: newQueryId, error: queryError } = await supabase.rpc('submit_new_query', {
      p_title: title,
      p_description: description,
      p_category: category,
    });

    if (queryError) {
      throw new Error(queryError.message || 'An unknown error occurred while submitting the query.');
    }

    // Step 2: If a file is attached, upload it to Supabase Storage.
    if (fileToUpload) {
      const { data: clientId, error: clientError } = await supabase.rpc('get_my_client_id');
      if (clientError) {
        throw new Error(clientError.message || 'Could not identify client for file upload.');
      }
      
      const uniqueFileName = `${uuidv4()}-${fileToUpload.name}`;
      const filePath = `${clientId}/${uniqueFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('query-attachments')
        .upload(filePath, fileToUpload);

      if (uploadError) {
        throw new Error(uploadError.message || 'Failed to upload attachment.');
      }

      // Step 3: Link the uploaded file to the query in the database.
      const { error: attachmentError } = await supabase.rpc('add_query_attachment', {
        p_query_id: newQueryId,
        p_file_name: fileToUpload.name,
        p_file_url: filePath,
        p_file_size_kb: Math.round(fileToUpload.size / 1024),
      });
      
      if (attachmentError) {
        console.error('Failed to link attachment:', attachmentError);
        throw new Error(attachmentError.message || 'Failed to link attachment to the query.');
      }
    }

    return { id: newQueryId, ...payload };
  } catch (error) {
    console.error('Error in submitQuery service:', error);
    throw error;
  }
}