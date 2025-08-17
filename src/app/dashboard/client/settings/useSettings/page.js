// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.

import { useState, useEffect } from 'react';
import { create } from 'zustand';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../settingsService/page';

// Zustand store for managing local form state
const useFormStore = create((set) => ({
    formData: {
        name: '',
        email: '',
        company: '',
        position: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        notifications: true,
        newsletter: false,
        language: 'en',
    },
    setFormData: (key, value) => set((state) => ({
        formData: { ...state.formData, [key]: value }
    })),
    setFullFormData: (data) => set({ formData: data }),
}));

/**
 * manage state and logic of this screen. Manages local form state, edit mode, active tabs, and server state synchronization.
 */
export const useSettings = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Get formData and setter from Zustand store
    const { formData, setFormData, setFullFormData } = useFormStore();

    // React Query hooks for fetching and updating data
    const { data: serverData, isLoading, isError } = useGetSettingsQuery();
    const { mutate: updateSettings } = useUpdateSettingsMutation();

    // Synchronize server data with local form state when data is loaded
    useEffect(() => {
        if (serverData) {
            setFullFormData(serverData);
        }
    }, [serverData, setFullFormData]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateSettings(formData);
        setEditMode(false);
        alert('Settings saved successfully!');
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        // Reset form data to server data on cancel
        if (serverData) {
            setFullFormData(serverData);
        }
    };

    const handleTabChange = (e, newValue) => {
        setActiveTab(newValue);
    };

    return {
        activeTab,
        editMode,
        darkMode,
        formData,
        isLoading,
        isError,
        setEditMode,
        setDarkMode,
        handleChange,
        handleSubmit,
        handleCancelEdit,
        handleTabChange,
    };
};