// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { createSupabaseClient } from '@/lib/supabase/client';

/*
* Fetches all data required for the Asset Status & Documentation screen.
*/
export const getAssetStatusDocData = async () => {
  const supabase = createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { statusData: [], documentsData: [], clientInfo: [], userInfo: { name: 'Guest', role: '' } };
  }
  
  const promises = {
    statusData: supabase.rpc('get_asset_status_docs'),
    documentsData: supabase.rpc('get_all_asset_documents'),
    clientInfo: supabase.rpc('get_client_info'),
    userInfo: supabase.from('profiles').select('full_name, role').eq('id', user.id).single()
  };

  const [
    statusResponse,
    documentsResponse,
    clientInfoResponse,
    userInfoResponse
  ] = await Promise.all(Object.values(promises));

  if (statusResponse.error) console.error("Error fetching status data:", statusResponse.error);
  if (documentsResponse.error) console.error("Error fetching documents data:", documentsResponse.error);
  if (clientInfoResponse.error) console.error("Error fetching client info:", clientInfoResponse.error);
  if (userInfoResponse.error) console.error("Error fetching user info:", userInfoResponse.error);

  const statusData = statusResponse.data || [];
  const documentsData = documentsResponse.data || []; // Now expects { name, type }
  const clientInfo = clientInfoResponse.data || [];
  
  const userInfo = userInfoResponse.data ? {
      name: userInfoResponse.data.full_name,
      role: userInfoResponse.data.role
  } : { name: 'Auditor', role: 'auditor' };

  return { statusData, documentsData, clientInfo, userInfo };
};