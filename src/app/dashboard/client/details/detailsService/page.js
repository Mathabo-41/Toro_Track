// This file handles all data-related tasks by fetching information from our Supabase database.
import { supabase } from '@/lib/supabaseClient';

/**
 * Fetches detailed data for a specific project from the database.
 * @param {number} projectId The ID of the project to fetch.
 * @returns {Promise<object>} A promise that resolves with the project data.
 */
export const fetchProjectData = async (projectId) => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_milestones(*),
      project_files(*),
      project_team_members:profiles(*)
    `)
    .eq('id', projectId)
    .single();

  if (error) throw new Error(error.message);
  
  // Re-shape the team data to match the frontend's expectation
  const formattedData = {
    ...data,
    team: data.project_team_members
  };
  delete formattedData.project_team_members;

  return formattedData;
};

/**
 * Fetches discussion comments for a specific project.
 * @param {number} projectId The ID of the project.
 * @returns {Promise<Array>} A promise that resolves with the comments data.
 */
export const fetchComments = async (projectId) => {
  const { data, error } = await supabase
    .rpc('get_project_comments', { p_project_id: projectId });

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Posts a new comment to the database.
 * @param {object} { projectId, commentText } The project ID and the new comment text.
 * @returns {Promise<object>} A promise that resolves with the newly created comment.
 */
export const postComment = async ({ projectId, commentText }) => {
  const { data, error } = await supabase
    .rpc('add_project_comment', { 
      p_project_id: projectId, 
      p_comment_text: commentText 
    });

  if (error) throw new Error(error.message);
  return data;
};