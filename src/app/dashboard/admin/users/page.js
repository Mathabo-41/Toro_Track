'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
  FormControl,
  InputAdornment
} from '@mui/material';
// Import Material-UI icons
import {
  People as PeopleIcon,
  Groups as TeamsIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Email as EmailIcon,
  Assignment as AssignmentIcon,
  GroupAdd as GroupAddIcon,
  Search as SearchIcon,
  Lock as LockIcon
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
  const router = useRouter();
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

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      minWidth: '90vw',
      backgroundColor: '#fefae0'
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
            backgroundColor: '#283618',
            borderRight: '1px solid #222',
            color: '#fefae0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }}
      >
        <Box>
          {/* Sidebar Header */}
          <Box sx={{ p: 2, borderBottom: '2px solid #6b705c' }}>
            <Typography variant="h5"> 
              Admin Panel
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
                    color: '#fefae0',
                    backgroundColor: item.name === 'Teams & Users' ? '#6b705c' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#6b705c'
                    }
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* User Profile Section */}
        <Box sx={{ 
          borderTop: '2px solid #6b705c',
          padding: '1rem',
          marginTop: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }}>
          {/* User profile picture and details */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
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
            <Box sx={{ minWidth: 0 }}>
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
              <Typography sx={{ 
                fontSize: '0.8rem', 
                opacity: 0.8, 
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'rgba(254, 250, 224, 0.7)'
              }}>
                admin@toro.com
              </Typography>
            </Box>
          </Box>
          {/* Logout button */}
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
              '&:hover': {
                background: '#6b705c'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* ===== MAIN CONTENT AREA ===== */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: '#fefae0'
      }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            color: '#525252',
            fontWeight: 500
          }}>
            <TeamsIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
              color: '#f3722c'
            }} />
            Teams & Users
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#525252'
          }}>
            Manage your team members and assign tasks
          </Typography>
        </Box>

        {/* Invite User Card */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={12}>
            <Card sx={{ 
              backgroundColor: '#fefae0',
              border: '2px solid #525252'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#525252',
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
                      style: { color: '#525252' },
                      startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: '#525252' }} /></InputAdornment>,
                      sx: {
                        '& fieldset': {
                          borderColor: '#525252'
                        }
                      }
                    }}
                  />
                  <Button 
                    variant="contained" 
                    startIcon={<GroupAddIcon />}
                    onClick={handleInviteUser}
                    sx={{
                      backgroundColor: '#283618',
                      color: '#fefae0',
                      '&:hover': {
                        backgroundColor: '#606c38'
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
          backgroundColor: '#fefae0',
          border: '1px solid #525252'
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ 
              color: '#525252',
              mb: 2,
              fontWeight: 500
            }}>
              Team Members
            </Typography>
            <TableContainer component={Paper} sx={{ 
              backgroundColor: 'transparent',
              border: '2px solid #525252'
            }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#283618' }}>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Role</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Team</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Tasks</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow 
                      key={user.id}
                      sx={{ 
                        '&:hover': {
                          backgroundColor: '#e0e0d1'
                        }
                      }}
                    >
                      <TableCell sx={{ color: '#283618' }}>{user.name}</TableCell>
                      <TableCell sx={{ color: '#283618' }}>{user.email}</TableCell>
                      <TableCell sx={{ color: '#283618' }}>
                        {/* Role Select Dropdown */}
                        <FormControl fullWidth size="small">
                          <Select
                            value={user.role}
                            onChange={(e) => setUsers(users.map(u => 
                              u.id === user.id ? { ...u, role: e.target.value } : u
                            ))}
                            sx={{ 
                              color: '#283618',
                              backgroundColor: '#fefae0',
                              border: '1px solid #525252',
                              '& .MuiSvgIcon-root': {
                                color: '#283618'
                              }
                            }}
                          >
                            <MenuItem value="Admin" sx={{ color: '#283618' }}>Admin</MenuItem>
                            <MenuItem value="Project Manager" sx={{ color: '#283618' }}>Project Manager</MenuItem>
                            <MenuItem value="Developer" sx={{ color: '#283618' }}>Developer</MenuItem>
                            <MenuItem value="Designer" sx={{ color: '#283618' }}>Designer</MenuItem>
                            <MenuItem value="Member" sx={{ color: '#283618' }}>Member</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell sx={{ color: '#283618' }}>
                        {/* Team Select Dropdown */}
                        <FormControl fullWidth size="small">
                          <Select
                            value={user.team}
                            onChange={(e) => setUsers(users.map(u => 
                              u.id === user.id ? { ...u, team: e.target.value } : u
                            ))}
                            sx={{ 
                              color: '#283618',
                              backgroundColor: '#fefae0',
                              border: '1px solid #525252',
                              '& .MuiSvgIcon-root': {
                                color: '#283618'
                              }
                            }}
                          >
                            {teams.map((team) => (
                              <MenuItem key={team} value={team} sx={{ color: '#283618' }}>
                                {team}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell sx={{ color: '#283618' }}>
                        {/* Display tasks as chips */}
                        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                          {user.tasks.map((task, index) => (
                            <Chip 
                              key={index} 
                              label={task} 
                              size="small"
                              sx={{ 
                                color: '#fefae0', 
                                backgroundColor: '#6b705c',
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
                                '& .MuiInputBase-input': { color: '#283618' },
                                backgroundColor: '#fefae0',
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: '#525252',
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
                                backgroundColor: '#283618',
                                color: '#fefae0',
                                '&:hover': {
                                  backgroundColor: '#606c38'
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
                          sx={{ color: '#283618' }}
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
            backgroundColor: '#fefae0',
            color: '#283618',
            border: '2px solid #283618',
            minWidth: '200px'
          }
        }}
      >
        <MenuItem onClick={handleAssignTask} sx={{ '&:hover': { backgroundColor: '#606c38' } }}>
          <AssignmentIcon sx={{ mr: 1, color: '#f3722c' }} /> Assign Task
        </MenuItem>
        <MenuItem onClick={handleRemoveUser} sx={{ '&:hover': { backgroundColor: '#606c38' } }}>
          <PeopleIcon sx={{ mr: 1, color: '#f44336' }} /> Remove User
        </MenuItem>
      </Menu>
    </Box>
  );
}