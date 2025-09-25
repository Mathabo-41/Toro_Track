// Contains all the logic and state management for the client settings screen.
'use client';

import { useState, useEffect } from 'react';
import { create } from 'zustand';
import { useGetSettingsQuery, useUpdateSettingsMutation, uploadAvatar } from '../settingsService/page';

// Zustand store for managing local form state
const useFormStore = create((set) => ({
    formData: {
        name: '', email: '', company: '', position: '', phone: '',
        avatar_url: '', notifications: true, newsletter: false, language: 'en',
    },
    avatarFile: null,
    avatarPreview: null,
    setFormData: (key, value) => set((state) => ({ formData: { ...state.formData, [key]: value } })),
    setFullFormData: (data) => set({ formData: data }),
    setAvatarFile: (file) => set({ avatarFile: file }),
    setAvatarPreview: (url) => set({ avatarPreview: url }),
}));

/**
 * Manages state and logic for the Settings screen.
 */
export const useSettings = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [editMode, setEditMode] = useState(false);

    // Get state and setters from Zustand store
    const { formData, setFormData, setFullFormData, avatarFile, setAvatarFile, avatarPreview, setAvatarPreview } = useFormStore();

    // React Query hooks
    const { data: serverData, isLoading, isError } = useGetSettingsQuery();
    const { mutate: updateSettings } = useUpdateSettingsMutation();

    // Sync server data to local form state
    useEffect(() => {
        if (serverData) {
            setFullFormData(serverData);
        }
    }, [serverData, setFullFormData]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(name, type === 'checkbox' ? checked : value);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (avatarFile) {
            await uploadAvatar({ avatarFile, userId: formData.id });
        }
        updateSettings(formData);
        setEditMode(false);
        setAvatarFile(null);
        setAvatarPreview(null);
        alert('Settings saved successfully!');
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setAvatarFile(null);
        setAvatarPreview(null);
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
        formData,
        avatarPreview,
        isLoading,
        isError,
        setEditMode,
        handleChange,
        handleAvatarChange,
        handleSubmit,
        handleCancelEdit,
        handleTabChange,
    };
};