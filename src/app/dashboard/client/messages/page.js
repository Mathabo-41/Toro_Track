'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && activeConversation) {
      //  send the data to  backend
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

  const handleLogout = () => {
    router.push('/login');
  };

  const filteredConversations = conversations.filter(conv => 
    conv.with.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#fefae0'
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
            backgroundColor: '#283618',
            borderRight: '1px solid #6b705c',
            color: '#fefae0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }}
      >
        <Box>
          <Box sx={{ p: 2, borderBottom: '1px solid #6b705c' }}>
            <Typography variant="h5">
              Client Portal
            </Typography>
          </Box>
          <List>
            {clientMenu.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton 
                  component={Link} 
                  href={item.path}
                  sx={{ 
                    color: '#fefae0',
                    backgroundColor: item.name === 'Messages & Notifications' ? '#6b705c' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#6b705c'
                    }
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* User Profile Section */}
        <Box sx={{ 
          borderTop: '2px solid #6b705c',
          padding: '1rem',
          marginTop: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }}>
          {/* User profile picture and details */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
            <Box sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              border: '2px solid #f3722c'
            }}>
              <Image
                src="/toroLogo.jpg"
                alt="User Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ 
                fontWeight: '600', 
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: '#fefae0'
              }}>
                John Doe
              </Typography>
              <Typography sx={{ 
                fontSize: '0.8rem', 
                opacity: 0.8, 
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'rgba(254, 250, 224, 0.7)'
              }}>
                client@toro.com
              </Typography>
            </Box>
          </Box>
          {/* Logout button */}
          <Button 
            onClick={handleLogout}
            fullWidth
            sx={{
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid #fefae0',
              borderRadius: '8px',
              color: '#fefae0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              '&:hover': {
                background: '#6b705c'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: '#fefae0'
      }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            color: '#525252',
            fontWeight: 500
          }}>
            <ChatIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
              color: '#f3722c'
            }} />
            Messages & Notifications
          </Typography>
          <Typography variant="body1" sx={{ color: '#525252' }}>
            Communicate with your project team and stay updated
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#f3722c'
            },
            mb: 3
          }}
        >
          <Tab label="Messages" icon={<ChatIcon />} iconPosition="start" sx={{ color: '#283618' }} />
          <Tab label="Meetings" icon={<MeetingsIcon />} iconPosition="start" sx={{ color: '#283618' }} />
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" sx={{ color: '#283618' }} />
        </Tabs>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Card sx={{ 
            backgroundColor: '#fefae0',
            border: '1px solid #283618'
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
                      startAdornment: <SearchIcon sx={{ color: '#525252', mr: 1 }} />
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiInputBase-input': { color: '#283618' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#6b705c',
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
                            backgroundColor: '#6b705c',
                            borderRadius: 1,
                            '&:hover': {
                              backgroundColor: '#a3a699'
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
                              <Typography variant="subtitle1" sx={{ color: '#fefae0' }}>
                                {conversation.with}
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                color: 'rgba(254, 250, 224, 0.7)',
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
                                color: 'rgba(254, 250, 224, 0.5)',
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
                                    backgroundColor: '#f3722c',
                                    color: '#fefae0',
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
                        color: '#f3722c',
                        mr: 2
                      }}
                    >
                      Back
                    </Button>
                    <Typography variant="h6" sx={{ color: '#283618', flexGrow: 1 }}>
                      {activeConversation.with}
                    </Typography>
                    <IconButton sx={{ color: '#283618' }}>
                      <MoreIcon />
                    </IconButton>
                  </Stack>

                  <Box sx={{ 
                    height: '50vh', 
                    overflow: 'auto',
                    mb: 2,
                    p: 2,
                    backgroundColor: '#e0e0e0',
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
                          backgroundColor: message.sender === 'You' ? '#f3722c' : '#a3a699',
                          color: message.sender === 'You' ? '#fefae0' : '#283618',
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
                              color: message.sender === 'You' ? 'rgba(254, 250, 224, 0.7)' : 'rgba(40, 54, 24, 0.5)'
                            }}>
                              {message.time}
                            </Typography>
                            {message.sender === 'You' && (
                              message.read ? (
                                <ReadIcon sx={{ fontSize: 16, color: '#2e7d32' }} />
                              ) : (
                                <UnreadIcon sx={{ fontSize: 16, color: 'rgba(254, 250, 224, 0.5)' }} />
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
                          '& .MuiInputBase-input': { color: '#283618' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#6b705c',
                            },
                          },
                        }}
                      />
                      <Button 
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: '#f3722c',
                          color: '#fefae0',
                          minWidth: 'auto',
                          '&:hover': {
                            backgroundColor: '#e65c19'
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
            backgroundColor: '#fefae0',
            border: '1px solid #283618'
          }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#283618' }}>
                  Upcoming Meetings
                </Typography>
                <Button 
                  variant="contained"
                  startIcon={<NewMeetingIcon />}
                  sx={{
                    backgroundColor: '#f3722c',
                    color: '#fefae0',
                    '&:hover': {
                      backgroundColor: '#e65c19'
                    }
                  }}
                >
                  New Meeting
                </Button>
              </Stack>

              {meetings.length > 0 ? (
                <List sx={{ 
                  backgroundColor: '#ccd5ae', 
                  border: '2px solid #606c38', 
                  borderRadius: 1,
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
                              color: meeting.status === 'confirmed' ? '#043807ff' : 
                                    meeting.status === 'completed' ? '#3b3939ff' : '#ffb74d',
                              border: meeting.status === 'confirmed' ? '1px solid #2e7d32' : 
                                     meeting.status === 'completed' ? '1px solid #616161' : 
                                     '1px solid #ff9800'
                            }}
                          />
                        }
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" sx={{ color: '#283618' }}>
                              {meeting.title}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography 
                                component="span" 
                                variant="body2" 
                                display="block" 
                                sx={{ color: '#525252' }}
                              >
                                {meeting.date}
                              </Typography>
                              <Typography 
                                component="span" 
                                variant="caption" 
                                sx={{ color: 'rgba(40, 54, 24, 0.5)' }}
                              >
                                With: {meeting.participants.join(', ')}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider sx={{ backgroundColor: '#a3a699' }} />
                    </div>
                  ))}
                </List>
              ) : (
                <Box sx={{ 
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#e0e0e0',
                  borderRadius: 1
                }}>
                  <Typography variant="body1" sx={{ color: '#525252' }}>
                    No upcoming meetings scheduled
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 2 && (
          <Card sx={{ 
            backgroundColor: '#fefae0',
            border: '1px solid #283618'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                color: '#283618',
                mb: 2
              }}>
                Recent Notifications
              </Typography>

              {notifications.length > 0 ? (
                <List sx={{ 
                  backgroundColor: '#ccd5ae', 
                  border: '2px solid #606c38',
                  borderRadius: 1,
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
                                backgroundColor: 'rgba(243, 114, 44, 0.2)',
                                color: '#f3722c',
                                border: '1px solid #f3722c'
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
                                color: notification.read ? '#525252' : '#283618',
                                fontWeight: notification.read ? 'normal' : 'bold'
                              }}
                            >
                              {notification.text}
                            </Typography>
                          }
                          secondary={
                            <Typography component="span" variant="caption" sx={{ color: 'rgba(40, 54, 24, 0.5)' }}>
                              {notification.time}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <Divider sx={{ backgroundColor: '#a3a699' }} />
                    </div>
                  ))}
                </List>
              ) : (
                <Box sx={{ 
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#e0e0e0',
                  borderRadius: 1
                }}>
                  <Typography variant="body1" sx={{ color: '#525252' }}>
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