// This file defines server-side API endpoints for user management.
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseServerClient';

/*
* Handles GET requests to fetch all users, teams, and tasks.
*/
export async function GET() {
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
  try {
    const { email, role, password } = await request.json();

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) throw authError;

    const { error: roleError } = await supabase.rpc('update_user_role', {
      p_user_id: authData.user.id,
      p_new_role: role.toLowerCase(),
    });

    if (roleError) throw roleError;

    return NextResponse.json({ user: authData.user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}