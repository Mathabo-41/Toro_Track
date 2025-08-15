// features/admin/SystemSettings/page.js
'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip,
  Button
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

import * as common from '../common/styles';
import * as styles from './styles';
import { useSettings } from './useSettings/page';

const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }
];

export default function SystemSettingsPage() {
  const theme = useTheme();
  const {
    categories,
    categoriesLoading,
    categoriesError,
    runMaintenance,
    maintenanceLoading,
    runDangerous,
    dangerousLoading
  } = useSettings();

  return (
    <Box sx={common.rootBox}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ width: 240, '& .MuiDrawer-paper': common.drawerPaper }}
      >
        <Box sx={common.drawerHeader}>
          <Typography variant="h5">Admin Panel</Typography>
        </Box>
        <List>
          {adminMenu.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={
                  item.name === 'Settings'
                    ? common.activeListItemButton
                    : common.listItemButton
                }
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={common.mainContentBox}>
        <Box sx={common.pageHeader}>
          <Typography sx={styles.settingsPageHeaderText(theme)} variant="h4">
            <SettingsIcon sx={styles.settingsPageHeaderIcon(theme)} />
            System Settings
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            Configure application-wide preferences and options
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {!categoriesLoading &&
            !categoriesError &&
            categories.map((cat) => (
              <Grid item xs={12} sm={6} md={4} key={cat.name}>
                <Card sx={styles.categoryCard(theme)}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                      <Avatar sx={styles.summaryIconAvatar(cat.color)(theme)}>
                        {{
                          Notifications: <NotificationsIcon />,
                          Theme: <PaletteIcon />,
                          Security: <SecurityIcon />,
                          Integrations: <LinkIcon />,
                          'Data Management': <SettingsIcon />,
                          'API Configuration': <SettingsIcon />
                        }[cat.name]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          {cat.name}
                        </Typography>
                        <Chip
                          label={cat.status}
                          size="small"
                          sx={styles.statusChipStyle(cat.status)(theme)}
                        />
                      </Box>
                    </Stack>
                    <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                      {cat.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      fullWidth
                      sx={styles.configureButton(theme)}
                    >
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        {/* System Maintenance */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={styles.maintenanceCard(theme)}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 500, color: theme.palette.text.secondary }}
                >
                  System Maintenance
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<BackupIcon />}
                    fullWidth
                    onClick={() => runMaintenance('backup')}
                    disabled={maintenanceLoading}
                    sx={styles.backupButton(theme)}
                  >
                    Backup Database
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CachedIcon />}
                    fullWidth
                    onClick={() => runMaintenance('clear-cache')}
                    disabled={maintenanceLoading}
                    sx={styles.clearCacheButton(theme)}
                  >
                    Clear Cache
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Dangerous Zone */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: theme.palette.background.default, border: `1px solid ${theme.palette.error.main}` }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 500, color: theme.palette.error.main }}
                >
                  Dangerous Zone
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    fullWidth
                    onClick={() => runDangerous('reset-settings')}
                    disabled={dangerousLoading}
                    sx={styles.resetButton(theme)}
                  >
                    Reset All Settings
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DeleteForeverIcon />}
                    fullWidth
                    onClick={() => runDangerous('purge-data')}
                    disabled={dangerousLoading}
                    sx={styles.purgeButton(theme)}
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
