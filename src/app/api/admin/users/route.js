// This file defines server-side API endpoints for user management.
import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

/*
* Handles GET requests.
*/
export async function GET() {
  const supabase = createSupabaseServerClient();
  try {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/*
* Handles POST requests to invite a new user.
*/
export async function POST(request) {
  const supabase = createSupabaseServerClient();
  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const { email, role, password } = await request.json();

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (authError) throw authError;

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: role.toLowerCase() })
      .eq('id', authData.user.id);

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw profileError;
    }

    return NextResponse.json({ user: authData.user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/*
* Handles DELETE requests to remove a user from the system.
*/
export async function DELETE(request) {
  const supabase = createSupabaseServerClient(); // For checking user permissions
  const supabaseAdmin = createSupabaseAdminClient(); // For performing the delete action

  const { searchParams } = new URL(request.url);
  const userIdToDelete = searchParams.get('userId');

  if (!userIdToDelete) {
    return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
  }

  try {
    const { data: { user: requester } } = await supabase.auth.getUser();
    if (!requester) {
      return NextResponse.json({ error: 'Authentication failed.' }, { status: 401 });
    }

    const { data: adminProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', requester.id)
      .single();

    if (adminProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Permission denied.' }, { status: 403 });
    }

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userIdToDelete);
    if (deleteError) throw deleteError;

    return NextResponse.json({ message: 'User deleted successfully.' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}