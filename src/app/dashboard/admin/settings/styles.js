// Contains the inline styles and sx overrides for the settings screen

export const styles = {
  // Main container for the entire page
  mainContainer: {
    display: 'flex',
    minHeight: '100vh',
    minWidth: '89vw',
    backgroundColor: '#fefae0', 
    color: '#525252' 
  },
  
  // Styles for the persistent sidebar drawer
  sidebarDrawer: {
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
      backgroundColor: '#283618', 
      borderRight: '1px solid #6b705c',
      color: '#fefae0' 
    }
  },
  
  // Styles for the sidebar header
  sidebarHeader: {
    p: 2,
    borderBottom: '1px solid #6b705c'
  },
  
  // Styles for the sidebar list item button
  sidebarListItemButton: (itemName) => ({
    color: '#fefae0',
    backgroundColor: itemName === 'Settings' ? '#6b705c' : 'transparent',
    '&:hover': {
      backgroundColor: '#6b705c' 
    }
  }),
  
  // Styles for the main content area
  mainContent: {
    flexGrow: 1,
    p: 3,
    backgroundColor: '#fefae0'
  },
  
  // Styles for the page header
  pageHeader: {
    mb: 4
  },
  
  // Styles for the page title
  pageTitle: {
    color: '#525252',
    fontWeight: 500
  },

  // Styles for the page subtitle
  pageSubtitle: {
    color: '#525252',
    mb: 3,
  },
  
  // Styles for the header icon
  headerIcon: {
    mr: 1,
    verticalAlign: 'middle',
    color: '#f3722c' 
  },
  
  // Styles for settings cards
  settingsCard: {
    backgroundColor: '#fefae0',
    height: '100%',
    border: '1px solid #525252',
    '&:hover': {
      borderColor: '#f3722c',
      boxShadow: '0 0 15px rgba(243, 114, 44, 0.3)'
    }
  },
  
  // Styles for settings card avatar
  settingsAvatar: {
    bgcolor: '#e0e0d1', 
    width: 48,
    height: 48,
    border: '1px solid #6b705c',
    color: '#525252'
  },
  
  // Styles for settings card title
  settingsCardTitle: {
    color: '#283618',
    fontWeight: 500
  },
  
  // Styles for status chips
  statusChip: (status) => ({
    backgroundColor: 'transparent',
    color: status === 'active' ? '#4caf50' :
      status === 'pending' ? '#ff9800' : '#f44336',
    border: status === 'active' ? '1px solid #4caf50' :
      status === 'pending' ? '1px solid #ff9800' : '1px solid #f44336',
    textTransform: 'capitalize'
  }),
  
  // Styles for the configure button
  configureButton: {
    color: '#283618',
    borderColor: '#283618',
    '&:hover': {
      backgroundColor: '#e0e0d1',
      borderColor: '#283618'
    }
  },
  
  // Styles for the system maintenance card
  maintenanceCard: {
    backgroundColor: '#fefae0',
    border: '1px solid #525252'
  },
  
  // Styles for the system maintenance title
  maintenanceTitle: {
    color: '#525252',
    mb: 2,
    fontWeight: 500
  },
  
  // Styles for the backup button
  backupButton: {
    backgroundColor: '#283618',
    color: '#fefae0',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#606c38'
    }
  },
  
  // Styles for the clear cache button
  clearCacheButton: {
    color: '#283618',
    borderColor: '#283618',
    '&:hover': {
      backgroundColor: '#e0e0d1',
      borderColor: '#283618'
    }
  },
  
  // Styles for the dangerous zone card
  dangerousCard: {
    backgroundColor: '#fefae0',
    border: '1px solid #f44336'
  },
  
  // Styles for the dangerous zone title
  dangerousTitle: {
    color: '#f44336',
    mb: 2,
    fontWeight: 500
  },
  
  // Styles for the reset settings button
  resetButton: {
    color: '#f44336',
    borderColor: '#f44336',
    '&:hover': {
      backgroundColor: 'rgba(244, 67, 54, 0.15)',
      borderColor: '#ff5252'
    }
  },
  
  // Styles for the purge data button
  purgeButton: {
    backgroundColor: '#f44336',
    '&:hover': {
      backgroundColor: '#ff5252'
    }
  },

  // Permissions section styles
  permissionsCard: {
    mt: 2,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fefae0',
    border: '1px solid #525252',
  },

  permissionsCardHeader: {
    fontWeight: 'bold',
    mb: 2,
    color: '#283618',
  },

  tableContainer: {
    mt: 2,
    backgroundColor: '#fefae0',
  },

  tableHead: {
    backgroundColor: '#e9edc9',
  },

  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#283618',
    backgroundColor: '#e9edc9',
  },

  tableRow: (isSelected) => ({
    cursor: 'pointer',
    backgroundColor: isSelected ? '#e9f5db' : '#fefae0',
    '&:hover': {
      backgroundColor: '#f1f8e9',
    },
    '&:last-child td, &:last-child th': {
      borderBottom: 0,
    },
  }),

  tableCell: {
    borderBottom: '1px solid #ccd5ae',
  },

  selectInput: (color) => ({
    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: color,
    },
  }),

  selectMenuItem: (level) => ({
    '&:hover': {
      backgroundColor: `${level.color}15`, // 15 is for ~8% opacity
    },
    '&.Mui-selected': {
      backgroundColor: `${level.color}30`, // 30 is for ~18% opacity
      '&:hover': {
        backgroundColor: `${level.color}40`, // 40 is for ~25% opacity
      },
    },
  }),

  summaryCard: {
    mt: 3,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fefae0',
    border: '1px solid #525252',
  },

  summaryCardHeader: {
    fontWeight: 'bold',
    mb: 2,
    color: '#283618',
  },

  summaryCardTitle: {
    fontWeight: 'bold',
    mb: 1,
    color: '#283618',
  },

  permissionIconAvatar: (color) => ({
    width: 24,
    height: 24,
    backgroundColor: `${color}20`, // 20 is for ~12% opacity
    color: color,
    fontSize: '16px',
  }),

  permissionText: (color) => ({
    fontWeight: 'medium',
    color: color,
  }),

  saveButtonContainer: {
    mt: 3,
    display: 'flex',
    justifyContent: 'flex-end',
  },

  saveButton: {
    backgroundColor: '#283618',
    '&:hover': {
      backgroundColor: '#1b2712',
    },
    px: 4,
    py: 1,
    color: '#fefae0',
    fontWeight: 'bold',
  },
};