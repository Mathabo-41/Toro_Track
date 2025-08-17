// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.

import { useState } from 'react';
import { settingsCategoriesData, adminMenuData } from '../settingsService/page';

//manage state and logic for this screen
export const useSettings = () => {
// Where we will use React Query to fetch data
  const settingsCategories = settingsCategoriesData;
  const menu = adminMenuData;

  /**
   * Handles the 'Configure' action for a specific setting category.
   * @param {string} categoryName - The name of the settings category.
   */
  const handleConfigure = (categoryName) => {
    alert(`Configuring ${categoryName} settings...`);
  };

  /**
   * Handles a system maintenance action.
   * @param {string} action - The maintenance action to perform ( 'Backup', 'Clear Cache').
   */
  const handleMaintenance = (action) => {
    alert(`Initiating system action: ${action}`);
  };

  // This is where we call the data that we are sending anf fetching from the database. We call it so that it can be displayed
  return {
    settingsCategories,
    menu,
    handleConfigure,
    handleMaintenance,
  };
};