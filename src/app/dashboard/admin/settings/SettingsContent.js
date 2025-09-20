/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Button, Card,
  CardContent, Stack, Avatar, List,
  ListItem, ListItemButton, ListItemText,
  Drawer, Grid, Chip, IconButton,
  TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, FormControl, Select, MenuItem
} from '@mui/material';

// Dashboard icon import 
import DashboardIcon from '@mui/icons-material/Dashboard';
import SaveIcon from '@mui/icons-material/Save';

import {
  Settings as SettingsIcon,
  Backup as BackupIcon,
  Cached as CachedIcon,
  RestartAlt as RestartAltIcon,
  DeleteForever as DeleteForeverIcon,
  Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon,
  Person as UserIcon,
  Engineering as EngineerIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Block as NoneIcon,
  CheckCircle as FullIcon
} from '@mui/icons-material';

// Snack bar 
import { Snackbar, Alert } from '@mui/material';

// Import local files
import { styles } from './styles';
import { useSettings } from './useSettings/page';

// Main Component
// ------------------------------------------------
export default function SystemSettings() {
  // Region: Hooks and State
  // ------------------------------------------------
  const { settingsCategories, menu, handleConfigure, handleMaintenance } = useSettings();

  // State for sidebar
  const [sidebarOpen] = React.useState(true);

  // Router for redirection/navigation
  const router = useRouter();
  
  // Snack-bar states for different actions
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('info');

  // Permissions state
  const [selectedRole, setSelectedRole] = React.useState('Administrator');
  const [roles, setRoles] = React.useState([
    {
      name: 'Administrator',
      icon: <AdminIcon />,
      permissions: {
        Projects: 'Full',
        Clients: 'Full',
        Team: 'Full',
        Settings: 'Full'
      }
    },
    {
      name: 'Auditor',
      icon: <EngineerIcon />,
      permissions: {
        Projects: 'Edit',
        Clients: 'Edit',
        Team: 'View',
        Settings: 'View'
      }
    },
    {
      name: 'Client',
      icon: <UserIcon />,
      permissions: {
        Projects: 'View',
        Clients: 'View',
        Team: 'None',
        Settings: 'None'
      }
    }
  ]);

  // Permission levels
  const permissionLevels = [
    {
      value: 'Full',
      label: 'Full Access',
      icon: <FullIcon />,
      color: '#2e7d32'
    },
    {
      value: 'Edit',
      label: 'Can Edit',
      icon: <EditIcon />,
      color: '#ed6c02'
    },
    {
      value: 'View',
      label: 'View Only',
      icon: <ViewIcon />,
      color: '#0288d1'
    },
    {
      value: 'None',
      label: 'No Access',
      icon: <NoneIcon />,
      color: '#d32f2f'
    }
  ];

  // Function to show snackbar message
  const showSnackbar = (message, severity = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Function to handle the logout action with snackbar and redirect to the login page
  const handleLogout = () => {
    showSnackbar('Logging out...', 'info');
    setTimeout(() => {
      router.push('/login');
    }, 1500); // Snackbar will redirect after 1.5 seconds.
  };

  // Handle permission changes
  const handlePermissionChange = (roleName, category, newLevel) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.name === roleName 
          ? { ...role, permissions: { ...role.permissions, [category]: newLevel } }
          : role
      )
    );
  };

  // Handle save permissions
  const handleSave = () => {
    // Add your save logic here
    console.log('Saving permissions:', roles);
    showSnackbar('Permissions saved successfully!', 'success');
    // Show success message or handle errors
  };

  // Handle maintenance actions with appropriate messages
  const handleMaintenanceWithMessage = (action) => {
    let message = '';
    let severity = 'info';
    
    switch(action) {
      case 'Backup Database':
        message = 'Database backup initiated...';
        severity = 'info';
        break;
      case 'Clear Cache':
        message = 'Cache cleared successfully!';
        severity = 'success';
        break;
      case 'Reset All Settings':
        message = 'All settings have been reset to default.';
        severity = 'warning';
        break;
      case 'Purge Test Data':
        message = 'Test data purged successfully!';
        severity = 'success';
        break;
      default:
        message = 'Action completed.';
    }
    
    showSnackbar(message, severity);
    handleMaintenance(action); // Call the original function
  };

  // Handle configuration actions with appropriate messages
  const handleConfigureWithMessage = (category) => {
    showSnackbar(`Configuring ${category}...`, 'info');
    handleConfigure(category); // Call the original function
  };

  // Region: Render
  // ------------------------------------------------
  return (
    <Box sx={styles.mainContainer}>
      {/* Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={{ 
          p: 1,
          borderBottom: '2px solid #6b705c',
          display: 'flex', 
          alignItems: 'center', 
          gap: 1 
        }}>
          <Link href="/dashboard" passHref>
            <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
              <DashboardIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" sx={{ color: '#fefae0'}}>
            Admin Portal
          </Typography>
        </Box>
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={styles.sidebarListItemButton(item.name)}
                onMouseEnter={() => router.prefetch(item.path)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Region: User Profile Section */}
        <Box sx={{
          padding: '1rem',
          borderTop: '2px solid #6b705c',
          marginTop: 'auto'
        }}>
          {/* User Profile Container */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
            {/* Profile Picture */}
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

            {/* User Details (shown when sidebar is open) */}
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                {/* User Name */}
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
                
                {/* User Email */}
                <Typography sx={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.8, 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgba(254, 250, 224, 0.7)'
                }}>
                  user@toro.com
                </Typography>
              </Box>
            )}
          </Box>

          {/* Logout Button */}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              '&:hover': {
                background: '#6b705c'
              }
            }}
          >
            {sidebarOpen ? 'Logout' : <LogoutIcon />}
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={styles.mainContent}>
        {/* Page Header */}
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}>
            <SettingsIcon sx={styles.headerIcon} />
            System Settings
          </Typography>
          <Typography variant="body1" sx={{ color: '#525252' }}>
            Configure application-wide preferences and options
          </Typography>
        </Box>

        {/* Settings Cards */}
        <Grid container spacing={3}>
          {settingsCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={styles.settingsCard}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Avatar sx={styles.settingsAvatar}>
                      <Box sx={{ color: '#525252' }}>
                        {category.icon}
                      </Box>
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={styles.settingsCardTitle}>
                        {category.name}
                      </Typography>
                      <Chip
                        label={category.status}
                        size="small"
                        sx={styles.statusChip(category.status)}
                      />
                    </Box>
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#525252', mb: 2 }}>
                    {category.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    fullWidth
                    onClick={() => handleConfigureWithMessage(category.name)}
                    sx={styles.configureButton}
                  >
                    Configure
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Permissions Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={styles.pageTitle}>
            Permissions Management
          </Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>
            Manage role-based access control for your organization
          </Typography>
        </Box>

        {/* Permissions Table Section */}
        <Card sx={styles.permissionsCard}>
          <CardContent>
            <Typography variant="h6" sx={styles.permissionsCardHeader}>
              Role Permissions
            </Typography>
            
            {/* Permissions Table */}
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                {/* Table Header */}
                <TableHead sx={styles.tableHead}>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCell}>Role</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Projects</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Clients</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Team</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Settings</TableCell>
                  </TableRow>
                </TableHead>
                
                {/* Table Body */}
                <TableBody>
                  {roles.map((role) => (
                    <TableRow
                      key={role.name}
                      hover
                      selected={selectedRole === role.name}
                      onClick={() => setSelectedRole(role.name)}
                      sx={styles.tableRow(selectedRole === role.name)}
                    >
                      {/* Role Name Cell */}
                      <TableCell sx={styles.tableCell}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {role.icon}
                          <Typography>{role.name}</Typography>
                        </Stack>
                      </TableCell>
                      
                      {/* Permission Level Cells */}
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

        {/* Selected Role Details Section */}
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

        {/* Save Button Section */}
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

        {/* System Actions with High Contrast */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={styles.maintenanceCard}>
              <CardContent>
                <Typography variant="h6" sx={styles.maintenanceTitle}>
                  System Maintenance
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<BackupIcon />}
                    fullWidth
                    onClick={() => handleMaintenanceWithMessage('Backup Database')}
                    sx={styles.backupButton}
                  >
                    Backup Database
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CachedIcon />}
                    fullWidth
                    onClick={() => handleMaintenanceWithMessage('Clear Cache')}
                    sx={styles.clearCacheButton}
                  >
                    Clear Cache
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={styles.dangerousCard}>
              <CardContent>
                <Typography variant="h6" sx={styles.dangerousTitle}>
                  Dangerous Zone
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    fullWidth
                    onClick={() => handleMaintenanceWithMessage('Reset All Settings')}
                    sx={styles.resetButton}
                  >
                    Reset All Settings
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DeleteForeverIcon />}
                    fullWidth
                    onClick={() => handleMaintenanceWithMessage('Purge Test Data')}
                    sx={styles.purgeButton}
                  >
                    Purge Test Data
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Single Snackbar component to handle all messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%', 
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}