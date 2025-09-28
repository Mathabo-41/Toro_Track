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
  Folder as ProjectIcon, Person as PersonIcon, ViewList as ProjectListIcon, Dashboard as DashboardIcon
} from '@mui/icons-material';
import { Snackbar, Alert } from '@mui/material';

import { styles } from './styles';
import { useReports } from './useReports/page';

export default function PerformanceReports() {
  const {
    reports, projects, teamMembers, currentProject, currentProjectIndex, viewMode,
    menu, projectMenuAnchor, rolePermissions, loading, error, openTaskDialog,
    isEditing, openSnackbar, snackbarSeverity, snackbarMessage,
    handleProjectMenuClose, setOpenTaskDialog, handleNextProject, handlePreviousProject
  } = useReports();
  
  const router = useRouter();
  const supabase = createSupabaseClient();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };
  
  const getAssigneeName = (assigneeId) => {
      const member = teamMembers.find(m => m.id === assigneeId);
      return member ? member.name.charAt(0) : '?';
  };

  if (loading) {
      return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  if (error) {
      return <Box sx={{ p: 3 }}><Alert severity="error">{error}</Alert></Box>;
  }

  return (
    <Box sx={styles.mainContainer}>
       <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
          <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Link href="/dashboard" passHref><IconButton sx={{ color: 'green' }}><DashboardIcon /></IconButton></Link>
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

      <Box component="main" sx={styles.mainContent}>
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}><ReportsIcon sx={styles.headerIcon} />Performance Reports</Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>Analytics and insights for your CRM system</Typography>
        </Box>

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

        {currentProject && (
            <Card sx={{ mb: 4, boxShadow: 3, bgcolor:'#BDB76B' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, fontWeight: 'bold' }}>
                  <Typography variant="h6" sx={styles.chartTitle}><ProjectIcon sx={styles.headerIcon} />Project Task Board</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tabs value={viewMode}  sx={{ minHeight: '40px' }} >
                      <Tab value="kanban" label="Kanban" icon={<DashboardIcon />} iconPosition="start" sx={{ minHeight: '40px', py: 0 }} />
                      <Tab value="list" label="List" icon={<ProjectListIcon />} iconPosition="start" sx={{ minHeight: '40px', py: 0 }} />
                    </Tabs>
                    <Button variant="outlined"  startIcon={<ProjectIcon />} endIcon={<ArrowForwardIcon sx={{ transform: projectMenuAnchor ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />} sx={{ minWidth: '250px', justifyContent: 'space-between' , color: '#990c0cff', fontSize: "15px", fontWeight: "bold" }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {currentProject.name}
                      </Box>
                    </Button>
                    <Menu anchorEl={projectMenuAnchor} open={Boolean(projectMenuAnchor)} onClose={handleProjectMenuClose} PaperProps={{ style: { maxHeight: 300, width: '350px' } }}>
                      {projects.map((project, index) => (
                        <MenuItem key={project.id}  selected={index === currentProjectIndex} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Typography variant="body1" noWrap>{project.name}</Typography>
                            <Typography variant="caption" color="text.secondary" noWrap> tasks • {project.progress}% complete</Typography>
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

              {viewMode === 'kanban' ? (
                <Box sx={{ display: 'flex', overflowX: 'auto', padding: '1rem 0', backgroundColor: '#F0E68C', borderRadius: '8px', mt: 2 }}>
                  {Object.entries(currentProject.columns).map(([columnId, column]) => (
                    <Box key={columnId} sx={{flex: 1, minWidth: 300, padding: '1rem', borderRadius: '8px', backgroundColor: '#f8f9fa', borderTop: `4px solid #FF9F1C`, '&:not(:last-child)': {marginRight: '1rem'} }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{column.title}</Typography>
                        <Chip label={column.tasks?.length || 0} size="small" sx={{ ml: 'auto', backgroundColor: '#FF9F1C', color: 'white', fontWeight: 'bold' }} />
                        {rolePermissions[currentUser?.role]?.canAdd && column.id === 'backlog' && (
                          <Tooltip title="Add Task">
                            <IconButton size="small" sx={{ ml: 1 }} ><AddIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        )}
                      </Box>
                      {(column.tasks || []).map(task => (
                        <Box key={task.id} sx={{padding: '0.75rem', marginBottom: '0.75rem', borderRadius: '4px', backgroundColor: 'white', borderLeft: `4px solid #FF9F1C`, cursor: 'pointer'}} >
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>{task.title}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <PersonIcon fontSize="small" sx={{ mr: 0.5}}/>
                              <Typography variant="caption" sx={{color: '#757575'}}></Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                {columnId !== 'backlog' && <IconButton size="small" ><ArrowBackIcon fontSize="small" /></IconButton>}
                                {columnId !== 'done' && <IconButton size="small" sx={{ ml: 'auto' }} ><ArrowForwardIcon fontSize="small" /></IconButton>}
                            </Box>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              ) : (
                <p>List view goes here</p>
              )}
            </CardContent>
          </Card>
        )}
      </Box>

      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>{isEditing ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                  <TextField label="Task Title"  fullWidth required />
                  <FormControl fullWidth>
                      <InputLabel>Assignee</InputLabel>
                      <Select label="Assignee" >
                          {teamMembers.map(member => ( <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem> ))}
                      </Select>
                  </FormControl>
                  <TextField label="Description"  multiline rows={3} fullWidth />
                  <TextField label="Due Date" type="date"  InputLabelProps={{ shrink: true }} fullWidth />
              </Box>
          </DialogContent>
          <DialogActions>
              <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
              <Button  variant="contained">Save</Button>
          </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity={snackbarSeverity} sx={{ width: '100%', fontWeight: 'bold', fontSize: '1rem' }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}