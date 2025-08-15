'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Box, Typography, Card, CardContent, Stack, Button, Drawer,
  List, ListItem, ListItemButton, ListItemText, Divider,
  TextField, Avatar, Badge, Tabs, Tab, IconButton, Chip
} from '@mui/material'
import {
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
  Schedule as MeetingsIcon,
  Send as SendIcon,
  ArrowBack as BackIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  Add as NewMeetingIcon
} from '@mui/icons-material'

import { useClientStore } from '../common/clientStore'
import * as g from '../common/styles'
import * as s from './styles'
import {
  useConversations,
  useConversationMessages,
  useSendMessage,
  useMeetings,
  useNotifications
} from './useClientMessages'

export default function ClientMessagesPage() {
  const { clientMenu, currentPath, setCurrentPath } = useClientStore()
  const [tabIndex, setTabIndex] = useState(0)
  const [activeConv, setActiveConv] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [draft, setDraft] = useState('')

  // Sidebar highlight
  useEffect(() => {
    setCurrentPath('/dashboard/client/messages')
  }, [setCurrentPath])

  // Queries
  const { data: convs = [], isLoading: convLoading } = useConversations()
  const { data: messages = [], isLoading: msgLoading } = useConversationMessages(activeConv?.id, { enabled: !!activeConv })
  const sendMutation = useSendMessage(activeConv?.id)
  const { data: meetings = [] }       = useMeetings()
  const { data: notifications = [] }  = useNotifications()

  // Handlers
  const handleSend = (e) => {
    e.preventDefault()
    if (draft.trim() && activeConv) {
      sendMutation.mutate(draft)
      setDraft('')
    }
  }

  const filteredConvs = convs.filter((c) =>
    c.with.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box sx={s.mainBox}>
      <Drawer variant="permanent" anchor="left" sx={g.drawerStyles}>
        <Box sx={s.drawerHeader}>
          <Typography variant="h5">Client Portal</Typography>
        </Box>
        <List>
          {clientMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                selected={item.path === currentPath}
                sx={g.listItemButtonStyles(item.path, currentPath)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={g.mainContentBoxStyles}>
        <Box sx={g.headerBoxStyles}>
          <Typography variant="h4" sx={g.headerTitleStyles}>
            <ChatIcon sx={g.headerIconStyles} />
            Messages & Notifications
          </Typography>
          <Typography variant="body1" sx={g.headerSubtitleStyles}>
            Communicate with your project team and stay updated
          </Typography>
        </Box>

        <Tabs
          value={tabIndex}
          onChange={(_, v) => { setTabIndex(v); setActiveConv(null) }}
          sx={g.tabsStyles}
        >
          <Tab label="Messages"       icon={<ChatIcon />}         iconPosition="start" sx={g.tabStyles} />
          <Tab label="Meetings"       icon={<MeetingsIcon />}     iconPosition="start" sx={g.tabStyles} />
          <Tab label="Notifications"  icon={<NotificationsIcon />}iconPosition="start" sx={g.tabStyles} />
        </Tabs>

        {tabIndex === 0 && (
          <Card sx={g.cardStyles}>
            <CardContent>
              {!activeConv ? (
                <>
                  <TextField
                    fullWidth
                    placeholder="Search conversations…"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={s.searchIcon} />
                    }}
                    sx={s.textField}
                  />

                  <List sx={s.conversationList}>
                    {convLoading && <Typography>Loading…</Typography>}
                    {!convLoading &&
                      filteredConvs.map((c) => (
                        <ListItem key={c.id} sx={s.conversationListItem}>
                          <ListItemButton
                            onClick={() => setActiveConv(c)}
                            sx={s.conversationListItemButton}
                          >
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                              <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                                color="success"
                                invisible={!c.online}
                              >
                                <Avatar src={c.avatar} />
                              </Badge>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={s.conversationWithText}>{c.with}</Typography>
                                <Typography sx={s.conversationLastMessage}>{c.lastMessage}</Typography>
                              </Box>
                              <Box>
                                <Typography sx={s.conversationTime}>{c.time}</Typography>
                                {c.unread > 0 && <Chip label={c.unread} size="small" sx={s.unreadChip} />}
                              </Box>
                            </Stack>
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </>
              ) : (
                <>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={s.activeConversationHeader}>
                    <Button startIcon={<BackIcon />} onClick={() => setActiveConv(null)} sx={s.backButton}>
                      Back
                    </Button>
                    <Typography sx={s.activeConversationTitle}>{activeConv.with}</Typography>
                    <IconButton><MoreIcon /></IconButton>
                  </Stack>

                  <Box sx={s.messageBox}>
                    {msgLoading && <Typography>Loading messages…</Typography>}
                    {!msgLoading &&
                      messages.map((m,i) => (
                        <Box
                          key={i}
                          sx={{
                            ...s.messageContainer,
                            ...(m.sender === 'You' ? s.myMessageContainer : s.otherMessageContainer)
                          }}
                        >
                          {m.sender !== 'You' && <Avatar src={m.avatar} sx={{ mr: 1 }} />}
                          <Box sx={m.sender === 'You' ? s.myMessageBubble : s.otherMessageBubble}>
                            <Typography>{m.text}</Typography>
                            <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                              <Typography sx={m.sender === 'You' ? s.myMessageTime : s.otherMessageTime}>
                                {m.time}
                              </Typography>
                              {m.sender === 'You' && (m.read ? <ReadIcon sx={s.readIcon}/> : <MoreIcon sx={s.unreadIcon}/> )}
                            </Stack>
                          </Box>
                          {m.sender === 'You' && <Avatar sx={{ ml: 1, visibility: 'hidden' }}> </Avatar>}
                        </Box>
                      ))}
                  </Box>

                  <Box component="form" onSubmit={handleSend} sx={s.sendMessageForm}>
                    <TextField
                      fullWidth
                      placeholder="Type your message…"
                      variant="outlined"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      sx={s.textField}
                    />
                    <Button type="submit" variant="contained" sx={s.sendButton}>
                      <SendIcon />
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {tabIndex === 1 && (
          <Card sx={g.cardStyles}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" sx={s.meetingsHeader}>
                <Typography variant="h6">Upcoming Meetings</Typography>
                <Button startIcon={<NewMeetingIcon />} sx={s.newMeetingButton}>
                  New Meeting
                </Button>
              </Stack>

              {meetings.length === 0 ? (
                <Box sx={s.noDataBox}>
                  <Typography sx={s.noDataText}>No upcoming meetings</Typography>
                </Box>
              ) : (
                meetings.map((m) => (
                  <React.Fragment key={m.id}>
                    <ListItem
                      secondaryAction={
                        <Chip label={m.status} size="small" sx={s.meetingStatusChip(m.status)} />
                      }
                      sx={s.meetingsListItem}
                    >
                      <ListItemText
                        primary={<Typography sx={s.meetingTitle}>{m.title}</Typography>}
                        secondary={
                          <>
                            <Typography sx={s.meetingDate}>{m.date}</Typography>
                            <Typography sx={s.meetingParticipants}>
                              With: {m.participants.join(', ')}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider sx={s.meetingsListDivider} />
                  </React.Fragment>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {tabIndex === 2 && (
          <Card sx={g.cardStyles}>
            <CardContent>
              <Typography variant="h6" sx={s.notificationsHeader}>
                Recent Notifications
              </Typography>

              {notifications.length === 0 ? (
                <Box sx={s.noDataBox}>
                  <Typography sx={s.noDataText}>No new notifications</Typography>
                </Box>
              ) : (
                notifications.map((n) => (
                  <React.Fragment key={n.id}>
                    <ListItem
                      secondaryAction={!n.read && <Chip label="New" size="small" sx={s.newChip} />}
                      sx={s.notificationsListItem}
                    >
                      <ListItemText
                        primary={
                          <Typography sx={n.read ? s.readNotificationText : s.unreadNotificationText}>
                            {n.text}
                          </Typography>
                        }
                        secondary={<Typography sx={s.notificationTime}>{n.time}</Typography>}
                      />
                    </ListItem>
                    <Divider sx={s.notificationsListDivider} />
                  </React.Fragment>
                ))
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  )
}
