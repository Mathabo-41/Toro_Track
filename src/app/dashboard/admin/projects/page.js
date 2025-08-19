/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
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
import Link from 'next/link';
import Image from 'next/image';

// Snackbar for notifications
import { Snackbar, Alert } from '@mui/material';

import { useProjects } from './useProjects/page';
import { styles } from './styles';

// Static sidebar navigation items for the admin portal
const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

export default function Projects() {
  const {
    projects, searchTerm, setSearchTerm, openCreateDialog, setOpenCreateDialog, newProject,
    anchorEl, selectedProject, teamMembers, filteredProjects, handleMenuOpen, handleMenuClose,
    handleDeleteProject, handleStatusChange, handleCreateProject, handleInputChange, handleTeamChange
  } = useProjects();

  // State for sidebar and user profile
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState('');

  // State for team members popover
  const [teamAnchorEl, setTeamAnchorEl] = React.useState(null);
  const [selectedTeam, setSelectedTeam] = React.useState([]);

  // Router for redirection/navigation
  const router = useRouter();
  
  // Snackbar states for different notifications
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  /**
   * Handles opening the team members popover
   */
  const handleTeamClick = (event, team) => {
    setTeamAnchorEl(event.currentTarget);
    setSelectedTeam(team);
  };

  /**
   * Handles closing the team members popover
   */
  const handleTeamClose = () => {
    setTeamAnchorEl(null);
    setSelectedTeam([]);
  };

  // Check if team popover is open
  const teamOpen = Boolean(teamAnchorEl);

  /**
   * Shows a snackbar notification with the given message and severity
   */
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  /**
   * Handles project creation with success notification
   */
  const handleCreateProjectWithNotification = () => {
    handleCreateProject();
    showSnackbar('Project created successfully!');
    setOpenCreateDialog(false); // Close the dialog after creation
  };

  /**
   * Handles project deletion with confirmation notification
   */
  const handleDeleteProjectWithNotification = () => {
    handleDeleteProject();
    showSnackbar('Project deleted successfully!');
    handleMenuClose();
  };

  /**
   * Handles project status change with notification
   *  The ID of the project
   *  The new status
   */
  const handleStatusChangeWithNotification = (projectId, status) => {
    handleStatusChange(projectId, status);
    showSnackbar(`Project status changed to ${status}`, 'info');
    handleMenuClose();
  };

  /**
   * Function to handle the logout action with snackbar and redirect to the login page
   */
  const handleLogout = () => {
    showSnackbar('Logging out...', 'info');
    setTimeout(() => {
      router.push('/login');
    }, 1500); // Redirect after 1.5 seconds
  };

  return (
    <Box sx={styles.container}>
      {/* RENDER: Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebar}>
        <Box sx={styles.sidebarHeader}>
          <Typography variant="h5">Admin Portal</Typography>
        </Box>
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
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

        {/* RENDER: User Profile Section */}
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

            {/* User Details (shown when sidebar is open) */}
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
                
                {/* User Email (dynamic based on active category) */}
                <Typography sx={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.8, 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgba(254, 250, 224, 0.7)' // Semi-transparent text
                }}>
                  {activeCategory ? `${activeCategory.replace(/([A-Z])/g, ' $1').trim()}@toro.com` : 'user@toro.com'}
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

      {/* RENDER: Main Content */}
      <Box component="main" sx={styles.mainContent}>
        {/* RENDER: Header with Search and Add Button */}
        <Box sx={styles.header}>
          <Typography variant="h4" sx={styles.title}>
            <ProjectIcon sx={styles.titleIcon} />
            Projects
          </Typography>
          <Stack direction="row" spacing={2} sx={styles.searchStack}>
            {/* Search Field - Filters projects based on name of the project or client name */}
            <TextField
              size="small"
              placeholder="Search by name or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={styles.searchIcon} />
                  </InputAdornment>
                ),
                sx: styles.searchField
              }}
            />
            {/* Button to open Create Project Dialog */}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDialog(true)}
              sx={styles.newProjectButton}
            >
              New Project
            </Button>
          </Stack>
        </Box>

        {/* RENDER: Projects Table */}
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
                  {/* Map through filtered projects to display in table rows */}
                  {filteredProjects.map((project, index) => (
                    // Using a combination of ID and index to ensure unique keys
                    <TableRow key={`${project.id}-${index}`} hover sx={styles.tableRowHover}>
                      <TableCell sx={styles.tableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <ProjectIcon sx={{ color: '#f3722c' }} />
                          <Typography>{project.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={styles.tableCell}>{project.client}</TableCell>
                      <TableCell>
                        {/* Status chip with color coding based on status */}
                        <Chip
                          label={project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          sx={styles.chip(project.status)}
                        />
                      </TableCell>
                      <TableCell sx={styles.tableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <TimelineIcon fontSize="small" sx={{ color: '#f3722c' }} />
                          <Typography>{project.dueDate}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={styles.tableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {/* Progress indicator with appropriate icon */}
                          {project.progress === 100 ? (
                            <CompleteIcon color="success" />
                          ) : (
                            <PendingIcon color={project.progress > 50 ? 'warning' : 'error'} />
                          )}
                          <Typography>{project.progress}%</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {/* Team members avatars - click to view details */}
                        <Stack 
                          direction="row" 
                          spacing={0.5}
                          onClick={(e) => handleTeamClick(e, project.team)}
                          sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                        >
                          {project.team.map((member, i) => (
                            <Avatar key={i} sx={styles.teamAvatar}>
                              {member}
                            </Avatar>
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {/* Actions menu button */}
                        <IconButton sx={styles.actionIconButton} onClick={(e) => handleMenuOpen(e, project.id)}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* RENDER: Statistics Cards */}
        <Grid container spacing={3}>
          {/* Active Projects Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={styles.statsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>
                      Active Projects
                    </Typography>
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
          
          {/* Completed Projects Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={styles.statsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>
                      Completed Projects
                    </Typography>
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
          
          {/* Total Projects Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={styles.statsCard}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>
                      Total Projects
                    </Typography>
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
        </Grid>
      </Box>

      {/* RENDER: Create Project Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: styles.createDialogPaper }}
      >
        <DialogTitle sx={styles.createDialogTitle}>
          <Typography component="span" variant="h6">Create New Project</Typography>
          <IconButton onClick={() => setOpenCreateDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Stack spacing={3}>
            {/* Project Name Input */}
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              sx={styles.dialogTextField}
            />
            {/* Client Name Input */}
            <TextField
              fullWidth
              label="Client"
              name="client"
              value={newProject.client}
              onChange={handleInputChange}
              sx={styles.dialogTextField}
            />
            {/* Due Date Input */}
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              name="dueDate"
              InputLabelProps={{ shrink: true }}
              value={newProject.dueDate}
              onChange={handleInputChange}
              sx={styles.dialogTextField}
            />
            {/* Status Selection */}
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#6b705c' }}>Status</InputLabel>
              <Select
                name="status"
                value={newProject.status}
                onChange={handleInputChange}
                label="Status"
                sx={styles.dialogSelect}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            {/* Team Members Selection */}
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#6b705c' }}>Team Members</InputLabel>
              <Select
                multiple
                value={newProject.team}
                onChange={handleTeamChange}
                label="Team Members"
                renderValue={(selected) => (
                  <Stack direction="row" spacing={0.5}>
                    {selected.map(memberInitials => (
                      <Avatar key={memberInitials} sx={styles.teamAvatar}>
                        {memberInitials}
                      </Avatar>
                    ))}
                  </Stack>
                )}
                sx={styles.dialogSelect}
              >
                {teamMembers.map(member => (
                  <MenuItem key={member.id} value={member.initials}>
                    <Checkbox checked={newProject.team.indexOf(member.initials) > -1} />
                    <ListItemText primary={member.name} sx={{ color: '#283618' }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          {/* Cancel Button */}
          <Button
            onClick={() => setOpenCreateDialog(false)}
            sx={styles.dialogCancelButton}
          >
            Cancel
          </Button>
          {/* Create Project Button */}
          <Button
            onClick={handleCreateProjectWithNotification}
            disabled={!newProject.name || !newProject.client}
            variant="contained"
            sx={styles.dialogCreateButton}
          >
            Create Project
          </Button>
        </DialogActions>
      </Dialog>

      {/* RENDER: Team Members Popover - Shows team details when team avatars are clicked */}
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
        PaperProps={{ sx: { p: 2, minWidth: 200, backgroundColor: '#fefae0', color: '#283618' } }}
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

      {/* RENDER: Action Menu for project operations */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: styles.actionMenu }}
      >
        {/* Edit Project Option */}
        <MenuItem onClick={handleMenuClose} sx={styles.menuItem}>
          <EditIcon sx={styles.menuItemIcon('#2196f3')} />
          Edit Project
        </MenuItem>
        {/* Delete Project Option */}
        <MenuItem onClick={handleDeleteProjectWithNotification} sx={styles.menuItem}>
          <DeleteIcon sx={styles.menuItemIcon('#f44336')} />
          Delete Project
        </MenuItem>
        <Divider sx={{ backgroundColor: '#333' }} />
        {/* Status Change Options */}
        <MenuItem onClick={() => handleStatusChangeWithNotification(selectedProject, 'active')} sx={styles.menuItem}>
          <Chip label="Active" size="small" sx={styles.statusChip('active')} />
        </MenuItem>
        <MenuItem onClick={() => handleStatusChangeWithNotification(selectedProject, 'completed')} sx={styles.menuItem}>
          <Chip label="Completed" size="small" sx={styles.statusChip('completed')} />
        </MenuItem>
        <MenuItem onClick={() => handleStatusChangeWithNotification(selectedProject, 'pending')} sx={styles.menuItem}>
          <Chip label="Pending" size="small" sx={styles.statusChip('pending')} />
        </MenuItem>
      </Menu>

      {/* RENDER: Snackbar for showing notifications for various actions */}
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