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
  updateProjectDetails
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
  
  // ADD THIS: Local state to store progress (temporary solution)
  const [localProgress, setLocalProgress] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const [projectsData, teamMembersData, clientsData] = await Promise.all([
        getProjects(),
        getTeamMembers(),
        getClients()
      ]);
      
      // ADD THIS: Initialize projects with progress from local storage or default to 0
      const projectsWithProgress = (projectsData || []).map(project => ({
        ...project,
        progress: localProgress[project.id] || project.progress || 0
      }));
      
      setProjects(projectsWithProgress);
      setTeamMembers(teamMembersData || []);
      setClients(clientsData || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError('Could not load data. Please try again later.');
    }
  }, [localProgress]); // ADD localProgress to dependencies

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ADD THIS: Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('projectProgress');
    if (savedProgress) {
      setLocalProgress(JSON.parse(savedProgress));
    }
  }, []);

  // ADD THIS: Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('projectProgress', JSON.stringify(localProgress));
  }, [localProgress]);

  // UPDATE THIS: Use projects with combined progress
  const projectsWithProgress = projects.map(project => ({
    ...project,
    progress: localProgress[project.id] || project.progress || 0
  }));

  const filteredProjects = projectsWithProgress.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.client?.toLowerCase().includes(searchLower) ||
      project.status.toLowerCase().includes(searchLower)
    );
  });

  const updateProject = async (updatedProject) => {
    try {
      // Remove progress from the update since database doesn't have the column
      const { progress, ...projectWithoutProgress } = updatedProject;
      await updateProjectDetails(projectWithoutProgress);
      await fetchData();
    } catch (err) {
      console.error("Failed to update project:", err);
      setError('Failed to update project.');
    }
  };

  // UPDATE THIS: Progress update handler (local storage only)
  const handleProgressChange = async (projectId, progress) => {
    try {
      // Store progress locally since database doesn't have the column
      setLocalProgress(prev => ({
        ...prev,
        [projectId]: progress
      }));
      
      // Update local projects state immediately for better UX
      setProjects(prev => prev.map(p => 
        p.id === projectId ? { ...p, progress: progress } : p
      ));
      
      return { data: { id: projectId, progress }, error: null };
    } catch (err) {
      console.error("Failed to update project progress:", err);
      setError('Failed to update project progress.');
      return { data: null, error: err };
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
      // Also remove from local progress
      setLocalProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[selectedProject];
        return newProgress;
      });
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
      const teamAsArray = newProject.team.split(',').map(item => item.trim()).filter(Boolean);
      const projectPayload = { 
        ...newProject, 
        team: teamAsArray
        // Don't send progress to database since column doesn't exist
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
    projects: projectsWithProgress, // RETURN projects with progress
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