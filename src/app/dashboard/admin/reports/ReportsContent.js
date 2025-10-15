// This file combines logic and styles for the reports screen.
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography, Button, Card, CardContent, Stack, Avatar, List, ListItem,
  ListItemButton, ListItemText, Drawer, Grid, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, Select, MenuItem,
  FormControl, InputLabel, Menu, Tabs, Tab, CircularProgress
} from '@mui/material';
import {
  Assessment as ReportsIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon,
  Logout as LogoutIcon, Add as AddIcon, ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon,
  Folder as ProjectIcon, Person as PersonIcon, ViewList as ProjectListIcon, Dashboard as DashboardIcon,
  CheckCircle as DoneIcon, Build as InProgressIcon, PlaylistAdd as BacklogIcon,
  Edit as EditIcon, Delete as DeleteIcon, Security as RoleIcon
} from '@mui/icons-material';
import { Snackbar, Alert } from '@mui/material';

import { styles } from './styles';

export default function PerformanceReports() {
  const router = useRouter();
  const supabase = createSupabaseClient();
  
  // State management
  const [currentUser, setCurrentUser] = useState(null);
  const [reports, setReports] = useState({});
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentColumn, setCurrentColumn] = useState('backlog');
  const [isEditing, setIsEditing] = useState(false);
  const [projectMenuAnchor, setProjectMenuAnchor] = useState(null);
  const [viewMode, setViewMode] = useState('kanban');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isLogoutSnackbar, setIsLogoutSnackbar] = useState(false);

  // Menu data
 const menu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];


  // Current project
  const currentProject = projects[currentProjectIndex];

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUser(user);

        // Fetch projects from database
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (projectsError) {
          console.error('Error fetching projects:', projectsError);
          throw new Error('Failed to fetch projects: ' + projectsError.message);
        }

        console.log('Fetched projects:', projectsData);

        // If no projects found, create empty state
        if (!projectsData || projectsData.length === 0) {
          console.log('No projects found in database');
          setProjects([]);
          setReports(createEmptyMetrics());
          setTeamMembers([]);
          setLoading(false);
          return;
        }

        // Try to fetch tasks for each project, but handle cases where tasks table might not exist
        const projectsWithTasks = await Promise.all(
          projectsData.map(async (project) => {
            try {
              // Check if tasks table exists by making a simple query
              const { data: tasks, error: tasksError } = await supabase
                .from('project_tasks')
                .select('*')
                .eq('project_id', project.id)
                .limit(1);

              // If tasks table doesn't exist or has error, create empty columns
              if (tasksError) {
                console.warn(`Tasks table not accessible for project ${project.id}:`, tasksError.message);
                return createProjectWithEmptyTasks(project);
              }

              // If tasks table exists, fetch all tasks for this project
              const { data: allTasks, error: allTasksError } = await supabase
                .from('project_tasks')
                .select('*')
                .eq('project_id', project.id);

              if (allTasksError) {
                console.warn(`Error fetching tasks for project ${project.id}:`, allTasksError.message);
                return createProjectWithEmptyTasks(project);
              }

              // Organize tasks into columns
              const columns = {
                backlog: {
                  title: 'Backlog',
                  tasks: allTasks?.filter(task => task.status === 'backlog' || !task.status) || []
                },
                inProgress: {
                  title: 'In Progress',
                  tasks: allTasks?.filter(task => task.status === 'inProgress') || []
                },
                done: {
                  title: 'Done',
                  tasks: allTasks?.filter(task => task.status === 'done') || []
                }
              };

              // Calculate progress
              const totalTasks = allTasks?.length || 0;
              const completedTasks = columns.done.tasks.length;
              const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

              return {
                id: project.id,
                name: project.project_name || 'Unnamed Project',
                description: project.description || 'No description available',
                progress: progress,
                columns: columns,
                created_at: project.created_at,
                updated_at: project.updated_at
              };
            } catch (err) {
              console.error(`Error processing project ${project.id}:`, err);
              return createProjectWithEmptyTasks(project);
            }
          })
        );

        // Fetch team members
        let formattedMembers = [];
        try {
          const { data: membersData, error: membersError } = await supabase
            .from('users')
            .select('id, email, name, role')
            .neq('role', 'client');

          if (membersError) {
            console.warn('Error fetching team members:', membersError.message);
          }

          // Format team members with colors
          formattedMembers = (membersData || []).map((member, index) => ({
            id: member.id,
            name: member.name || member.email,
            role: member.role || 'team_member',
            color: ['#f3722c', '#2ec4b6', '#e71d36', '#ff9f1c', '#6b705c'][index % 5]
          }));
        } catch (err) {
          console.warn('Error processing team members:', err);
        }

        // Create report metrics based on actual data
        const metricsData = createMetricsData(projectsWithTasks, formattedMembers);

        setReports(metricsData);
        setProjects(projectsWithTasks);
        setTeamMembers(formattedMembers);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        showSnackbar('Error loading data: ' + err.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to create empty metrics when no projects exist
  const createEmptyMetrics = () => ({
    totalProjects: {
      title: 'Total Projects',
      value: 0,
      trend: 'neutral',
      change: '0%',
      icon: <ProjectIcon />
    },
    completedTasks: {
      title: 'Completed Tasks',
      value: 0,
      trend: 'neutral',
      change: '0%',
      icon: <DoneIcon />
    },
    inProgress: {
      title: 'In Progress',
      value: 0,
      trend: 'neutral',
      change: '0%',
      icon: <InProgressIcon />
    },
    teamMembers: {
      title: 'Team Members',
      value: 0,
      trend: 'neutral',
      change: '0',
      icon: <PersonIcon />
    },
    backlog: {
      title: 'Backlog Tasks',
      value: 0,
      trend: 'neutral',
      change: '0%',
      icon: <BacklogIcon />
    }
  });

  // Helper function to create metrics data from projects and team members
  const createMetricsData = (projects, members) => {
    const totalTasks = projects.reduce((total, project) => total + getTotalTasks(project), 0);
    const completedTasks = projects.reduce((total, project) => total + (project.columns?.done?.tasks?.length || 0), 0);
    const inProgressTasks = projects.reduce((total, project) => total + (project.columns?.inProgress?.tasks?.length || 0), 0);
    const backlogTasks = projects.reduce((total, project) => total + (project.columns?.backlog?.tasks?.length || 0), 0);

    return {
      totalProjects: {
        title: 'Total Projects',
        value: projects.length,
        trend: projects.length > 0 ? 'up' : 'neutral',
        change: projects.length > 0 ? '+100%' : '0%',
        icon: <ProjectIcon />
      },
      completedTasks: {
        title: 'Completed Tasks',
        value: completedTasks,
        trend: completedTasks > 0 ? 'up' : 'neutral',
        change: completedTasks > 0 ? '+100%' : '0%',
        icon: <DoneIcon />
      },
      inProgress: {
        title: 'In Progress',
        value: inProgressTasks,
        trend: inProgressTasks > 0 ? 'up' : 'neutral',
        change: inProgressTasks > 0 ? '+100%' : '0%',
        icon: <InProgressIcon />
      },
      teamMembers: {
        title: 'Team Members',
        value: members.length,
        trend: members.length > 0 ? 'up' : 'neutral',
        change: members.length > 0 ? '+100%' : '0',
        icon: <PersonIcon />
      },
      backlog: {
        title: 'Backlog Tasks',
        value: backlogTasks,
        trend: backlogTasks > 0 ? 'up' : 'neutral',
        change: backlogTasks > 0 ? '+100%' : '0%',
        icon: <BacklogIcon />
      }
    };
  };

  // Helper function to create project with empty task columns
  const createProjectWithEmptyTasks = (project) => {
    return {
      id: project.id,
      name: project.project_name || 'Unnamed Project',
      description: project.description || 'No description available',
      progress: 0,
      columns: {
        backlog: { title: 'Backlog', tasks: [] },
        inProgress: { title: 'In Progress', tasks: [] },
        done: { title: 'Done', tasks: [] }
      },
      created_at: project.created_at,
      updated_at: project.updated_at
    };
  };

  // Helper functions
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsLogoutSnackbar(false);
    setOpenSnackbar(true);
  };

  const getAssigneeColor = (assigneeId) => {
    if (!assigneeId) return '#888';
    const member = teamMembers.find(m => m.id === assigneeId);
    return member ? member.color : '#888';
  };

  const getAssigneeName = (task) => {
    // Prioritize the new team name, but fall back to the old user name for existing tasks
    if (task.assignee_team) return task.assignee_team;
    if (task.assignee_id) {
        const member = teamMembers.find(m => m.id === task.assignee_id);
        return member ? member.name : 'Unassigned';
    }
    return 'Unassigned';
  };

  const getAssigneeRole = (task) => {
    // This is now simpler: if there's a team, that's the role.
    if (task.assignee_team) return 'Team';
    if (task.assignee_id) {
        const member = teamMembers.find(m => m.id === task.assignee_id);
        return member ? member.role : 'unassigned';
    }
    return 'unassigned';
  };

  const getTotalTasks = (project) => {
    if (!project?.columns) return 0;
    return Object.values(project.columns).reduce((total, column) => {
      return total + (column?.tasks?.length || 0);
    }, 0);
  };

  const getColumnColor = (columnId) => {
    const colors = {
      backlog: '#E71D36',
      inProgress: '#FF9F1C',
      done: '#2EC4B6'
    };
    return colors[columnId] || '#6b705c';
  };

  const getColumnIcon = (columnId) => {
    const icons = {
      backlog: <BacklogIcon />,
      inProgress: <InProgressIcon />,
      done: <DoneIcon />
    };
    return icons[columnId] || <BacklogIcon />;
  };

  // Event handlers
  const handleLogout = async () => {
    // Show green logout snackbar
    setSnackbarMessage('Logging out...');
    setSnackbarSeverity('success');
    setIsLogoutSnackbar(true);
    setOpenSnackbar(true);
    
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push('/login');
    }, 1500);
  };

  const handleProjectMenuOpen = (event) => {
    setProjectMenuAnchor(event.currentTarget);
  };

  const handleProjectMenuClose = () => {
    setProjectMenuAnchor(null);
  };

  const handleProjectSelect = (index) => {
    setCurrentProjectIndex(index);
    handleProjectMenuClose();
  };

  const handleNextProject = () => {
    if (currentProjectIndex < projects.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
    }
  };

  const handlePreviousProject = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    }
  };

  const handleAddTaskClick = (columnId) => {
    setCurrentColumn('backlog');
    setCurrentTask({
      title: '',
      description: '',
      assignee: '',
      dueDate: ''
    });
    setIsEditing(false);
    setOpenTaskDialog(true);
  };

  const handleEditTaskClick = (task, columnId) => {
    setCurrentColumn(columnId);
    setCurrentTask({
      ...task,
      assignee: task.assignee_id || task.assignee
    });
    setIsEditing(true);
    setOpenTaskDialog(true);
  };

  const handleDeleteTaskClick = async (taskId, columnId) => {
    try {
      // Try to delete from database if tasks table exists
      try {
        const { error } = await supabase
          .from('project_tasks')
          .delete()
          .eq('id', taskId);
        
        if (error) {
          console.warn('Error deleting task from database:', error);
        }
      } catch (dbError) {
        console.warn('Tasks table might not exist:', dbError);
      }
      
      // Update local state regardless
      const updatedProjects = [...projects];
      const column = updatedProjects[currentProjectIndex].columns[columnId];
      column.tasks = column.tasks.filter(task => task.id !== taskId);
      setProjects(updatedProjects);
      
      showSnackbar('Task deleted successfully');
    } catch (err) {
      showSnackbar('Error deleting task: ' + err.message, 'error');
    }
  };

  const handleSaveTask = async () => {
      if (!currentTask || !currentTask.title) {
        showSnackbar('Task title is required', 'error');
        return;
      }

      if (!currentProject) {
        showSnackbar('No project selected', 'error');
        return;
      }

      // The logic to find a user ID is no longer needed. We save the team string directly.

      try {
        if (isEditing) {
          // Logic for updating an existing task
          const { data: updatedTask, error } = await supabase
              .from('project_tasks')
              .update({
                title: currentTask.title,
                description: currentTask.description,
                due_date: currentTask.dueDate,
                status: currentColumn,
                assignee_team: currentTask.assignee_team, // Save the team name
                updated_at: new Date().toISOString()
              })
              .eq('id', currentTask.id)
              .select()
              .single();

          if (error) throw error;

          // Refresh local state to show the update
          const updatedProjects = [...projects];
          const project = updatedProjects[currentProjectIndex];
          
          Object.keys(project.columns).forEach(key => {
              project.columns[key].tasks = project.columns[key].tasks.filter(t => t.id !== updatedTask.id);
          });
          
          project.columns[currentColumn].tasks.push(updatedTask);
          setProjects(updatedProjects);
          showSnackbar('Task updated successfully');

        } else {
          // Logic for creating a new task
          const { data: savedTask, error } = await supabase
              .from('project_tasks')
              .insert({
                title: currentTask.title,
                description: currentTask.description,
                due_date: currentTask.dueDate,
                status: 'backlog',
                project_id: currentProject.id,
                assignee_team: currentTask.assignee_team // Save the team name
              })
              .select()
              .single();

          if (error) throw error;

          // Add the newly created task (returned from DB) to our local state
          const updatedProjects = [...projects];
          updatedProjects[currentProjectIndex].columns.backlog.tasks.push(savedTask);
          setProjects(updatedProjects);
          showSnackbar('Task added successfully');
        }

        setOpenTaskDialog(false);

      } catch (err) {
        console.error(`Error saving task:`, err);
        showSnackbar(`Error: ${err.message}`, 'error');
      }
    };

  const moveTask = async (taskId, fromColumn, toColumn) => {
    try {
      // Update local state first for immediate feedback
      const updatedProjects = [...projects];
      const project = updatedProjects[currentProjectIndex];
      
      // Find and move task
      const fromCol = project.columns[fromColumn];
      const taskIndex = fromCol.tasks.findIndex(t => t.id === taskId);
      
      if (taskIndex !== -1) {
        const task = fromCol.tasks[taskIndex];
        fromCol.tasks.splice(taskIndex, 1);
        project.columns[toColumn].tasks.push({
          ...task,
          status: toColumn
        });
        
        setProjects(updatedProjects);
        
        // Try to update in database
        try {
          const { error } = await supabase
            .from('project_tasks')
            .update({ 
              status: toColumn,
              updated_at: new Date().toISOString()
            })
            .eq('id', taskId);
          
          if (error) {
            console.warn('Error updating task status in database:', error);
          }
        } catch (dbError) {
          console.warn('Tasks table might not exist:', dbError);
        }
        
        showSnackbar('Task moved successfully');
      }
    } catch (err) {
      showSnackbar('Error moving task: ' + err.message, 'error');
    }
  };

  // Kanban board styles
  const kanbanColumnStyles = (color) => ({
    flex: 1,
    minWidth: 300,
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    borderTop: `4px solid ${color}`,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    '&:not(:last-child)': {
      marginRight: '1rem'
    }
  });

  const kanbanCardStyles = (color) => ({
    padding: '0.75rem',
    marginBottom: '0.75rem',
    borderRadius: '4px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderLeft: `4px solid ${color}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
    }
  });

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Box sx={{ p: 3 }}><Alert severity="error">{error}</Alert></Box>;
  }

  return (
    <Box sx={styles.mainContainer}>
      {/* Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard/admin/overview" passHref>
            <IconButton sx={{ color: 'green' }}><DashboardIcon /></IconButton>
          </Link>
          <Typography variant="h5" sx={{ color: '#fefae0' }}>Admin Portal</Typography>
        </Box>
        
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} href={item.path} sx={styles.sidebarListItemButton(item.name)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
            <Image src="/toroLogo.jpg" alt="User Profile" width={40} height={40} style={{ borderRadius: '50%', border: '2px solid #f3722c' }} />
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>{currentUser?.email}</Typography>
              <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>Admin</Typography>
            </Box>
          </Box>
          <Button onClick={handleLogout} fullWidth variant="outlined" startIcon={<LogoutIcon />} sx={{ color: '#fefae0', borderColor: '#fefae0', '&:hover': { background: '#6b705c' } }}>
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={styles.mainContent}>
        {/* Page Header */}
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}><ReportsIcon sx={styles.headerIcon} />Performance Reports</Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>Analytics and insights for your CRM system</Typography>
        </Box>

        {/* Key Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(reports).map(([key, metric]) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
              <Card sx={styles.metricCard}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" sx={{ color: '#525252' }}>{metric.title}</Typography>
                      <Typography variant="h4" sx={styles.metricValue}>{metric.value}</Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        {metric.trend === 'up' ? <TrendingUpIcon sx={styles.trendIcon('up')} fontSize="small" /> : 
                         metric.trend === 'down' ? <TrendingDownIcon sx={styles.trendIcon('down')} fontSize="small" /> : 
                         <TrendingUpIcon sx={styles.trendIcon('neutral')} fontSize="small" />}
                        <Typography variant="body2" sx={styles.trendIcon(metric.trend)}>{metric.change}</Typography>
                      </Stack>
                    </Box>
                    <Avatar sx={styles.metricAvatar}>{metric.icon}</Avatar>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Kanban Board Section */}
        {projects.length > 0 ? (
          <Card sx={{ mb: 4, boxShadow: 3, bgcolor:'#BDB76B' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, fontWeight: 'bold' }}>
                <Typography variant="h6" sx={styles.chartTitle}><ProjectIcon sx={styles.headerIcon} />Project Task Board</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tabs value={viewMode} onChange={(e, newValue) => setViewMode(newValue)} sx={{ minHeight: '40px' }}>
                    <Tab value="kanban" label="Kanban" icon={<DashboardIcon />} iconPosition="start" sx={{ minHeight: '40px', py: 0 }} />
                  </Tabs>
                  
                  <Button 
                    variant="outlined"  
                    startIcon={<ProjectIcon />} 
                    endIcon={<ArrowForwardIcon sx={{ transform: projectMenuAnchor ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />} 
                    onClick={handleProjectMenuOpen}
                    sx={{ minWidth: '250px', justifyContent: 'space-between', color: '#990c0cff', fontSize: "15px", fontWeight: "bold" }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {currentProject?.name || 'No Project Selected'}
                    </Box>
                  </Button>
                  
                  <Menu anchorEl={projectMenuAnchor} open={Boolean(projectMenuAnchor)} onClose={handleProjectMenuClose} PaperProps={{ style: { maxHeight: 300, width: '350px' } }}>
                    {projects.map((project, index) => (
                      <MenuItem 
                        key={project.id}  
                        onClick={() => handleProjectSelect(index)}
                        selected={index === currentProjectIndex} 
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <Typography variant="body1" noWrap>{project.name}</Typography>
                          <Typography variant="caption" color="text.secondary" noWrap>{getTotalTasks(project)} tasks • {project.progress || 0}% complete</Typography>
                        </Box>
                        {index === currentProjectIndex && (<Chip label="Active" size="small" color="primary" />)}
                      </MenuItem>
                    ))}
                  </Menu>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handlePreviousProject} disabled={currentProjectIndex === 0}><ArrowBackIcon /></IconButton>
                    <Typography variant="body2" sx={{ mx: 1 }}>{currentProjectIndex + 1} of {projects.length}</Typography>
                    <IconButton onClick={handleNextProject} disabled={currentProjectIndex === projects.length - 1}><ArrowForwardIcon /></IconButton>
                  </Box>
                </Box>
              </Box>

              {/* Project Description & Progress Bar */}
              {currentProject && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'maroon', fontWeight: 'bold' }}>
                    {currentProject?.name || 'No Project Selected'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  
                  </Box>
                </Box>
              )}

              {currentProject && viewMode === 'kanban' ? (
                <Box sx={{ display: 'flex', overflowX: 'auto', padding: '1rem 0', backgroundColor: '#F0E68C', borderRadius: '8px', mt: 2 }}>
                  {Object.entries(currentProject.columns || {}).map(([columnId, column]) => (
                    <Box key={columnId} sx={kanbanColumnStyles(getColumnColor(columnId))}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ color: getColumnColor(columnId), mr: 1 }}>
                          {getColumnIcon(columnId)}
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{column?.title || columnId}</Typography>
                        <Chip 
                          label={column?.tasks?.length || 0} 
                          size="small" 
                          sx={{ ml: 'auto', backgroundColor: getColumnColor(columnId), color: 'white', fontWeight: 'bold' }} 
                        />
                        {columnId === 'backlog' && (
                          <Tooltip title="Add Task to Backlog">
                            <IconButton size="small" sx={{ ml: 1 }} onClick={() => handleAddTaskClick(columnId)}>
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                      {(column?.tasks || []).map(task => (
                        <Box key={task.id} sx={kanbanCardStyles(getColumnColor(columnId))} onClick={() => handleEditTaskClick(task, columnId)}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>{task.title}</Typography>
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDeleteTaskClick(task.id, columnId); }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <PersonIcon fontSize="small" sx={{ color: getAssigneeColor(task.assignee_id), mr: 0.5 }} />
                          <Typography variant="caption" sx={{ color: '#757575' }}>
                            {getAssigneeName(task)} 
                          </Typography>
                          <Chip 
                            label={getAssigneeRole(task)} 
                            size="small" 
                            sx={{ ml: 1, fontSize: '0.6rem', height: '20px', backgroundColor: getAssigneeColor(task.assignee_id), color: 'white' }} 
                            icon={<RoleIcon fontSize="small" sx={{ color: 'white' }} />}
                          />
                        </Box>

                          {task.due_date && (
                            <Typography variant="caption" sx={{ color: '#757575', display: 'block', mt: 0.5 }}>
                              Due: {new Date(task.due_date).toLocaleDateString("en-GB")}
                            </Typography>
                          )}
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            {columnId !== 'backlog' && (
                              <Tooltip title={`Move to ${columnId === 'inProgress' ? 'Backlog' : 'In Progress'}`}>
                                <IconButton size="small" onClick={(e) => { e.stopPropagation(); moveTask(task.id, columnId, columnId === 'inProgress' ? 'backlog' : 'inProgress'); }}>
                                  <ArrowBackIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {columnId !== 'done' && (
                              <Tooltip title={`Move to ${columnId === 'backlog' ? 'In Progress' : 'Done'}`}>
                                <IconButton size="small" sx={{ ml: 'auto' }} onClick={(e) => { e.stopPropagation(); moveTask(task.id, columnId, columnId === 'backlog' ? 'inProgress' : 'done'); }}>
                                  <ArrowForwardIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              ) : currentProject && viewMode === 'list' ? (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell>Assignee</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.values(currentProject.columns || {}).flatMap(column => 
                        (column?.tasks || []).map(task => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: '500' }}>{task.title}</Typography>
                              {task.description && <Typography variant="caption" color="text.secondary">{task.description}</Typography>}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ width: 24, height: 24, mr: 1, backgroundColor: getAssigneeColor(task.assignee_id), fontSize: '0.8rem' }}>
                                  {getAssigneeName(task.assignee_id).charAt(0)}
                                </Avatar>
                                {getAssigneeName(task.assignee_id)}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip label={column?.title || 'Unknown'} size="small" sx={{ backgroundColor: getColumnColor(column?.id), color: 'white' }} />
                            </TableCell>
                            <TableCell>
                              {task.due_date ? new Date(task.due_date).toLocaleDateString("en-GB") : 'No due date'}
                            </TableCell>
                            <TableCell>
                              <IconButton size="small" onClick={() => handleEditTaskClick(task, column?.id)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton size="small" onClick={() => handleDeleteTaskClick(task.id, column?.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No project selected or no tasks available.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ mb: 4, boxShadow: 3, p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>No Projects Found</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              There are no projects in the database yet. Create your first project to get started.
            </Typography>
            <Button variant="contained" color="primary">
              Create First Project
            </Button>
          </Card>
        )}

        {/* Data Export Section */}
        <Card sx={{ mb: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={styles.chartTitle}>Export Reports</Typography>
            <Stack direction="row" spacing={2}>
              {['CSV', 'Excel', 'PDF'].map((format) => (
                <Button key={format} variant="outlined" sx={styles.exportButton}>
                  Download {format}
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Task Dialog */}
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Edit Task' : 'Add New Task to Backlog'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField 
              label="Task Title" 
              value={currentTask?.title || ''}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              fullWidth 
              required 
            />
            <FormControl fullWidth>
              <InputLabel id="team-select-label">Team</InputLabel>
              <Select
                labelId="team-select-label"
                value={currentTask?.assignee_team || ''}
                label="Team"
                onChange={(e) => {
                  setCurrentTask({
                    ...currentTask,
                    assignee_team: e.target.value,
                  });
                }}
              >
                <MenuItem value=""><em>Unassigned</em></MenuItem>
                <MenuItem value="Business Analyst">Business Analyst</MenuItem>
                <MenuItem value="Project Manager">Project Manager</MenuItem>
                <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                <MenuItem value="DevOps Team">DevOps Team</MenuItem>
                <MenuItem value="UX/UI Team">UX/UI Team</MenuItem>
                <MenuItem value="Software Architect">Software Architect</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              label="Description" 
              value={currentTask?.description || ''}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
              multiline 
              rows={3} 
              fullWidth 
            />
            <TextField 
              label="Due Date" 
              type="date" 
              value={currentTask?.dueDate || ''}
              onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }} 
              fullWidth 
            />
            {isEditing && (
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={currentColumn} onChange={(e) => setCurrentColumn(e.target.value)} label="Status">
                  <MenuItem value="backlog"><Box sx={{ display: 'flex', alignItems: 'center' }}><BacklogIcon sx={{ color: '#E71D36', mr: 1 }} />Backlog</Box></MenuItem>
                  <MenuItem value="inProgress"><Box sx={{ display: 'flex', alignItems: 'center' }}><InProgressIcon sx={{ color: '#FF9F1C', mr: 1 }} />In Progress</Box></MenuItem>
                  <MenuItem value="done"><Box sx={{ display: 'flex', alignItems: 'center' }}><DoneIcon sx={{ color: '#2EC4B6', mr: 1 }} />Done</Box></MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveTask} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={1500} 
        onClose={() => setOpenSnackbar(false)} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%', 
            fontWeight: 'bold', 
            fontSize: '1.2rem',
            ...(isLogoutSnackbar && {
               backgroundColor: '#5caa93ff',
            color: 'black',
              '& .MuiAlert-icon': {
                color: 'white'
              }
            })
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}