// This file contains the content and UI for the admin's project management screen.
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Card, CardContent, Stack, Avatar, List, ListItem, ListItemButton, ListItemText, Drawer,
  TextField, InputAdornment, Chip, IconButton, Grid, Menu, Divider, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, FormControl, InputLabel, Select, Checkbox, Popover, Snackbar, Alert,
  Slider, LinearProgress
} from '@mui/material';
import {
  Add as AddIcon, Search as SearchIcon, Assignment as ProjectIcon, DateRange as TimelineIcon,
  MoreVert as MoreVertIcon, CheckCircle as CompleteIcon, Pending as PendingIcon, Edit as EditIcon,
  Delete as DeleteIcon, Close as CloseIcon, Logout as LogoutIcon, People as PeopleIcon,
  Dashboard as DashboardIcon, TrendingUp as ProgressIcon
} from '@mui/icons-material';

import { useProjects } from './useProjects/page';
import { styles } from './styles';

// ----------------------------
// Constants
// ----------------------------
const PROJECT_STATUSES = ['not started', 'pending', 'active', 'inprogress', 'on_hold', 'completed', 'cancelled'];

const formatStatus = (status) => {
  if (!status) return '';
  return status.split(/[\s_]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Sidebar menu items
const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

// ----------------------------
// Main Component
// ----------------------------
export default function ProjectsContent() {
  const supabase = createSupabaseClient();
  const router = useRouter();

  // ----------------------------
  // Custom hook for projects state
  // ----------------------------
  const {
    projects,
    clients,
    searchTerm,
    setSearchTerm,
    openCreateDialog,
    setOpenCreateDialog,
    newProject,
    anchorEl,
    selectedProject,
    filteredProjects,
    handleMenuOpen,
    handleMenuClose,
    handleDeleteProject,
    handleStatusChange,
    handleCreateProject,
    handleInputChange,
    updateProject,
    teamMembers,
    handleTeamChange,
    handleProgressChange
  } = useProjects();

  // ----------------------------
  // Local state
  // ----------------------------
  const [currentUser, setCurrentUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [teamAnchorEl, setTeamAnchorEl] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [openProgressDialog, setOpenProgressDialog] = useState(false);
  const [progressProject, setProgressProject] = useState(null);
  const [progressValue, setProgressValue] = useState(0);

  // ----------------------------
  // Fetch current user
  // ----------------------------
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  // ----------------------------
  // Helper functions
  // ----------------------------
  const getSafeProgress = (progress) => {
    return Number(progress) || 0;
  };

  const getProgressColor = (progress) => {
    const safeProgress = getSafeProgress(progress);
    if (safeProgress >= 90) return '#4caf50';
    if (safeProgress >= 70) return '#8bc34a';
    if (safeProgress >= 50) return '#ffc107';
    if (safeProgress >= 30) return '#ff9800';
    return '#f44336';
  };

  // ----------------------------
  // Snackbar helper
  // ----------------------------
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // ----------------------------
  // Logout function
  // ----------------------------
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // ----------------------------
  // Team popover functions
  // ----------------------------
  const handleTeamClick = (event, team) => {
    setTeamAnchorEl(event.currentTarget);
    setSelectedTeam(team);
  };

  const handleTeamClose = () => {
    setTeamAnchorEl(null);
    setSelectedTeam([]);
  };

  const teamOpen = Boolean(teamAnchorEl);

  // ----------------------------
  // Progress dialog functions
  // ----------------------------
  const handleOpenProgressDialog = (projectId) => {
    const projectToUpdate = projects.find(p => p.id === projectId);
    if (projectToUpdate) {
      setProgressProject(projectToUpdate);
      setProgressValue(getSafeProgress(projectToUpdate.progress));
      setOpenProgressDialog(true);
    }
    handleMenuClose();
  };

  const handleProgressSliderChange = (event, newValue) => {
    setProgressValue(newValue);
  };

  const handleSaveProgress = async () => {
    if (progressProject) {
      await handleProgressChange(progressProject.id, progressValue);
      showSnackbar(`Project progress updated to ${progressValue}%`, 'success');
      setOpenProgressDialog(false);
      setProgressProject(null);
      setProgressValue(0);
    }
  };

  // ----------------------------
  // Create project with validation
  // ----------------------------
  const handleCreateProjectWithValidation = async () => {
    if (!newProject.name || !newProject.client || !newProject.status || !newProject.dueDate) {
      showSnackbar('Please fill all required fields!', 'error');
      return;
    }
    await handleCreateProject();
    showSnackbar('Project created successfully!');
    setOpenCreateDialog(false);
  };

  // ----------------------------
  // Edit project dialog functions
  // ----------------------------
  const handleOpenEditDialog = (projectId) => {
    const projectToEdit = projects.find(p => p.id === projectId);
    if (projectToEdit) {
      setEditProject({
        ...projectToEdit,
        team: projectToEdit.team || []
      });
      setOpenEditDialog(true);
    }
    handleMenuClose();
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProject(prev => ({ ...prev, [name]: value }));
  };

  const handleEditTeamChange = (event) => {
    const { value } = event.target;
    setEditProject(prev => ({ ...prev, team: value }));
  };

  const handleSaveEdit = async () => {
    if (!editProject.name || !editProject.client || !editProject.status || !editProject.dueDate) {
      showSnackbar('Please fill all required fields!', 'error');
      return;
    }
    await updateProject(editProject);
    showSnackbar('Project updated successfully!', 'success');
    setOpenEditDialog(false);
    setEditProject(null);
  };

  // ----------------------------
  // Delete project with notification
  // ----------------------------
  const handleDeleteProjectWithNotification = async () => {
    await handleDeleteProject();
    showSnackbar('Project deleted successfully!');
    handleMenuClose();
  };

  // ----------------------------
  // Change project status
  // ----------------------------
  const handleStatusChangeWithNotification = async (projectId, status) => {
    await handleStatusChange(projectId, status);
    showSnackbar(`Project status changed to ${formatStatus(status)}`, 'info');
    handleMenuClose();
  };

  return (
    <Box sx={styles.container}>
      {/* ===========================
          Sidebar
      ============================ */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebar}>
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard" passHref>
            <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
              <DashboardIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" sx={{ color: '#fefae0'}}>Admin Portal</Typography>
        </Box>
        <List>
          {adminMenu.map(item => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path} 
                sx={styles.sidebarListItemButton(item.name)}
                onClick={() => setActiveCategory(item.name)}
              >
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

      {/* ===========================
          Main Content
      ============================ */}
      <Box component="main" sx={styles.mainContent}>
        {/* Header with search and create button */}
        <Box sx={styles.header}>
          <Typography variant="h4" sx={styles.title}>
            <ProjectIcon sx={styles.titleIcon} /> Projects
          </Typography>
          <Stack direction="row" spacing={2} sx={styles.searchStack}>
            <TextField
              size="small"
              placeholder="Search by name or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={styles.searchIcon} /></InputAdornment>,
                sx: styles.searchField
              }}
            />
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpenCreateDialog(true)} sx={styles.newProjectButton}>
              New Project
            </Button>
          </Stack>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={styles.statsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>Active Projects</Typography>
                    <Typography variant="h4" sx={styles.statsTypography('#4fc3f7')}>
                      {projects.filter(p => p.status === 'active').length}
                    </Typography>
                  </Box>
                  <Avatar sx={styles.statsCardIcon('blue')}>
                    <ProjectIcon color="info" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={styles.statsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>Completed Projects</Typography>
                    <Typography variant="h4" sx={styles.statsTypography('#81c784')}>
                      {projects.filter(p => p.status === 'completed').length}
                    </Typography>
                  </Box>
                  <Avatar sx={styles.statsCardIcon('green')}>
                    <CompleteIcon color="success" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={styles.statsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>Total Projects</Typography>
                    <Typography variant="h4" sx={styles.statsTypography('#f3722c')}>
                      {projects.length}
                    </Typography>
                  </Box>
                  <Avatar sx={styles.statsCardIcon('orange')}>
                    <ProjectIcon color="primary" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={styles.statsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>Avg Progress</Typography>
                    <Typography variant="h4" sx={styles.statsTypography('#9c27b0')}>
                      {projects.length > 0 
                        ? Math.round(projects.reduce((sum, p) => sum + getSafeProgress(p.progress), 0) / projects.length) 
                        : 0}%
                    </Typography>
                  </Box>
                  <Avatar sx={styles.statsCardIcon('purple')}>
                    <ProgressIcon color="secondary" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Projects Table */}
        <Card sx={styles.projectsCard}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#525252', mb: 2, fontWeight: 500 }}>
              All Projects ({filteredProjects.length})
            </Typography>
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCell}>Project</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Client</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Status</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Due Date</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Progress</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Team</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProjects.map(project => {
                    const safeProgress = getSafeProgress(project.progress);
                    return (
                      <TableRow key={project.id} hover sx={styles.tableRowHover}>
                        <TableCell sx={styles.tableCell}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <ProjectIcon sx={{ color: '#f3722c' }} />
                            <Typography sx={{ fontWeight: '500' }}>{project.name}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={styles.tableCell}>
                          <Typography sx={{ fontWeight: '500' }}>{project.client}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={formatStatus(project.status)} sx={styles.chip(project.status)} />
                        </TableCell>
                        <TableCell sx={styles.tableCell}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <TimelineIcon fontSize="small" sx={{ color: '#f3722c' }} />
                            <Typography sx={{ fontWeight: '500' }}>{project.dueDate}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={styles.tableCell}>
                          <Stack spacing={1} sx={{ minWidth: 120 }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {safeProgress === 100 ? (
                                <CompleteIcon color="success" />
                              ) : (
                                <PendingIcon color={safeProgress > 50 ? 'warning' : 'error'} />
                              )}
                              <Typography sx={{ fontWeight: '500', minWidth: '40px' }}>{safeProgress}%</Typography>
                            </Stack>
                            <LinearProgress 
                              variant="determinate" 
                              value={safeProgress} 
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#e0e0e0',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: getProgressColor(safeProgress),
                                  borderRadius: 4
                                }
                              }}
                            />
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack 
                            direction="row" 
                            spacing={0.5}
                            onClick={(e) => handleTeamClick(e, project.team)}
                            sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                          >
                            {(project.team || []).map((member, i) => (
                              <Avatar key={i} sx={styles.teamAvatar}>
                                {member}
                              </Avatar>
                            ))}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <IconButton sx={styles.actionIconButton} onClick={(e) => handleMenuOpen(e, project.id)}>
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* ===========================
          Edit Project Dialog
      ============================ */}
      <Dialog 
        open={openEditDialog && !!editProject} 
        onClose={() => setOpenEditDialog(false)} 
        fullWidth 
        maxWidth="md"
        PaperProps={{ 
          sx: { 
            borderRadius: 3,
            background: 'linear-gradient(145deg, #fefae0 0%, #faedcd 100%)',
            border: '2px solid #6b705c',
            minHeight: '600px'
          } 
        }}
      >
        <DialogTitle 
          sx={{ 
            background: 'linear-gradient(45deg, #6b705c 30%, #8a9175 90%)',
            color: '#fefae0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 3,
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }}
        >
          Update Project Details
          <IconButton 
            onClick={() => setOpenEditDialog(false)}
            sx={{ color: '#fefae0' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 4, px: 3 }}>
          {editProject && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <TextField 
                    fullWidth 
                    label="Project Name" 
                    name="name" 
                    value={editProject.name} 
                    onChange={handleEditInputChange} 
                    required
                    sx={styles.dialogTextField}
                    InputProps={{ sx: { fontSize: '1rem' } }}
                    InputLabelProps={{ sx: { fontSize: '1rem' } }}
                  />
                  <FormControl fullWidth required>
                    <InputLabel sx={{ ...styles.dialogLabel, fontSize: '1rem' }}>Client</InputLabel>
                    <Select 
                      name="client" 
                      value={editProject.client} 
                      onChange={handleEditInputChange}
                      sx={styles.dialogSelect}
                      MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                    >
                      {clients.map(client => (
                        <MenuItem key={client.id} value={client.client_name} sx={styles.dialogMenuItem}>
                          <Typography sx={{ fontSize: '1rem' }}>{client.client_name}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth required>
                    <InputLabel sx={{ ...styles.dialogLabel, fontSize: '1rem' }}>Status</InputLabel>
                    <Select 
                      name="status" 
                      value={editProject.status} 
                      onChange={handleEditInputChange}
                      sx={styles.dialogSelect}
                    >
                      {PROJECT_STATUSES.map(status => (
                        <MenuItem key={status} value={status} sx={styles.dialogMenuItem}>
                          <Typography sx={{ fontSize: '1rem' }}>{formatStatus(status)}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField 
                    fullWidth 
                    type="date" 
                    label="Due Date" 
                    name="dueDate" 
                    InputLabelProps={{ shrink: true, sx: { fontSize: '1rem' } }} 
                    value={editProject.dueDate} 
                    onChange={handleEditInputChange} 
                    required
                    sx={styles.dialogTextField}
                    InputProps={{ sx: { fontSize: '1rem' } }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#283618', mb: 2, fontSize: '1.1rem' }}>
                      Current Progress: {getSafeProgress(editProject.progress)}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={getSafeProgress(editProject.progress)} 
                      sx={{
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: '#e0e0e0',
                        mb: 2,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getProgressColor(getSafeProgress(editProject.progress)),
                          borderRadius: 6
                        }
                      }}
                    />
                    <Button 
                      variant="outlined" 
                      startIcon={<ProgressIcon />}
                      onClick={() => handleOpenProgressDialog(editProject.id)}
                      sx={{ 
                        borderColor: '#f3722c', 
                        color: '#f3722c',
                        '&:hover': {
                          backgroundColor: '#f3722c',
                          color: '#fefae0'
                        }
                      }}
                    >
                      Update Progress
                    </Button>
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel sx={{ ...styles.dialogLabel, fontSize: '1rem' }}>Team Members</InputLabel>
                    <Select
                      multiple
                      name="team"
                      value={editProject.team || []}
                      onChange={handleEditTeamChange}
                      label="Team Members"
                      renderValue={(selected) => (
                        <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                          {selected.map(member => (
                            <Avatar key={member} sx={styles.teamAvatar}>
                              {member}
                            </Avatar>
                          ))}
                        </Stack>
                      )}
                      sx={styles.dialogSelect}
                      MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                    >
                      {teamMembers.map(member => (
                        <MenuItem key={member.id} value={member.initials} sx={styles.dialogMenuItem}>
                          <Checkbox checked={(editProject.team || []).indexOf(member.initials) > -1} />
                          <ListItemText 
                            primary={member.name} 
                            sx={{ color: '#283618', '& .MuiTypography-root': { fontSize: '1rem' } }} 
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
          <Button 
            onClick={() => setOpenEditDialog(false)}
            sx={styles.dialogCancelButton}
            size="large"
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveEdit}
            sx={styles.dialogConfirmButton}
            size="large"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===========================
          Create Project Dialog
      ============================ */}
      <Dialog 
        open={openCreateDialog} 
        onClose={() => setOpenCreateDialog(false)} 
        fullWidth 
        maxWidth="md"
        PaperProps={{ 
          sx: { 
            borderRadius: 3,
            background: 'linear-gradient(145deg, #fefae0 0%, #faedcd 100%)',
            border: '2px solid #6b705c',
            minHeight: '500px'
          } 
        }}
      >
        <DialogTitle 
          sx={{ 
            background: 'linear-gradient(45deg, #6b705c 30%, #8a9175 90%)',
            color: '#fefae0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 3,
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }}
        >
          Create New Project
          <IconButton 
            onClick={() => setOpenCreateDialog(false)}
            sx={{ color: '#fefae0' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 4, px: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField 
                  fullWidth 
                  label="Project Name" 
                  name="name" 
                  value={newProject.name} 
                  onChange={handleInputChange} 
                  required
                  sx={styles.dialogTextField}
                  InputProps={{ sx: { fontSize: '1rem' } }}
                  InputLabelProps={{ sx: { fontSize: '1rem' } }}
                  placeholder="Enter project name"
                />
                <FormControl fullWidth required>
                  <InputLabel sx={{ ...styles.dialogLabel, fontSize: '1rem' }}>Client</InputLabel>
                  <Select 
                    name="client" 
                    value={newProject.client} 
                    onChange={handleInputChange}
                    sx={styles.dialogSelect}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                  >
                    {clients.map(client => (
                      <MenuItem key={client.id} value={client.client_name} sx={styles.dialogMenuItem}>
                        <Typography sx={{ fontSize: '1rem' }}>{client.client_name}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel sx={{ ...styles.dialogLabel, fontSize: '1rem' }}>Status</InputLabel>
                  <Select 
                    name="status" 
                    value={newProject.status} 
                    onChange={handleInputChange}
                    sx={styles.dialogSelect}
                  >
                    {PROJECT_STATUSES.map(status => (
                      <MenuItem key={status} value={status} sx={styles.dialogMenuItem}>
                        <Typography sx={{ fontSize: '1rem' }}>{formatStatus(status)}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField 
                  fullWidth 
                  type="date" 
                  label="Due Date" 
                  name="dueDate" 
                  InputLabelProps={{ shrink: true, sx: { fontSize: '1rem' } }} 
                  value={newProject.dueDate} 
                  onChange={handleInputChange} 
                  required
                  sx={styles.dialogTextField}
                  InputProps={{ sx: { fontSize: '1rem' } }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h6" sx={{ color: '#283618', mb: 2, fontSize: '1.1rem' }}>
                    Initial Progress: 0%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={0} 
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: '#e0e0e0',
                      mb: 2
                    }}
                  />
                  <Typography variant="body2" sx={{ color: '#6b705c', fontStyle: 'italic' }}>
                    Progress can be updated after project creation
                  </Typography>
                </Box>
                <FormControl fullWidth>
                  <InputLabel sx={{ ...styles.dialogLabel, fontSize: '1rem' }}>Team Members</InputLabel>
                  <Select
                    multiple
                    value={newProject.team || []}
                    onChange={handleTeamChange}
                    label="Team Members"
                    renderValue={(selected) => (
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                        {selected.map(member => (
                          <Avatar key={member} sx={styles.teamAvatar}>
                            {member}
                          </Avatar>
                        ))}
                      </Stack>
                    )}
                    sx={styles.dialogSelect}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                  >
                    {teamMembers.map(member => (
                      <MenuItem key={member.id} value={member.initials} sx={styles.dialogMenuItem}>
                        <Checkbox checked={(newProject.team || []).indexOf(member.initials) > -1} />
                        <ListItemText 
                          primary={member.name} 
                          sx={{ color: '#283618', '& .MuiTypography-root': { fontSize: '1rem' } }} 
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
          <Button 
            onClick={() => setOpenCreateDialog(false)}
            sx={styles.dialogCancelButton}
            size="large"
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleCreateProjectWithValidation}
            sx={styles.dialogConfirmButton}
            size="large"
          >
            Create Project
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===========================
          Progress Update Dialog
      ============================ */}
      <Dialog 
        open={openProgressDialog && !!progressProject} 
        onClose={() => setOpenProgressDialog(false)} 
        fullWidth 
        maxWidth="sm"
        PaperProps={{ 
          sx: { 
            borderRadius: 3,
            background: 'linear-gradient(145deg, #fefae0 0%, #faedcd 100%)',
            border: '2px solid #6b705c'
          } 
        }}
      >
        <DialogTitle 
          sx={{ 
            background: 'linear-gradient(45deg, #6b705c 30%, #8a9175 90%)',
            color: '#fefae0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 3,
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }}
        >
          Update Project Progress
          <IconButton 
            onClick={() => setOpenProgressDialog(false)}
            sx={{ color: '#fefae0' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 4, px: 3 }}>
          {progressProject && (
            <Stack spacing={4}>
              <Box>
                <Typography variant="h6" sx={{ color: '#283618', mb: 1, fontSize: '1.1rem' }}>
                  {progressProject.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b705c' }}>
                  Client: {progressProject.client}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h5" sx={{ 
                  color: getProgressColor(progressValue), 
                  textAlign: 'center', 
                  mb: 2,
                  fontWeight: 'bold',
                  fontSize: '2.5rem'
                }}>
                  {progressValue}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={progressValue} 
                  sx={{
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: '#e0e0e0',
                    mb: 3,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getProgressColor(progressValue),
                      borderRadius: 8
                    }
                  }}
                />
                <Slider
                  value={progressValue}
                  onChange={handleProgressSliderChange}
                  aria-labelledby="progress-slider"
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                  sx={{
                    color: getProgressColor(progressValue),
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: getProgressColor(progressValue),
                      color: '#fefae0',
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                {[0, 25, 50, 75, 100].map(value => (
                  <Button
                    key={value}
                    variant={progressValue === value ? "contained" : "outlined"}
                    onClick={() => setProgressValue(value)}
                    sx={{
                      minWidth: '60px',
                      backgroundColor: progressValue === value ? getProgressColor(value) : 'transparent',
                      color: progressValue === value ? '#fefae0' : getProgressColor(value),
                      borderColor: getProgressColor(value),
                      '&:hover': {
                        backgroundColor: getProgressColor(value),
                        color: '#fefae0'
                      }
                    }}
                  >
                    {value}%
                  </Button>
                ))}
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
          <Button 
            onClick={() => setOpenProgressDialog(false)}
            sx={styles.dialogCancelButton}
            size="large"
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveProgress}
            sx={{
              background: `linear-gradient(45deg, ${getProgressColor(progressValue)} 30%, ${getProgressColor(progressValue)}80 90%)`,
              color: '#fefae0',
              fontWeight: 'bold',
              '&:hover': {
                background: `linear-gradient(45deg, ${getProgressColor(progressValue)}80 30%, ${getProgressColor(progressValue)} 90%)`,
              }
            }}
            size="large"
          >
            Update Progress
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===========================
          Team Members Popover
      ============================ */}
      <Popover
        open={teamOpen}
        anchorEl={teamAnchorEl}
        onClose={handleTeamClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{ sx: { p: 2, minWidth: 200, backgroundColor: '#fefae0', color: '#283618', borderRadius: 2 } }}
      >
        <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <PeopleIcon /> Team Members
        </Typography>
        <Stack spacing={1}>
          {selectedTeam.map((member, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={styles.teamAvatar}>{member}</Avatar>
              <Typography variant="body2">
                {teamMembers.find(tm => tm.initials === member)?.name || `User ${member}`}
              </Typography>
            </Box>
          ))}
          {selectedTeam.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No team members assigned
            </Typography>
          )}
        </Stack>
      </Popover>

      {/* ===========================
          Project Actions Menu
      ============================ */}
      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleMenuClose} 
        PaperProps={{ 
          sx: { 
            p: 1, 
            minWidth: 220,
            borderRadius: 2,
            background: 'linear-gradient(145deg, #fefae0 0%, #faedcd 100%)',
            border: '2px solid #6b705c'
          } 
        }}
      >
        <MenuItem onClick={() => handleOpenEditDialog(selectedProject)} sx={styles.menuItem}>
          <EditIcon sx={{ mr: 1, color: '#2196f3' }} /> Edit Project
        </MenuItem>
        <MenuItem onClick={() => handleOpenProgressDialog(selectedProject)} sx={styles.menuItem}>
          <ProgressIcon sx={{ mr: 1, color: '#9c27b0' }} /> Update Progress
        </MenuItem>
        <MenuItem onClick={handleDeleteProjectWithNotification} sx={styles.menuItem}>
          <DeleteIcon sx={{ mr: 1, color: '#f44336' }} /> Delete Project
        </MenuItem>
        <Divider sx={{ my: 1, borderColor: '#6b705c' }} />
        <Typography variant="caption" sx={{ px: 2, py: 1, color: '#6b705c', fontWeight: 'bold' }}>
          Change Status:
        </Typography>
        {PROJECT_STATUSES.map(status => (
          <MenuItem 
            key={status} 
            onClick={() => handleStatusChangeWithNotification(selectedProject, status)}
            sx={styles.menuItem}
          >
            <Chip 
              label={formatStatus(status)} 
              size="small" 
              sx={{ 
                backgroundColor: '#eee', 
                mr: 1,
                color: '#333',
                fontWeight: '500',
                fontSize: '0.75rem'
              }} 
            />
          </MenuItem>
        ))}
      </Menu>

      {/* ===========================
          Snackbar Notifications
      ============================ */}
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
            fontSize: '1rem',
            borderRadius: 2,
            border: '1px solid #6b705c'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}