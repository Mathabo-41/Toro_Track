import { colors } from '@mui/material'

export const settingsContainerStyles = {
  maxWidth: 800,
  mx: 'auto',
  mb: 4,
  p: 3,
  backgroundColor: colors.common.white,
  borderRadius: 2
}

export const saveButton = {
  mt: 4,
  backgroundColor: colors.indigo[500],
  color: colors.common.white,
  '&:hover': {
    backgroundColor: colors.indigo[700]
  }
}
