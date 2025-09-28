// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { createSupabaseClient } from '@/lib/supabase/client';

/*
  Maps the database status enum to the priority string used by the frontend.
*/
const mapDbToPriority = (status) => {
  const map = {
    premium: 'high',
    active: 'medium',
    inactive: 'low'
  };
  return map[status] || 'medium';
};

/*
  Maps the frontend priority string back to the database status enum.
*/
const mapPriorityToDb = (priority) => {
  const map = {
    high: 'premium',
    medium: 'active',
    low: 'inactive'
  };
  return map[priority];
};

/*
  Fetches the list of clients from the database using a dedicated RPC function.
*/
export async function fetchClients() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc('get_client_profiles');

  if (error) {
    console.error('Error fetching clients:', error);
    throw new Error('Could not fetch client profiles.');
  }

  // Map the database response to the structure expected by the frontend.
  return data.map(client => ({
    ...client,
    priority: mapDbToPriority(client.status)
  }));
}

/*
  Deletes a specific client from the database.
*/
export async function deleteClient(clientId) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', clientId);

  if (error) {
    console.error('Error deleting client:', error);
    throw new Error('Failed to delete client.');
  }
}

/*
  Updates the status of a specific client.
*/
export async function updateClientStatus(clientId, priority) {
  const supabase = createSupabaseClient();
  const newStatus = mapPriorityToDb(priority);

  if (!newStatus) {
    throw new Error('Invalid priority value provided.');
  }

  const { error } = await supabase
    .from('clients')
    .update({ status: newStatus })
    .eq('id', clientId);

  if (error) {
    console.error('Error updating client status:', error);
    throw new Error('Failed to update client status.');
  }
}

/*
  Fetches detailed profile information for a single client.
*/
export async function fetchClientProfile(clientId) {
  const supabase = createSupabaseClient();
  if (!clientId) return null;

  const { data, error } = await supabase
    .rpc('get_client_profile_details', { p_client_id: clientId });

  if (error) {
    console.error('Error fetching client profile:', error);
    throw new Error('Could not fetch client profile details.');
  }

  return data;
}