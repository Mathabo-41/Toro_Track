// This file handles all data-related tasks for this feature.
import { createSupabaseClient } from '@/lib/supabase/client';

/**
 * Fetches project data from the get_admin_projects database function.
 */
export const getProjects = async () => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc('get_admin_projects');

  if (error) {
    console.error('Error fetching projects:', error.message);
    throw new Error(error.message);
  }

  return data;
};

/**
 * Fetches team member data from the get_team_members database function.
 */
export const getTeamMembers = async () => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc('get_team_members');

  if (error) {
    console.error('Error fetching team members:', error.message);
    throw new Error(error.message);
  }

  return data;
};

/**
 * Fetches a list of all clients.
 */
export const getClients = async () => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('clients').select('id, client_name');

    if (error) {
        console.error('Error fetching clients:', error.message);
        throw new Error(error.message);
    }

    return data;
};

/**
 * Adds a new project to the database.
 */
export const addProject = async (projectData) => {
  const supabase = createSupabaseClient();
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id')
    .eq('client_name', projectData.client)
    .single();

  if (clientError || !client) {
    console.error('Error finding client:', clientError?.message);
    throw new Error('Client not found.');
  }

  const { error: projectError } = await supabase
    .from('projects')
    .insert({
      project_name: projectData.name,
      client_id: client.id,
      status: projectData.status,
      end_date: projectData.dueDate,
      assigned_team: projectData.team
      // Remove progress from insert
    });

  if (projectError) {
    console.error('Error creating project:', projectError.message);
    throw new Error(projectError.message);
  }
};

/**
 * Deletes a project from the database.
 */
export const removeProject = async (projectId) => {
  const supabase = createSupabaseClient();
  const { error } = await supabase.from('projects').delete().eq('id', projectId);

  if (error) {
    console.error('Error deleting project:', error.message);
    throw new Error(error.message);
  }
};

/**
 * Updates the status of a project.
 */
export const changeProjectStatus = async (projectId, newStatus) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('projects')
        .update({ status: newStatus })
        .eq('id', projectId)
        .select();

    if (error) {
        console.error('Error updating project status:', error.message);
        throw new Error(error.message);
    }
    return data;
};

/**
 * Updates all details of a project.
 */
export const updateProjectDetails = async (projectData) => {
  const supabase = createSupabaseClient();
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id')
    .eq('client_name', projectData.client)
    .single();

  if (clientError || !client) {
    console.error('Error finding client for update:', clientError?.message);
    throw new Error('Client not found.');
  }

  const { error: projectUpdateError } = await supabase
    .from('projects')
    .update({
      project_name: projectData.name,
      client_id: client.id,
      end_date: projectData.dueDate,
      status: projectData.status,
      assigned_team: projectData.team
      // Remove progress from update
    })
    .eq('id', projectData.id);

  if (projectUpdateError) {
    console.error('Error updating project details:', projectUpdateError.message);
    throw new Error(projectUpdateError.message);
  }
};