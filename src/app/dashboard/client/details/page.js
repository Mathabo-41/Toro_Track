/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/

'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box, Typography, Grid, Card, CardContent,
  Stack, Avatar, List, ListItem, ListItemText,
  Divider, Button, Drawer, ListItemButton,
  Chip, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Tabs, Tab, TextField, IconButton, CircularProgress,
  Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  Assignment as ProjectIcon,
  AttachFile as FilesIcon,
  Download as DownloadIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as DoneIcon,
  Build as InProgressIcon,
  PlaylistAdd as BacklogIcon,
  Person as PersonIcon,
  Security as RoleIcon
} from '@mui/icons-material';

// Snackbar for notifications
import { Snackbar, Alert } from '@mui/material';

import { useDetails } from './useDetails/page';
import {
  pageStyles,
  sidebarStyles,
  mainContentStyles,
  headerStyles,
  progressCardStyles,
  tabsStyles,
  contentCardStyles,
  milestoneStyles,
  teamStyles,
  filesStyles,
  discussionStyles
} from './styles';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { useClientStore } from '../common/clientStore';
import { clientMenu } from '../common/clientStore';

// Define consistent colors for each column (using system colors)
const COLUMN_COLORS = {
  backlog: '#E71D36', // Red
  inProgress: '#FF9F1C', // Orange
  done: '#2EC4B6' // Teal
};

// Team members with roles
const teamMembers = [
  { id: 1, name: 'John D.', role: 'admin', color: '#FF6B6B' },
  { id: 2, name: 'ZamaZama M.', role: 'auditor', color: '#4ECDC4' },
  { id: 3, name: 'Thato T.', role: 'client', color: '#45B7D1' },
  { id: 4, name: 'Zweli L.', role: 'auditor', color: '#FFA07A' },
  { id: 5, name: 'Alex K.', role: 'client', color: '#98D8C8' }
];

// Role permissions for client users
const rolePermissions = {
  client: { canEdit: true, canDelete: false, canMove: false, canAdd: true }
};

// #region: Main Component
export default function ProjectDetails() {
  const {
    activeTab,
    commentText,
    projectData,
    isLoading,
    error,
    comments,
    isCommentsLoading,
    handleTabChange,
    handleCommentSubmit,
    handleCommentChange,
  } = useDetails();

  // State for sidebar
  const [sidebarOpen] = React.useState(true);

  // Router for redirection/navigation
  const router = useRouter();
  
  // Snackbar state 
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  // Current user (client)
  const [currentUser] = useState({ name: 'John Doe', role: 'client' });

  // Kanban board state - only projects linked to this client
  const [clientProjects, setClientProjects] = useState([
    {
      id: 1,
      name: 'CRM Dashboard Redesign',
      description: <span style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Redesign of the main CRM dashboard interface</span>,
      progress: 65,
      client: 'John Doe', // This project is linked to the current client
      columns: {
        backlog: {
          id: 'backlog',
          title: 'Backlog',
          color: COLUMN_COLORS.backlog,
          icon: <BacklogIcon />,
          tasks: [
            { id: 1, title: 'Update dashboard UI', assignee: 'John D.', assigneeRole: 'admin', description: 'Redesign the main dashboard components', dueDate: '2023-12-15' },
            { id: 2, title: 'Research analytics tools', assignee: 'ZamaZama M.', assigneeRole: 'client', description: 'Evaluate new tools for customer analytics', dueDate: '2023-12-20' }
          ]
        },
        inProgress: {
          id: 'inProgress',
          title: 'In Progress',
          color: COLUMN_COLORS.inProgress,
          icon: <InProgressIcon />,
          tasks: [
            { id: 3, title: 'Implement API endpoints', assignee: 'Thato T.', assigneeRole: 'auditor', description: 'Create new endpoints for customer data', dueDate: '2023-12-10' },
            { id: 4, title: 'Fix performance issues', assignee: 'Zweli L.', assigneeRole: 'admin', description: 'Optimize database queries', dueDate: '2023-12-12' }
          ]
        },
        done: {
          id: 'done',
          title: 'Done',
          color: COLUMN_COLORS.done,
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
      description: <span style={{ fontStyle: 'normal', fontWeight: 'bold' }}>New portal for customer support tickets</span>,
      progress: 35,
      client: 'John Doe', // This project is linked to the current client
      columns: {
        backlog: {
          id: 'backlog',
          title: 'Backlog',
          color: COLUMN_COLORS.backlog,
          icon: <BacklogIcon />,
          tasks: [
            { id: 7, title: 'Design ticket interface', assignee: 'Sarah M.', assigneeRole: 'admin', dueDate: '2023-12-18' }
          ]
        },
        inProgress: {
          id: 'inProgress',
          title: 'In Progress',
          color: COLUMN_COLORS.inProgress,
          icon: <InProgressIcon />,
          tasks: [
            { id: 8, title: 'Build ticket API', assignee: 'Mike T.', assigneeRole: 'auditor', dueDate: '2023-12-15' }
          ]
        },
        done: {
          id: 'done',
          title: 'Done',
          color: COLUMN_COLORS.done,
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

  // Current project
  const currentProject = clientProjects[currentProjectIndex];

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

  // Function to handle the logout action with snackbar and redirect to the login page
  const handleLogout = () => {
    setSnackbarMessage('Logging out...');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
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

    const updatedProjects = [...clientProjects];
    const column = updatedProjects[currentProjectIndex].columns[columnId];
    column.tasks = column.tasks.filter(task => task.id !== taskId);
    setClientProjects(updatedProjects);
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

    const updatedProjects = [...clientProjects];
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
      // Add new task
      const newTask = {
        ...currentTask,
        id: Math.max(0, ...project.columns.backlog.tasks.map(t => t.id), 
                     ...project.columns.inProgress.tasks.map(t => t.id), 
                     ...project.columns.done.tasks.map(t => t.id)) + 1
      };
      project.columns[currentColumn].tasks.push(newTask);
    }

    setClientProjects(updatedProjects);
    setOpenTaskDialog(false);
    setSnackbarMessage(isEditing ? 'Task updated successfully' : 'Task added successfully');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
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

  // --- Conditional Rendering for Loading and Error States ---
  if (isLoading || isCommentsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Error loading project data.
        </Typography>
      </Box>
    );
  }

                     // --- Render Functions ---
  const renderOverviewTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={contentCardStyles.card}>
          <CardContent>
            <Typography variant="h6" sx={contentCardStyles.title}>Project Details</Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" sx={contentCardStyles.textLabel}>Start Date</Typography>
                <Typography variant="body1" sx={contentCardStyles.textValue}>{projectData.startDate}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={contentCardStyles.textLabel}>Budget</Typography>
                <Typography variant="body1" sx={contentCardStyles.textValue}>{projectData.budget}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={contentCardStyles.textLabel}>Description</Typography>
                <Typography variant="body1" sx={contentCardStyles.textValue}>{projectData.description}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={contentCardStyles.card}>
          <CardContent>
            <Typography variant="h6" sx={contentCardStyles.title}>Recent Activity</Typography>
            <List>
              {['Project status updated', 'New files uploaded', 'Meeting scheduled'].map((activity, index) => (
                <ListItem key={index} sx={contentCardStyles.textValue}>
                  <ListItemText
                    primary={activity}
                    secondary={
                      <Typography component="span" sx={contentCardStyles.textLabel}>
                        {index === 0 ? 'Today' : index === 1 ? 'Yesterday' : '2 days ago'}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
//render function for milestones 
  const renderMilestonesTab = () => (
    <Card sx={contentCardStyles.card}>
      <CardContent>
        <Typography variant="h6" sx={contentCardStyles.title}>Project Milestones</Typography>
        <TableContainer component={Paper} sx={milestoneStyles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Milestone</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Status</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectData.milestones.map((milestone) => (
                <TableRow key={milestone.id}>
                  <TableCell sx={milestoneStyles.tableCell}>{milestone.name}</TableCell>
                  <TableCell>
                    <Chip
                      icon={milestone.status === 'completed' ? <CompletedIcon /> : <PendingIcon />}
                      label={milestone.status === 'completed' ? 'Completed' : milestone.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      sx={milestoneStyles.chip(milestone.status)}
                    />
                  </TableCell>
                  <TableCell sx={milestoneStyles.tableCell}>{milestone.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
  //render function for the teams tab
  const renderTeamTab = () => (
    <Card sx={contentCardStyles.card}>
      <CardContent>
        <Typography variant="h6" sx={contentCardStyles.title}>Team Members</Typography>
        <Grid container spacing={2}>
          {projectData.team.map((member) => (
            <Grid item xs={12} sm={6} key={member.id}>
              <Card sx={teamStyles.memberCard}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={member.avatar} sx={{ width: 56, height: 56 }} />
                    <Box>
                      <Typography variant="body1" sx={teamStyles.memberName}>{member.name}</Typography>
                      <Typography variant="body2" sx={teamStyles.memberRole}>{member.role}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
//render function for files tab
  const renderFilesTab = () => (
    <Card sx={contentCardStyles.card}>
      <CardContent>
        <Typography variant="h6" sx={contentCardStyles.title}>Project Files</Typography>
        <TableContainer component={Paper} sx={milestoneStyles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={milestoneStyles.tableHeaderCell}>File Name</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Type</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Size</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Date</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectData.files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell sx={milestoneStyles.tableCell}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <FilesIcon fontSize="small" sx={filesStyles.fileIcon} />
                      <Typography>{file.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={milestoneStyles.tableCell}>{file.type.toUpperCase()}</TableCell>
                  <TableCell sx={milestoneStyles.tableCell}>{file.size}</TableCell>
                  <TableCell sx={milestoneStyles.tableCell}>{file.date}</TableCell>
                  <TableCell>
                    <IconButton sx={filesStyles.iconButton}>
                      <DownloadIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
//render discussion tab
  const renderDiscussionTab = () => (
    <Card sx={contentCardStyles.card}>
      <CardContent>
        <Typography variant="h6" sx={contentCardStyles.title}>Project Discussion</Typography>
        <List sx={discussionStyles.list}>
          {comments?.map((comment) => (
            <div key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<Typography sx={discussionStyles.commentUser}>{comment.user}</Typography>}
                  secondary={
                    <>
                      <Typography component="span" sx={discussionStyles.commentText}>{comment.text}</Typography>
                      <Typography component="span" sx={discussionStyles.commentTime}>{comment.time}</Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider sx={discussionStyles.divider} />
            </div>
          ))}
        </List>
        <Box component="form" onSubmit={handleCommentSubmit}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment..."
              value={commentText}
              onChange={handleCommentChange}
              sx={discussionStyles.textField}
            />
            <Button type="submit" variant="contained" sx={discussionStyles.submitButton}>Post</Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );

  // New Kanban tab for client projects
  const renderKanbanTab = () => (
    <Card sx={{ mb: 4, boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={contentCardStyles.title}>
            <ProjectIcon sx={{ mr: 1 }} />
            Project Task Board
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {currentProjectIndex + 1} of {clientProjects.length}
            </Typography>
            
            <IconButton 
              onClick={() => setCurrentProjectIndex(prev => Math.max(0, prev - 1))} 
              disabled={currentProjectIndex === 0}
            >
              <ArrowBackIcon />
            </IconButton>
            
            <IconButton 
              onClick={() => setCurrentProjectIndex(prev => Math.min(clientProjects.length - 1, prev + 1))} 
              disabled={currentProjectIndex === clientProjects.length - 1}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {currentProject.description}
          </Typography>
          
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

        {/* Kanban Board */}
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
                {/**add and assign  */}
                {rolePermissions[currentUser.role].canAdd && (
                  <Tooltip title="Add Task">
                    <IconButton 
                      size="small" 
                      sx={{ ml: 1 }}
                      onClick={() => handleAddTask(column.id)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              
              {column.tasks.map(task => (
                <Box 
                  key={task.id} 
                  sx={kanbanCardStyles(column.color)}
                  onClick={() => handleEditTask(task, column.id)}
                >
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
                  {task.dueDate && (
                    <Typography variant="caption" sx={{ 
                      color: '#757575', 
                      display: 'block',
                      mt: 0.5
                    }}>
                      Due: {new Date(task.dueDate).toLocaleDateString("en-GB")}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  // Renders the content of the currently active tab.
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
        return null;
    }
  };

  // #endregion

  // #region: Render
  return (
    <Box sx={globalStyles.rootBox}>
      {/* --- Sidebar Navigation --- */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
        <Box sx={globalStyles.drawerHeader}>
          <Typography variant="h5">Client Portal</Typography>
        </Box>
        <List>
          {clientMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={globalStyles.listItemButton}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Region: User Profile Section */}
        <Box sx={{
          padding: '1rem',
          borderTop: '2px solid #6b705c',
          marginTop: 'auto'
        }}>
          {/* User Profile Container */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
            {/* Profile Picture */}
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

            {/* User Details  */}
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                {/* User Name */}
                <Typography sx={{ 
                  fontWeight: '600', 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#fefae0'
                }}>
                  John Doe
                </Typography>
                
                {/* User Email */}
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

          {/* Logout Button */}
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
      <Box component="main" sx={mainContentStyles.mainBox}>
        {/* Project Header */}
        <Box sx={headerStyles.headerBox}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={headerStyles.headerTitle}>
              <ProjectIcon sx={headerStyles.projectIcon} />
              {projectData.name}
            </Typography>
            <Chip
              label={projectData.status === 'active' ? 'In Progress' : 'Completed'}
              sx={headerStyles.chip(projectData.status)}
            />
          </Stack>
          <Typography variant="body1" sx={headerStyles.headerSubtext}>
            Project ID: {projectData.id} | {projectData.description}
          </Typography>
        </Box>

        {/* Project Progress */}
        <Card sx={progressCardStyles.card}>
          <CardContent>
            <Typography variant="h6" sx={progressCardStyles.title}>Project Progress</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: '100%' }}>
                <Box sx={progressCardStyles.progressBarContainer}>
                  <Box sx={progressCardStyles.progressBar(projectData.progress)} />
                </Box>
                <Typography variant="body2" sx={progressCardStyles.progressText}>
                  {projectData.progress}% completed
                </Typography>
              </Box>
              <Box sx={progressCardStyles.deadlineBox}>
                <Typography variant="body2" sx={progressCardStyles.deadlineLabel}>Deadline</Typography>
                <Typography variant="h6" sx={progressCardStyles.deadlineValue}>{projectData.deadline}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Project Tabs */}
        <Tabs value={activeTab} onChange={handleTabChange} sx={tabsStyles.tabs}>
          <Tab label="Overview" sx={tabsStyles.tab} />
          <Tab label="Milestones" sx={tabsStyles.tab} />
          <Tab label="Team" sx={tabsStyles.tab} />
          <Tab label="Files" sx={tabsStyles.tab} />
          <Tab label="Discussion" sx={tabsStyles.tab} />
          <Tab label="Kanban Board" sx={tabsStyles.tab} />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ mt: 2 }}>
          {renderTabContent()}
        </Box>
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
                    <BacklogIcon sx={{ color: COLUMN_COLORS.backlog, mr: 1 }} />
                    Backlog
                  </Box>
                </MenuItem>
                <MenuItem value="inProgress">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InProgressIcon sx={{ color: COLUMN_COLORS.inProgress, mr: 1 }} />
                    In Progress
                  </Box>
                </MenuItem>
                <MenuItem value="done">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DoneIcon sx={{ color: COLUMN_COLORS.done, mr: 1 }} />
                    Done
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

      {/* Snackbar with message when the user logs out of the system /their portal */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} 
          sx={{ width: '100%', 
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
// #endregion