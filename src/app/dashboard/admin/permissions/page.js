'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#000000',
      color: 'rgba(255, 255, 255, 0.92)'
    }}>
      {/* Sidebar Navigation - Pure black */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#000000',
            borderRight: '1px solid #222',
            color: '#fff'
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #222' }}>
          <Typography variant="h6">
            👑 Admin Panel
          </Typography>
        </Box>
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={{ 
                  color: '#fff',
                  backgroundColor: item.name === 'Permissions' ? '#1a1a1a' : 'transparent',
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

      {/* Main Content - Pure black */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: '#000000'
      }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            color: '#fff',
            fontWeight: 500
          }}>
            <LockIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
              color: '#f4c10f'
            }} />
            Permissions
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            Manage role-based access control for your organization
          </Typography>
        </Box>

        {/* Permissions Table */}
        <Card sx={{ 
          backgroundColor: '#0a0a0a',
          mb: 3,
          border: '1px solid #222'
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ 
              color: '#fff',
              mb: 2,
              fontWeight: 500
            }}>
              Role Permissions
            </Typography>
            <TableContainer component={Paper} sx={{ 
              backgroundColor: 'transparent',
              border: '1px solid #222'
            }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Role</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Projects</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Clients</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Team</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Settings</TableCell>
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
                        '&:hover': { backgroundColor: '#1a1a1a' },
                        cursor: 'pointer',
                        backgroundColor: selectedRole === role.name ? '#1a1a1a' : 'transparent'
                      }}
                    >
                      <TableCell sx={{ color: '#fff' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {role.icon}
                          <Typography>{role.name}</Typography>
                        </Stack>
                      </TableCell>
                      {['Projects', 'Clients', 'Team', 'Settings'].map((category) => {
                        const level = role.permissions[category];
                        const permission = permissionLevels.find(p => p.value === level);
                        return (
                          <TableCell key={category} sx={{ color: '#fff' }}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={level}
                                onChange={(e) => handlePermissionChange(role.name, category, e.target.value)}
                                sx={{ 
                                  color: permission.color,
                                  backgroundColor: '#1a1a1a',
                                  border: '1px solid #333',
                                  '& .MuiSvgIcon-root': {
                                    color: '#fff'
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
                                      backgroundColor: '#0a0a0a',
                                      '&:hover': {
                                        backgroundColor: '#1a1a1a'
                                      }
                                    }}
                                  >
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                      <Box sx={{ color: level.color }}>
                                        {level.icon}
                                      </Box>
                                      <Typography>{level.label}</Typography>
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
            backgroundColor: '#0a0a0a',
            mb: 3,
            border: '1px solid #222'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                color: '#fff',
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
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        height: '100%'
                      }}>
                        <CardContent>
                          <Typography variant="subtitle1" sx={{ 
                            color: '#fff', 
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
                            color: 'rgba(255, 255, 255, 0.7)'
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
              backgroundColor: '#f4c10f',
              color: '#000',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#d1a20b'
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