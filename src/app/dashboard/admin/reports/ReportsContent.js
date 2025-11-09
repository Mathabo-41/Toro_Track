'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
import { useReports } from './useReports/useReports';

export default function PerformanceReports() {
  const router = useRouter();
  
  const {
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
    
    setCurrentTask,
    setCurrentColumn,
    
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

  // Date validation function
  const validateDueDate = (dueDate, creationDate = new Date()) => {
    if (!dueDate) return true; // No due date is valid
    const due = new Date(dueDate);
    const creation = new Date(creationDate);
    return due >= creation;
  };

  // Enhanced Kanban board styles with better colors
  const kanbanColumnStyles = (color) => ({
    flex: 1,
    minWidth: 300,
    padding: '1rem',
    borderRadius: '12px',
    backgroundColor: '#f8f9fa',
    borderTop: `5px solid ${color}`,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    '&:not(:last-child)': {
      marginRight: '1rem'
    }
  });

  const kanbanCardStyles = (color) => ({
    padding: '1rem',
    marginBottom: '0.75rem',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderLeft: `4px solid ${color}`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
      backgroundColor: '#fafafa'
    }
  });

  // Enhanced dialog styles
  const dialogStyles = {
    '& .MuiDialog-paper': {
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    },
    '& .MuiDialogTitle-root': {
      background: 'linear-gradient(135deg, #283618 0%, #606c38 100%)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.25rem',
      padding: '1.5rem 2rem',
    },
    '& .MuiDialogContent-root': {
      padding: '2rem',
    },
    '& .MuiDialogActions-root': {
      padding: '1rem 2rem 2rem',
      gap: '1rem',
    }
  };

  // Enhanced list view styles
  const listViewStyles = {
    '& .MuiTableContainer-root': {
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    },
    '& .MuiTableHead-root': {
      backgroundColor: '#283618',
      '& .MuiTableCell-head': {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1rem',
      }
    },
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root': {
        transition: 'background-color 0.2s ease',
        '&:nth-of-type(odd)': {
          backgroundColor: '#f8f9fa',
        },
        '&:hover': {
          backgroundColor: '#e9ecef',
        }
      },
      '& .MuiTableCell-body': {
        borderBottom: '1px solid #e0e0e0',
        padding: '1rem',
      }
    }
  };

  // Enhanced button styles
  const buttonStyles = {
    borderRadius: '8px',
    fontWeight: 'bold',
    textTransform: 'none',
    padding: '0.5rem 1.5rem',
    '&.MuiButton-contained': {
      background: 'linear-gradient(135deg, #283618 0%, #606c38 100%)',
      '&:hover': {
        background: 'linear-gradient(135deg, #1a2410 0%, #4a552a 100%)',
        boxShadow: '0 4px 12px rgba(40, 54, 24, 0.3)',
      }
    },
    '&.MuiButton-outlined': {
      borderColor: '#283618',
      color: '#283618',
      '&:hover': {
        backgroundColor: 'rgba(40, 54, 24, 0.04)',
        borderColor: '#1a2410',
      }
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading Reports..." />;
  }

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
        {/* App Bar */}
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
          display: { xs: 'none', md: 'flex' },
          p: 3
        }}>
          <Typography variant="h4" sx={styles.pageTitle}><ReportsIcon sx={styles.headerIcon} />Performance Reports</Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>Analytics and insights for your CRM system</Typography>
        </Box>

        {/* Content */}
        <Box sx={{ p: { xs: 2, md: 3 }, pt: { md: 0 } }}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {Object.entries(reports).map(([key, metric]) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={key}>
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
          <Card sx={{ mb: 4, boxShadow: 3, backgroundColor: '#F5F5DC' }}>
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
                    sx={{ 
                      minWidth: '250px', 
                      justifyContent: 'space-between', 
                      color: '#8B4513', 
                      fontSize: "15px", 
                      fontWeight: "bold",
                      borderColor: '#8B4513',
                      '&:hover': {
                        borderColor: '#654321',
                        backgroundColor: 'rgba(139, 69, 19, 0.04)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {currentProject?.name || 'No Project Selected'}
                    </Box>
                  </Button>
                  
                  <Menu 
                    anchorEl={projectMenuAnchor} 
                    open={Boolean(projectMenuAnchor)} 
                    onClose={handleProjectMenuClose} 
                    PaperProps={{ 
                      style: { 
                        maxHeight: 300, 
                        width: '350px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      } 
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
                          alignItems: 'center',
                          padding: '0.75rem 1rem',
                          '&:hover': {
                            backgroundColor: '#f0f0f0'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <Typography variant="body1" noWrap sx={{ fontWeight: 'medium' }}>{project.name}</Typography>
                          <Typography variant="caption" color="text.secondary" noWrap>{getTotalTasks(project)} tasks • {project.progress || 0}% complete</Typography>
                        </Box>
                        {index === currentProjectIndex && (<Chip label="Active" size="small" color="primary" />)}
                      </MenuItem>
                    ))}
                  </Menu>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton 
                      onClick={handlePreviousProject} 
                      disabled={currentProjectIndex === 0}
                      sx={{ 
                        color: '#283618',
                        '&:hover': { backgroundColor: 'rgba(40, 54, 24, 0.1)' }
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ mx: 1, fontWeight: 'medium' }}>{currentProjectIndex + 1} of {projects.length}</Typography>
                    <IconButton 
                      onClick={handleNextProject} 
                      disabled={currentProjectIndex === projects.length - 1}
                      sx={{ 
                        color: '#283618',
                        '&:hover': { backgroundColor: 'rgba(40, 54, 24, 0.1)' }
                      }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              {/* Project Description */}
              {currentProject && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#5D4037', fontWeight: 'bold', fontStyle: 'italic' }}>
                    {currentProject?.description || 'No description available.'}
                  </Typography>
                </Box>
              )}

              {currentProject && viewMode === 'kanban' ? (
                <Box sx={{ display: 'flex', overflowX: 'auto', padding: '1rem 0', backgroundColor: '#FFF8DC', borderRadius: '12px', mt: 2 }}>
                  {Object.entries(currentProject.columns || {}).map(([columnId, column]) => (
                    <Box key={columnId} sx={kanbanColumnStyles(getColumnColor(columnId))}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ color: getColumnColor(columnId), mr: 1 }}>
                          {getColumnIcon(columnId)}
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2F4F4F' }}>{column?.title || columnId}</Typography>
                        <Chip 
                          label={column?.tasks?.length || 0} 
                          size="small" 
                          sx={{ 
                            ml: 'auto', 
                            backgroundColor: getColumnColor(columnId), 
                            color: 'white', 
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }} 
                        />
                        {columnId === 'backlog' && (
                          <Tooltip title="Add Task to Backlog">
                            <IconButton 
                              size="small" 
                              sx={{ 
                                ml: 1,
                                color: getColumnColor(columnId),
                                '&:hover': {
                                  backgroundColor: 'rgba(0,0,0,0.1)'
                                }
                              }} 
                              onClick={() => handleAddTaskClick(columnId)}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                      {(column?.tasks || []).map(task => (
                        <Box key={task.id} sx={kanbanCardStyles(getColumnColor(columnId))} onClick={() => handleEditTaskClick(task, columnId)}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ fontWeight: '600', color: '#2F4F4F' }}>{task.title}</Typography>
                            <IconButton 
                              size="small" 
                              onClick={(e) => { e.stopPropagation(); handleDeleteTaskClick(task.id); }}
                              sx={{
                                color: '#d32f2f',
                                '&:hover': {
                                  backgroundColor: 'rgba(211, 47, 47, 0.1)'
                                }
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <PersonIcon fontSize="small" sx={{ color: getAssigneeColor(task.assignee_id), mr: 0.5 }} />
                            <Typography variant="caption" sx={{ color: '#5D4037', fontWeight: 'medium' }}>
                              {getAssigneeName(task)} 
                            </Typography>
                            <Chip 
                              label={getAssigneeRole(task)} 
                              size="small" 
                              sx={{ 
                                ml: 1, 
                                fontSize: '0.6rem', 
                                height: '20px', 
                                backgroundColor: getAssigneeColor(task.assignee_id), 
                                color: 'white',
                                fontWeight: 'bold'
                              }} 
                              icon={<RoleIcon fontSize="small" sx={{ color: 'white' }} />}
                            />
                          </Box>

                          {task.due_date && (
                            <Typography variant="caption" sx={{ 
                              color: '#5D4037', 
                              display: 'block', 
                              mt: 0.5,
                              fontWeight: 'medium'
                            }}>
                              Due: {new Date(task.due_date).toLocaleDateString("en-GB")}
                            </Typography>
                          )}
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            {columnId !== 'backlog' && (
                              <Tooltip title={`Move to ${columnId === 'in_progress' ? 'Backlog' : 'In Progress'}`}>
                                <IconButton 
                                  size="small" 
                                  onClick={(e) => { e.stopPropagation(); moveTask(task.id, columnId, columnId === 'in_progress' ? 'backlog' : 'in_progress'); }}
                                  sx={{
                                    color: getColumnColor(columnId),
                                    '&:hover': {
                                      backgroundColor: 'rgba(0,0,0,0.1)'
                                    }
                                  }}
                                >
                                  <ArrowBackIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {columnId !== 'done' && (
                              <Tooltip title={`Move to ${columnId === 'backlog' ? 'In Progress' : 'Done'}`}>
                                <IconButton 
                                  size="small" 
                                  sx={{ 
                                    ml: 'auto',
                                    color: getColumnColor(columnId),
                                    '&:hover': {
                                      backgroundColor: 'rgba(0,0,0,0.1)'
                                    }
                                  }} 
                                  onClick={(e) => { e.stopPropagation(); moveTask(task.id, columnId, columnId === 'backlog' ? 'in_progress' : 'done'); }}
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
              ) : currentProject && viewMode === 'list' ? (
                <TableContainer component={Paper} sx={{ mt: 2, ...listViewStyles }}>
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
                          <TableRow key={task.id} hover>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: '600', color: '#2F4F4F' }}>{task.title}</Typography>
                              {task.description && (
                                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                  {task.description}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ 
                                  width: 32, 
                                  height: 32, 
                                  mr: 1, 
                                  backgroundColor: getAssigneeColor(task.assignee_id), 
                                  fontSize: '0.8rem',
                                  fontWeight: 'bold',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                  {getAssigneeName(task)?.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                    {getAssigneeName(task)}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {getAssigneeRole(task)}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={column?.title || 'Unknown'} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: getColumnColor(columnId), 
                                  color: 'white',
                                  fontWeight: 'bold',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }} 
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ 
                                fontWeight: 'medium',
                                color: task.due_date ? '#2F4F4F' : 'text.secondary'
                              }}>
                                {task.due_date ? new Date(task.due_date).toLocaleDateString("en-GB") : 'No due date'}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <IconButton 
                                size="small" 
                                onClick={() => handleEditTaskClick(task, columnId)}
                                sx={{
                                  color: '#1976d2',
                                  '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.1)'
                                  }
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                onClick={() => handleDeleteTaskClick(task.id)}
                                sx={{
                                  color: '#d32f2f',
                                  '&:hover': {
                                    backgroundColor: 'rgba(211, 47, 47, 0.1)'
                                  }
                                }}
                              >
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
          <Card sx={{ 
            mb: 4, 
            boxShadow: 3, 
            p: 4, 
            textAlign: 'center',
            backgroundColor: '#F5F5DC',
            borderRadius: '12px'
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#2F4F4F' }}>No Projects Found</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              There are no projects in the database yet. Create your first project to get started.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => router.push('/dashboard/admin/projects')}
              sx={buttonStyles}
            >
              Create First Project
            </Button>
          </Card>
        )}

        {/* Data Export Section */}
        <Card sx={{ 
          mb: 4, 
          boxShadow: 3,
          backgroundColor: '#F5F5DC',
          borderRadius: '12px'
        }}>
          <CardContent>
            <Typography variant="h6" sx={styles.chartTitle}>Export Reports</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {['CSV', 'Excel', 'PDF'].map((format) => (
                <Button 
                  key={format} 
                  variant="outlined" 
                  sx={{
                    ...styles.exportButton,
                    ...buttonStyles
                  }}
                >
                  Download {format}
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Enhanced Task Dialog */}
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} fullWidth maxWidth="sm" sx={dialogStyles}>
        <DialogTitle>{isEditing ? 'Edit Task' : 'Add New Task to Backlog'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <TextField 
              label="Task Title" 
              value={currentTask?.title || ''}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              fullWidth 
              required 
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
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
                    assignee_id: e.target.value,
                    assignee_team: null,
                  });
                }}
                sx={{
                  borderRadius: '8px',
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
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
            <TextField 
              label="Due Date" 
              type="date" 
              value={currentTask?.dueDate || ''}
              onChange={(e) => {
                const dueDate = e.target.value;
                if (validateDueDate(dueDate)) {
                  setCurrentTask({ ...currentTask, dueDate });
                } else {
                  // Show error or prevent setting invalid date
                  handleSnackbarClose(); // Close any existing snackbar
                  // You could set an error state here or show a validation message
                }
              }}
              InputLabelProps={{ shrink: true }} 
              fullWidth 
              variant="outlined"
              error={currentTask?.dueDate && !validateDueDate(currentTask.dueDate)}
              helperText={currentTask?.dueDate && !validateDueDate(currentTask.dueDate) ? "Due date cannot be before creation date" : ""}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
            {isEditing && (
              <FormControl fullWidth sx={dialogStyles.select}>
                <InputLabel>Status</InputLabel>
                <Select 
                  value={currentColumn} 
                  onChange={(e) => setCurrentColumn(e.target.value)} 
                  label="Status"
                  sx={{
                    borderRadius: '8px',
                  }}
                >
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
          <Button 
            onClick={() => setOpenTaskDialog(false)}
            sx={buttonStyles}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveTask} 
            variant="contained"
            disabled={currentTask?.dueDate && !validateDueDate(currentTask.dueDate)}
            sx={buttonStyles}
          >
            Save
          </Button>
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
            borderRadius: '8px',
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