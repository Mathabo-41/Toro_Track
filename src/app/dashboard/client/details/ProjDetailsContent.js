// This is the main UI component for the Project Details screen.
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography, Grid, Card, CardContent,
  Stack, List, ListItem, ListItemText,
  Button, Drawer, ListItemButton,
  Chip,
  Tabs, Tab, IconButton, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Alert,
  Paper,AppBar, Toolbar,
  Menu as MenuIcon,
  LinearProgress
} from '@mui/material';
import {
  Assignment as ProjectIcon,
  Logout as LogoutIcon,
  CheckCircle as DoneIcon,
  Build as InProgressIcon,
  PlaylistAdd as BacklogIcon,
  Dashboard as DashboardIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  Folder as FolderIcon,
  Chat as ChatIcon,
  ViewKanban as KanbanIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

// Import styles
import { mainContentStyles, headerStyles, tabsStyles } from './styles';
import * as globalStyles from '../common/styles';
import { useClientStore, clientMenu } from '../common/clientStore';
import LoadingScreen from '../common/LoadingScreen';

// Kanban board column colors
const COLUMN_COLORS = {
  backlog: '#E71D36',
  in_progress: '#FF9F1C',
  done: '#2EC4B6'
};

// Added the drawerWidth constant
const drawerWidth = 260;

// Application color theme
const COLORS = {
  primary: '#283618',
  secondary: '#606c38',
  accent: '#f3722c',
  background: '#fefae0',
  lightBackground: 'rgba(254, 250, 224, 0.1)',
  text: '#283618',
  textLight: 'rgba(254, 250, 224, 0.8)',
  border: '#6b705c',
  success: '#2e7d32',
  error: '#d32f2f',
  warning: '#ed6c02'
};

// Custom hook for tab management
const useDetails = (projectId) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return {
    activeTab,
    handleTabChange,
  };
};

/**
 * Get user profile picture from multiple sources
 */
const getUserProfilePicture = async (supabase, user) => {
  if (!user) return '/toroLogo.jpg';

  try {
    console.log('🖼️ Fetching profile picture for user:', user.id);

    // SOURCE 1: Check client_profiles table first
    const { data: clientProfile, error: clientError } = await supabase
      .from('client_profiles')
      .select('avatar_url, profile_picture, image_url')
      .eq('user_id', user.id)
      .single();

    if (!clientError && clientProfile) {
      const avatarUrl = clientProfile.avatar_url || clientProfile.profile_picture || clientProfile.image_url;
      if (avatarUrl) {
        console.log('✅ Found avatar in client_profiles:', avatarUrl);
        return avatarUrl;
      }
    }

    // SOURCE 2: Check profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('avatar_url, profile_picture, image_url')
      .eq('id', user.id)
      .single();

    if (!profileError && profile) {
      const avatarUrl = profile.avatar_url || profile.profile_picture || profile.image_url;
      if (avatarUrl) {
        console.log('✅ Found avatar in profiles:', avatarUrl);
        return avatarUrl;
      }
    }

    // SOURCE 3: Use Supabase Auth user_metadata
    if (user.user_metadata?.avatar_url) {
      console.log('✅ Found avatar in user_metadata:', user.user_metadata.avatar_url);
      return user.user_metadata.avatar_url;
    }

    console.log('📷 No profile picture found, using default');
    return '/toroLogo.jpg';

  } catch (error) {
    console.error('❌ Error fetching profile picture:', error);
    return '/toroLogo.jpg';
  }
};

/**
 * Main Project Details Component
 * Displays project information, team details, and Kanban board for task tracking
 */
export default function ProjDetailsContent() {
  const supabase = createSupabaseClient();
  const router = useRouter();
  const { profile, fetchProfile } = useClientStore();

  // State management
  const [projects, setProjects] = useState([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [kanbanColumns, setKanbanColumns] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentColumnId, setCurrentColumnId] = useState('backlog');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectFiles, setProjectFiles] = useState([]);
  const [clientProfile, setClientProfile] = useState(null);
  const [profilePicture, setProfilePicture] = useState('/toroLogo.jpg');
  const [sidebarOpen] = React.useState(true);

  // mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const currentProject = projects.length > 0 ? projects[currentProjectIndex] : null;

  // Custom hook for tab management
  const {
    activeTab,
    handleTabChange,
  } = useDetails(currentProject?.id);

 /**
   * Initialize empty columns
   */
  const initializeEmptyColumns = React.useCallback(() => {
    const emptyColumns = {
      backlog: { id: 'backlog', title: 'Backlog', color: COLUMN_COLORS.backlog, icon: <BacklogIcon />, tasks: [] },
      in_progress: { id: 'in_progress', title: 'In Progress', color: COLUMN_COLORS.in_progress, icon: <InProgressIcon />, tasks: [] },
      done: { id: 'done', title: 'Done', color: COLUMN_COLORS.done, icon: <DoneIcon />, tasks: [] }
    };
    setKanbanColumns(emptyColumns);
  }, []); // No dependencies

  /**
   * Organize tasks into Kanban columns
   */
  const organizeTasksIntoColumns = React.useCallback((tasks) => {
    const columns = {
      backlog: {
        id: 'backlog',
        title: 'Backlog',
        color: COLUMN_COLORS.backlog,
        icon: <BacklogIcon />,
        tasks: []
      },
      in_progress: {
        id: 'in_progress',
        title: 'In Progress',
        color: COLUMN_COLORS.in_progress,
        icon: <InProgressIcon />,
        tasks: []
      },
      done: {
        id: 'done',
        title: 'Done',
        color: COLUMN_COLORS.done,
        icon: <DoneIcon />,
        tasks: []
      }
    };

    if (tasks && tasks.length > 0) {
      tasks.forEach(task => {
        let columnId = 'backlog';

        if (task.status === 'in_progress' || task.status === 'in progress') {
          columnId = 'in_progress';
        } else if (task.status === 'done' || task.status === 'completed') {
          columnId = 'done';
        } else if (task.status === 'backlog' || task.status === 'todo') {
          columnId = 'backlog';
        }

        if (columns[columnId]) {
          columns[columnId].tasks.push(task);
        }
      });
    }

    setKanbanColumns(columns);
  }, []); // No dependencies

  /**
   * Fetch tasks for a specific project
   */
  const fetchTasksForProject = React.useCallback(async (projectId) => {
    try {
      const { data: tasks, error } = await supabase
        .from('project_tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching tasks:', error);
        initializeEmptyColumns();
        return;
      }

      organizeTasksIntoColumns(tasks || []);
    } catch (error) {
      console.error('Error in fetchTasksForProject:', error);
      initializeEmptyColumns();
    }
  }, [supabase, organizeTasksIntoColumns, initializeEmptyColumns]); // Added dependencies

  /**
   * Fetch project files
   */
  const fetchProjectFiles = React.useCallback(async (projectId) => {
    try {
      const { data: files, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Error fetching project files:', error);
        return;
      }

      if (files) {
        setProjectFiles(files);
      }
    } catch (error) {
      console.error('Error fetching project files:', error);
    }
  }, [supabase]); // Added supabase dependency

  /**
   * Fetch additional project data (tasks, team, files)
   */
  const fetchAdditionalProjectData = React.useCallback(async (projectId) => {
    try {
      // Fetch tasks
      await fetchTasksForProject(projectId);

      // Fetch project files
      await fetchProjectFiles(projectId);

    } catch (error) {
      console.error('Error fetching additional project data:', error);
    }
  }, [fetchTasksForProject, fetchProjectFiles]); // Dependencies are now declared


  // Fetch current user from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  /**
   * Fetch all necessary data
   */
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        console.log('🔄 Starting data initialization...');

        // Show loading message when screen opens
        setSnackbarMessage('Loading projects...');
        setSnackbarSeverity('info');
        setOpenSnackbar(true);

        // 1. Get current authenticated user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) {
          console.error('❌ Auth error:', userError);
          setSnackbarMessage('Authentication error. Please log in again.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
          return;
        }

        if (!user) {
          console.log('❌ No user found');
          setSnackbarMessage('Please log in to view projects');
          setSnackbarSeverity('warning');
          setOpenSnackbar(true);
          router.push('/login');
          return;
        }

        setCurrentUser(user);
        console.log('✅ Authenticated user:', user.email, 'ID:', user.id);

        // Fetch profile picture first
        const userAvatar = await getUserProfilePicture(supabase, user);
        setProfilePicture(userAvatar);

        // 2. Try multiple approaches to find client data
        let clientData = null;
        let projectsData = [];

        //  Try client_profiles table
        console.log('🔍 Searching in client_profiles table...');
        const { data: clientProfileData, error: clientError } = await supabase
          .from('client_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (clientError) {
          console.log('❌ client_profiles error:', clientError);
        } else {
          clientData = clientProfileData;
          console.log('✅ Found in client_profiles:', clientData);
        }

        //  Try profiles table if client_profiles failed
        if (!clientData) {
          console.log('🔍 Searching in profiles table...');
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (!profileError && profileData) {
            clientData = {
              id: profileData.id,
              user_id: profileData.id,
              name: profileData.full_name || user.user_metadata?.full_name || 'Client',
              email: profileData.email || user.email,
              company: profileData.company || '',
              phone: profileData.phone || ''
            };
            console.log('✅ Found in profiles:', clientData);
          }
        }

        // Try clients table
        if (!clientData) {
          console.log('🔍 Searching in clients table...');
          const { data: clientsData, error: clientsError } = await supabase
            .from('clients')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (!clientsError && clientsData) {
            clientData = clientsData;
            console.log('✅ Found in clients table:', clientData);
          }
        }

        // If we found a client profile, set it
        if (clientData) {
          setClientProfile(clientData);
        }

        // 3. Fetch projects using multiple approaches
        console.log('🔍 Fetching projects...');

        // By client_id
        if (clientData?.id) {
          const { data: clientProjects, error: projectsError } = await supabase
            .from('projects')
            .select('*')
            .eq('client_id', clientData.id)
            .order('created_at', { ascending: false });

          if (!projectsError && clientProjects) {
            projectsData = clientProjects;
            console.log(`✅ Found ${clientProjects.length} projects by client_id`);
          }
        }

        //  By user_id directly
        if (projectsData.length === 0) {
          const { data: userProjects, error: userProjectsError } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (!userProjectsError && userProjects) {
            projectsData = userProjects;
            console.log(`✅ Found ${userProjects.length} projects by user_id`);
          }
        }

        // All projects (fallback)
        if (projectsData.length === 0) {
          const { data: allProjects, error: allError } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

          if (!allError && allProjects) {
            projectsData = allProjects;
            console.log(`✅ Found ${allProjects.length} total projects`);
          }
        }

        // Set the final projects data
        if (projectsData.length > 0) {
          setProjects(projectsData);
          console.log(`🎉 Successfully loaded ${projectsData.length} project(s)`);

          // Fetch additional data for the first project
          await fetchAdditionalProjectData(projectsData[0].id);

          // Don't show success message here - only show loading message initially
        } else {
          console.log('📭 No projects found for user');
          setProjects([]);
          // Don't show message for no projects found
        }

      } catch (error) {
        console.error('💥 Unexpected error in initializeData:', error);
        setSnackbarMessage('Error loading data. Please try refreshing.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        setProjects([]);
      } finally {
        setLoading(false);
        // Close the loading snackbar after a short delay
        setTimeout(() => {
          setOpenSnackbar(false);
        }, 1000);
      }
    };

    initializeData();
  }, [supabase, router,fetchAdditionalProjectData]);

  /**
   * Handle project change
   */
  const handleProjectChange = async (projectId) => {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
      setCurrentProjectIndex(projectIndex);
      await fetchAdditionalProjectData(projectId);
    }
  };

  /**
   * Handle manual refresh
   */
  const handleRefresh = async () => {
    setLoading(true);
    // Re-run initialization
    const initializeData = async () => {
      // Get current user and refetch everything
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Refetch profile picture
        const userAvatar = await getUserProfilePicture(supabase, user);
        setProfilePicture(userAvatar);

        // Refetch projects
        const { data: projectsData, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && projectsData) {
          setProjects(projectsData);
          if (projectsData.length > 0) {
            await fetchAdditionalProjectData(projectsData[0].id);
          }
          // Don't show message on refresh
        }
      }
      setLoading(false);
    };
    await initializeData();
  };

  /**
   * Handle logout - EXACT SAME AS SETTINGS SCREEN
   */
  const handleLogout = async () => {
    setSnackbarMessage('Logging out...');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push('/login');
    }, 1500);
  };

  /**
   * Handle viewing task details
   */
  const handleViewTask = (task, columnId) => {
    setCurrentColumnId(columnId);
    setCurrentTask(task);
    setOpenTaskDialog(true);
  };

  /**
   * Format status for display
   */
  const formatStatus = (status) => {
    if (!status) return '';
    return status.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  /**
   * Get project progress directly from the project data.
   */
  const getProjectProgress = () => {
    if (!currentProject) return 0;
    return currentProject.progress || 0;
  };

  /**
   * Render Kanban Board Tab
   */
  const renderKanbanTab = () => {
    if (!currentProject || !kanbanColumns) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    const progress = getProjectProgress();

   

      return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <KanbanIcon />
          Project Kanban Board
        </Typography>

        {/* Progress Summary */}
        <Paper sx={{ p: 2, mb: 3, backgroundColor: COLORS.lightBackground }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: COLORS.text, mb: 1 }}>
                Overall Progress: {progress}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: COLORS.border,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: COLORS.success
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: COLORS.text }}>
                Tasks: {kanbanColumns.done.tasks.length} completed of {Object.values(kanbanColumns).reduce((total, col) => total + col.tasks.length, 0)} total
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Kanban Board */}
        <Box sx={{ display: 'flex', overflowX: 'auto', p: 1, gap: 2 }}>
          {Object.values(kanbanColumns).map(column => (
            <Box
              key={column.id}
              sx={{
                flex: 1,
                minWidth: 300,
                p: 2,
                borderRadius: 2,
                backgroundColor: COLORS.background,
                borderTop: `4px solid ${column.color}`,
                boxShadow: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ color: column.color, mr: 1 }}>{column.icon}</Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: COLORS.text }}>
                  {column.title}
                </Typography>
                <Chip
                  label={column.tasks.length}
                  size="small"
                  sx={{
                    ml: 'auto',
                    backgroundColor: column.color,
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              </Box>

              {column.tasks.length === 0 ? (
                <Typography variant="body2" sx={{ textAlign: 'center', color: COLORS.border, fontStyle: 'italic', py: 3 }}>
                  No tasks in {column.title.toLowerCase()}
                </Typography>
              ) : (
                column.tasks.map((task) => (
                  <Paper
                    key={task.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      borderLeft: `4px solid ${column.color}`,
                      '&:hover': {
                        boxShadow: 3,
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={() => handleViewTask(task, column.id)}
                  >
                    <Typography variant="body2" sx={{ fontWeight: '500', color: COLORS.text, mb: 1 }}>
                      {task.title}
                    </Typography>
                    {task.description && (
                      <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                        {task.description.length > 80
                          ? `${task.description.substring(0, 80)}...`
                          : task.description
                        }
                      </Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {task.due_date ? new Date(task.due_date).toLocaleDateString("en-GB") : 'No due date'}
                      </Typography>
                      {task.priority && (
                        <Chip
                          label={task.priority}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: '20px',
                            fontSize: '0.6rem'
                          }}
                        />
                      )}
                    </Box>
                  </Paper>
                ))
              )}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  /**
   * Render Overview Tab
   */
  const renderOverviewTab = () => {
    if (!currentProject) return null;

    const progress = getProjectProgress();

    return (
      <Grid container spacing={3} sx={{ p: 2 }}>
        {/* Project Details */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: COLORS.background, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <DescriptionIcon />
                Project Details
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                    PROJECT NAME
                  </Typography>
                  <Typography variant="body1" sx={{ color: COLORS.text }}>
                    {currentProject.project_name || currentProject.name || 'Unnamed Project'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                    DUE DATE
                  </Typography>
                  <Typography variant="body1" sx={{ color: COLORS.text }}>
                    {currentProject.end_date ? new Date(currentProject.end_date).toLocaleDateString() : 'Not set'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                    STATUS:
                  </Typography>
                  <Chip
                    label={formatStatus(currentProject.status)}
                    sx={{
                      backgroundColor:
                        currentProject.status === 'active' ? COLORS.success :
                        currentProject.status === 'completed' ? COLUMN_COLORS.done :
                        currentProject.status === 'on_hold' ? COLUMN_COLORS.in_progress :
                        COLUMN_COLORS.backlog,
                      color: 'white'
                    }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Project Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: COLORS.background, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarIcon />
                Project Information
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                    PROGRESS
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        flexGrow: 1,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: COLORS.border,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: COLORS.success
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ color: COLORS.text, minWidth: '40px' }}>
                      {progress}%
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                    CREATED
                  </Typography>
                  <Typography variant="body1" sx={{ color: COLORS.text }}>
                    {currentProject.created_at ? new Date(currentProject.created_at).toLocaleDateString() : 'Not available'}
                  </Typography>
                </Box>
                {currentProject.due_date && (
                  <Box>
                    <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                      DUE DATE
                    </Typography>
                    <Typography variant="body1" sx={{ color: COLORS.text }}>
                      {new Date(currentProject.due_date).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}
                {currentProject.budget && (
                  <Box>
                    <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                      BUDGET
                    </Typography>
                    <Typography variant="body1" sx={{ color: COLORS.text }}>
                      ${currentProject.budget?.toLocaleString() || '0'}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: COLORS.background, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: COLORS.primary, mb: 3 }}>
                Project Summary
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: COLORS.primary, fontWeight: 'bold' }}>
                      {kanbanColumns ? Object.values(kanbanColumns).reduce((total, col) => total + col.tasks.length, 0) : 0}
                    </Typography>
                    <Typography variant="body2" sx={{ color: COLORS.border }}>
                      Total Tasks
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: COLORS.success, fontWeight: 'bold' }}>
                      {kanbanColumns ? kanbanColumns.done.tasks.length : 0}
                    </Typography>
                    <Typography variant="body2" sx={{ color: COLORS.border }}>
                      Completed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: COLUMN_COLORS.in_progress, fontWeight: 'bold' }}>
                      {kanbanColumns ? kanbanColumns.in_progress.tasks.length : 0}
                    </Typography>
                    <Typography variant="body2" sx={{ color: COLORS.border }}>
                      In Progress
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: COLUMN_COLORS.backlog, fontWeight: 'bold' }}>
                      {kanbanColumns ? kanbanColumns.backlog.tasks.length : 0}
                    </Typography>
                    <Typography variant="body2" sx={{ color: COLORS.border }}>
                      Backlog
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  /**
   * Render Team Tab
   */
  const renderTeamTab = () => {
    const teamMembers = currentProject?.assigned_team || [];
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon />
          Team
        </Typography>

        {teamMembers.length > 0 ? (
          <Grid container spacing={2}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden', backgroundColor: COLORS.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PersonIcon sx={{ color: COLORS.background }} />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: COLORS.text }}>
                      {member}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: COLORS.lightBackground }}>
            <PersonIcon sx={{ fontSize: 48, color: COLORS.border, mb: 2 }} />
            <Typography variant="h6" sx={{ color: COLORS.border, mb: 1 }}>
              No Team Assigned
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.border }}>
              The teams will appear here once they are assigned to this project.
            </Typography>
          </Paper>
        )}
      </Box>
    );
  };

  /**
   * Render Files Tab
   */
  const renderFilesTab = () => {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FolderIcon />
          Project Files
        </Typography>

        {projectFiles.length > 0 ? (
          <Grid container spacing={2}>
            {projectFiles.map((file) => (
              <Grid item xs={12} md={6} key={file.id}>
                <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FolderIcon sx={{ color: COLORS.primary }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: COLORS.text }}>
                      {file.file_name || file.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: COLORS.border }}>
                      {file.file_type || file.type} • {file.file_size ? `${(file.file_size / 1024).toFixed(1)} KB` : 'Size unknown'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: COLORS.border, display: 'block' }}>
                      Uploaded: {new Date(file.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: COLORS.lightBackground }}>
            <FolderIcon sx={{ fontSize: 48, color: COLORS.border, mb: 2 }} />
            <Typography variant="h6" sx={{ color: COLORS.border, mb: 1 }}>
              No Files Uploaded
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.border }}>
              Project files will appear here once they are uploaded by the team.
            </Typography>
          </Paper>
        )}
      </Box>
    );
  };

  /**
   * Render Discussion Tab
   */
  const renderDiscussionTab = () => {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <ChatIcon />
          Project Discussion
        </Typography>
        <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: COLORS.lightBackground }}>
          <ChatIcon sx={{ fontSize: 48, color: COLORS.border, mb: 2 }} />
          <Typography variant="h6" sx={{ color: COLORS.border, mb: 1 }}>
            Discussion Coming Soon
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.border, mb: 3 }}>
            Real-time discussion features will be available in the next update.
          </Typography>
          <Button variant="outlined" sx={{ color: COLORS.primary, borderColor: COLORS.primary }}>
            Notify Me When Ready
          </Button>
        </Paper>
      </Box>
    );
  };

  /**
   * Render Milestones Tab
   */
  const renderMilestonesTab = () => {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <KanbanIcon />
          Project Milestones
        </Typography>
        <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: COLORS.lightBackground }}>
          <KanbanIcon sx={{ fontSize: 48, color: COLORS.border, mb: 2 }} />
          <Typography variant="h6" sx={{ color: COLORS.border, mb: 1 }}>
            Milestones Coming Soon
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.border }}>
            Track major project milestones and deliverables here.
          </Typography>
        </Paper>
      </Box>
    );
  };

  /**
   * Render project selector
   */
  const renderProjectSelector = () => {
    if (projects.length <= 1) return null;

    return (
      <Paper sx={{ mb: 3, p: 2, backgroundColor: COLORS.lightBackground }}>
        <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2 }}>
          Select Project
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {projects.map((project, index) => (
            <Chip
              key={project.id}
              label={project.project_name || project.name}
              onClick={() => handleProjectChange(project.id)}
              color={index === currentProjectIndex ? "primary" : "default"}
              variant={index === currentProjectIndex ? "filled" : "outlined"}
              sx={{
                backgroundColor: index === currentProjectIndex ? COLORS.primary : 'transparent',
                color: index === currentProjectIndex ? COLORS.background : COLORS.text,
                borderColor: COLORS.primary,
                '&:hover': {
                  backgroundColor: index === currentProjectIndex ? COLORS.primary : COLORS.lightBackground
                }
              }}
            />
          ))}
        </Stack>
      </Paper>
    );
  };

  /**
   * Render tab content
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderOverviewTab();
      case 1:
        return renderMilestonesTab();
      case 2:
        return renderTeamTab();
      case 3:
        return renderFilesTab();
      case 4:
        return renderDiscussionTab();
      case 5:
        return renderKanbanTab();
      default:
        return renderOverviewTab();
    }
  };

 // ADD THIS REUSABLE DRAWER CONTENT
  const drawerContent = (
    <>
      <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link href="/dashboard/client/details" passHref>
          <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
            <DashboardIcon />
          </IconButton>
        </Link>
        <Typography variant="h5" sx={{ color: '#fefae0'}}>Client Portal</Typography>
      </Box>
      <List>
        {clientMenu.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton component={Link} href={item.path} sx={globalStyles.listItemButton}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Profile Section */}
      <Box sx={{ padding: '1rem', borderTop: '2px solid #6b705c', marginTop: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', overflow: 'hidden', gap: '0.75rem' }}>
          <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid #f3722c' }}>
            <Image
              src={profilePicture}
              alt="User Profile"
              fill
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = '/toroLogo.jpg';
              }}
            />
          </Box>
          {sidebarOpen && ( 
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: '600', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fefae0' }}>
                {clientProfile?.name || profile?.name || currentUser?.user_metadata?.full_name || 'Client Name'}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'rgba(254, 250, 224, 0.7)' }}>
                {clientProfile?.email || profile?.email || currentUser?.email || 'client@email.com'}
              </Typography>
            </Box>
          )}
        </Box>
        <Button
          onClick={handleLogout}
          fullWidth
          sx={{
            padding: '0.75rem',
            background: 'transparent',
            border: '1px solid #fefae0',
            borderRadius: '8px',
            color: '#fefae0',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            '&:hover': { background: '#6b705c' }
          }}
        >
          {sidebarOpen ? 'Logout' : <LogoutIcon />}
        </Button>
      </Box>
    </>
  );

  // Show loading state
  if (loading) {
    return <LoadingScreen message="Loading Project Details..." />;
  }

  return (
    <Box sx={globalStyles.rootBox}>
      {/* Sidebar Navigation */}
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { ...globalStyles.drawerPaper, boxSizing: 'border-box' }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': globalStyles.drawerPaper
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{
          ...mainContentStyles.mainBox,
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` },
          p: 0 // Use p: 0 here if inner content has padding
        }}>

          {/* ---APP BAR --- */}
        <AppBar
          position="static"
          sx={{
            display: { xs: 'flex', md: 'none' }, // Only show on mobile
            backgroundColor: '#283618', // Match drawer header
            paddingTop: 'env(safe-area-inset-top)'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ color: '#fefae0' }}>
              Project Details
            </Typography>
          </Toolbar>
        </AppBar>
        
        {currentProject ? (
         <>
            {/* --- MODIFY THIS DESKTOP HEADER --- */}
            <Box sx={{ 
                ...headerStyles.headerBox, 
                p: 3, // Add padding for desktop
                display: { xs: 'none', md: 'block' } // Hide on mobile
            }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                {/* ... (rest of header content is unchanged) ... */}
              </Stack>
              <Typography variant="body1" sx={headerStyles.headerSubtext}>
                {currentProject.description || 'Project details'}
              </Typography>
            </Box>

            {/* Project Selector */}
            {/* --- WRAPPING THE REST OF THE CONTENT --- */}
            <Box sx={{ p: { xs: 2, md: 3 }, pt: { md: 0 } }}> 
              {renderProjectSelector()}

            {/* Navigation Tabs */}
            <Paper sx={{ mb: 2 }}>
              <Tabs value={activeTab} onChange={handleTabChange} sx={tabsStyles.tabs}>
                <Tab label="Overview" icon={<DescriptionIcon />} iconPosition="start" sx={tabsStyles.tab} />
                <Tab label="Milestones" icon={<KanbanIcon />} iconPosition="start" sx={tabsStyles.tab} />
                <Tab label="Team" icon={<PersonIcon />} iconPosition="start" sx={tabsStyles.tab} />
                <Tab label="Files" icon={<FolderIcon />} iconPosition="start" sx={tabsStyles.tab} />
                <Tab label="Discussion" icon={<ChatIcon />} iconPosition="start" sx={tabsStyles.tab} />
                <Tab label="Kanban Board" icon={<KanbanIcon />} iconPosition="start" sx={tabsStyles.tab} />
              </Tabs>
            </Paper>

            {/* Tab Content */}
            <Box>{renderTabContent()}</Box>
            </Box>
          </>
        ) : (
          // Empty state when no projects exist
          // --- WRAPPING THE EMPTY STATE CONTENT --- */}
          <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center', flexDirection: 'column', gap: 3 }}>
            <ProjectIcon sx={{ fontSize: 64, color: COLORS.border }} />
            <Box>
              <Typography variant="h5" sx={{ color: COLORS.border, fontWeight: 500, mb: 1 }}>
                No Projects Found
              </Typography>
              <Typography variant="body1" sx={{ color: COLORS.border, mb: 3 }}>
                {clientProfile
                  ? `No projects found for ${clientProfile.name}`
                  : 'No projects found for your account'
                }
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={handleRefresh}
                startIcon={<RefreshIcon />}
                sx={{
                  backgroundColor: COLORS.primary,
                  '&:hover': {
                    backgroundColor: COLORS.secondary
                  }
                }}
              >
                Refresh
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push('/dashboard/client')}
                sx={{
                  color: COLORS.primary,
                  borderColor: COLORS.primary
                }}
              >
                Return to Dashboard
              </Button>
            </Stack>
          </Box>
          </Box>
        )}
      </Box>

      {/* Task Details Dialog */}
      <Dialog
        open={openTaskDialog}
        onClose={() => setOpenTaskDialog(false)}
        fullWidth
        maxWidth="sm"
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: COLORS.background,
            border: `2px solid ${COLORS.border}`,
            borderRadius: '12px'
          }
        }}
      >
        <DialogTitle sx={{ backgroundColor: COLORS.primary, color: COLORS.background }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Task Details</Typography>
            <IconButton
              onClick={() => setOpenTaskDialog(false)}
              sx={{ color: COLORS.background }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {currentTask && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                  TITLE
                </Typography>
                <Typography variant="body1" sx={{ color: COLORS.text, mt: 1 }}>
                  {currentTask.title}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                  DESCRIPTION
                </Typography>
                <Typography variant="body1" sx={{ color: COLORS.text, mt: 1 }}>
                  {currentTask.description || 'No description provided'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                  DUE DATE
                </Typography>
                <Typography variant="body1" sx={{ color: COLORS.text, mt: 1 }}>
                  {currentTask.due_date ? new Date(currentTask.due_date).toLocaleDateString("en-GB") : 'No due date'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                  STATUS
                </Typography>
                <Chip
                  label={currentColumnId.replace('_', ' ').toUpperCase()}
                  sx={{
                    mt: 1,
                    backgroundColor: COLUMN_COLORS[currentColumnId],
                    color: 'white'
                  }}
                />
              </Box>

              {currentTask.priority && (
                <Box>
                  <Typography variant="caption" sx={{ color: COLORS.border, fontWeight: 'bold' }}>
                    PRIORITY
                  </Typography>
                  <Chip
                    label={currentTask.priority.toUpperCase()}
                    sx={{
                      mt: 1,
                      backgroundColor:
                        currentTask.priority === 'high' ? COLORS.error :
                        currentTask.priority === 'medium' ? COLUMN_COLORS.in_progress :
                        COLUMN_COLORS.backlog,
                      color: 'white'
                    }}
                  />
                </Box>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: COLORS.lightBackground }}>
          <Button
            onClick={() => setOpenTaskDialog(false)}
            sx={{
              color: COLORS.primary,
              '&:hover': {
                backgroundColor: COLORS.lightBackground
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Global Snackbar for notifications - EXACT SAME AS SETTINGS SCREEN */}
      <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={snackbarSeverity} sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.2rem' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}