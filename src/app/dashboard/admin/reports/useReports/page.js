"use client";
// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as service from '../reportsService/page';

//manage state and logic for this screen
export const useReports = () => {
  // Data states
  const [reports, setReports] = useState({});
  const [activities, setActivities] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI states
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentColumnId, setCurrentColumnId] = useState('backlog');
  const [isEditing, setIsEditing] = useState(false);
  const [projectMenuAnchor, setProjectMenuAnchor] = useState(null);
  const [viewMode, setViewMode] = useState('kanban');
  
  // Simulated user for permissions - in a real app, this would come from an auth context
  const currentUser = { id: 'user-uuid-admin', role: 'admin' }; 
  const rolePermissions = {
      admin: { canEdit: true, canDelete: true, canMove: true, canAdd: true },
      auditor: { canEdit: true, canDelete: false, canMove: true, canAdd: true },
      client: { canEdit: true, canDelete: false, canMove: false, canAdd: true }
  };

  // Fetch all data on component mount
  useEffect(() => {
    async function loadReportData() {
      try {
        setLoading(true);
        const [
          reportsData, 
          activitiesData, 
          kanbanData, 
          membersData
        ] = await Promise.all([
          service.fetchReportMetrics(),
          service.fetchRecentActivities(),
          service.fetchKanbanData(),
          service.fetchTeamMembers()
        ]);
        
        setReports(reportsData);
        setActivities(activitiesData);
        setProjects(kanbanData);
        setTeamMembers(membersData);

      } catch (err) {
        setError(err.message);
        showSnackbar(err.message, 'error');
      } finally {
        setLoading(false);
      }
    }
    loadReportData();
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  
  // Kanban handlers
  const handleAddTask = (columnId) => {
    if (!rolePermissions[currentUser.role].canAdd) {
        showSnackbar('You do not have permission to add tasks', 'error');
        return;
    }
    setCurrentColumnId(columnId);
    setCurrentTask({ title: '', description: '', assignee_id: null, due_date: '' });
    setIsEditing(false);
    setOpenTaskDialog(true);
  };
  
  const handleEditTask = (task, columnId) => {
    if (!rolePermissions[currentUser.role].canEdit) {
        showSnackbar('You do not have permission to edit this task', 'error');
        return;
    }
    setCurrentColumnId(columnId);
    setCurrentTask(task);
    setIsEditing(true);
    setOpenTaskDialog(true);
  };
  
  const handleDeleteTask = async (taskId, columnId) => {
    if (!rolePermissions[currentUser.role].canDelete) {
        showSnackbar('You do not have permission to delete this task', 'error');
        return;
    }
    try {
        await service.deleteTask(taskId);
        const updatedProjects = [...projects];
        const column = updatedProjects[currentProjectIndex].columns[columnId];
        column.tasks = column.tasks.filter(task => task.id !== taskId);
        setProjects(updatedProjects);
        showSnackbar('Task deleted successfully');
    } catch (err) {
        showSnackbar(err.message, 'error');
    }
  };

  const handleSaveTask = async () => {
    if (!currentTask || !currentTask.title) {
        showSnackbar('Task title is required', 'error');
        return;
    }

    if (isEditing) {
        // Update logic will go here if needed, for now we focus on adding
    } else {
        const currentProject = projects[currentProjectIndex];
        const taskPayload = {
            projectId: currentProject.id,
            title: currentTask.title,
            description: currentTask.description,
            assigneeId: currentTask.assignee_id,
            dueDate: currentTask.due_date,
        };
        try {
            const newTask = await service.addTask(taskPayload);
            const updatedProjects = [...projects];
            const project = updatedProjects[currentProjectIndex];
            project.columns.backlog.tasks.push(newTask);
            setProjects(updatedProjects);
            showSnackbar('Task added successfully');
        } catch(err) {
            showSnackbar(err.message, 'error');
        }
    }
    setOpenTaskDialog(false);
  };

  const moveTask = async (taskId, fromColumnId, toColumnId) => {
    if (!rolePermissions[currentUser.role].canMove) {
        showSnackbar('You do not have permission to move this task', 'error');
        return;
    }
    try {
        await service.updateTaskStatus(taskId, toColumnId.replace('inProgress', 'in_progress'));
        
        // Optimistic UI update
        const updatedProjects = JSON.parse(JSON.stringify(projects));
        const project = updatedProjects[currentProjectIndex];
        const fromColumn = project.columns[fromColumnId];
        const taskIndex = fromColumn.tasks.findIndex(t => t.id === taskId);

        if (taskIndex > -1) {
            const [task] = fromColumn.tasks.splice(taskIndex, 1);
            task.status = toColumnId.replace('inProgress', 'in_progress');
            project.columns[toColumnId].tasks.push(task);
            setProjects(updatedProjects);
            showSnackbar('Task moved successfully');
        }
    } catch(err) {
        showSnackbar(err.message, 'error');
    }
  };

  const handleProjectChange = (direction) => {
    if (direction === 'next' && currentProjectIndex < projects.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
    } else if (direction === 'prev' && currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    }
  };

  // Other UI handlers
  const handleLogout = () => {
    showSnackbar('Logging out...', 'info');
    setTimeout(() => router.push('/login'), 1500);
  };
  const handleExport = (format) => showSnackbar(`Downloading report in ${format} format...`, 'info');
  const handleProjectMenuOpen = (e) => setProjectMenuAnchor(e.currentTarget);
  const handleProjectMenuClose = () => setProjectMenuAnchor(null);
  const handleProjectSelect = (index) => {
    setCurrentProjectIndex(index);
    handleProjectMenuClose();
  };

  return {
    reports, activities, projects, teamMembers, loading, error, menu: service.adminMenuData,
    currentUser, rolePermissions,
    openSnackbar, snackbarMessage, snackbarSeverity, setOpenSnackbar,
    currentProjectIndex, currentProject: projects[currentProjectIndex],
    openTaskDialog, setOpenTaskDialog, currentTask, setCurrentTask, isEditing,
    projectMenuAnchor, viewMode, setViewMode,
    handleLogout, handleExport, handleProjectMenuOpen, handleProjectMenuClose,
    handleProjectSelect, handleAddTask, handleEditTask, handleDeleteTask,
    handleSaveTask, moveTask, handleProjectChange
  };
};