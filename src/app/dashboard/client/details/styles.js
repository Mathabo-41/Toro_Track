// Contains the inline styles and sx overrides for the project details screen

import { alpha } from '@mui/material';

// --- Main Content Styles ---
export const mainContentStyles = {
  mainBox: {
    flexGrow: 1,
    p: 3,
    backgroundColor: '#fefaf0',
    color: '#525252',
    marginLeft: 30
  },
};

// --- Header Styles ---
export const headerStyles = {
  headerBox: {
    mb: 4,
  },
  headerTitle: {
    color: '#525252',
    fontWeight: 500,
  },
  projectIcon: {
    mr: 1,
    verticalAlign: 'middle',
    color: '#f3722c', // Orange accent
  },
  chip: (status) => ({
    backgroundColor: status === 'active' ? alpha('#0288d1', 0.2) : alpha('#2e7d32', 0.2),
    color: status === 'active' ? '#4fc3f7' : '#81c784',
    border: status === 'active' ? '1px solid #0288d1' : '1px solid #2e7d32',
    fontWeight: 'bold',
  }),
  headerSubtext: {
    color: '#525252',
    mt: 1,
  },
};

// --- Progress Card Styles ---
export const progressCardStyles = {
  card: {
    backgroundColor: '#fefae0',
    mb: 3,
    border: '1px solid #222',
  },
  title: {
    color: '#525252',
    mb: 2,
    fontWeight: 500,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: (progress) => ({
    width: `${progress}%`,
    height: '100%',
    backgroundColor: '#f3722c', // Orange progress bar
  }),
  progressText: {
    color: '#525252',
    mt: 1,
  },
  deadlineBox: {
    backgroundColor: '#e0e0e0',
    p: 2,
    borderRadius: 1,
    border: '1px solid #999',
    minWidth: 120,
  },
  deadlineLabel: {
    color: '#525252',
  },
  deadlineValue: {
    color: '#283618',
  },
};

// --- Tabs Styles ---
export const tabsStyles = {
  tabs: {
    '& .MuiTabs-indicator': {
      backgroundColor: '#f3722c', // Orange indicator
    },
    mb: 3,
  },
  tab: {
    color: '#283618',
  },
};

// --- Card Content Styles ---
export const contentCardStyles = {
  card: {
    backgroundColor: '#fefae0',
    border: '1px solid #222',
    height: '100%',
  },
  title: {
    color: '#525252',
    mb: 2,
    fontWeight: 500,
  },
  textLabel: {
    color: '#525252',
  },
  textValue: {
    color: '#283618',
  },
};

// --- Milestones Styles ---
export const milestoneStyles = {
  tableContainer: {
    backgroundColor: 'transparent',
    border: '2px solid #525252',
  },
  tableHeaderCell: {
    color: '#283618',
    fontWeight: 'bold',
  },
  tableCell: {
    color: '#283618',
  },
  chip: (status) => ({
    backgroundColor: status === 'completed' ? alpha('#2e7d32', 0.2) : status === 'in-progress' ? alpha('#ff9800', 0.2) : alpha('#616161', 0.2),
    color: status === 'completed' ? '#81c784' : status === 'in-progress' ? '#ffb74d' : '#bdbdbd',
    border: status === 'completed' ? '1px solid #2e7d32' : status === 'in-progress' ? '1px solid #ff9800' : '1px solid #616161',
  }),
};

// --- Team Styles ---
export const teamStyles = {
  memberCard: {
    backgroundColor: '#ccd5ae',
    border: '2px solid #606c38',
  },
  memberName: {
    color: '#283618',
  },
  memberRole: {
    color: '#525252',
  },
};

// --- Files Styles ---
export const filesStyles = {
  fileIcon: {
    color: '#f3722c',
  },
  iconButton: {
    color: '#f3722c',
  },
};

// --- Discussion Styles ---
export const discussionStyles = {
  list: {
    mb: 3,
    maxHeight: 400,
    overflow: 'auto',
  },
  commentUser: {
    color: '#283618',
    fontWeight: 500,
  },
  commentText: {
    color: '#525252',
    mt: 0.5,
  },
  commentTime: {
    color: alpha('#283618', 0.5),
    fontSize: '0.75rem',
    mt: 0.5,
  },
  divider: {
    backgroundColor: '#6b705c',
  },
  textField: {
    '& .MuiInputBase-input': {
      color: '#283618',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#6b705c',
      },
    },
  },
  submitButton: {
    backgroundColor: '#f3722c',
    color: '#fefae0',
    '&:hover': {
      backgroundColor: '#e65c19',
    },
  },
};