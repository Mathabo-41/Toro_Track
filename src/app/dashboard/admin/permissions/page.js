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
  permissionsCard,
  tableContainer,
  tableHead,
  tableHeaderCell,
  tableRow,
  tableCell,
  roleIconStack,
  roleSelect,
  permissionMenuItem,
  permissionChip,
  summaryCard,
  summaryCardContent,
  summaryIconAvatar,
  saveButtonBox,
  saveButton,
} from '.admin_styles/styles';

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
  { value: 'Full', label: 'Full Access', icon: <FullIcon />, color: 'success' },
  { value: 'Edit', label: 'Edit Access', icon: <EditIcon />, color: 'info' },
  { value: 'View', label: 'View Access', icon: <ViewIcon />, color: 'default' },
  { value: 'None', label: 'No Access', icon: <NoneIcon />, color: 'error' }
];

// Default role configurations
const defaultRoles = [
  { 
    name: 'Admin', 
    icon: <AdminIcon color="warning" />,
    permissions: {
      Projects: 'Full',
      Clients: 'Full',
      Team: 'Full',
      Settings: 'Full'
    }
  },
  { 
    name: 'Project Manager', 
    icon: <PersonIcon color="info" />,
    permissions: {
      Projects: 'Full',
      Clients: 'Edit',
      Team: 'Edit',
      Settings: 'View'
    }
  },
  { 
    name: 'Team Lead', 
    icon: <TeamIcon color="success" />,
    permissions: {
      Projects: 'Edit',
      Clients: 'View',
      Team: 'Edit',
      Settings: 'None'
    }
  },
  { 
    name: 'Member', 
    icon: <PersonIcon color="text.secondary" />,
    permissions: {
      Projects: 'View',
      Clients: 'View',
      Team: 'View',
      Settings: 'None'
    }
  },
  { 
    name: 'Client', 
    icon: <PersonIcon color="warning" />,
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
          <Typography variant="h5">
            Admin Portal
          </Typography>
        </Box>
        <List>
          {adminMenu.map(({ name, path }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={path}
                sx={name === 'Permissions' ? activeListItemButton : listItemButton}
              >
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={mainContentBox}>
        {/* Page Header */}
        <Box sx={pageHeader}>
          <Typography variant="h4" sx={pageHeaderText}>
            <LockIcon sx={pageHeaderIcon} />
            Permissions
          </Typography>
          <Typography variant="body1" sx={pageHeaderText}>
            Manage role-based access control for your organization
          </Typography>
        </Box>

        {/* Permissions Table */}
        <Card sx={permissionsCard}>
          <CardContent>
            <Typography variant="h6" sx={pageHeaderText}>
              Role Permissions
            </Typography>
            <TableContainer component={Paper} sx={tableContainer}>
              <Table>
                <TableHead sx={tableHead}>
                  <TableRow>
                    <TableCell sx={tableHeaderCell}>Role</TableCell>
                    <TableCell sx={tableHeaderCell}>Projects</TableCell>
                    <TableCell sx={tableHeaderCell}>Clients</TableCell>
                    <TableCell sx={tableHeaderCell}>Team</TableCell>
                    <TableCell sx={tableHeaderCell}>Settings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow 
                      key={role.name} 
                      hover 
                      selected={selectedRole === role.name}
                      onClick={() => setSelectedRole(role.name)}
                      sx={tableRow}
                    >
                      <TableCell sx={tableCell}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={roleIconStack}>
                          {role.icon}
                          <Typography>{role.name}</Typography>
                        </Stack>
                      </TableCell>
                      {['Projects', 'Clients', 'Team', 'Settings'].map((category) => {
                        const level = role.permissions[category];
                        const permission = permissionLevels.find(p => p.value === level);
                        return (
                          <TableCell key={category} sx={tableCell}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={level}
                                onChange={(e) => handlePermissionChange(role.name, category, e.target.value)}
                                sx={roleSelect(permission.color)}
                                renderValue={(selected) => (
                                  <Stack direction="row" alignItems="center" spacing={1}>
                                    <Box sx={permissionChip(permission.color)}>
                                      {permission.icon}
                                    </Box>
                                    <Typography color={permission.color}>
                                      {selected}
                                    </Typography>
                                  </Stack>
                                )}
                              >
                                {permissionLevels.map((level) => (
                                  <MenuItem 
                                    key={level.value} 
                                    value={level.value}
                                    sx={permissionMenuItem(level.color)}
                                  >
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                      <Box sx={permissionChip(level.color)}>
                                        {level.icon}
                                      </Box>
                                      <Typography sx={tableCell}>{level.label}</Typography>
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
          <Card sx={summaryCard}>
            <CardContent>
              <Typography variant="h6" sx={pageHeaderText}>
                {selectedRole} Permissions Summary
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(roles.find(r => r.name === selectedRole).permissions).map(([category, level]) => {
                  const permission = permissionLevels.find(p => p.value === level);
                  return (
                    <Grid item xs={12} sm={6} md={3} key={category}>
                      <Card sx={summaryCardContent}>
                        <CardContent>
                          <Typography variant="subtitle1" sx={pageHeaderText}>
                            {category}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Avatar sx={summaryIconAvatar(permission.color)}>
                              {permission.icon}
                            </Avatar>
                            <Typography color={permission.color} sx={{ fontWeight: 'bold' }}>
                              {permission.label}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" sx={tableCell}>
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
        <Box sx={saveButtonBox}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={saveButton}
          >
            Save Permissions
          </Button>
        </Box>
      </Box>
    </Box>
  );
}