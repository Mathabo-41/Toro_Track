// This file contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getProjects,
  getTeamMembers,
  addProject,
  removeProject,
  changeProjectStatus,
  updateProjectDetails
} from '../projectsService/page';

// This hook manages state and logic for the projects screen.
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    status: 'active',
    dueDate: '',
    team: []
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Fetches all necessary data from the database and updates the state.
   */
  const fetchData = useCallback(async () => {
    try {
      const [projectsData, teamMembersData] = await Promise.all([
        getProjects(),
        getTeamMembers()
      ]);
      setProjects(projectsData || []);
      setTeamMembers(teamMembersData || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError('Could not load data. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Filters projects based on the search term.
   */
  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.client?.toLowerCase().includes(searchLower) ||
      project.status.toLowerCase().includes(searchLower)
    );
  });

  /**
   * Updates a project's details in the database and refetches data.
   */
  const updateProject = async (updatedProject) => {
    try {
      await updateProjectDetails(updatedProject);
      await fetchData();
    } catch (err) {
      console.error("Failed to update project:", err);
      setError('Failed to update project.');
    }
  };

  /**
   * Handles opening the actions menu for a specific project.
   */
  const handleMenuOpen = (event, projectId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(projectId);
  };

  /**
   * Handles closing the actions menu.
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  /**
   * Deletes the selected project from the database and refetches data.
   */
  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    try {
      await removeProject(selectedProject);
      await fetchData();
      handleMenuClose();
    } catch (err) {
      console.error("Failed to delete project:", err);
      setError('Failed to delete project.');
    }
  };

  /**
   * Changes a project's status in the database and refetches data.
   */
  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await changeProjectStatus(projectId, newStatus);
      await fetchData();
      handleMenuClose();
    } catch (err) {
      console.error("Failed to change project status:", err);
      setError('Failed to change project status.');
    }
  };

  /**
   * Creates a new project in the database and refetches data.
   */
  const handleCreateProject = async () => {
    try {
      await addProject(newProject);
      setNewProject({
        name: '',
        client: '',
        status: 'active',
        dueDate: '',
        team: []
      });
      setOpenCreateDialog(false);
      await fetchData();
    } catch (err) {
      console.error("Failed to create project:", err);
      setError('Failed to create project. Please check the client name.');
    }
  };

  /**
   * Updates the new project form state on input change.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Updates the team selection for the new project form.
   */
  const handleTeamChange = (event) => {
    const { value } = event.target;
    setNewProject(prev => ({ ...prev, team: value }));
  };

  return {
    projects,
    searchTerm,
    setSearchTerm,
    openCreateDialog,
    setOpenCreateDialog,
    newProject,
    setNewProject,
    anchorEl,
    selectedProject,
    teamMembers,
    filteredProjects,
    error,
    handleMenuOpen,
    handleMenuClose,
    handleDeleteProject,
    handleStatusChange,
    handleCreateProject,
    handleInputChange,
    handleTeamChange,
    updateProject
  };
};