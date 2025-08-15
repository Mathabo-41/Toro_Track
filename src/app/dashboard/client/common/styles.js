import { colors } from '@mui/material'

// Full-viewport container w/ sidebar + main
export const fullScreenContainerStyles = {
  display: 'flex',
  height: '100vh',
  backgroundColor: colors.grey[50]
}

// Drawer (sidebar) wrapper
export const drawerStyles = {
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box'
  }
}

// Header inside Drawer
export const drawerHeaderStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 64,
  backgroundColor: colors.primary.main,
  color: colors.common.white
}

// ListItemButton highlight logic
export const listItemButtonStyles = (itemPath, currentPath) => ({
  justifyContent: 'flex-start',
  px: 2,
  ...(itemPath === currentPath && {
    backgroundColor: colors.primary.light,
    fontWeight: 'bold'
  })
})

// Main content area to the right of sidebar
export const mainContentBoxStyles = {
  flexGrow: 1,
  marginLeft: 240,
  overflow: 'auto',
  p: 3
}

// Header bar above page content
export const headerBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 3
}

// Page title styling
export const pageTitleStyles = {
  fontWeight: 600
}

// Right-side header (search + profile)
export const headerRightSectionStyles = {
  display: 'flex',
  alignItems: 'center'
}

// Search input
export const searchFieldStyles = {
  width: 300,
  mr: 2
}

// User avatar + name
export const userProfileStyles = {
  display: 'flex',
  alignItems: 'center'
}

export const userInfoStyles = {
  textAlign: 'right',
  mr: 1
}

export const userTextStyles = {
  color: colors.text.secondary
}

// Header above Messages page
export const headerTitleStyles = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600
}

export const headerIconStyles = {
  mr: 1
}

export const headerSubtitleStyles = {
  color: colors.text.secondary
}

// Generic card wrapper
export const cardStyles = {
  mb: 3
}

// Shared Tabs
export const tabsStyles = {
  borderBottom: `1px solid ${colors.grey[300]}`, 
  mb: 3
}

export const tabStyles = {
  textTransform: 'none',
  minWidth: 0
}