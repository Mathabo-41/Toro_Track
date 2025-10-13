// This file contains all the logic and instructions for this feature.
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getProjects,
  getTeamMembers,
  getClients,
  addProject,
  removeProject,
  changeProjectStatus,
  updateProjectDetails,
  updateProjectProgress, // Import the new function
} from '../projectsService/page';

// This hook manages state and logic for the projects screen.
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    status: 'active',
    dueDate: '',
    team: '',
    progress: 0
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    try {
      const [projectsData, teamMembersData, clientsData] = await Promise.all([
        getProjects(),
        getTeamMembers(),
        getClients()
      ]);
      
      setProjects(projectsData || []);
      setTeamMembers(teamMembersData || []);
      setClients(clientsData || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError('Could not load data. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.client?.toLowerCase().includes(searchLower) ||
      project.status.toLowerCase().includes(searchLower)
    );
  });

  const updateProject = async (updatedProject) => {
    try {
      await updateProjectDetails(updatedProject);
      await fetchData();
    } catch (err) {
      console.error("Failed to update project:", err);
      setError('Failed to update project.');
    }
  };

  const handleProgressChange = async (projectId, progress) => {
    try {
      await updateProjectProgress(projectId, progress);
      await fetchData(); // Refetch data to get the latest progress
    } catch (err) {
      console.error("Failed to update project progress:", err);
      setError('Failed to update project progress.');
    }
  };

  const handleMenuOpen = (event, projectId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

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

  const handleCreateProject = async () => {
    try {
      const teamAsArray = Array.isArray(newProject.team) 
        ? newProject.team 
        : newProject.team.split(',').map(item => item.trim()).filter(Boolean);
        
      const projectPayload = { 
        ...newProject, 
        team: teamAsArray
      };

      await addProject(projectPayload);
      setNewProject({
        name: '',
        client: '',
        status: 'active',
        dueDate: '',
        team: '',
        progress: 0
      });
      setOpenCreateDialog(false);
      await fetchData();
    } catch (err) {
      console.error("Failed to create project:", err);
      setError('Failed to create project. Please check the client name.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (event) => {
    const { value } = event.target;
    setNewProject(prev => ({ ...prev, team: value }));
  };

  return {
    projects,
    clients,
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
    handleProgressChange,
    updateProject
  };
};