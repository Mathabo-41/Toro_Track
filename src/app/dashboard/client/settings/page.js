'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
 */

const clientMenu = [
  { name: 'Project Details', path: '/dashboard/client/details' },
  { name: 'Raise Query', path: '/dashboard/client/query' },
  { name: 'Messages & Notifications', path: '/dashboard/client/messages' },
  { name: 'Settings', path: '/dashboard/client/settings' }
];

export default function ClientSettings() {
  const router = useRouter();
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
    //  send the data to  backend
    setEditMode(false);
    alert('Settings saved successfully!');
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    // Reset form data if needed
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#fefae0'
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
            backgroundColor: '#283618',
            borderRight: '1px solid #6b705c',
            color: '#fefae0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }}
      >
        <Box>
          <Box sx={{ p: 2, borderBottom: '2px solid #6b705c' }}>
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
                    color: '#fefae0',
                    backgroundColor: item.name === 'Settings' ? '#6b705c' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#6b705c'
                    }
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* User Profile Section */}
        <Box sx={{ 
          borderTop: '2px solid #6b705c',
          padding: '1rem',
          marginTop: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }}>
          {/* User profile picture and details */}
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
                client@toro.com
              </Typography>
            </Box>
          </Box>
          {/* Logout button */}
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
              '&:hover': {
                background: '#6b705c'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: '#fefae0'
      }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            color: '#525252',
            fontWeight: 500
          }}>
            <SettingsIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
              color: '#f3722c'
            }} />
            Settings
          </Typography>
          <Typography variant="body1" sx={{ color: '#525252' }}>
            Manage your account preferences and security settings
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#f3722c'
            },
            mb: 3
          }}
        >
          <Tab label="Profile" icon={<ProfileIcon />} iconPosition="start" sx={{ color: '#283618' }} />
          <Tab label="Security" icon={<SecurityIcon />} iconPosition="start" sx={{ color: '#283618' }} />
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={{ color: '#283618' }} />
          <Tab label="Preferences" icon={<LanguageIcon />} iconPosition="start" sx={{ color: '#283618' }} />
        </Tabs>

        {/* Tab Content */}
        <Card sx={{ 
          backgroundColor: '#ccd5ae', 
          border: '2px solid #606c38',
        }}>
          <CardContent>
            {activeTab === 0 && ( /* Profile Tab */
              <Box component="form" onSubmit={handleSubmit}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: '#283618' }}>
                    Personal Information
                  </Typography>
                  {editMode ? (
                    <Stack direction="row" spacing={1}>
                      <Button 
                        type="submit"
                        variant="contained"
                        startIcon={<CheckIcon />}
                        sx={{
                          backgroundColor: '#283618',
                          color: '#606c38',
                          '&:hover': {
                            backgroundColor: '#344e41',
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
                          color: '#606c38',
                          borderColor: '#606c38',
                          '&:hover': {
                            border: '#283618',
                            backgroundColor: '#283618',
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
                        color: '#606c38',
                        borderColor: '#606c38',
                        '&:hover': {
                          border: '#283618',
                          backgroundColor: '#283618',
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
                          border: '2px solid #f3722c'
                        }}
                      />
                      {editMode && (
                        <Button 
                          variant="outlined"
                          sx={{
                            color: '#f3722c',
                            borderColor: '#f3722c',
                            '&:hover': {
                              borderColor: '#e65c19'
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
                            '& .MuiInputLabel-root': { color: '#525252' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#a3a699',
                              },
                            },
                            '& .MuiInputBase-input': { 
                              color: '#283618',
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
                            '& .MuiInputLabel-root': { color: '#525252' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#a3a699',
                              },
                            },
                            '& .MuiInputBase-input': { 
                              color: '#283618',
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
                            '& .MuiInputLabel-root': { color: '#525252' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#a3a699',
                              },
                            },
                            '& .MuiInputBase-input': { 
                              color: '#283618',
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
                            '& .MuiInputLabel-root': { color: '#525252' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#a3a699',
                              },
                            },
                            '& .MuiInputBase-input': { 
                              color: '#283618',
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
                            '& .MuiInputLabel-root': { color: '#525252' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#a3a699',
                              },
                            },
                            '& .MuiInputBase-input': { 
                              color: '#283618',
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
                  color: '#283618',
                  mb: 3
                }}>
                  Security Settings
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ 
                      color: '#283618',
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
                      sx={{
                        mt: 3,
                        backgroundColor: '#f3722c',
                        color: '#fefae0',
                        '&:hover': {
                          backgroundColor: '#e65c19'
                        }
                      }}
                    >
                      Update Password
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ 
                      color: '#283618',
                      mb: 2
                    }}>
                      Two-Factor Authentication
                    </Typography>

                    <Paper sx={{ 
                      p: 2,
                      mb: 3,
                      backgroundColor: '#a3a699',
                      border: '1px solid #6b705c'
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
                          <Typography sx={{ color: '#283618' }}>
                            Enable Two-Factor Authentication
                          </Typography>
                        }
                        sx={{ ml: 0 }}
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(40, 54, 24, 0.7)',
                        mt: 1
                      }}>
                        Adds an extra layer of security to your account
                      </Typography>
                    </Paper>

                    <Typography variant="subtitle1" sx={{ 
                      color: '#283618',
                      mb: 2
                    }}>
                      Active Sessions
                    </Typography>

                    <Paper sx={{ 
                      p: 2,
                      backgroundColor: '#a3a699',
                      border: '1px solid #6b705c'
                    }}>
                      <Typography variant="body2" sx={{ color: '#283618' }}>
                        Current Device (Chrome, Windows)
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(40, 54, 24, 0.5)' }}>
                        Last active: Just now
                      </Typography>
                      <Button 
                        variant="outlined"
                        size="small"
                        sx={{
                          mt: 1,
                          color: '#d32f2f',
                          borderColor: '#d32f2f',
                          '&:hover': {
                            borderColor: '#b71c1c'
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
                  color: '#283618',
                  mb: 3
                }}>
                  Notification Preferences
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ 
                      p: 2,
                      mb: 2,
                      backgroundColor: '#a3a699',
                      border: '1px solid #6b705c'
                    }}>
                      <Typography variant="subtitle1" sx={{ 
                        color: '#283618',
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
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: '#f3722c'
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: '#f3722c'
                                }
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ color: '#283618' }}>
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
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: '#f3722c'
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: '#f3722c'
                                }
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ color: '#283618' }}>
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
                      backgroundColor: '#a3a699',
                      border: '1px solid #6b705c'
                    }}>
                      <Typography variant="subtitle1" sx={{ 
                        color: '#283618',
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
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: '#f3722c'
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: '#f3722c'
                                }
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ color: '#283618' }}>
                              Messages
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          control={
                            <Switch 
                              checked={true}
                              onChange={() => {}}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: '#f3722c'
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: '#f3722c'
                                }
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ color: '#283618' }}>
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
                    backgroundColor: '#f3722c',
                    color: '#fefae0',
                    '&:hover': {
                      backgroundColor: '#e65c19'
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
                <Typography variant="h6" sx={{ color: '#283618', mb: 3 }}>
                  App Preferences
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ 
                      p: 2,
                      mb: 2,
                      backgroundColor: '#a3a699',
                      border: '1px solid #6b705c'
                    }}>
                      <Typography variant="subtitle1" sx={{ 
                        color: '#283618',
                        mb: 1
                      }}>
                        Display Settings
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={darkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#f3722c'
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#f3722c'
                              }
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ color: '#283618' }}>
                            Dark Mode
                          </Typography>
                        }
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ color: '#283618', mb: 2 }}>
                      Language & Region
                    </Typography>
                    <Paper sx={{ 
                      p: 2,
                      backgroundColor: '#a3a699',
                      border: '1px solid #6b705c'
                    }}>
                      <TextField
                        select
                        fullWidth
                        label="Language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        sx={{
                          '& .MuiInputLabel-root': { color: '#525252' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#6b705c',
                            },
                          },
                          '& .MuiInputBase-input': { color: '#283618' },
                          '& .MuiSvgIcon-root': { color: '#6b705c' }
                        }}
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
                  sx={{
                    mt: 3,
                    backgroundColor: '#f3722c',
                    color: '#fefae0',
                    '&:hover': {
                      backgroundColor: '#e65c19'
                    }
                  }}
                >
                  Save Preferences
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}