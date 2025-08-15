import { colors } from '@mui/material'

// Container for <Box sx={mainBox}>
export const mainBox = {
  display: 'flex',
  height: '100%',
  backgroundColor: colors.grey[50]
}

// Drawer paper override
export const drawerPaper = {
  boxSizing: 'border-box',
  width: 240
}

// Drawer header
export const drawerHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 64,
  backgroundColor: colors.primary.main,
  color: colors.common.white
}

// Main content wrapper
export const mainContentBox = {
  flexGrow: 1,
  p: 3
}

// Header above project info
export const projectHeader = {
  mb: 3
}

// Project title and icon
export const projectTitle = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600
}

export const projectIcon = {
  mr: 1
}

// Status chip style
export const statusChip = (status) => ({
  backgroundColor:
    status === 'active' ? colors.success.main : colors.grey[600],
  color: colors.common.white
})

// Description under title
export const projectDescription = {
  mt: 1,
  mb: 3
}

// Progress card
export const progressCard = {
  mb: 3
}

export const progressCardContent = {
  mb: 2
}

// Progress bar container
export const progressBarContainer = {
  backgroundColor: colors.grey[300],
  borderRadius: 4,
  height: 8,
  width: '100%',
  mb: 1
}

// Colored portion of progress bar
export const progressBar = (value) => ({
  width: `${value}%`,
  height: '100%',
  backgroundColor: colors.primary.main,
  borderRadius: 4
})

// Deadline label
export const deadlineBox = {
  textAlign: 'center'
}

// Tabs wrapper
export const tabs = {
  borderBottom: `1px solid ${colors.grey[300]}`,
  mb: 3
}

// Individual Tab
export const tab = {
  textTransform: 'none',
  minWidth: 0
}

// Box around each tab’s content
export const tabContentBox = {
  width: '100%'
}

// Generic info card
export const infoCard = {
  mb: 3
}

export const infoCardContent = {
  mb: 2
}

// Label inside info card
export const infoLabel = {
  fontWeight: 500
}

// Value inside info card
export const infoValue = {
  mb: 2
}

// Recent activity list item
export const recentActivityItem = {
  pb: 1
}

// Milestones table container
export const milestonesTableContainer = {
  mb: 3
}

// Table cell headers
export const tableCellHeader = {
  fontWeight: 600
}

export const tableCell = {}

// Milestone status chips
export const statusChipCompleted = {
  backgroundColor: colors.success.main,
  color: colors.common.white
}

export const statusChipInProgress = {
  backgroundColor: colors.warning.main,
  color: colors.common.white
}

export const statusChipPending = {
  backgroundColor: colors.grey[500],
  color: colors.common.white
}

// Team member card
export const teamCard = {
  mb: 2
}

export const memberRole = {
  color: colors.text.secondary
}

// Files table container
export const filesTableContainer = {
  mb: 3
}

// File name stack + icon
export const fileNameStack = {
  display: 'flex',
  alignItems: 'center'
}

export const fileNameIcon = {
  mr: 1
}

// Discussion list + divider
export const discussionList = {
  maxHeight: 400,
  overflowY: 'auto'
}

export const discussionDivider = {
  my: 1
}

// Comment user & text
export const commentUser = {
  fontWeight: 500
}

export const commentText = {
  display: 'block'
}

export const commentTime = {
  display: 'block',
  fontSize: '0.75rem',
  color: colors.text.secondary
}

// Comment form
export const commentForm = {
  mt: 2
}

export const commentInput = {
  flexGrow: 1
}

export const postButton = {
  ml: 1
}
