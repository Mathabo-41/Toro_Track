'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Grid,
  Chip
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
  Link as LinkIcon,
  Edit as EditIcon,
  Backup as BackupIcon,
  Cached as CachedIcon,
  RestartAlt as RestartAltIcon,
  DeleteForever as DeleteForeverIcon
} from '@mui/icons-material';
import Link from 'next/link';

const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

const settingsCategories = [
  { 
    name: 'Notifications', 
    description: 'Configure email and in-app notifications',
    icon: <NotificationsIcon color="primary" />,
    status: 'active'
  },
  { 
    name: 'Theme', 
    description: 'Change color scheme and appearance',
    icon: <PaletteIcon color="secondary" />,
    status: 'active'
  },
  { 
    name: 'Security', 
    description: 'Password policies and authentication',
    icon: <SecurityIcon color="success" />,
    status: 'active'
  },
  { 
    name: 'Integrations', 
    description: 'Connect with other tools',
    icon: <LinkIcon color="warning" />,
    status: 'pending'
  },
  { 
    name: 'Data Management', 
    description: 'Backup and restore system data',
    icon: <SettingsIcon color="info" />,
    status: 'active'
  },
  { 
    name: 'API Configuration', 
    description: 'Manage API keys and endpoints',
    icon: <SettingsIcon color="error" />,
    status: 'inactive'
  }
];

export default function SystemSettings() {
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#000000', // Pure black background
      color: 'rgba(255, 255, 255, 0.92)' // High-contrast white text
    }}>
      {/* Jet Black Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#000000',
            borderRight: '1px solid #222',
            color: '#fff'
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #222' }}>
          <Typography variant="h6"> 
            👑 Admin Panel
          </Typography>
        </Box>
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={{ 
                  color: '#fff',
                  backgroundColor: item.name === 'Settings' ? '#1a1a1a' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#1a1a1a'
                  }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content with Pure Black Background */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          backgroundColor: '#000000'
        }}
      >
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 600 }}>
            <SettingsIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle', 
              color: '#f4c10f',
              
              fontSize: '2.5rem'
            }} />
            System Settings
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Configure application-wide preferences and options
          </Typography>
        </Box>

        {/* Settings Cards with Dark Gray Contrast */}
        <Grid container spacing={3}>
          {settingsCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ 
                backgroundColor: '#0a0a0a',
                height: '100%',
                border: '1px solid #222',
                '&:hover': {
                  borderColor: '#f4c10f',
                  boxShadow: '0 0 15px rgba(244, 193, 15, 0.3)'
                }
              }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: 'rgba(244, 193, 15, 0.1)',
                      width: 48,
                      height: 48,
                      border: '1px solid rgba(244, 193, 15, 0.3)'
                    }}>
                      {category.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#fff', fontWeight: 500 }}>
                        {category.name}
                      </Typography>
                      <Chip
                        label={category.status}
                        size="small"
                        sx={{
                          backgroundColor: 'transparent',
                          color: 
                            category.status === 'active' ? '#4caf50' :
                            category.status === 'pending' ? '#ff9800' : '#f44336',
                          border: 
                            category.status === 'active' ? '1px solid #4caf50' :
                            category.status === 'pending' ? '1px solid #ff9800' : '1px solid #f44336',
                          textTransform: 'capitalize'
                        }}
                      />
                    </Box>
                  </Stack>
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 2
                  }}>
                    {category.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    fullWidth
                    sx={{
                      color: '#f4c10f',
                      borderColor: '#f4c10f',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 193, 15, 0.15)',
                        borderColor: '#ffd700'
                      }
                    }}
                  >
                    Configure
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* System Actions with High Contrast */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              border: '1px solid #333'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontWeight: 500 }}>
                  System Maintenance
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<BackupIcon />}
                    fullWidth
                    sx={{
                      backgroundColor: '#f4c10f',
                      color: '#000',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#ffd700'
                      }
                    }}
                  >
                    Backup Database
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CachedIcon />}
                    fullWidth
                    sx={{
                      color: '#f4c10f',
                      borderColor: '#f4c10f',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 193, 15, 0.15)',
                        borderColor: '#ffd700'
                      }
                    }}
                  >
                    Clear Cache
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              border: '1px solid #f44336'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#f44336', mb: 2, fontWeight: 500 }}>
                  Dangerous Zone
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    fullWidth
                    sx={{
                      color: '#f44336',
                      borderColor: '#f44336',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 67, 54, 0.15)',
                        borderColor: '#ff5252'
                      }
                    }}
                  >
                    Reset All Settings
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DeleteForeverIcon />}
                    fullWidth
                    sx={{
                      backgroundColor: '#f44336',
                      '&:hover': {
                        backgroundColor: '#ff5252'
                      }
                    }}
                  >
                    Purge Test Data
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}