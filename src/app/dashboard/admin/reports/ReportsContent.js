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
import { 
  fetchReportMetrics, 
  fetchKanbanData, 
  fetchTeamMembers, 
  createTask, 
  updateTask, 
  updateTaskStatus, 
  deleteTask 
} from './reportsService/page';

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

  // Menu data
  const menu = [
    { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
    { name: 'Performance Reports', path: '/dashboard/admin/reports' },
    { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
    { name: 'Projects', path: '/dashboard/admin/projects' },
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

        // Fetch all data
        const [metricsData, kanbanData, membersData] = await Promise.all([
          fetchReportMetrics(),
          fetchKanbanData(),
          fetchTeamMembers()
        ]);

        setReports(metricsData);
        setProjects(kanbanData);
        setTeamMembers(membersData);
        
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

  // Helper functions
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const getAssigneeColor = (assigneeId) => {
    const member = teamMembers.find(m => m.id === assigneeId);
    return member ? member.color : '#888';
  };

  const getAssigneeName = (assigneeId) => {
    const member = teamMembers.find(m => m.id === assigneeId);
    return member ? member.name : 'Unknown';
  };

  const getAssigneeRole = (assigneeId) => {
    const member = teamMembers.find(m => m.id === assigneeId);
    return member ? member.role : 'unknown';
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
    try {
      await supabase.auth.signOut();
      showSnackbar('Logging out...');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err) {
      showSnackbar('Error logging out', 'error');
    }
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
      await deleteTask(taskId);
      
      // Update local state
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

    try {
      const selectedMember = teamMembers.find(m => m.id === currentTask.assignee);
      
      if (isEditing) {
        // Update existing task
        const updatedTask = await updateTask(currentTask.id, {
          title: currentTask.title,
          description: currentTask.description,
          assignee: currentTask.assignee,
          assigneeRole: selectedMember?.role || 'team_member',
          due_date: currentTask.dueDate,
          status: currentColumn
        });

        // Update local state
        const updatedProjects = [...projects];
        for (const columnKey in updatedProjects[currentProjectIndex].columns) {
          const column = updatedProjects[currentProjectIndex].columns[columnKey];
          const taskIndex = column.tasks.findIndex(t => t.id === currentTask.id);
          if (taskIndex !== -1) {
            // Remove from current column
            column.tasks.splice(taskIndex, 1);
            // Add to new column
            updatedProjects[currentProjectIndex].columns[currentColumn].tasks.push({
              ...updatedTask,
              assignee: getAssigneeName(updatedTask.assignee_id || updatedTask.assignee),
              assignee_role: selectedMember?.role || 'team_member'
            });
            break;
          }
        }
        setProjects(updatedProjects);
        
        showSnackbar('Task updated successfully');
      } else {
        // Create new task
        const selectedMember = teamMembers.find(m => m.id === currentTask.assignee);
        const newTaskData = {
          projectId: currentProject.id,
          title: currentTask.title,
          description: currentTask.description,
          assignee: currentTask.assignee,
          assigneeRole: selectedMember?.role || 'team_member',
          dueDate: currentTask.dueDate,
          status: 'backlog'
        };

        const newTask = await createTask(newTaskData);
        
        // Update local state
        const updatedProjects = [...projects];
        updatedProjects[currentProjectIndex].columns.backlog.tasks.push({
          ...newTask,
          assignee: getAssigneeName(newTask.assignee_id || newTask.assignee),
          assignee_role: selectedMember?.role || 'team_member'
        });
        setProjects(updatedProjects);
        
        showSnackbar('Task added successfully');
      }

      setOpenTaskDialog(false);
    } catch (err) {
      showSnackbar(`Error ${isEditing ? 'updating' : 'creating'} task: ${err.message}`, 'error');
    }
  };

  const moveTask = async (taskId, fromColumn, toColumn) => {
    try {
      await updateTaskStatus(taskId, toColumn);
      
      // Update local state
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
          <Link href="/dashboard" passHref>
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
                        {metric.trend === 'up' ? <TrendingUpIcon sx={styles.trendIcon('up')} fontSize="small" /> : <TrendingDownIcon sx={styles.trendIcon('down')} fontSize="small" />}
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
        {currentProject && (
          <Card sx={{ mb: 4, boxShadow: 3, bgcolor:'#BDB76B' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, fontWeight: 'bold' }}>
                <Typography variant="h6" sx={styles.chartTitle}><ProjectIcon sx={styles.headerIcon} />Project Task Board</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tabs value={viewMode} onChange={(e, newValue) => setViewMode(newValue)} sx={{ minHeight: '40px' }}>
                    <Tab value="kanban" label="Kanban" icon={<DashboardIcon />} iconPosition="start" sx={{ minHeight: '40px', py: 0 }} />
                    <Tab value="list" label="List" icon={<ProjectListIcon />} iconPosition="start" sx={{ minHeight: '40px', py: 0 }} />
                  </Tabs>
                  
                  <Button 
                    variant="outlined"  
                    startIcon={<ProjectIcon />} 
                    endIcon={<ArrowForwardIcon sx={{ transform: projectMenuAnchor ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />} 
                    onClick={handleProjectMenuOpen}
                    sx={{ minWidth: '250px', justifyContent: 'space-between', color: '#990c0cff', fontSize: "15px", fontWeight: "bold" }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {currentProject.name}
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'maroon', fontWeight: 'bold' }}>
                  {currentProject.description || 'No description available'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold' }}>
                    Progress: {currentProject.progress || 0}%
                  </Typography>
                  <Box sx={{ width: '100px', height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                    <Box sx={{ width: `${currentProject.progress || 0}%`, height: '100%', backgroundColor: '#4caf50', transition: 'width 0.3s ease' }} />
                  </Box>
                </Box>
              </Box>

              {viewMode === 'kanban' ? (
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
                            <PersonIcon fontSize="small" sx={{ color: getAssigneeColor(task.assignee_id || task.assignee), mr: 0.5 }} />
                            <Typography variant="caption" sx={{ color: '#757575' }}>
                              {getAssigneeName(task.assignee_id || task.assignee)}
                            </Typography>
                            <Chip 
                              label={task.assignee_role || getAssigneeRole(task.assignee_id || task.assignee)} 
                              size="small" 
                              sx={{ ml: 1, fontSize: '0.6rem', height: '20px', backgroundColor: getAssigneeColor(task.assignee_id || task.assignee), color: 'white' }} 
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
              ) : (
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
                                <Avatar sx={{ width: 24, height: 24, mr: 1, backgroundColor: getAssigneeColor(task.assignee_id || task.assignee), fontSize: '0.8rem' }}>
                                  {getAssigneeName(task.assignee_id || task.assignee).charAt(0)}
                                </Avatar>
                                {getAssigneeName(task.assignee_id || task.assignee)}
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
              )}
            </CardContent>
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
              <InputLabel>Assignee</InputLabel>
              <Select 
                label="Assignee" 
                value={currentTask?.assignee || ''}
                onChange={(e) => setCurrentTask({ ...currentTask, assignee: e.target.value })}
              >
                {teamMembers.map(member => (
                  <MenuItem key={member.id} value={member.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, backgroundColor: member.color, fontSize: '0.8rem' }}>
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
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={snackbarSeverity} sx={{ width: '100%', fontWeight: 'bold', fontSize: '1rem' }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}