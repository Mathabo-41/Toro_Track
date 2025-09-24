/* The file that combines the logic with the styles and displays it as a screen. Rendering takes place here to make the screen respond fast when it is being clicked*/

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box, Typography, Button, Card,
  CardContent, Stack, Avatar, List, ListItem,
  ListItemButton, ListItemText, Drawer,
  Grid, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead,
  TableRow, Chip, IconButton, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Tooltip, Select, MenuItem, FormControl, InputLabel,
  Menu, Tabs, Tab, CircularProgress
} from '@mui/material';
import {
  Assessment as ReportsIcon,
  Download as DownloadIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
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

/**
 * Main Performance Reports Component with Kanban Board
 */
export default function PerformanceReports() {
  const { 
    reports, activities, projects, teamMembers, loading, error, menu,
    currentUser, rolePermissions,
    openSnackbar, snackbarMessage, snackbarSeverity, setOpenSnackbar,
    currentProjectIndex, currentProject,
    openTaskDialog, setOpenTaskDialog, currentTask, setCurrentTask, isEditing,
    projectMenuAnchor, viewMode, setViewMode,
    handleLogout, handleExport, handleProjectMenuOpen, handleProjectMenuClose,
    handleProjectSelect, handleAddTask, handleEditTask, handleDeleteTask,
    handleSaveTask, moveTask, handleProjectChange
  } = useReports();
  
  const getAssigneeColor = (assigneeId) => {
    const member = teamMembers.find(m => m.id === assigneeId);
    return member ? '#4ECDC4' : '#888';
  };

  const getAssigneeName = (assigneeId) => {
    const member = teamMembers.find(m => m.id === assigneeId);
    return member ? member.name : 'Unassigned';
  };

  const getTotalTasks = (project) => {
    if (!project || !project.columns) return 0;
    return Object.values(project.columns).reduce((total, column) => total + (column.tasks?.length || 0), 0);
  };

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
                  <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
                      <DashboardIcon />
                  </IconButton>
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
          <Box sx={{ padding: '1rem', borderTop: '2px solid #6b705c', marginTop: 'auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', overflow: 'hidden', gap: '0.75rem' }}>
                  <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid #f3722c' }}>
                      <Image src="/toroLogo.jpg" alt="User Profile" fill style={{ objectFit: 'cover' }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: '600', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fefae0' }}>{currentUser.name || 'Admin User'}</Typography>
                      <Typography sx={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'rgba(254, 250, 224, 0.7)' }}>user@toro.com</Typography>
                  </Box>
              </Box>
              <Button onClick={handleLogout} fullWidth sx={{ padding: '0.75rem', background: 'transparent', border: '1px solid #fefae0', borderRadius: '8px', color: '#fefae0', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', '&:hover': { background: '#6b705c' } }}>
                  Logout
              </Button>
          </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={styles.mainContent}>
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
              {/* Kanban Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, fontWeight: 'bold' }}>
                  <Typography variant="h6" sx={styles.chartTitle}><ProjectIcon sx={styles.headerIcon} />Project Task Board</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tabs value={viewMode} onChange={(e, newValue) => setViewMode(newValue)} sx={{ minHeight: '40px' }} >
                      <Tab value="kanban" label="Kanban" icon={<DashboardIcon />} iconPosition="start" sx={{ minHeight: '40px', py: 0 }} />
                      <Tab value="list" label="List" icon={<ProjectListIcon />} iconPosition="start" sx={{ minHeight: '40px', py: 0 }} />
                    </Tabs>
                    <Button variant="outlined" onClick={handleProjectMenuOpen} startIcon={<ProjectIcon />} endIcon={<ArrowForwardIcon sx={{ transform: projectMenuAnchor ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />} sx={{ minWidth: '250px', justifyContent: 'space-between' , color: '#990c0cff', fontSize: "15px", fontFamily: "bold" , fontFamily: "sans-serif" }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {currentProject.name}
                      </Box>
                    </Button>
                    <Menu anchorEl={projectMenuAnchor} open={Boolean(projectMenuAnchor)} onClose={handleProjectMenuClose} PaperProps={{ style: { maxHeight: 300, width: '350px' } }}>
                      {projects.map((project, index) => (
                        <MenuItem key={project.id} onClick={() => handleProjectSelect(index)} selected={index === currentProjectIndex} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Typography variant="body1" noWrap>{project.name}</Typography>
                            <Typography variant="caption" color="text.secondary" noWrap>{getTotalTasks(project)} tasks • {project.progress}% complete</Typography>
                          </Box>
                          {index === currentProjectIndex && (<Chip label="Active" size="small" color="primary" />)}
                        </MenuItem>
                      ))}
                    </Menu>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => handleProjectChange('prev')} disabled={currentProjectIndex === 0}><ArrowBackIcon /></IconButton>
                      <Typography variant="body2" sx={{ mx: 1 }}>{currentProjectIndex + 1} of {projects.length}</Typography>
                      <IconButton onClick={() => handleProjectChange('next')} disabled={currentProjectIndex === projects.length - 1}><ArrowForwardIcon /></IconButton>
                    </Box>
                  </Box>
              </Box>

              {/* Kanban View */}
              {viewMode === 'kanban' ? (
                <Box sx={{ display: 'flex', overflowX: 'auto', padding: '1rem 0', backgroundColor: '#F0E68C', borderRadius: '8px', mt: 2 }}>
                  {Object.entries(currentProject.columns).map(([columnId, column]) => (
                    <Box key={columnId} sx={{flex: 1, minWidth: 300, padding: '1rem', borderRadius: '8px', backgroundColor: '#f8f9fa', borderTop: `4px solid #FF9F1C`, '&:not(:last-child)': {marginRight: '1rem'} }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{column.title}</Typography>
                        <Chip label={column.tasks?.length || 0} size="small" sx={{ ml: 'auto', backgroundColor: '#FF9F1C', color: 'white', fontWeight: 'bold' }} />
                        {rolePermissions[currentUser.role].canAdd && column.id === 'backlog' && (
                          <Tooltip title="Add Task">
                            <IconButton size="small" sx={{ ml: 1 }} onClick={() => handleAddTask(columnId)}><AddIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        )}
                      </Box>
                      {(column.tasks || []).map(task => (
                        <Box key={task.id} sx={{padding: '0.75rem', marginBottom: '0.75rem', borderRadius: '4px', backgroundColor: 'white', borderLeft: `4px solid #FF9F1C`, cursor: 'pointer'}} onClick={() => handleEditTask(task, columnId)}>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>{task.title}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <PersonIcon fontSize="small" sx={{color: getAssigneeColor(task.assignee_id), mr: 0.5}}/>
                              <Typography variant="caption" sx={{color: '#757575'}}>{getAssigneeName(task.assignee_id)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                {columnId !== 'backlog' && <IconButton size="small" onClick={(e) => { e.stopPropagation(); moveTask(task.id, columnId, columnId === 'inProgress' ? 'backlog' : 'inProgress'); }}><ArrowBackIcon fontSize="small" /></IconButton>}
                                {columnId !== 'done' && <IconButton size="small" sx={{ ml: 'auto' }} onClick={(e) => { e.stopPropagation(); moveTask(task.id, columnId, columnId === 'backlog' ? 'inProgress' : 'done'); }}><ArrowForwardIcon fontSize="small" /></IconButton>}
                            </Box>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              ) : (
                <p>List view goes here</p> // Placeholder for list view
              )}
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Task Dialog */}
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>{isEditing ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                  <TextField label="Task Title" value={currentTask?.title || ''} onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })} fullWidth required />
                  <FormControl fullWidth>
                      <InputLabel>Assignee</InputLabel>
                      <Select label="Assignee" value={currentTask?.assignee_id || ''} onChange={(e) => setCurrentTask({ ...currentTask, assignee_id: e.target.value })}>
                          {teamMembers.map(member => ( <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem> ))}
                      </Select>
                  </FormControl>
                  <TextField label="Description" value={currentTask?.description || ''} onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })} multiline rows={3} fullWidth />
                  <TextField label="Due Date" type="date" value={currentTask?.due_date || ''} onChange={(e) => setCurrentTask({ ...currentTask, due_date: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth />
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