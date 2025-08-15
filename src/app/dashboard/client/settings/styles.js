import { colors } from '@mui/material'

// Root container w/ sidebar + content
export const mainBox = {
  display: 'flex',
  height: '100%',
  backgroundColor: colors.grey[50]
}

// Sidebar overrides
export const drawerHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 64,
  backgroundColor: colors.primary.main,
  color: colors.common.white
}

export const listItemButton = {
  justifyContent: 'flex-start',
  px: 2
}

export const activeListItemButton = {
  backgroundColor: colors.primary.light,
  fontWeight: 'bold'
}

export const mainContentBox = {
  flexGrow: 1,
  p: 3
}

export const settingsCard = {
  mb: 3
}

// Profile tab
export const profileHeaderTitle = {
  fontWeight: 600
}

export const profileButtonsStack = {
  '& > button': { textTransform: 'none' }
}

export const saveButton = {
  backgroundColor: colors.success.main,
  color: colors.common.white,
  textTransform: 'none'
}

export const cancelButton = {
  textTransform: 'none'
}

export const editProfileButton = {
  textTransform: 'none'
}

export const profileAvatar = {
  width: 80,
  height: 80,
  mb: 1
}

export const changePhotoButton = {
  textTransform: 'none'
}

export const profileTextField = (enabled) => ({
  '& .MuiInputBase-root': {
    backgroundColor: enabled ? colors.common.white : colors.grey[200]
  }
})

// Security tab
export const securityTitle = {
  fontWeight: 600,
  mb: 2
}

export const securitySubtitle = {
  fontWeight: 500,
  mb: 1
}

export const passwordTextField = {
  mb: 2
}

export const updatePasswordButton = {
  mt: 2,
  textTransform: 'none'
}

export const securityPaper = {
  p: 2,
  mb: 2
}

export const securityBodyText = {
  color: colors.text.secondary,
  mt: 1
}

export const sessionPaper = {
  p: 2,
  mb: 2
}

export const sessionDeviceText = {
  fontWeight: 500
}

export const sessionTimeText = {
  fontSize: '0.75rem',
  color: colors.text.secondary,
  mb: 1
}

export const logoutDevicesButton = {
  textTransform: 'none'
}

// Notifications tab
export const notificationsTitle = {
  fontWeight: 600,
  mb: 2
}

export const notificationsPaper = {
  p: 2,
  mb: 3
}

export const notificationsSubtitle = {
  fontWeight: 500,
  mb: 1
}

export const notificationSwitch = {
  mr: 1
}

export const notificationLabel = {
  fontWeight: 500
}

export const savePreferencesButton = {
  mt: 2,
  textTransform: 'none'
}

// Preferences tab
export const preferencesTitle = {
  fontWeight: 600,
  mb: 2
}

export const preferencesPaper = {
  p: 2,
  mb: 3
}

export const preferencesSubtitle = {
  fontWeight: 500,
  mb: 1
}

export const darkModeSwitch = {
  mr: 1
}

export const darkModeLabel = {
  fontWeight: 500
}

export const languageSelect = {
  backgroundColor: colors.common.white
}

// Logout
export const logoutBox = {
  textAlign: 'center',
  mt: 3
}

export const logoutButton = {
  textTransform: 'none'
}

// Drawer paper override (imported in page)
export const drawerPaper = {
  width: 240,
  boxSizing: 'border-box'
}
