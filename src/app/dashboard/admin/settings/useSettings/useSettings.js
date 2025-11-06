// Contains all the logic and instructions for this feature.
"use client";

import { useState, useEffect } from 'react';
import {
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
  Link as LinkIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { 
    adminMenuData,
    fetchSettingsCategories,
    fetchRolePermissions,
    saveRolePermissions
} from '../settingsService/service';

// Defines a mapping from category name to its corresponding icon component.
const iconMap = {
    'Notifications': <NotificationsIcon color="primary" />,
    'Theme': <PaletteIcon color="secondary" />,
    'Security': <SecurityIcon color="success" />,
    'Integrations': <LinkIcon color="warning" />,
    'Data Management': <SettingsIcon color="info" />,
    'API Configuration': <SettingsIcon color="error" />,
};

/*
* Manages state and logic for the settings screen.
*/
export const useSettings = () => {
    const [settingsCategories, setSettingsCategories] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Manages loading state.
    const menu = adminMenuData;

    /*
    * Loads initial data for categories and permissions from the database.
    */
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const categoriesData = await fetchSettingsCategories();
            const permissionsData = await fetchRolePermissions();

            const categoriesWithIcons = categoriesData.map(cat => ({
                ...cat,
                icon: iconMap[cat.name] || <SettingsIcon />
            }));

            setSettingsCategories(categoriesWithIcons);
            setRoles(permissionsData || []); // Add fallback for null response.
            setIsLoading(false);
        };

        loadData();
    }, []);

    const handleConfigure = (categoryName) => {
        alert(`Configuring ${categoryName} settings...`);
    };

    const handleMaintenance = (action) => {
        alert(`Initiating system action: ${action}`);
    };

    /*
    * Handles saving the permissions and provides feedback.
    */
    const handleSavePermissions = async () => {
        const { error } = await saveRolePermissions(roles);
        if (error) {
            return { success: false, message: 'Failed to save permissions.' };
        }
        return { success: true, message: 'Permissions saved successfully!' };
    };

    return {
        settingsCategories,
        menu,
        roles,
        setRoles,
        isLoading,
        handleConfigure,
        handleMaintenance,
        handleSavePermissions,
    };
};