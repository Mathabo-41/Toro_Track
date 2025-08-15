export const mainBox = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#fefae0',
};

export const drawerPaper = {
  width: 240,
  boxSizing: 'border-box',
  backgroundColor: '#283618',
  borderRight: '2px solid #6b705c',
  color: '#fefae0',
};

export const drawerHeader = {
  p: 2,
  borderBottom: '2px solid #6b705c',
};

export const listItemButton = {
  color: '#fefae0',
  '&:hover': {
    backgroundColor: '#6b705c',
  },
};

export const mainContentBox = {
  flexGrow: 1,
  p: 3,
  backgroundColor: '#fefae0',
};

export const projectHeader = {
  mb: 4,
};

export const projectTitle = {
  color: '#525252',
  fontWeight: 500,
};

export const projectIcon = {
  mr: 1,
  verticalAlign: 'middle',
  color: '#f3722c',
};

export const statusChip = (status) => ({
  backgroundColor: status === 'active' ? 'rgba(2, 136, 209, 0.2)' : 'rgba(46, 125, 50, 0.2)',
  color: status === 'active' ? '#4fc3f7' : '#81c784',
  border: status === 'active' ? '1px solid #0288d1' : '1px solid #2e7d32',
  fontWeight: 'bold',
});

export const projectDescription = {
  color: '#525252',
  mt: 1,
};

export const progressCard = {
  backgroundColor: '#fefae0',
  mb: 3,
  border: '1px solid #222',
};

export const progressCardContent = {
  color: '#525252',
  mb: 2,
  fontWeight: 500,
};

export const progressBarContainer = {
  width: '100%',
  height: 10,
  backgroundColor: '#e9e9e9',
  borderRadius: 5,
  overflow: 'hidden',
};

export const progressBar = (progress) => ({
  width: `${progress}%`,
  height: '100%',
  backgroundColor: '#f3722c',
});

export const deadlineBox = {
  backgroundColor: '#e0e0e0',
  p: 2,
  borderRadius: 1,
  border: '1px solid #999',
  minWidth: 120,
};

export const tabs = {
  '& .MuiTabs-indicator': {
    backgroundColor: '#f3722c',
  },
  mb: 3,
};

export const tab = {
  color: '#283618',
};

export const tabContentBox = {
  mt: 2,
};

export const infoCard = {
  backgroundColor: '#fefae0',
  border: '1px solid #222',
  height: '100%',
};

export const infoCardContent = {
  color: '#525252',
  mb: 2,
  fontWeight: 500,
};

export const infoLabel = {
  color: '#525252',
};

export const infoValue = {
  color: '#283618',
};

export const recentActivityItem = {
  color: '#283618',
};

export const milestonesTableContainer = {
  backgroundColor: 'transparent',
  border: '2px solid #525252',
};

export const tableCellHeader = {
  color: '#283618',
  fontWeight: 'bold',
};

export const tableCell = {
  color: '#283618',
};

export const statusChipCompleted = {
  backgroundColor: 'rgba(46, 125, 50, 0.2)',
  color: '#81c784',
  border: '1px solid #2e7d32',
};

export const statusChipInProgress = {
  backgroundColor: 'rgba(255, 152, 0, 0.2)',
  color: '#ffb74d',
  border: '1px solid #ff9800',
};

export const statusChipPending = {
  backgroundColor: 'rgba(97, 97, 97, 0.2)',
  color: '#bdbdbd',
  border: '1px solid #616161',
};

export const teamCard = {
  backgroundColor: '#ccd5ae',
  border: '2px solid #606c38',
};

export const teamCardContent = {
  color: '#283618',
};

export const memberRole = {
  color: '#525252',
};

export const filesTableContainer = {
  backgroundColor: 'transparent',
  border: '2px solid #525252',
};

export const fileNameStack = {
  color: '#283618',
};

export const fileNameIcon = {
  color: '#f3722c',
};

export const discussionList = {
  mb: 3,
  maxHeight: 400,
  overflow: 'auto',
};

export const discussionDivider = {
  backgroundColor: '#6b705c',
};

export const commentUser = {
  color: '#283618',
  fontWeight: 500,
};

export const commentText = {
  color: '#525252',
  mt: 0.5,
};

export const commentTime = {
  color: 'rgba(40, 54, 24, 0.5)',
  fontSize: '0.75rem',
  mt: 0.5,
};

export const commentForm = {
  mt: 2,
};

export const commentInput = {
  '& .MuiInputBase-input': { color: '#283618' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6b705c',
    },
  },
};

export const postButton = {
  backgroundColor: '#f3722c',
  color: '#fefae0',
  '&:hover': {
    backgroundColor: '#e65c19',
  },
};

/* messages */

export const activeListItemButton = {
  backgroundColor: '#6b705c',
};

export const headerBox = {
  mb: 4,
};

export const headerTitle = {
  color: '#525252',
  fontWeight: 500,
};

export const headerIcon = {
  mr: 1,
  verticalAlign: 'middle',
  color: '#f3722c',
};

export const headerSubtitle = {
  color: '#525252',
};

export const card = {
  backgroundColor: '#fefae0',
  border: '1px solid #283618',
};

export const textField = {
  mb: 2,
  '& .MuiInputBase-input': { color: '#283618' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6b705c',
    },
  },
};

export const searchIcon = {
  color: '#525252',
  mr: 1,
};

export const conversationList = {
  maxHeight: '60vh',
  overflow: 'auto',
};

export const conversationListItem = {
  mb: 1,
};

export const conversationListItemButton = {
  backgroundColor: '#6b705c',
  borderRadius: 1,
  '&:hover': {
    backgroundColor: '#a3a699',
  },
};

export const conversationWithText = {
  color: '#fefae0',
};

export const conversationLastMessage = {
  color: 'rgba(254, 250, 224, 0.7)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '200px',
};

export const conversationTime = {
  color: 'rgba(254, 250, 224, 0.5)',
  display: 'block',
};

export const unreadChip = {
  mt: 0.5,
  backgroundColor: '#f3722c',
  color: '#fefae0',
  fontWeight: 'bold',
};

export const activeConversationHeader = {
  mb: 3,
};

export const backButton = {
  color: '#f3722c',
  mr: 2,
};

export const activeConversationTitle = {
  color: '#283618',
  flexGrow: 1,
};

export const messageBox = {
  height: '50vh',
  overflow: 'auto',
  mb: 2,
  p: 2,
  backgroundColor: '#e0e0e0',
  borderRadius: 1,
};

export const messageContainer = {
  mb: 3,
};

export const myMessageContainer = {
  display: 'flex',
  flexDirection: 'row-reverse',
};

export const otherMessageContainer = {
  display: 'flex',
  flexDirection: 'row',
};

export const myMessageBubble = {
  maxWidth: '70%',
  backgroundColor: '#f3722c',
  color: '#fefae0',
  p: 2,
  borderRadius: 2,
  position: 'relative',
};

export const otherMessageBubble = {
  maxWidth: '70%',
  backgroundColor: '#a3a699',
  color: '#283618',
  p: 2,
  borderRadius: 2,
  position: 'relative',
};

export const myMessageTime = {
  color: 'rgba(254, 250, 224, 0.7)',
};

export const otherMessageTime = {
  color: 'rgba(40, 54, 24, 0.5)',
};

export const readIcon = {
  fontSize: 16,
  color: '#2e7d32',
};

export const unreadIcon = {
  fontSize: 16,
  color: 'rgba(254, 250, 224, 0.5)',
};

export const sendMessageForm = {
  mt: 2,
};

export const sendButton = {
  backgroundColor: '#f3722c',
  color: '#fefae0',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: '#e65c19',
  },
};

export const meetingsHeader = {
  mb: 3,
};

export const newMeetingButton = {
  backgroundColor: '#f3722c',
  color: '#fefae0',
  '&:hover': {
    backgroundColor: '#e65c19',
  },
};

export const meetingsList = {
  backgroundColor: '#ccd5ae',
  border: '2px solid #606c38',
  borderRadius: 1,
};

export const meetingsListDivider = {
  backgroundColor: '#a3a699',
};

export const meetingStatusChip = (status) => ({
  backgroundColor:
    status === 'confirmed'
      ? 'rgba(46, 125, 50, 0.2)'
      : status === 'completed'
      ? 'rgba(97, 97, 97, 0.2)'
      : 'rgba(255, 152, 0, 0.2)',
  color:
    status === 'confirmed'
      ? '#043807ff'
      : status === 'completed'
      ? '#3b3939ff'
      : '#ffb74d',
  border:
    status === 'confirmed'
      ? '1px solid #2e7d32'
      : status === 'completed'
      ? '1px solid #616161'
      : '1px solid #ff9800',
});

export const meetingTitle = {
  color: '#283618',
};

export const meetingDate = {
  color: '#525252',
};

export const meetingParticipants = {
  color: 'rgba(40, 54, 24, 0.5)',
};

export const noMeetingsBox = {
  p: 3,
  textAlign: 'center',
  backgroundColor: '#e0e0e0',
  borderRadius: 1,
};

export const noMeetingsText = {
  color: '#525252',
};

export const notificationsHeader = {
  color: '#283618',
  mb: 2,
};

export const notificationsList = {
  backgroundColor: '#ccd5ae',
  border: '2px solid #606c38',
  borderRadius: 1,
};

export const notificationsListDivider = {
  backgroundColor: '#a3a699',
};

export const newChip = {
  backgroundColor: 'rgba(243, 114, 44, 0.2)',
  color: '#f3722c',
  border: '1px solid #f3722c',
};

export const readNotificationText = {
  color: '#525252',
  fontWeight: 'normal',
};

export const unreadNotificationText = {
  color: '#283618',
  fontWeight: 'bold',
};

export const notificationTime = {
  color: 'rgba(40, 54, 24, 0.5)',
};

/* queries */

export const queryCard = {
  backgroundColor: '#e0e0e0',
  border: '1px solid #a3a699',
};

export const queryDetailTitle = {
  color: '#283618',
};

export const queryStatusChip = (status) => ({
  backgroundColor:
    status === 'resolved'
      ? 'rgba(46, 125, 50, 0.2)'
      : status === 'in-progress'
      ? 'rgba(255, 152, 0, 0.2)'
      : 'rgba(97, 97, 97, 0.2)',
  color:
    status === 'resolved'
      ? '#81c784'
      : status === 'in-progress'
      ? '#ffb74d'
      : '#bdbdbd',
  border:
    status === 'resolved'
      ? '1px solid #2e7d32'
      : status === 'in-progress'
      ? '1px solid #ff9800'
      : '1px solid #616161',
});

export const queryInfoBox = {
  mb: 3,
};

export const queryInfoLabel = {
  color: '#525252',
};

export const queryInfoValue = {
  color: '#283618',
  mb: 2,
};

export const attachmentsBox = {
  mb: 3,
};

export const attachmentsTableContainer = {
  backgroundColor: 'transparent',
  border: '1px solid #a3a699',
};

export const attachmentFileIcon = {
  color: '#f3722c',
};

export const downloadButton = {
  color: '#f3722c',
  borderColor: '#f3722c',
  '&:hover': {
    borderColor: '#e65c19',
  },
};

export const responseBox = {
  backgroundColor: '#a3a699',
  p: 3,
  borderRadius: 1,
  border: '1px solid #6b705c',
};

export const responseLabel = {
  color: '#283618',
  mb: 1,
};

export const newQueryCard = {
  backgroundColor: '#ccd5ae',
  border: '2px solid #606c38',
  height: '100%',
};

export const newQueryTitle = {
  color: '#283618',
  mb: 2,
  fontWeight: 500,
};

export const newQueryTextField = {
  '& .MuiInputLabel-root': { color: '#525252' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6b705c',
    },
    '&:hover fieldset': {
      borderColor: '#283618',
    },
  },
  '& .MuiInputBase-input': { color: '#283618' },
};

export const newQueryInputLabel = {
  color: '#525252',
};

export const newQuerySelect = {
  color: '#283618',
  '& .MuiSvgIcon-root': {
    color: '#6b705c',
  },
};

export const newQuerySelectOutline = {
  borderColor: '#6b705c',
  '&:hover': {
    borderColor: '#283618',
  },
};

export const attachFileButton = {
  color: '#606c38',
  borderColor: '#606c38',
  '&:hover': {
    border: '#283618',
    backgroundColor: '#283618',
  },
};

export const attachedFileBox = {
  mt: 1,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#a3a699',
  p: 1,
  borderRadius: 1,
};

export const attachedFileText = {
  color: '#283618',
  flexGrow: 1,
};

export const removeFileButton = {
  color: '#d32f2f',
};

export const submitButton = {
  backgroundColor: '#f3722c',
  color: '#fefae0',
  '&:hover': {
    backgroundColor: '#e65c19',
  },
};

export const previousQueriesCard = {
  backgroundColor: '#ccd5ae',
  border: '2px solid #606c38',
  height: '100%',
};

export const previousQueriesTitle = {
  color: '#283618',
  mb: 2,
  fontWeight: 500,
};

export const previousQueriesTableContainer = {
  backgroundColor: 'transparent',
  border: '1px solid #a3a699',
};

export const previousQueriesTableCellHeader = {
  color: '#283618',
  fontWeight: 'bold',
};

export const previousQueriesTableCell = {
  color: '#283618',
};

export const queryRow = {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(40, 54, 24, 0.05)',
  },
};

export const noQueriesBox = {
  p: 3,
  textAlign: 'center',
  backgroundColor: '#a3a699',
  borderRadius: 1,
};

export const noQueriesText = {
  color: '#283618',
};

/* settings */
export const settingsCard = {
  backgroundColor: '#ccd5ae',
  border: '2px solid #606c38',
};

export const profileHeaderTitle = {
  color: '#283618',
};

export const saveButton = {
  backgroundColor: '#283618',
  color: '#606c38',
  '&:hover': {
    backgroundColor: '#344e41',
  },
};

export const cancelButton = {
  color: '#606c38',
  borderColor: '#606c38',
  '&:hover': {
    border: '#283618',
    backgroundColor: '#283618',
  },
};

export const editProfileButton = {
  color: '#606c38',
  borderColor: '#606c38',
  '&:hover': {
    border: '#283618',
    backgroundColor: '#283618',
  },
};

export const profileAvatar = {
  width: 120,
  height: 120,
  mb: 2,
  border: '2px solid #f3722c',
};

export const changePhotoButton = {
  color: '#f3722c',
  borderColor: '#f3722c',
  '&:hover': {
    borderColor: '#e65c19',
  },
};

export const profileTextField = (editMode) => ({
  '& .MuiInputLabel-root': {
    color: '#525252'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#a3a699',
    },
  },
  '& .MuiInputBase-input': {
    color: '#283618',
    opacity: editMode ? 1 : 0.7,
  },
});

export const securityTitle = {
  color: '#283618',
  mb: 3,
};

export const securitySubtitle = {
  color: '#283618',
  mb: 2,
};

export const passwordTextField = {
  '& .MuiInputLabel-root': {
    color: '#525252'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#a3a699',
    },
  },
  '& .MuiInputBase-input': {
    color: '#283618'
  },
};

export const updatePasswordButton = {
  mt: 3,
  backgroundColor: '#f3722c',
  color: '#fefae0',
  '&:hover': {
    backgroundColor: '#e65c19'
  },
};

export const securityPaper = {
  p: 2,
  mb: 3,
  backgroundColor: '#a3a699',
  border: '1px solid #6b705c'
};

export const securityBodyText = {
  color: 'rgba(40, 54, 24, 0.7)',
  mt: 1,
};

export const sessionPaper = {
  p: 2,
  backgroundColor: '#a3a699',
  border: '1px solid #6b705c',
};

export const sessionDeviceText = {
  color: '#283618',
};

export const sessionTimeText = {
  color: 'rgba(40, 54, 24, 0.5)',
};

export const logoutDevicesButton = {
  mt: 1,
  color: '#d32f2f',
  borderColor: '#d32f2f',
  '&:hover': {
    borderColor: '#b71c1c',
  },
};

export const notificationsTitle = {
  color: '#283618',
  mb: 3,
};

export const notificationsPaper = {
  p: 2,
  mb: 2,
  backgroundColor: '#a3a699',
  border: '1px solid #6b705c',
};

export const notificationsSubtitle = {
  color: '#283618',
  mb: 1,
};

export const notificationSwitch = {
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#f3722c',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#f3722c',
  },
};

export const notificationLabel = {
  color: '#283618',
};

export const savePreferencesButton = {
  mt: 3,
  backgroundColor: '#f3722c',
  color: '#fefae0',
  '&:hover': {
    backgroundColor: '#e65c19',
  },
};

export const preferencesTitle = {
  color: '#283618',
  mb: 3,
};

export const preferencesPaper = {
  p: 2,
  mb: 2,
  backgroundColor: '#a3a699',
  border: '1px solid #6b705c',
};

export const preferencesSubtitle = {
  color: '#283618',
  mb: 2,
};

export const darkModeSwitch = {
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#f3722c',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#f3722c',
  },
};

export const darkModeLabel = {
  color: '#283618',
};

export const languageSelect = {
  '& .MuiInputLabel-root': {
    color: '#525252'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6b705c',
    },
  },
  '& .MuiInputBase-input': {
    color: '#283618'
  },
  '& .MuiSvgIcon-root': {
    color: '#6b705c'
  },
};

export const logoutBox = {
  mt: 3,
  textAlign: 'right',
};

export const logoutButton = {
  color: '#d32f2f',
  borderColor: '#d32f2f',
  '&:hover': {
    borderColor: '#b71c1c',
  },
};