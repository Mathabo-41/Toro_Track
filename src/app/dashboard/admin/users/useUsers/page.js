// This file contains all the logic and instructions for this feature.
'use client';

import { useState, useEffect } from 'react';
import {
  fetchAllData,
  inviteUser,
  removeUser as removeUserService,
  updateUserRole,
  assignTask,
} from '../usersService/page';

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

  // New state for client details
  const [clientName, setClientName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

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
        // Optionally, set an error state to show in the UI
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

    try {
      // Package client data if the role is 'Client'
      const clientData = role === 'Client' 
        ? { client_name: clientName, contact_person: contactPerson, logo_url: logoUrl, contact_email: inviteEmail } 
        : null;

      const { error } = await inviteUser(inviteEmail, role, password, clientData);
      
      if (!error) {
        // Reset all form fields on success
        setInviteEmail('');
        setClientName('');
        setContactPerson('');
        setLogoUrl('');
        loadInitialData(); // Refresh the user list
      } else {
        // Handle API errors by logging the actual message from the backend.
        // This provides a much clearer error in the console.
        console.error("Invitation failed:", error.message || error);
      }
    } catch (error) {
        console.error("An unexpected error occurred during invitation:", error);
    }
};

  const handleAddTask = async (userId) => {
    if (newTask) {
      await assignTask(userId, newTask);
      setNewTask('');
      setSelectedUser(null);
      loadInitialData();
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
    
    const { error } = await removeUserService(menuUserId);
    if (!error) {
      setUsers(currentUsers => currentUsers.filter(user => user.id !== menuUserId));
    }
    handleCloseConfirmDialog();
  };

  const handleUpdateRole = async (userId, newRole) => {
    await updateUserRole(userId, newRole);
    loadInitialData();
  };

  return {
    inviteEmail, setInviteEmail, users,
    tasks, selectedUser, newTask, setNewTask, anchorEl,
    isMenuOpen, menuUserId, isConfirmDialogOpen,
    // Export new state and setters
    clientName, setClientName,
    contactPerson, setContactPerson,
    logoUrl, setLogoUrl,
    handleInviteUser, handleAddTask, handleMenuOpen, handleMenuClose,
    handleAssignTask, handleRemoveUser, handleUpdateRole,
    handleCloseConfirmDialog, handleConfirmRemove,
  };
};