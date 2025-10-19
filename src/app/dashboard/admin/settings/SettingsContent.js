// ./SystemSettings.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography, Button, Card, CardContent, Stack, Avatar, List,
  ListItem, ListItemButton, ListItemText, Drawer, Grid, Chip,
  TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, FormControl, Select, MenuItem, CircularProgress,
  Snackbar, Alert, IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, Switch, FormControlLabel,
  LinearProgress, Stepper, Step, StepLabel, StepContent
} from '@mui/material';

import {
  Settings as SettingsIcon, Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon, Person as UserIcon, Engineering as EngineerIcon,
  Visibility as ViewIcon, Edit as EditIcon, Block as NoneIcon, CheckCircle as FullIcon,
  Dashboard as DashboardIcon, Save as SaveIcon,
  Security as SecurityIcon, Build as BuildIcon, Storage as StorageIcon,
  Notifications as NotificationsIcon, People as PeopleIcon,
  Backup as BackupIcon, Delete as DeleteIcon, Refresh as RefreshIcon,
  Schedule as ScheduleIcon, CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

import { useSettings } from './useSettings/page';
import { styles } from './styles';

export default function SystemSettings() {
  const supabase = createSupabaseClient();
  const router = useRouter();

  const { settingsCategories, menu, roles, setRoles, isLoading, handleConfigure, handleMaintenance, handleSavePermissions } = useSettings();

  const [currentUser, setCurrentUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openLogoutSnackbar, setOpenLogoutSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [selectedRole, setSelectedRole] = useState('admin');
  
  // Enhanced states for added functionality
  const [maintenanceDialog, setMaintenanceDialog] = useState(false);
  const [backupDialog, setBackupDialog] = useState(false);
  const [securityDialog, setSecurityDialog] = useState(false);
  const [maintenanceProgress, setMaintenanceProgress] = useState(0);
  const [backupProgress, setBackupProgress] = useState(0);
  const [activeMaintenanceStep, setActiveMaintenanceStep] = useState(0);
  const [activeBackupStep, setActiveBackupStep] = useState(0);

  const [systemStatus, setSystemStatus] = useState({
    security: 'active',
    maintenance: 'operational',
    data: 'enabled',
    notifications: 'active',
    users: 'configured'
  });

  const [maintenanceSettings, setMaintenanceSettings] = useState({
    autoBackup: true,
    clearCache: false,
    runDiagnostics: true,
    optimizeDatabase: true
  });

  const [backupSettings, setBackupSettings] = useState({
    backupType: 'full',
    includeLogs: true,
    compression: true,
    schedule: 'daily'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    ipWhitelist: false
  });

  // Color scheme extracted from your navigation
  const navColorScheme = {
    sidebarBackground: '#6b705c',      
    sidebarText: '#fefae0',            
    borderColor: '#6b705c',            
    hoverOrange: '#f3722c',            
    cardBackground: '#ffffff',         
    textPrimary: '#283618',           
    textSecondary: '#525252',          
  };

  // Dialog styles that match navigation colors
  const dialogStyles = {
    paper: {
      background: navColorScheme.sidebarText, 
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      border: `2px solid ${navColorScheme.borderColor}`
    },
    header: {
      background: navColorScheme.sidebarBackground, 
      color: navColorScheme.sidebarText, 
      padding: '16px 24px',
      borderBottom: `2px solid ${navColorScheme.borderColor}`,
      fontSize: '1.25rem',
      fontWeight: '600'
    },
    content: {
      padding: '24px',
      background: navColorScheme.sidebarText, 
      color: navColorScheme.textPrimary
    },
    actions: {
      padding: '16px 24px',
      background: navColorScheme.sidebarText,
      borderTop: `1px solid ${navColorScheme.borderColor}40`
    },
    button: {
      background: navColorScheme.sidebarBackground, 
      color: navColorScheme.sidebarText, 
      fontWeight: '600',
      border: `1px solid ${navColorScheme.borderColor}`,
      '&:hover': {
        background: navColorScheme.hoverOrange, //  orange on hover
        transform: 'translateY(-1px)',
        boxShadow: `0 4px 12px ${navColorScheme.hoverOrange}40`
      }
    },
    buttonSecondary: {
      color: navColorScheme.sidebarBackground, 
      borderColor: navColorScheme.sidebarBackground, 
      fontWeight: '500',
      '&:hover': {
        background: navColorScheme.hoverOrange, 
        color: navColorScheme.sidebarText, 
        borderColor: navColorScheme.hoverOrange 
      }
    },
    switch: {
      '& .MuiSwitch-switchBase.Mui-checked': {
        color: navColorScheme.hoverOrange, 
      },
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: navColorScheme.hoverOrange, 
      },
    },
    select: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: navColorScheme.borderColor, 
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: navColorScheme.hoverOrange, 
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: navColorScheme.hoverOrange, 
      }
    },
    progress: {
      height: '8px',
      borderRadius: '4px',
      backgroundColor: `${navColorScheme.borderColor}30`,
      '& .MuiLinearProgress-bar': {
        backgroundColor: navColorScheme.hoverOrange, 
      }
    },
    stepper: {
      '& .MuiStepIcon-root': {
        color: `${navColorScheme.borderColor}40`,
        '&.Mui-active': {
          color: navColorScheme.hoverOrange,
        },
        '&.Mui-completed': {
          color: navColorScheme.sidebarBackground,
        },
      },
      '& .MuiStepLabel-label': {
        color: navColorScheme.textPrimary,
        '&.Mui-active': {
          color: navColorScheme.hoverOrange, 
          fontWeight: '600'
        },
        '&.Mui-completed': {
          color: navColorScheme.sidebarBackground, 
        },
      }
    }
  };

  // Permission levels with enhanced data
  const permissionLevels = [
    { 
      value: 'Full', 
      label: 'Full Access', 
      icon: <FullIcon />, 
      color: '#2e7d32',
      description: 'Complete access including delete permissions'
    },
    { 
      value: 'Edit', 
      label: 'Can Edit', 
      icon: <EditIcon />, 
      color: '#ed6c02',
      description: 'Can view and edit but cannot delete'
    },
    { 
      value: 'View', 
      label: 'View Only', 
      icon: <ViewIcon />, 
      color: '#0288d1',
      description: 'Read-only access, no modifications allowed'
    },
    { 
      value: 'None', 
      label: 'No Access', 
      icon: <NoneIcon />, 
      color: '#d32f2f',
      description: 'No access to this section'
    }
  ];

  const roleIcons = { 
    admin: <AdminIcon />, 
    auditor: <EngineerIcon />, 
    client: <UserIcon /> 
  };

  // Maintenance steps for the stepper
  const maintenanceSteps = [
    'Pre-flight Check',
    'Running Diagnostics',
    'Clearing Cache',
    'Optimizing Database',
    'Finalizing'
  ];

  // Backup steps for the stepper
  const backupSteps = [
    'Initializing Backup',
    'Collecting Data',
    'Compressing Files',
    'Uploading to Storage',
    'Verifying Integrity'
  ];

  // Enhanced settings categories with real functionality
  const updatedSettingsCategories = [
    {
      name: 'Security',
      description: 'Manage authentication, authorization, and security policies',
      icon: <SecurityIcon />,
      status: systemStatus.security,
      tooltip: 'Configure password policies, 2FA, session timeout, and access controls. Current status: ' + systemStatus.security,
      action: () => setSecurityDialog(true),
      buttonText: 'Configure Security'
    },
    {
      name: 'System Maintenance',
      description: 'Perform system maintenance and health checks',
      icon: <BuildIcon />,
      status: systemStatus.maintenance,
      tooltip: 'Run system diagnostics, clear caches, and perform maintenance tasks. Current status: ' + systemStatus.maintenance,
      action: () => setMaintenanceDialog(true),
      buttonText: 'Run Maintenance'
    },
    {
      name: 'Data Management',
      description: 'Manage data storage, backups, and retention policies',
      icon: <StorageIcon />,
      status: systemStatus.data,
      tooltip: 'Configure backup schedules, data retention, and storage settings. Current status: ' + systemStatus.data,
      action: () => setBackupDialog(true),
      buttonText: 'Manage Data'
    },
    {
      name: 'Notifications',
      description: 'Configure email and system notification preferences',
      icon: <NotificationsIcon />,
      status: systemStatus.notifications,
      tooltip: 'Set up email templates, notification rules, and delivery settings. Current status: ' + systemStatus.notifications,
      action: () => handleNotificationSettings(),
      buttonText: 'Configure'
    },
    {
      name: 'User Management',
      description: 'Manage user accounts and team configurations',
      icon: <PeopleIcon />,
      status: systemStatus.users,
      tooltip: 'Add/edit users, manage teams, and configure user roles. Current status: ' + systemStatus.users,
      action: () => handleUserManagement(),
      buttonText: 'Manage Users'
    }
  ];

  // Fetch current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setCurrentUser(user);
        
        // Simulate fetching system status from API
        simulateSystemStatusCheck();
      } catch (error) {
        console.error('Error fetching user:', error);
        showSnackbar('Failed to load user data', 'error');
      }
    };
    fetchUser();
  }, []);

  // Simulate system status check 
  const simulateSystemStatusCheck = () => {
    setTimeout(() => {
      setSystemStatus({
        security: 'active',
        maintenance: 'operational', 
        data: 'enabled',
        notifications: 'active',
        users: 'configured'
      });
    }, 1000);
  };

  // Enhanced logout with confirmation and feedback
  const handleLogout = async () => {
    setOpenLogoutSnackbar(true);
    
    // Clear any sensitive data from state
    setCurrentUser(null);
    setRoles([]);
    
    setTimeout(async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
        showSnackbar('Logout failed. Please try again.', 'error');
      }
    }, 1500);
  };

  // Enhanced snackbar system
  const showSnackbar = (message, severity = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Handle permission changes with validation
  const handlePermissionChange = (roleName, category, newLevel) => {
    // Prevent demoting admin permissions below Full for critical sections
    if (roleName === 'admin' && ['Settings', 'Security'].includes(category) && newLevel !== 'Full') {
      showSnackbar('Admin must have Full access to Settings and Security', 'warning');
      return;
    }

    setRoles(prevRoles =>
      prevRoles.map(role =>
        role.name === roleName
          ? { 
              ...role, 
              permissions: { 
                ...role.permissions, 
                [category]: newLevel 
              } 
            }
          : role
      )
    );
    
    showSnackbar(`Updated ${roleName} ${category} permissions to ${newLevel}`, 'success');
  };

  // Save permissions with enhanced error handling
  const handleSave = async () => {
    if (isLoading) return;
    
    try {
      const { success, message } = await handleSavePermissions();
      showSnackbar(message, success ? 'success' : 'error');
      
      // Log the permission changes for audit
      if (success) {
        console.log('Permissions updated:', roles);
      }
    } catch (error) {
      console.error('Save permissions error:', error);
      showSnackbar('Failed to save permissions. Please try again.', 'error');
    }
  };

  // Enhanced system maintenance handler with progress simulation
  const handleRunMaintenance = () => {
    showSnackbar('Starting system maintenance tasks...', 'warning');
    
    // Simulate maintenance process with steps
    setSystemStatus(prev => ({ ...prev, maintenance: 'in-progress' }));
    setMaintenanceProgress(0);
    setActiveMaintenanceStep(0);

    const totalSteps = maintenanceSteps.length;
    const progressInterval = setInterval(() => {
      setMaintenanceProgress(prev => {
        const newProgress = prev + (100 / (totalSteps * 2));
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setSystemStatus(prev => ({ ...prev, maintenance: 'operational' }));
            setMaintenanceDialog(false);
            setMaintenanceProgress(0);
            setActiveMaintenanceStep(0);
            showSnackbar('System maintenance completed successfully!', 'success');
          }, 500);
          return 100;
        }
        
        // Update step based on progress
        const step = Math.floor((newProgress / 100) * totalSteps);
        setActiveMaintenanceStep(step);
        
        return newProgress;
      });
    }, 800);
  };

  // Enhanced backup management handler with progress simulation
  const handleRunBackup = () => {
    showSnackbar('Starting data backup process...', 'info');
    
    // Simulate backup process with steps
    setBackupProgress(0);
    setActiveBackupStep(0);

    const totalSteps = backupSteps.length;
    const progressInterval = setInterval(() => {
      setBackupProgress(prev => {
        const newProgress = prev + (100 / (totalSteps * 2));
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setBackupDialog(false);
            setBackupProgress(0);
            setActiveBackupStep(0);
            showSnackbar('Data backup completed successfully!', 'success');
          }, 500);
          return 100;
        }
        
        // Update step based on progress
        const step = Math.floor((newProgress / 100) * totalSteps);
        setActiveBackupStep(step);
        
        return newProgress;
      });
    }, 600);
  };

  // Notification settings handler
  const handleNotificationSettings = () => {
    showSnackbar('Loading notification preferences...', 'info');
    // Actual implementation would open notification settings modal
  };

  // User management handler
  const handleUserManagement = () => {
    showSnackbar('Redirecting to user management...', 'info');
    router.push('/dashboard/admin/users');
  };

  // Maintenance settings toggle handler
  const handleMaintenanceSettingChange = (setting) => (event) => {
    setMaintenanceSettings(prev => ({
      ...prev,
      [setting]: event.target.checked
    }));
    showSnackbar(`${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} ${event.target.checked ? 'enabled' : 'disabled'}`, 'info');
  };

  // Backup settings handler
  const handleBackupSettingChange = (setting) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setBackupSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Security settings handler
  const handleSecuritySettingChange = (setting) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Save security settings
  const handleSaveSecuritySettings = () => {
    showSnackbar('Security settings saved successfully!', 'success');
    setSecurityDialog(false);
  };

  // Tooltip wrapper for disabled buttons - FIXES THE CONSOLE ERROR
  const TooltipWrapper = ({ children, title, ...props }) => (
    <Tooltip title={title} {...props}>
      <span>{children}</span>
    </Tooltip>
  );

  return (
    <Box sx={styles.mainContainer}>
      {/* Sidebar - KEEPING ORIGINAL STYLES */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Go to Dashboard Overview" arrow>
            <Link href="/dashboard/admin/overview" passHref>
              <IconButton sx={{ color: 'green' }}><DashboardIcon /></IconButton>
            </Link>
          </Tooltip>
          <Typography variant="h5" sx={{ color: '#fefae0' }}>Admin Portal</Typography>
        </Box>
        
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <Tooltip title={`Navigate to ${item.name}`} arrow placement="right">
                <ListItemButton 
                  component={Link} 
                  href={item.path} 
                  sx={styles.sidebarListItemButton(item.name)}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
            <Image 
              src="/toroLogo.jpg" 
              alt="User Profile" 
              width={40} 
              height={40}
              style={{ borderRadius: '50%', border: '2px solid #f3722c' }} 
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>
                {currentUser?.email || 'Loading...'}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>
                Administrator
              </Typography>
            </Box>
          </Box>
          
          <Tooltip title="Logout from admin portal" arrow>
            <Button 
              onClick={handleLogout} 
              fullWidth 
              variant="outlined"
              startIcon={<LogoutIcon />}
              sx={{ 
                color: '#fefae0', 
                borderColor: '#fefae0', 
                '&:hover': { 
                  background: '#6b705c',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Logout
            </Button>
          </Tooltip>
        </Box>
      </Drawer>

      {/* Main content - KEEPING ORIGINAL STYLES */}
      <Box component="main" sx={styles.mainContent}>
        {/* Page Header */}
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}>
            <SettingsIcon sx={styles.headerIcon} />
            System Settings
          </Typography>
          <Typography variant="body1" sx={{ color: '#525252' }}>
            Configure application-wide preferences, security, and system options
          </Typography>
        </Box>

        {/* Settings categories grid - KEEPING ORIGINAL STYLES */}
        <Grid container spacing={3}>
          {updatedSettingsCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Tooltip title={category.tooltip} arrow placement="top">
                <Card 
                  sx={{
                    ...styles.settingsCard,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                      <Avatar sx={styles.settingsAvatar}>
                        <Box sx={{ color: '#525252' }}>{category.icon}</Box>
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={styles.settingsCardTitle}>
                          {category.name}
                        </Typography>
                        <Chip 
                          label={category.status} 
                          size="small" 
                          sx={styles.statusChip(category.status)}
                          icon={category.status === 'in-progress' ? <RefreshIcon /> : undefined}
                        />
                      </Box>
                    </Stack>
                    
                    <Typography variant="body2" sx={{ color: '#525252', mb: 2 }}>
                      {category.description}
                    </Typography>
                    
                    <Tooltip title={`Click to ${category.buttonText.toLowerCase()}`} arrow>
                      <Button 
                        variant="outlined" 
                        startIcon={<EditIcon />} 
                        fullWidth
                        onClick={category.action}
                        sx={{
                          ...styles.configureButton,
                          '&:hover': {
                            backgroundColor: '#fefae0',
                            color: '#283618'
                          }
                        }}
                      >
                        {category.buttonText}
                      </Button>
                    </Tooltip>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        {/* Permissions management section - KEEPING ORIGINAL STYLES */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={styles.pageTitle}>
            Permissions Management
          </Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>
            Manage role-based access control and security permissions
          </Typography>
        </Box>

        <Card sx={styles.permissionsCard}>
          <CardContent>
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                <TableHead sx={styles.tableHead}>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCell}>Role</TableCell>
                    {['Projects', 'Clients', 'Team', 'Settings'].map((cat) => (
                      <TableCell key={cat} sx={styles.tableHeaderCell}>
                        <Tooltip title={`Manage ${cat} permissions`} arrow>
                          <span>{cat}</span>
                        </Tooltip>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <CircularProgress />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Loading permissions...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    roles.map((role) => (
                      <TableRow 
                        key={role.name} 
                        hover 
                        selected={selectedRole === role.name}
                        onClick={() => setSelectedRole(role.name)}
                        sx={styles.tableRow(selectedRole === role.name)}
                      >
                        <TableCell sx={styles.tableCell}>
                          <Tooltip title={`Configure ${role.name} permissions`} arrow>
                            <Stack direction="row" alignItems="center" spacing={1} textTransform="capitalize">
                              {roleIcons[role.name]}
                              <Typography fontWeight="bold">{role.name}</Typography>
                            </Stack>
                          </Tooltip>
                        </TableCell>
                        
                        {['Projects', 'Clients', 'Team', 'Settings'].map((category) => {
                          const permission = permissionLevels.find(p => p.value === role.permissions[category]);
                          return (
                            <TableCell key={category} sx={styles.tableCell}>
                              <Tooltip 
                                title={permission?.description || 'Select permission level'} 
                                arrow
                              >
                                <FormControl fullWidth size="small">
                                  <Select
                                    value={role.permissions[category]}
                                    onChange={(e) => handlePermissionChange(role.name, category, e.target.value)}
                                    sx={styles.selectInput(permission?.color)}
                                    renderValue={(selected) => (
                                      <Stack direction="row" alignItems="center" spacing={1}>
                                        <Box sx={{ color: permission?.color }}>
                                          {permission?.icon}
                                        </Box>
                                        <Typography sx={{ color: permission?.color, fontWeight: 'bold' }}>
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
                                          <Box sx={{ color: level.color }}>{level.icon}</Box>
                                          <Box>
                                            <Typography sx={{ color: '#283618', fontWeight: 'bold' }}>
                                              {level.label}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#666' }}>
                                              {level.description}
                                            </Typography>
                                          </Box>
                                        </Stack>
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Tooltip>
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

        {/* Save permissions button - FIXED Tooltip error */}
        <Box sx={styles.saveButtonContainer}>
          <TooltipWrapper title="Save all permission changes">
            <Button 
              variant="contained" 
              startIcon={<SaveIcon />} 
              onClick={handleSave} 
              sx={styles.saveButton} 
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Permissions'}
            </Button>
          </TooltipWrapper>
        </Box>
      </Box>

      {/* Enhanced Maintenance Dialog - USING NAVIGATION COLORS */}
      <Dialog 
        open={maintenanceDialog} 
        onClose={() => !systemStatus.maintenance === 'in-progress' && setMaintenanceDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: dialogStyles.paper }}
      >
        <DialogTitle sx={dialogStyles.header}>
          <BuildIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          System Maintenance
        </DialogTitle>
        <DialogContent sx={dialogStyles.content}>
          {systemStatus.maintenance === 'in-progress' ? (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: navColorScheme.textPrimary }}>
                Maintenance in Progress
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={maintenanceProgress} 
                sx={dialogStyles.progress}
              />
              <Stepper activeStep={activeMaintenanceStep} orientation="vertical" sx={dialogStyles.stepper}>
                {maintenanceSteps.map((step, index) => (
                  <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                    <StepContent>
                      <Typography variant="body2" sx={{ color: navColorScheme.textSecondary }}>
                        {index === activeMaintenanceStep ? 'Processing...' : 'Completed'}
                      </Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          ) : (
            <Box>
              <Typography variant="body1" sx={{ mb: 3, color: navColorScheme.textPrimary }}>
                Configure and run system maintenance tasks. This will help optimize system performance and resolve potential issues.
              </Typography>
              
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={maintenanceSettings.autoBackup}
                      onChange={handleMaintenanceSettingChange('autoBackup')}
                      sx={dialogStyles.switch}
                    />
                  }
                  label="Automatic Backup Before Maintenance"
                  sx={{ color: navColorScheme.textPrimary }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={maintenanceSettings.clearCache}
                      onChange={handleMaintenanceSettingChange('clearCache')}
                      sx={dialogStyles.switch}
                    />
                  }
                  label="Clear System Cache"
                  sx={{ color: navColorScheme.textPrimary }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={maintenanceSettings.runDiagnostics}
                      onChange={handleMaintenanceSettingChange('runDiagnostics')}
                      sx={dialogStyles.switch}
                    />
                  }
                  label="Run System Diagnostics"
                  sx={{ color: navColorScheme.textPrimary }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={maintenanceSettings.optimizeDatabase}
                      onChange={handleMaintenanceSettingChange('optimizeDatabase')}
                      sx={dialogStyles.switch}
                    />
                  }
                  label="Optimize Database"
                  sx={{ color: navColorScheme.textPrimary }}
                />
              </Stack>
              
              <Typography variant="body2" sx={{ 
                mt: 3, 
                p: 2, 
                backgroundColor: `${navColorScheme.hoverOrange}15`, 
                borderRadius: 1,
                color: navColorScheme.textPrimary,
                border: `1px solid ${navColorScheme.hoverOrange}30`
              }}>
                Note: System may be temporarily unavailable during maintenance. Estimated time: 2-5 minutes.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={dialogStyles.actions}>
          <Button 
            onClick={() => setMaintenanceDialog(false)} 
            disabled={systemStatus.maintenance === 'in-progress'}
            sx={dialogStyles.buttonSecondary}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRunMaintenance} 
            variant="contained" 
            startIcon={systemStatus.maintenance === 'in-progress' ? <RefreshIcon /> : <BuildIcon />}
            disabled={systemStatus.maintenance === 'in-progress'}
            sx={dialogStyles.button}
          >
            {systemStatus.maintenance === 'in-progress' ? 'Running...' : 'Start Maintenance'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Enhanced Backup Dialog - USING NAVIGATION COLORS */}
      <Dialog 
        open={backupDialog} 
        onClose={() => setBackupDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: dialogStyles.paper }}
      >
        <DialogTitle sx={dialogStyles.header}>
          <BackupIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Data Backup & Management
        </DialogTitle>
        <DialogContent sx={dialogStyles.content}>
          {backupProgress > 0 ? (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: navColorScheme.textPrimary }}>
                Backup in Progress
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={backupProgress} 
                sx={dialogStyles.progress}
              />
              <Stepper activeStep={activeBackupStep} orientation="vertical" sx={dialogStyles.stepper}>
                {backupSteps.map((step, index) => (
                  <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                    <StepContent>
                      <Typography variant="body2" sx={{ color: navColorScheme.textSecondary }}>
                        {index === activeBackupStep ? 'Processing...' : 'Completed'}
                      </Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          ) : (
            <Box>
              <Typography variant="body1" sx={{ mb: 3, color: navColorScheme.textPrimary }}>
                Configure your backup settings and manage data storage options.
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: navColorScheme.textPrimary }}>Backup Type</Typography>
                    <Select
                      value={backupSettings.backupType}
                      onChange={handleBackupSettingChange('backupType')}
                      sx={dialogStyles.select}
                    >
                      <MenuItem value="full">Full Backup</MenuItem>
                      <MenuItem value="incremental">Incremental</MenuItem>
                      <MenuItem value="differential">Differential</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: navColorScheme.textPrimary }}>Schedule</Typography>
                    <Select
                      value={backupSettings.schedule}
                      onChange={handleBackupSettingChange('schedule')}
                      sx={dialogStyles.select}
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={backupSettings.includeLogs}
                        onChange={handleBackupSettingChange('includeLogs')}
                        sx={dialogStyles.switch}
                      />
                    }
                    label="Include System Logs"
                    sx={{ mb: 2, color: navColorScheme.textPrimary }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={backupSettings.compression}
                        onChange={handleBackupSettingChange('compression')}
                        sx={dialogStyles.switch}
                      />
                    }
                    label="Enable Compression"
                    sx={{ mb: 2, color: navColorScheme.textPrimary }}
                  />
                </Grid>
              </Grid>
              
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<BackupIcon />} 
                  fullWidth
                  sx={dialogStyles.buttonSecondary}
                >
                  Create Manual Backup
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<ScheduleIcon />} 
                  fullWidth
                  sx={dialogStyles.buttonSecondary}
                >
                  Configure Auto-Backup Schedule
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<CloudUploadIcon />} 
                  fullWidth
                  sx={dialogStyles.buttonSecondary}
                >
                  Upload to Cloud Storage
                </Button>
              </Stack>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={dialogStyles.actions}>
          <Button onClick={() => setBackupDialog(false)} sx={dialogStyles.buttonSecondary}>
            Cancel
          </Button>
          <Button 
            onClick={handleRunBackup} 
            variant="contained" 
            startIcon={<BackupIcon />}
            disabled={backupProgress > 0}
            sx={dialogStyles.button}
          >
            {backupProgress > 0 ? 'Backing up...' : 'Run Backup Now'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Security Settings Dialog - USING NAVIGATION COLORS */}
      <Dialog 
        open={securityDialog} 
        onClose={() => setSecurityDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{ sx: dialogStyles.paper }}
      >
        <DialogTitle sx={dialogStyles.header}>
          <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Security Configuration
        </DialogTitle>
        <DialogContent sx={dialogStyles.content}>
          <Typography variant="body1" sx={{ mb: 3, color: navColorScheme.textPrimary }}>
            Configure security settings to protect your system and data.
          </Typography>
          
          <Stack spacing={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onChange={handleSecuritySettingChange('twoFactorAuth')}
                  sx={dialogStyles.switch}
                />
              }
              label="Enable Two-Factor Authentication"
              sx={{ color: navColorScheme.textPrimary }}
            />
            
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ color: navColorScheme.textPrimary }}>
                Session Timeout (minutes)
              </Typography>
              <Select
                value={securitySettings.sessionTimeout}
                onChange={handleSecuritySettingChange('sessionTimeout')}
                fullWidth
                sx={dialogStyles.select}
              >
                <MenuItem value={15}>15 minutes</MenuItem>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={60}>1 hour</MenuItem>
                <MenuItem value={120}>2 hours</MenuItem>
              </Select>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ color: navColorScheme.textPrimary }}>
                Password Expiry (days)
              </Typography>
              <Select
                value={securitySettings.passwordExpiry}
                onChange={handleSecuritySettingChange('passwordExpiry')}
                fullWidth
                sx={dialogStyles.select}
              >
                <MenuItem value={30}>30 days</MenuItem>
                <MenuItem value={60}>60 days</MenuItem>
                <MenuItem value={90}>90 days</MenuItem>
                <MenuItem value={180}>180 days</MenuItem>
              </Select>
            </Box>
            
            <FormControlLabel
              control={
                <Switch
                  checked={securitySettings.ipWhitelist}
                  onChange={handleSecuritySettingChange('ipWhitelist')}
                  sx={dialogStyles.switch}
                />
              }
              label="Enable IP Whitelist"
              sx={{ color: navColorScheme.textPrimary }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={dialogStyles.actions}>
          <Button onClick={() => setSecurityDialog(false)} sx={dialogStyles.buttonSecondary}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveSecuritySettings} 
            variant="contained"
            sx={dialogStyles.button}
          >
            Save Security Settings
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar: logout feedback */}
      <Snackbar
        open={openLogoutSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenLogoutSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{
            width: '100%',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            backgroundColor: '#5caa93ff',
            color: 'black',
            '& .MuiAlert-icon': { color: 'white' },
          }}
        >
          Logging out...
        </Alert>
      </Snackbar>

      {/* Regular snackbar for other feedback */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={() => setOpenSnackbar(false)} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%', 
            fontWeight: 'bold', 
            fontSize: '1.1rem',
            '& .MuiAlert-message': { py: 1 }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}