// Contains the inline styles and sx overrides for the projects screen

export const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    minWidth: '90vw',
    backgroundColor: '#fefae0'
  },
  sidebar: {
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
      backgroundColor: '#283618',
      borderRight: '2px solid #6b705c',
      color: '#fefae0'
    }
  },
  sidebarHeader: {
    p: 2,
    borderBottom: '2px solid #6b705c'
  },
  sidebarListItemButton: (name) => ({
    color: '#fefae0',
    backgroundColor: name === 'Projects' ? '#6b705c' : 'transparent',
    '&:hover': { backgroundColor: '#6b705c' }
  }),
  logoutButton: {
    padding: '0.75rem',
    background: 'transparent',
    border: '1px solid #fefae0',
    borderRadius: '8px',
    color: '#fefae0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    '&:hover': {
      background: '#6b705c'
    }
  },
  mainContent: {
    flexGrow: 1,
    p: 3,
    backgroundColor: '#fefae0'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 4,
    flexWrap: 'wrap',
    gap: 2
  },
  title: {
    color: '#525252',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center'
  },
  titleIcon: {
    mr: 2,
    color: '#f3722c'
  },
  searchStack: {
    width: { xs: '100%', sm: 'auto' },
    alignItems: 'center'
  },
  searchField: {
    flexGrow: { xs: 1, sm: 0 },
    '& .MuiInputBase-root': {
      color: '#525252',
      backgroundColor: '#faedcd',
      '& fieldset': { 
        borderColor: '#6b705c',
        borderRadius: 1
      },
      '&:hover fieldset': {
        borderColor: '#f3722c'
      }
    }
  },
  searchIcon: {
    color: '#6b705c'
  },
  newProjectButton: {
    backgroundColor: '#283618',
    color: '#fefae0',
    fontWeight: 500,
    borderColor: '#283618',
    '&:hover': {
      backgroundColor: '#606c38',
      borderColor: '#606c38'
    },
    whiteSpace: 'nowrap'
  },
  projectsCard: {
    backgroundColor: '#fefae0',
    mb: 3,
    border: '1px solid #6b705c',
    borderRadius: 2
  },
  tableContainer: {
    backgroundColor: 'transparent',
    border: '1px solid #e0e0e0',
    borderRadius: 1
  },
  tableHeaderCell: {
    color: '#283618',
    fontWeight: 'bold',
    backgroundColor: '#faedcd',
    borderBottom: '2px solid #6b705c'
  },
  tableRowHover: {
    '&:hover': { 
      backgroundColor: '#faedcd',
      transition: 'background-color 0.2s ease'
    }
  },
  tableCell: {
    color: '#525252',
    borderBottom: '1px solid #e0e0e0'
  },
  chip: (status) => {
    const statusStyles = {
      'completed': {
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        color: '#2e7d32',
        border: '1px solid #2e7d32'
      },
      'active': {
        backgroundColor: 'rgba(2, 136, 209, 0.2)',
        color: '#0288d1',
        border: '1px solid #0288d1'
      },
      'pending': {
        backgroundColor: 'rgba(244, 193, 15, 0.2)',
        color: '#f3722c',
        border: '1px solid #f3722c'
      },
      'inprogress': {
        backgroundColor: 'rgba(100, 100, 255, 0.2)',
        color: '#6464ff',
        border: '1px solid #6464ff'
      },
      'on_hold': {
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
        color: '#ff5722',
        border: '1px solid #d84315'
      },
      'cancelled': {
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        color: '#f44336',
        border: '1px solid #c62828'
      },
      'not started': {
        backgroundColor: 'rgba(97, 97, 97, 0.2)',
        color: '#616161',
        border: '1px solid #616161'
      }
    };
    return { 
      ...statusStyles[status] || statusStyles['not started'], 
      fontWeight: 'bold',
      borderRadius: '16px'
    };
  },
  statusChip: (status) => ({
    ...styles.chip(status),
    mr: 1,
    whiteSpace: 'nowrap'
  }),
  teamAvatar: {
    width: 32,
    height: 32,
    fontSize: '0.8rem',
    bgcolor: '#6b705c',
    color: '#fefae0',
    border: '1px solid #444',
    cursor: 'pointer'
  },
  actionIconButton: {
    color: '#525252',
    '&:hover': {
      backgroundColor: 'rgba(107, 112, 92, 0.1)'
    }
  },

  // Statistics Cards
  statsCard: {
    borderRadius: 2,
    background: 'linear-gradient(145deg, #fefae0 0%, #faedcd 100%)',
    border: '1px solid #6b705c',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
    }
  },
  
  statsTypography: (color) => ({
    color: color,
    fontWeight: 'bold',
    fontSize: '2rem'
  }),
  
  statsCardIcon: (color) => ({
    backgroundColor: color,
    width: 56,
    height: 56,
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  }),

  // Dialog Styles
  createDialogPaper: {
    borderRadius: 2,
    background: 'linear-gradient(145deg, #fefae0 0%, #faedcd 100%)',
    border: '2px solid #6b705c'
  },
  createDialogTitle: {
    background: 'linear-gradient(45deg, #6b705c 30%, #8a9175 90%)',
    color: '#fefae0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: 2,
    fontWeight: 'bold',
    borderBottom: '2px solid #6b705c'
  },
  dialogContent: {
    py: 3,
    px: 3
  },
  dialogTextField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#6b705c',
      },
      '&:hover fieldset': {
        borderColor: '#8a9175',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#f3722c',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#525252',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#f3722c',
    },
  },
  dialogLabel: {
    color: '#525252',
    '&.Mui-focused': {
      color: '#f3722c',
    },
  },
  dialogSelect: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6b705c',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#8a9175',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#f3722c',
    },
    '& .MuiSelect-select': {
      color: '#283618'
    }
  },
  dialogMenuItem: {
    '&:hover': {
      backgroundColor: '#faedcd',
    },
    '&.Mui-selected': {
      backgroundColor: '#f3722c',
      color: '#fefae0',
      '&:hover': {
        backgroundColor: '#e55a1e',
      },
    },
  },
  dialogActions: {
    borderTop: '1px solid #6b705c',
    px: 3,
    py: 2,
    backgroundColor: '#fefae0',
    gap: 1
  },
  dialogCancelButton: {
    color: '#6b705c',
    borderColor: '#6b705c',
    '&:hover': {
      backgroundColor: '#6b705c',
      color: '#fefae0',
      borderColor: '#6b705c',
    },
  },
  dialogCreateButton: {
    background: 'linear-gradient(45deg, #f3722c 30%, #e55a1e 90%)',
    color: '#fefae0',
    fontWeight: 'bold',
    '&:hover': {
      background: 'linear-gradient(45deg, #e55a1e 30%, #d14916 90%)',
    },
    '&:disabled': {
      background: '#e0e0e0',
      color: '#a0a0a0'
    }
  },
  dialogConfirmButton: {
    background: 'linear-gradient(45deg, #283618 30%, #606c38 90%)',
    color: '#fefae0',
    fontWeight: 'bold',
    '&:hover': {
      background: 'linear-gradient(45deg, #606c38 30%, #4a5530 90%)',
    },
  },

  // Action Menu
  actionMenu: {
    backgroundColor: '#fefae0',
    color: '#283618',
    border: '2px solid #6b705c',
    minWidth: '200px',
    borderRadius: 2
  },
  menuItem: {
    '&:hover': { 
      backgroundColor: '#faedcd'
    }
  },
  menuItemIcon: (color) => ({
    mr: 1,
    color: color
  }),

  // Popover Styles
  popoverPaper: {
    p: 2,
    minWidth: 200,
    backgroundColor: '#fefae0',
    color: '#283618',
    borderRadius: 2,
    border: '1px solid #6b705c'
  }
};