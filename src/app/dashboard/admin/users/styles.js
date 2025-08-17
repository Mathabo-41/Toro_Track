// Contains the inline styles and sx overrides for the team users screen

export const styles = {
  // Main container for the whole screen
  mainContainer: {
    display: 'flex',
    minHeight: '100vh',
    minWidth: '90vw',
    backgroundColor: '#fefae0',
  },
  
  // Styles for the persistent sidebar drawer
  sidebarDrawer: {
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
      backgroundColor: '#283618',
      borderRight: '1px solid #222',
      color: '#fefae0',
    },
  },
  
  // Styles for the sidebar header section
  sidebarHeader: {
    p: 2,
    borderBottom: '2px solid #6b705c',
  },
  
  // Styles for the sidebar menu list item button
  sidebarListItemButton: (itemName) => ({
    color: '#fefae0',
    backgroundColor: itemName === 'Teams & Users' ? '#6b705c' : 'transparent',
    '&:hover': {
      backgroundColor: '#6b705c',
    },
  }),
  
  // Styles for the main content area
  mainContent: {
    flexGrow: 1,
    p: 3,
    backgroundColor: '#fefae0',
  },
  
  // Styles for the page header section
  pageHeader: {
    mb: 4,
  },
  
  // Styles for the main page title
  pageTitle: {
    color: '#525252',
    fontWeight: 500,
  },
  
  // Styles for the header icon
  headerIcon: {
    mr: 1,
    verticalAlign: 'middle',
    color: '#f3722c',
  },
  
  // Styles for the page subtitle
  pageSubtitle: {
    color: '#525252',
  },
  
  // Styles for the user invitation card
  inviteCard: {
    backgroundColor: '#fefae0',
    border: '2px solid #525252',
  },
  
  // Styles for the invite card header
  inviteCardHeader: {
    color: '#525252',
    mb: 2,
    fontWeight: 500,
  },
  
  // Styles for the email input field
  emailInput: {
    '& fieldset': {
      borderColor: '#525252',
    },
  },
  
  // Styles for the email icon
  emailIcon: {
    color: '#525252',
  },
  
  // Styles for the invite button
  inviteButton: {
    backgroundColor: '#283618',
    color: '#fefae0',
    '&:hover': {
      backgroundColor: '#606c38',
    },
  },
  
  // Styles for the users table card
  usersCard: {
    backgroundColor: '#fefae0',
    border: '1px solid #525252',
  },
  
  // Styles for the users table header
  usersCardHeader: {
    color: '#525252',
    mb: 2,
    fontWeight: 500,
  },
  
  // Styles for the table container
  tableContainer: {
    backgroundColor: 'transparent',
    border: '2px solid #525252',
  },
  
  // Styles for the table header row
  tableHeaderRow: {
    backgroundColor: '#283618',
  },
  
  // Styles for the table header cells
  tableHeaderCell: {
    color: '#fefae0',
    fontWeight: 'bold',
  },
  
  // Styles for the table body rows
  tableBodyRow: {
    '&:hover': {
      backgroundColor: '#e0e0d1',
    },
  },
  
  // Styles for the table body cells
  tableBodyCell: {
    color: '#283618',
  },
  
  // Styles for the role/team select dropdowns
  selectInput: {
    color: '#283618',
    backgroundColor: '#fefae0',
    border: '1px solid #525252',
    '& .MuiSvgIcon-root': {
      color: '#283618',
    },
  },
  
  // Styles for the menu items in the select dropdowns
  selectMenuItem: {
    color: '#283618',
  },
  
  // Styles for the task chips
  taskChip: {
    color: '#fefae0',
    backgroundColor: '#6b705c',
    mb: 0.5,
    mr: 0.5,
  },
  
  // Styles for the task input field
  taskInput: {
    '& .MuiInputBase-input': { color: '#283618' },
    backgroundColor: '#fefae0',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#525252',
      },
    },
  },
  
  // Styles for the add task button
  addTaskButton: {
    textTransform: 'none',
    backgroundColor: '#283618',
    color: '#fefae0',
    '&:hover': {
      backgroundColor: '#606c38',
    },
  },
  
  // Styles for the action menu icon button
  menuIconButton: {
    color: '#283618',
  },
  
  // Styles for the action menu dropdown
  actionMenu: {
    backgroundColor: '#fefae0',
    color: '#283618',
    border: '2px solid #283618',
    minWidth: '200px',
  },
  
  // Styles for action menu items
  actionMenuItem: {
    '&:hover': {
      backgroundColor: '#606c38',
    },
  },
  
  // Styles for action menu icons
  actionMenuIcon: (color) => ({
    mr: 1,
    color: color,
  }),
};