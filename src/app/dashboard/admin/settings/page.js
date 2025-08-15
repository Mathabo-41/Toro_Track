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
import { useTheme } from '@mui/material/styles';
import {
  rootBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  activeListItemButton,
  mainContentBox,
  pageHeader,
  pageHeaderText,
  summaryCard,
  summaryIconAvatar,
  statusChip,
  statsCard,
  statsValue,
  statsAvatar,
  saveButton,
  saveButtonBox,
  dialogCancelButton,
  createProjectButton,
} from '../styles';

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
    icon: <NotificationsIcon />,
    status: 'active',
    color: 'info',
  },
  { 
    name: 'Theme', 
    description: 'Change color scheme and appearance',
    icon: <PaletteIcon />,
    status: 'active',
    color: 'secondary',
  },
  { 
    name: 'Security', 
    description: 'Password policies and authentication',
    icon: <SecurityIcon />,
    status: 'active',
    color: 'success',
  },
  { 
    name: 'Integrations', 
    description: 'Connect with other tools',
    icon: <LinkIcon />,
    status: 'pending',
    color: 'warning',
  },
  { 
    name: 'Data Management', 
    description: 'Backup and restore system data',
    icon: <SettingsIcon />,
    status: 'active',
    color: 'primary',
  },
  { 
    name: 'API Configuration', 
    description: 'Manage API keys and endpoints',
    icon: <SettingsIcon />,
    status: 'inactive',
    color: 'error',
  }
];

// Helper function for status chip styles based on the provided styles file
const getStatusChipStyles = (status) => {
  const theme = useTheme();
  switch (status) {
    case 'active':
      return {
        backgroundColor: theme.palette.info.background,
        color: theme.palette.info.light,
        border: `1px solid ${theme.palette.info.border}`,
        fontWeight: 'bold',
      };
    case 'pending':
      return {
        backgroundColor: theme.palette.highlight.main,
        color: theme.palette.coral.main,
        border: `1px solid ${theme.palette.coral.main}`,
        fontWeight: 'bold',
      };
    case 'inactive':
      return {
        backgroundColor: theme.palette.default.background,
        color: theme.palette.default.border,
        border: `1px solid ${theme.palette.default.border}`,
        fontWeight: 'bold',
      };
    default:
      return {};
  }
};

export default function SystemSettings() {
  const theme = useTheme();
  return (
    <Box sx={rootBox}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': drawerPaper(theme)
        }}
      >
        <Box sx={drawerHeader(theme)}>
          <Typography variant="h5">
            Admin Panel
          </Typography>
        </Box>
        <List>
          {adminMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={item.name === 'Settings' ? activeListItemButton(theme) : listItemButton(theme)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={mainContentBox(theme)}
      >
        {/* Page Header */}
        <Box sx={pageHeader}>
          <Typography variant="h4" sx={pageHeaderText(theme)}>
            <SettingsIcon sx={projectsPageHeaderIcon(theme)} />
            System Settings
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            Configure application-wide preferences and options
          </Typography>
        </Box>

        {/* Settings Cards */}
        <Grid container spacing={3}>
          {settingsCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{
                backgroundColor: theme.palette.background.default,
                height: '100%',
                border: `1px solid ${theme.palette.text.secondary}`,
                '&:hover': {
                  borderColor: theme.palette.coral.main,
                  boxShadow: `0 0 15px ${theme.palette.highlight.main}`
                }
              }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Avatar sx={summaryIconAvatar(category.color)(theme)}>
                        {category.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                        {category.name}
                      </Typography>
                      <Chip
                        label={category.status}
                        size="small"
                        sx={getStatusChipStyles(category.status)}
                      />
                    </Box>
                  </Stack>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.text.secondary,
                    mb: 2
                  }}>
                    {category.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    fullWidth
                    sx={{
                      color: theme.palette.text.primary,
                      borderColor: theme.palette.text.secondary,
                      '&:hover': {
                        backgroundColor: theme.palette.background.darker,
                        borderColor: theme.palette.text.primary
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
            <Card sx={reportsExportCard(theme)}>
              <CardContent>
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 2, fontWeight: 500 }}>
                  System Maintenance
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<BackupIcon />}
                    fullWidth
                    sx={createProjectButton(theme)}
                  >
                    Backup Database
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CachedIcon />}
                    fullWidth
                    sx={reportsExportButton(theme)}
                  >
                    Clear Cache
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{
              backgroundColor: theme.palette.background.default,
              border: `1px solid ${theme.palette.error.main}`
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: theme.palette.error.main, mb: 2, fontWeight: 500 }}>
                  Dangerous Zone
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    fullWidth
                    sx={{
                      color: theme.palette.error.main,
                      borderColor: theme.palette.error.main,
                      '&:hover': {
                        backgroundColor: theme.palette.error.light + '20',
                        borderColor: theme.palette.error.light
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
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.secondary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.error.light
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