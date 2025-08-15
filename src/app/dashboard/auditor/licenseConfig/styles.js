import { colors } from '@mui/material'

// Wrapper for the Per-Client license register box
export const perClientLicenseRegisterStyles = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fefae0',
  color: '#525252'
}

// Styles for the RenewalCard container
export const expiryRenewalAlertsStyles = {
  p: 2,
  height: '100%',
  backgroundColor: '#fefae0',
  color: '#525252',
  border: '1px solid #6b705c'
}

// Bottom dashboard Paper (usage chart + totals)
export const licenseUsageEntitlementDashboardStyles = {
  ml: 6,
  p: 2,
  height: '100%',
  width: '1100px',
  backgroundColor: '#fefae0',
  border: '2px solid #6b705c'
}

// (Optional) Chart container if you want to customize
export const licenseUsageChartContainerStyles = {
  width: '100%',
  height: 400
}

// Box wrapping the total assigned/purchased
export const licenseTotalsBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  mt: 2,
  px: 1
}

// Styles for the "Over Usage" alert section
export const overUsageAlertStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  color: '#d32f2f'
}
