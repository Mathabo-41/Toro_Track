import { colors } from '@mui/material'

export const reportingExportContainerStyles = {
  py: 4
}

export const reportingExportTitle = {
  fontWeight: 600,
  mb: 1
}

export const reportingExportSubtitle = {
  color: colors.grey[700],
  mb: 3
}

export const reportingExportSection = {
  mb: 4,
  p: 3,
  backgroundColor: colors.common.white,
  borderRadius: 2
}

export const reportingExportSectionTitle = {
  fontWeight: 500,
  mb: 1
}

export const reportingExportSectionDescription = {
  color: colors.grey[800],
  mb: 2
}

export const reportingExportFormControl = {
  mb: 2
}

export const reportingExportSelect = {
  textAlign: 'left'
}

export const reportingExportMenuItem = {
  // add overrides if needed
}

export const reportingExportButton = {
  contained: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 1,
    p: 1,
    backgroundColor: colors.indigo[500],
    color: colors.common.white,
    borderRadius: 1,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: colors.indigo[700]
    }
  }
}
