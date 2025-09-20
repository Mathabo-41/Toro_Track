// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
'use client';

import { useState, useEffect } from 'react';
import { getProjects, getTeamMembers } from '../projectsService/page';

//manage state and logic for this screen
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    status: 'low priority',
    dueDate: '',
    team: []
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  // Where we will use React Query to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
        const teamMembersData = await getTeamMembers();
        setTeamMembers(teamMembersData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // This is where we filter the projects so that when admin search them by name they are displayed
  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.client.toLowerCase().includes(searchLower) ||
      project.status.toLowerCase().includes(searchLower)
    );
  });

  //UPDATING THE DATA OF A PROJECT 
  const updateProject = (updatedProject) => {
  setProjects((prev) =>
    prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
  );
};


  // This is where we will send data to the database.
  const handleMenuOpen = (event, projectId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const handleDeleteProject = () => {
    setProjects(projects.filter(project => project.id !== selectedProject));
    handleMenuClose();
  };

  const handleStatusChange = (projectId, newStatus) => {
    setProjects(projects.map(project =>
      project.id === projectId ? { ...project, status: newStatus } : project
    ));
    handleMenuClose();
  };

  const handleCreateProject = () => {
    const project = {
      id: projects.length + 1,
      ...newProject,
      progress: newProject.status === 'completed' ? 100 :
        newProject.status === 'low priority' ? 30 : 10
    };
    setProjects([...projects, project]);
    setNewProject({
      name: '',
      client: '',
      status: 'low priority',
      dueDate: '',
      team: []
    });
    setOpenCreateDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (event) => {
    const { value } = event.target;
    setNewProject(prev => ({ ...prev, team: value }));
  };

  // This is where we call the data that we are sending anf fetching from the database. We call it so that it can be displayed
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