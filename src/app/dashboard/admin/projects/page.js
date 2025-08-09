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
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000000' }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#000000',
            borderRight: '1px solid #222',
            color: '#fff'
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #222' }}>
          <Typography variant="h6">👑 Admin Panel</Typography>
        </Box>
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={{ 
                  color: '#fff',
                  backgroundColor: item.name === 'Projects' ? '#1a1a1a' : 'transparent',
                  '&:hover': { backgroundColor: '#1a1a1a' }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#000000' }}>
        {/* Header with Search and Add Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 500 }}>
            <ProjectIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#f4c10f' }} />
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
                    <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </InputAdornment>
                ),
                sx: { 
                  color: '#fff',
                  backgroundColor: '#0a0a0a',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                  },
                }
              }}
              sx={{ flexGrow: { xs: 1, sm: 0 } }}
            />
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDialog(true)}
              sx={{
                backgroundColor: '#f4c10f',
                color: '#000',
                fontWeight: 500,
                '&:hover': { backgroundColor: '#d1a20b' },
                whiteSpace: 'nowrap'
              }}
            >
              New Project
            </Button>
          </Stack>
        </Box>

        {/* Projects Table */}
        <Card sx={{ backgroundColor: '#0a0a0a', mb: 3, border: '1px solid #222' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontWeight: 500 }}>
              All Projects ({filteredProjects.length})
            </Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: '1px solid #222' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Project</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Client</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Due Date</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Progress</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Team</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id} hover sx={{ '&:hover': { backgroundColor: '#1a1a1a' } }}>
                      <TableCell sx={{ color: '#fff' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <ProjectIcon sx={{ color: '#f4c10f' }} />
                          <Typography>{project.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: '#fff' }}>{project.client}</TableCell>
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
                      <TableCell sx={{ color: '#fff' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <TimelineIcon fontSize="small" sx={{ color: '#f4c10f' }} />
                          <Typography>{project.dueDate}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: '#fff' }}>
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
                                bgcolor: '#333',
                                color: '#fff',
                                border: '1px solid #444'
                              }}
                            >
                              {member}
                            </Avatar>
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <IconButton sx={{ color: '#fff' }} onClick={(e) => handleMenuOpen(e, project.id)}>
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
            <Card sx={{ backgroundColor: '#0a0a0a', border: '1px solid #222', height: '100%' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
            <Card sx={{ backgroundColor: '#0a0a0a', border: '1px solid #222', height: '100%' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
            <Card sx={{ backgroundColor: '#0a0a0a', border: '1px solid #222', height: '100%' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Total Projects
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#f4c10f', fontWeight: 500 }}>
                      {projects.length}
                    </Typography>
                  </Box>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(244, 193, 15, 0.1)',
                    width: 56, 
                    height: 56,
                    border: '1px solid #f4c10f'
                  }}>
                    <ProjectIcon color="primary" />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Create Project Dialog - WHITE THEME */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  borderBottom: '1px solid #eee',
  backgroundColor: '#fff',
  color: '#333'
}}>
  Create New Project {/* Direct text node instead of Typography */}
  <IconButton onClick={() => setOpenCreateDialog(false)}>
    <CloseIcon />
  </IconButton>
</DialogTitle>
        <DialogContent sx={{ py: 3, backgroundColor: '#fff' }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              sx={{ 
                '& .MuiInputBase-input': { color: '#333' },
                '& .MuiInputLabel-root': { color: '#666' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' }
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
                '& .MuiInputBase-input': { color: '#333' },
                '& .MuiInputLabel-root': { color: '#666' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' }
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
                '& .MuiInputBase-input': { color: '#333' },
                '& .MuiInputLabel-root': { color: '#666' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' }
                }
              }}
            />
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#666' }}>Status</InputLabel>
              <Select
                name="status"
                value={newProject.status}
                onChange={handleInputChange}
                label="Status"
                sx={{ color: '#333' }}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#666' }}>Team Members</InputLabel>
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
                          bgcolor: '#f0f0f0',
                          color: '#333'
                        }}
                      >
                        {memberId}
                      </Avatar>
                    ))}
                  </Stack>
                )}
                sx={{ color: '#333' }}
              >
                {teamMembers.map(member => (
                  <MenuItem key={member.id} value={member.initials}>
                    <Checkbox checked={newProject.team.indexOf(member.initials) > -1} />
                    <ListItemText primary={member.name} sx={{ color: '#333' }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: '1px solid #eee', 
          px: 3, 
          py: 2,
          backgroundColor: '#fff'
        }}>
          <Button 
            onClick={() => setOpenCreateDialog(false)}
            sx={{ color: '#666', '&:hover': { backgroundColor: '#f5f5f5' } }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateProject}
            disabled={!newProject.name || !newProject.client}
            variant="contained"
            sx={{
              backgroundColor: '#f4c10f',
              color: '#000',
              '&:hover': { backgroundColor: '#d1a20b' },
              '&:disabled': { backgroundColor: '#e0e0e0' }
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
            backgroundColor: '#0a0a0a',
            color: '#fff',
            border: '1px solid #333',
            minWidth: '200px'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#1a1a1a' } }}>
          <EditIcon sx={{ mr: 1, color: '#2196f3' }} />
          Edit Project
        </MenuItem>
        <MenuItem onClick={handleDeleteProject} sx={{ '&:hover': { backgroundColor: '#1a1a1a' } }}>
          <DeleteIcon sx={{ mr: 1, color: '#f44336' }} />
          Delete Project
        </MenuItem>
        <Divider sx={{ backgroundColor: '#333' }} />
        <MenuItem 
          onClick={() => handleStatusChange(selectedProject, 'active')}
          sx={{ '&:hover': { backgroundColor: '#1a1a1a' } }}
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
          sx={{ '&:hover': { backgroundColor: '#1a1a1a' } }}
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
          sx={{ '&:hover': { backgroundColor: '#1a1a1a' } }}
        >
          <Chip label="Pending" size="small" sx={{ 
            backgroundColor: 'rgba(97, 97, 97, 0.2)', 
            color: '#bdbdbd',
            border: '1px solid #616161',
            mr: 1 
          }} />
        </MenuItem>
      </Menu>
    </Box>
  );
}