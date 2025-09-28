"use client";
// Contains all the logic and instructions for this feature.

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as service from '../reportsService/page';

export const useReports = () => {
  const [reports, setReports] = useState({});
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [viewMode, setViewMode] = useState('kanban');
  const [projectMenuAnchor, setProjectMenuAnchor] = useState(null);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [currentTask, setCurrentTask] = useState(null);
  const [currentColumn, setCurrentColumn] = useState('backlog');

  const router = useRouter();
  
  const currentUser = { id: 'user-uuid-admin', role: 'admin' };
  const rolePermissions = {
      admin: { canEdit: true, canDelete: true, canMove: true, canAdd: true },
      auditor: { canEdit: true, canDelete: false, canMove: true, canAdd: true },
      client: { canEdit: true, canDelete: false, canMove: false, canAdd: true }
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [
        reportsData, 
        kanbanData, 
        membersData
      ] = await Promise.all([
        service.fetchReportMetrics(),
        service.fetchKanbanData(),
        service.fetchTeamMembers()
      ]);
      
      setReports(reportsData || {});
      setProjects(kanbanData || []);
      setTeamMembers(membersData || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);
  
  const handleNextProject = () => {
    if (currentProjectIndex < projects.length - 1) {
        setCurrentProjectIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePreviousProject = () => {
      if (currentProjectIndex > 0) {
          setCurrentProjectIndex(prevIndex => prevIndex - 1);
      }
  };
  
  const currentProject = projects.length > 0 ? projects[currentProjectIndex] : null;

  const handleProjectMenuClose = () => setProjectMenuAnchor(null);

  // NEW: Handle project selection from dropdown
  const handleProjectSelect = (index) => {
    setCurrentProjectIndex(index);
    handleProjectMenuClose();
  };

  // NEW: Handle opening project menu
  const handleProjectMenuOpen = (event) => {
    setProjectMenuAnchor(event.currentTarget);
  };

  // NEW: Handle adding a new task
  const handleAddTask = (columnId) => {
    if (!rolePermissions[currentUser.role].canAdd) {
      setSnackbarMessage('You do not have permission to add tasks');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    
    setCurrentColumn('backlog'); // Always set to backlog for new tasks
    setCurrentTask({
      id: 0,
      title: '',
      assignee: '',
      assigneeRole: '',
      description: '',
      dueDate: ''
    });
    setIsEditing(false);
    setOpenTaskDialog(true);
  };

  // NEW: Handle editing a task
  const handleEditTask = (task, columnId) => {
    // Check if current user can edit this task
    const canEdit = rolePermissions[currentUser.role].canEdit || 
                   (task.assignee === currentUser.name && rolePermissions[task.assigneeRole]?.canEdit);
    
    if (!canEdit) {
      setSnackbarMessage('You do not have permission to edit this task');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    
    setCurrentColumn(columnId);
    setCurrentTask(task);
    setIsEditing(true);
    setOpenTaskDialog(true);
  };

  // NEW: Handle deleting a task
  const handleDeleteTask = async (taskId, columnId) => {
    const task = currentProject.columns[columnId].tasks.find(t => t.id === taskId);
    
    // Check permissions
    const canDelete = rolePermissions[currentUser.role].canDelete || 
                     (task.assignee === currentUser.name && rolePermissions[task.assigneeRole]?.canDelete);
    
    if (!canDelete) {
      setSnackbarMessage('You do not have permission to delete this task');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      // Call service to delete task from database
      await service.deleteTask(taskId);
      
      // Update local state
      const updatedProjects = [...projects];
      const column = updatedProjects[currentProjectIndex].columns[columnId];
      column.tasks = column.tasks.filter(task => task.id !== taskId);
      setProjects(updatedProjects);
      
      setSnackbarMessage('Task deleted successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Failed to delete task');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  // NEW: Handle saving a task (both new and edited)
  const handleSaveTask = async (task, columnId, isEditing) => {
    if (!task || !task.title) {
      setSnackbarMessage('Task title is required');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      if (isEditing) {
        // Update existing task in database
        await service.updateTask(task.id, {
          ...task,
          status: columnId // Update the task status/column
        });
        
        // Update local state
        const updatedProjects = [...projects];
        const project = updatedProjects[currentProjectIndex];
        
        // Remove from current column and add to new column
        let found = false;
        for (const columnKey in project.columns) {
          const column = project.columns[columnKey];
          const taskIndex = column.tasks.findIndex(t => t.id === task.id);
          if (taskIndex !== -1) {
            column.tasks.splice(taskIndex, 1);
            found = true;
            break;
          }
        }
        // Add to new column
        project.columns[columnId].tasks.push(task);
        
        setProjects(updatedProjects);
        setSnackbarMessage('Task updated successfully');
      } else {
        // Add new task to database - ALWAYS to backlog
        const newTaskData = {
          ...task,
          projectId: currentProject.id,
          status: 'backlog' // Always set to backlog for new tasks
        };
        
        const savedTask = await service.createTask(newTaskData);
        
        // Update local state
        const updatedProjects = [...projects];
        const project = updatedProjects[currentProjectIndex];
        project.columns.backlog.tasks.push(savedTask);
        
        setProjects(updatedProjects);
        setSnackbarMessage('Task added to backlog successfully');
      }
      
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setOpenTaskDialog(false);
    } catch (error) {
      setSnackbarMessage(isEditing ? 'Failed to update task' : 'Failed to create task');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  // NEW: Move task between columns
  const moveTask = async (taskId, fromColumn, toColumn) => {
    const task = currentProject.columns[fromColumn].tasks.find(t => t.id === taskId);
    
    // Check permissions
    const canMove = rolePermissions[currentUser.role].canMove || 
                   (task.assignee === currentUser.name && rolePermissions[task.assigneeRole]?.canMove);
    
    if (!canMove) {
      setSnackbarMessage('You do not have permission to move this task');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      // Update task status in database
      await service.updateTask(taskId, { status: toColumn });
      
      // Update local state
      const updatedProjects = [...projects];
      const project = updatedProjects[currentProjectIndex];
      
      // Find task
      const fromCol = project.columns[fromColumn];
      const taskIndex = fromCol.tasks.findIndex(t => t.id === taskId);
      
      if (taskIndex !== -1) {
        const task = fromCol.tasks[taskIndex];
        // Remove from source column
        fromCol.tasks.splice(taskIndex, 1);
        // Add to target column
        project.columns[toColumn].tasks.push(task);
        
        setProjects(updatedProjects);
        setSnackbarMessage(`Task moved to ${toColumn === 'inProgress' ? 'In Progress' : toColumn === 'done' ? 'Done' : 'Backlog'}`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('Failed to move task');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  // NEW: Handle snackbar close
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // NEW: Handle view mode change
  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
  };

  return {
    // State
    reports, 
    projects, 
    teamMembers, 
    loading, 
    error, 
    menu: service.adminMenuData,
    currentProjectIndex, 
    currentProject, 
    viewMode, 
    projectMenuAnchor, 
    rolePermissions,
    openTaskDialog, 
    isEditing, 
    openSnackbar, 
    snackbarSeverity, 
    snackbarMessage,
    currentTask,
    currentColumn,
    
    // Actions
    handleNextProject, 
    handlePreviousProject, 
    handleProjectMenuClose,
    handleProjectMenuOpen,
    handleProjectSelect,
    setOpenTaskDialog,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleSaveTask,
    moveTask,
    handleSnackbarClose,
    handleViewModeChange,
    
    // Setters for form state
    setCurrentTask,
    setCurrentColumn,
    setIsEditing
  };
};