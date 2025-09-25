// This is the main UI component for the Agenda screen.
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box, Typography, Card, CardContent,
  Stack, Button, Drawer, ListItemButton,
  List, ListItem, ListItemText, Divider,
  Tabs, Tab, IconButton, Chip, Snackbar, Alert
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Schedule as MeetingsIcon,
  Add as NewMeetingIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { useMeetingMes } from './useMeetingMes/page';
import * as styles from './styles';
import * as globalStyles from '../common/styles';
import { useClientStore, clientMenu } from '../common/clientStore';

export default function MeetingMesContent({ router }) {
  const {
    activeTab,
    setActiveTab,
    meetings,
    notifications,
  } = useMeetingMes();

  const { profile, fetchProfile } = useClientStore();
  const [sidebarOpen] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  const handleLogout = () => {
    setOpenSnackbar(true);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
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
            <IconButton sx={{ color: 'green' }} aria-label="Go to Login page">
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
              <ListItemButton component={Link} href={item.path} sx={globalStyles.listItemButton}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ padding: '1rem', borderTop: '2px solid #6b705c', marginTop: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', overflow: 'hidden', gap: '0.75rem' }}>
            <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid #f3722c' }}>
              <Image src={profile?.avatar_url || "/toroLogo.jpg"} alt="User Profile" fill style={{ objectFit: 'cover' }} />
            </Box>
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: '600', color: '#fefae0' }}>
                  {profile?.name || 'Client Name'}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', opacity: 0.8, color: 'rgba(254, 250, 224, 0.7)' }}>
                  {profile?.email || 'client@email.com'}
                </Typography>
              </Box>
            )}
          </Box>
          <Button onClick={handleLogout} fullWidth sx={{ padding: '0.75rem', background: 'transparent', border: '1px solid #fefae0', borderRadius: '8px', color: '#fefae0', transition: 'all 0.3s ease', fontWeight: '600', display: 'flex', justifyContent: 'center', gap: '0.5rem', '&:hover': { background: '#6b705c' } }}>
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
          <Tab label="Meetings" icon={<MeetingsIcon />} iconPosition="start" sx={styles.tab} />
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={styles.tab} />
        </Tabs>

        {activeTab === 0 && (
          <Card sx={styles.card}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" sx={styles.meetingHeader}>
                <Typography variant="h6" sx={{ color: '#283618' }}>
                  Upcoming Meetings
                </Typography>
                <Button variant="contained" startIcon={<NewMeetingIcon />} sx={styles.newMeetingButton}>
                  New Meeting
                </Button>
              </Stack>
              {meetings.length > 0 ? (
                <List sx={styles.meetingsList}>
                  {meetings.map((meeting) => (
                    <div key={meeting.id}>
                      <ListItem
                        secondaryAction={
                          <Chip label={meeting.status} size="small" sx={styles.meetingStatusChip(meeting.status)} />
                        }
                      >
                        <ListItemText
                          primary={<Typography variant="subtitle1" sx={styles.meetingTitle}>{meeting.title}</Typography>}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" display="block" sx={styles.meetingDate}>{meeting.date}</Typography>
                              <Typography component="span" variant="caption" sx={styles.meetingParticipants}>
                                With: {meeting.participants.join(', ')}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider sx={styles.listDivider} />
                    </div>
                  ))}
                </List>
              ) : (
                <Box sx={styles.noContentBox}>
                  <Typography variant="body1" sx={styles.noContentText}>
                    No upcoming meetings scheduled
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 1 && (
          <Card sx={styles.card}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#283618', mb: 2 }}>
                Recent Notifications
              </Typography>
              {notifications.length > 0 ? (
                <List sx={styles.meetingsList}>
                  {notifications.map((notification) => (
                    <div key={notification.id}>
                      <ListItem
                        secondaryAction={
                          !notification.read && <Chip label="New" size="small" sx={styles.notificationNewChip} />
                        }
                      >
                        <ListItemText
                          primary={<Typography variant="subtitle1" sx={styles.notificationText(notification.read)}>{notification.text}</Typography>}
                          secondary={<Typography variant="caption" sx={styles.notificationTime}>{notification.time}</Typography>}
                        />
                      </ListItem>
                      <Divider sx={styles.listDivider} />
                    </div>
                  ))}
                </List>
              ) : (
                <Box sx={styles.noContentBox}>
                  <Typography variant="body1" sx={styles.noContentText}>
                    No new notifications
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Logging out...
        </Alert>
      </Snackbar>
    </Box>
  );
}