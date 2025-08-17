// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.

import { useState } from 'react';
import { usersData, teamsData, tasksData } from '../usersService/page';

//manage state and logic for this screen
export const useUsers = () => {
  // State for managing user invitation email input
  const [inviteEmail, setInviteEmail] = useState('');
  
  // State for storing and managing user data
  const [users, setUsers] = useState(usersData);
  
  // State for available teams in the organization
  const [teams, setTeams] = useState(teamsData);
  
  // State for common tasks that can be assigned
  const [tasks, setTasks] = useState(tasksData);
  
  // State to track which user is selected for task assignment
  const [selectedUser, setSelectedUser] = useState(null);
  
  // State for new task input when assigning to a user
  const [newTask, setNewTask] = useState('');
  
  // State for dropdown menu anchor element
  const [anchorEl, setAnchorEl] = useState(null);
  
  // State to track which user's action menu is open
  const [menuUserId, setMenuUserId] = useState(null);

  // Checks if the menu is currently open
  const isMenuOpen = Boolean(anchorEl);

  /**
   * Handles inviting a new user by email.
   * Creates a new user with default settings and adds to the users list.
   */
  const handleInviteUser = () => {
    if (inviteEmail) {
      const newUser = {
        id: users.length + 1,
        name: 'New User',
        email: inviteEmail,
        role: 'Member',
        team: 'Unassigned',
        tasks: []
      };
      setUsers([...users, newUser]);
      setInviteEmail('');
    }
  };

  /**
   * Adds a task to the specified user's task list.
   */
  const handleAddTask = (userId) => {
    if (newTask) {
      setUsers(users.map(user => 
        user.id === userId
          ? { ...user, tasks: [...user.tasks, newTask] }
          : user
      ));
      setNewTask('');
      setSelectedUser(null);
    }
  };

  /**
   * Opens the action menu for a specific user.
   */
  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  /**
   * Closes the currently open action menu.
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuUserId(null);
  };

  /**
   * Prepares the selected user for task assignment via the menu.
   */
  const handleAssignTask = () => {
    setSelectedUser(menuUserId);
    handleMenuClose();
  };

  /**
   * Removes the selected user from the users list.
   */
  const handleRemoveUser = () => {
    setUsers(users.filter(user => user.id !== menuUserId));
    handleMenuClose();
  };
  
  /**
   * Updates a user's role.
   */
  const handleUpdateRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };
  
  /**
   * Updates a user's team.
   */
  const handleUpdateTeam = (userId, newTeam) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, team: newTeam } : user
    ));
  };

  return {
    inviteEmail,
    setInviteEmail,
    users,
    setUsers,
    teams,
    tasks,
    selectedUser,
    setSelectedUser,
    newTask,
    setNewTask,
    anchorEl,
    setAnchorEl,
    menuUserId,
    setMenuUserId,
    isMenuOpen,
    handleInviteUser,
    handleAddTask,
    handleMenuOpen,
    handleMenuClose,
    handleAssignTask,
    handleRemoveUser,
    handleUpdateRole,
    handleUpdateTeam
  };
};