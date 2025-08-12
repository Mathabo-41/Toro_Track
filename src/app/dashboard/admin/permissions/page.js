'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  FormControl,
  MenuItem
} from '@mui/material';
import {
  Lock as LockIcon,
  AdminPanelSettings as AdminIcon,
  Groups as TeamIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  CheckCircle as FullIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Block as NoneIcon
} from '@mui/icons-material';

/**
 * Admin Permission Settings Screen
 * Manages role-based access control (RBAC) for the CRM system
 */

const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

// Permission level configurations
const permissionLevels = [
  { value: 'Full', label: 'Full Access', icon: <FullIcon />, color: '#4caf50' },
  { value: 'Edit', label: 'Edit Access', icon: <EditIcon />, color: '#2196f3' },
  { value: 'View', label: 'View Access', icon: <ViewIcon />, color: '#9e9e9e' },
  { value: 'None', label: 'No Access', icon: <NoneIcon />, color: '#f44336' }
];

// Default role configurations
const defaultRoles = [
  { 
    name: 'Admin', 
    icon: <AdminIcon sx={{ color: '#f4c10f' }} />,
    permissions: {
      Projects: 'Full',
      Clients: 'Full',
      Team: 'Full',
      Settings: 'Full'
    }
  },
  { 
    name: 'Project Manager', 
    icon: <PersonIcon sx={{ color: '#2196f3' }} />,
    permissions: {
      Projects: 'Full',
      Clients: 'Edit',
      Team: 'Edit',
      Settings: 'View'
    }
  },
  { 
    name: 'Team Lead', 
    icon: <TeamIcon sx={{ color: '#4caf50' }} />,
    permissions: {
      Projects: 'Edit',
      Clients: 'View',
      Team: 'Edit',
      Settings: 'None'
    }
  },
  { 
    name: 'Member', 
    icon: <PersonIcon sx={{ color: '#9e9e9e' }} />,
    permissions: {
      Projects: 'View',
      Clients: 'View',
      Team: 'View',
      Settings: 'None'
    }
  },
  { 
    name: 'Client', 
    icon: <PersonIcon sx={{ color: '#ff9800' }} />,
    permissions: {
      Projects: 'View',
      Clients: 'None',
      Team: 'None',
      Settings: 'None'
    }
  }
];

export default function PermissionSettings() {
  const router = useRouter();
  const [roles, setRoles] = useState(defaultRoles);
  const [selectedRole, setSelectedRole] = useState('Admin');

  // Handle permission level changes
  const handlePermissionChange = (roleName, category, value) => {
    setRoles(roles.map(role => 
      role.name === roleName 
        ? { 
            ...role, 
            permissions: { 
              ...role.permissions, 
              [category]: value 
            } 
          } 
        : role
    ));
  };

  const handleSave = () => {
    alert('Permissions saved successfully!');
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      minWidth: '90vw',
      backgroundColor: '#fefae0',
      color: '#525252'
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
            borderRight: '1px solid #222',
            color: '#fefae0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }}
      >
        <Box>
          <Box sx={{ p: 2, borderBottom: '2px solid #6b705c', fontWeight: 'bold', color: '#fefae0'}}>
            <Typography variant="h5">
              Admin Portal
            </Typography>
          </Box>
          <List>
            {adminMenu.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton 
                  component={Link} 
                  href={item.path}
                  sx={{ 
                    color: '#fefae0',
                    backgroundColor: item.name === 'Permissions' ? '#6b705c' : 'transparent',
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

      {/* Main Content */}
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
            <LockIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
              color: '#f3722c'
            }} />
            Permissions
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#525252'
          }}>
            Manage role-based access control for your organization
          </Typography>
        </Box>

        {/* Permissions Table */}
        <Card sx={{ 
          backgroundColor: '#fefae0',
          mb: 3,
          border: '1px solid #525252'
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ 
              color: '#525252',
              mb: 2,
              fontWeight: 500
            }}>
              Role Permissions
            </Typography>
            <TableContainer component={Paper} sx={{ 
              backgroundColor: 'transparent',
              border: '2px solid #525252'
            }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#283618' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Role</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Projects</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Clients</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Team</TableCell>
                    <TableCell sx={{ color: '#fefae0', fontWeight: 'bold' }}>Settings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow 
                      key={role.name} 
                      hover 
                      selected={selectedRole === role.name}
                      onClick={() => setSelectedRole(role.name)}
                      sx={{ 
                        '&:hover': { backgroundColor: '#e0e0d1' },
                        cursor: 'pointer',
                        backgroundColor: selectedRole === role.name ? '#e0e0d1' : 'transparent'
                      }}
                    >
                      <TableCell sx={{ color: '#283618' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {role.icon}
                          <Typography>{role.name}</Typography>
                        </Stack>
                      </TableCell>
                      {['Projects', 'Clients', 'Team', 'Settings'].map((category) => {
                        const level = role.permissions[category];
                        const permission = permissionLevels.find(p => p.value === level);
                        return (
                          <TableCell key={category} sx={{ color: '#283618' }}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={level}
                                onChange={(e) => handlePermissionChange(role.name, category, e.target.value)}
                                sx={{ 
                                  color: permission.color,
                                  backgroundColor: '#fefae0',
                                  border: '1px solid #525252',
                                  '& .MuiSvgIcon-root': {
                                    color: '#283618'
                                  }
                                }}
                                renderValue={(selected) => (
                                  <Stack direction="row" alignItems="center" spacing={1}>
                                    <Box sx={{ color: permission.color }}>
                                      {permission.icon}
                                    </Box>
                                    <Typography sx={{ color: permission.color }}>
                                      {selected}
                                    </Typography>
                                  </Stack>
                                )}
                              >
                                {permissionLevels.map((level) => (
                                  <MenuItem 
                                    key={level.value} 
                                    value={level.value}
                                    sx={{ 
                                      color: level.color,
                                      backgroundColor: '#fefae0',
                                      '&:hover': {
                                        backgroundColor: '#6b705c',
                                        color: '#fefae0'
                                      }
                                    }}
                                  >
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                      <Box sx={{ color: level.color }}>
                                        {level.icon}
                                      </Box>
                                      <Typography sx={{ color: '#283618' }}>{level.label}</Typography>
                                    </Stack>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Selected Role Details */}
        {selectedRole && (
          <Card sx={{ 
            backgroundColor: '#fefae0',
            mb: 3,
            border: '1px solid #525252'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                color: '#525252',
                mb: 2,
                fontWeight: 500
              }}>
                {selectedRole} Permissions Summary
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(roles.find(r => r.name === selectedRole).permissions).map(([category, level]) => {
                  const permission = permissionLevels.find(p => p.value === level);
                  return (
                    <Grid item xs={12} sm={6} md={3} key={category}>
                      <Card sx={{ 
                        backgroundColor: '#fefae0',
                        border: '1px solid #525252',
                        height: '100%'
                      }}>
                        <CardContent>
                          <Typography variant="subtitle1" sx={{ 
                            color: '#525252', 
                            mb: 1,
                            fontWeight: 500
                          }}>
                            {category}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Avatar sx={{ 
                              backgroundColor: `${permission.color}20`,
                              color: permission.color,
                              width: 32,
                              height: 32
                            }}>
                              {permission.icon}
                            </Avatar>
                            <Typography sx={{ 
                              color: permission.color, 
                              fontWeight: 'bold'
                            }}>
                              {permission.label}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" sx={{ 
                            color: '#525252'
                          }}>
                            {level === 'Full' && 'Can create, edit, delete, and view all content'}
                            {level === 'Edit' && 'Can edit and view existing content'}
                            {level === 'View' && 'Can view content only'}
                            {level === 'None' && 'No access to this section'}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{
              backgroundColor: '#283618',
              color: '#fefae0',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#606c38'
              }
            }}
          >
            Save Permissions
          </Button>
        </Box>
      </Box>
    </Box>
  );
}