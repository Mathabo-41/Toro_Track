// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

/**
 * Fetches all queries for the currently authenticated client.
 * @returns {Promise<Array>} A promise that resolves with the list of queries.
 */
export async function fetchQueries() {
  const { data, error } = await supabase.rpc('get_client_queries_with_details');
  if (error) {
    console.error('Error fetching queries:', error);
    throw error;
  }
  return data;
}

/**
 * Submits a new query, handles an optional file upload, and links the file to the query.
 * @param {Object} queryData - The query data from the form.
 * @param {File} fileToUpload - The file to be uploaded.
 * @returns {Promise<Object>} A promise that resolves with the newly created query data.
 */
export async function submitQuery(queryData, fileToUpload) {
  // Step 1: Submit the text-based query data to get a query ID.
  const { data: newQueryId, error: queryError } = await supabase.rpc('submit_new_query', {
    p_title: queryData.title,
    p_description: queryData.description,
    p_category: queryData.category,
  });

  if (queryError) {
    console.error('Error submitting query:', queryError);
    throw queryError;
  }

  // Step 2: If a file is attached, upload it to Supabase Storage.
  if (fileToUpload) {
    const clientResponse = await supabase.rpc('get_my_client_id');
    if (clientResponse.error) throw clientResponse.error;
    const clientId = clientResponse.data;
    
    const uniqueFileName = `${uuidv4()}-${fileToUpload.name}`;
    const filePath = `${clientId}/${uniqueFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('query-attachments')
      .upload(filePath, fileToUpload);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw uploadError;
    }

    // Step 3: Link the uploaded file to the query in the database.
    const { error: attachmentError } = await supabase.rpc('add_query_attachment', {
      p_query_id: newQueryId,
      p_file_name: fileToUpload.name,
      p_file_url: filePath,
      p_file_size_kb: Math.round(fileToUpload.size / 1024),
    });
    
    if (attachmentError) {
      console.error('Error linking attachment:', attachmentError);
      throw attachmentError;
    }
  }

  return { id: newQueryId, ...queryData };
}