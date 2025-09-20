/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Button, Card,
  CardContent, Stack, Avatar, List, ListItem,
  ListItemButton, ListItemText, Drawer,
  Grid, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead,
  TableRow, Chip, IconButton, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Tooltip, Select, MenuItem, FormControl, InputLabel,
  Menu, Tabs, Tab
} from '@mui/material';
import {
  Assessment as ReportsIcon,
  Download as DownloadIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  Logout as LogoutIcon,
  CheckCircle as DoneIcon,
  Build as InProgressIcon,
  PlaylistAdd as BacklogIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Folder as ProjectIcon,
  Person as PersonIcon,
  Security as RoleIcon,
  ViewList as ProjectListIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';

// Import snackbar components
import { Snackbar, Alert } from '@mui/material';

// Import local files
import { styles } from './styles';
import { useReports } from './useReports/page';

// Team members with roles
const teamMembers = [
  { id: 1, name: 'John D.', role: 'admin', color: '#FF6B6B' },
  { id: 2, name: 'ZamaZama M.', role: 'auditor', color: '#4ECDC4' },
  { id: 3, name: 'Thato T.', role: 'client', color: '#45B7D1' },
  { id: 4, name: 'Zweli L.', role: 'auditor', color: '#FFA07A' },
  { id: 5, name: 'Alex K.', role: 'client', color: '#98D8C8' }
];

// Role permissions
const rolePermissions = {
  admin: { canEdit: true, canDelete: true, canMove: true, canAdd: true },
  auditor: { canEdit: true, canDelete: false, canMove: true, canAdd: true },
  client: { canEdit: true, canDelete: false, canMove: false, canAdd: true }
};

/**
 * Main Performance Reports Component with Kanban Board
 */
export default function PerformanceReports() {
  // Get reports data and functions from custom hook
  const { reports, activities, menu, handleExport } = useReports();

  // State for sidebar (always open in this implementation)
  const [sidebarOpen] = React.useState(true);

  // Router for navigation
  const router = useRouter();
  
  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  // Current user role (simulated - this would come from auth context)
  const [currentUser] = useState({ name: 'John Doe', role: 'admin' });

  // Kanban board state
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'CRM Dashboard Redesign',
      description: 'Redesign of the main CRM dashboard interface',
      progress: 65,
      columns: {
        backlog: {
          id: 'backlog',
          title: 'Backlog',
          color: '#E71D36', // Red
          icon: <BacklogIcon />,
          tasks: [
            { id: 1, title: 'Update dashboard UI', assignee: 'John D.', assigneeRole: 'admin', description: 'Redesign the main dashboard components', dueDate: '2023-12-15' },
            { id: 2, title: 'Research analytics tools', assignee: 'ZamaZama M.', assigneeRole: 'client', description: 'Evaluate new tools for customer analytics', dueDate: '2023-12-20' }
          ]
        },
        inProgress: {
          id: 'inProgress',
          title: 'In Progress',
          color: '#FF9F1C', // Vibrant orange
          icon: <InProgressIcon />,
          tasks: [
            { id: 3, title: 'Implement API endpoints', assignee: 'Thato T.', assigneeRole: 'auditor', description: 'Create new endpoints for customer data', dueDate: '2023-12-10' },
            { id: 4, title: 'Fix performance issues', assignee: 'Zweli L.', assigneeRole: 'admin', description: 'Optimize database queries', dueDate: '2023-12-12' }
          ]
        },
        done: {
          id: 'done',
          title: 'Done',
          color: '#2EC4B6', // Teal
          icon: <DoneIcon />,
          tasks: [
            { id: 5, title: 'Deploy latest version', assignee: 'Alex K.', assigneeRole: 'client', description: 'Production deployment v2.1.0', dueDate: '2023-12-05' },
            { id: 6, title: 'Write documentation', assignee: 'John D.', assigneeRole: 'auditor', description: 'Update API documentation', dueDate: '2023-12-03' }
          ]
        }
      }
    },
    {
      id: 2,
      name: 'Customer Support Portal',
      description: 'New portal for customer support tickets',
      progress: 35,
      columns: {
        backlog: {
          id: 'backlog',
          title: 'Backlog',
          color: '#FF9F1C',
          icon: <BacklogIcon />,
          tasks: [
            { id: 7, title: 'Design ticket interface', assignee: 'Sarah M.', assigneeRole: 'admin', dueDate: '2023-12-18' }
          ]
        },
        inProgress: {
          id: 'inProgress',
          title: 'In Progress',
          color: '#2EC4B6',
          icon: <InProgressIcon />,
          tasks: [
            { id: 8, title: 'Build ticket API', assignee: 'Mike T.', assigneeRole: 'auditor', dueDate: '2023-12-15' }
          ]
        },
        done: {
          id: 'done',
          title: 'Done',
          color: '#E71D36',
          icon: <DoneIcon />,
          tasks: []
        }
      }
    },
    {
      id: 3,
      name: 'Mobile App Development',
      description: 'iOS and Android application for customer access',
      progress: 15,
      columns: {
        backlog: {
          id: 'backlog',
          title: 'Backlog',
          color: '#6A4C93',
          icon: <BacklogIcon />,
          tasks: [
            { id: 9, title: 'Create wireframes', assignee: 'Emma L.', assigneeRole: 'admin', dueDate: '2024-01-10' },
            { id: 10, title: 'Set up development environment', assignee: 'John D.', assigneeRole: 'admin', dueDate: '2024-01-15' }
          ]
        },
        inProgress: {
          id: 'inProgress',
          title: 'In Progress',
          color: '#1982C4',
          icon: <InProgressIcon />,
          tasks: [
            { id: 11, title: 'Design UI components', assignee: 'Sarah M.', assigneeRole: 'client', dueDate: '2024-01-20' }
          ]
        },
        done: {
          id: 'done',
          title: 'Done',
          color: '#8AC926',
          icon: <DoneIcon />,
          tasks: []
        }
      }
    }
  ]);
  
  // State for managing the currently selected project index
const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

// State for toggling the task dialog (open/close)
const [openTaskDialog, setOpenTaskDialog] = useState(false);

// State for tracking the task currently being viewed or edited
const [currentTask, setCurrentTask] = useState(null);

// State for tracking the column a task belongs to (e.g., backlog, in-progress, done)
const [currentColumn, setCurrentColumn] = useState('backlog');

// State to determine if a task is being edited
const [isEditing, setIsEditing] = useState(false);

// State for managing the anchor element of the project menu (used for dropdown positioning)
const [projectMenuAnchor, setProjectMenuAnchor] = useState(null);

// State for controlling the project view mode (options: 'kanban' or 'list')
const [viewMode, setViewMode] = useState('kanban');


  // Current project
  const currentProject = projects[currentProjectIndex];

  /**
   * Kanban board styles
   */
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

  /**
   * Handles logout action
   */
  const handleLogout = () => {
    setSnackbarMessage('Logging out...');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  /**
   * Handles opening the project selection menu
   */
  const handleProjectMenuOpen = (event) => {
    setProjectMenuAnchor(event.currentTarget);
  };

  /**
   * Handles closing the project selection menu
   */
  const handleProjectMenuClose = () => {
    setProjectMenuAnchor(null);
  };

  /**
   * Handles selecting a project from the menu
   */
  const handleProjectSelect = (index) => {
    setCurrentProjectIndex(index);
    handleProjectMenuClose();
  };

  /**
   * Handles adding a new task
   */
  const handleAddTask = (columnId) => {
    if (!rolePermissions[currentUser.role].canAdd) {
      setSnackbarMessage('You do not have permission to add tasks');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    
    setCurrentColumn(columnId);
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

  /**
   * Handles editing a task
   */
  const handleEditTask = (task, columnId) => {
    // Check if current user can edit this task
    const canEdit = rolePermissions[currentUser.role].canEdit || 
                   (task.assignee === currentUser.name && rolePermissions[task.assigneeRole].canEdit);
    
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

  /**
   * Handles deleting a task
   */
  const handleDeleteTask = (taskId, columnId) => {
    const task = currentProject.columns[columnId].tasks.find(t => t.id === taskId);
    
    // Check permissions
    const canDelete = rolePermissions[currentUser.role].canDelete || 
                     (task.assignee === currentUser.name && rolePermissions[task.assigneeRole].canDelete);
    
    if (!canDelete) {
      setSnackbarMessage('You do not have permission to delete this task');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const updatedProjects = [...projects];
    const column = updatedProjects[currentProjectIndex].columns[columnId];
    column.tasks = column.tasks.filter(task => task.id !== taskId);
    setProjects(updatedProjects);
    setSnackbarMessage('Task deleted successfully');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  /**
   * Handles saving a task (both new and edited)
   */
  const handleSaveTask = () => {
    if (!currentTask || !currentTask.title) {
      setSnackbarMessage('Task title is required');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const updatedProjects = [...projects];
    const project = updatedProjects[currentProjectIndex];

    if (isEditing) {
      // Update existing task
      for (const columnKey in project.columns) {
        const column = project.columns[columnKey];
        const taskIndex = column.tasks.findIndex(t => t.id === currentTask.id);
        if (taskIndex !== -1) {
          column.tasks[taskIndex] = currentTask;
          break;
        }
      }
    } else {
      // Always Add new task At the Backlog
      const newTask = {
        ...currentTask,
        id: Math.max(0, 
                     ...project.columns.backlog.tasks.map(t => t.id), 
                     ...project.columns.inProgress.tasks.map(t => t.id), 
                     ...project.columns.done.tasks.map(t => t.id)
                    ) + 1
      };
      project.columns.backlog.tasks.push(newTask);
    }

    setProjects(updatedProjects);
    setOpenTaskDialog(false);
    setSnackbarMessage(isEditing ? 'Task updated successfully' : 'Task added successfully');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  /**
   * Moves a task between columns
   */
  const moveTask = (taskId, fromColumn, toColumn) => {
    const task = currentProject.columns[fromColumn].tasks.find(t => t.id === taskId);
    
    // Check permissions
    const canMove = rolePermissions[currentUser.role].canMove || 
                   (task.assignee === currentUser.name && rolePermissions[task.assigneeRole].canMove);
    
    if (!canMove) {
      setSnackbarMessage('You do not have permission to move this task');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
//find project
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
      setSnackbarMessage('Task moved successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
  };

  /**
   * Changes the current project
   */
  const handleProjectChange = (direction) => {
    if (direction === 'next' && currentProjectIndex < projects.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
    } else if (direction === 'prev' && currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    }
  };

  // Get color for assignee based on their role
  const getAssigneeColor = (assignee) => {
    const member = teamMembers.find(m => m.name === assignee);
    return member ? member.color : '#888';
  };

  // Calculate total tasks for a project
  const getTotalTasks = (project) => {
    return Object.values(project.columns).reduce((total, column) => total + column.tasks.length, 0);
  };

  return (
    <Box sx={styles.mainContainer}>
      {/* Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={{ 
    p: 1,
    borderBottom: '2px solid #6b705c',
    display: 'flex', 
    alignItems: 'center', 
    gap: 1 
  }}>
    <Link href="/dashboard" passHref>
      <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
        <DashboardIcon />
      </IconButton>
    </Link>
    <Typography variant="h5" sx={{ color: '#fefae0'}}>
      Admin Portal
    </Typography>
        </Box>
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={styles.sidebarListItemButton(item.name)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* User Profile Section */}
        <Box sx={{
          padding: '1rem',
          borderTop: '2px solid #6b705c',
          marginTop: 'auto'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
            <Box sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              border: '2px solid #f3722c'
            }}>
              <Image
                src="/toroLogo.jpg"
                alt="User Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ 
                  fontWeight: '600', 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#fefae0'
                }}>
                  {currentUser.name}
                </Typography>
                
                <Typography sx={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.8, 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgba(254, 250, 224, 0.7)'
                }}>
                   user@toro.com
                </Typography>
              </Box>
            )}
          </Box>

           {/**button for loging out of the system  */}
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
              '&:hover': {
                background: '#6b705c'
              }
            }}
          >
            {sidebarOpen ? 'Logout' : <LogoutIcon />}
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={styles.mainContent}>
        {/* Page Header */}
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}>
            <ReportsIcon sx={styles.headerIcon} />
            Performance Reports
          </Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>
            Analytics and insights for your CRM system
          </Typography>
        </Box>

        {/* Key Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(reports).map(([key, metric], index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={styles.metricCard}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" sx={{ color: '#525252' }}>
                        {metric.title}
                      </Typography>
                      <Typography variant="h4" sx={styles.metricValue}>
                        {metric.value}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        {metric.trend === 'up' ? (
                          <TrendingUpIcon sx={styles.trendIcon('up')} fontSize="small" />
                        ) : (
                          <TrendingDownIcon sx={styles.trendIcon('down')} fontSize="small" />
                        )}
                        <Typography variant="body2" sx={styles.trendIcon(metric.trend)}>
                          {metric.change}
                        </Typography>
                      </Stack>
                    </Box>
                    <Avatar sx={styles.metricAvatar}>
                      {metric.icon}
                    </Avatar>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Kanban Board Section */}
        <Card sx={{ mb: 4, boxShadow: 3, bgcolor:'khaki' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, fontWeight: 'bold' }}>
              <Typography variant="h6"  sx={styles.chartTitle}>
                <ProjectIcon
              
                sx={styles.headerIcon} />
                Project Task Board 
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* View Mode Toggle */}
                <Tabs 
                  value={viewMode} 
                  onChange={(e, newValue) => setViewMode(newValue)}
                  sx={{ minHeight: '40px' }}
                >
                  <Tab 
                    value="kanban" 
                    label="Kanban" 
                    
                    icon={<DashboardIcon />} 
                    iconPosition="start"
                    sx={{ minHeight: '40px', py: 0 }}
                  />
                  <Tab 
                    value="list" 
                    label="List" 
                    icon={<ProjectListIcon />} 
                    iconPosition="start"
                    sx={{ minHeight: '40px', py: 0 }}
                  />
                </Tabs>
                
                {/* Project Selection Dropdown */}
                <Button
                  variant="outlined"
                  onClick={handleProjectMenuOpen}
                  startIcon={<ProjectIcon />}
                  endIcon={<ArrowForwardIcon sx={{ 
                    transform: projectMenuAnchor ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s'
                  }} />}
                  sx={{ minWidth: '200px', justifyContent: 'space-between' }}
                >
                  {/**display the current project  */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {currentProject.name}
                  </Box>
                </Button>

                {/* Dropdown menu for switching between projects */}

                <Menu
                  anchorEl={projectMenuAnchor}
                  open={Boolean(projectMenuAnchor)}
                  onClose={handleProjectMenuClose}
                  PaperProps={{
                    style: {
                      maxHeight: 300,
                      width: '250px',
                    },
                  }}
                >
                  {projects.map((project, index) => (
                    <MenuItem 
                      key={project.id} 
                      onClick={() => handleProjectSelect(index)}
                      selected={index === currentProjectIndex}
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      {/* Project name and progress info */}

                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <Typography variant="body1" noWrap>
                          {project.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {getTotalTasks(project)} tasks • {project.progress}% complete
                        </Typography>
                      </Box>

                      {/* Show "Active" chip for the currently selected project */}

                      {index === currentProjectIndex && (
                        <Chip label="Active" size="small" color="primary" />
                      )}
                    </MenuItem>
                  ))}
                </Menu>
                
                {/* Project navigation (previous/next buttons + counter) */}

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    onClick={() => handleProjectChange('prev')} 
                    disabled={currentProjectIndex === 0}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  
                  <Typography variant="body2" sx={{ mx: 1 }}>
                    {currentProjectIndex + 1} of {projects.length}
                  </Typography>
                  
                  <IconButton 
                    onClick={() => handleProjectChange('next')} 
                    disabled={currentProjectIndex === projects.length - 1}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            
            {/* ---------- Project Description & Progress Bar ---------- */}

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2 
            }}>
              <Typography variant="body2" sx={{ color: 'maroon', fontWeight: 'bold' }}>
                {currentProject.description}
              </Typography>
              
               {/* Progress indicator with percentage + bar */}

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold' }}>
                  Progress: {currentProject.progress}%
                </Typography>
                <Box sx={{ 
                  width: '100px', 
                  height: '8px', 
                  backgroundColor: '#e0e0e0', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    width: `${currentProject.progress}%`, 
                    height: '100%', 
                    backgroundColor: '#4caf50',
                    transition: 'width 0.3s ease'
                  }} />
                </Box>
              </Box>
            </Box>

                 {/* ---------- Kanban Board View ---------- */}

            {viewMode === 'kanban' ? (
              <Box sx={{ 
                display: 'flex', 
                overflowX: 'auto',
                padding: '1rem 0',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                mt: 2
              }}>
                {Object.values(currentProject.columns).map(column => (
                  <Box key={column.id} sx={kanbanColumnStyles(column.color)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ color: column.color, mr: 1 }}>
                        {column.icon}
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
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

                      {/* Add Task (only if user has permission) */}

                      {rolePermissions[currentUser.role].canAdd && column.id === 'backlog' &&(
                        <Tooltip title="Add Task">
                          <IconButton 
                            size="small" 
                            sx={{ ml: 1 }}
                            onClick={() => handleAddTask('backlog')}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                    
                 {/* Render tasks inside this column */}
                  
                    {column.tasks.map(task => (
                      <Box 
                        key={task.id} 
                        sx={kanbanCardStyles(column.color)}
                        onClick={() => handleEditTask(task, column.id)}
                      >
                         {/* Task header */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>{task.title}</Typography>
                          {rolePermissions[currentUser.role].canDelete && (
                            <IconButton 
                              size="small" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTask(task.id, column.id);
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Box>

                         {/* Task assignee + role */}

                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <PersonIcon fontSize="small" sx={{ 
                            color: getAssigneeColor(task.assignee),
                            mr: 0.5 
                          }} />
                          <Typography variant="caption" sx={{ color: '#757575' }}>
                            {task.assignee}
                          </Typography>
                          <Chip 
                            label={task.assigneeRole} 
                            size="small" 
                            sx={{ 
                              ml: 1,
                              fontSize: '0.6rem',
                              height: '20px',
                              backgroundColor: getAssigneeColor(task.assignee),
                              color: 'white'
                            }} 
                            icon={<RoleIcon fontSize="small" sx={{ color: 'white' }} />}
                          />
                        </Box>

                        {/**DUE DATE */}
                        {task.dueDate && (
                          <Typography variant="caption" sx={{ 
                            color: '#757575', 
                            display: 'block',
                            mt: 0.5
                          }}>
                            Due: {new Date(task.dueDate).toLocaleDateString("en-GB")}
                          </Typography>
                        )}
                        
                        {/* Task movement controls (move left/right between columns) */}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
  {/* Show back arrow only if not in backlog */}
  {column.id !== 'backlog' && (
    <Tooltip title="Move to previous column">
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          if (column.id === 'inProgress') {
            moveTask(task.id, 'inProgress', 'backlog');
          } else if (column.id === 'done') {
            moveTask(task.id, 'done', 'inProgress');
          }
        }}
      >
        <ArrowBackIcon fontSize="small" />
      </IconButton>
    </Tooltip>
      )}

      {/* Show forward arrow only if not in done */}
      {column.id !== 'done' && (
    <Tooltip title="Move to next column">
      <IconButton
        size="small"
        sx={{ ml: 'auto' }}
        onClick={(e) => {
          e.stopPropagation();
          if (column.id === 'backlog') {
            moveTask(task.id, 'backlog', 'inProgress');
          } else if (column.id === 'inProgress') {
            moveTask(task.id, 'inProgress', 'done');
          }
        }}
      >
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
            ) : (
              // List View
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
                    {Object.values(currentProject.columns).flatMap(column => 
                      column.tasks.map(task => (
                        <TableRow key={task.id}>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>
                              {task.title}
                            </Typography>
                            {task.description && (
                              <Typography variant="caption" color="text.secondary">
                                {task.description}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ 
                                width: 24, 
                                height: 24, 
                                mr: 1,
                                backgroundColor: getAssigneeColor(task.assignee),
                                fontSize: '0.8rem'
                              }}>
                                {task.assignee.charAt(0)}
                              </Avatar>
                              {task.assignee}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={column.title} 
                              size="small"
                              sx={{ 
                                backgroundColor: column.color,
                                color: 'white'
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-GB") : 'No due date'}
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              size="small"
                              onClick={() => handleEditTask(task, column.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            {rolePermissions[currentUser.role].canDelete && (
                              <IconButton 
                                size="small"
                                onClick={() => handleDeleteTask(task.id, column.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        {/* Recent Activities 
        <Card sx={styles.activityCard}>
          <CardContent>
            <Typography variant="h6" sx={styles.chartTitle}>
              <TimelineIcon sx={styles.headerIcon} />
              Recent Client Activities
            </Typography>
            <TableContainer component={Paper} sx={styles.activityTableContainer}>
              <Table>
                <TableHead>
                  <TableRow sx={styles.activityTableHead}>
                    <TableCell sx={styles.activityTableHeaderCell}>Client</TableCell>
                    <TableCell sx={styles.activityTableHeaderCell}>Activity</TableCell>
                    <TableCell sx={styles.activityTableHeaderCell}>Date</TableCell>
                    <TableCell sx={styles.activityTableHeaderCell}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities.map((row, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={styles.activityTableRow}
                    >
                      <TableCell sx={styles.activityTableCell}>{row.client}</TableCell>
                      <TableCell sx={styles.activityTableCell}>{row.activity}</TableCell>
                      <TableCell sx={styles.activityTableCell}>{row.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status.replace('-', ' ')}
                          sx={styles.statusChip(row.status)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
*/}
        {/* Data Export Section */}
        <Card sx={styles.exportCard}>
          <CardContent>
            <Typography variant="h6" sx={styles.chartTitle}>
              <DownloadIcon sx={styles.headerIcon} />
              Export Reports
            </Typography>
            <Stack direction="row" spacing={2}>
              {['CSV', 'Excel', 'PDF'].map((format) => (
                <Button
                  key={format}
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleExport(format)}
                  sx={styles.exportButton}
                >
                  Download {format}
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Task Dialog */}
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Edit Task' : 'Add New Task'}</DialogTitle>
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
              <InputLabel>Assignee</InputLabel>
              <Select
                label="Assignee"
                value={currentTask?.assignee || ''}
                onChange={(e) => {
                  const selectedMember = teamMembers.find(m => m.name === e.target.value);
                  setCurrentTask({ 
                    ...currentTask, 
                    assignee: e.target.value,
                    assigneeRole: selectedMember ? selectedMember.role : ''
                  });
                }}
              >
                {teamMembers.map(member => (
                  <MenuItem key={member.id} value={member.name}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        width: 24, 
                        height: 24, 
                        mr: 1,
                        backgroundColor: member.color,
                        fontSize: '0.8rem'
                      }}>
                        {member.name.charAt(0)}
                      </Avatar>
                      {member.name} ({member.role})
                    </Box>
                  </MenuItem>
                ))}
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
            
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={currentColumn}
                onChange={(e) => setCurrentColumn(e.target.value)}
                label="Status"
              >
                <MenuItem value="backlog">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BacklogIcon sx={{ color: '#FF9F1C', mr: 1 }} />
                    Backlog
                  </Box>
                </MenuItem>
                
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveTask} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}