// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// hardcodde data to simulate server-side state
const DUMMY_SETTINGS_DATA = {
    id: 'user1',
    name: 'toro track',
    email: 'trtrack@yahoo.com',
    company: 'Law Firm Inc',
    position: 'Marketing Director',
    phone: '+27 45 847 8389',
    notifications: true,
    newsletter: false,
    language: 'en'
};

// Mock API call to get user settings
export const getSettings = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(DUMMY_SETTINGS_DATA);
        }, 500); // Simulate network delay
    });
};

// Mock API call to update user settings
export const updateSettings = (updatedData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Updating settings with:', updatedData);
            resolve({ success: true, message: 'Settings saved successfully!' });
        }, 500); // Simulate network delay
    });
};

export const useGetSettingsQuery = () => {
    return useQuery({
        queryKey: ['userSettings'],
        queryFn: getSettings,
    });
};

export const useUpdateSettingsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userSettings'] });
        },
    });
};