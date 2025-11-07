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
  Divider, Button, Drawer, ListItemButton, Snackbar, Alert, IconButton,
  TextField, Collapse, Chip, CircularProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon,
  Logout as LogoutIcon,
  Send as SendIcon,
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';

import useOverview from './useOverview/useOverview';
import { useAdminStore, adminMenu } from '../common/adminStore';
import * as globalStyles from '../common/styles';
import * as styles from './styles';

export default function AdminOverviewContent() {
  const router = useRouter();
  const supabase = createSupabaseClient(); // Create client instance
  const { metrics, queries, loading, handleResponseSubmit } = useOverview();
  const { setSelectedMenu } = useAdminStore();

  const [currentUser, setCurrentUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLogoutSnackbar, setIsLogoutSnackbar] = useState(false);
  const [expandedQuery, setExpandedQuery] = useState(null);
  const [responseText, setResponseText] = useState('');

  // mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /**
   * Fetches the current user's data when the component loads.
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUser(user);
      } catch (error) {
          console.error("Error fetching user:", error.message);
      }
    };
    fetchUser();
  }, [supabase.auth]);

  /**
   * Signs out the current user and redirects to the login page.
   */
  const handleLogout = async () => {
    setSnackbarMessage('Logging out...');
    setIsLogoutSnackbar(true);
    setOpenSnackbar(true);

    setTimeout(async () => {
        try {
            await supabase.auth.signOut();
            router.push('/login');
        } catch(error) {
            console.error("Error logging out:", error.message);
        }
    }, 1500);
  };

  const handleQuickActionClick = (actionName) => {
    const destinations = {
      'Add New Client': '/dashboard/admin/users',
      'Create Project': '/dashboard/admin/projects',
      'Projects Progress': '/dashboard/admin/reports'
    };
    const destination = destinations[actionName];
    if (!destination) return;

    setSnackbarMessage(`Redirecting to ${destination.split('/').pop()}...`);
    setIsLogoutSnackbar(false);
    setOpenSnackbar(true);

    setTimeout(() => {
      router.push(destination);
    }, 1500);
  };

  const handleToggleQuery = (queryId) => {
    setExpandedQuery(prevExpanded => (prevExpanded === queryId ? null : queryId));
    setResponseText(''); // Reset response text when toggling
  };

  const handleSubmit = (queryId) => {
    if (!responseText.trim()) {
        setSnackbarMessage('Response cannot be empty.');
        setIsLogoutSnackbar(false);
        setOpenSnackbar(true);
        return;
    }
    try {
        handleResponseSubmit(queryId, responseText);
        setSnackbarMessage('Response sent successfully!');
        setIsLogoutSnackbar(false);
        setOpenSnackbar(true);
        setResponseText('');
        setExpandedQuery(null); // Close after submitting
    } catch(error) {
        setSnackbarMessage('Failed to send response. Please try again.');
        setIsLogoutSnackbar(false);
        setOpenSnackbar(true);
        console.error("Submission Error:", error.message);
    }
  };

  const drawerContent = (
    <>
      <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex',  alignItems: 'center', gap: 1 }}>
        <Link href="/dashboard/admin/overview" passHref>
          <IconButton sx={{ color: 'green' }}><DashboardIcon /></IconButton>
        </Link>
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
    </>
  );

  return (
    <Box sx={globalStyles.rootBox}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { ...globalStyles.drawerPaper }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { ...globalStyles.drawerPaper }
        }}
      >
        {drawerContent}
      </Drawer>

      <Box component="main" sx={globalStyles.mainContentBox}>
        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { md: 'none' },
            color: '#283618', // Or appropriate color
            position: 'absolute',
            top: 16,
            left: 16
          }}
        >
          <MenuIcon />
        </IconButton>
        
        <Box sx={globalStyles.pageHeader}>
          <Typography variant="h4" sx={globalStyles.pageHeaderText}>Dashboard Overview</Typography>
          <Typography variant="body1" sx={globalStyles.pageHeaderText}>Welcome back! Here&apos;s what&apos;s happening today.</Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map(({ title, value, change, icon, trend }, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
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
                <Typography variant="h6" sx={{ color: '#525252', mb: 2, fontWeight: 700 }}>Raised Queries</Typography>
                <List sx={{ p: 0 }}>
                  {loading.queries ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                      <CircularProgress sx={{ color: '#283618' }} />
                    </Box>
                  ) : queries && queries.length > 0 ? (
                    queries.map((query, i) => (
                      <React.Fragment key={i}>
                        <ListItem
                          alignItems="flex-start"
                          sx={styles.queryListItem}
                          onClick={() => handleToggleQuery(query.query_id)}
                        >
                          <ListItemText
                            primary={
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="body1" sx={{ color: '#283618', fontWeight: 500 }}>{query.title}</Typography>
                                <Chip label={query.status} sx={styles.queryStatusChip(query.status)} />
                              </Stack>
                            }
                            secondary={
                              <Typography variant="body2" sx={{ color: '#525252', mt: 0.5 }}>
                                From: {query.client_name} - {new Date(query.date).toLocaleDateString()}
                              </Typography>
                            }
                          />
                          <ExpandMoreIcon sx={{
                              color: '#6b705c',
                              transform: expandedQuery === query.query_id ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s',
                          }}/>
                        </ListItem>
                        <Collapse in={expandedQuery === query.query_id} timeout="auto" unmountOnExit>
                          <Box sx={styles.responseBox}>
                              <Typography variant="body2" sx={{ mb: 2, color: '#283618' }}>
                                  {query.description}
                              </Typography>
                              <TextField
                                  fullWidth
                                  multiline
                                  rows={3}
                                  variant="outlined"
                                  label="Write your response..."
                                  value={responseText}
                                  onChange={(e) => setResponseText(e.target.value)}
                                  sx={styles.responseTextField}
                              />
                              <Button
                                  variant="contained"
                                  endIcon={<SendIcon />}
                                  onClick={() => handleSubmit(query.query_id)}
                                  sx={styles.sendButton}
                              >
                                  Send Response
                              </Button>
                          </Box>
                        </Collapse>
                        {i < queries.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="No new queries found." />
                    </ListItem>
                  )}
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
            fontSize: '1.2rem',
            ...(isLogoutSnackbar && {
                backgroundColor: '#5caa93ff',
                color: 'black',
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