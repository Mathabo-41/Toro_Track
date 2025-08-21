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
