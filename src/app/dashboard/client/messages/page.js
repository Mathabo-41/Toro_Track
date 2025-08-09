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
  Paper
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

/**
 * Client Messages & Notifications Screen
 */

const clientMenu = [
  { name: 'Project Details', path: '/dashboard/client/details' },
  { name: 'Raise Query', path: '/dashboard/client/query' },
  { name: 'Messages & Notifications', path: '/dashboard/client/messages' },
  { name: 'Settings', path: '/dashboard/client/settings' }
];

// Sample data
const teamMembers = [
  { id: 1, name: 'Alex Johnson', role: 'Project Manager', avatar: '/avatars/1.jpg', online: true },
  { id: 2, name: 'Sarah Chen', role: 'UI/UX Designer', avatar: '/avatars/2.jpg', online: false },
  { id: 3, name: 'Michael Brown', role: 'Frontend Dev', avatar: '/avatars/3.jpg', online: true }
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
      { sender: 'Thabo Johnson', text: 'Let me check the timeline and get back to you', time: '2h ago', read: false }
    ]
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
      { sender: 'Sarah Mokoena', text: 'I\'ve updated the color scheme per our discussion', time: '1d ago', read: true }
    ]
  }
];

const notifications = [
  { id: 1, text: 'New project milestone added', time: '30m ago', read: false, type: 'project' },
  { id: 2, text: 'Meeting scheduled for tomorrow at 2pm', time: '2h ago', read: true, type: 'meeting' },
  { id: 3, text: 'Alex Johnson replied to your query', time: '5h ago', read: true, type: 'query' }
];

const meetings = [
  { id: 1, title: 'Design Review', date: 'Tomorrow, 2:00 PM', participants: ['Alex', 'Sarah'], status: 'confirmed' },
  { id: 2, title: 'Project Kickoff', date: 'Jan 15, 10:00 AM', participants: ['Full Team'], status: 'completed' }
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
      const updatedConversations = conversations.map(conv => {
        if (conv.id === activeConversation.id) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              { sender: 'You', text: newMessage, time: 'Just now', read: true }
            ],
            lastMessage: newMessage,
            time: 'Just now'
          };
        }
        return conv;
      });
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv => 
    conv.with.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#000000'
    }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#000000',
            borderRight: '1px solid #222',
            color: '#fff'
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #222' }}>
          <Typography variant="h6">
            👔 Client Portal
          </Typography>
        </Box>
        <List>
          {clientMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={{ 
                  color: '#fff',
                  backgroundColor: item.name === 'Messages & Notifications' ? '#1a1a1a' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#1a1a1a'
                  }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: '#000000'
      }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            color: '#fff',
            fontWeight: 500
          }}>
            <ChatIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
             color: '#f4c10f'
            }} />
            Messages & Notifications
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Communicate with your project team and stay updated
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#f4c10f'
            },
            mb: 3
          }}
        >
          <Tab label="Messages" icon={<ChatIcon />} iconPosition="start" sx={{ color: '#fff' }} />
          <Tab label="Meetings" icon={<MeetingsIcon />} iconPosition="start" sx={{ color: '#fff' }} />
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={{ color: '#fff' }} />
        </Tabs>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Card sx={{ 
            backgroundColor: '#0a0a0a',
            border: '1px solid #222'
          }}>
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
                      startAdornment: <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)', mr: 1 }} />
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiInputBase-input': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                      },
                    }}
                  />

                  <List sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                    {filteredConversations.map((conversation) => (
                      <ListItem 
                        key={conversation.id}
                        disablePadding
                        sx={{ mb: 1 }}
                      >
                        <ListItemButton
                          onClick={() => setActiveConversation(conversation)}
                          sx={{
                            backgroundColor: '#1a1a1a',
                            borderRadius: 1,
                            '&:hover': {
                              backgroundColor: '#252525'
                            }
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
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
                              <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                                {conversation.with}
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                color: 'rgba(255, 255, 255, 0.7)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '200px'
                              }}>
                                {conversation.lastMessage}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="caption" sx={{ 
                                color: 'rgba(255, 255, 255, 0.5)',
                                display: 'block'
                              }}>
                                {conversation.time}
                              </Typography>
                              {conversation.unread > 0 && (
                                <Chip 
                                  label={conversation.unread}
                                  size="small"
                                  sx={{ 
                                    mt: 0.5,
                                    backgroundColor: '#f4c10f',
                                    color: '#000',
                                    fontWeight: 'bold'
                                  }}
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
                <Box>
                  <Stack 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
                    <Button 
                      startIcon={<BackIcon />}
                      onClick={() => setActiveConversation(null)}
                      sx={{ 
                        color: '#f4c10f',
                        mr: 2
                      }}
                    >
                      Back
                    </Button>
                    <Typography variant="h6" sx={{ color: '#fff', flexGrow: 1 }}>
                      {activeConversation.with}
                    </Typography>
                    <IconButton sx={{ color: '#fff' }}>
                      <MoreIcon />
                    </IconButton>
                  </Stack>

                  <Box sx={{ 
                    height: '50vh', 
                    overflow: 'auto',
                    mb: 2,
                    p: 2,
                    backgroundColor: '#1a1a1a',
                    borderRadius: 1
                  }}>
                    {activeConversation.messages.map((message, index) => (
                      <Box 
                        key={index}
                        sx={{ 
                          mb: 3,
                          display: 'flex',
                          flexDirection: message.sender === 'You' ? 'row-reverse' : 'row'
                        }}
                      >
                        <Avatar 
                          src={message.sender !== 'You' ? 
                            teamMembers.find(m => m.name === message.sender)?.avatar : ''}
                          sx={{ 
                            width: 32, 
                            height: 32,
                            mr: message.sender === 'You' ? 0 : 2,
                            ml: message.sender === 'You' ? 2 : 0
                          }}
                        />
                        <Box sx={{ 
                          maxWidth: '70%',
                          backgroundColor: message.sender === 'You' ? '#f4c10f' : '#333',
                          color: message.sender === 'You' ? '#000' : '#fff',
                          p: 2,
                          borderRadius: 2,
                          position: 'relative'
                        }}>
                          <Typography component="div" variant="body1">{message.text}</Typography>
                          <Stack 
                            direction="row" 
                            justifyContent="flex-end" 
                            alignItems="center"
                            spacing={0.5}
                            sx={{ mt: 1 }}
                          >
                            <Typography component="span" variant="caption" sx={{ 
                              color: message.sender === 'You' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.5)'
                            }}>
                              {message.time}
                            </Typography>
                            {message.sender === 'You' && (
                              message.read ? (
                                <ReadIcon sx={{ fontSize: 16, color: '#2e7d32' }} />
                              ) : (
                                <UnreadIcon sx={{ fontSize: 16, color: 'rgba(0,0,0,0.5)' }} />
                              )
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Box component="form" onSubmit={handleSendMessage}>
                    <Stack direction="row" spacing={1}>
                      <TextField
                        fullWidth
                        placeholder="Type your message..."
                        variant="outlined"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        sx={{
                          '& .MuiInputBase-input': { color: '#fff' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.23)',
                            },
                          },
                        }}
                      />
                      <Button 
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: '#f4c10f',
                          color: '#000',
                          minWidth: 'auto',
                          '&:hover': {
                            backgroundColor: '#d1a20b'
                          }
                        }}
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

        {activeTab === 1 && (
          <Card sx={{ 
            backgroundColor: '#0a0a0a',
            border: '1px solid #222'
          }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  Upcoming Meetings
                </Typography>
                <Button 
                  variant="contained"
                  startIcon={<NewMeetingIcon />}
                  sx={{
                    backgroundColor: '#f4c10f',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#d1a20b'
                    }
                  }}
                >
                  New Meeting
                </Button>
              </Stack>

              {meetings.length > 0 ? (
                <List sx={{ 
                  backgroundColor: '#1a1a1a',
                  borderRadius: 1,
                  border: '1px solid #333'
                }}>
                  {meetings.map((meeting) => (
                    <div key={meeting.id}>
                      <ListItem 
  secondaryAction={
    <Chip 
      label={meeting.status}
      size="small"
      sx={{
        backgroundColor: meeting.status === 'confirmed' ? 'rgba(46, 125, 50, 0.2)' : 
                        meeting.status === 'completed' ? 'rgba(97, 97, 97, 0.2)' : 
                        'rgba(255, 152, 0, 0.2)',
        color: meeting.status === 'confirmed' ? '#81c784' : 
              meeting.status === 'completed' ? '#bdbdbd' : '#ffb74d',
        border: meeting.status === 'confirmed' ? '1px solid #2e7d32' : 
               meeting.status === 'completed' ? '1px solid #616161' : 
               '1px solid #ff9800'
      }}
    />
  }
>
  <ListItemText
    primary={
      <Typography variant="subtitle1" sx={{ color: '#fff' }}>
        {meeting.title}
      </Typography>
    }
    secondary={
      <>
        <Typography 
          component="span" 
          variant="body2" 
          display="block" 
          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          {meeting.date}
        </Typography>
        <Typography 
          component="span" 
          variant="caption" 
          sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          With: {meeting.participants.join(', ')}
        </Typography>
      </>
    }
  />
</ListItem>
                      <Divider sx={{ backgroundColor: '#333' }} />
                    </div>
                  ))}
                </List>
              ) : (
                <Box sx={{ 
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#1a1a1a',
                  borderRadius: 1
                }}>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    No upcoming meetings scheduled
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 2 && (
          <Card sx={{ 
            backgroundColor: '#0a0a0a',
            border: '1px solid #222'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                color: '#fff',
                mb: 2
              }}>
                Recent Notifications
              </Typography>

              {notifications.length > 0 ? (
                <List sx={{ 
                  backgroundColor: '#1a1a1a',
                  borderRadius: 1,
                  border: '1px solid #333'
                }}>
                  {notifications.map((notification) => (
                    <div key={notification.id}>
                      <ListItem 
                        secondaryAction={
                          !notification.read && (
                            <Chip 
                              label="New"
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(244, 193, 15, 0.2)',
                                color: '#f4c10f',
                                border: '1px solid #f4c10f'
                              }}
                            />
                          )
                        }
                      >
                        <ListItemText
                          primary={
                            <Typography 
                              component="div"
                              variant="subtitle1" 
                              sx={{ 
                                color: notification.read ? 'rgba(255, 255, 255, 0.7)' : '#fff',
                                fontWeight: notification.read ? 'normal' : 'bold'
                              }}
                            >
                              {notification.text}
                            </Typography>
                          }
                          secondary={
                            <Typography component="span" variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                              {notification.time}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <Divider sx={{ backgroundColor: '#333' }} />
                    </div>
                  ))}
                </List>
              ) : (
                <Box sx={{ 
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#1a1a1a',
                  borderRadius: 1
                }}>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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