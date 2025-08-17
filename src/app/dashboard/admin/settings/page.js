/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';
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
  Chip,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Edit as EditIcon,
  Backup as BackupIcon,
  Cached as CachedIcon,
  RestartAlt as RestartAltIcon,
  DeleteForever as DeleteForeverIcon
} from '@mui/icons-material';

// Import local files
import { styles } from './styles';
import { useSettings } from './useSettings/page';

// Main Component
// ------------------------------------------------
export default function SystemSettings() {
  // Region: Hooks and State
  // ------------------------------------------------
  const { settingsCategories, menu, handleConfigure, handleMaintenance } = useSettings();

  // Region: Render
  // ------------------------------------------------
  return (
    <Box sx={styles.mainContainer}>
      {/* Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={styles.sidebarHeader}>
          <Typography variant="h5" sx={{ color: '#fefae0' }}>
            Admin Panel
          </Typography>
        </Box>
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={styles.sidebarListItemButton(item.name)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={styles.mainContent}>
        {/* Page Header */}
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}>
            <SettingsIcon sx={styles.headerIcon} />
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
              <Card sx={styles.settingsCard}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Avatar sx={styles.settingsAvatar}>
                      <Box sx={{ color: '#525252' }}>
                        {category.icon}
                      </Box>
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={styles.settingsCardTitle}>
                        {category.name}
                      </Typography>
                      <Chip
                        label={category.status}
                        size="small"
                        sx={styles.statusChip(category.status)}
                      />
                    </Box>
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#525252', mb: 2 }}>
                    {category.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    fullWidth
                    onClick={() => handleConfigure(category.name)}
                    sx={styles.configureButton}
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
            <Card sx={styles.maintenanceCard}>
              <CardContent>
                <Typography variant="h6" sx={styles.maintenanceTitle}>
                  System Maintenance
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<BackupIcon />}
                    fullWidth
                    onClick={() => handleMaintenance('Backup Database')}
                    sx={styles.backupButton}
                  >
                    Backup Database
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CachedIcon />}
                    fullWidth
                    onClick={() => handleMaintenance('Clear Cache')}
                    sx={styles.clearCacheButton}
                  >
                    Clear Cache
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={styles.dangerousCard}>
              <CardContent>
                <Typography variant="h6" sx={styles.dangerousTitle}>
                  Dangerous Zone
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    fullWidth
                    onClick={() => handleMaintenance('Reset All Settings')}
                    sx={styles.resetButton}
                  >
                    Reset All Settings
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DeleteForeverIcon />}
                    fullWidth
                    onClick={() => handleMaintenance('Purge Test Data')}
                    sx={styles.purgeButton}
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