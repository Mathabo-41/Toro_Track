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

/**
 * Client Settings Screen
 * 
 * Features:
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
  const [darkMode, setDarkMode] = useState(true);
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
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#000000' //  black background
    }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#000000', // Pure black
            borderRight: '1px solid #222', // Subtle border
            color: '#fff' // White text
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #222' }}>
          <Typography variant="h6"> 
            👔 Client Portal
          </Typography>
        </Box>
        <List>
          {clientMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={{ 
                  color: '#fff',
                  backgroundColor: item.name === 'Settings' ? '#1a1a1a' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#1a1a1a' // Darker background on hover
                  }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: '#000000' //  black background
      }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            color: '#fff',
            fontWeight: 500
          }}>
            <SettingsIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
              color: '#f4c10f' // Gold accent
            }} />
            Settings
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Manage your account preferences and security settings
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#f4c10f' // Gold indicator
            },
            mb: 3
          }}
        >
          <Tab label="Profile" icon={<ProfileIcon />} iconPosition="start" sx={{ color: '#fff' }} />
          <Tab label="Security" icon={<SecurityIcon />} iconPosition="start" sx={{ color: '#fff' }} />
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={{ color: '#fff' }} />
          <Tab label="Preferences" icon={<LanguageIcon />} iconPosition="start" sx={{ color: '#fff' }} />
        </Tabs>

        {/* Tab Content */}
        <Card sx={{ 
          backgroundColor: '#0a0a0a',
          border: '1px solid #222'
        }}>
          <CardContent>
            {activeTab === 0 && ( /* Profile Tab */
              <Box component="form" onSubmit={handleSubmit}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    Personal Information
                  </Typography>
                  {editMode ? (
                    <Stack direction="row" spacing={1}>
                      <Button 
                        type="submit"
                        variant="contained"
                        startIcon={<CheckIcon />}
                        sx={{
                          backgroundColor: '#f4c10f',
                          color: '#000',
                          '&:hover': {
                            backgroundColor: '#d1a20b'
                          }
                        }}
                      >
                        Save
                      </Button>
                      <Button 
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={handleCancelEdit}
                        sx={{
                          color: '#f4c10f',
                          borderColor: '#f4c10f',
                          '&:hover': {
                            borderColor: '#d1a20b'
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  ) : (
                    <Button 
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => setEditMode(true)}
                      sx={{
                        color: '#f4c10f',
                        borderColor: '#f4c10f',
                        '&:hover': {
                          borderColor: '#d1a20b'
                        }
                      }}
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
                        sx={{ 
                          width: 120, 
                          height: 120,
                          mb: 2,
                          border: '2px solid #f4c10f'
                        }}
                      />
                      {editMode && (
                        <Button 
                          variant="outlined"
                          sx={{
                            color: '#f4c10f',
                            borderColor: '#f4c10f',
                            '&:hover': {
                              borderColor: '#d1a20b'
                            }
                          }}
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
                          sx={{
                            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.23)',
                              },
                            },
                            '& .MuiInputBase-input': { 
                              color: '#fff',
                              opacity: editMode ? 1 : 0.7
                            }
                          }}
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
                          sx={{
                            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.23)',
                              },
                            },
                            '& .MuiInputBase-input': { 
                              color: '#fff',
                              opacity: editMode ? 1 : 0.7
                            }
                          }}
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
                          sx={{
                            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.23)',
                              },
                            },
                            '& .MuiInputBase-input': { 
                              color: '#fff',
                              opacity: editMode ? 1 : 0.7
                            }
                          }}
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
                          sx={{
                            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.23)',
                              },
                            },
                            '& .MuiInputBase-input': { 
                              color: '#fff',
                              opacity: editMode ? 1 : 0.7
                            }
                          }}
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
                          sx={{
                            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.23)',
                              },
                            },
                            '& .MuiInputBase-input': { 
                              color: '#fff',
                              opacity: editMode ? 1 : 0.7
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 1 && ( /* Security Tab */
              <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" sx={{ 
                  color: '#fff',
                  mb: 3
                }}>
                  Security Settings
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ 
                      color: '#fff',
                      mb: 2
                    }}>
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
                          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.23)',
                            },
                          },
                          '& .MuiInputBase-input': { color: '#fff' }
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
                          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.23)',
                            },
                          },
                          '& .MuiInputBase-input': { color: '#fff' }
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
                          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.23)',
                            },
                          },
                          '& .MuiInputBase-input': { color: '#fff' }
                        }}
                      />
                    </Stack>

                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      sx={{
                        mt: 3,
                        backgroundColor: '#f4c10f',
                        color: '#000',
                        '&:hover': {
                          backgroundColor: '#d1a20b'
                        }
                      }}
                    >
                      Update Password
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ 
                      color: '#fff',
                      mb: 2
                    }}>
                      Two-Factor Authentication
                    </Typography>

                    <Paper sx={{ 
                      p: 2,
                      mb: 3,
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333'
                    }}>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={true}
                            onChange={() => {}}
                            color="primary"
                          />
                        }
                        label={
                          <Typography sx={{ color: '#fff' }}>
                            Enable Two-Factor Authentication
                          </Typography>
                        }
                        sx={{ ml: 0 }}
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        mt: 1
                      }}>
                        Adds an extra layer of security to your account
                      </Typography>
                    </Paper>

                    <Typography variant="subtitle1" sx={{ 
                      color: '#fff',
                      mb: 2
                    }}>
                      Active Sessions
                    </Typography>

                    <Paper sx={{ 
                      p: 2,
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333'
                    }}>
                      <Typography variant="body2" sx={{ color: '#fff' }}>
                        Current Device (Chrome, Windows)
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        Last active: Just now
                      </Typography>
                      <Button 
                        variant="outlined"
                        size="small"
                        sx={{
                          mt: 1,
                          color: '#f44336',
                          borderColor: '#f44336',
                          '&:hover': {
                            borderColor: '#d32f2f'
                          }
                        }}
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
                <Typography variant="h6" sx={{ 
                  color: '#fff',
                  mb: 3
                }}>
                  Notification Preferences
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ 
                      p: 2,
                      mb: 2,
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333'
                    }}>
                      <Typography variant="subtitle1" sx={{ 
                        color: '#fff',
                        mb: 1
                      }}>
                        Email Notifications
                      </Typography>

                      <Stack spacing={1}>
                        <FormControlLabel
                          control={
                            <Switch 
                              name="notifications"
                              checked={formData.notifications}
                              onChange={handleChange}
                              color="primary"
                            />
                          }
                          label={
                            <Typography sx={{ color: '#fff' }}>
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
                              color="primary"
                            />
                          }
                          label={
                            <Typography sx={{ color: '#fff' }}>
                              Newsletter
                            </Typography>
                          }
                        />
                      </Stack>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={{ 
                      p: 2,
                      mb: 2,
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333'
                    }}>
                      <Typography variant="subtitle1" sx={{ 
                        color: '#fff',
                        mb: 1
                      }}>
                        In-App Notifications
                      </Typography>

                      <Stack spacing={1}>
                        <FormControlLabel
                          control={
                            <Switch 
                              checked={true}
                              onChange={() => {}}
                              color="primary"
                            />
                          }
                          label={
                            <Typography sx={{ color: '#fff' }}>
                              Messages
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          control={
                            <Switch 
                              checked={true}
                              onChange={() => {}}
                              color="primary"
                            />
                          }
                          label={
                            <Typography sx={{ color: '#fff' }}>
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
                  sx={{
                    mt: 3,
                    backgroundColor: '#f4c10f',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#d1a20b'
                    }
                  }}
                >
                  Save Preferences
                </Button>
              </Box>
            )}

    {/* Preferences Tab */} 
            {activeTab === 3 && (
  <Box component="form" onSubmit={handleSubmit}>
    <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
      App Preferences
    </Typography>

    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        {/* Dark mode switch remains the same */}
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" sx={{ color: '#fff', mb: 2 }}>
          Language & Region
        </Typography>
        
        <Paper sx={{ 
          p: 2,
          backgroundColor: '#1a1a1a',
          border: '1px solid #333'
        }}>
         
        </Paper>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{
                    mt: 3,
                    backgroundColor: '#f4c10f',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#d1a20b'
                    }
                  }}
                >
                  Save Preferences
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            sx={{
              color: '#f44336',
              borderColor: '#f44336',
              '&:hover': {
                borderColor: '#d32f2f'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}