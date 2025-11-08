// This file contains all the logic and instructions for this feature.
'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAllData,
  inviteUser,
  removeUser as removeUserService,
  updateUserRole,
  assignTask,
} from '../usersService/service.js';

/**
* Manages state and logic for the users screen using React Query.
*/
export const useUsers = () => {
  const queryClient = useQueryClient();

  // --- State for UI components ---
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUserId, setMenuUserId] = useState(null);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Client form state
  const [clientName, setClientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [companyName, setCompanyName] = useState('');

  const isMenuOpen = Boolean(anchorEl);

  // --- Data Fetching with useQuery ---
  // Replaces the useEffect and useState for users/tasks
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allUsersAndTasks'],
    queryFn: fetchAllData,
  });

  // Use memo to derive state from query data
  const users = useMemo(() => data?.users || [], [data]);
  const tasks = useMemo(() => data?.tasks || [], [data]);

  // --- Data Mutations (Create, Update, Delete) ---

  // Helper function to refresh data and handle errors
  const onMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['allUsersAndTasks'] });
  };

  const onMutationError = (error) => {
    console.error("Mutation failed:", error.message || error);
    setApiError(error.message || 'An operation failed. Please try again.');
  };

  // Mutation for Inviting a User
  const inviteUserMutation = useMutation({
    mutationFn: ({ email, role, password, clientData }) => inviteUser(email, role, password, clientData),
    onSuccess: (result) => {
      if (result.error) {
        onMutationError(result.error);
      } else {
        onMutationSuccess();
        // Reset all form fields on success
        setInviteEmail('');
        setClientName('');
        setContactNumber('');
        setCompanyName('');
        // This will be caught by the UsersContent component to show the success snackbar
      }
    },
    onError: onMutationError,
  });

  // Mutation for Adding a Task
  const addTaskMutation = useMutation({
    mutationFn: ({ userId, taskDescription }) => assignTask(userId, taskDescription),
    onSuccess: (result) => {
      if (result.error) onMutationError(result.error);
      else {
        onMutationSuccess();
        setNewTask('');
        setSelectedUser(null);
      }
    },
    onError: onMutationError,
  });
  
  // Mutation for Removing a User
  const removeUserMutation = useMutation({
    mutationFn: (userId) => removeUserService(userId),
    onSuccess: (result) => {
      if (result.error) onMutationError(result.error);
      else onMutationSuccess();
    },
    onError: onMutationError,
  });

  // Mutation for Updating a Role
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, newRole }) => updateUserRole(userId, newRole),
    onSuccess: (result) => {
      if (result.error) onMutationError(result.error);
      else onMutationSuccess();
    },
    onError: onMutationError,
  });

  // --- Event Handlers (call mutations) ---

  const handleInviteUser = (role, password) => {
    if (!inviteEmail) return;
    setApiError(null);

    const clientData = role === 'Client' 
      ? { 
          client_name: clientName, 
          contact_number: contactNumber, 
          company_name: companyName, 
          contact_email: inviteEmail 
        } 
      : null;
    
    inviteUserMutation.mutate({ email: inviteEmail, role, password, clientData });
  };

  const handleAddTask = (userId) => {
    if (newTask) {
      setApiError(null);
      addTaskMutation.mutate({ userId: userId, taskDescription: newTask });
    }
  };

  const handleConfirmRemove = () => {
    if (!menuUserId) return;
    setApiError(null);
    removeUserMutation.mutate(menuUserId);
    handleCloseConfirmDialog();
  };

  const handleUpdateRole = (userId, newRole) => {
    setApiError(null);
    updateRoleMutation.mutate({ userId, newRole });
  };

  // UI state handlers
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

  return {
    // Original State
    inviteEmail, setInviteEmail,
    selectedUser, 
    newTask, setNewTask, 
    anchorEl, isMenuOpen, 
    menuUserId, isConfirmDialogOpen,
    
    // New Client Form State
    clientName, setClientName,
    contactNumber, setContactNumber,
    companyName, setCompanyName,
    
    // Error State
    apiError, setApiError,
    
    // Data from useQuery
    users,
    tasks,
    isLoading, // Export loading state
    isError,   // Export error state

    // Handlers
    handleInviteUser, 
    handleAddTask, 
    handleMenuOpen, 
    handleMenuClose,
    handleAssignTask, 
    handleRemoveUser, 
    handleUpdateRole,
    handleCloseConfirmDialog, 
    handleConfirmRemove,
    
    // Mutation loading states
    isInviting: inviteUserMutation.isPending,
    isRemoving: removeUserMutation.isPending,
    isUpdatingRole: updateRoleMutation.isPending,
    isAddingTask: addTaskMutation.isPending,
  };
};