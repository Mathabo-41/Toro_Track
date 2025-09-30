// This file combines logic and styles for the admin overview screen.
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client'; 
import {
  Box, Typography, Grid, Card, CardContent,
  Stack, Avatar, List, ListItem, ListItemText,
  Divider, Button, Drawer, ListItemButton, Snackbar, Alert, IconButton
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';

import useOverview from './useOverview/page';
import { useAdminStore, adminMenu } from '../common/adminStore';
import * as globalStyles from '../common/styles';
import * as styles from './styles';

export default function AdminOverviewContent() {
  const router = useRouter();
  const supabase = createSupabaseClient(); // Create client instance
  const { metrics, activities } = useOverview();
  const { setSelectedMenu } = useAdminStore();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLogoutSnackbar, setIsLogoutSnackbar] = useState(false);

  /*
  Fetches the current user's data when the component loads.
  */
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  /*
  Signs out the current user and redirects to the login page.
  */
  const handleLogout = async () => {
    // Show green logout snackbar
    setSnackbarMessage('Logging out...');
    setIsLogoutSnackbar(true);
    setOpenSnackbar(true);
    
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push('/login');
    }, 1500);
  };

  const handleQuickActionClick = (actionName) => {
    const destinations = {
      'Add New Client': '/dashboard/admin/users',
      'Create Project': '/dashboard/admin/projects',
      'Projects Progress': '/dashboard/admin/reports'
    };
    const destination = destinations[actionName];

    setSnackbarMessage(`Redirecting to ${destination.split('/').pop()} to ${actionName}`);
    setIsLogoutSnackbar(false); // This is not a logout action
    setOpenSnackbar(true);
    
    setTimeout(() => {
      router.push(destination);
    }, 1500);
  };

  return (
    <Box sx={globalStyles.rootBox}>
      {/* --- Your existing JSX for Drawer, Main Content, etc. --- */}
       <Drawer variant="permanent" anchor="left" sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}>
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex',  alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard/admin/overview" passHref><IconButton sx={{ color: 'green' }}><DashboardIcon /></IconButton></Link>
          <Typography variant="h5" sx={{ color: '#fefae0'}}>Admin Portal</Typography>
        </Box>
        
        <List>
          {adminMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} href={item.path} sx={globalStyles.listItemButton} onClick={() => setSelectedMenu(item.name)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <Image src="/toroLogo.jpg" alt="User Profile" width={40} height={40} style={{ borderRadius: '50%', border: '2px solid #f3722c' }} />
                <Box sx={{ minWidth: 0 }}>
                    <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>{currentUser?.email}</Typography>
                    <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>Admin</Typography>
                </Box>
            </Box>
            <Button onClick={handleLogout} fullWidth variant="outlined" startIcon={<LogoutIcon />} sx={{ color: '#fefae0', borderColor: '#fefae0', '&:hover': { background: '#6b705c' } }}>
                Logout
            </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={globalStyles.mainContentBox}>
        <Box sx={globalStyles.pageHeader}>
          <Typography variant="h4" sx={globalStyles.pageHeaderText}>Dashboard Overview</Typography>
          <Typography variant="body1" sx={globalStyles.pageHeaderText}>Welcome back! Here's what's happening today.</Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map(({ title, value, change, icon, trend }, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={styles.summaryCard}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={styles.avatarBox}>{icon}</Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">{title}</Typography>
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

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={styles.activityCard}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2, fontWeight: 700 }}>Recent Activity</Typography>
                <List>
                  {activities.map(({ action, time }, i) => (
                    <React.Fragment key={i}>
                      <ListItem alignItems="flex-start">
                        <ListItemText primary={<Typography color="text.secondary">{action}</Typography>} secondary={<Typography color="text.primary">{time}</Typography>} />
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
                <Typography variant="h6" sx={styles.quickActionsTitle}>Quick Actions</Typography>
                <Stack spacing={2}>
                  <Button variant="outlined" fullWidth startIcon={<PeopleIcon />} sx={styles.quickActionButton} onClick={() => handleQuickActionClick('Add New Client')}>Add New Client</Button>
                  <Button variant="outlined" fullWidth startIcon={<AssignmentIcon />} sx={styles.quickActionButton} onClick={() => handleQuickActionClick('Create Project')}>Create Project</Button>
                  <Button variant="outlined" fullWidth startIcon={<AssessmentIcon />} sx={styles.quickActionButton} onClick={() => handleQuickActionClick('Projects Progress')}>Projects Progress</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar for logout (green) and other actions (info) */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={1500} 
        onClose={() => setOpenSnackbar(false)} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={isLogoutSnackbar ? "success" : "info"} 
          sx={{ 
            width: '100%', 
            fontWeight: 'bold', 
            fontSize: '1rem',
            ...(isLogoutSnackbar && {
              backgroundColor: '#4caf50',
              color: 'white',
              '& .MuiAlert-icon': {
                color: 'white'
              }
            })
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}