// This file handles all data-related tasks by fetching information from our Supabase database.
import { createSupabaseClient } from '@/lib/supabase/client';

/**
 * Fetches detailed data for a specific project from the database.
 * @param {number} projectId The ID of the project to fetch.
 * @returns {Promise<object>} A promise that resolves with the project data.
 */
export const fetchProjectData = async (projectId) => {
  const supabase = createSupabaseClient();
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_milestones(*),
        project_files(*)
      `)
      .eq('id', projectId)
      .single();

    if (error) {
      console.error('Error fetching project data:', error.message);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in fetchProjectData:', error);
    throw error;
  }
};

/**
 * Fetches discussion comments for a specific project.
 * @param {number} projectId The ID of the project.
 * @returns {Promise<Array>} A promise that resolves with the comments data.
 */
export const fetchComments = async (projectId) => {
  const supabase = createSupabaseClient();
  try {
    const { data, error } = await supabase
      .rpc('get_project_comments', { p_project_id: projectId });

    if (error) {
      console.error('Error fetching comments:', error.message);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error('Unexpected error in fetchComments:', error);
    throw error;
  }
};

/**
 * Posts a new comment to the database.
 * @param {object} { projectId, commentText } The project ID and the new comment text.
 * @returns {Promise<object>} A promise that resolves with the newly created comment.
 */
export const postComment = async ({ projectId, commentText }) => {
  const supabase = createSupabaseClient();
  try {
    const { data, error } = await supabase
      .rpc('add_project_comment', {
        p_project_id: projectId,
        p_comment_text: commentText
      });

    if (error) {
      console.error('Error posting comment:', error.message);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error('Unexpected error in postComment:', error);
    throw error;
  }
};