'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography, Button,Table,  TableBody, TableCell, TableContainer,  TableHead, TableRow,  Paper,Card,
  CardContent, Stack,Avatar, List, ListItem, ListItemButton, ListItemText, Drawer,
  TextField,InputAdornment, Chip,  IconButton,  Grid,
  Menu, Divider, MenuItem, Dialog,  DialogTitle,
  DialogContent,  DialogActions,  FormControl,  InputLabel,  Select,  Checkbox,  ListItemIcon
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
  // State for project data management
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

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // State for project creation dialog
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    status: 'active',
    dueDate: '',
    team: []
  });

  // State for action menu control
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.client.toLowerCase().includes(searchLower) ||
      project.status.toLowerCase().includes(searchLower)
    );
  });

  // Handle menu opening
  const handleMenuOpen = (event, projectId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(projectId);
  };

  // Handle menu closing
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  // Handle project deletion
  const handleDeleteProject = () => {
    setProjects(projects.filter(project => project.id !== selectedProject));
    handleMenuClose();
  };

  // Handle status change
  const handleStatusChange = (projectId, newStatus) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, status: newStatus } : project
    ));
    handleMenuClose();
  };

  // Handle creating new project
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

  // Handle input changes for new project
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  // Handle team member selection
  const handleTeamChange = (event) => {
    const { value } = event.target;
    setNewProject(prev => ({ ...prev, team: value }));
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      minWidth:'90vw',
      backgroundColor: '#fefae0' 
    }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#283618',
            borderRight: '2px solid #6b705c',
            color: '#fefae0'
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '2px solid #6b705c' }}>
          <Typography variant="h5">Admin Portal</Typography>
        </Box>
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={{ 
                  color: '#fefae0',
                  backgroundColor: item.name === 'Projects' ? '#6b705c' : 'transparent',
                  '&:hover': { backgroundColor: '#6b705c' }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#fefae0' }}>
        {/* Header with Search and Add Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" sx={{ color: '#525252', fontWeight: 500 }}>
            <ProjectIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#f3722c' }} />
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
                    <SearchIcon sx={{ color: '#525252' }} />
                  </InputAdornment>
                ),
                sx: { 
                  color: '#525252',
                  backgroundColor: '#fefae0',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#525252' },
                  },
                }
              }}
              sx={{ flexGrow: { xs: 1, sm: 0 } }}
            />
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDialog(true)}
              sx={{
                backgroundColor: '#283618', 
                color: '#fefae0', 
                fontWeight: 500,
                '&:hover': { 
                  backgroundColor: '#606c38',
                  borderColor: '#fefae0'
                },
                whiteSpace: 'nowrap'
              }}
            >
              New Project
            </Button>
          </Stack>
        </Box>

        {/* Projects Table */}
        <Card sx={{ backgroundColor: '#fefae0', mb: 3, border: '1px solid #525252' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#525252', mb: 2, fontWeight: 500 }}>
              All Projects ({filteredProjects.length})
            </Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: '2px solid #525252' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#525252', fontWeight: 'bold' }}>Project</TableCell>
                    <TableCell sx={{ color: '#525252', fontWeight: 'bold' }}>Client</TableCell>
                    <TableCell sx={{ color: '#525252', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: '#525252', fontWeight: 'bold' }}>Due Date</TableCell>
                    <TableCell sx={{ color: '#525252', fontWeight: 'bold' }}>Progress</TableCell>
                    <TableCell sx={{ color: '#525252', fontWeight: 'bold' }}>Team</TableCell>
                    <TableCell sx={{ color: '#525252', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id} hover sx={{ '&:hover': { backgroundColor: '#d6d6d6' } }}>
                      <TableCell sx={{ color: '#525252' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <ProjectIcon sx={{ color: '#f3722c' }} />
                          <Typography>{project.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: '#525252' }}>{project.client}</TableCell>
                      <TableCell>
                        <Chip
                          label={project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          sx={{
                            backgroundColor: 
                              project.status === 'completed' ? 'rgba(46, 125, 50, 0.2)' :
                              project.status === 'active' ? 'rgba(2, 136, 209, 0.2)' :
                              'rgba(97, 97, 97, 0.2)',
                            color: 
                              project.status === 'completed' ? '#81c784' :
                              project.status === 'active' ? '#4fc3f7' : '#bdbdbd',
                            border: 
                              project.status === 'completed' ? '1px solid #2e7d32' :
                              project.status === 'active' ? '1px solid #0288d1' : '1px solid #616161',
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#525252' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <TimelineIcon fontSize="small" sx={{ color: '#f3722c' }} />
                          <Typography>{project.dueDate}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: '#525252' }}>
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
                            <Avatar 
                              key={i} 
                              sx={{ 
                                width: 32, 
                                height: 32, 
                                fontSize: '0.8rem',
                                bgcolor: '#6b705c',
                                color: '#fefae0',
                                border: '1px solid #444'
                              }}
                            >
                              {member}
                            </Avatar>
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <IconButton sx={{ color: '#525252' }} onClick={(e) => handleMenuOpen(e, project.id)}>
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
            <Card sx={{ backgroundColor: '#fefae0', border: '1px solid #525252', height: '100%' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>
                      Active Projects
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#4fc3f7', fontWeight: 500 }}>
                      {projects.filter(p => p.status === 'active').length}
                    </Typography>
                  </Box>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(2, 136, 209, 0.1)',
                    width: 56, 
                    height: 56,
                    border: '1px solid #0288d1'
                  }}>
                    <ProjectIcon color="info" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#fefae0', border: '1px solid #525252', height: '100%' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>
                      Completed Projects
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#81c784', fontWeight: 500 }}>
                      {projects.filter(p => p.status === 'completed').length}
                    </Typography>
                  </Box>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(46, 125, 50, 0.1)',
                    width: 56, 
                    height: 56,
                    border: '1px solid #2e7d32'
                  }}>
                    <CompleteIcon color="success" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#fefae0', border: '1px solid #525252', height: '100%' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#525252' }}>
                      Total Projects
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#f3722c', fontWeight: 500 }}>
                      {projects.length}
                    </Typography>
                  </Box>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(244, 193, 15, 0.1)',
                    width: 56, 
                    height: 56,
                    border: '1px solid #f3722c'
                  }}>
                    <ProjectIcon color="primary" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Create Project Dialog - LIGHT THEME */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: '#fefae0',
            color: '#283618',
            border: '2px solid #283618'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid #6b705c',
          backgroundColor: '#fefae0',
          color: '#283618'
        }}>
          <Typography variant="h6">Create New Project</Typography>
          <IconButton onClick={() => setOpenCreateDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 3, backgroundColor: '#fefae0' }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              sx={{ 
                '& .MuiInputBase-input': { color: '#283618' },
                '& .MuiInputLabel-root': { color: '#6b705c' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#6b705c' },
                  '&:hover fieldset': { borderColor: '#283618' },
                  '&.Mui-focused fieldset': { borderColor: '#283618' },
                }
              }}
            />
            <TextField
              fullWidth
              label="Client"
              name="client"
              value={newProject.client}
              onChange={handleInputChange}
              sx={{ 
                '& .MuiInputBase-input': { color: '#283618' },
                '& .MuiInputLabel-root': { color: '#6b705c' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#6b705c' },
                  '&:hover fieldset': { borderColor: '#283618' },
                  '&.Mui-focused fieldset': { borderColor: '#283618' },
                }
              }}
            />
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              name="dueDate"
              InputLabelProps={{ shrink: true }}
              value={newProject.dueDate}
              onChange={handleInputChange}
              sx={{ 
                '& .MuiInputBase-input': { color: '#283618' },
                '& .MuiInputLabel-root': { color: '#6b705c' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#6b705c' },
                  '&:hover fieldset': { borderColor: '#283618' },
                  '&.Mui-focused fieldset': { borderColor: '#283618' },
                }
              }}
            />
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#6b705c' }}>Status</InputLabel>
              <Select
                name="status"
                value={newProject.status}
                onChange={handleInputChange}
                label="Status"
                sx={{ color: '#283618' }}
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
                    {selected.map(memberId => (
                      <Avatar 
                        key={memberId}
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          fontSize: '0.8rem',
                          bgcolor: '#6b705c',
                          color: '#fefae0'
                        }}
                      >
                        {memberId}
                      </Avatar>
                    ))}
                  </Stack>
                )}
                sx={{ color: '#283618' }}
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
        <DialogActions sx={{ 
          borderTop: '1px solid #6b705c', 
          px: 3, 
          py: 2,
          backgroundColor: '#fefae0'
        }}>
          <Button 
            onClick={() => setOpenCreateDialog(false)}
            sx={{ color: '#6b705c', '&:hover': { backgroundColor: '#6b705c', color: '#fefae0' } }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateProject}
            disabled={!newProject.name || !newProject.client}
            variant="contained"
            sx={{
              backgroundColor: '#283618',
              color: '#fefae0',
              '&:hover': { backgroundColor: '#606c38' },
              '&:disabled': { backgroundColor: '#e0e0e0', color: '#a0a0a0' }
            }}
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
        PaperProps={{
          sx: {
            backgroundColor: '#fefae0',
            color: '#283618',
            border: '2px solid #283618',
            minWidth: '200px'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#606c38', color: '#fefae0' } }}>
          <EditIcon sx={{ mr: 1, color: '#2196f3' }} />
          Edit Project
        </MenuItem>
        <MenuItem onClick={handleDeleteProject} sx={{ '&:hover': { backgroundColor: '#606c38', color: '#fefae0' } }}>
          <DeleteIcon sx={{ mr: 1, color: '#f44336' }} />
          Delete Project
        </MenuItem>
        <Divider sx={{ backgroundColor: '#333' }} />
        <MenuItem 
          onClick={() => handleStatusChange(selectedProject, 'active')}
          sx={{ '&:hover': { backgroundColor: '#6b705c', color: '#fefae0' } }}
        >
          <Chip label="Active" size="small" sx={{ 
            backgroundColor: 'rgba(2, 136, 209, 0.2)', 
            color: '#4fc3f7',
            border: '1px solid #0288d1',
            mr: 1 
          }} />
        </MenuItem>
        <MenuItem 
          onClick={() => handleStatusChange(selectedProject, 'completed')}
          sx={{ '&:hover': { backgroundColor: '#6b705c', color: '#fefae0' } }}
        >
          <Chip label="Completed" size="small" sx={{ 
            backgroundColor: 'rgba(46, 125, 50, 0.2)', 
            color: '#81c784',
            border: '1px solid #2e7d32',
            mr: 1 
          }} />
        </MenuItem>
        <MenuItem 
          onClick={() => handleStatusChange(selectedProject, 'pending')}
          sx={{ '&:hover': { backgroundColor: '#6b705c', color: '#fefae0' } }}
        >
          <Chip label="Pending" size="small" sx={{ 
            backgroundColor: 'rgba(244, 193, 15, 0.1)', 
            color: '#f3722c',
            border: '1px solid #f3722c',
            mr: 1 
          }} />
        </MenuItem>
      </Menu>
    </Box>
  );
}