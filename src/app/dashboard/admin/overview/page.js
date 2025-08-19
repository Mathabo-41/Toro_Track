/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Grid, Card, CardContent,
  Stack, Avatar, List, ListItem, ListItemText, Tooltip,
  Divider, Button, Drawer, ListItemButton
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
   Assessment as ReportsIcon, //using it for the quick actions button for navigation to the performance screen
  Assignment as ProjectsIcon,
  Groups as TeamsIcon,
  Timeline as ActivityIcon,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon
} from '@mui/icons-material';
//snack bar 
import { Snackbar, Alert } from '@mui/material';


import useOverview from './useOverview/page';
import { useAdminStore, adminMenu } from '../common/adminStore';
import * as globalStyles from '../common/styles';
import * as styles from './styles';

export default function AdminOverviewPage() {
  const { metrics, activities } = useOverview();
  const { selectedMenu, setSelectedMenu } = useAdminStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState('');

  //router for redirection/navigation
  const router = useRouter();
  
  //snack-bar state 
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  // Function to handle the logout action with snackbar and redirect to the login page
  const handleLogout = () => {
    setSnackbarMessage('Logging out...');
    setOpenSnackbar(true);//shows feedback for snackbar
    setTimeout(()=> {
       router.push('/login');
    }, 1500); //snackbar will redirect after 1.5 seconds.
  };

  // Function to handle quick action clicks with informative messages
  const handleQuickActionClick = (actionName, destination) => {
    setSnackbarMessage(`Redirecting to ${destination} to ${actionName}`);
    setOpenSnackbar(true);
    
    // Close snackbar after 2 seconds and then navigate
    setTimeout(() => {
      setOpenSnackbar(false);
      // Navigate based on the action
      switch(actionName) {
        case 'Add New Client':
          router.push('/dashboard/admin/users');
          break;
        case 'Create Project':
          router.push('/dashboard/admin/projects');
          break;
        case 'Projects Progress':
          router.push('/dashboard/admin/reports');
          break;
        default:
          break;
      }
    }, 1500);
  };

  return (
    <Box sx={globalStyles.rootBox}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
        <Box sx={globalStyles.drawerHeader}>
          <Typography variant="h5">Admin Portal</Typography>
        </Box>
        
        {/* Menu Items */}
        {adminMenu.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={globalStyles.listItemButton}
              onClick={() => setActiveCategory(item.name)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* User profile and logout section at the bottom of the sidebar */}
        <div style={{
          padding: '1rem',
          borderTop: '2px solid #6b705c',
          marginTop: 'auto'
        }}>
          {/* User profile picture and details */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              border: '2px solid #f3722c' // Orange border for profile picture
            }}>
              <Image
                src="/toroLogo.jpg" // Path to the user's profile image
                alt="User Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            {/* Display user name and email when sidebar is open */}
            {sidebarOpen && (
              <div style={{ minWidth: 0 }}>
                <p style={{ 
                  fontWeight: '600', 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#fefae0' // Light text color
                }}>
                  John Doe
                </p>
                <p style={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.8, 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgba(254, 250, 224, 0.7)' // Semi-transparent light text
                }}>
                  {activeCategory ? `${activeCategory.replace(/([A-Z])/g, ' $1').trim()}@toro.com` : 'user@toro.com'}
                </p>
              </div>
            )}
          </div>
          {/* Logout button */}
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid #fefae0', // Light border
              borderRadius: '8px',
              color: '#fefae0', // Light text color
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              ':hover': {
                background: '#6b705c' // Darker background on hover
              }
            }}
          >
            {sidebarOpen ? 'Logout' : '→'}
          </button>
        </div>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={globalStyles.mainContentBox}>
        <Box sx={globalStyles.pageHeader}>
          <Typography variant="h4" sx={globalStyles.pageHeaderText}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" sx={globalStyles.pageHeaderText}>
            Welcome back! Here's what's happening today.
          </Typography>
        </Box>

        {/* Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map(({ title, value, change, icon, trend }, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={styles.summaryCard}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={styles.avatarBox}>{icon}</Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {title}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="baseline">
                        <Typography variant="h4" sx={styles.metricValue}>{value}</Typography>
                        <Typography sx={trend === 'up' ? styles.upTrend : styles.downTrend}>
                          {trend === 'up' ? <TrendUpIcon fontSize="small" /> : <TrendDownIcon fontSize="small" />}
                          {change}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Activity + Quick Actions */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={styles.activityCard}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2, fontWeight: 700 }}>
                  Recent Activity
                </Typography>
                <List>
                  {activities.map(({ action, time }, i) => (
                    <React.Fragment key={i}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={<Typography color="text.secondary">{action}</Typography>}
                          secondary={<Typography color="text.primary">{time}</Typography>}
                        />
                      </ListItem>
                      {i < activities.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={styles.quickActionsCard}>
              <CardContent>
                <Typography variant="h6" sx={styles.quickActionsTitle}>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  {/* Add New Client Button */}
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<PeopleIcon />} 
                    sx={styles.quickActionButton}
                    onClick={() => handleQuickActionClick('Add New Client', 'Users page')}
                  >
                    Add New Client
                  </Button>
                  
                  {/* Create Project Button */}
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<AssignmentIcon />} 
                    sx={styles.quickActionButton}
                    onClick={() => handleQuickActionClick('Create Project', 'Projects page')}
                  >
                    Create Project
                  </Button>
                  
                  {/* Projects Progress Button */}
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<AssessmentIcon />} 
                    sx={styles.quickActionButton}
                    onClick={() => handleQuickActionClick('Projects Progress', 'Reports page')}
                  >
                    Projects Progress
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar with message when the user logs out of the system*/}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" 
          sx={{ width: '100%', 
            fontWeight: 'bold',
            fontSize: '1rem'
          }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}