import { supabase } from '@/lib/supabaseClient';

// Fetch all queries for the currently authenticated client
export const fetchQueries = async () => {
  const { data, error } = await supabase
    .from('queries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching queries:', error.message);
    throw new Error('Could not fetch queries.');
  }

  return data;
};

// Create a new query with optional attachment
export const createQuery = async ({ title, category, description, attachment }) => {
  // 1. Get current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated.');
  }

  // 2. Find associated client record
  const {
    data: clientData,
    error: clientError,
  } = await supabase
    .from('clients')
    .select('id')
    .eq('created_by', user.id)
    .single();

  if (clientError || !clientData) {
    console.error('Error finding associated client:', clientError?.message);
    throw new Error('Could not find an associated client account for this user.');
  }

  // 3. Handle file upload if provided
  let attachment_url = null;
  let attachment_name = null;

  if (attachment) {
    const fileExt = attachment.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('query-attachments')
      .upload(fileName, attachment);

    if (uploadError) {
      console.error('Upload error:', uploadError.message);
      throw new Error('Failed to upload attachment.');
    }

    const { data: urlData, error: urlError } = supabase.storage
      .from('query-attachments')
      .getPublicUrl(fileName);

    if (urlError) {
      console.error('URL error:', urlError.message);
      throw new Error('Failed to retrieve attachment URL.');
    }

    attachment_url = urlData.publicUrl;
    attachment_name = attachment.name;
  }

  // 4. Insert new query record
  const { data, error } = await supabase
    .from('queries')
    .insert([
      {
        title,
        category,
        description,
        client_id: clientData.id,
        created_by: user.id,
        status: 'pending',
        attachment_url,
        attachment_name,
      },
    ])
    .select();

  if (error) {
    console.error('Error creating query:', error.message);
    throw new Error('Could not create the new query.');
  }

  return data;
};
