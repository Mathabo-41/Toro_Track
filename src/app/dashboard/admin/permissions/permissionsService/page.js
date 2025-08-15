// /features/admin/Permissions/permissionsService.js
import { supabase } from '@/lib/supabaseClient';

/**
 * Fetch existing roles and their permissions
 */
export async function fetchRoles() {
  const { data, error } = await supabase
    .from('roles')
    .select('name,icon,permissions')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Persist updated permissions back to Supabase
 */
export async function savePermissions(roles) {
  const updates = roles.map(({ name, permissions }) => ({
    name,
    permissions
  }));

  const { error } = await supabase
    .from('roles')
    .upsert(updates, { onConflict: 'name' });

  if (error) throw error;
  return true;
}
