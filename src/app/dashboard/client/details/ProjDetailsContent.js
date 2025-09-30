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
  Snackbar, Alert
} from '@mui/material';
import {
  Assignment as ProjectIcon,
  Logout as LogoutIcon,
  CheckCircle as DoneIcon,
  Build as InProgressIcon,
  PlaylistAdd as BacklogIcon,
  Dashboard as DashboardIcon,
  Close as CloseIcon
} from '@mui/icons-material';

import { useDetails } from './useDetails/page';
import { mainContentStyles, headerStyles, tabsStyles } from './styles';
import * as globalStyles from '../common/styles';
import { useClientStore, clientMenu } from '../common/clientStore';

// Kanban board column colors for visual distinction
const COLUMN_COLORS = {
  backlog: '#E71D36',    // Red for backlog
  in_progress: '#FF9F1C', // Orange for in progress
  done: '#2EC4B6'        // Teal for completed
};

// Application color theme constants for consistent styling
const COLORS = {
  primary: '#283618', // Dark green - main brand color
  secondary: '#606c38', // Medium green - secondary elements
  accent: '#f3722c', // Orange - highlights and CTAs
  background: '#fefae0', // Cream - main background
  lightBackground: 'rgba(254, 250, 224, 0.1)', // Light cream for subtle backgrounds
  text: '#283618', // Dark text for contrast
  textLight: 'rgba(254, 250, 224, 0.8)', // Light text for dark backgrounds
  border: '#6b705c', // Gray-green for borders and dividers
  success: '#2e7d32', // Green for success states
  error: '#d32f2f' // Red for error states
};

/**
 * Main Project Details Component
 * Displays project information, team details, and Kanban board for task tracking
 * Clients can view project progress but cannot modify tasks (read-only)
 */
export default function ProjDetailsContent() {
  // Initialize Supabase client and router
  const supabase = createSupabaseClient();
  const router = useRouter();
  const { profile, fetchProfile } = useClientStore();
  
  // State management for component data
  const [projects, setProjects] = useState([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [kanbanColumns, setKanbanColumns] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentColumnId, setCurrentColumnId] = useState('backlog');
  const [loggingOut, setLoggingOut] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Get current project from projects array
  const currentProject = projects.length > 0 ? projects[currentProjectIndex] : null;

  // Custom hook for tab management
  const {
    activeTab,
    handleTabChange,
  } = useDetails(currentProject?.id);

  /**
   * Fetch initial data on component mount
   * - Current user from Supabase auth
   * - User profile from client store
   * - Projects and tasks from database
   */
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();

    if (!profile) {
      fetchProfile();
    }

    const fetchPageData = async () => {
      try {
        setLoading(true);
        // Safely fetch only existing database columns to avoid errors
        const { data: projectList, error: projectError } = await supabase
          .from('projects')
          .select('id, project_name, description, status, created_at');
        
        if (projectError) {
          console.log('No projects found or error:', projectError.message);
          setProjects([]);
        } else if (projectList && projectList.length > 0) {
          setProjects(projectList);
          await fetchTasksForProject(projectList[0].id);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.log('Error loading projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [profile, fetchProfile]);

  /**
   * Fetch tasks for a specific project and organize them into Kanban columns
   * @param {string} projectId - The ID of the project to fetch tasks for
   */
  const fetchTasksForProject = async (projectId) => {
    try {
      const { data: tasks, error } = await supabase
        .from('project_tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.log('No tasks found:', error.message);
        // Initialize empty columns if no tasks found
        initializeEmptyColumns();
        return;
      }
      
      // Define Kanban columns structure
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
      
      // Organize tasks into their respective columns
      if (tasks && tasks.length > 0) {
        tasks.forEach(task => {
          if (columns[task.status]) {
            columns[task.status].tasks.push(task);
          }
        });
      }
      
      setKanbanColumns(columns);
    } catch (error) {
      console.log('Error fetching tasks:', error);
      initializeEmptyColumns();
    }
  };

  /**
   * Initialize empty Kanban columns when no tasks are found
   * Ensures the Kanban board always has a proper structure
   */
  const initializeEmptyColumns = () => {
    const emptyColumns = {
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
    setKanbanColumns(emptyColumns);
  };
  
  /**
   * Handle user logout with confirmation message
   * Shows loading state and redirects to login page
   */
  const handleLogout = async () => {
    setLoggingOut(true);
    setOpenSnackbar(true);
    setSnackbarMessage('Logging out...');
    setSnackbarSeverity('info');
    
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push('/login');
    }, 1500);
  };

  /**
   * Open task details dialog for viewing task information
   * @param {Object} task - The task object to view
   * @param {string} columnId - The ID of the column the task belongs to
   */
  const handleViewTask = (task, columnId) => {
    setCurrentColumnId(columnId);
    setCurrentTask(task);
    setOpenTaskDialog(true);
  };
  
  /**
   * Render the Kanban board tab with project tasks
   * Uses a static display without drag-and-drop for read-only access
   */
  const renderKanbanTab = () => {
    if (!currentProject || !kanbanColumns) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      );
    }
    
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2 }}>
          Project Kanban Board
        </Typography>
        <Typography variant="body2" sx={{ color: COLORS.border, mb: 3, fontStyle: 'italic' }}>
          View-only mode: Only administrators can add or modify tasks. You can view task details by clicking on them.
        </Typography>
        
        {/* Static Kanban board without drag-and-drop functionality */}
        <Box sx={{ display: 'flex', overflowX: 'auto', p: 1, backgroundColor: COLORS.lightBackground, borderRadius: 2 }}>
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
                mx: 1,
                boxShadow: 1
              }}
            >
              {/* Column header with icon and task count */}
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
              
              {/* Task list or empty state */}
              {column.tasks.length === 0 ? (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textAlign: 'center', 
                    color: COLORS.border, 
                    fontStyle: 'italic',
                    py: 3
                  }}
                >
                  No tasks in {column.title.toLowerCase()}
                </Typography>
              ) : (
                column.tasks.map((task, index) => (
                  <Box 
                    key={task.id}
                    sx={{ 
                      p: 1.5, 
                      mb: 1.5, 
                      borderRadius: 1, 
                      backgroundColor: 'white', 
                      boxShadow: 1, 
                      borderLeft: `4px solid ${column.color}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: 2,
                        transform: 'translateY(-1px)'
                      }
                    }} 
                    onClick={() => handleViewTask(task, column.id)}
                  >
                    <Typography variant="body2" sx={{ fontWeight: '500', color: COLORS.text }}>
                      {task.title}
                    </Typography>
                    {task.description && (
                      <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                        {task.description.length > 50 
                          ? `${task.description.substring(0, 50)}...` 
                          : task.description
                        }
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                      {task.due_date ? `Due: ${new Date(task.due_date).toLocaleDateString("en-GB")}` : 'No due date'}
                    </Typography>
                    {task.assignee_id && (
                      <Chip 
                        label="Assigned" 
                        size="small" 
                        variant="outlined"
                        sx={{ 
                          mt: 1,
                          height: '20px',
                          fontSize: '0.6rem'
                        }}
                      />
                    )}
                  </Box>
                ))
              )}
              
              {/* Read-only message for clients */}
              <Box 
                sx={{ 
                  mt: 1, 
                  p: 1.5, 
                  backgroundColor: COLORS.lightBackground,
                  borderRadius: 1,
                  border: `1px dashed ${COLORS.border}`,
                  textAlign: 'center'
                }}
              >
                <Typography variant="caption" sx={{ color: COLORS.border, fontStyle: 'italic' }}>
                  Contact admin to add new tasks
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };
  
  /**
   * Render the Overview tab with project details and information
   */
  const renderOverviewTab = () => {
    if (!currentProject) return null;
    
    return (
      <Grid container spacing={3} sx={{ p: 2 }}>
        {/* Project Details Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: COLORS.background, border: `1px solid ${COLORS.border}` }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2 }}>
                Project Details
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" sx={{ color: COLORS.border }}>
                    PROJECT NAME
                  </Typography>
                  <Typography variant="body1" sx={{ color: COLORS.text }}>
                    {currentProject.project_name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: COLORS.border }}>
                    DESCRIPTION
                  </Typography>
                  <Typography variant="body1" sx={{ color: COLORS.text }}>
                    {currentProject.description || 'No description provided'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: COLORS.border }}>
                    STATUS
                  </Typography>
                  <Chip 
                    label={currentProject.status} 
                    sx={{ 
                      backgroundColor: 
                        currentProject.status === 'active' ? COLORS.success :
                        currentProject.status === 'completed' ? COLUMN_COLORS.done :
                        currentProject.status === 'on-hold' ? COLUMN_COLORS.in_progress :
                        COLUMN_COLORS.backlog,
                      color: 'white'
                    }} 
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Project Information Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: COLORS.background, border: `1px solid ${COLORS.border}` }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2 }}>
                Project Information
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" sx={{ color: COLORS.border }}>
                    CREATED
                  </Typography>
                  <Typography variant="body1" sx={{ color: COLORS.text }}>
                    {currentProject.created_at ? new Date(currentProject.created_at).toLocaleDateString() : 'Not available'}
                  </Typography>
                </Box>
                {kanbanColumns && (
                  <Box>
                    <Typography variant="caption" sx={{ color: COLORS.border }}>
                      TASK PROGRESS
                    </Typography>
                    <Typography variant="body1" sx={{ color: COLORS.text }}>
                      {kanbanColumns.done.tasks.length} of {Object.values(kanbanColumns).reduce((total, col) => total + col.tasks.length, 0)} tasks completed
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  /**
   * Render content based on active tab selection
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderOverviewTab();
      case 1:
        return (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2 }}>
              Milestones
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.border }}>
              Milestone tracking coming soon...
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2 }}>
              Team Members
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.border }}>
              Team information coming soon...
            </Typography>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2 }}>
              Project Files
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.border }}>
              File management coming soon...
            </Typography>
          </Box>
        );
      case 4:
        return (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: COLORS.primary, mb: 2 }}>
              Discussion
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.border }}>
              Project discussions coming soon...
            </Typography>
          </Box>
        );
      case 5:
        return renderKanbanTab();
      default:
        return renderOverviewTab();
    }
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <Box sx={globalStyles.rootBox}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={globalStyles.rootBox}>
      {/* Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}>
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard/client/details" passHref>
            <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
              <DashboardIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" sx={{ color: COLORS.background }}>Client Portal</Typography>
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
        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
            <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: `2px solid ${COLORS.accent}` }}>
              <Image 
                src={profile?.avatar_url || currentUser?.user_metadata?.avatar_url || "/toroLogo.jpg"} 
                alt="User Profile" 
                fill 
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ fontWeight: '600', color: COLORS.background }}>
                {profile?.name || currentUser?.user_metadata?.full_name || 'Client Name'}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: COLORS.textLight }}>
                {profile?.email || currentUser?.email || 'client@email.com'}
              </Typography>
            </Box>
          </Box>
          <Button 
            onClick={handleLogout} 
            fullWidth 
            variant="outlined" 
            disabled={loggingOut}
            sx={{ 
              color: COLORS.background, 
              borderColor: COLORS.background, 
              '&:hover': { background: COLORS.border },
              '&:disabled': {
                color: COLORS.textLight,
                borderColor: COLORS.textLight
              }
            }}
          >
            {loggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={mainContentStyles.mainBox}>
        {currentProject ? (
          <>
            {/* Project Header */}
            <Box sx={headerStyles.headerBox}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" sx={headerStyles.headerTitle}>
                  <ProjectIcon sx={headerStyles.projectIcon} />
                  {currentProject.project_name}
                </Typography>
                <Chip label={currentProject.status} sx={headerStyles.chip(currentProject.status)} />
              </Stack>
              <Typography variant="body1" sx={headerStyles.headerSubtext}>
                Project ID: {currentProject.id} | {currentProject.description}
              </Typography>
            </Box>
            
            {/* Navigation Tabs */}
            <Tabs value={activeTab} onChange={handleTabChange} sx={tabsStyles.tabs}>
              <Tab label="Overview" sx={tabsStyles.tab} />
              <Tab label="Milestones" sx={tabsStyles.tab} />
              <Tab label="Team" sx={tabsStyles.tab} />
              <Tab label="Files" sx={tabsStyles.tab} />
              <Tab label="Discussion" sx={tabsStyles.tab} />
              <Tab label="Kanban Board" sx={tabsStyles.tab} />
            </Tabs>
            
            {/* Tab Content */}
            <Box sx={{ mt: 2 }}>{renderTabContent()}</Box>
          </>
        ) : (
          // Empty state when no projects exist
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: COLORS.border, fontWeight: 500 }}>
              You currently do not have any projects with Toro Informatics.
            </Typography>
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
                <Typography variant="caption" sx={{ color: COLORS.border }}>
                  TITLE
                </Typography>
                <Typography variant="body1" sx={{ color: COLORS.text, mt: 1 }}>
                  {currentTask.title}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="caption" sx={{ color: COLORS.border }}>
                  DESCRIPTION
                </Typography>
                <Typography variant="body1" sx={{ color: COLORS.text, mt: 1 }}>
                  {currentTask.description || 'No description provided'}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="caption" sx={{ color: COLORS.border }}>
                  DUE DATE
                </Typography>
                <Typography variant="body1" sx={{ color: COLORS.text, mt: 1 }}>
                  {currentTask.due_date ? new Date(currentTask.due_date).toLocaleDateString("en-GB") : 'No due date'}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="caption" sx={{ color: COLORS.border }}>
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
              
              {/* Read-only notice for clients */}
              <Box sx={{ p: 2, backgroundColor: COLORS.lightBackground, borderRadius: 1 }}>
                <Typography variant="caption" sx={{ color: COLORS.border, fontStyle: 'italic' }}>
                  Note: Only administrators can modify tasks. Please contact your project administrator for any changes.
                </Typography>
              </Box>
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

      {/* Global Snackbar for notifications */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%',
            backgroundColor: 
              snackbarSeverity === 'success' ? COLORS.success :
              snackbarSeverity === 'error' ? COLORS.error :
              snackbarSeverity === 'info' ? COLORS.primary : COLORS.secondary,
            color: COLORS.background,
            '& .MuiAlert-icon': {
              color: COLORS.background
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}