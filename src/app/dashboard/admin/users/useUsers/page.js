// This file contains all the logic and instructions for this feature.
'use client';

import { useState, useEffect } from 'react';
import {
  fetchAllData,
  inviteUser,
  removeUser,
  updateUserRole,
  updateUserTeam,
  assignTask,
} from '../usersService/page';

/*
* Manages state and logic for the users screen.
*/
export const useUsers = () => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUserId, setMenuUserId] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  
  /*
  * Fetches all necessary data when the component mounts.
  */
  const loadInitialData = async () => {
      const { users, teams, tasks } = await fetchAllData();
      setUsers(users || []);
      setTeams(teams || []);
      setTasks(tasks || []);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  /*
  * Invites a new user and refreshes the user list on success.
  */
  const handleInviteUser = async (role, password) => {
    if (inviteEmail) {
      const { error } = await inviteUser(inviteEmail, role, password);
      if (!error) {
        setInviteEmail('');
        loadInitialData(); // Refreshes all data
      }
    }
  };

  /*
  * Adds a task to a user and refreshes the list.
  */
  const handleAddTask = async (userId) => {
    if (newTask) {
      await assignTask(userId, newTask);
      setNewTask('');
      setSelectedUser(null);
      loadInitialData(); // Refreshes all data
    }
  };

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuUserId(null);
  };

  const handleAssignTask = () => {
    setSelectedUser(menuUserId);
    handleMenuClose();
  };

  /*
  * Removes a user and filters them out of the local state.
  */
  const handleRemoveUser = async () => {
    await removeUser(menuUserId);
    setUsers(users.filter(user => user.id !== menuUserId));
    handleMenuClose();
  };

  /*
  * Updates a user's role and refreshes the list.
  */
  const handleUpdateRole = async (userId, newRole) => {
    await updateUserRole(userId, newRole);
    loadInitialData(); // Refreshes all data
  };

  /*
  * Updates a user's team and refreshes the list.
  */
  const handleUpdateTeam = async (userId, newTeam) => {
    await updateUserTeam(userId, newTeam);
    loadInitialData(); // Refreshes all data
  };

  return {
    inviteEmail,
    setInviteEmail,
    users,
    teams,
    tasks,
    selectedUser,
    newTask,
    setNewTask,
    anchorEl,
    isMenuOpen,
    handleInviteUser,
    handleAddTask,
    handleMenuOpen,
    handleMenuClose,
    handleAssignTask,
    handleRemoveUser,
    handleUpdateRole,
    handleUpdateTeam,
  };
};