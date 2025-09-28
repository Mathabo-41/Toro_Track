// This file handles all data-related tasks for this feature.
import { createSupabaseClient } from '@/lib/supabase/client';

/*
* Fetches all user, team, and task data from our secure API route.
*/
export const fetchAllData = async () => {
  const supabase = createSupabaseClient();
  try {
    const response = await fetch('/api/admin/users');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all data:', error);
    return { users: [], teams: [], tasks: [] };
  }
};

/*
* Invites a new user via our secure API route.
*/
export const inviteUser = async (email, role, password) => {
  try {
    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role, password }),
    });

    const result = await response.json();
    if (!response.ok) {
      const errorMessage = result.error || 'An unexpected error occurred.';
      throw new Error(errorMessage);
    }
    return { user: result.user };
  } catch (error) {
    console.error('Error inviting user:', error.message);
    return { error: { message: error.message } };
  }
};

/*
* Removes a user by calling the secure DELETE API route.
*/
export const removeUser = async (userId) => {
  try {
    const response = await fetch(`/api/admin/users?userId=${userId}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error);
    }
    return { success: true };
  } catch (error) {
    console.error('Error removing user:', error.message);
    return { error: { message: error.message } };
  }
};

/*
* Updates a user's role in the database.
*/
export const updateUserRole = async (userId, newRole) => {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc('update_user_role', {
    p_user_id: userId,
    p_new_role: newRole.toLowerCase(),
  });
  if (error) {
    console.error('Error updating role:', error);
  }
  return { error };
};

/*
* Updates a user's team assignment in the database.
*/
export const updateUserTeam = async (userId, newTeam) => {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc('update_user_team', {
    p_user_id: userId,
    p_team_name: newTeam,
  });
  if (error) {
    console.error('Error updating team:', error);
  }
  return { error };
};

/*
* Assigns a new task to a user.
*/
export const assignTask = async (userId, taskDescription) => {
    const supabase = createSupabaseClient();
    const { error } = await supabase.rpc('assign_task_to_user', {
        p_user_id: userId,
        p_task_description: taskDescription,
    });

    if (error) {
        console.error('Error assigning task:', error);
    }
    return { error };
};

// Static data for the sidebar navigation menu
export const adminMenuData = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Settings', path: '/dashboard/admin/settings' },
];