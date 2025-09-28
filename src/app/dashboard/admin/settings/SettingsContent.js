// This file combines logic and styles for the settings screen.
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography, Button, Card, CardContent, Stack, Avatar, List,
  ListItem, ListItemButton, ListItemText, Drawer, Grid, Chip, IconButton,
  TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, FormControl, Select, MenuItem, CircularProgress
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SaveIcon from '@mui/icons-material/Save';
import {
  Settings as SettingsIcon, Backup as BackupIcon, Cached as CachedIcon,
  RestartAlt as RestartAltIcon, DeleteForever as DeleteForeverIcon, Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon, Person as UserIcon, Engineering as EngineerIcon,
  Visibility as ViewIcon, Edit as EditIcon, Block as NoneIcon, CheckCircle as FullIcon
} from '@mui/icons-material';
import { Snackbar, Alert } from '@mui/material';

import { styles } from './styles';
import { useSettings } from './useSettings/page';

export default function SystemSettings() {
  const supabase = createSupabaseClient();
  const { 
    settingsCategories, menu, roles, setRoles,
    isLoading, handleConfigure, handleMaintenance, handleSavePermissions
  } = useSettings();

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [selectedRole, setSelectedRole] = useState('admin');
  
  const permissionLevels = [
    { value: 'Full', label: 'Full Access', icon: <FullIcon />, color: '#2e7d32' },
    { value: 'Edit', label: 'Can Edit', icon: <EditIcon />, color: '#ed6c02' },
    { value: 'View', label: 'View Only', icon: <ViewIcon />, color: '#0288d1' },
    { value: 'None', label: 'No Access', icon: <NoneIcon />, color: '#d32f2f' }
  ];

  const roleIcons = {
    admin: <AdminIcon />,
    auditor: <EngineerIcon />,
    client: <UserIcon />
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  
  const handlePermissionChange = (roleName, category, newLevel) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.name === roleName 
          ? { ...role, permissions: { ...role.permissions, [category]: newLevel } }
          : role
      )
    );
  };

  const handleSave = async () => {
    const { success, message } = await handleSavePermissions();
    showSnackbar(message, success ? 'success' : 'error');
  };

  const handleMaintenanceWithMessage = (action) => {
    const messages = {
      'Backup Database': { msg: 'Database backup initiated...', sev: 'info' },
      'Clear Cache': { msg: 'Cache cleared successfully!', sev: 'success' },
      'Reset All Settings': { msg: 'All settings reset to default.', sev: 'warning' },
      'Purge Test Data': { msg: 'Test data purged successfully!', sev: 'success' }
    };
    const { msg, sev } = messages[action] || { msg: 'Action completed.', sev: 'info' };
    showSnackbar(msg, sev);
    handleMaintenance(action);
  };

  const handleConfigureWithMessage = (category) => {
    showSnackbar(`Configuring ${category}...`, 'info');
    handleConfigure(category);
  };

  const selectedRoleData = roles.find(r => r.name === selectedRole);

  return (
    <Box sx={styles.mainContainer}>
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard" passHref><IconButton sx={{ color: 'green' }}><DashboardIcon /></IconButton></Link>
          <Typography variant="h5" sx={{ color: '#fefae0'}}>Admin Portal</Typography>
        </Box>
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} href={item.path} sx={styles.sidebarListItemButton(item.name)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <Image src="/toroLogo.jpg" alt="User Profile" width={40} height={40} style={{ borderRadius: '50%', border: '2px solid #f3722c' }} />
                <Box sx={{ minWidth: 0 }}>
                    <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>{currentUser?.email}</Typography>
                    <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>Admin</Typography>
                </Box>
            </Box>
            <Button onClick={handleLogout} fullWidth variant="outlined" startIcon={<LogoutIcon />} sx={{ color: '#fefae0', borderColor: '#fefae0', '&:hover': { background: '#6b705c' } }}>
                Logout
            </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={styles.mainContent}>
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}><SettingsIcon sx={styles.headerIcon} />System Settings</Typography>
          <Typography variant="body1" sx={{ color: '#525252' }}>Configure application-wide preferences and options</Typography>
        </Box>

        <Grid container spacing={3}>
          {settingsCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={styles.settingsCard}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Avatar sx={styles.settingsAvatar}><Box sx={{ color: '#525252' }}>{category.icon}</Box></Avatar>
                    <Box><Typography variant="h6" sx={styles.settingsCardTitle}>{category.name}</Typography><Chip label={category.status} size="small" sx={styles.statusChip(category.status)} /></Box>
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#525252', mb: 2 }}>{category.description}</Typography>
                  <Button variant="outlined" startIcon={<EditIcon />} fullWidth onClick={() => handleConfigureWithMessage(category.name)} sx={styles.configureButton}>Configure</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={styles.pageTitle}>Permissions Management</Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>Manage role-based access control for your organization</Typography>
        </Box>

        <Card sx={styles.permissionsCard}>
          <CardContent>
            <Typography variant="h6" sx={styles.permissionsCardHeader}>Role Permissions</Typography>
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                <TableHead sx={styles.tableHead}><TableRow><TableCell sx={styles.tableHeaderCell}>Role</TableCell><TableCell sx={styles.tableHeaderCell}>Projects</TableCell><TableCell sx={styles.tableHeaderCell}>Clients</TableCell><TableCell sx={styles.tableHeaderCell}>Team</TableCell><TableCell sx={styles.tableHeaderCell}>Settings</TableCell></TableRow></TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow><TableCell colSpan={5} align="center"><CircularProgress /></TableCell></TableRow>
                  ) : (
                    roles.map((role) => (
                      <TableRow key={role.name} hover selected={selectedRole === role.name} onClick={() => setSelectedRole(role.name)} sx={styles.tableRow(selectedRole === role.name)}>
                        <TableCell sx={styles.tableCell}><Stack direction="row" alignItems="center" spacing={1} textTransform="capitalize">{roleIcons[role.name]}<Typography>{role.name}</Typography></Stack></TableCell>
                        {['Projects', 'Clients', 'Team', 'Settings'].map((category) => {
                          const permission = permissionLevels.find(p => p.value === role.permissions[category]);
                          return (
                            <TableCell key={category} sx={styles.tableCell}>
                              <FormControl fullWidth size="small">
                                <Select value={role.permissions[category]} onChange={(e) => handlePermissionChange(role.name, category, e.target.value)} sx={styles.selectInput(permission?.color)} renderValue={(selected) => (<Stack direction="row" alignItems="center" spacing={1}><Box sx={{ color: permission?.color }}>{permission?.icon}</Box><Typography sx={{ color: permission?.color }}>{selected}</Typography></Stack>)}>
                                  {permissionLevels.map((level) => (<MenuItem key={level.value} value={level.value} sx={styles.selectMenuItem(level)}><Stack direction="row" alignItems="center" spacing={1}><Box sx={{ color: level.color }}>{level.icon}</Box><Typography sx={{ color: '#283618' }}>{level.label}</Typography></Stack></MenuItem>))}
                                </Select>
                              </FormControl>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Box sx={styles.saveButtonContainer}>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} sx={styles.saveButton} disabled={isLoading}>Save Permissions</Button>
        </Box>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={snackbarSeverity} sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.1rem' }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}