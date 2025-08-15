import { colors } from '@mui/material'

export const complianceContainerStyles = {
  py: 4
}

export const complianceTitleStyles = {
  fontWeight: 600,
  mb: 1
}

export const complianceSubtitleStyles = {
  color: colors.grey[700],
  mb: 3
}

export const compliancePaperStyles = {
  p: 3,
  backgroundColor: colors.common.white
}

export const complianceListItemStyles = {
  alignItems: 'flex-start',
  mb: 2,
  '&:last-of-type': {
    mb: 0
  },
  '& .MuiSvgIcon-root': {
    mt: 0.5,
    mr: 2,
    color: colors.success.main
  }
}

export const complianceFeatureTitleStyles = {
  fontWeight: 500,
  mb: 0.5
}

export const complianceFeatureDescriptionStyles = {
  color: colors.grey[800]
}
