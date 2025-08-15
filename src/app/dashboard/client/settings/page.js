'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Box, Typography, Card, CardContent, Stack, Button,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  Divider, TextField, Avatar, Switch, FormControlLabel,
  Tabs, Tab, Grid, MenuItem, Paper
} from '@mui/material'
import {
  Settings as SettingsIcon,
  Person as ProfileIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Logout as LogoutIcon
} from '@mui/icons-material'

import { useClientStore } from '../common/clientStore'
import * as g from '../common/styles'
import * as s from './styles'
import {
  useProfile,
  useSaveProfile,
  useSavePassword,
  useSaveNotifications,
  useSavePreferences
} from './useClientSettings'

export default function ClientSettingsPage() {
  const { clientMenu, currentPath, setCurrentPath } = useClientStore()
  const [tab, setTab] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const { data: profile, isLoading } = useProfile()
  const saveProfile = useSaveProfile()
  const savePassword = useSavePassword()
  const saveNotifications = useSaveNotifications()
  const savePreferences = useSavePreferences()

  const [form, setForm] = useState({
    name: '', email: '', company: '', position: '', phone: '',
    currentPassword: '', newPassword: '', confirmPassword: '',
    notifications: false, newsletter: false,
    darkMode: false, language: 'en'
  })

  // Load form from API
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        email: profile.email,
        company: profile.company,
        position: profile.position,
        phone: profile.phone,
        notifications: profile.notifications,
        newsletter: profile.newsletter,
        darkMode: profile.preferences.darkMode,
        language: profile.preferences.language,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  }, [profile])

  // Sidebar highlight
  useEffect(() => {
    setCurrentPath('/dashboard/client/settings')
  }, [setCurrentPath])

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmitProfile = (e) => {
    e.preventDefault()
    saveProfile.mutate({
      name: form.name,
      email: form.email,
      company: form.company,
      position: form.position,
      phone: form.phone
    }, { onSuccess: () => setEditMode(false) })
  }

  const handleSubmitPassword = (e) => {
    e.preventDefault()
    savePassword.mutate({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword
    }, {
      onSuccess: () => alert('Password updated!')
    })
  }

  const handleSubmitNotifications = (e) => {
    e.preventDefault()
    saveNotifications.mutate({
      notifications: form.notifications,
      newsletter: form.newsletter
    })
  }

  const handleSubmitPreferences = (e) => {
    e.preventDefault()
    savePreferences.mutate({
      darkMode: form.darkMode,
      language: form.language
    })
  }

  return (
    <Box sx={s.mainBox}>
      <Drawer variant="permanent" anchor="left" sx={{ '& .MuiDrawer-paper': s.drawerPaper }}>
        <Box sx={s.drawerHeader}>
          <Typography variant="h5">Client Portal</Typography>
        </Box>
        <List>
          {clientMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                selected={item.path === currentPath}
                sx={{
                  ...s.listItemButton,
                  ...(item.path === currentPath && s.activeListItemButton)
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={s.mainContentBox}>
        <Box sx={g.headerBoxStyles}>
          <Typography variant="h4" sx={g.headerTitleStyles}>
            <SettingsIcon sx={g.headerIconStyles} />
            Settings
          </Typography>
          <Typography variant="body1" sx={g.headerSubtitleStyles}>
            Manage your account preferences and security settings
          </Typography>
        </Box>

        <Tabs value={tab} onChange={(_, v) => { setTab(v); setEditMode(false) }} sx={g.tabsStyles}>
          <Tab label="Profile"       icon={<ProfileIcon />}       iconPosition="start" sx={g.tabStyles} />
          <Tab label="Security"      icon={<SecurityIcon />}      iconPosition="start" sx={g.tabStyles} />
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={g.tabStyles} />
          <Tab label="Preferences"   icon={<LanguageIcon />}      iconPosition="start" sx={g.tabStyles} />
        </Tabs>

        <Card sx={g.cardStyles}>
          <CardContent>
            {/* Profile */}
            {tab === 0 && !isLoading && (
              <Box component="form" onSubmit={handleSubmitProfile}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Typography sx={s.profileHeaderTitle}>Personal Information</Typography>
                  {editMode ? (
                    <Stack direction="row" spacing={1} sx={s.profileButtonsStack}>
                      <Button type="submit" startIcon={<CheckIcon />} sx={s.saveButton}>Save</Button>
                      <Button onClick={() => setEditMode(false)} startIcon={<CloseIcon />} sx={s.cancelButton}>Cancel</Button>
                    </Stack>
                  ) : (
                    <Button onClick={() => setEditMode(true)} startIcon={<EditIcon />} sx={s.editProfileButton}>Edit Profile</Button>
                  )}
                </Stack>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={s.profileAvatar} />
                      {editMode && <Button sx={s.changePhotoButton}>Change Photo</Button>}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                      {[
                        ['Full Name','name'],
                        ['Email','email'],
                        ['Company','company'],
                        ['Position','position'],
                        ['Phone Number','phone']
                      ].map(([label,name]) => (
                        <Grid item xs={12} sm={6} key={name}>
                          <TextField
                            fullWidth
                            label={label}
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            disabled={!editMode}
                            sx={s.profileTextField(editMode)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Security */}
            {tab === 1 && (
              <Box component="form" onSubmit={handleSubmitPassword}>
                <Typography sx={s.securityTitle}>Security Settings</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography sx={s.securitySubtitle}>Change Password</Typography>
                    <Stack>
                      {['currentPassword','newPassword','confirmPassword'].map((field) => (
                        <TextField
                          key={field}
                          fullWidth
                          type="password"
                          label={field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm New Password'}
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          sx={s.passwordTextField}
                        />
                      ))}
                    </Stack>
                    <Button type="submit" startIcon={<SaveIcon />} sx={s.updatePasswordButton}>Update Password</Button>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography sx={s.securitySubtitle}>Two-Factor Authentication</Typography>
                    <Paper sx={s.securityPaper}>
                      <FormControlLabel
                        control={<Switch checked={true} sx={s.notificationSwitch}/>}
                        label={<Typography sx={s.notificationLabel}>Enable 2FA</Typography>}
                      />
                      <Typography sx={s.securityBodyText}>Adds extra layer of security</Typography>
                    </Paper>
                    <Typography sx={s.securitySubtitle}>Active Sessions</Typography>
                    <Paper sx={s.sessionPaper}>
                      <Typography sx={s.sessionDeviceText}>Current Device (Chrome, Windows)</Typography>
                      <Typography sx={s.sessionTimeText}>Last active: Just now</Typography>
                      <Button size="small" sx={s.logoutDevicesButton}>Logout All</Button>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Notifications */}
            {tab === 2 && (
              <Box component="form" onSubmit={handleSubmitNotifications}>
                <Typography sx={s.notificationsTitle}>Notification Preferences</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={s.notificationsPaper}>
                      <Typography sx={s.notificationsSubtitle}>Email Notifications</Typography>
                      <FormControlLabel
                        control={<Switch name="notifications" checked={form.notifications} onChange={handleChange} sx={s.notificationSwitch}/>}
                        label={<Typography sx={s.notificationLabel}>Project Updates</Typography>}
                      />
                      <FormControlLabel
                        control={<Switch name="newsletter" checked={form.newsletter} onChange={handleChange} sx={s.notificationSwitch}/>}
                        label={<Typography sx={s.notificationLabel}>Newsletter</Typography>}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={s.notificationsPaper}>
                      <Typography sx={s.notificationsSubtitle}>In-App Notifications</Typography>
                      <FormControlLabel
                        control={<Switch checked={true} sx={s.notificationSwitch}/>}
                        label={<Typography sx={s.notificationLabel}>Messages</Typography>}
                      />
                      <FormControlLabel
                        control={<Switch checked={true} sx={s.notificationSwitch}/>}
                        label={<Typography sx={s.notificationLabel}>Meeting Reminders</Typography>}
                      />
                    </Paper>
                  </Grid>
                </Grid>
                <Button type="submit" startIcon={<SaveIcon />} sx={s.savePreferencesButton}>Save Preferences</Button>
              </Box>
            )}

            {/* Preferences */}
            {tab === 3 && (
              <Box component="form" onSubmit={handleSubmitPreferences}>
                <Typography sx={s.preferencesTitle}>App Preferences</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={s.preferencesPaper}>
                      <Typography sx={s.preferencesSubtitle}>Display Settings</Typography>
                      <FormControlLabel
                        control={<Switch name="darkMode" checked={form.darkMode} onChange={handleChange} sx={s.darkModeSwitch}/>}
                        label={<Typography sx={s.darkModeLabel}>Dark Mode</Typography>}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography sx={s.preferencesSubtitle}>Language & Region</Typography>
                    <Paper sx={s.preferencesPaper}>
                      <TextField
                        select
                        fullWidth
                        name="language"
                        value={form.language}
                        onChange={handleChange}
                        sx={s.languageSelect}
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                      </TextField>
                    </Paper>
                  </Grid>
                </Grid>
                <Button type="submit" startIcon={<SaveIcon />} sx={s.savePreferencesButton}>Save Preferences</Button>
              </Box>
            )}
          </CardContent>
        </Card>

        <Box sx={s.logoutBox}>
          <Button startIcon={<LogoutIcon />} sx={s.logoutButton}>Logout</Button>
        </Box>
      </Box>
    </Box>
  )
}
