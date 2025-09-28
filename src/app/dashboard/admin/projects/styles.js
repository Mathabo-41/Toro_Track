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
    fontWeight: 500
  },
  titleIcon: {
    mr: 1,
    verticalAlign: 'middle',
    color: '#f3722c'
  },
  searchStack: {
    width: { xs: '100%', sm: 'auto' }
  },
  searchField: {
    flexGrow: { xs: 1, sm: 0 },
    '& .MuiInputBase-root': {
      color: '#525252',
      backgroundColor: '#fefae0',
      '& fieldset': { borderColor: '#525252' },
    }
  },
  searchIcon: {
    color: '#525252'
  },
  newProjectButton: {
    backgroundColor: '#283618',
    color: '#fefae0',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#606c38',
      borderColor: '#fefae0'
    },
    whiteSpace: 'nowrap'
  },
  projectsCard: {
    backgroundColor: '#fefae0',
    mb: 3,
    border: '1px solid #525252'
  },
  tableContainer: {
    backgroundColor: 'transparent',
    border: '2px solid #525252'
  },
  tableHeaderCell: {
    color: '#525252',
    fontWeight: 'bold'
  },
  tableRowHover: {
    '&:hover': { backgroundColor: '#d6d6d6' }
  },
  tableCell: {
    color: '#525252'
  },
  chip: (status) => {
    const statusStyles = {
        'completed': {
            backgroundColor: 'rgba(46, 125, 50, 0.2)',
            color: '#81c784',
            border: '1px solid #2e7d32'
        },
        'active': {
            backgroundColor: 'rgba(2, 136, 209, 0.2)',
            color: '#4fc3f7',
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
            color: '#bdbdbd',
            border: '1px solid #616161'
        }
    };
    return { ...statusStyles[status], fontWeight: 'bold' };
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
    border: '1px solid #444'
  },
  actionIconButton: {
    color: '#525252'
  },
  createDialogPaper: {
    backgroundColor: '#fefae0',
    color: '#283618',
    border: '2px solid #283618'
  },
  createDialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #6b705c',
    backgroundColor: '#fefae0',
    color: '#283618'
  },
  dialogContent: {
    py: 3,
    px: 3,
    overflowY: 'auto', // This is the corrected line
  },
  dialogTextField: {
    '& .MuiInputBase-input': { color: '#283618' },
    '& .MuiInputLabel-root': { color: '#6b705c' },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#6b705c' },
        '&:hover fieldset': { borderColor: '#283618' },
        '&.Mui-focused fieldset': { borderColor: '#283618' },
    }
  },
  dialogInputLabel: {
    color: '#6b705c',
    '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
        backgroundColor: '#fefae0',
        padding: '0 4px',
        borderRadius: '4px'
    }
  },
  dialogSelect: {
    color: '#283618'
  },
  dialogActions: {
    borderTop: '1px solid #6b705c',
    px: 3,
    py: 2,
    backgroundColor: '#fefae0'
  },
  dialogCancelButton: {
    color: '#6b705c',
    '&:hover': { backgroundColor: '#6b705c', color: '#fefae0' }
  },
  dialogCreateButton: {
    backgroundColor: '#283618',
    color: '#fefae0',
    '&:hover': { backgroundColor: '#606c38' },
    '&:disabled': { backgroundColor: '#e0e0e0', color: '#a0a0a0' }
  },
  actionMenu: {
    backgroundColor: '#fefae0',
    color: '#283618',
    border: '2px solid #283618',
    minWidth: '200px'
  },
  menuItem: {
    '&:hover': { backgroundColor: '#606c38', color: '#fefae0' }
  },
  menuItemIcon: (color) => ({
    mr: 1,
    color: color
  })
};