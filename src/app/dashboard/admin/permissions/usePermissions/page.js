"use client";
// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.

import { useState } from 'react';
import { defaultRolesData, permissionLevelsData } from '../permissionsService/page';

//manage state and logic for this screen
export const usePermissions = () => {
  // State for the roles and their permissions
  const [roles, setRoles] = useState(defaultRolesData);
  
  // State to track the currently selected role for the summary view
  const [selectedRole, setSelectedRole] = useState('Admin');

  // Static data imported from the service file
  const permissionLevels = permissionLevelsData;

  /**
   * Handles changes to a permission level for a specific role and category.
   * @param {string} roleName - The name of the role to update.
   * @param {string} category - The permission category ('Projects').
   * @param {string} value - The new permission value ('Full', 'Edit').
   */
  const handlePermissionChange = (roleName, category, value) => {
    setRoles(roles.map(role => 
      role.name === roleName
        ? { 
            ...role, 
            permissions: { 
              ...role.permissions, 
              [category]: value 
            } 
          }
        : role
    ));
  };
  
  /**
   * This is where we will send data to the backend.
   */
  const handleSave = () => {
    alert('Permissions saved successfully!');
    // This is where we will call an API, such as savePermissions(roles) from our database
  };

  return {
    roles,
    selectedRole,
    setSelectedRole,
    permissionLevels,
    handlePermissionChange,
    handleSave,
  };
};