// This file contains the main ClientSettings screen content.
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    Box, Typography, Card, CardContent, Stack, Button, Drawer,
    ListItemButton, List, MenuItem, ListItem, ListItemText,
    Divider, TextField, Avatar, Switch, FormControlLabel, Tabs, Tab,
    Paper, Grid, CircularProgress, Snackbar, Alert, IconButton
} from '@mui/material';

// Import Supabase client
import { createSupabaseClient } from '@/lib/supabase/client';

//dashboard icon import 
import DashboardIcon from '@mui/icons-material/Dashboard';

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

import { useSettings } from './useSettings/useSettings';
import * as globalStyles from '../common/styles';
import { clientSettingsStyles } from './styles';
import { useClientStore } from '../common/clientStore';
import { clientMenu } from '../common/clientStore';
import LoadingScreen from '../common/LoadingScreen';

// Remove router prop and use useRouter hook instead
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
    } = useSettings();

    const avatarInputRef = useRef(null);
    const [sidebarOpen] = React.useState(true);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);

    // Fetch current user from Supabase
    React.useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUser(user);
        };
        fetchUser();
    }, [supabase]);

    const handleLogout = async () => {
        setOpenSnackbar(true);
        setTimeout(async () => {
            await supabase.auth.signOut();
            router.push('/login'); // Now router is defined
        }, 1500);
    };

    if (isLoading) {
        return <LoadingScreen message="Loading Settings..." />;
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
                <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Link href="/dashboard/client/details" passHref>
                        <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
                            <DashboardIcon />
                        </IconButton>
                    </Link>
                    <Typography variant="h5" sx={{ color: '#fefae0'}}>Client Portal</Typography>
                </Box>
                <List>
                    {clientMenu.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton component={Link} href={item.path} sx={globalStyles.listItemButton}>
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
                                src={formData.avatar_url || currentUser?.user_metadata?.avatar_url || "/toroLogo.jpg"} 
                                alt="User Profile" 
                                fill 
                                style={{ objectFit: 'cover' }} 
                            />
                        </Box>
                        {sidebarOpen && (
                            <Box sx={{ minWidth: 0 }}>
                                <Typography sx={{ fontWeight: '600', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fefae0' }}>
                                    {formData.name || currentUser?.user_metadata?.full_name || "John Doe"}
                                </Typography>
                                <Typography sx={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'rgba(254, 250, 224, 0.7)' }}>
                                    {formData.email || currentUser?.email || "user@toro.com"}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Button onClick={handleLogout} fullWidth sx={{ padding: '0.75rem', background: 'transparent', border: '1px solid #fefae0', borderRadius: '8px', color: '#fefae0', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', '&:hover': { background: '#6b705c' } }}>
                        {sidebarOpen ? 'Logout' : <LogoutIcon />}
                    </Button>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={clientSettingsStyles.mainContent}>
                <Box sx={clientSettingsStyles.pageHeader}>
                    <Typography variant="h4" sx={clientSettingsStyles.pageHeaderText}><SettingsIcon sx={clientSettingsStyles.headerIcon} />Settings</Typography>
                    <Typography variant="body1" sx={clientSettingsStyles.headerSubtext}>Manage your account preferences and security settings</Typography>
                </Box>

                <Tabs value={activeTab} onChange={handleTabChange} sx={clientSettingsStyles.tabs}>
                    <Tab label="Profile" icon={<ProfileIcon />} iconPosition="start" sx={clientSettingsStyles.tab} />
                    <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={clientSettingsStyles.tab} />
                    <Tab label="Preferences" icon={<LanguageIcon />} iconPosition="start" sx={clientSettingsStyles.tab} />
                </Tabs>

                <Card sx={clientSettingsStyles.card}>
                    <CardContent>
                        {/* Profile Tab Content */}
                        {activeTab === 0 && (
                            <Box component="form" onSubmit={handleSubmit}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={clientSettingsStyles.profileSectionHeader}>Personal Information</Typography>
                                    {editMode ? (
                                        <Stack direction="row" spacing={1}>
                                            <Button type="submit" variant="contained" startIcon={<CheckIcon />} sx={clientSettingsStyles.profileEditButtons}>Save</Button>
                                            <Button variant="outlined" startIcon={<CloseIcon />} onClick={handleCancelEdit} sx={clientSettingsStyles.profileCancelButton}>Cancel</Button>
                                        </Stack>
                                    ) : (
                                        <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditMode(true)} sx={clientSettingsStyles.profileCancelButton}>Edit Profile</Button>
                                    )}
                                </Stack>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <Box sx={clientSettingsStyles.profileAvatarContainer}>
                                            <Avatar 
                                                src={avatarPreview || formData.avatar_url || currentUser?.user_metadata?.avatar_url} 
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
                                                    value={formData.name || currentUser?.user_metadata?.full_name || ''} 
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
                                                    value={formData.email || currentUser?.email || ''} 
                                                    disabled 
                                                    sx={clientSettingsStyles.profileTextField(false)} 
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField 
                                                    fullWidth 
                                                    label="Company" 
                                                    name="company" 
                                                    value={formData.company || currentUser?.user_metadata?.company || ''} 
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
                                                    value={formData.position || currentUser?.user_metadata?.position || ''} 
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
                                                    value={formData.phone || currentUser?.user_metadata?.phone || ''} 
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
                            <Box component="form" onSubmit={handleSubmit}>
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
                            <Box component="form" onSubmit={handleSubmit}>
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

            <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="success" sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Logging out...
                </Alert>
            </Snackbar>
        </Box>
    );
}