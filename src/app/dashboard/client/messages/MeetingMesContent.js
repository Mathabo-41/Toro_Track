// This is the main UI component for the Agenda screen.
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter
import {
  Box, Typography, Card, CardContent,
  Stack, Button, Drawer, ListItemButton,
  List, ListItem, ListItemText, Divider,
  Tabs, Tab, IconButton, Chip, Snackbar, Alert,
  Avatar, Badge
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Schedule as MeetingsIcon,
  Add as NewMeetingIcon,
  Logout as LogoutIcon,
  Videocam as VideoIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Import Supabase client
import { createSupabaseClient } from '@/lib/supabase/client';

import { useMeetingMes } from './useMeetingMes/page';
import * as styles from './styles';
import * as globalStyles from '../common/styles';
import { useClientStore, clientMenu } from '../common/clientStore';

export default function MeetingMesContent() { // Remove router prop
  const supabase = createSupabaseClient();
  const router = useRouter(); // Use useRouter hook
  
  const {
    activeTab,
    setActiveTab,
    meetings,
    notifications,
    handleNewMeeting,
    handleJoinMeeting,
    handleMarkAsRead
  } = useMeetingMes();

  const { profile, fetchProfile } = useClientStore();
  const [sidebarOpen] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  // Fetch current user from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  const handleLogout = async () => {
    setOpenSnackbar(true);
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push('/login'); // Now router is properly defined
    }, 1500);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const getMeetingIcon = (type) => {
    switch (type) {
      case 'video': return <VideoIcon color="primary" />;
      case 'in-person': return <PersonIcon color="secondary" />;
      default: return <MeetingsIcon color="action" />;
    }
  };

  const formatMeetingTime = (date, time) => {
    return `${new Date(date).toLocaleDateString()} at ${time}`;
  };

  return (
    <Box sx={globalStyles.rootBox}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/login" passHref>
            <IconButton sx={{ color: 'green' }} aria-label="Go to Login">
              <DashboardIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" sx={{ color: '#fefae0' }}>
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
            <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid #f3722c' }}>
              <Image 
                src={profile?.avatar_url || currentUser?.user_metadata?.avatar_url || "/toroLogo.jpg"} 
                alt="User Profile" 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </Box>
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: '600', color: '#fefae0' }}>
                  {profile?.name || currentUser?.user_metadata?.full_name || 'Client Name'}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', opacity: 0.8, color: 'rgba(254, 250, 224, 0.7)' }}>
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
              border: '1px solid #fefae0', 
              borderRadius: '8px', 
              color: '#fefae0', 
              transition: 'all 0.3s ease', 
              fontWeight: '600', 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '0.5rem', 
              '&:hover': { background: '#6b705c' } 
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
                <Typography variant="h6" sx={{ color: '#283618' }}>
                  Upcoming Meetings ({meetings.length})
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<NewMeetingIcon />} 
                  onClick={handleNewMeeting}
                  sx={styles.newMeetingButton}
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
                                onClick={() => handleJoinMeeting(meeting.id)}
                                sx={styles.joinButton}
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
                            </Stack>
                          }
                          secondary={
                            <Stack spacing={0.5} sx={{ mt: 1 }}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <TimeIcon fontSize="small" sx={{ color: '#6b705c' }} />
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
                  <MeetingsIcon sx={{ fontSize: 48, color: '#6b705c', mb: 2 }} />
                  <Typography variant="body1" sx={styles.noContentText}>
                    No upcoming meetings scheduled
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b705c', mt: 1 }}>
                    Schedule a meeting to get started
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<NewMeetingIcon />} 
                    onClick={handleNewMeeting}
                    sx={{ mt: 2 }}
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
                <Typography variant="h6" sx={{ color: '#283618' }}>
                  Recent Notifications
                </Typography>
                {unreadNotifications > 0 && (
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => notifications.forEach(n => !n.read && handleMarkAsRead(n.id))}
                    sx={styles.markAllReadButton}
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
                                    borderColor: '#6b705c',
                                    color: '#6b705c'
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
                  <NotificationsIcon sx={{ fontSize: 48, color: '#6b705c', mb: 2 }} />
                  <Typography variant="body1" sx={styles.noContentText}>
                    No notifications
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b705c', mt: 1 }}>
                    You're all caught up!
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Box>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={1500} 
        onClose={() => setOpenSnackbar(false)} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%', 
            fontWeight: 'bold', 
            fontSize: '1.2rem',
            borderRadius: 2
          }}
        >
          Logging out...
        </Alert>
      </Snackbar>
    </Box>
  );
}