// This file contains all the logic and instructions for this feature.
'use client';

import { useState, useEffect } from 'react';
import {
  fetchAllData,
  inviteUser,
  removeUser as removeUserService,
  updateUserRole,
  assignTask,
} from '../usersService/service.js';

/**
* Manages state and logic for the users screen.
*/
export const useUsers = () => {
  // Existing state
  const [inviteEmail, setInviteEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUserId, setMenuUserId] = useState(null);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Updated state for client details to match new schema
  const [clientName, setClientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [companyName, setCompanyName] = useState('');

  const isMenuOpen = Boolean(anchorEl);
  
  /**
  * Fetches the initial list of users and tasks from the server.
  */
  const loadInitialData = async () => {
    try {
      const { users, tasks } = await fetchAllData();
      setUsers(users || []);
      setTasks(tasks || []);
    } catch (error) {
        console.error("Failed to load initial data:", error);
        setApiError('Failed to load initial data. Please refresh.');
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

/**
* Handles the user invitation process, including client creation.
* @param {string} role - The role assigned to the new user.
* @param {string} password - The temporary password for the new user.
*/
const handleInviteUser = async (role, password) => {
    if (!inviteEmail) return;
    setApiError(null); // Clear previous errors

    try {
      // Package client data with updated field names for the API
      const clientData = role === 'Client' 
        ? { 
            client_name: clientName, 
            contact_number: contactNumber, 
            company_name: companyName, 
            contact_email: inviteEmail 
          } 
        : null;

      const { error } = await inviteUser(inviteEmail, role, password, clientData);
      
      if (!error) {
        // Reset all form fields on success
        setInviteEmail('');
        setClientName('');
        setContactNumber('');
        setCompanyName('');
        loadInitialData(); // Refresh the user list
      } else {
        console.error("Invitation failed:", error.message || error);
        setApiError(error.message); // Set error state
      }
    } catch (error) {
        console.error("An unexpected error occurred during invitation:", error);
        setApiError('An unexpected error occurred. Please try again.');
    }
};

  const handleAddTask = async (userId) => {
    if (newTask) {
      setApiError(null);
      const { error } = await assignTask(userId, newTask);
      if (error) {
        setApiError(error.message);
      } else {
        setNewTask('');
        setSelectedUser(null);
        loadInitialData();
      }
    }
  };

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAssignTask = () => {
    setSelectedUser(menuUserId);
    handleMenuClose();
  };
  
  const handleRemoveUser = () => {
    setConfirmDialogOpen(true);
    setAnchorEl(null);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setMenuUserId(null);
  };

  const handleConfirmRemove = async () => {
    if (!menuUserId) return;
    setApiError(null); // Clear previous errors
    
    try {
      const { error } = await removeUserService(menuUserId);
      if (error) {
      // Log the specific message string, not the whole error object.
      console.error("Failed to remove user:", error.message || error);
      setApiError(error.message || 'Failed to remove user. They may have dependent records.');
    } else {
        setUsers(currentUsers => currentUsers.filter(user => user.id !== menuUserId));
      }
    } catch (hookError) {
       console.error("Error in handleConfirmRemove:", hookError);
       setApiError('A critical client-side error occurred.');
    }
    
    handleCloseConfirmDialog();
  };

  const handleUpdateRole = async (userId, newRole) => {
    setApiError(null);
    const { error } = await updateUserRole(userId, newRole);
    if (error) {
      setApiError(error.message);
    } else {
      loadInitialData();
    }
  };

  return {
    inviteEmail, setInviteEmail, users,
    tasks, selectedUser, newTask, setNewTask, anchorEl,
    isMenuOpen, menuUserId, isConfirmDialogOpen,
    // Export new state and setters
    clientName, setClientName,
    contactNumber, setContactNumber,
    companyName, setCompanyName,
    apiError, setApiError, // Export the error state
    handleInviteUser, handleAddTask, handleMenuOpen, handleMenuClose,
    handleAssignTask, handleRemoveUser, handleUpdateRole,
    handleCloseConfirmDialog, handleConfirmRemove,
  };
};