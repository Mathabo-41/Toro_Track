// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { supabase } from '@/lib/supabaseClient';

/*
* Fetches the initial data needed for the license dashboard.
*/
export const getDashboardData = async () => {
  const [usage, register, renewals, clientList] = await Promise.all([
    supabase.rpc('get_license_usage_stats'),
    supabase.rpc('get_license_register', { p_client_id: null }),
    supabase.rpc('get_upcoming_license_renewals'),
    supabase.rpc('get_all_clients_for_filter'),
  ]);

  if (usage.error) throw usage.error;
  if (register.error) throw register.error;
  if (renewals.error) throw renewals.error;
  if (clientList.error) throw clientList.error;

  return {
    usageData: usage.data || [],
    registerData: register.data || [],
    renewalsData: renewals.data || [],
    clientsData: clientList.data || [],
  };
};

/*
* Fetches the license register for a specific client.
*/
export const getLicenseRegisterByClient = async (clientId) => {
  const p_client_id = clientId === 'all' ? null : clientId;
  const { data, error } = await supabase.rpc('get_license_register', { p_client_id });

  if (error) throw error;
  return data || [];
};

/*
* Adds a new license to the database.
*/
export const addNewLicense = async (licenseInfo) => {
  const { client, licenseName, licenseKey, status } = licenseInfo;
  const { data, error } = await supabase.rpc('add_new_license', {
    p_client_id: client,
    p_software_name: licenseName,
    p_license_key: licenseKey,
    p_status: status,
  });

  if (error) throw error;
  return data;
};