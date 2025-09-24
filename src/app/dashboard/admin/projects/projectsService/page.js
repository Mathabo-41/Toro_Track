// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { supabase } from '@/lib/supabaseClient';

/**
 * Fetches project data from the get_admin_projects database function.
 */
export const getProjects = async () => {
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
    const { data, error } = await supabase.from('clients').select('id, client_name');

    if (error) {
        console.error('Error fetching clients:', error.message);
        throw new Error(error.message);
    }

    return data;
};


/**
 * Adds a new project and its team members to the database.
 */
export const addProject = async (projectData) => {
  // Find the client's ID from their name.
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id')
    .eq('client_name', projectData.client)
    .single();

  if (clientError || !client) {
    console.error('Error finding client:', clientError?.message);
    throw new Error('Client not found.');
  }

  // Insert the new project.
  const { data: newProject, error: projectError } = await supabase
    .from('projects')
    .insert({
      project_name: projectData.name,
      client_id: client.id,
      status: projectData.status,
      end_date: projectData.dueDate,
      progress: 10 // Default progress
    })
    .select()
    .single();

  if (projectError) {
    console.error('Error creating project:', projectError.message);
    throw new Error(projectError.message);
  }

  // If team members are selected, link them to the new project.
  if (projectData.team && projectData.team.length > 0) {
    const { data: members, error: membersError } = await supabase
      .from('profiles')
      .select('id')
      .in('initials', projectData.team);

    if (membersError) {
      console.error('Error finding team members:', membersError.message);
      throw new Error(membersError.message);
    }

    const teamLinks = members.map(member => ({
      project_id: newProject.id,
      user_id: member.id,
    }));

    const { error: teamLinkError } = await supabase.from('project_team_members').insert(teamLinks);

    if (teamLinkError) {
      console.error('Error linking team members:', teamLinkError.message);
      throw new Error(teamLinkError.message);
    }
  }

  return newProject;
};


/**
 * Deletes a project from the database.
 */
export const removeProject = async (projectId) => {
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
 * Updates all details of a project, including team members.
 */
export const updateProjectDetails = async (projectData) => {
  // Find client ID from name
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id')
    .eq('client_name', projectData.client)
    .single();

  if (clientError || !client) {
    console.error('Error finding client for update:', clientError?.message);
    throw new Error('Client not found.');
  }

  // Update the main project details
  const { error: projectUpdateError } = await supabase
    .from('projects')
    .update({
      project_name: projectData.name,
      client_id: client.id,
      end_date: projectData.dueDate,
      status: projectData.status,
    })
    .eq('id', projectData.id);

  if (projectUpdateError) {
    console.error('Error updating project details:', projectUpdateError.message);
    throw new Error(projectUpdateError.message);
  }

  // Delete existing team member links for this project
  const { error: deleteError } = await supabase
    .from('project_team_members')
    .delete()
    .eq('project_id', projectData.id);
    
  if (deleteError) {
    console.error('Error removing old team members:', deleteError.message);
    throw new Error(deleteError.message);
  }
  
  // Add new team member links if any are provided
  if (projectData.team && projectData.team.length > 0) {
    const { data: members, error: membersError } = await supabase
      .from('profiles')
      .select('id')
      .in('initials', projectData.team);
      
    if (membersError) {
      console.error('Error finding new team members:', membersError.message);
      throw new Error(membersError.message);
    }
    
    const teamLinks = members.map(member => ({
      project_id: projectData.id,
      user_id: member.id,
    }));

    const { error: insertError } = await supabase
      .from('project_team_members')
      .insert(teamLinks);

    if (insertError) {
      console.error('Error adding new team members:', insertError.message);
      throw new Error(insertError.message);
    }
  }
};