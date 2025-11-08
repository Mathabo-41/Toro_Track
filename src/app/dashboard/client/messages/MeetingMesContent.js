// This is the main UI component for the Agenda screen.
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Card, CardContent,
  Stack, Button, Drawer, ListItemButton,
  List, ListItem, ListItemText, Divider,
  Tabs, Tab, IconButton, Chip, Snackbar, Alert,
  Badge, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Select,
  FormControl, InputLabel, AppBar, Toolbar
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Schedule as MeetingsIcon,
  Add as NewMeetingIcon,
  Logout as LogoutIcon,
  Videocam as VideoIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  Close as CloseIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Import Supabase client
import { createSupabaseClient } from '@/lib/supabase/client';

import { useMeetingMes } from './useMeetingMes/useMeetingMes';
import * as styles from './styles';
import * as globalStyles from '../common/styles';
import { useClientStore, clientMenu } from '../common/clientStore';
import LoadingScreen from '../common/LoadingScreen';

// Color theme constants
const COLORS = {
  primary: '#283618', // Dark green
  secondary: '#606c38', // Medium green
  accent: '#f3722c', // Orange
  background: '#fefae0', // Cream
  lightBackground: 'rgba(254, 250, 224, 0.1)',
  text: '#283618',
  textLight: 'rgba(254, 250, 224, 0.8)',
  border: '#6b705c', // Gray-green
  success: '#2e7d32',
  error: '#d32f2f'
};

// Define drawer width for responsiveness
const drawerWidth = 260;

export default function MeetingMesContent() {
  const supabase = createSupabaseClient();
  const router = useRouter();

  const {
    activeTab,
    setActiveTab,
    meetings,
    notifications,
    handleNewMeeting, // This seems unused, but we'll keep it as it's from the hook
    handleMarkAsRead
  } = useMeetingMes();

  const { profile, fetchProfile } = useClientStore();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = useState(true);

  // State for responsive drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  // New state for meeting scheduling
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('google-meet');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  /**
   * Toggles the mobile drawer
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /**
   * Displays a snackbar notification
   */
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  /**
   * Closes the snackbar
   */
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // Fetch current user from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [supabase]);

  // Initialize profile and set loading state
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        showSnackbar('Screen Done Loading...', 'info');

        if (!profile) {
          await fetchProfile();
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      } catch (error) {
        console.error('Error initializing data:', error);
        showSnackbar('Error loading agenda', 'error');
      } finally {
        setLoading(false);
        setTimeout(() => setOpenSnackbar(false), 1000); // Hide loading snackbar
      }
    };

    initializeData();
  }, [profile, fetchProfile]);

  /**
   * Handles user logout
   */
  const handleLogout = async () => {
    showSnackbar('Logging out...', 'success');
    setTimeout(async () => {
      try {
        await supabase.auth.signOut();
        router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
        showSnackbar('Logout failed. Please try again.', 'error');
      }
    }, 1500);
  };

  /**
   * Opens the schedule meeting dialog
   */
  const handleScheduleMeeting = () => {
    setScheduleDialogOpen(true);
  };

  /**
   * Generates a meeting link based on the selected platform
   */
  const createMeetingLink = () => {
    const subject = encodeURIComponent(meetingTitle || 'Meeting with Client');
    
    switch (selectedPlatform) {
      case 'microsoft-teams':
        return `https://teams.microsoft.com/l/meeting/new?subject=${subject}`;
      case 'zoom':
        // Zoom links are typically generated via API, this is a placeholder
        return `https://zoom.us/start?confno=123456789`;
      case 'google-meet':
      default:
        return `https://meet.google.com/new`;
    }
  };

  /**
   * Validates form and creates a new meeting
   */
  const handleCreateMeeting = () => {
    // Handle failure case first
    if (!meetingTitle.trim()) {
      showSnackbar('Please enter a meeting title', 'error');
      return;
    }

    try {
      const meetingLink = createMeetingLink();
      
      // This is where you would typically call a hook or service to save to Supabase
      const newMeeting = {
        id: Date.now().toString(),
        title: meetingTitle,
        description: meetingDescription,
        date: meetingDate || new Date().toISOString().split('T')[0],
        time: meetingTime || '10:00',
        type: 'video',
        status: 'scheduled',
        participants: ['Admin', profile?.name || 'Client'],
        meetingLink: meetingLink,
        platform: selectedPlatform
      };

      console.log('New meeting created:', newMeeting);
      
      // Open the meeting link in a new tab
      window.open(meetingLink, '_blank', 'noopener,noreferrer');
      
      showSnackbar('Meeting created successfully! Opening meeting platform...', 'success');
      
      setScheduleDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error creating meeting:", error);
      showSnackbar('Failed to create meeting link. Please try again.', 'error');
    }
  };

  /**
   * Resets the schedule meeting form
   */
  const resetForm = () => {
    setMeetingTitle('');
    setMeetingDescription('');
    setMeetingDate('');
    setMeetingTime('');
    setSelectedPlatform('google-meet');
  };

  /**
   * Joins an existing meeting
   */
  const handleJoinMeetingEnhanced = (meetingId) => {
    const meeting = meetings.find(m => m.id === meetingId);
    
    // Use "everyday grammar" for conditional
    const meetingLinkExists = meeting && meeting.meetingLink;
    
    if (meetingLinkExists) {
      window.open(meeting.meetingLink, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback for older or improperly created meetings
      const fallbackLink = createMeetingLink();
      window.open(fallbackLink, '_blank', 'noopener,noreferrer');
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const getMeetingIcon = (type) => {
    switch (type) {
      case 'video': return <VideoIcon sx={{ color: COLORS.accent }} />;
      case 'in-person': return <PersonIcon sx={{ color: COLORS.secondary }} />;
      default: return <MeetingsIcon sx={{ color: COLORS.border }} />;
    }
  };

  const formatMeetingTime = (date, time) => {
    try {
      const formattedDate = new Date(date).toLocaleDateString();
      // Simple time formatting if time is 'HH:MM'
      if (time && /^\d{2}:\d{2}$/.test(time)) {
        const [hours, minutes] = time.split(':');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 00 to 12
        return `${formattedDate} at ${formattedHours}:${minutes} ${ampm}`;
      }
      return `${formattedDate}${time ? ` at ${time}` : ''}`; // Fallback
    } catch (error) {
      console.error("Error formatting date/time:", error);
      return "Invalid date"; // Handle invalid date strings
    }
  };

  // Custom styles for dialog components
  const dialogStyles = {
    dialog: {
      '& .MuiDialog-paper': {
        backgroundColor: COLORS.background,
        border: `2px solid ${COLORS.border}`,
        borderRadius: '12px',
        width: '100%',
        maxWidth: '500px', // Responsive max width
      }
    },
    title: {
      backgroundColor: COLORS.primary,
      color: COLORS.background,
      padding: '16px 24px',
      borderBottom: `2px solid ${COLORS.border}`
    },
    content: {
      backgroundColor: COLORS.background,
      padding: { xs: '16px', sm: '24px' } // Responsive padding
    },
    actions: {
      backgroundColor: COLORS.lightBackground,
      padding: '16px 24px',
      borderTop: `1px solid ${COLORS.border}`
    },
    button: {
      backgroundColor: COLORS.primary,
      color: COLORS.background,
      '&:hover': {
        backgroundColor: COLORS.secondary
      },
      '&:disabled': {
        backgroundColor: COLORS.border,
        color: COLORS.textLight
      }
    },
    cancelButton: {
      color: COLORS.primary,
      borderColor: COLORS.primary,
      '&:hover': {
        backgroundColor: COLORS.lightBackground,
        borderColor: COLORS.secondary
      }
    },
    select: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: COLORS.border
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: COLORS.primary
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: COLORS.accent
      }
    },
    textField: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: COLORS.border
        },
        '&:hover fieldset': {
          borderColor: COLORS.primary
        },
        '&.Mui-focused fieldset': {
          borderColor: COLORS.accent
        }
      },
      '& .MuiInputLabel-root': {
        color: COLORS.text
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: COLORS.accent
      }
    }
  };

  // Reusable Drawer Content
  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link href="/dashboard/client/details" passHref>
          <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
            <DashboardIcon />
          </IconButton>
        </Link>
        <Typography variant="h5" sx={{ color: COLORS.background }}>
          Client Portal
        </Typography>
      </Box>
      <List>
        {clientMenu.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={globalStyles.listItemButton}
              onClick={() => mobileOpen && handleDrawerToggle()} // Close mobile drawer on nav
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ padding: '1rem', borderTop: '2px solid #6b705c', marginTop: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', overflow: 'hidden', gap: '0.75rem' }}>
          <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: `2px solid ${COLORS.accent}` }}>
            <Image
              src={profile?.avatar_url || currentUser?.user_metadata?.avatar_url || "/toroLogo.jpg"}
              alt="User Profile"
              fill
              style={{ objectFit: 'cover' }}
              onError={(e) => { e.target.src = "/toroLogo.jpg"; }} // Fallback
            />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography noWrap sx={{ fontWeight: '600', color: COLORS.background }}>
              {profile?.name || currentUser?.user_metadata?.full_name || 'Client Name'}
            </Typography>
            <Typography noWrap sx={{ fontSize: '0.8rem', opacity: 0.8, color: COLORS.textLight }}>
              {profile?.email || currentUser?.email || 'client@email.com'}
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={handleLogout}
          fullWidth
          variant="outlined"
          startIcon={<LogoutIcon />}
          sx={{
            color: COLORS.background,
            borderColor: COLORS.background,
            '&:hover': {
              background: COLORS.border,
              borderColor: COLORS.background,
            }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  // Show loading state
  if (loading) {
    return <LoadingScreen message="Loading Agenda..." />;
  }

  return (
    <Box sx={{ ...globalStyles.rootBox, display: 'flex' }}>
      {/* Navigation */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="client menu"
      >
        {/* Temporary Drawer for Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              ...globalStyles.drawerPaper,
              boxSizing: 'border-box',
              width: drawerWidth,
            }
          }}
        >
          {drawerContent}
        </Drawer>
        
        {/* Permanent Drawer for Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              ...globalStyles.drawerPaper,
              boxSizing: 'border-box',
              width: drawerWidth,
            }
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          ...styles.mainContentBox,
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` }, // No margin on mobile
          p: 0 // Remove default padding, will be handled by inner containers
        }}
      >
        {/* Responsive App Bar for Mobile */}
        <AppBar
          position="static"
          sx={{
            display: { xs: 'flex', md: 'none' }, // Only show on mobile
            backgroundColor: COLORS.primary,
            paddingTop: 'env(safe-area-inset-top)'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ color: COLORS.background }}>
              Agenda
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Page Header for Desktop */}
        <Box sx={{ ...styles.pageHeader, display: { xs: 'none', md: 'flex' } }}>
          <Typography variant="h4" sx={styles.pageHeaderText}>
            <MeetingsIcon sx={styles.pageHeaderIcon} />
            Agenda
          </Typography>
          <Typography variant="body1" sx={styles.pageHeaderSubtitle}>
            View scheduled meetings and stay updated
          </Typography>
        </Box>

        {/* Responsive content padding */}
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={styles.tabs}
            variant="fullWidth" // Ensure tabs take full width on mobile
          >
            <Tab
              label="Meetings"
              icon={<MeetingsIcon />}
              iconPosition="start"
              sx={styles.tab}
            />
            <Tab
              label={
                <Badge badgeContent={unreadNotifications} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem', height: '16px', minWidth: '16px' } }}>
                  Notifications
                </Badge>
              }
              icon={<NotificationsIcon />}
              iconPosition="start"
              sx={styles.tab}
            />
          </Tabs>

          {/* Meetings Tab Content */}
          {activeTab === 0 && (
            <Card sx={styles.card}>
              <CardContent>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }} // Stack on mobile
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  sx={styles.meetingHeader}
                  spacing={{ xs: 2, sm: 1 }}
                >
                  <Typography variant="h6" sx={{ color: COLORS.primary }}>
                    Upcoming Meetings ({meetings.length})
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<NewMeetingIcon />}
                    onClick={handleScheduleMeeting}
                    sx={{
                      ...styles.newMeetingButton,
                      backgroundColor: COLORS.primary,
                      '&:hover': {
                        backgroundColor: COLORS.secondary
                      },
                      width: { xs: '100%', sm: 'auto' } // Full width on mobile
                    }}
                  >
                    Schedule Meeting
                  </Button>
                </Stack>
                {meetings.length > 0 ? (
                  <List sx={styles.meetingsList}>
                    {meetings.map((meeting) => (
                      <React.Fragment key={meeting.id}>
                        <ListItem
                          sx={{
                            flexDirection: 'column', // Stack vertically on small screens
                            alignItems: 'flex-start',
                            gap: 1,
                            pb: 2
                          }}
                        >
                          <ListItemText
                            primary={
                              <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                                {getMeetingIcon(meeting.type)}
                                <Typography variant="subtitle1" sx={styles.meetingTitle}>
                                  {meeting.title}
                                </Typography>
                                {meeting.platform && (
                                  <Chip
                                    label={meeting.platform}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      ml: 1,
                                      borderColor: COLORS.border,
                                      color: COLORS.text
                                    }}
                                  />
                                )}
                              </Stack>
                            }
                            secondary={
                              <Stack spacing={0.5} sx={{ mt: 1 }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  <TimeIcon fontSize="small" sx={{ color: COLORS.border }} />
                                  <Typography variant="body2" sx={styles.meetingDate}>
                                    {formatMeetingTime(meeting.date, meeting.time)}
                                  </Typography>
                                </Stack>
                                <Typography variant="caption" sx={styles.meetingParticipants}>
                                  With: {meeting.participants.join(', ')}
                                </Typography>
                                {meeting.description && (
                                  <Typography variant="caption" sx={styles.meetingDescription}>
                                    {meeting.description}
                                  </Typography>
                                )}
                              </Stack>
                            }
                            sx={{ width: '100%', mb: { xs: 2, sm: 0 } }} // Add margin bottom on mobile
                          />
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ width: '100%', justifyContent: 'flex-start' }} // Align actions
                          >
                            <Chip
                              label={meeting.status}
                              size="small"
                              sx={styles.meetingStatusChip(meeting.status)}
                            />
                            {meeting.status === 'scheduled' && (
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<VideoIcon />}
                                onClick={() => handleJoinMeetingEnhanced(meeting.id)}
                                sx={{
                                  ...styles.joinButton,
                                  color: COLORS.primary,
                                  borderColor: COLORS.primary,
                                  '&:hover': {
                                    backgroundColor: COLORS.lightBackground,
                                    borderColor: COLORS.secondary
                                  }
                                }}
                              >
                                Join
                              </Button>
                            )}
                          </Stack>
                        </ListItem>
                        <Divider sx={styles.listDivider} />
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Box sx={styles.noContentBox}>
                    <MeetingsIcon sx={{ fontSize: 48, color: COLORS.border, mb: 2 }} />
                    <Typography variant="body1" sx={styles.noContentText}>
                      No upcoming meetings scheduled
                    </Typography>
                    <Typography variant="body2" sx={{ color: COLORS.border, mt: 1, textAlign: 'center' }}>
                      Schedule a meeting to get started
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<NewMeetingIcon />}
                      onClick={handleScheduleMeeting}
                      sx={{
                        mt: 2,
                        color: COLORS.primary,
                        borderColor: COLORS.primary,
                        '&:hover': {
                          backgroundColor: COLORS.lightBackground,
                          borderColor: COLORS.secondary
                        }
                      }}
                    >
                      Schedule Your First Meeting
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}

          {/* Notifications Tab Content */}
          {activeTab === 1 && (
            <Card sx={styles.card}>
              <CardContent>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }} // Stack on mobile
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  sx={{ mb: 3 }}
                  spacing={1}
                >
                  <Typography variant="h6" sx={{ color: COLORS.primary }}>
                    Recent Notifications
                  </Typography>
                  {unreadNotifications > 0 && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => notifications.forEach(n => !n.read && handleMarkAsRead(n.id))}
                      sx={{
                        ...styles.markAllReadButton,
                        color: COLORS.primary,
                        borderColor: COLORS.primary,
                        '&:hover': {
                          backgroundColor: COLORS.lightBackground,
                          borderColor: COLORS.secondary
                        },
                        width: { xs: '100%', sm: 'auto' } // Full width on mobile
                      }}
                    >
                      Mark All as Read
                    </Button>
                  )}
                </Stack>
                {notifications.length > 0 ? (
                  <List sx={styles.meetingsList}>
                    {notifications.map((notification) => (
                      <React.Fragment key={notification.id}>
                        <ListItem
                          onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                          sx={{
                            cursor: notification.read ? 'default' : 'pointer',
                            backgroundColor: notification.read ? 'transparent' : 'rgba(107, 112, 92, 0.05)',
                            '&:hover': { backgroundColor: notification.read ? 'transparent' : 'rgba(107, 112, 92, 0.1)' },
                            flexDirection: 'column', // Stack vertically
                            alignItems: 'flex-start',
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography
                                variant="subtitle1"
                                sx={styles.notificationText(notification.read)}
                              >
                                {notification.text}
                              </Typography>
                            }
                            secondary={
                              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                                <Typography variant="caption" sx={styles.notificationTime}>
                                  {notification.time}
                                </Typography>
                                {notification.type && (
                                  <Chip
                                    label={notification.type}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      height: '20px',
                                      fontSize: '0.7rem',
                                      borderColor: COLORS.border,
                                      color: COLORS.text
                                    }}
                                  />
                                )}
                              </Stack>
                            }
                            sx={{ width: '100%', mb: 1 }}
                          />
                          {!notification.read && (
                            <Chip
                              label="New"
                              size="small"
                              sx={styles.notificationNewChip}
                            />
                          )}
                        </ListItem>
                        <Divider sx={styles.listDivider} />
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Box sx={styles.noContentBox}>
                    <NotificationsIcon sx={{ fontSize: 48, color: COLORS.border, mb: 2 }} />
                    <Typography variant="body1" sx={styles.noContentText}>
                      No notifications
                    </Typography>
                    <Typography variant="body2" sx={{ color: COLORS.border, mt: 1 }}>
                      You&apos;re all caught up!
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>

      {/* Schedule Meeting Dialog */}
      <Dialog
        open={scheduleDialogOpen}
        onClose={() => setScheduleDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={dialogStyles.dialog}
      >
        <DialogTitle sx={dialogStyles.title}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Schedule New Meeting</Typography>
            <IconButton
              onClick={() => setScheduleDialogOpen(false)}
              sx={{ color: COLORS.background }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={dialogStyles.content}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: COLORS.text }}>Meeting Platform</InputLabel>
              <Select
                value={selectedPlatform}
                label="Meeting Platform"
                onChange={(e) => setSelectedPlatform(e.target.value)}
                sx={dialogStyles.select}
              >
                <MenuItem value="google-meet">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <span style={{ color: COLORS.accent }}>📹</span>
                    <span style={{ color: COLORS.text }}>Google Meet</span>
                  </Stack>
                </MenuItem>
                <MenuItem value="microsoft-teams">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <span style={{ color: COLORS.primary }}>💼</span>
                    <span style={{ color: COLORS.text }}>Microsoft Teams</span>
                  </Stack>
                </MenuItem>
                <MenuItem value="zoom">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <span style={{ color: COLORS.secondary }}>🔊</span>
                    <span style={{ color: COLORS.text }}>Zoom</span>
                  </Stack>
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Meeting Title"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              fullWidth
              required
              placeholder="e.g., Project Discussion"
              sx={dialogStyles.textField}
            />

            <TextField
              label="Description (Optional)"
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
              placeholder="Brief description of discussion topics..."
              sx={dialogStyles.textField}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Date"
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={dialogStyles.textField}
                inputProps={{
                  min: new Date().toISOString().split('T')[0] // Prevent past dates
                }}
              />
              <TextField
                label="Time"
                type="time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={dialogStyles.textField}
              />
            </Stack>

            <Typography variant="caption" sx={{ color: COLORS.border, fontStyle: 'italic', textAlign: 'center' }}>
              This will generate a meeting link for you to share.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={dialogStyles.actions}>
          <Button
            onClick={() => setScheduleDialogOpen(false)}
            sx={dialogStyles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateMeeting}
            variant="contained"
            disabled={!meetingTitle.trim()}
            sx={dialogStyles.button}
          >
            Create Meeting
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            backgroundColor:
              snackbarSeverity === 'success' ? COLORS.success :
                snackbarSeverity === 'error' ? COLORS.error :
                  snackbarSeverity === 'info' ? COLORS.primary :
                    snackbarSeverity === 'warning' ? '#ed6c02' : COLORS.secondary,
            color: COLORS.background
          }}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}