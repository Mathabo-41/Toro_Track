// Contains the inline styles and sx overrides for the client profile screen

export const searchField = {
  backgroundColor: '#fefae0',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#525252',
    },
    '&:hover fieldset': {
      borderColor: '#b71c1c',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#b71c1c',
    },
  },
};

export const addClientButton = {
  backgroundColor: '#283618',
  color: '#fefae0',
  borderColor: '#6b705c',
  marginLeft: 2,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#606c38',
    borderColor: '#fefae0'
  },
  whiteSpace: 'nowrap'
};

export const clientCard = {
  backgroundColor: '#fefae0',
  mb: 3,
  border: '1px solid #222',
};

export const tableContainer = {
  backgroundColor: 'transparent',
  border: '2px solid #525252',
};

export const tableHeader = {
  backgroundColor: '#525252',
};

export const tableHeaderCell = {
  color: '#525252',
  fontWeight: 'bold',
  backgroundColor: '#fefae0',
};

export const tableRow = {
  '&:hover': {
    backgroundColor: '#e9e9e9',
  }
};

export const clientTableCell = {
  color: '#283618',
};

export const clientLogoAvatar = {
  width: 40,
  height: 40,
  bgcolor: '#333',
  border: '1px solid #444',
};

export const contactIcon = {
  color: '#f3722c',
};

export const projectsIcon = {
  color: '#f3722c',
};

export const statusChip = (status) => {
  const styles = {
    premium: {
      backgroundColor: 'rgba(46, 125, 50, 0.2)',
      color: '#81c784',
      border: '1px solid #2e7d32',
    },
    active: {
      backgroundColor: 'rgba(2, 136, 209, 0.2)',
      color: '#4fc3f7',
      border: '1px solid #0288d1',
    },
    inactive: {
      backgroundColor: 'rgba(97, 97, 97, 0.2)',
      color: '#bdbdbd',
      border: '1px solid #616161',
    },
  };
  return {
    ...styles[status],
    fontWeight: 'bold',
    pl: 1
  };
};

export const actionButton = {
  color: '#525252',
};

export const statsCard = {
  backgroundColor: '#fefae0',
  border: '1px solid #222',
  height: '100%',
};

export const statsCardContent = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const statsCardValue = (color) => ({
  color: color === 'primary' ? '#f3722c' : (color === 'info' ? '#4fc3f7' : '#81c784'),
  fontWeight: 500
});

export const statsAvatar = (bgColor, iconColor) => ({
  bgcolor: iconColor === 'primary' ? 'rgba(244, 193, 15, 0.1)' : (iconColor === 'info' ? 'rgba(2, 136, 209, 0.1)' : 'rgba(46, 125, 50, 0.1)'),
  width: 56,
  height: 56,
  border: iconColor === 'primary' ? '1px solid #f3722c' : (iconColor === 'info' ? '1px solid #0288d1' : '1px solid #2e7d32'),
});

export const menuPaper = {
  backgroundColor: '#f1faee',
  color: '#283618',
  border: '2px solid #283618',
  minWidth: '200px',
};

export const menuItem = {
  '&:hover': {
    backgroundColor: '#606c38',
  },
};

export const menuDivider = {
  backgroundColor: '#333',
};