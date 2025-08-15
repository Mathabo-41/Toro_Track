import { supabase } from '@/lib/supabaseClient';

/**
 * Fetch all clients from Supabase
 */
export async function fetchClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Delete a client by ID
 */
export async function deleteClient(id) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

/**
 * Update a client’s status
 */
export async function updateClientStatus(id, status) {
  const { error } = await supabase
    .from('clients')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
  return true;
}
