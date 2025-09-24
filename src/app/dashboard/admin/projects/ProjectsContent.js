// This file contains the content and UI for the admin's project management screen.
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Card, CardContent, Stack, Avatar, List, ListItem, ListItemButton, ListItemText, Drawer,
  TextField, InputAdornment, Chip, IconButton, Grid, Menu, Divider, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, FormControl, InputLabel, Select, Checkbox, Popover
} from '@mui/material';
import {
  Add as AddIcon, Search as SearchIcon, Assignment as ProjectIcon, DateRange as TimelineIcon,
  MoreVert as MoreVertIcon, CheckCircle as CompleteIcon, Pending as PendingIcon, Edit as EditIcon,
  Delete as DeleteIcon, Close as CloseIcon, AdminPanelSettings as AdminIcon,
  VerifiedUser as AuditorIcon, Person as ClientIcon, Logout as LogoutIcon, People as PeopleIcon
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Snackbar, Alert } from '@mui/material';

import { useProjects } from './useProjects/page';
import { styles } from './styles';

export const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

const PROJECT_STATUSES = [
  'not started', 'pending', 'active', 'inprogress', 'on_hold', 'completed', 'cancelled'
];

const formatStatus = (status) => {
  if (!status) return '';
  return status.split(/[\s_]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function ProjectsContent() {
  const {
    projects, searchTerm, setSearchTerm, openCreateDialog, setOpenCreateDialog, newProject,
    anchorEl, selectedProject, teamMembers, filteredProjects, handleMenuOpen, handleMenuClose,
    handleDeleteProject, handleStatusChange, handleCreateProject, handleInputChange, handleTeamChange,
    updateProject
  } = useProjects();
  
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [teamAnchorEl, setTeamAnchorEl] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProject, setEditProject] = useState(null);

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

  const handleTeamClick = (event, team) => {
    setTeamAnchorEl(event.currentTarget);
    setSelectedTeam(team);
  };

  const handleTeamClose = () => {
    setTeamAnchorEl(null);
    setSelectedTeam([]);
  };

  const teamOpen = Boolean(teamAnchorEl);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCreateProjectWithNotification = async () => {
    await handleCreateProject();
    showSnackbar('Project created successfully!');
    setOpenCreateDialog(false);
  };
     
  const handleDeleteProjectWithNotification = async () => {
    await handleDeleteProject();
    showSnackbar('Project deleted successfully!');
    handleMenuClose();
  };

  const handleStatusChangeWithNotification = async (projectId, status) => {
    await handleStatusChange(projectId, status);
    showSnackbar(`Project status changed to ${formatStatus(status)}`, 'info');
    handleMenuClose();
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (editProject) {
      await updateProject(editProject);
      showSnackbar("Project updated successfully!", "success");
    }
    setOpenEditDialog(false);
    setEditProject(null);
  };  

  return (
    <Box sx={styles.container}>
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
          {adminMenu.map((item, index) => (
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
        <Box sx={styles.header}>
          <Typography variant="h4" sx={styles.title}><ProjectIcon sx={styles.titleIcon} />Projects</Typography>
          <Stack direction="row" spacing={2} sx={styles.searchStack}>
            <TextField
              size="small"
              placeholder="Search by name or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon sx={styles.searchIcon} /></InputAdornment>), sx: styles.searchField }}
            />
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpenCreateDialog(true)} sx={styles.newProjectButton}>New Project</Button>
          </Stack>
        </Box>

        <Dialog open={openEditDialog && Boolean(editProject)} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm" PaperProps={{ sx: styles.createDialogPaper }}>
            <DialogTitle sx={styles.createDialogTitle}>
                <Typography component="span" variant="h6">Edit Project</Typography>
                <IconButton onClick={() => setOpenEditDialog(false)}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent sx={{ ...styles.dialogContent, mt: 3, px: 3, overflow: 'visible' }}>
                {editProject ? (
                    <Stack spacing={3}>
                        <TextField fullWidth label="Project Name" name="name" value={editProject.name || ""} onChange={handleEditInputChange} sx={styles.dialogTextField} InputLabelProps={{ shrink: true }} />
                        <TextField fullWidth label="Client" name="client" value={editProject.client || ""} onChange={handleEditInputChange} sx={styles.dialogTextField} InputLabelProps={{ shrink: true }} />
                        <TextField fullWidth type="date" label="Due Date" name="dueDate" InputLabelProps={{ shrink: true }} value={editProject.dueDate || ""} onChange={handleEditInputChange} sx={styles.dialogTextField} />
                        <FormControl fullWidth>
                            <InputLabel sx={styles.dialogInputLabel}>Status</InputLabel>
                            <Select name="status" value={editProject.status || ""} onChange={handleEditInputChange} sx={styles.dialogSelect}>
                                {PROJECT_STATUSES.map(status => (<MenuItem key={status} value={status}>{formatStatus(status)}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel sx={styles.dialogInputLabel}>Team Members</InputLabel>
                            <Select multiple name="team" value={editProject.team || []} onChange={handleEditInputChange} label="Team Members"
                                renderValue={(selected) => (
                                    <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                                        {selected.map(initials => (<Avatar key={initials} sx={styles.teamAvatar}>{initials}</Avatar>))}
                                    </Stack>
                                )}
                                sx={styles.dialogSelect}
                            >
                                {teamMembers.map(member => (
                                    <MenuItem key={member.id} value={member.initials}>
                                        <Checkbox checked={editProject.team?.includes(member.initials) || false} />
                                        <ListItemText primary={member.name} sx={{ color: '#283618' }} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                ) : null}
            </DialogContent>
            <DialogActions sx={styles.dialogActions}>
                <Button onClick={() => setOpenEditDialog(false)} sx={styles.dialogCancelButton}>Cancel</Button>
                <Button onClick={handleSaveEdit} variant="contained" sx={styles.dialogCreateButton}>Save Changes</Button>
            </DialogActions>
        </Dialog>

        <Card sx={styles.projectsCard}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#525252', mb: 2, fontWeight: 500 }}>All Projects ({filteredProjects.length})</Typography>
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
                      {filteredProjects.map((project) => (
                          <TableRow key={project.id} hover sx={styles.tableRowHover}>
                              <TableCell sx={styles.tableCell}><Stack direction="row" alignItems="center" spacing={1}><ProjectIcon sx={{ color: '#f3722c' }} /><Typography>{project.name}</Typography></Stack></TableCell>
                              <TableCell sx={styles.tableCell}>{project.client}</TableCell>
                              <TableCell><Chip label={formatStatus(project.status)} sx={styles.chip(project.status)} /></TableCell>
                              <TableCell sx={styles.tableCell}><Stack direction="row" alignItems="center" spacing={1}><TimelineIcon fontSize="small" sx={{ color: '#f3722c' }} /><Typography>{project.dueDate}</Typography></Stack></TableCell>
                              <TableCell sx={styles.tableCell}><Stack direction="row" alignItems="center" spacing={1}>{project.progress === 100 ? <CompleteIcon color="success" /> : <PendingIcon color={project.progress > 50 ? 'warning' : 'error'} />}<Typography>{project.progress}%</Typography></Stack></TableCell>
                              <TableCell><Stack direction="row" spacing={0.5} onClick={(e) => handleTeamClick(e, project.team)} sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>{project.team.map((member, i) => (<Avatar key={i} sx={styles.teamAvatar}>{member}</Avatar>))}</Stack></TableCell>
                              <TableCell><IconButton sx={styles.actionIconButton} onClick={(e) => handleMenuOpen(e, project.id)}><MoreVertIcon /></IconButton></TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ sx: styles.actionMenu }}>
            <MenuItem onClick={() => { const projectToEdit = projects.find(p => p.id === selectedProject); setEditProject({ ...projectToEdit }); setOpenEditDialog(true); handleMenuClose(); }} sx={styles.menuItem}><EditIcon sx={styles.menuItemIcon('#2196f3')} /> Edit Project</MenuItem>
            <MenuItem onClick={handleDeleteProjectWithNotification} sx={styles.menuItem}><DeleteIcon sx={styles.menuItemIcon('#f44336')} /> Delete Project</MenuItem>
            <Divider sx={{ backgroundColor: '#333' }} />
            {PROJECT_STATUSES.map(status => (<MenuItem key={status} onClick={() => handleStatusChangeWithNotification(selectedProject, status)} sx={styles.menuItem}><Chip label={formatStatus(status)} size="small" sx={styles.statusChip(status)} /></MenuItem>))}
        </Menu>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity={snackbarSeverity} sx={{ width: '100%', fontWeight: 'bold', fontSize: '1rem' }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}