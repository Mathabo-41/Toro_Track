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
  Avatar, Badge, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Select,
  FormControl, InputLabel, CircularProgress
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Schedule as MeetingsIcon,
  Add as NewMeetingIcon,
  Logout as LogoutIcon,
  Videocam as VideoIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  Close as CloseIcon
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

export default function MeetingMesContent() {
  const supabase = createSupabaseClient();
  const router = useRouter();
  
  const {
    activeTab,
    setActiveTab,
    meetings,
    notifications,
    handleNewMeeting,
    handleMarkAsRead
  } = useMeetingMes();

  const { profile, fetchProfile } = useClientStore();
  const [sidebarOpen] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = useState(true);
  
  // New state for meeting scheduling
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('google-meet');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  // Fetch current user from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setSnackbarMessage('Screen Done Loading...');
        setSnackbarSeverity('info');
        setOpenSnackbar(true);

        if (!profile) {
          await fetchProfile();
        }

        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error('Error initializing data:', error);
        setSnackbarMessage('Error loading agenda');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setOpenSnackbar(false);
        }, 1000);
      }
    };

    initializeData();
  }, [profile, fetchProfile]);

  // Updated logout function to match Settings screen exactly
  const handleLogout = async () => {
    setSnackbarMessage('Logging out...');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push('/login');
    }, 1500);
  };

  // Enhanced meeting scheduling function
  const handleScheduleMeeting = () => {
    setScheduleDialogOpen(true);
  };

  const createMeetingLink = () => {
    const subject = encodeURIComponent(meetingTitle || 'Meeting with Client');
    const description = encodeURIComponent(meetingDescription || 'Meeting scheduled through client portal');
    
    let meetingUrl = '';

    switch (selectedPlatform) {
      case 'google-meet':
        meetingUrl = `https://meet.google.com/new`;
        break;
      
      case 'microsoft-teams':
        meetingUrl = `https://teams.microsoft.com/l/meeting/new?subject=${subject}`;
        break;
      
      case 'zoom':
        meetingUrl = `https://zoom.us/start?confno=123456789`;
        break;
      
      default:
        meetingUrl = `https://meet.google.com/new`;
    }

    return meetingUrl;
  };

  const handleCreateMeeting = () => {
    if (!meetingTitle.trim()) {
      setSnackbarMessage('Please enter a meeting title');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const meetingLink = createMeetingLink();
    
    //  save the meeting to our database
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
    
    // Show success message
    setSnackbarMessage('Meeting created successfully! Opening meeting platform...');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    
    // Close dialog and reset form
    setScheduleDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setMeetingTitle('');
    setMeetingDescription('');
    setMeetingDate('');
    setMeetingTime('');
    setSelectedPlatform('google-meet');
  };

  // Enhanced join meeting function
  const handleJoinMeetingEnhanced = (meetingId) => {
    const meeting = meetings.find(m => m.id === meetingId);
    if (meeting && meeting.meetingLink) {
      window.open(meeting.meetingLink, '_blank', 'noopener,noreferrer');
    } else {
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
    return `${new Date(date).toLocaleDateString()} at ${time}`;
  };

  // Custom styles for dialog components
  const dialogStyles = {
    dialog: {
      '& .MuiDialog-paper': {
        backgroundColor: COLORS.background,
        border: `2px solid ${COLORS.border}`,
        borderRadius: '12px'
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
      padding: '24px'
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

  // Show loading state
  if (loading) {
    return <LoadingScreen message="Loading Agenda..." />;
  }

  return (
    <Box sx={globalStyles.rootBox}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
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
              />
            </Box>
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: '600', color: COLORS.background }}>
                  {profile?.name || currentUser?.user_metadata?.full_name || 'Client Name'}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', opacity: 0.8, color: COLORS.textLight }}>
                  {profile?.email || currentUser?.email || 'client@email.com'}
                </Typography>
              </Box>
            )}
          </Box>
          <Button 
            onClick={handleLogout} 
            fullWidth 
            sx={{ 
              padding: '0.75rem', 
              background: 'transparent', 
              border: `1px solid ${COLORS.background}`, 
              borderRadius: '8px', 
              color: COLORS.background, 
              transition: 'all 0.3s ease', 
              fontWeight: '600', 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '0.5rem', 
              '&:hover': { background: COLORS.border } 
            }}
          >
            {sidebarOpen ? 'Logout' : <LogoutIcon />}
          </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={styles.mainContentBox}>
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageHeaderText}>
            <MeetingsIcon sx={styles.pageHeaderIcon} />
            Agenda
          </Typography>
          <Typography variant="body1" sx={styles.pageHeaderSubtitle}>
            View scheduled meetings and stay updated
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={styles.tabs}
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

        {activeTab === 0 && (
          <Card sx={styles.card}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={styles.meetingHeader}>
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
                    }
                  }}
                >
                  Schedule Meeting
                </Button>
              </Stack>
              {meetings.length > 0 ? (
                <List sx={styles.meetingsList}>
                  {meetings.map((meeting) => (
                    <div key={meeting.id}>
                      <ListItem
                        secondaryAction={
                          <Stack direction="row" spacing={1} alignItems="center">
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
                        }
                      >
                        <ListItemText
                          primary={
                            <Stack direction="row" alignItems="center" spacing={1}>
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
                        />
                      </ListItem>
                      <Divider sx={styles.listDivider} />
                    </div>
                  ))}
                </List>
              ) : (
                <Box sx={styles.noContentBox}>
                  <MeetingsIcon sx={{ fontSize: 48, color: COLORS.border, mb: 2 }} />
                  <Typography variant="body1" sx={styles.noContentText}>
                    No upcoming meetings scheduled
                  </Typography>
                  <Typography variant="body2" sx={{ color: COLORS.border, mt: 1 }}>
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

        {activeTab === 1 && (
          <Card sx={styles.card}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
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
                      }
                    }}
                  >
                    Mark All as Read
                  </Button>
                )}
              </Stack>
              {notifications.length > 0 ? (
                <List sx={styles.meetingsList}>
                  {notifications.map((notification) => (
                    <div key={notification.id}>
                      <ListItem
                        onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                        sx={{ 
                          cursor: notification.read ? 'default' : 'pointer',
                          backgroundColor: notification.read ? 'transparent' : 'rgba(107, 112, 92, 0.05)',
                          '&:hover': { backgroundColor: notification.read ? 'transparent' : 'rgba(107, 112, 92, 0.1)' }
                        }}
                        secondaryAction={
                          !notification.read && (
                            <Chip 
                              label="New" 
                              size="small" 
                              sx={styles.notificationNewChip} 
                            />
                          )
                        }
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
                        />
                      </ListItem>
                      <Divider sx={styles.listDivider} />
                    </div>
                  ))}
                </List>
              ) : (
                <Box sx={styles.noContentBox}>
                  <NotificationsIcon sx={{ fontSize: 48, color: COLORS.border, mb: 2 }} />
                  <Typography variant="body1" sx={styles.noContentText}>
                    No notifications
                  </Typography>
                  <Typography variant="body2" sx={{ color: COLORS.border, mt: 1 }}>
                    You're all caught up!
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
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
              placeholder="e.g., Project Discussion with Admin"
              sx={dialogStyles.textField}
            />

            <TextField
              label="Description (Optional)"
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
              placeholder="Brief description of what you'd like to discuss..."
              sx={dialogStyles.textField}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Date"
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={dialogStyles.textField}
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

            <Typography variant="body2" sx={{ color: COLORS.border, fontStyle: 'italic' }}>
              This will create a new {selectedPlatform === 'google-meet' ? 'Google Meet ' : 
              selectedPlatform === 'microsoft-teams' ? 'Microsoft Teams ' : 'Zoom '} 
               meeting and open it in a new tab where you can invite the admin.
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

      {/* Updated Snackbar to match Settings screen exactly */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={1500} 
        onClose={() => setOpenSnackbar(false)} 
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
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}