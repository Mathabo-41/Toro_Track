// Contains the inline styles and sx overrides for the settings screen

export const fullScreenContainerStyles = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f5f7fa',
};

export const drawerStyles = {
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
};

export const drawerHeaderStyles = {
  p: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '2px solid #525252',
};

export const mainContentBoxStyles = {
  flexGrow: 1,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
};

export const headerBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 4,
  pb: 2,
  borderBottom: '1px solid #ddd',
};

export const pageTitleStyles = {
  fontFamily: 'Disek, monospace', // CORRECTED: fontfamily -> fontFamily
  color: '#525252',
};

// NEW: Style for section headers for consistency
export const sectionTitleStyles = {
    fontFamily: 'Disek, monospace',
    color: '#283618',
    fontWeight: 'bold',
};

export const headerRightSectionStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

export const searchFieldStyles = {
  width: '300px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '5px',
    backgroundColor: '#fefaf0',
    fontSize: '0.9rem',
    height: '40px', // Adjust this value to your desired height
    '& fieldset': {
      borderColor: '#525252',
    },
    '&:hover fieldset': {
      borderColor: '#525252',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#283618',
      borderWidth: '2px',
    },
  },
};

export const userProfileStyles = {
  display: 'flex',
  color: '#525252',
  alignItems: 'center',
  gap: 1,
};

export const userInfoStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
};

export const auditorTextStyles = {
  color: '#000',
};

export const saveButton = {
    backgroundColor: '#283618',
    color: 'white',
    padding: '8px 24px',
    borderRadius: '4px',
    border: '2px solid #606c38',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#606c38',
      borderColor: '#283618',
    },
};

export const settingsContainerStyles = {
  p: 4,
  color:'#525252',
  backgroundColor: '#fefaf0',
  borderRadius: 2,
  border: '2px solid #525252',
  boxShadow: 3,
};