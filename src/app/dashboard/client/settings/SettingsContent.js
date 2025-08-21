// This file contains the main ClientSettings screen content.
// All logic except the lazy/suspense wrapper and router initialization should be here.

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Box, Typography, Card, CardContent, Stack, Button, Drawer,
    ListItemButton, List, MenuItem, ListItem, ListItemText,
    Divider, TextField, Avatar, Switch, FormControlLabel, Tabs, Tab,
    Paper, Grid, CircularProgress, Snackbar, Alert
} from '@mui/material';

import {
    Settings as SettingsIcon,
    Person as ProfileIcon,
    Notifications as NotificationsIcon,
    Security as SecurityIcon,
    Language as LanguageIcon,
    Logout as LogoutIcon,
    Save as SaveIcon,
    Edit as EditIcon,
    Check as CheckIcon,
    Close as CloseIcon
} from '@mui/icons-material';

import { useSettings } from './useSettings/page';
import * as globalStyles from '../common/styles';
import { clientSettingsStyles } from './styles';
import { useClientStore } from '../common/clientStore';
import { clientMenu } from '../common/clientStore';

// Accept router as a prop for navigation/prefetch
export default function SettingsContent({ router }) {
    const {
        activeTab,
        editMode,
        darkMode,
        formData,
        isLoading,
        isError,
        setEditMode,
        setDarkMode,
        handleChange,
        handleSubmit,
        handleCancelEdit,
        handleTabChange,
    } = useSettings();

    const [sidebarOpen] = React.useState(true);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleLogout = () => {
        setOpenSnackbar(true);
        setTimeout(() => {
            router.push('/login');
        }, 1500);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography color="error">
                    Failed to load settings. Please try again.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={globalStyles.rootBox}>
            {/* --- Sidebar Navigation --- */}
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
            >
                <Box sx={globalStyles.drawerHeader}>
                    <Typography variant="h5">Client Portal</Typography>
                </Box>
                <List>
                    {clientMenu.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                sx={globalStyles.listItemButton}
                                onMouseEnter={() => router.prefetch(item.path)}
                            >
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                
                {/* User Profile Section */}
                <Box sx={{
                    padding: '1rem',
                    borderTop: '2px solid #6b705c',
                    marginTop: 'auto'
                }}>
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
                        {sidebarOpen && (
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
                                    user@toro.com
                                </Typography>
                            </Box>
                        )}
                    </Box>
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
            <Box component="main" sx={clientSettingsStyles.mainContent}>
                {/* Header Region */}
                <Box sx={clientSettingsStyles.pageHeader}>
                    <Typography variant="h4" sx={clientSettingsStyles.pageHeaderText}>
                        <SettingsIcon sx={clientSettingsStyles.headerIcon} />
                        Settings
                    </Typography>
                    <Typography variant="body1" sx={clientSettingsStyles.headerSubtext}>
                        Manage your account preferences and security settings
                    </Typography>
                </Box>

                {/* Tabs Region */}
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={clientSettingsStyles.tabs}
                >
                    <Tab label="Profile" icon={<ProfileIcon />} iconPosition="start" sx={clientSettingsStyles.tab} />
                    <Tab label="Security" icon={<SecurityIcon />} iconPosition="start" sx={clientSettingsStyles.tab} />
                    <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={clientSettingsStyles.tab} />
                    <Tab label="Preferences" icon={<LanguageIcon />} iconPosition="start" sx={clientSettingsStyles.tab} />
                </Tabs>

                {/* Tab Content Region */}
                <Card sx={clientSettingsStyles.card}>
                    <CardContent>
                        {/* Profile Tab Content */}
                        {activeTab === 0 && (
                            <Box component="form" onSubmit={handleSubmit}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={clientSettingsStyles.profileSectionHeader}>
                                        Personal Information
                                    </Typography>
                                    {editMode ? (
                                        <Stack direction="row" spacing={1}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                startIcon={<CheckIcon />}
                                                sx={clientSettingsStyles.profileEditButtons}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                startIcon={<CloseIcon />}
                                                onClick={handleCancelEdit}
                                                sx={clientSettingsStyles.profileCancelButton}
                                            >
                                                Cancel
                                            </Button>
                                        </Stack>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            startIcon={<EditIcon />}
                                            onClick={() => setEditMode(true)}
                                            sx={clientSettingsStyles.profileCancelButton}
                                        >
                                            Edit Profile
                                        </Button>
                                    )}
                                </Stack>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <Box sx={clientSettingsStyles.profileAvatarContainer}>
                                            <Avatar sx={clientSettingsStyles.profileAvatar} />
                                            {editMode && (
                                                <Button
                                                    variant="outlined"
                                                    sx={clientSettingsStyles.profileChangePhotoButton}
                                                >
                                                    Change Photo
                                                </Button>
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
                                                    value={formData.name}
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
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                    sx={clientSettingsStyles.profileTextField(editMode)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Company"
                                                    name="company"
                                                    value={formData.company}
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
                                                    value={formData.position}
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
                                                    value={formData.phone}
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

                        {/* Security Tab Content */}
                        {activeTab === 1 && (
                            <Box component="form" onSubmit={handleSubmit}>
                                <Typography variant="h6" sx={clientSettingsStyles.securityHeader}>
                                    Security Settings
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1" sx={clientSettingsStyles.securitySubheader}>
                                            Change Password
                                        </Typography>

                                        <Stack spacing={2}>
                                            <TextField
                                                fullWidth
                                                label="Current Password"
                                                name="currentPassword"
                                                type="password"
                                                value={formData.currentPassword}
                                                onChange={handleChange}
                                                sx={{
                                                    '& .MuiInputLabel-root': { color: '#525252' },
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#a3a699',
                                                        },
                                                    },
                                                    '& .MuiInputBase-input': { color: '#283618' }
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                label="New Password"
                                                name="newPassword"
                                                type="password"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                sx={{
                                                    '& .MuiInputLabel-root': { color: '#525252' },
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#a3a699',
                                                        },
                                                    },
                                                    '& .MuiInputBase-input': { color: '#283618' }
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Confirm New Password"
                                                name="confirmPassword"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                sx={{
                                                    '& .MuiInputLabel-root': { color: '#525252' },
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#a3a699',
                                                        },
                                                    },
                                                    '& .MuiInputBase-input': { color: '#283618' }
                                                }}
                                            />
                                        </Stack>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            sx={clientSettingsStyles.securityPasswordButton}
                                        >
                                            Update Password
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1" sx={clientSettingsStyles.securitySubheader}>
                                            Two-Factor Authentication
                                        </Typography>

                                        <Paper sx={clientSettingsStyles.securityPaper}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={true}
                                                        onChange={() => { }}
                                                        sx={clientSettingsStyles.notificationSwitch}
                                                    />
                                                }
                                                label={
                                                    <Typography sx={clientSettingsStyles.securityLabel}>
                                                        Enable Two-Factor Authentication
                                                    </Typography>
                                                }
                                                sx={{ ml: 0 }}
                                            />
                                            <Typography variant="body2" sx={clientSettingsStyles.securityHelperText}>
                                                Adds an extra layer of security to your account
                                            </Typography>
                                        </Paper>

                                        <Typography variant="subtitle1" sx={clientSettingsStyles.securitySubheader}>
                                            Active Sessions
                                        </Typography>

                                        <Paper sx={clientSettingsStyles.securityPaper}>
                                            <Typography variant="body2" sx={clientSettingsStyles.securityLabel}>
                                                Current Device (Chrome, Windows)
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(40, 54, 24, 0.5)' }}>
                                                Last active: Just now
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={clientSettingsStyles.securityLogoutButton}
                                            >
                                                Logout from all devices
                                            </Button>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {/* Notifications Tab Content */}
                        {activeTab === 2 && (
                            <Box component="form" onSubmit={handleSubmit}>
                                <Typography variant="h6" sx={clientSettingsStyles.securityHeader}>
                                    Notification Preferences
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Paper sx={clientSettingsStyles.securityPaper}>
                                            <Typography variant="subtitle1" sx={clientSettingsStyles.securitySubheader}>
                                                Email Notifications
                                            </Typography>
                                            <Stack spacing={1}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            name="notifications"
                                                            checked={formData.notifications}
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
                                                            checked={formData.newsletter}
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
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Paper sx={clientSettingsStyles.securityPaper}>
                                            <Typography variant="subtitle1" sx={clientSettingsStyles.securitySubheader}>
                                                In-App Notifications
                                            </Typography>
                                            <Stack spacing={1}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={true}
                                                            onChange={() => { }}
                                                            sx={clientSettingsStyles.notificationSwitch}
                                                        />
                                                    }
                                                    label={
                                                        <Typography sx={clientSettingsStyles.securityLabel}>
                                                            Messages
                                                        </Typography>
                                                    }
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={true}
                                                            onChange={() => { }}
                                                            sx={clientSettingsStyles.notificationSwitch}
                                                        />
                                                    }
                                                    label={
                                                        <Typography sx={clientSettingsStyles.securityLabel}>
                                                            Meeting Reminders
                                                        </Typography>
                                                    }
                                                />
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    sx={clientSettingsStyles.saveButton}
                                >
                                    Save Preferences
                                </Button>
                            </Box>
                        )}

                        {/* Preferences Tab Content */}
                        {activeTab === 3 && (
                            <Box component="form" onSubmit={handleSubmit}>
                                <Typography variant="h6" sx={clientSettingsStyles.securityHeader}>
                                    App Preferences
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Paper sx={clientSettingsStyles.securityPaper}>
                                            <Typography variant="subtitle1" sx={clientSettingsStyles.securitySubheader}>
                                                Display Settings
                                            </Typography>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={darkMode}
                                                        onChange={(e) => setDarkMode(e.target.checked)}
                                                        sx={clientSettingsStyles.notificationSwitch}
                                                    />
                                                }
                                                label={
                                                    <Typography sx={clientSettingsStyles.securityLabel}>
                                                        Dark Mode
                                                    </Typography>
                                                }
                                            />
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1" sx={clientSettingsStyles.securitySubheader}>
                                            Language & Region
                                        </Typography>
                                        <Paper sx={clientSettingsStyles.securityPaper}>
                                            <TextField
                                                select
                                                fullWidth
                                                label="Language"
                                                name="language"
                                                value={formData.language}
                                                onChange={handleChange}
                                                sx={clientSettingsStyles.preferencesLanguageInput}
                                            >
                                                <MenuItem value="en">English</MenuItem>
                                                <MenuItem value="es">Spanish</MenuItem>
                                                <MenuItem value="fr">French</MenuItem>
                                            </TextField>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    sx={clientSettingsStyles.saveButton}
                                >
                                    Save Preferences
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success"
                    sx={{
                        width: '100%',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>
                    Logging out...
                </Alert>
            </Snackbar>
        </Box>
    );
}