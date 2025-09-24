// This file handles all data-related tasks for this feature.
import { supabase } from '@/lib/supabaseClient';

// Static data for the sidebar navigation menu
export const adminMenuData = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

/*
* Fetches the settings categories from the database.
*/
export const fetchSettingsCategories = async () => {
    const { data, error } = await supabase.rpc('get_settings_categories');
    if (error) {
        console.error("Error fetching settings categories:", error);
        return [];
    }
    return data;
};

/*
* Fetches role permissions from the database.
*/
export const fetchRolePermissions = async () => {
    const { data, error } = await supabase.rpc('get_role_permissions');
    if (error) {
        console.error("Error fetching role permissions:", error);
        return [];
    }
    return data;
};

/*
* Saves the updated role permissions to the database.
*/
export const saveRolePermissions = async (permissions) => {
    const { error } = await supabase.rpc('update_role_permissions', {
        p_permissions: permissions
    });

    if (error) {
        console.error("Error saving permissions:", error);
    }
    return { error };
};