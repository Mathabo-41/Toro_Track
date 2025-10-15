// This file defines server-side API endpoints for user management.
import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

/*
* Handles GET requests to fetch all users, teams, and tasks for the admin dashboard.
*/
export async function GET() {
  const supabase = createSupabaseServerClient();
  try {
    // These RPC functions are assumed to exist in your database.
    const { data: users, error: usersError } = await supabase.rpc('get_admin_users_list');
    if (usersError) throw usersError;

    const { data: teams, error: teamsError } = await supabase.rpc('get_all_teams');
    if (teamsError) throw teamsError;

    const { data: tasks, error: tasksError } = await supabase.rpc('get_all_tasks');
    if (tasksError) throw tasksError;

    return NextResponse.json({
      users,
      teams: teams.map(t => t.name),
      tasks: tasks.map(t => t.task),
    });
  } catch (error) {
    console.error('Error in GET /api/admin/users:', error.message);
    return NextResponse.json({ error: `Failed to fetch admin data: ${error.message}` }, { status: 500 });
  }
}

/*
* Handles POST requests to invite a new user, update their profile,
* and create a client record if the role is 'Client'.
*/
export async function POST(request) {
  const supabaseAdmin = createSupabaseAdminClient();
  let newUserId = null; // Variable to hold the new user's ID for cleanup on failure

  try {
    const { email, role, password, clientData } = await request.json();

    // Step 1: Create the user in Supabase Auth.
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email as this is an admin action
    });
    if (authError) {
      if (authError.message.includes('duplicate key value')) {
          return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 409 });
      }
      throw authError;
    }
    newUserId = authData.user.id;

    // Step 2: UPDATE the auto-created profile with the correct role.
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ role: role.toLowerCase() }) // Use update, not insert
      .eq('id', newUserId);

    if (profileError) throw profileError;

    // Step 3: If the role is 'Client', insert a record into the 'clients' table.
    if (role === 'Client' && clientData) {
        const { error: clientError } = await supabaseAdmin
            .from('clients')
            .insert({
                ...clientData,
                managed_by: newUserId, // Link the new client to the new user
            });
        
        if (clientError) throw clientError;
    }

    return NextResponse.json({ user: authData.user }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/users:', error.message);
    
    // Transactional Cleanup: If a user was created but a subsequent step failed,
    // delete the orphaned auth user to maintain data integrity.
    if (newUserId) {
      await supabaseAdmin.auth.admin.deleteUser(newUserId);
    }
    
    return NextResponse.json({ error: `Invitation failed: ${error.message}` }, { status: 500 });
  }
}

/*
* Handles DELETE requests to remove a user from the system.
*/
export async function DELETE(request) {
  const supabase = createSupabaseServerClient(); // For checking permissions
  const supabaseAdmin = createSupabaseAdminClient(); // For the delete action

  const { searchParams } = new URL(request.url);
  const userIdToDelete = searchParams.get('userId');

  if (!userIdToDelete) {
    return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
  }

  try {
    // Verify that the user making the request is an authenticated admin.
    const { data: { user: requester } } = await supabase.auth.getUser();
    if (!requester) {
      return NextResponse.json({ error: 'Authentication failed.' }, { status: 401 });
    }

    const { data: adminProfile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', requester.id)
      .single();

    if (profileError || adminProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Permission denied. Admin role required.' }, { status: 403 });
    }

    // Perform the deletion.
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userIdToDelete);
    if (deleteError) throw deleteError;

    return NextResponse.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error in DELETE /api/admin/users:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}