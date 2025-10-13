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

/*
* Manages state and logic for the users screen.
*/
export const useUsers = () => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUserId, setMenuUserId] = useState(null);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  
  const loadInitialData = async () => {
      const { users, tasks } = await fetchAllData();
      setUsers(users || []);
      setTasks(tasks || []);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleInviteUser = async (role, password) => {
    if (inviteEmail) {
      const { error } = await inviteUser(inviteEmail, role, password);
      if (!error) {
        setInviteEmail('');
        loadInitialData();
      }
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
    // The user ID is intentionally not cleared here to allow follow-up actions.
  };

  const handleAssignTask = () => {
    setSelectedUser(menuUserId);
    handleMenuClose();
  };
  
  const handleRemoveUser = () => {
    setConfirmDialogOpen(true);
    // Close the menu, but keep the menuUserId for the confirmation step.
    setAnchorEl(null);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    // Now that the action is cancelled or complete, clear the user ID.
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
    handleInviteUser, handleAddTask, handleMenuOpen, handleMenuClose,
    handleAssignTask, handleRemoveUser, handleUpdateRole,
    handleCloseConfirmDialog, handleConfirmRemove,
  };
};