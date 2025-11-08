'use client';

import React, { useState } from 'react'; // Removed useEffect
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// Removed createSupabaseClient
import {
  Box, Typography, Button, Card, CardContent, Stack, Avatar, List, ListItem,
  ListItemButton, ListItemText, Drawer, Grid, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, Select, MenuItem,
  FormControl, InputLabel, Menu, Tabs, Tab, AppBar, Toolbar
} from '@mui/material';
import {
  Assessment as ReportsIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon,
  Logout as LogoutIcon, Add as AddIcon, ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon,
  Folder as ProjectIcon, Person as PersonIcon, ViewList as ProjectListIcon, Dashboard as DashboardIcon,
  CheckCircle as DoneIcon, Build as InProgressIcon, PlaylistAdd as BacklogIcon,
  Edit as EditIcon, Delete as DeleteIcon, Menu as MenuIcon, Security as RoleIcon
} from '@mui/icons-material';
import { Snackbar, Alert } from '@mui/material';

import { styles } from './styles';
import LoadingScreen from '../common/LoadingScreen';
import { useReports } from './useReports/useReports'; // Import the hook

export default function PerformanceReports() {
  const router = useRouter();
  
  // --- All state and logic is now imported from the hook ---
  const {
    // State
    reports, 
    projects, 
    teamMembers, 
    loading, 
    error, 
    menu,
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
    getTotalTasks
  } = useReports();

  // mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  // Use the loading state from the hook
  if (loading) {
    return <LoadingScreen message="Loading Reports..." />;
  }

  // Use the error state from the hook
  if (error) {
    return (
      <Box sx={{ ...styles.mainContainer, ...styles.mainContent, alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error">Error loading data: {error.message}</Alert>
      </Box>
    );
  }

  const drawerContent = (
    <>
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
    </>
  );


  return (
    <Box sx={styles.mainContainer}>
      {/* Sidebar Navigation */}
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} 
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { ...styles.sidebarDrawer['& .MuiDrawer-paper'], boxSizing: 'border-box' }
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
          ...styles.sidebarDrawer
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{
          ...styles.mainContent,
          flexGrow: 1, 
          width: { xs: '100%', md: `calc(100% - 240px)` },
          ml: { xs: 0, md: `240px` }, 
          p: 0 
        }}
      >
        {/* --- APP BAR --- */}
        <AppBar
          position="static"
          sx={{
            display: { xs: 'flex', md: 'none' }, 
            backgroundColor: '#283618',
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
              Performance Reports
            </Typography>
          </Toolbar>
        </AppBar>
        
        {/* Page Header */}
        <Box sx={{
          ...styles.pageHeader,
          display: { xs: 'none', md: 'flex' }, // Hide on mobile
          p: 3 // Add padding back for desktop
        }}>
          <Typography variant="h4" sx={styles.pageTitle}><ReportsIcon sx={styles.headerIcon} />Performance Reports</Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>Analytics and insights for your CRM system</Typography>
        </Box>

        {/* --- WRAP CONTENT IN PADDING BOX --- */}
        <Box sx={{ p: { xs: 2, md: 3 }, pt: { md: 0 } }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(reports).map(([key, metric]) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={key}> {/* Adjusted lg for 5 items */}
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
        </Box>

        {/* Kanban Board Section */}
        {projects.length > 0 ? (
          <Card sx={{ mb: 4, boxShadow: 3, bgcolor:'#BDB76B' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, fontWeight: 'bold', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h6" sx={styles.chartTitle}><ProjectIcon sx={styles.headerIcon} />Project Task Board</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Tabs value={viewMode} onChange={handleViewModeChange} sx={{ minHeight: '40px' }}>
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
                    {currentProject?.description || 'No description available.'}
                  </Typography>
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
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDeleteTaskClick(task.id); }}>
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
                            <Tooltip title={`Move to ${columnId === 'in_progress' ? 'Backlog' : 'In Progress'}`}>
                              <IconButton size="small" onClick={(e) => { e.stopPropagation(); moveTask(task.id, columnId, columnId === 'in_progress' ? 'backlog' : 'in_progress'); }}>
                                <ArrowBackIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {columnId !== 'done' && (
                            <Tooltip title={`Move to ${columnId === 'backlog' ? 'In Progress' : 'Done'}`}>
                              <IconButton size="small" sx={{ ml: 'auto' }} onClick={(e) => { e.stopPropagation(); moveTask(task.id, columnId, columnId === 'backlog' ? 'in_progress' : 'done'); }}>
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
                      {Object.entries(currentProject.columns).flatMap(([columnId, column]) => 
                        (column?.tasks || []).map(task => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: '500' }}>{task.title}</Typography>
                              {task.description && <Typography variant="caption" color="text.secondary">{task.description}</Typography>}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ width: 24, height: 24, mr: 1, backgroundColor: getAssigneeColor(task.assignee_id), fontSize: '0.8rem' }}>
                                  {getAssigneeName(task)?.charAt(0)}
                                </Avatar>
                                {getAssigneeName(task)}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip label={column?.title || 'Unknown'} size="small" sx={{ backgroundColor: getColumnColor(columnId), color: 'white' }} />
                            </TableCell>
                            <TableCell>
                              {task.due_date ? new Date(task.due_date).toLocaleDateString("en-GB") : 'No due date'}
                            </TableCell>
                            <TableCell>
                              <IconButton size="small" onClick={() => handleEditTaskClick(task, columnId)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton size="small" onClick={() => handleDeleteTaskClick(task.id)}>
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
            <Button variant="contained" color="primary" onClick={() => router.push('/dashboard/admin/projects')}>
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
              <InputLabel id="assign-to-label">Assign to</InputLabel>
              <Select
                labelId="assign-to-label"
                value={currentTask?.assignee_id || ''}
                label="Assign to"
                onChange={(e) => {
                  setCurrentTask({
                    ...currentTask,
                    assignee_id: e.target.value, // Set the user ID
                    assignee_team: null,       // Clear the team field
                  });
                }}
              >
                <MenuItem value=""><em>Unassigned</em></MenuItem>
                {teamMembers.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
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
                  <MenuItem value="backlog">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BacklogIcon sx={{ color: '#E71D36', mr: 1 }} />Backlog
                    </Box>
                  </MenuItem>
                  <MenuItem value="in_progress">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <InProgressIcon sx={{ color: '#FF9F1C', mr: 1 }} />In Progress
                    </Box>
                  </MenuItem>
                  <MenuItem value="done">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DoneIcon sx={{ color: '#2EC4B6', mr: 1 }} />Done
                    </Box>
                  </MenuItem>
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
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose}
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