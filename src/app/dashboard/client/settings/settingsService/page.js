// This file handles all data-related tasks for this feature, using TanStack Query to fetch and send information to our database.
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

/**
 * Fetches the current client's settings from the database.
 */
export const getSettings = async () => {
    const { data, error } = await supabase.rpc('get_client_settings_data');

    if (error) {
        console.error("Error fetching settings:", error);
        throw new Error(error.message);
    }

    return data;
};

/**
 * Updates the client's settings in the database.
 * @param {object} updatedData - The form data containing the new settings.
 */
export const updateSettings = async (updatedData) => {
    const { error } = await supabase.rpc('update_client_settings_data', {
        p_name: updatedData.name,
        p_company: updatedData.company,
        p_position: updatedData.position,
        p_phone: updatedData.phone,
        p_notifications: updatedData.notifications,
        p_newsletter: updatedData.newsletter,
        p_language: updatedData.language,
    });

    if (error) {
        console.error("Error updating settings:", error);
        throw new Error(error.message);
    }

    return { success: true, message: 'Settings saved successfully!' };
};

/**
 * Uploads a new avatar, gets the public URL, and saves it to the user's profile.
 * @param {File} avatarFile - The file to upload.
 * @param {string} userId - The ID of the user.
 */
export const uploadAvatar = async ({ avatarFile, userId }) => {
    if (!avatarFile || !userId) return;

    const fileExtension = avatarFile.name.split('.').pop();
    const filePath = `${userId}/profile.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, { upsert: true });

    if (uploadError) {
        console.error('Error uploading avatar:', uploadError);
        throw new Error(uploadError.message);
    }

    const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

    const { error: updateError } = await supabase.rpc('update_avatar_url', {
        p_avatar_url: urlData.publicUrl,
    });
    
    if (updateError) {
        console.error('Error updating avatar URL:', updateError);
        throw new Error(updateError.message);
    }
};

/**
 * A TanStack Query hook for fetching user settings.
 */
export const useGetSettingsQuery = () => {
    return useQuery({
        queryKey: ['userSettings'],
        queryFn: getSettings,
    });
};

/**
 * A TanStack Query mutation hook for updating user settings.
 */
export const useUpdateSettingsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userSettings'] });
        },
    });
};