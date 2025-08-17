/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Card, CardContent, Stack, Avatar, List, ListItem, ListItemButton, ListItemText, Drawer,
  TextField, InputAdornment, Chip, IconButton, Grid, Menu, Divider, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, FormControl, InputLabel, Select, Checkbox,
} from '@mui/material';
import {
  Add as AddIcon, Search as SearchIcon, Assignment as ProjectIcon, DateRange as TimelineIcon,
  MoreVert as MoreVertIcon, CheckCircle as CompleteIcon, Pending as PendingIcon, Edit as EditIcon,
  Delete as DeleteIcon, Close as CloseIcon
} from '@mui/icons-material';
import Link from 'next/link';

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
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
            <TextField
              size="small"
              placeholder="Search projects..."
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
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id} hover sx={styles.tableRowHover}>
                      <TableCell sx={styles.tableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <ProjectIcon sx={{ color: '#f3722c' }} />
                          <Typography>{project.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={styles.tableCell}>{project.client}</TableCell>
                      <TableCell>
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
                          {project.progress === 100 ? (
                            <CompleteIcon color="success" />
                          ) : (
                            <PendingIcon color={project.progress > 50 ? 'warning' : 'error'} />
                          )}
                          <Typography>{project.progress}%</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {project.team.map((member, i) => (
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* RENDER: Statistics Cards */}
        <Grid container spacing={3}>
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
          <Typography variant="h6">Create New Project</Typography>
          <IconButton onClick={() => setOpenCreateDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              sx={styles.dialogTextField}
            />
            <TextField
              fullWidth
              label="Client"
              name="client"
              value={newProject.client}
              onChange={handleInputChange}
              sx={styles.dialogTextField}
            />
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
          <Button
            onClick={() => setOpenCreateDialog(false)}
            sx={styles.dialogCancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateProject}
            disabled={!newProject.name || !newProject.client}
            variant="contained"
            sx={styles.dialogCreateButton}
          >
            Create Project
          </Button>
        </DialogActions>
      </Dialog>

      {/* RENDER: Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: styles.actionMenu }}
      >
        <MenuItem onClick={handleMenuClose} sx={styles.menuItem}>
          <EditIcon sx={styles.menuItemIcon('#2196f3')} />
          Edit Project
        </MenuItem>
        <MenuItem onClick={handleDeleteProject} sx={styles.menuItem}>
          <DeleteIcon sx={styles.menuItemIcon('#f44336')} />
          Delete Project
        </MenuItem>
        <Divider sx={{ backgroundColor: '#333' }} />
        <MenuItem onClick={() => handleStatusChange(selectedProject, 'active')} sx={styles.menuItem}>
          <Chip label="Active" size="small" sx={styles.statusChip('active')} />
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedProject, 'completed')} sx={styles.menuItem}>
          <Chip label="Completed" size="small" sx={styles.statusChip('completed')} />
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedProject, 'pending')} sx={styles.menuItem}>
          <Chip label="Pending" size="small" sx={styles.statusChip('pending')} />
        </MenuItem>
      </Menu>
    </Box>
  );
}