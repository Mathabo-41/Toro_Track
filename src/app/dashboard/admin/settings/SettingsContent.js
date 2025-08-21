/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Typography,  Button,  Card,
  CardContent,  Stack,  Avatar,  List,
  ListItem,  ListItemButton,  ListItemText,
  Drawer,  Grid,  Chip,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Edit as EditIcon,
  Backup as BackupIcon,
  Cached as CachedIcon,
  RestartAlt as RestartAltIcon,
  DeleteForever as DeleteForeverIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

//snack bar 
import { Snackbar, Alert } from '@mui/material';

// Import local files
import { styles } from './styles';
import { useSettings } from './useSettings/page';

// Main Component
// ------------------------------------------------
export default function SystemSettings() {
  // Region: Hooks and State
  // ------------------------------------------------
  const { settingsCategories, menu, handleConfigure, handleMaintenance } = useSettings();

  // State for sidebar
  const [sidebarOpen] = React.useState(true);

//router for redirection/navigation
     const router = useRouter();
  
     //snack-bar state 
     const [openSnackbar, setOpenSnackbar] = React.useState(false);

  // Function to handle the logout action  with snackbar and redirect to the login page
  const handleLogout = () => {
    setOpenSnackbar(true);//shows feedback for snackbar
    setTimeout(()=> {
       router.push('/login');
    }, 1500); //snackbar will redirect after 1.5 seconds.
   
  };

  // Region: Render
  // ------------------------------------------------
  return (
    <Box sx={styles.mainContainer}>
      {/* Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={styles.sidebarHeader}>
          <Typography variant="h5" sx={{ color: '#fefae0' }}>
            Admin Portal
          </Typography>
        </Box>
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={styles.sidebarListItemButton(item.name)}
                onMouseEnter={() => router.prefetch(item.path)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Region: User Profile Section */}
        <Box sx={{
          padding: '1rem',
          borderTop: '2px solid #6b705c',
          marginTop: 'auto'
        }}>
          {/* User Profile Container */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
            {/* Profile Picture */}
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

            {/* User Details (shown when sidebar is open) */}
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                {/* User Name */}
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
                
                {/* User Email */}
                <Typography sx={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.8, 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgba(254, 250, 224, 0.7)'
                }}>
                  user@toro.com
                </Typography>
              </Box>
            )}
          </Box>

          {/* Logout Button */}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              '&:hover': {
                background: '#6b705c'
              }
            }}
          >
            {sidebarOpen ? 'Logout' : <LogoutIcon />}
          </Button>
        </Box>
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

{/* Snackbar with message when the user logs out of the system /their portal */}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" 
        //we use SUCCESS instead of INFO so that we can have the power to switch colours
        sx={{ width: '100%', 
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          Logging out...
        </Alert>
      </Snackbar>

    </Box>
  );
}