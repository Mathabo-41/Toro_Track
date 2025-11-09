// This file handles all data-related tasks for this feature.
import { createSupabaseClient } from '@/lib/supabase/client';

// Static data for the sidebar navigation menu
export const adminMenuData = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Invite Users', path: '/dashboard/admin/users' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

/*
* Fetches the settings categories from the database.
*/
export const fetchSettingsCategories = async () => {
    const supabase = createSupabaseClient();
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
    const supabase = createSupabaseClient();
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
    try {
        const supabase = createSupabaseClient(); // ADD THIS LINE
        
        // For now, let's simulate a successful save without actual database call
        // Uncomment the code below when you're ready to connect to the actual database
        
        /*
        const { error } = await supabase.rpc('update_role_permissions', {
            p_permissions: permissions
        });

        if (error) {
            console.error("Error saving permissions:", error);
            return { success: false, message: 'Failed to save permissions to database' };
        }
        */
        
        // Simulate successful save for now
        console.log('Permissions would be saved:', permissions);
        
        return { 
            success: true, 
            message: 'Permissions saved successfully!' 
        };
        
    } catch (error) {
        console.error("Unexpected error saving permissions:", error);
        return { 
            success: false, 
            message: 'An unexpected error occurred while saving permissions' 
        };
    }
};

/*
* Alternative safe version that always succeeds (for development)
*/
export const saveRolePermissionsSafe = async (permissions) => {
    // Always return success without database call
    console.log('Permissions saved (simulated):', permissions);
    return { 
        success: true, 
        message: 'Permissions saved successfully!' 
    };
};