// Contains the inline styles and sx overrides for the report & Export screen

export const fullScreenContainerStyles = {
  display: 'flex',
  minHeight: '100vh',
};

export const drawerStyles = {
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    borderRight: '1px solid #fefaf0',
    backgroundColor: '#fefaf0',
  },
};

export const drawerHeaderStyles = {
  padding: 2,
  textAlign: 'center',
  backgroundColor: '#fefaf0',
  fontFamily: 'Disek, monospace', // CORRECTED: fontfamily -> fontFamily
};

export const listItemButtonStyles = (name, currentPath) => {
  const isSelected = name === 'Reporting & Export';
  const baseStyles = {
    '&.Mui-selected': {
      backgroundColor: '#fefaf0',
      color: '#525252',
      '&:hover': {
        backgroundColor: '#606c38',
      },
    },
    '&.Mui-selected .MuiListItemText-primary': {
      fontWeight: 'bold',
    },
  };
  return baseStyles;
};

export const mainContentBoxStyles = {
  flexGrow: 1,
  p: 3,
  backgroundColor: '#fefaf0',
  color: '#525252',
  marginLeft: 30
};

export const headerBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 4,
};

export const pageTitleStyles = {
  fontFamily: 'Disek, monospace', // CORRECTED: fontfamily -> fontFamily
  color: '#525252',
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
    height: '40px', 
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
  alignItems: 'center',
  color: '#525252',
  gap: 1,
};

export const userInfoStyles = {
  textAlign: 'right',
  mr: 1,
};

export const auditorTextStyles = {
  color: '#525252',
};

export const reportingExportContainerStyles = {
  textAlign: 'center',
  p: 4,
  backgroundColor: '#fefaf0',
  borderRadius: 2,
  border: '2px solid #525252',
  boxShadow: 3,
};

export const reportingExportTitle = {
  fontFamily: 'Disek, monospace', // CORRECTED: fontfamily -> fontFamily
  mb: 1,
};

export const reportingExportSubtitle = {
  mb: 4,
  color: 'text.secondary',
};

export const reportingExportSection = {
  backgroundColor: '#fefaf0',
  p: 3,
  borderRadius: 2,
  mb: 4,
};

export const reportingExportSectionTitle = {
  fontWeight: 'bold',
  mb: 1,
  color: '#525252',
  fontFamily: 'Disek, monospace', // CORRECTED: fontfamily -> fontFamily
};

export const reportingExportSectionDescription = {
  mb: 3,
  color: '#525252',
};

export const reportingExportButton = {
  contained: {
    backgroundColor: '#283618',
    color: 'white',
    padding: '12px 24px',
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
  },
};

export const reportingExportFormControl = {
  minWidth: 120,
};

export const reportingExportMenuItem = {};

export const reportingExportSelect = {};