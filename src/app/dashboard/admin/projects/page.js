'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Menu,
  Divider,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemIcon
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Assignment as ProjectIcon,
  DateRange as TimelineIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CompleteIcon,
  Pending as PendingIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Link from 'next/link';

import {
  rootBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  activeListItemButton,
  mainContentBox,
  pageHeader,
  pageHeaderText,
  pageHeaderIcon,
  searchField,
  newProjectButton,
  projectsCard,
  projectsCardContent,
  projectsTableContainer,
  projectsTableHeader,
  projectsTableHeaderCell,
  projectsTableRow,
  projectsTableCell,
  projectIcon,
  statusChip,
  timelineIcon,
  progressStack,
  progressIcon,
  teamAvatar,
  actionIconButton,
  statsCard,
  statsCardContent,
  statsValue,
  statsAvatar,
  createProjectDialogPaper,
  createProjectDialogTitle,
  createProjectDialogContent,
  dialogCloseButton,
  dialogTextField,
  dialogFormControl,
  dialogInputLabel,
  dialogSelect,
  dialogSelectMenuItem,
  dialogActions,
  dialogCancelButton,
  createProjectButton,
  menuPaper,
  menuItem,
  menuDivider
} from '../styles';

// Sidebar navigation items for admin panel
const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

// Sample team members data
const teamMembers = [
  { id: 1, name: 'John Doe', initials: 'JD' },
  { id: 2, name: 'Alice Smith', initials: 'AS' },
  { id: 3, name: 'Michael P.', initials: 'MP' },
  { id: 4, name: 'Taylor P.', initials: 'TP' },
  { id: 5, name: 'Robert W.', initials: 'RW' }
];

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      client: 'Acme Corp',
      status: 'active',
      dueDate: '2023-12-15',
      progress: 75,
      team: ['JD', 'AS', 'MP']
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'Globex Inc',
      status: 'active',
      dueDate: '2024-02-28',
      progress: 30,
      team: ['AS', 'TP', 'RW']
    },
    {
      id: 3,
      name: 'E-commerce Platform',
      client: 'Initech',
      status: 'completed',
      dueDate: '2023-10-10',
      progress: 100,
      team: ['JD', 'MP']
    },
    {
      id: 4,
      name: 'CRM System',
      client: 'Umbrella Corp',
      status: 'pending',
      dueDate: '2024-05-20',
      progress: 10,
      team: ['TP', 'RW', 'AS']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    status: 'active',
    dueDate: '',
    team: []
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.client.toLowerCase().includes(searchLower) ||
      project.status.toLowerCase().includes(searchLower)
    );
  });

  const handleMenuOpen = (event, projectId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const handleDeleteProject = () => {
    setProjects(projects.filter(project => project.id !== selectedProject));
    handleMenuClose();
  };

  const handleStatusChange = (projectId, newStatus) => {
    setProjects(projects.map(project =>
      project.id === projectId ? { ...project, status: newStatus } : project
    ));
    handleMenuClose();
  };

  const handleCreateProject = () => {
    const project = {
      id: projects.length + 1,
      ...newProject,
      progress: newProject.status === 'completed' ? 100 :
               newProject.status === 'active' ? 30 : 10
    };
    setProjects([...projects, project]);
    setNewProject({
      name: '',
      client: '',
      status: 'active',
      dueDate: '',
      team: []
    });
    setOpenCreateDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (event) => {
    const { value } = event.target;
    setNewProject(prev => ({ ...prev, team: value }));
  };

  return (
    <Box sx={rootBox}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': drawerPaper
        }}
      >
        <Box sx={drawerHeader}>
          <Typography variant="h5">Admin Portal</Typography>
        </Box>
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={item.name === 'Projects' ? activeListItemButton : listItemButton}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={mainContentBox}>
        <Box sx={pageHeader}>
          <Typography variant="h4" sx={pageHeaderText}>
            <ProjectIcon sx={pageHeaderIcon} />
            Projects
          </Typography>
          <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <TextField
              size="small"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                sx: searchField
              }}
              sx={{ flexGrow: { xs: 1, sm: 0 } }}
            />
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDialog(true)}
              sx={newProjectButton}
            >
              New Project
            </Button>
          </Stack>
        </Box>

        <Card sx={projectsCard}>
          <CardContent sx={projectsCardContent}>
            <Typography variant="h6" sx={pageHeaderText}>
              All Projects ({filteredProjects.length})
            </Typography>
            <TableContainer component={Paper} sx={projectsTableContainer}>
              <Table>
                <TableHead sx={projectsTableHeader}>
                  <TableRow>
                    <TableCell sx={projectsTableHeaderCell}>Project</TableCell>
                    <TableCell sx={projectsTableHeaderCell}>Client</TableCell>
                    <TableCell sx={projectsTableHeaderCell}>Status</TableCell>
                    <TableCell sx={projectsTableHeaderCell}>Due Date</TableCell>
                    <TableCell sx={projectsTableHeaderCell}>Progress</TableCell>
                    <TableCell sx={projectsTableHeaderCell}>Team</TableCell>
                    <TableCell sx={projectsTableHeaderCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id} hover sx={projectsTableRow}>
                      <TableCell sx={projectsTableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <ProjectIcon sx={projectIcon} />
                          <Typography>{project.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={projectsTableCell}>{project.client}</TableCell>
                      <TableCell>
                        <Chip
                          label={project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          sx={statusChip(project.status)}
                        />
                      </TableCell>
                      <TableCell sx={projectsTableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <TimelineIcon fontSize="small" sx={timelineIcon} />
                          <Typography>{project.dueDate}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={projectsTableCell}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={progressStack}>
                          {project.progress === 100 ? (
                            <CompleteIcon color="success" />
                          ) : (
                            <PendingIcon sx={progressIcon(project.progress)} />
                          )}
                          <Typography>{project.progress}%</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {project.team.map((member, i) => (
                            <Avatar
                              key={i}
                              sx={teamAvatar}
                            >
                              {member}
                            </Avatar>
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <IconButton sx={actionIconButton} onClick={(e) => handleMenuOpen(e, project.id)}>
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

        {/* Statistics Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={statsCard}>
              <CardContent sx={statsCardContent}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={pageHeaderText}>
                      Active Projects
                    </Typography>
                    <Typography variant="h4" sx={statsValue('info.light')}>
                      {projects.filter(p => p.status === 'active').length}
                    </Typography>
                  </Box>
                  <Avatar sx={statsAvatar('info.background', 'info.main')}>
                    <ProjectIcon color="info" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={statsCard}>
              <CardContent sx={statsCardContent}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={pageHeaderText}>
                      Completed Projects
                    </Typography>
                    <Typography variant="h4" sx={statsValue('success.light')}>
                      {projects.filter(p => p.status === 'completed').length}
                    </Typography>
                  </Box>
                  <Avatar sx={statsAvatar('success.background', 'success.main')}>
                    <CompleteIcon color="success" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={statsCard}>
              <CardContent sx={statsCardContent}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={pageHeaderText}>
                      Total Projects
                    </Typography>
                    <Typography variant="h4" sx={statsValue('coral.main')}>
                      {projects.length}
                    </Typography>
                  </Box>
                  <Avatar sx={statsAvatar('highlight.main', 'coral.main')}>
                    <ProjectIcon sx={{ color: 'coral.main' }} />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Create Project Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: createProjectDialogPaper }}
      >
        <DialogTitle sx={createProjectDialogTitle}>
          <Typography variant="h6">Create New Project</Typography>
          <IconButton onClick={() => setOpenCreateDialog(false)} sx={dialogCloseButton}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={createProjectDialogContent}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              sx={dialogTextField}
            />
            <TextField
              fullWidth
              label="Client"
              name="client"
              value={newProject.client}
              onChange={handleInputChange}
              sx={dialogTextField}
            />
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              name="dueDate"
              InputLabelProps={{ shrink: true }}
              value={newProject.dueDate}
              onChange={handleInputChange}
              sx={dialogTextField}
            />
            <FormControl fullWidth sx={dialogFormControl}>
              <InputLabel sx={dialogInputLabel}>Status</InputLabel>
              <Select
                name="status"
                value={newProject.status}
                onChange={handleInputChange}
                label="Status"
                sx={dialogSelect}
              >
                <MenuItem value="active" sx={dialogSelectMenuItem}>Active</MenuItem>
                <MenuItem value="pending" sx={dialogSelectMenuItem}>Pending</MenuItem>
                <MenuItem value="completed" sx={dialogSelectMenuItem}>Completed</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={dialogFormControl}>
              <InputLabel sx={dialogInputLabel}>Team Members</InputLabel>
              <Select
                multiple
                value={newProject.team}
                onChange={handleTeamChange}
                label="Team Members"
                renderValue={(selected) => (
                  <Stack direction="row" spacing={0.5}>
                    {selected.map(memberId => (
                      <Avatar
                        key={memberId}
                        sx={teamAvatar}
                      >
                        {memberId}
                      </Avatar>
                    ))}
                  </Stack>
                )}
                sx={dialogSelect}
              >
                {teamMembers.map(member => (
                  <MenuItem key={member.id} value={member.initials} sx={dialogSelectMenuItem}>
                    <Checkbox checked={newProject.team.indexOf(member.initials) > -1} />
                    <ListItemText primary={member.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={dialogActions}>
          <Button
            onClick={() => setOpenCreateDialog(false)}
            sx={dialogCancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateProject}
            disabled={!newProject.name || !newProject.client}
            variant="contained"
            sx={createProjectButton}
          >
            Create Project
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: menuPaper }}
      >
        <MenuItem onClick={handleMenuClose} sx={menuItem}>
          <EditIcon sx={{ mr: 1, color: 'info.main' }} />
          Edit Project
        </MenuItem>
        <MenuItem onClick={handleDeleteProject} sx={menuItem}>
          <DeleteIcon sx={{ mr: 1, color: 'error.light' }} />
          Delete Project
        </MenuItem>
        <Divider sx={menuDivider} />
        <MenuItem
          onClick={() => handleStatusChange(selectedProject, 'active')}
          sx={menuItem}
        >
          <Chip label="Active" size="small" sx={statusChip('active', true)} />
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange(selectedProject, 'completed')}
          sx={menuItem}
        >
          <Chip label="Completed" size="small" sx={statusChip('completed', true)} />
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange(selectedProject, 'pending')}
          sx={menuItem}
        >
          <Chip label="Pending" size="small" sx={statusChip('pending', true)} />
        </MenuItem>
      </Menu>
    </Box>
  );
}