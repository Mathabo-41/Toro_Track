// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { supabase } from '@/lib/supabaseClient';

/**
 * Fetches the current auditor settings from the database.
 * @returns {Promise<Object>} A promise that resolves with the settings data.
 */
export async function fetchSettings() {
  const { data, error } = await supabase.rpc('get_auditor_settings');
  if (error) {
    console.error("Error fetching settings:", error);
    throw new Error('Failed to fetch settings.');
  }
  return data;
}

/**
 * Updates the auditor settings in the database.
 * @param {Object} newSettings - The new settings data to save.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
export async function updateSettings(newSettings) {
  const { error } = await supabase.rpc('update_auditor_settings', {
    new_settings: newSettings,
  });

  if (error) {
    console.error("Error updating settings:", error);
    throw new Error('Failed to save settings.');
  }
  return;
}