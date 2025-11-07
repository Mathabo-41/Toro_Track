// This file handles all data-related tasks for this feature.
import { createSupabaseClient } from '@/lib/supabase/client';

/**
* Fetches all user, team, and task data from our secure API route.
*/
export const fetchAllData = async () => {
  const supabase = createSupabaseClient();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all data:', error);
    return { users: [], tasks: [] };
  }
};

/**
* Invites a new user via our secure API route.
* @param {string} email - The user's email address.
* @param {string} role - The assigned role for the user.
* @param {string} password - The temporary password.
* @param {object|null} clientData - Optional data for creating a client record.
*/

export const inviteUser = async (email, role, password, clientData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role, password, clientData }),
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

/**
* Removes a user by calling the secure DELETE API route.
* @param {string} userId - The ID of the user to remove.
*/
export const removeUser = async (userId) => {
  try {
    const response = await fetch(`/api/admin/users?userId=${userId}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    // Paste this new code block
    if (!response.ok) {
      // Throw the entire JSON object from the server
      throw result; 
    }
    return { success: true };
  // Paste this new code block
  } catch (error) {
    // 'error' is the JSON response from the API route.
    // We log the specific database error and hint if they exist.
    console.error(
      'Server failed to remove user. Message: %s, DB-Error: %s, DB-Hint: %s',
      error.message, // Generic route message
      error.error,   // Specific Supabase error message
      error.hint     // Specific Supabase hint
    );

    // Determine the most user-friendly message to send to the UI.
    // Prioritize the database hint, then the database error, then the generic message.
    const userMessage = error.hint || error.error || error.message || 'An unknown error occurred.';

    return { 
      error: { 
        message: userMessage, 
        details: error.details, 
        hint: error.hint 
      } 
    };
  }
};

/**
* Updates a user's role in the database.
* @param {string} userId - The ID of the user to update.
* @param {string} newRole - The new role to assign.
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

/**
* Assigns a new task to a user.
* @param {string} userId - The ID of the user to assign the task to.
* @param {string} taskDescription - The description of the task.
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

// Static data for the sidebar navigation menu - updated for clarity
export const adminMenuData = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Invite Users', path: '/dashboard/admin/users' },
  { name: 'Settings', path: '/dashboard/admin/settings' },
];