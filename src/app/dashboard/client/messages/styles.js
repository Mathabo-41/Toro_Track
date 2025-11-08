// MODIFIED: styles.js

// --- General Page and Tab Styles (Unchanged) ---
export const mainContentBox = { flexGrow: 1, p: 3, backgroundColor: '#fefaf0', color: '#525252'};
export const pageHeader = { mb: 4 };
export const pageHeaderText = { color: '#525252', fontWeight: 500 };
export const pageHeaderIcon = { mr: 1, verticalAlign: 'middle', color: '#f3722c' };
export const pageHeaderSubtitle = { color: '#525252' };
export const tabs = { '& .MuiTabs-indicator': { backgroundColor: '#f3722c' }, mb: 3 };
export const tab = { color: '#283618' };
export const card = { backgroundColor: '#fefae0', border: '1px solid #283618' };

// REMOVED: searchTextField, searchIcon, conversationsList, conversationListItem, 
// conversationListItemButton, conversationStack, conversationName, lastMessage,
// conversationTime, unreadChip.

// REMOVED: activeConversationHeader, backButton, activeConversationTitle.

// REMOVED: messageBox, messageContainer, messageAvatar, messageBubble, messageTime,
// readIcon, unreadIcon, messageForm, messageTextField, sendButton.

// --- Meeting and Notification Styles (Unchanged) ---
export const meetingHeader = { mb: 3 };
export const newMeetingButton = { backgroundColor: '#f3722c', color: '#fefae0', '&:hover': { backgroundColor: '#e65c19' } };
export const meetingsList = { backgroundColor: '#ccd5ae', border: '2px solid #606c38', borderRadius: 1 };
export const meetingStatusChip = (status) => {
  let backgroundColor, color, border;
  if (status === 'confirmed') {
    backgroundColor = 'rgba(46, 125, 50, 0.2)'; color = '#043807ff'; border = '1px solid #2e7d32';
  } else if (status === 'completed') {
    backgroundColor = 'rgba(97, 97, 97, 0.2)'; color = '#3b3939ff'; border = '1px solid #616161';
  } else {
    backgroundColor = 'rgba(255, 152, 0, 0.2)'; color = '#ffb74d'; border = '1px solid #ff9800';
  }
  return { backgroundColor, color, border, size: 'small' };
};
export const meetingTitle = { color: '#283618' };
export const meetingDate = { color: '#525252' };
export const meetingParticipants = { color: 'rgba(40, 54, 24, 0.5)' };
export const listDivider = { backgroundColor: '#a3a699' };
export const noContentBox = { p: 3, textAlign: 'center', backgroundColor: '#e0e0e0', borderRadius: 1 };
export const noContentText = { color: '#525252' };
export const notificationNewChip = { backgroundColor: 'rgba(243, 114, 44, 0.2)', color: '#f3722c', border: '1px solid #f3722c' };
export const notificationText = (isRead) => ({ color: isRead ? '#525252' : '#283618', fontWeight: isRead ? 'normal' : 'bold' });
export const notificationTime = { color: 'rgba(40, 54, 24, 0.5)' };

export const joinButton = {
  textTransform: 'none',
  borderRadius: '4px',
  marginRight: '8px'
};

export const meetingDescription = {
  color: 'rgba(40, 54, 24, 0.7)',
  fontSize: '0.8rem',
  marginTop: '4px'
};

export const markAllReadButton = {
  textTransform: 'none',
  borderRadius: '4px'
};