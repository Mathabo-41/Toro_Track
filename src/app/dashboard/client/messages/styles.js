// Contains the inline styles and sx overrides for the messages screen

export const mainContentBox = {
  flexGrow: 1,
  p: 3,
  backgroundColor: '#fefaf0',
  color: '#525252',
  marginLeft: 30 
};

export const pageHeader = {
  mb: 4
};

export const pageHeaderText = {
  color: '#525252',
  fontWeight: 500
};

export const pageHeaderIcon = {
  mr: 1,
  verticalAlign: 'middle',
  color: '#f3722c' 
};

export const pageHeaderSubtitle = {
  color: '#525252'
};

export const tabs = {
  '& .MuiTabs-indicator': {
    backgroundColor: '#f3722c' 
  },
  mb: 3
};

export const tab = {
  color: '#283618'
};

export const card = {
  backgroundColor: '#fefae0',
  border: '1px solid #283618'
};

export const searchTextField = {
  mb: 2,
  '& .MuiInputBase-input': {
    color: '#283618'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6b705c',
    },
  },
};

export const searchIcon = {
  color: '#525252',
  mr: 1
};

export const conversationsList = {
  maxHeight: '60vh',
  overflow: 'auto'
};

export const conversationListItem = {
  mb: 1
};

export const conversationListItemButton = {
  backgroundColor: '#6b705c',
  borderRadius: 1,
  '&:hover': {
    backgroundColor: '#a3a699'
  }
};

export const conversationStack = {
  width: '100%'
};

export const conversationName = {
  color: '#fefae0'
};

export const lastMessage = {
  color: 'rgba(254, 250, 224, 0.7)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '200px'
};

export const conversationTime = {
  color: 'rgba(254, 250, 224, 0.5)',
  display: 'block'
};

export const unreadChip = {
  mt: 0.5,
  backgroundColor: '#f3722c',
  color: '#fefae0',
  fontWeight: 'bold'
};

export const activeConversationHeader = {
  mb: 3
};

export const backButton = {
  color: '#f3722c',
  mr: 2
};

export const activeConversationTitle = {
  color: '#283618',
  flexGrow: 1
};

export const messageBox = {
  height: '50vh',
  overflow: 'auto',
  mb: 2,
  p: 2,
  backgroundColor: '#e0e0e0', 
  borderRadius: 1
};

export const messageContainer = (isUser) => ({
  mb: 3,
  display: 'flex',
  flexDirection: isUser ? 'row-reverse' : 'row'
});

export const messageAvatar = (isUser) => ({
  width: 32,
  height: 32,
  mr: isUser ? 0 : 2,
  ml: isUser ? 2 : 0
});

export const messageBubble = (isUser) => ({
  maxWidth: '70%',
  backgroundColor: isUser ? '#f3722c' : '#a3a699',
  color: isUser ? '#fefae0' : '#283618',
  p: 2,
  borderRadius: 2,
  position: 'relative'
});

export const messageTime = (isUser) => ({
  color: isUser ? 'rgba(254, 250, 224, 0.7)' : 'rgba(40, 54, 24, 0.5)'
});

export const readIcon = {
  fontSize: 16,
  color: '#2e7d32'
};

export const unreadIcon = {
  fontSize: 16,
  color: 'rgba(254, 250, 224, 0.5)'
};

export const messageForm = {
  // Styles for the form
};

export const messageTextField = {
  '& .MuiInputBase-input': {
    color: '#283618'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6b705c',
    },
  },
};

export const sendButton = {
  backgroundColor: '#f3722c',
  color: '#fefae0',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: '#e65c19'
  }
};

export const meetingHeader = {
  mb: 3
};

export const newMeetingButton = {
  backgroundColor: '#f3722c',
  color: '#fefae0',
  '&:hover': {
    backgroundColor: '#e65c19'
  }
};

export const meetingsList = {
  backgroundColor: '#ccd5ae',
  border: '2px solid #606c38',
  borderRadius: 1,
};

export const meetingStatusChip = (status) => {
  let backgroundColor, color, border;
  if (status === 'confirmed') {
    backgroundColor = 'rgba(46, 125, 50, 0.2)';
    color = '#043807ff';
    border = '1px solid #2e7d32';
  } else if (status === 'completed') {
    backgroundColor = 'rgba(97, 97, 97, 0.2)';
    color = '#3b3939ff';
    border = '1px solid #616161';
  } else {
    backgroundColor = 'rgba(255, 152, 0, 0.2)';
    color = '#ffb74d';
    border = '1px solid #ff9800';
  }

  return {
    backgroundColor,
    color,
    border,
    size: 'small'
  };
};

export const meetingTitle = {
  color: '#283618'
};

export const meetingDate = {
  color: '#525252'
};

export const meetingParticipants = {
  color: 'rgba(40, 54, 24, 0.5)'
};

export const listDivider = {
  backgroundColor: '#a3a699'
};

export const noContentBox = {
  p: 3,
  textAlign: 'center',
  backgroundColor: '#e0e0e0',
  borderRadius: 1
};

export const noContentText = {
  color: '#525252'
};

export const notificationNewChip = {
  backgroundColor: 'rgba(243, 114, 44, 0.2)', 
  color: '#f3722c',
  border: '1px solid #f3722c'
};

export const notificationText = (isRead) => ({
  color: isRead ? '#525252' : '#283618',
  fontWeight: isRead ? 'normal' : 'bold'
});

export const notificationTime = {
  color: 'rgba(40, 54, 24, 0.5)'
};