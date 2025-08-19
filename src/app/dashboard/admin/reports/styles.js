// Contains the inline styles and sx overrides for the report screen

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
    backgroundColor: itemName === 'Performance Reports' ? '#6b705c' : 'transparent',
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
  
  // Styles for the key metric cards
  metricCard: {
    backgroundColor: '#fefae0',
    height: '100%',
    border: '1px solid #525252',
    '&:hover': {
      borderColor: '#f3722c' 
    }
  },
  
  // Styles for the metric value typography
  metricValue: {
    color: '#283618', 
    my: 1,
    fontWeight: 500
  },
  
  // Styles for trend icons
  trendIcon: (trend) => ({
    color: trend === 'up' ? '#4caf50' : '#f44336'
  }),
  
  // Styles for the metric avatar
  metricAvatar: {
    bgcolor: '#e0e0d1', 
    width: 56,
    height: 56,
    border: '1px solid #6b705c' 
  },
  
  // Styles for chart cards
  chartCard: {
    backgroundColor: '#fefae0',
    height: '100%',
    border: '1px solid #525252'
  },
  
  // Styles for chart titles
  chartTitle: {
    color: '#525252',
    mb: 2,
    fontWeight: 500
  },
  
  // Styles for the dummy chart box
  dummyChartBox: {
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#6b705c',
    border: '1px dashed #6b705c',
    borderRadius: '4px',
    backgroundColor: '#e0e0d1' 
  },
  
  // Styles for the recent activities card
  activityCard: {
    backgroundColor: '#fefae0',
    mb: 3,
    border: '1px solid #525252'
  },
  
  // Styles for the activity table container
  activityTableContainer: {
    backgroundColor: 'transparent',
    border: '1px solid #525252'
  },
  
  // Styles for the activity table head
  activityTableHead: {
    backgroundColor: '#283618'
  },
  
  // Styles for table header cells
  activityTableHeaderCell: {
    color: '#fefae0',
    fontWeight: 'bold'
  },
  
  // Styles for table rows on hover
  activityTableRow: {
    '&:hover': {
      backgroundColor: '#e0e0d1'
    }
  },
  
  // Styles for table cells
  activityTableCell: {
    color: '#283618'
  },
  
  // Styles for status chips
  statusChip: (status) => ({
    backgroundColor: status === 'completed' ? 'rgba(46, 125, 50, 0.2)' :
      status === 'pending' ? 'rgba(97, 97, 97, 0.2)' : 'rgba(2, 136, 209, 0.2)',
    color: status === 'completed' ? '#2e7d32' :
      status === 'pending' ? '#616161' : '#0288d1',
    border: status === 'completed' ? '1px solid #2e7d32' :
      status === 'pending' ? '1px solid #616161' : '1px solid #0288d1',
    textTransform: 'capitalize'
  }),
  
  // Styles for the data export card
  exportCard: {
    backgroundColor: '#fefae0',
    border: '1px solid #525252'
  },
  
  // Styles for export buttons
  exportButton: {
    color: '#283618',
    borderColor: '#283618',
    '&:hover': {
      backgroundColor: '#e0e0d1',
      borderColor: '#283618'
    }
  }
};
