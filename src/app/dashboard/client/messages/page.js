'use client';

import React, { useState } from 'react';
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
  Chip,
  Paper,
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
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import {
  mainBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  activeListItemButton,
  mainContentBox,
  headerBox,
  headerTitle,
  headerIcon,
  headerSubtitle,
  tabs,
  tab,
  card,
  textField,
  searchIcon,
  conversationList,
  conversationListItem,
  conversationListItemButton,
  conversationWithText,
  conversationLastMessage,
  conversationTime,
  unreadChip,
  activeConversationHeader,
  backButton,
  activeConversationTitle,
  messageBox,
  messageContainer,
  myMessageContainer,
  otherMessageContainer,
  myMessageBubble,
  otherMessageBubble,
  messageTime,
  myMessageTime,
  otherMessageTime,
  readIcon,
  unreadIcon,
  sendMessageForm,
  sendButton,
  meetingsHeader,
  newMeetingButton,
  meetingsList,
  meetingsListItem,
  meetingsListDivider,
  meetingStatusChip,
  meetingTitle,
  meetingDate,
  meetingParticipants,
  noMeetingsBox,
  noMeetingsText,
  notificationsHeader,
  notificationsList,
  notificationsListItem,
  notificationsListDivider,
  newChip,
  readNotificationText,
  unreadNotificationText,
  notificationTime,
} from '../styles';

/**
 * Client Messages & Notifications Screen
 */

const clientMenu = [
  { name: 'Project Details', path: '/dashboard/client/details' },
  { name: 'Raise Query', path: '/dashboard/client/query' },
  { name: 'Messages & Notifications', path: '/dashboard/client/messages' },
  { name: 'Settings', path: '/dashboard/client/settings' },
];

// Sample data
const teamMembers = [
  { id: 1, name: 'Alex Johnson', role: 'Project Manager', avatar: '/avatars/1.jpg', online: true },
  { id: 2, name: 'Sarah Chen', role: 'UI/UX Designer', avatar: '/avatars/2.jpg', online: false },
  { id: 3, name: 'Michael Brown', role: 'Frontend Dev', avatar: '/avatars/3.jpg', online: true },
  { id: 4, name: 'Thabo Johnson', role: 'Project Manager', avatar: '/avatars/1.jpg', online: true },
  { id: 5, name: 'Sarah Mokoena', role: 'UI/UX Designer', avatar: '/avatars/2.jpg', online: true },
];

const conversations = [
  {
    id: 1,
    with: 'Thabo Johnson',
    lastMessage: 'Let me check the timeline and get back to you',
    time: '2h ago',
    unread: 3,
    messages: [
      { sender: 'Thabo Johnson', text: 'Hi there! How can I help?', time: '10:30 AM', read: true },
      { sender: 'You', text: 'When will the next design mockups be ready?', time: '10:32 AM', read: true },
      { sender: 'Thabo Johnson', text: 'We\'re targeting Friday for the first round', time: '11:45 AM', read: true },
      { sender: 'Thabo Johnson', text: 'Let me check the timeline and get back to you', time: '2h ago', read: false },
    ],
  },
  {
    id: 2,
    with: 'Sarah Mokoena',
    lastMessage: 'I\'ve updated the color scheme per our discussion',
    time: '1d ago',
    unread: 0,
    messages: [
      { sender: 'Sarah Mokoena', text: 'Here are the initial color concepts', time: 'Yesterday', read: true },
      { sender: 'You', text: 'I like option 2 but can we try darker blues?', time: 'Yesterday', read: true },
      { sender: 'Sarah Mokoena', text: 'I\'ve updated the color scheme per our discussion', time: '1d ago', read: true },
    ],
  },
];

const notifications = [
  { id: 1, text: 'New project milestone added', time: '30m ago', read: false, type: 'project' },
  { id: 2, text: 'Meeting scheduled for tomorrow at 2pm', time: '2h ago', read: true, type: 'meeting' },
  { id: 3, text: 'Alex Johnson replied to your query', time: '5h ago', read: true, type: 'query' },
];

const meetings = [
  { id: 1, title: 'Design Review', date: 'Tomorrow, 2:00 PM', participants: ['Alex', 'Sarah'], status: 'confirmed' },
  { id: 2, title: 'Project Kickoff', date: 'Jan 15, 10:00 AM', participants: ['Full Team'], status: 'completed' },
];

export default function ClientMessages() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && activeConversation) {
      // backend here
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === activeConversation.id) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              { sender: 'You', text: newMessage, time: 'Just now', read: true },
            ],
            lastMessage: newMessage,
            time: 'Just now',
          };
        }
        return conv;
      });
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.with.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={mainBox}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': drawerPaper,
        }}
      >
        <Box sx={drawerHeader}>
          <Typography variant="h5">Client Portal</Typography>
        </Box>
        <List>
          {clientMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{
                  ...listItemButton,
                  ...(item.name === 'Messages & Notifications' && activeListItemButton),
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={mainContentBox}>
        {/* Header */}
        <Box sx={headerBox}>
          <Typography variant="h4" sx={headerTitle}>
            <ChatIcon sx={headerIcon} />
            Messages & Notifications
          </Typography>
          <Typography variant="body1" sx={headerSubtitle}>
            Communicate with your project team and stay updated
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={tabs}>
          <Tab label="Messages" icon={<ChatIcon />} iconPosition="start" sx={tab} />
          <Tab label="Meetings" icon={<MeetingsIcon />} iconPosition="start" sx={tab} />
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={tab} />
        </Tabs>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Card sx={card}>
            <CardContent>
              {!activeConversation ? (
                <Box>
                  <TextField
                    fullWidth
                    placeholder="Search conversations..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={searchIcon} />,
                    }}
                    sx={textField}
                  />

                  <List sx={conversationList}>
                    {filteredConversations.map((conversation) => (
                      <ListItem key={conversation.id} disablePadding sx={conversationListItem}>
                        <ListItemButton
                          onClick={() => setActiveConversation(conversation)}
                          sx={conversationListItemButton}
                        >
                          <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                            <Badge
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              variant="dot"
                              color="success"
                              invisible={!teamMembers.find((m) => m.name === conversation.with)?.online}
                            >
                              <Avatar
                                src={teamMembers.find((m) => m.name === conversation.with)?.avatar}
                                sx={{ width: 48, height: 48 }}
                              />
                            </Badge>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle1" sx={conversationWithText}>
                                {conversation.with}
                              </Typography>
                              <Typography variant="body2" sx={conversationLastMessage}>
                                {conversation.lastMessage}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="caption" sx={conversationTime}>
                                {conversation.time}
                              </Typography>
                              {conversation.unread > 0 && (
                                <Chip label={conversation.unread} size="small" sx={unreadChip} />
                              )}
                            </Box>
                          </Stack>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={activeConversationHeader}>
                    <Button startIcon={<BackIcon />} onClick={() => setActiveConversation(null)} sx={backButton}>
                      Back
                    </Button>
                    <Typography variant="h6" sx={activeConversationTitle}>
                      {activeConversation.with}
                    </Typography>
                    <IconButton sx={{ color: '#283618' }}>
                      <MoreIcon />
                    </IconButton>
                  </Stack>

                  <Box sx={messageBox}>
                    {activeConversation.messages.map((message, index) => (
                      <Box
                        key={index}
                        sx={{
                          ...messageContainer,
                          ...(message.sender === 'You' ? myMessageContainer : otherMessageContainer),
                        }}
                      >
                        <Avatar
                          src={message.sender !== 'You' ? teamMembers.find((m) => m.name === message.sender)?.avatar : ''}
                          sx={{
                            width: 32,
                            height: 32,
                            mr: message.sender === 'You' ? 0 : 2,
                            ml: message.sender === 'You' ? 2 : 0,
                          }}
                        />
                        <Box
                          sx={
                            message.sender === 'You'
                              ? myMessageBubble
                              : otherMessageBubble
                          }
                        >
                          <Typography component="div" variant="body1">
                            {message.text}
                          </Typography>
                          <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={0.5}
                            sx={{ mt: 1 }}
                          >
                            <Typography
                              component="span"
                              variant="caption"
                              sx={
                                message.sender === 'You'
                                  ? myMessageTime
                                  : otherMessageTime
                              }
                            >
                              {message.time}
                            </Typography>
                            {message.sender === 'You' &&
                              (message.read ? <ReadIcon sx={readIcon} /> : <UnreadIcon sx={unreadIcon} />)}
                          </Stack>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Box component="form" onSubmit={handleSendMessage} sx={sendMessageForm}>
                    <Stack direction="row" spacing={1}>
                      <TextField
                        fullWidth
                        placeholder="Type your message..."
                        variant="outlined"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        sx={textField}
                      />
                      <Button type="submit" variant="contained" sx={sendButton}>
                        <SendIcon />
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 1 && (
          <Card sx={card}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" sx={meetingsHeader}>
                <Typography variant="h6" sx={{ color: '#283618' }}>
                  Upcoming Meetings
                </Typography>
                <Button variant="contained" startIcon={<NewMeetingIcon />} sx={newMeetingButton}>
                  New Meeting
                </Button>
              </Stack>

              {meetings.length > 0 ? (
                <List sx={meetingsList}>
                  {meetings.map((meeting) => (
                    <div key={meeting.id}>
                      <ListItem
                        secondaryAction={
                          <Chip
                            label={meeting.status}
                            size="small"
                            sx={meetingStatusChip(meeting.status)}
                          />
                        }
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" sx={meetingTitle}>
                              {meeting.title}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography component="span" variant="body2" display="block" sx={meetingDate}>
                                {meeting.date}
                              </Typography>
                              <Typography component="span" variant="caption" sx={meetingParticipants}>
                                With: {meeting.participants.join(', ')}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider sx={meetingsListDivider} />
                    </div>
                  ))}
                </List>
              ) : (
                <Box sx={noMeetingsBox}>
                  <Typography variant="body1" sx={noMeetingsText}>
                    No upcoming meetings scheduled
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 2 && (
          <Card sx={card}>
            <CardContent>
              <Typography variant="h6" sx={notificationsHeader}>
                Recent Notifications
              </Typography>

              {notifications.length > 0 ? (
                <List sx={notificationsList}>
                  {notifications.map((notification) => (
                    <div key={notification.id}>
                      <ListItem
                        secondaryAction={
                          !notification.read && <Chip label="New" size="small" sx={newChip} />
                        }
                      >
                        <ListItemText
                          primary={
                            <Typography
                              component="div"
                              variant="subtitle1"
                              sx={
                                notification.read
                                  ? readNotificationText
                                  : unreadNotificationText
                              }
                            >
                              {notification.text}
                            </Typography>
                          }
                          secondary={
                            <Typography component="span" variant="caption" sx={notificationTime}>
                              {notification.time}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <Divider sx={notificationsListDivider} />
                    </div>
                  ))}
                </List>
              ) : (
                <Box sx={noMeetingsBox}>
                  <Typography variant="body1" sx={noMeetingsText}>
                    No new notifications
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}