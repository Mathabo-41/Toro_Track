// Contains the inline styles and sx overrides for the permissions screen

export const styles = {
  // Main container for the entire page
  mainContainer: {
    display: 'flex',
    minHeight: '100vh',
    minWidth: '90vw',
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
      borderRight: '1px solid #222',
      color: '#fefae0' 
    }
  },
  
  // Styles for the sidebar header
  sidebarHeader: {
    p: 2,
    borderBottom: '2px solid #6b705c'
  },
  
  // Styles for the sidebar list item button
  sidebarListItemButton: (itemName) => ({
    color: '#fefae0',
    backgroundColor: itemName === 'Permissions' ? '#6b705c' : 'transparent',
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
  
  // Styles for the main page title
  pageTitle: {
    color: '#525252',
    fontWeight: 500
  },
  
  // Styles for the header icon
  headerIcon: {
    mr: 1,
    verticalAlign: 'middle',
    color: '#f3722c'
  },
  
  // Styles for the page subtitle
  pageSubtitle: {
    color: '#525252' 
  },
  
  // Styles for the permissions card
  permissionsCard: {
    backgroundColor: '#fefae0',
    mb: 3,
    border: '1px solid #525252'
  },
  
  // Styles for the permissions card header
  permissionsCardHeader: {
    color: '#525252',
    mb: 2,
    fontWeight: 500
  },
  
  // Styles for the table container
  tableContainer: {
    backgroundColor: 'transparent',
    border: '2px solid #525252' 
  },
  
  // Styles for the table head
  tableHead: {
    backgroundColor: '#283618' 
  },
  
  // Styles for table header cells
  tableHeaderCell: {
    color: '#fefae0',
    fontWeight: 'bold'
  },
  
  // Styles for table rows
  tableRow: (isSelected) => ({
    '&:hover': { backgroundColor: '#e0e0d1' },
    cursor: 'pointer',
    backgroundColor: isSelected ? '#e0e0d1' : 'transparent'
  }),
  
  // Styles for table cells
  tableCell: {
    color: '#283618' 
  },
  
  // Styles for permission level select dropdown
  selectInput: (color) => ({
    color: color,
    backgroundColor: '#fefae0',
    border: '1px solid #525252',
    '& .MuiSvgIcon-root': {
      color: '#283618'
    }
  }),
  
  // Styles for menu items within the select dropdown
  selectMenuItem: (level) => ({
    color: level.color,
    backgroundColor: '#fefae0',
    '&:hover': {
      backgroundColor: '#6b705c',
      color: '#fefae0'
    }
  }),
  
  // Styles for the selected role summary card
  summaryCard: {
    backgroundColor: '#fefae0',
    mb: 3,
    border: '1px solid #525252', 
    height: '100%'
  },
  
  // Styles for the summary card header
  summaryCardHeader: {
    color: '#525252',
    mb: 2,
    fontWeight: 500
  },
  
  // Styles for summary card section titles
  summaryCardTitle: {
    color: '#525252',
    mb: 1,
    fontWeight: 500
  },
  
  // Styles for the permission icon avatar
  permissionIconAvatar: (color) => ({
    backgroundColor: `${color}20`,
    color: color,
    width: 32,
    height: 32
  }),
  
  // Styles for the permission level text
  permissionText: (color) => ({
    color: color,
    fontWeight: 'bold'
  }),
  
  // Styles for the save button container
  saveButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  
  // Styles for the save button
  saveButton: {
    backgroundColor: '#283618',
    color: '#fefae0',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#606c38'
    }
  }
};