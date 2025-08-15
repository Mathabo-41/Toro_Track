'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Drawer,
  ListItemButton,
  List,
  MenuItem,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Avatar,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  Paper,
  Grid
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
import {
  mainBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  activeListItemButton,
  mainContentBox,
  headerBox,
  headerTitle,
  headerIcon,
  headerSubtitle,
  tabs,
  tab,
  settingsCard,
  profileHeaderTitle,
  profileButtonsStack,
  saveButton,
  cancelButton,
  editProfileButton,
  profileAvatar,
  changePhotoButton,
  profileTextField,
  securityTitle,
  securitySubtitle,
  passwordTextField,
  updatePasswordButton,
  securityPaper,
  securityBodyText,
  sessionPaper,
  sessionDeviceText,
  sessionTimeText,
  logoutDevicesButton,
  notificationsTitle,
  notificationsPaper,
  notificationsSubtitle,
  notificationSwitch,
  notificationLabel,
  savePreferencesButton,
  preferencesTitle,
  preferencesPaper,
  preferencesSubtitle,
  darkModeSwitch,
  darkModeLabel,
  languageSelect,
  logoutBox,
  logoutButton,
} from '../styles';

/**
 * Client Settings Screen
 * * Features:
 * - Account management (profile, security, notifications)
 * - Dark mode toggle
 * - Language selection
 * - Profile editing
 * - Password change
 * - Consistent dark theme with gold accents
 */

const clientMenu = [
  { name: 'Project Details', path: '/dashboard/client/details' },
  { name: 'Raise Query', path: '/dashboard/client/query' },
  { name: 'Messages & Notifications', path: '/dashboard/client/messages' },
  { name: 'Settings', path: '/dashboard/client/settings' }
];

export default function ClientSettings() {
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: 'toro track',
    email: 'trtrack@yahoo.com',
    company: 'Law Firm Inc',
    position: 'Marketing Director',
    phone: '+27 45 847 8389',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: true,
    newsletter: false,
    language: 'en'
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // backend
    setEditMode(false);
    alert('Settings saved successfully!');
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    // Reset form data if needed
  };

  return (
    <Box sx={mainBox}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': drawerPaper,
        }}
      >
        <Box sx={drawerHeader}>
          <Typography variant="h5">
            Client Portal
          </Typography>
        </Box>
        <List>
          {clientMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{
                  ...listItemButton,
                  ...(item.name === 'Settings' && activeListItemButton),
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={mainContentBox}>
        {/* Header */}
        <Box sx={headerBox}>
          <Typography variant="h4" sx={headerTitle}>
            <SettingsIcon sx={headerIcon} />
            Settings
          </Typography>
          <Typography variant="body1" sx={headerSubtitle}>
            Manage your account preferences and security settings
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={tabs}
        >
          <Tab label="Profile" icon={<ProfileIcon />} iconPosition="start" sx={tab} />
          <Tab label="Security" icon={<SecurityIcon />} iconPosition="start" sx={tab} />
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={tab} />
          <Tab label="Preferences" icon={<LanguageIcon />} iconPosition="start" sx={tab} />
        </Tabs>

        {/* Tab Content */}
        <Card sx={settingsCard}>
          <CardContent>
            {activeTab === 0 && ( /* Profile Tab */
              <Box component="form" onSubmit={handleSubmit}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={profileHeaderTitle}>
                    Personal Information
                  </Typography>
                  {editMode ? (
                    <Stack direction="row" spacing={1} sx={profileButtonsStack}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<CheckIcon />}
                        sx={saveButton}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={handleCancelEdit}
                        sx={cancelButton}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => setEditMode(true)}
                      sx={editProfileButton}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Stack>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mb: 3
                    }}>
                      <Avatar
                        sx={profileAvatar}
                      />
                      {editMode && (
                        <Button
                          variant="outlined"
                          sx={changePhotoButton}
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
                          sx={profileTextField(editMode)}
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
                          sx={profileTextField(editMode)}
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
                          sx={profileTextField(editMode)}
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
                          sx={profileTextField(editMode)}
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
                          sx={profileTextField(editMode)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 1 && ( /* Security Tab */
              <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" sx={securityTitle}>
                  Security Settings
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={securitySubtitle}>
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
                        sx={passwordTextField}
                      />
                      <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        sx={passwordTextField}
                      />
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        sx={passwordTextField}
                      />
                    </Stack>

                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      sx={updatePasswordButton}
                    >
                      Update Password
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={securitySubtitle}>
                      Two-Factor Authentication
                    </Typography>

                    <Paper sx={securityPaper}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={true}
                            onChange={() => {}}
                            sx={notificationSwitch}
                          />
                        }
                        label={
                          <Typography sx={notificationLabel}>
                            Enable Two-Factor Authentication
                          </Typography>
                        }
                      />
                      <Typography variant="body2" sx={securityBodyText}>
                        Adds an extra layer of security to your account
                      </Typography>
                    </Paper>

                    <Typography variant="subtitle1" sx={securitySubtitle}>
                      Active Sessions
                    </Typography>

                    <Paper sx={sessionPaper}>
                      <Typography variant="body2" sx={sessionDeviceText}>
                        Current Device (Chrome, Windows)
                      </Typography>
                      <Typography variant="caption" sx={sessionTimeText}>
                        Last active: Just now
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={logoutDevicesButton}
                      >
                        Logout from all devices
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 2 && ( /* Notifications Tab */
              <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" sx={notificationsTitle}>
                  Notification Preferences
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={notificationsPaper}>
                      <Typography variant="subtitle1" sx={notificationsSubtitle}>
                        Email Notifications
                      </Typography>

                      <Stack spacing={1}>
                        <FormControlLabel
                          control={
                            <Switch
                              name="notifications"
                              checked={formData.notifications}
                              onChange={handleChange}
                              sx={notificationSwitch}
                            />
                          }
                          label={
                            <Typography sx={notificationLabel}>
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
                              sx={notificationSwitch}
                            />
                          }
                          label={
                            <Typography sx={notificationLabel}>
                              Newsletter
                            </Typography>
                          }
                        />
                      </Stack>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={notificationsPaper}>
                      <Typography variant="subtitle1" sx={notificationsSubtitle}>
                        In-App Notifications
                      </Typography>

                      <Stack spacing={1}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={true}
                              onChange={() => {}}
                              sx={notificationSwitch}
                            />
                          }
                          label={
                            <Typography sx={notificationLabel}>
                              Messages
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={true}
                              onChange={() => {}}
                              sx={notificationSwitch}
                            />
                          }
                          label={
                            <Typography sx={notificationLabel}>
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
                  sx={savePreferencesButton}
                >
                  Save Preferences
                </Button>
              </Box>
            )}

            {/* Preferences Tab */}
            {activeTab === 3 && (
              <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" sx={preferencesTitle}>
                  App Preferences
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={preferencesPaper}>
                      <Typography variant="subtitle1" sx={preferencesSubtitle}>
                        Display Settings
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={darkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                            sx={darkModeSwitch}
                          />
                        }
                        label={
                          <Typography sx={darkModeLabel}>
                            Dark Mode
                          </Typography>
                        }
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={preferencesSubtitle}>
                      Language & Region
                    </Typography>
                    <Paper sx={preferencesPaper}>
                      <TextField
                        select
                        fullWidth
                        label="Language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        sx={languageSelect}
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
                  sx={savePreferencesButton}
                >
                  Save Preferences
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Box sx={logoutBox}>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            sx={logoutButton}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}