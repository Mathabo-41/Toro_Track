// Contains the inline styles and sx overrides for the dahsboard overview screen

import { BorderColor, HomeMaxSharp } from "@mui/icons-material";

export const summaryCard = {
  p: 2,
  border: '1px solid #525252',
  borderRadius: 2,
  backgroundColor: '#fefaf0',
  color: '#525252',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    boxShadow:'0px 4px 20px',
    backgroundColor:'rgba(244, 193, 15, 0.1)',
  },
};

export const avatarBox = {
  bgcolor: 'rgba(244, 193, 15, 0.1)',
  width: 56,
  height: 56,
  boder:'1px solid #6b705c',
};

export const metricValue = {
  fontWeight: 700
};

export const upTrend = {
  color: '#90A955',
  display: 'flex',
  alignItems: 'center'
};

export const downTrend = {
  color: '#d62828',
  display: 'flex',
  alignItems: 'center'
};

export const activityCard = {
  maxHeight: 500,
  color:'#525252',
  overflow: 'auto',
  border: '1px solid #525252',
  borderRadius: 2,
  backgroundColor:'#fefaf0',
};

export const quickActionsCard = {
  color: '#fefaf0',
  p: 2,
  backgroundColor:'#283618',
  border: '1px solid #525252',
  borderRadius: 2,
  BorderColor: '#fefaf0',
  border: '1px solid',
};

export const quickActionsTitle = {
  mb: 2,
  color: '#fefaf0',
  backgroundColor:'#283618',
  fontWeight: 700
};

export const quickActionButton = {
  justifyContent: 'flex-start',
  color: '#fefaf0',
  backgroundColor:'#283618',
  BorderColor: '#fefaf0',
  border: '1px solid',
  '&:hover': {
    backgroundColor: 'rgba(244, 193, 15, 0.1)',  //'#31572c',
    color: '#fefaf0',
    BorderColor: '#fefaf0',
    border: '1px solid',
  }
};
// styling the sidebar
export const sidebarHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  color: '#fefae0',
};

// New styles for the Raised Queries section
export const queryListItem = {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(40, 54, 24, 0.05)',
  },
  py: 1.5,
};

export const queryStatusChip = (status) => {
  let backgroundColor, color, border;
  if (status === 'resolved') {
    backgroundColor = 'rgba(46, 125, 50, 0.2)';
    color = '#2e7d32';
    border = '1px solid #2e7d32';
  } else if (status === 'in-progress') {
    backgroundColor = 'rgba(255, 152, 0, 0.2)';
    color = '#ff9800';
    border = '1px solid #ff9800';
  } else {
    backgroundColor = 'rgba(97, 97, 97, 0.2)';
    color = '#616161';
    border = '1px solid #616161';
  }
  return {
    backgroundColor,
    color,
    border,
    fontWeight: 'bold',
    borderRadius: '16px',
    height: '24px',
    fontSize: '0.75rem',
  };
};

export const responseBox = {
  p: 2,
  backgroundColor: '#f5f5f5', // A slightly different background for the response area
  borderTop: '1px solid #e0e0e0',
  mt: 1,
};

export const responseTextField = {
  '& .MuiInputLabel-root': { color: '#525252' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6b705c',
    },
    '&:hover fieldset': {
      borderColor: '#283618',
    },
    backgroundColor: '#fff',
  },
  '& .MuiInputBase-input': { color: '#283618' },
  mb: 1,
};

export const sendButton = {
  backgroundColor: '#f3722c',
  color: '#fefae0',
  '&:hover': {
    backgroundColor: '#e65c19',
  },
};