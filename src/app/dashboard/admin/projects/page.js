'use client';

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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Grid,
  Menu,
  Divider,
  MenuItem
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
  Delete as DeleteIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Projects Management Screen
 */

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

  // State for action menu control
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  /**
   * Opens the action menu for a specific project
   */
  const handleMenuOpen = (event, projectId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(projectId);
  };

  // Closes the action menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  /**
   * Deletes the selected project
   */
  const handleDeleteProject = () => {
    setProjects(projects.filter(project => project.id !== selectedProject));
    handleMenuClose();
  };

  /**
   * Changes the status of a project
   */
  const handleStatusChange = (projectId, newStatus) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, status: newStatus } : project
    ));
    handleMenuClose();
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#000000' //  black background
    }}>
      {/* ===== SIDEBAR NAVIGATION ===== */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#000000', // Pure black
            borderRight: '1px solid #222', // Subtle border
            color: '#fff' // White text
          }
        }}
      >
        {/* Sidebar Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid #222' }}>
          <Typography variant="h6" > 
            👑 Admin Panel
          </Typography>
        </Box>
        
        {/* Navigation Menu */}
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={{ 
                  color: '#fff',
                  backgroundColor: item.name === 'Projects' ? '#1a1a1a' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#1a1a1a' // Darker background on hover
                  }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ===== MAIN CONTENT AREA ===== */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: '#000000' // Pure black background
      }}>
        {/* Page Header with Search and Add Project Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" sx={{ 
            color: '#fff',
            fontWeight: 500
          }}>
            <ProjectIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
              color: '#f4c10f' // Gold accent
            }} />
            Projects
          </Typography>
          <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            {/* Search Field */}
            <TextField
              size="small"
              placeholder="Search projects..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </InputAdornment>
                ),
                sx: { 
                  color: '#fff',
                  backgroundColor: '#0a0a0a', // Dark field background
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.23)', // Light border
                    },
                  },
                }
              }}
              sx={{ flexGrow: { xs: 1, sm: 0 } }}
            />
            {/* Add Project Button */}
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: '#f4c10f', // Gold button
                color: '#000', // Dark text
                fontWeight: 500,
                '&:hover': { 
                  backgroundColor: '#d1a20b' // Darker gold on hover
                },
                whiteSpace: 'nowrap'
              }}
            >
              New Project
            </Button>
          </Stack>
        </Box>

        {/* Projects Table */}
        <Card sx={{ 
          backgroundColor: '#0a0a0a', // Dark card background
          mb: 3,
          border: '1px solid #222' // Subtle border
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ 
              color: '#fff',
              mb: 2,
              fontWeight: 500
            }}>
              All Projects
            </Typography>
            <TableContainer component={Paper} sx={{ 
              backgroundColor: 'transparent',
              border: '1px solid #222'
            }}>
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
                  {projects.map((project) => (
                    <TableRow 
                      key={project.id} 
                      hover 
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: '#1a1a1a' // Darker background on hover
                        } 
                      }}
                    >
                      {/* Project Name with Icon */}
                      <TableCell sx={{ color: '#fff' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <ProjectIcon sx={{ color: '#f4c10f' }} />
                          <Typography>{project.name}</Typography>
                        </Stack>
                      </TableCell>
                      
                      {/* Client Name */}
                      <TableCell sx={{ color: '#fff' }}>{project.client}</TableCell>
                      
                      {/* Status Chip */}
                      <TableCell>
                        <Chip
                          label={project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          sx={{
                            backgroundColor: 
                              project.status === 'completed' ? 'rgba(46, 125, 50, 0.2)' : // Green for completed
                              project.status === 'active' ? 'rgba(2, 136, 209, 0.2)' : // Blue for active
                              'rgba(97, 97, 97, 0.2)', // Gray for pending
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
                      
                      {/* Due Date with Calendar Icon */}
                      <TableCell sx={{ color: '#fff' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <TimelineIcon fontSize="small" sx={{ color: '#f4c10f' }} />
                          <Typography>{project.dueDate}</Typography>
                        </Stack>
                      </TableCell>
                      
                      {/* Progress Indicator */}
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
                      
                      {/* Team Avatars */}
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {project.team.map((member, i) => (
                            <Avatar 
                              key={i} 
                              sx={{ 
                                width: 32, 
                                height: 32, 
                                fontSize: '0.8rem',
                                bgcolor: '#333', // Dark avatar background
                                color: '#fff', // White initials
                                border: '1px solid #444'
                              }}
                            >
                              {member}
                            </Avatar>
                          ))}
                        </Stack>
                      </TableCell>
                      
                      {/* Action Menu */}
                      <TableCell>
                        <IconButton 
                          sx={{ color: '#fff' }}
                          onClick={(e) => handleMenuOpen(e, project.id)}
                        >
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

        {/* Project Statistics Cards */}
        <Grid container spacing={3}>
          {/* Active Projects Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              border: '1px solid #222',
              height: '100%'
            }}>
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
                    bgcolor: 'rgba(2, 136, 209, 0.1)', // Light blue background
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
          
          {/* Completed Projects Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              border: '1px solid #222',
              height: '100%'
            }}>
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
                    bgcolor: 'rgba(46, 125, 50, 0.1)', // Light green background
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
          
          {/* Total Projects Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              border: '1px solid #222',
              height: '100%'
            }}>
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
                    bgcolor: 'rgba(244, 193, 15, 0.1)', // Light gold background
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

      {/* Action Menu Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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