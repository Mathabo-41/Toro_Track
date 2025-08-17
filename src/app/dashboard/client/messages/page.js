/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/

'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Drawer,
  ListItemButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Avatar,
  Badge,
  Tabs,
  Tab,
  IconButton,
  Chip
} from '@mui/material';
import {
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
  Schedule as MeetingsIcon,
  Send as SendIcon,
  CheckCircle as ReadIcon,
  Circle as UnreadIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  Add as NewMeetingIcon,
  ArrowBack as BackIcon
} from '@mui/icons-material';
import { useMeetingMes } from './useMeetingMes/page';
import * as styles from './styles';
import {
  rootBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  activeListItemButton
} from '../common/styles';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { useClientStore } from '../common/clientStore';
import { clientMenu } from '../common/clientStore';

export default function ClientMessages() {
  const {
    activeTab,
    activeConversation,
    setActiveConversation,
    newMessage,
    setNewMessage,
    searchTerm,
    setSearchTerm,
    handleSendMessage,
    filteredConversations,
    meetings,
    setActiveTab,
    notifications,
    teamMembers
  } = useMeetingMes();

  const clientMenu = [
    { name: 'Project Details', path: '/dashboard/client/details' },
    { name: 'Raise Query', path: '/dashboard/client/query' },
    { name: 'Messages & Notifications', path: '/dashboard/client/messages' },
    { name: 'Settings', path: '/dashboard/client/settings' }
  ];

  return (
    <Box sx={globalStyles.rootBox}>
            {/* --- Sidebar Navigation --- */}
            <Drawer
             variant="permanent"
                    anchor="left"
                    sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
                  >
                    <Box sx={globalStyles.drawerHeader}>
                      <Typography variant="h5">Client Portal</Typography>
                    </Box>
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
             </Drawer>  

      {/* #region MAIN_CONTENT */}
      <Box component="main" sx={styles.mainContentBox}>
        {/* #region HEADER */}
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageHeaderText}>
            <ChatIcon sx={styles.pageHeaderIcon} />
            Messages & Notifications
          </Typography>
          <Typography variant="body1" sx={styles.pageHeaderSubtitle}>
            Communicate with your project team and stay updated
          </Typography>
        </Box>
        {/* #endregion */}

        {/* #region TABS */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={styles.tabs}
        >
          <Tab label="Messages" icon={<ChatIcon />} iconPosition="start" sx={styles.tab} />
          <Tab label="Meetings" icon={<MeetingsIcon />} iconPosition="start" sx={styles.tab} />
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={styles.tab} />
        </Tabs>
        {/* #endregion */}

        {/* #region TAB_CONTENT */}
        {/* Messages Tab */}
        {activeTab === 0 && (
          <Card sx={styles.card}>
            <CardContent>
              {!activeConversation ? (
                // Conversation List
                <Box>
                  <TextField
                    fullWidth
                    placeholder="Search conversations..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={styles.searchIcon} />
                    }}
                    sx={styles.searchTextField}
                  />

                  <List sx={styles.conversationsList}>
                    {filteredConversations.map((conversation) => (
                      <ListItem
                        key={conversation.id}
                        disablePadding
                        sx={styles.conversationListItem}
                      >
                        <ListItemButton
                          onClick={() => setActiveConversation(conversation)}
                          sx={styles.conversationListItemButton}
                        >
                          <Stack direction="row" alignItems="center" spacing={2} sx={styles.conversationStack}>
                            <Badge
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              variant="dot"
                              color="success"
                              invisible={!teamMembers.find(m => m.name === conversation.with)?.online}
                            >
                              <Avatar
                                src={teamMembers.find(m => m.name === conversation.with)?.avatar}
                                sx={{ width: 48, height: 48 }}
                              />
                            </Badge>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle1" sx={styles.conversationName}>
                                {conversation.with}
                              </Typography>
                              <Typography variant="body2" sx={styles.lastMessage}>
                                {conversation.lastMessage}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="caption" sx={styles.conversationTime}>
                                {conversation.time}
                              </Typography>
                              {conversation.unread > 0 && (
                                <Chip
                                  label={conversation.unread}
                                  size="small"
                                  sx={styles.unreadChip}
                                />
                              )}
                            </Box>
                          </Stack>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                // Active Conversation View
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={styles.activeConversationHeader}
                  >
                    <Button
                      startIcon={<BackIcon />}
                      onClick={() => setActiveConversation(null)}
                      sx={styles.backButton}
                    >
                      Back
                    </Button>
                    <Typography variant="h6" sx={styles.activeConversationTitle}>
                      {activeConversation.with}
                    </Typography>
                    <IconButton sx={{ color: '#283618' }}>
                      <MoreIcon />
                    </IconButton>
                  </Stack>

                  <Box sx={styles.messageBox}>
                    {activeConversation.messages.map((message, index) => (
                      <Box
                        key={index}
                        sx={styles.messageContainer(message.sender === 'You')}
                      >
                        <Avatar
                          src={message.sender !== 'You' ?
                            teamMembers.find(m => m.name === message.sender)?.avatar : ''}
                          sx={styles.messageAvatar(message.sender === 'You')}
                        />
                        <Box sx={styles.messageBubble(message.sender === 'You')}>
                          <Typography component="div" variant="body1">{message.text}</Typography>
                          <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={0.5}
                            sx={{ mt: 1 }}
                          >
                            <Typography component="span" variant="caption" sx={styles.messageTime(message.sender === 'You')}>
                              {message.time}
                            </Typography>
                            {message.sender === 'You' && (
                              message.read ? (
                                <ReadIcon sx={styles.readIcon} />
                              ) : (
                                <UnreadIcon sx={styles.unreadIcon} />
                              )
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Box component="form" onSubmit={handleSendMessage} sx={styles.messageForm}>
                    <Stack direction="row" spacing={1}>
                      <TextField
                        fullWidth
                        placeholder="Type your message..."
                        variant="outlined"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        sx={styles.messageTextField}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        sx={styles.sendButton}
                      >
                        <SendIcon />
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {/* Meetings Tab */}
        {activeTab === 1 && (
          <Card sx={styles.card}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" sx={styles.meetingHeader}>
                <Typography variant="h6" sx={{ color: '#283618' }}>
                  Upcoming Meetings
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<NewMeetingIcon />}
                  sx={styles.newMeetingButton}
                >
                  New Meeting
                </Button>
              </Stack>
              {meetings.length > 0 ? (
                <List sx={styles.meetingsList}>
                  {meetings.map((meeting) => (
                    <div key={meeting.id}>
                      <ListItem
                        secondaryAction={
                          <Chip
                            label={meeting.status}
                            size="small"
                            sx={styles.meetingStatusChip(meeting.status)}
                          />
                        }
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" sx={styles.meetingTitle}>
                              {meeting.title}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                display="block"
                                sx={styles.meetingDate}
                              >
                                {meeting.date}
                              </Typography>
                              <Typography
                                component="span"
                                variant="caption"
                                sx={styles.meetingParticipants}
                              >
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

        {/* Notifications Tab */}
        {activeTab === 2 && (
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
                              component="div"
                              variant="subtitle1"
                              sx={styles.notificationText(notification.read)}
                            >
                              {notification.text}
                            </Typography>
                          }
                          secondary={
                            <Typography component="span" variant="caption" sx={styles.notificationTime}>
                              {notification.time}
                            </Typography>
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
                    No new notifications
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
        {/* #endregion */}
      </Box>
      {/* #endregion */}
    </Box>
  );
}