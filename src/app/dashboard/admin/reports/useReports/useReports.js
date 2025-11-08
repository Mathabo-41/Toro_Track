"use client";
// Contains all the logic and instructions for this feature.

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseClient } from '@/lib/supabase/client';
import * as service from '../reportsService/service';

export const useReports = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const supabase = createSupabaseClient();
  
  // --- Page State ---
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
  const [isLogoutSnackbar, setIsLogoutSnackbar] = useState(false);

  // --- Data Fetching with useQuery ---
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['performanceReportsData'],
    queryFn: service.getPerformanceReportsData,
    // Add staleTime to avoid refetching on every navigation
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // --- Memoized Data (derived from useQuery) ---
  const reports = useMemo(() => data?.reports || service.createEmptyMetrics(), [data]);
  const projects = useMemo(() => data?.projects || [], [data]);
  const teamMembers = useMemo(() => data?.teamMembers || [], [data]);
  const currentUser = useMemo(() => data?.currentUser || null, [data]);
  
  const currentProject = projects.length > 0 ? projects[currentProjectIndex] : null;

  // --- Snackbar Helper ---
  const showSnackbar = (message, severity = 'success', isLogout = false) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsLogoutSnackbar(isLogout);
    setOpenSnackbar(true);
  };

  // --- Mutations (for Create, Update, Delete) ---
  
  // Save Task (Create/Update)
  const saveTaskMutation = useMutation({
    mutationFn: async ({ task, columnId, isEditing, projectId }) => {
      if (isEditing) {
        return service.updateTask(task.id, { ...task, status: columnId, due_date: task.dueDate });
      } else {
        return service.createTask({ ...task, projectId: projectId, status: 'backlog' });
      }
    },
    onSuccess: () => {
      // Refetch all data to stay in sync
      queryClient.invalidateQueries({ queryKey: ['performanceReportsData'] });
      showSnackbar(isEditing ? 'Task updated successfully' : 'Task added successfully');
      setOpenTaskDialog(false);
    },
    onError: (err) => {
      showSnackbar(isEditing ? `Error updating task: ${err.message}` : `Error adding task: ${err.message}`, 'error');
    }
  });

  // Delete Task
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId) => service.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['performanceReportsData'] });
      showSnackbar('Task deleted successfully');
    },
    onError: (err) => {
      showSnackbar(`Error deleting task: ${err.message}`, 'error');
    }
  });

  // Move Task
  const moveTaskMutation = useMutation({
    mutationFn: ({ taskId, toColumn }) => service.updateTask(taskId, { status: toColumn }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['performanceReportsData'] });
      showSnackbar('Task status updated!', 'success');
    },
    onError: (err) => {
      showSnackbar(`Error: Could not update task status.`, 'error');
      // Invalidate to revert optimistic update
      queryClient.invalidateQueries({ queryKey: ['performanceReportsData'] });
    }
  });

  // --- Event Handlers (Logic) ---

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
  
  const handleProjectMenuClose = () => setProjectMenuAnchor(null);
  const handleProjectSelect = (index) => {
    setCurrentProjectIndex(index);
    handleProjectMenuClose();
  };
  const handleProjectMenuOpen = (event) => setProjectMenuAnchor(event.currentTarget);

  const handleAddTaskClick = (columnId) => {
    setCurrentColumn('backlog');
    setCurrentTask({
      title: '',
      description: '',
      assignee_id: null,
      assignee_team: null,
      dueDate: ''
    });
    setIsEditing(false);
    setOpenTaskDialog(true);
  };

  const handleEditTaskClick = (task, columnId) => {
    setCurrentColumn(columnId);
    setCurrentTask({
      ...task,
      assignee_id: task.assignee_id || null,
      dueDate: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : '' // Format for date input
    });
    setIsEditing(true);
    setOpenTaskDialog(true);
  };

  const handleDeleteTaskClick = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  const handleSaveTask = () => {
    if (!currentTask || !currentTask.title) {
      showSnackbar('Task title is required', 'error');
      return;
    }
    if (!currentProject) {
      showSnackbar('No project selected', 'error');
      return;
    }

    saveTaskMutation.mutate({
      task: currentTask,
      columnId: currentColumn,
      isEditing: isEditing,
      projectId: currentProject.id
    });
  };

  const moveTask = (taskId, fromColumn, toColumn) => {
    // Optimistic update
    queryClient.setQueryData(['performanceReportsData'], (oldData) => {
      if (!oldData) return;
      const updatedProjects = [...oldData.projects];
      const projectToUpdate = updatedProjects[currentProjectIndex];
      if (!projectToUpdate) return oldData;

      const fromCol = projectToUpdate.columns[fromColumn];
      if (!fromCol) return oldData;
      
      const taskIndex = fromCol.tasks.findIndex(t => t.id === taskId);
      if (taskIndex === -1) return oldData;

      const [movedTask] = fromCol.tasks.splice(taskIndex, 1);
      movedTask.status = toColumn;
      
      if (projectToUpdate.columns[toColumn]) {
        projectToUpdate.columns[toColumn].tasks.push(movedTask);
      } else if (projectToUpdate.columns['in_progress']) {
        // Handle 'inProgress' vs 'in_progress' mismatch
        projectToUpdate.columns['in_progress'].tasks.push(movedTask);
      }

      return { ...oldData, projects: updatedProjects };
    });
    
    // Call mutation to update the backend
    moveTaskMutation.mutate({ taskId, toColumn });
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);
  const handleViewModeChange = (e, newViewMode) => {
    if (newViewMode) {
      setViewMode(newViewMode);
    }
  };

  const handleLogout = async () => {
    showSnackbar('Logging out...', 'success', true);
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push('/login');
    }, 1500);
  };
  
  // --- Getters (Formatting) ---
  const getAssigneeColor = (assigneeId) => {
    if (!assigneeId) return '#888';
    const member = teamMembers.find(m => m.id === assigneeId);
    return member ? member.color : '#888';
  };

  const getAssigneeName = (task) => {
    const userName = teamMembers.find(m => m.id === task.assignee_id)?.name;
    return userName || task.assignee_team || 'Unassigned';
  };

  const getAssigneeRole = (task) => {
    if (task.assignee_team) return 'Team';
    if (task.assignee_id) {
        const member = teamMembers.find(m => m.id === task.assignee_id);
        return member ? (member.role || 'member') : 'unassigned';
    }
    return 'unassigned';
  };

  const getColumnColor = (columnId) => {
    const colors = {
      backlog: '#E71D36',
      in_progress: '#FF9F1C', 
      done: '#2EC4B6'
    };
    return colors[columnId] || '#6b705c';
  };

  const getColumnIcon = (columnId) => {
    const icons = {
      backlog: <service.BacklogIcon />,
      in_progress: <service.InProgressIcon />, 
      done: <service.DoneIcon />
    };
    return icons[columnId] || <service.BacklogIcon />;
  };

  const getTotalTasksForProject = (project) => {
    if (!project || !project.columns) return 0;
    return Object.values(project.columns).reduce((total, column) => {
      return total + (column?.tasks?.length || 0);
    }, 0);
  };

  // Return all state and handlers for the component to use
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
    openTaskDialog, 
    isEditing, 
    openSnackbar, 
    snackbarSeverity, 
    snackbarMessage,
    isLogoutSnackbar,
    currentTask,
    currentColumn,
    currentUser,
    
    // Actions
    handleNextProject, 
    handlePreviousProject, 
    handleProjectMenuClose,
    handleProjectMenuOpen,
    handleProjectSelect,
    setOpenTaskDialog,
    handleAddTaskClick,
    handleEditTaskClick,
    handleDeleteTaskClick,
    handleSaveTask,
    moveTask,
    handleSnackbarClose,
    handleViewModeChange,
    handleLogout,
    
    // Setters for form state
    setCurrentTask,
    setCurrentColumn,
    
    // Getters
    getAssigneeColor,
    getAssigneeName,
    getAssigneeRole,
    getColumnColor,
    getColumnIcon,
    getTotalTasks: getTotalTasksForProject
  };
};