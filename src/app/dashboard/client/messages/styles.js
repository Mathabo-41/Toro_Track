import { colors } from '@mui/material'

// Root container
export const mainBox = {
  display: 'flex',
  height: '100%',
  backgroundColor: colors.grey[50]
}

// Drawer overrides
export const drawerPaper = {
  width: 240,
  boxSizing: 'border-box'
}

export const drawerHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 64,
  backgroundColor: colors.primary.main,
  color: colors.common.white
}

// Search field
export const textField = {
  mb: 2
}

export const searchIcon = {
  color: colors.text.secondary,
  mr: 1
}

// Conversations list
export const conversationList = {
  maxHeight: 400,
  overflowY: 'auto'
}

export const conversationListItem = {
  '&:not(:last-child)': { borderBottom: `1px solid ${colors.grey[200]}` }
}

export const conversationListItemButton = {
  px: 2,
  py: 1.5
}

export const conversationWithText = {
  fontWeight: 500
}

export const conversationLastMessage = {
  color: colors.text.secondary
}

export const conversationTime = {
  fontSize: '0.75rem',
  color: colors.text.secondary
}

export const unreadChip = {
  ml: 1,
  backgroundColor: colors.error.main,
  color: colors.common.white
}

// Active conversation header
export const activeConversationHeader = {
  mb: 2
}

export const backButton = {
  textTransform: 'none'
}

export const activeConversationTitle = {
  fontWeight: 600
}

// Message area
export const messageBox = {
  maxHeight: 500,
  overflowY: 'auto',
  mb: 2
}

export const messageContainer = {
  display: 'flex',
  mb: 1
}

export const myMessageContainer = {
  justifyContent: 'flex-end'
}

export const otherMessageContainer = {
  justifyContent: 'flex-start'
}

export const myMessageBubble = {
  backgroundColor: colors.primary.light,
  color: colors.common.white,
  px: 2,
  py: 1,
  borderRadius: 2,
  maxWidth: '70%'
}

export const otherMessageBubble = {
  backgroundColor: colors.grey[200],
  px: 2,
  py: 1,
  borderRadius: 2,
  maxWidth: '70%'
}

export const messageTime = {
  fontSize: '0.65rem'
}

export const myMessageTime = {
  color: colors.common.white
}

export const otherMessageTime = {
  color: colors.text.secondary
}

export const readIcon = {
  fontSize: '1rem',
  color: colors.success.main
}

export const unreadIcon = {
  fontSize: '1rem',
  color: colors.text.disabled
}

// Send form
export const sendMessageForm = {
  display: 'flex'
}

export const sendButton = {
  ml: 1
}

// Meetings tab
export const meetingsHeader = {
  mb: 2
}

export const newMeetingButton = {
  textTransform: 'none'
}

export const meetingsList = {
  '& > div:last-child': { borderBottom: 'none' }
}

export const meetingsListDivider = {
  my: 1
}

export const meetingStatusChip = (status) => ({
  textTransform: 'capitalize',
  backgroundColor:
    status === 'confirmed'
      ? colors.success.main
      : status === 'completed'
      ? colors.grey[500]
      : colors.warning.main,
  color: colors.common.white
})

export const meetingTitle = {
  fontWeight: 500
}

export const meetingDate = {
  display: 'block',
  color: colors.text.secondary
}

export const meetingParticipants = {
  display: 'block',
  fontSize: '0.75rem',
  color: colors.text.secondary
}

// Notifications tab
export const notificationsHeader = {
  mb: 2
}

export const notificationsListDivider = {
  my: 1
}

export const newChip = {
  backgroundColor: colors.primary.main,
  color: colors.common.white
}

export const readNotificationText = {
  color: colors.text.secondary
}

export const unreadNotificationText = {
  fontWeight: 500
}

export const notificationTime = {
  fontSize: '0.75rem',
  color: colors.text.secondary
}

// No-data box
export const noDataBox = {
  textAlign: 'center',
  py: 4
}

export const noDataText = {
  color: colors.text.secondary
}
