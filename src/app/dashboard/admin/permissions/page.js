/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
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
  Save as SaveIcon,
} from '@mui/icons-material';

// Import local files
import { styles } from './styles';
import { usePermissions } from './usePermissions/page';
import { adminMenuData } from './permissionsService/page';

// Main Component
// ------------------------------------------------
export default function PermissionSettings() {
  // Region: Hooks and State
  // ------------------------------------------------
  const {
    roles,
    selectedRole,
    setSelectedRole,
    permissionLevels,
    handlePermissionChange,
    handleSave,
  } = usePermissions();
  
  // Region: Render
  // ------------------------------------------------
  return (
    <Box sx={styles.mainContainer}>
      {/* Region: Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={styles.sidebarHeader}>
          <Typography variant="h5">
            Admin Portal
          </Typography>
        </Box>
        <List>
          {adminMenuData.map((item, index) => (
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

      {/* Region: Main Content */}
      <Box component="main" sx={styles.mainContent}>
        {/* Page Header */}
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}>
            <LockIcon sx={styles.headerIcon} />
            Permissions
          </Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>
            Manage role-based access control for your organization
          </Typography>
        </Box>

        {/* Permissions Table */}
        <Card sx={styles.permissionsCard}>
          <CardContent>
            <Typography variant="h6" sx={styles.permissionsCardHeader}>
              Role Permissions
            </Typography>
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                <TableHead sx={styles.tableHead}>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCell}>Role</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Projects</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Clients</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Team</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Settings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow
                      key={role.name}
                      hover
                      selected={selectedRole === role.name}
                      onClick={() => setSelectedRole(role.name)}
                      sx={styles.tableRow(selectedRole === role.name)}
                    >
                      <TableCell sx={styles.tableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {role.icon}
                          <Typography>{role.name}</Typography>
                        </Stack>
                      </TableCell>
                      {['Projects', 'Clients', 'Team', 'Settings'].map((category) => {
                        const level = role.permissions[category];
                        const permission = permissionLevels.find(p => p.value === level);
                        return (
                          <TableCell key={category} sx={styles.tableCell}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={level}
                                onChange={(e) => handlePermissionChange(role.name, category, e.target.value)}
                                sx={styles.selectInput(permission.color)}
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
                                    sx={styles.selectMenuItem(level)}
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
          <Card sx={styles.summaryCard}>
            <CardContent>
              <Typography variant="h6" sx={styles.summaryCardHeader}>
                {selectedRole} Permissions Summary
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(roles.find(r => r.name === selectedRole).permissions).map(([category, level]) => {
                  const permission = permissionLevels.find(p => p.value === level);
                  return (
                    <Grid item xs={12} sm={6} md={3} key={category}>
                      <Card sx={styles.summaryCard}>
                        <CardContent>
                          <Typography variant="subtitle1" sx={styles.summaryCardTitle}>
                            {category}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Avatar sx={styles.permissionIconAvatar(permission.color)}>
                              {permission.icon}
                            </Avatar>
                            <Typography sx={styles.permissionText(permission.color)}>
                              {permission.label}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" sx={{ color: '#525252' }}>
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
        <Box sx={styles.saveButtonContainer}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={styles.saveButton}
          >
            Save Permissions
          </Button>
        </Box>
      </Box>
    </Box>
  );
}