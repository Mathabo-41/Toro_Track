// This file contains the main ClientSettings screen content.
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    Box, Typography, Card, CardContent, Stack, Button, Drawer,
    ListItemButton, List, MenuItem, ListItem, ListItemText,
    TextField, Avatar, Switch, FormControlLabel, Tabs, Tab,
    Paper, Grid, Snackbar, Alert, IconButton, AppBar, Toolbar
} from '@mui/material';

// Import Supabase client
import { createSupabaseClient } from '@/lib/supabase/client';

// Dashboard icon import 
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';

import {
    Settings as SettingsIcon,
    Person as ProfileIcon,
    Notifications as NotificationsIcon,
    Language as LanguageIcon,
    Logout as LogoutIcon,
    Save as SaveIcon,
    Edit as EditIcon,
    Check as CheckIcon,
    Close as CloseIcon
} from '@mui/icons-material';

import { useSettings } from './useSettings/useSettings';
import * as globalStyles from '../common/styles';
import { clientSettingsStyles } from './styles';
import { clientMenu } from '../common/clientStore';
import LoadingScreen from '../common/LoadingScreen';

// Define drawer width for responsiveness
const drawerWidth = 260;

export default function SettingsContent() {
    const supabase = createSupabaseClient();
    const router = useRouter(); // Use useRouter hook

    const {
        activeTab,
        editMode,
        formData,
        avatarPreview,
        isLoading,
        isError,
        setEditMode,
        handleChange,
        handleAvatarChange,
        handleSubmit,
        handleCancelEdit,
        handleTabChange,
    } = useSettings({ 
      onSuccess: (message) => showSnackbar(message, 'success'),
      onError: (message) => showSnackbar(message, 'error')
    });

    const avatarInputRef = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);
    
    // State for responsive drawer
    const [mobileOpen, setMobileOpen] = useState(false);

    // Snackbar state management
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    /**
     * Toggles the mobile drawer
     */
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    /**
     * Displays a snackbar notification
     */
    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    /**
     * Closes the snackbar
     */
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    // Fetch current user from Supabase
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error) throw error;
                setCurrentUser(user);
            } catch (error) {
                console.error("Error fetching user:", error);
                showSnackbar('Failed to load user session', 'error');
            }
        };
        fetchUser();
    }, [supabase]);

    /**
     * Handles user logout
     */
    const handleLogout = async () => {
        showSnackbar('Logging out...', 'info');
        setTimeout(async () => {
            try {
                await supabase.auth.signOut();
                router.push('/login'); // Now router is defined
            } catch (error) {
                console.error("Error during logout:", error);
                showSnackbar('Logout failed. Please try again.', 'error');
            }
        }, 1500);
    };

    /**
     * Wrapper for form submission to prevent default event
     */
    const onFormSubmit = (e) => {
      e.preventDefault();
      handleSubmit();
    };

    // Reusable Drawer Content
    const drawerContent = (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Link href="/dashboard/client/details" passHref>
                  <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
                      <DashboardIcon />
                  </IconButton>
              </Link>
              <Typography variant="h5" sx={{ color: '#fefae0' }}>Client Portal</Typography>
          </Box>
          <List>
              {clientMenu.map((item) => (
                  <ListItem key={item.path} disablePadding>
                      <ListItemButton 
                        component={Link} 
                        href={item.path} 
                        sx={globalStyles.listItemButton}
                        onClick={() => mobileOpen && handleDrawerToggle()} // Close mobile drawer on nav
                      >
                          <ListItemText primary={item.name} />
                      </ListItemButton>
                  </ListItem>
              ))}
          </List>

          {/* User Profile Section */}
          <Box sx={{ padding: '1rem', borderTop: '2px solid #6b705c', marginTop: 'auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', overflow: 'hidden', gap: '0.75rem' }}>
                  <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid #f3722c' }}>
                      <Image
                          src={avatarPreview || formData.avatar_url || currentUser?.user_metadata?.avatar_url || "/toroLogo.jpg"}
                          alt="User Profile"
                          fill
                          style={{ objectFit: 'cover' }}
                          onError={(e) => { e.target.src = "/toroLogo.jpg"; }} // Fallback
                      />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                      <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>
                          {formData.name || currentUser?.user_metadata?.full_name || "Client Name"}
                      </Typography>
                      <Typography noWrap sx={{ fontSize: '0.8rem', opacity: 0.8, color: 'rgba(254, 250, 224, 0.7)' }}>
                          {formData.email || currentUser?.email || "client@email.com"}
                      </Typography>
                  </Box>
              </Box>
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
                    borderColor: '#fefae0'
                  }
                }}
              >
                Logout
              </Button>
          </Box>
      </Box>
    );

    // Handle failure cases first
    if (isLoading) {
        return <LoadingScreen message="Loading Settings..." />;
    }

    if (isError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 3, backgroundColor: globalStyles.COLORS.background }}>
                <Alert severity="error" sx={{ fontSize: '1.1rem' }}>
                    Failed to load settings. Please try again later.
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ ...globalStyles.rootBox, display: 'flex' }}>
            {/* --- Sidebar Navigation --- */}
            <Box
              component="nav"
              sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
              aria-label="client menu"
            >
                {/* Temporary Drawer for Mobile */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            ...globalStyles.drawerPaper,
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        }
                    }}
                >
                    {drawerContent}
                </Drawer>
                
                {/* Permanent Drawer for Desktop */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            ...globalStyles.drawerPaper,
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        }
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box 
              component="main" 
              sx={{
                ...clientSettingsStyles.mainContent, // Keep original styles
                flexGrow: 1,
                width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
                ml: { xs: 0, md: `${drawerWidth}px` }, // No margin on mobile
                p: 0 // Remove default padding
              }}
            >
                {/* Responsive App Bar for Mobile */}
                <AppBar
                  position="static"
                  sx={{
                      display: { xs: 'flex', md: 'none' }, // Only show on mobile
                      backgroundColor: '#283618', // Match drawer header
                      paddingTop: 'env(safe-area-inset-top)'
                  }}
                >
                  <Toolbar>
                      <IconButton
                          color="inherit"
                          aria-label="open drawer"
                          edge="start"
                          onClick={handleDrawerToggle}
                          sx={{ mr: 2 }}
                      >
                          <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" noWrap component="div" sx={{ color: '#fefae0' }}>
                          Settings
                      </Typography>
                  </Toolbar>
                </AppBar>

                {/* Page Header for Desktop */}
                <Box sx={{ ...clientSettingsStyles.pageHeader, display: { xs: 'none', md: 'flex' } }}>
                    <Typography variant="h4" sx={clientSettingsStyles.pageHeaderText}><SettingsIcon sx={clientSettingsStyles.headerIcon} />Settings</Typography>
                    <Typography variant="body1" sx={clientSettingsStyles.headerSubtext}>Manage your account preferences</Typography>
                </Box>

                {/* Responsive Content Area */}
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                    <Tabs 
                      value={activeTab} 
                      onChange={handleTabChange} 
                      sx={clientSettingsStyles.tabs}
                      variant="fullWidth" // Ensure tabs take full width on mobile
                    >
                        <Tab label="Profile" icon={<ProfileIcon />} iconPosition="start" sx={clientSettingsStyles.tab} />
                        <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={clientSettingsStyles.tab} />
                        <Tab label="Preferences" icon={<LanguageIcon />} iconPosition="start" sx={clientSettingsStyles.tab} />
                    </Tabs>

                    <Card sx={clientSettingsStyles.card}>
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            {/* Profile Tab Content */}
                            {activeTab === 0 && (
                                <Box component="form" onSubmit={onFormSubmit}>
                                    <Stack 
                                      direction={{ xs: 'column-reverse', sm: 'row' }} // Stack buttons below on mobile
                                      justifyContent="space-between" 
                                      alignItems={{ xs: 'flex-start', sm: 'center' }} 
                                      sx={{ mb: 3 }}
                                      spacing={2}
                                    >
                                        <Typography variant="h6" sx={clientSettingsStyles.profileSectionHeader}>Personal Information</Typography>
                                        {editMode ? (
                                            <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                                                <Button type="submit" variant="contained" startIcon={<CheckIcon />} sx={{ ...clientSettingsStyles.profileEditButtons, flexGrow: 1 }}>Save</Button>
                                                <Button variant="outlined" startIcon={<CloseIcon />} onClick={handleCancelEdit} sx={{ ...clientSettingsStyles.profileCancelButton, flexGrow: 1 }}>Cancel</Button>
                                            </Stack>
                                        ) : (
                                            <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditMode(true)} sx={{ ...clientSettingsStyles.profileCancelButton, width: { xs: '100%', sm: 'auto' } }}>Edit Profile</Button>
                                        )}
                                    </Stack>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}>
                                            <Box sx={clientSettingsStyles.profileAvatarContainer}>
                                                <Avatar
                                                    src={avatarPreview || formData.avatar_url || currentUser?.user_metadata?.avatar_url || "/toroLogo.jpg"}
                                                    sx={clientSettingsStyles.profileAvatar}
                                                />
                                                {editMode && (
                                                    <>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            ref={avatarInputRef}
                                                            onChange={handleAvatarChange}
                                                            hidden
                                                        />
                                                        <Button
                                                            variant="outlined"
                                                            sx={clientSettingsStyles.profileChangePhotoButton}
                                                            onClick={() => avatarInputRef.current.click()}
                                                        >
                                                            Change Photo
                                                        </Button>
                                                    </>
                                                )}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Full Name"
                                                        name="name"
                                                        value={formData.name || ''}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                        sx={clientSettingsStyles.profileTextField(editMode)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email || ''}
                                                        disabled
                                                        sx={clientSettingsStyles.profileTextField(false)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Company"
                                                        name="company"
                                                        value={formData.company || ''}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                        sx={clientSettingsStyles.profileTextField(editMode)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Position"
                                                        name="position"
                                                        value={formData.position || ''}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                        sx={clientSettingsStyles.profileTextField(editMode)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Phone Number"
                                                        name="phone"
                                                        value={formData.phone || ''}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                        sx={clientSettingsStyles.profileTextField(editMode)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {/* Notifications Tab Content */}
                            {activeTab === 1 && (
                                <Box component="form" onSubmit={onFormSubmit}>
                                    <Typography variant="h6" sx={clientSettingsStyles.securityHeader}>Notification Preferences</Typography>
                                    <Paper sx={clientSettingsStyles.securityPaper}>
                                        <Stack spacing={1}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name="notifications"
                                                        checked={formData.notifications || false}
                                                        onChange={handleChange}
                                                        sx={clientSettingsStyles.notificationSwitch}
                                                    />
                                                }
                                                label={
                                                    <Typography sx={clientSettingsStyles.securityLabel}>
                                                        Project Updates
                                                    </Typography>
                                                }
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name="newsletter"
                                                        checked={formData.newsletter || false}
                                                        onChange={handleChange}
                                                        sx={clientSettingsStyles.notificationSwitch}
                                                    />
                                                }
                                                label={
                                                    <Typography sx={clientSettingsStyles.securityLabel}>
                                                        Newsletter
                                                    </Typography>
                                                }
                                            />
                                        </Stack>
                                    </Paper>
                                    <Button type="submit" variant="contained" startIcon={<SaveIcon />} sx={clientSettingsStyles.saveButton}>
                                        Save Preferences
                                    </Button>
                                </Box>
                            )}

                            {/* Preferences Tab Content */}
                            {activeTab === 2 && (
                                <Box component="form" onSubmit={onFormSubmit}>
                                    <Typography variant="h6" sx={clientSettingsStyles.securityHeader}>App Preferences</Typography>
                                    <Paper sx={clientSettingsStyles.securityPaper}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Language"
                                            name="language"
                                            value={formData.language || 'en'}
                                            onChange={handleChange}
                                            sx={clientSettingsStyles.preferencesLanguageInput}
                                        >
                                            <MenuItem value="en">English</MenuItem>
                                            <MenuItem value="es">Spanish</MenuItem>
                                            <MenuItem value="fr">French</MenuItem>
                                        </TextField>
                                    </Paper>
                                    <Button type="submit" variant="contained" startIcon={<SaveIcon />} sx={clientSettingsStyles.saveButton}>
                                        Save Preferences
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* General Purpose Snackbar */}
            <Snackbar 
              open={snackbar.open} 
              autoHideDuration={4000} 
              onClose={handleSnackbarClose} 
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                  onClose={handleSnackbarClose} 
                  severity={snackbar.severity} 
                  sx={{ 
                    width: '100%', 
                    fontWeight: 'bold', 
                    fontSize: '1.2rem',
                    // Match color scheme from other screens
                    backgroundColor: 
                      snackbar.severity === 'success' ? '#2e7d32' :
                      snackbar.severity === 'error' ? '#d32f2f' :
                      snackbar.severity === 'info' ? '#283618' : 
                      snackbar.severity === 'warning' ? '#ed6c02' : '#606c38',
                    color: '#fefae0'
                  }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}