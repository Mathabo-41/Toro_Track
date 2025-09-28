// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { createSupabaseClient } from '@/lib/supabase/client';

/**
 * Fetches notifications for the current client from the database.
 * @returns {Promise<Array>} A promise that resolves with the list of notifications.
 */
export const fetchNotifications = async () => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc('get_client_notifications');
  if (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
  return data || [];
};

/**
 * Fetches meetings for the current client from the database.
 * @returns {Promise<Array>} A promise that resolves with the list of meetings.
 */
export const fetchMeetings = async () => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc('get_client_meetings');
  if (error) {
    console.error('Error fetching meetings:', error);
    throw error;
  }
  return data || [];
};