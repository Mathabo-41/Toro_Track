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
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      minWidth: '89vw',
      backgroundColor: '#fefae0',
      color: '#525252'
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
          <Box sx={{ p: 2, borderBottom: '1px solid #6b705c' }}>
            <Typography variant="h5" sx={{ color: '#fefae0' }}>
              Admin Panel
            </Typography>
          </Box>
          <List>
            {adminMenu.map((item, index) => (
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
                admin@toro.com
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
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          backgroundColor: '#fefae0'
        }}
      >
        {/* Page Header */}
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
              <Card sx={{ 
                backgroundColor: '#fefae0',
                height: '100%',
                border: '1px solid #525252',
                '&:hover': {
                  borderColor: '#f3722c',
                  boxShadow: '0 0 15px rgba(243, 114, 44, 0.3)'
                }
              }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: '#e0e0d1',
                      width: 48,
                      height: 48,
                      border: '1px solid #6b705c'
                    }}>
                      <Box sx={{ color: '#525252' }}>
                        {category.icon}
                      </Box>
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#283618', fontWeight: 500 }}>
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
                    color: '#525252',
                    mb: 2
                  }}>
                    {category.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    fullWidth
                    sx={{
                      color: '#283618',
                      borderColor: '#283618',
                      '&:hover': {
                        backgroundColor: '#e0e0d1',
                        borderColor: '#283618'
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
              backgroundColor: '#fefae0',
              border: '1px solid #525252'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#525252', mb: 2, fontWeight: 500 }}>
                  System Maintenance
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<BackupIcon />}
                    fullWidth
                    sx={{
                      backgroundColor: '#283618',
                      color: '#fefae0',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#606c38'
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
                      color: '#283618',
                      borderColor: '#283618',
                      '&:hover': {
                        backgroundColor: '#e0e0d1',
                        borderColor: '#283618'
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
              backgroundColor: '#fefae0',
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