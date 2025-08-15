import { colors } from '@mui/material'

export const fullScreenContainerStyles = {
  display: 'flex',
  height: '100vh',
  backgroundColor: colors.grey[100]
}

export const drawerStyles = {
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box'
  }
}

export const drawerHeaderStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 64,
  backgroundColor: colors.indigo[500],
  color: colors.common.white
}

export const listItemButtonStyles = (itemPath, currentPath) => ({
  justifyContent: 'flex-start',
  px: 2,
  ...(itemPath === currentPath && {
    backgroundColor: colors.indigo[100],
    fontWeight: 'bold'
  })
})

export const mainContentBoxStyles = {
  flexGrow: 1,
  marginLeft: 240,
  overflow: 'auto',
  p: 3
}

export const headerBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 3
}

export const pageTitleStyles = {
  fontWeight: 600
}

export const headerRightSectionStyles = {
  display: 'flex',
  alignItems: 'center'
}

export const searchFieldStyles = {
  width: 300,
  mr: 2
}

export const userProfileStyles = {
  display: 'flex',
  alignItems: 'center'
}

export const userInfoStyles = {
  textAlign: 'right',
  mr: 1
}

export const auditorTextStyles = {
  color: colors.grey[600]
}
