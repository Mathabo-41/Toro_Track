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
  chip: (status) => ({
    backgroundColor:
      status === 'completed'
        ? 'rgba(46, 125, 50, 0.2)'
        : status === 'active'
        ? 'rgba(2, 136, 209, 0.2)'
        : 'rgba(97, 97, 97, 0.2)',
    color:
      status === 'completed'
        ? '#81c784'
        : status === 'active'
        ? '#4fc3f7'
        : '#bdbdbd',
    border:
      status === 'completed'
        ? '1px solid #2e7d32'
        : status === 'active'
        ? '1px solid #0288d1'
        : '1px solid #616161',
    fontWeight: 'bold'
  }),
  statusChip: (status) => ({
    backgroundColor:
      status === 'active'
        ? 'rgba(2, 136, 209, 0.2)'
        : status === 'completed'
        ? 'rgba(46, 125, 50, 0.2)'
        : 'rgba(244, 193, 15, 0.1)',
    color:
      status === 'active'
        ? '#4fc3f7'
        : status === 'completed'
        ? '#81c784'
        : '#f3722c',
    border:
      status === 'active'
        ? '1px solid #0288d1'
        : status === 'completed'
        ? '1px solid #2e7d32'
        : '1px solid #f3722c',
    mr: 1,
    whiteSpace: 'nowrap'
  }),
  progressIcon: (progress) => ({
    color: progress > 50 ? 'warning.main' : 'error.main'
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
  statsCard: {
    backgroundColor: '#fefae0',
    border: '1px solid #525252',
    height: '100%'
  },
  statsCardIcon: (color) => ({
    bgcolor: color === 'blue' ? 'rgba(2, 136, 209, 0.1)' :
      color === 'green' ? 'rgba(46, 125, 50, 0.1)' :
      'rgba(244, 193, 15, 0.1)',
    width: 56,
    height: 56,
    border: color === 'blue' ? '1px solid #0288d1' :
      color === 'green' ? '1px solid #2e7d32' :
      '1px solid #f3722c'
  }),
  statsTypography: (color) => ({
    color: color,
    fontWeight: 500
  }),
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
    backgroundColor: '#fefae0'
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