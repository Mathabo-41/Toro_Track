'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// Import Material-UI components
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Button,
  Drawer,
  ListItemButton,
  TextField,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  FormControl
} from '@mui/material';
// Import Material-UI icons
import {
  People as PeopleIcon,
  Groups as TeamsIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Email as EmailIcon,
  Assignment as AssignmentIcon,
  GroupAdd as GroupAddIcon
} from '@mui/icons-material';

/**
 * Teams & Users Management Screen
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

export default function TeamsAndUsers() {
  // State for managing user invitation email input
  const [inviteEmail, setInviteEmail] = useState('');
  
  // State for storing and managing user data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', team: 'Management', tasks: ['Review projects'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Project Manager', team: 'Development', tasks: ['Lead team A'] },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Developer', team: 'Frontend', tasks: ['Implement UI'] },
  ]);
  
  // State for available teams in the organization
  const [teams, setTeams] = useState(['Management', 'Development', 'Frontend', 'Backend', 'Design']);
  
  // State for common tasks that can be assigned
  const [tasks, setTasks] = useState(['Review projects', 'Lead team A', 'Implement UI', 'API development', 'Design mockups']);
  
  // State to track which user is selected for task assignment
  const [selectedUser, setSelectedUser] = useState(null);
  
  // State for new task input when assigning to a user
  const [newTask, setNewTask] = useState('');
  
  // State for dropdown menu anchor element
  const [anchorEl, setAnchorEl] = useState(null);
  
  // State to track which user's action menu is open
  const [menuUserId, setMenuUserId] = useState(null);

  /**
   * Handles inviting a new user by email
   * Creates a new user with default settings and adds to the users list
   */
  const handleInviteUser = () => {
    if (inviteEmail) {
      const newUser = {
        id: users.length + 1,
        name: 'New User',
        email: inviteEmail,
        role: 'Member',
        team: 'Unassigned',
        tasks: []
      };
      setUsers([...users, newUser]);
      setInviteEmail('');
    }
  };

  /**
   * Adds a task to the specified user's task list
   */
  const handleAddTask = (userId) => {
    if (newTask) {
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, tasks: [...user.tasks, newTask] } 
          : user
      ));
      setNewTask('');
      setSelectedUser(null);
    }
  };

  //Opens the action menu for a specific user
  
  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  // Closes the currently open action menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuUserId(null);
  };

  // Prepares the selected user for task assignment via menu
  const handleAssignTask = () => {
    setSelectedUser(menuUserId);
    handleMenuClose();
  };

  // Removes the selected user from the users list
  const handleRemoveUser = () => {
    setUsers(users.filter(user => user.id !== menuUserId));
    handleMenuClose();
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#000000' // Pure black background
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
          <Typography variant="h6"> 
            👑 Admin Panel
          </Typography>
        </Box>
        
        {/* Sidebar Menu Items */}
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={{ 
                  color: '#fff',
                  backgroundColor: item.name === 'Teams & Users' ? '#1a1a1a' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#1a1a1a'
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
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            color: '#fff',
            fontWeight: 500
          }}>
            <TeamsIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
              color: '#f4c10f' // Gold accent
            }} />
            Teams & Users
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'rgba(255, 255, 255, 0.8)' // Slightly muted white
          }}>
            Manage your team members and assign tasks
          </Typography>
        </Box>

        {/* Invite User Card */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              backgroundColor: '#0a0a0a', // Dark gray card
              border: '1px solid #222' // Subtle border
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fff',
                  mb: 2,
                  fontWeight: 500
                }}>
                  Invite New User
                </Typography>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    InputProps={{
                      style: { color: '#fff' },
                      startAdornment: <EmailIcon sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        mr: 1 
                      }} />,
                      sx: {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)'
                        }
                      }
                    }}
                  />
                  <Button 
                    variant="contained" 
                    startIcon={<GroupAddIcon />}
                    onClick={handleInviteUser}
                    sx={{
                      backgroundColor: '#f4c10f', // Gold button
                      color: '#000',
                      '&:hover': {
                        backgroundColor: '#d1a20b' // Darker gold on hover
                      }
                    }}
                  >
                    Invite
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Users Table */}
        <Card sx={{ 
          backgroundColor: '#0a0a0a',
          border: '1px solid #222'
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ 
              color: '#fff',
              mb: 2,
              fontWeight: 500
            }}>
              Team Members
            </Typography>
            <TableContainer component={Paper} sx={{ 
              backgroundColor: 'transparent',
              border: '1px solid #222'
            }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Role</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Team</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Tasks</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow 
                      key={user.id}
                      sx={{ 
                        '&:hover': {
                          backgroundColor: '#1a1a1a' // Hover effect
                        }
                      }}
                    >
                      <TableCell sx={{ color: '#fff' }}>{user.name}</TableCell>
                      <TableCell sx={{ color: '#fff' }}>{user.email}</TableCell>
                      <TableCell sx={{ color: '#fff' }}>
                        {/* Role Select Dropdown */}
                        <FormControl fullWidth size="small">
                          <Select
                            value={user.role}
                            onChange={(e) => setUsers(users.map(u => 
                              u.id === user.id ? { ...u, role: e.target.value } : u
                            ))}
                            sx={{ 
                              color: '#fff',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #333',
                              '& .MuiSvgIcon-root': {
                                color: '#fff'
                              }
                            }}
                          >
                            <MenuItem value="Admin" sx={{ color: '#fff' }}>Admin</MenuItem>
                            <MenuItem value="Project Manager" sx={{ color: '#fff' }}>Project Manager</MenuItem>
                            <MenuItem value="Developer" sx={{ color: '#fff' }}>Developer</MenuItem>
                            <MenuItem value="Designer" sx={{ color: '#fff' }}>Designer</MenuItem>
                            <MenuItem value="Member" sx={{ color: '#fff' }}>Member</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell sx={{ color: '#fff' }}>
                        {/* Team Select Dropdown */}
                        <FormControl fullWidth size="small">
                          <Select
                            value={user.team}
                            onChange={(e) => setUsers(users.map(u => 
                              u.id === user.id ? { ...u, team: e.target.value } : u
                            ))}
                            sx={{ 
                              color: '#fff',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #333',
                              '& .MuiSvgIcon-root': {
                                color: '#fff'
                              }
                            }}
                          >
                            {teams.map((team) => (
                              <MenuItem key={team} value={team} sx={{ color: '#fff' }}>
                                {team}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell sx={{ color: '#fff' }}>
                        {/* Display tasks as chips */}
                        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                          {user.tasks.map((task, index) => (
                            <Chip 
                              key={index} 
                              label={task} 
                              size="small"
                              sx={{ 
                                color: '#fff', 
                                backgroundColor: '#333',
                                mb: 0.5,
                                mr: 0.5
                              }}
                            />
                          ))}
                        </Stack>
                        {/* Task input field when user is selected */}
                        {selectedUser === user.id && (
                          <Stack direction="row" spacing={1}>
                            <TextField
                              size="small"
                              placeholder="Add task"
                              value={newTask}
                              onChange={(e) => setNewTask(e.target.value)}
                              sx={{ 
                                '& .MuiInputBase-input': { color: '#fff' },
                                backgroundColor: '#1a1a1a',
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.23)',
                                  },
                                },
                              }}
                            />
                            <Button 
                              size="small" 
                              variant="contained"
                              onClick={() => handleAddTask(user.id)}
                              sx={{ 
                                textTransform: 'none',
                                backgroundColor: '#f4c10f',
                                color: '#000',
                                '&:hover': {
                                  backgroundColor: '#d1a20b'
                                }
                              }}
                            >
                              Add
                            </Button>
                          </Stack>
                        )}
                      </TableCell>
                      <TableCell>
                        {/* Action menu button */}
                        <IconButton 
                          onClick={(e) => handleMenuOpen(e, user.id)}
                          sx={{ color: '#fff' }}
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
      </Box>

      {/* Action Menu (dropdown) */}
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
        <MenuItem onClick={handleAssignTask} sx={{ '&:hover': { backgroundColor: '#1a1a1a' } }}>
          <AssignmentIcon sx={{ mr: 1, color: '#f4c10f' }} /> Assign Task
        </MenuItem>
        <MenuItem onClick={handleRemoveUser} sx={{ '&:hover': { backgroundColor: '#1a1a1a' } }}>
          <PeopleIcon sx={{ mr: 1, color: '#f44336' }} /> Remove User
        </MenuItem>
      </Menu>
    </Box>
  );
}