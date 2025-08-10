// styles.js
import { alpha } from '@mui/material/styles';

const sidebarWidth = 280;

/* Audit Trail Screen */
export const fullScreenContainerStyles = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#000000',
  width: '100vw',
  position: 'absolute',
  top: 0,
  left: 0,
};

export const drawerStyles = {
  width: sidebarWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: sidebarWidth,
    boxSizing: 'border-box',
    backgroundColor: '#000000',
    borderRight: '1px solid #222',
    color: '#fff',
  },
};

export const drawerHeaderStyles = {
  p: 2,
  borderBottom: '1px solid #222',
};

export const listItemButtonStyles = (name, currentPath) => ({
  color: '#fff',
  backgroundColor: name === currentPath ? '#1a1a1a' : 'transparent',
  '&:hover': {
    backgroundColor: '#1a1a1a',
  },
});

export const mainContentBoxStyles = {
  flexGrow: 1,
  p: 1,
  backgroundColor: '#000000',
  width: '100%',
  minHeight: '100%',
};

export const headerBoxStyles = {
  mb: 4,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const pageTitleStyles = {
  color: '#fff',
  fontWeight: 500,
};

export const headerRightSectionStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

export const searchFieldStyles = {
  '& .MuiInputBase-input': { color: '#fff' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: alpha('#fff', 0.23) },
    '&:hover fieldset': { borderColor: '#f4c10f' },
    '&.Mui-focused fieldset': { borderColor: '#f4c10f' },
    backgroundColor: '#1a1a1a',
    height: '40px',
    width: '500px',
  },
  '& .MuiInputBase-root': {
    color: '#fff',
  },
};

export const userProfileStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  color: '#fff',
  minWidth: '140px',
};

export const userInfoStyles = {
  textAlign: 'right',
};

export const auditorTextStyles = {
  fontWeight: 600,
};

export const tablePaperStyles = {
  backgroundColor: '#0a0a0a',
  border: '1px solid #222',
  overflow: 'hidden',
};

export const tableCellHeaderStyles = {
  color: '#fff',
  fontWeight: 'bold',
  borderBottom: '1px solid #222',
};

export const tableCellBodyStyles = {
  color: '#fff',
};

/* License & Configuration Tracking Screen */
export const perClientLicenseRegisterStyles = {
  p: 2,
  border: '1px solid #ddd',
  mb: 2,
};

export const expiryRenewalAlertsStyles = {
  p: 2,
  border: '1px solid #ddd',
  mb: 2,
};

export const licenseUsageEntitlementDashboardStyles = {
  p: 2,
  border: '1px solid #ddd',
  mb: 2,
};

export const licenseUsageChartContainerStyles = {
  width: '100%',
  height: 300,
};

export const licenseTotalsBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  mt: 2,
  px: 1,
};

export const overUsageAlertStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  color: '#d32f2f',
};

/* Asset Status & Documentation Screen */
export const assetStatusContainer = {
  padding: '24px',
};

export const assetStatusTitle = {
  fontWeight: 600,
  marginBottom: '8px',
  color: '#fff',
};

export const assetStatusSubtitle = {
  marginBottom: '24px',
  color: '#aaa',
};

export const assetStatusPaper = {
  padding: '16px',
  marginBottom: '16px',
  backgroundColor: '#0a0a0a',
  border: '1px solid #222',
};

export const assetStatusSectionTitle = {
  fontWeight: 600,
  marginBottom: '8px',
  color: '#fff',
};

/* Reporting & Export Screen */
export const reportingExportContainerStyles = {
  padding: '24px',
  backgroundColor: '#000000',
  color: '#fff',
};

export const reportingExportTitle = {
  fontWeight: 600,
  marginBottom: '8px',
  color: '#fff',
};

export const reportingExportSubtitle = {
  marginBottom: '24px',
  color: '#aaa',
};

export const reportingExportSection = {
  backgroundColor: '#0a0a0a',
  border: '1px solid #222',
  padding: '16px',
  marginBottom: '16px',
};

export const reportingExportSectionTitle = {
  fontWeight: 600,
  marginBottom: '8px',
  color: '#fff',
};

export const reportingExportSectionDescription = {
  marginBottom: '16px',
  color: '#aaa',
};

export const reportingExportButton = {
  contained: {
    backgroundColor: '#f4c10f',
    color: '#000',
    fontWeight: 'bold',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.9,
    },
  },
  outlined: {
    border: '1px solid #f4c10f',
    color: '#f4c10f',
    fontWeight: 'bold',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: alpha('#f4c10f', 0.1),
    },
  },
};

export const reportingExportFormControl = {
  '& .MuiInputBase-input': { color: '#fff' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: alpha('#fff', 0.23) },
    '&:hover fieldset': { borderColor: '#f4c10f' },
    '&.Mui-focused fieldset': { borderColor: '#f4c10f' },
    backgroundColor: '#1a1a1a',
  },
};

export const reportingExportSelect = {
  color: '#fff',
};

export const reportingExportMenuItem = {
  backgroundColor: '#1a1a1a',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#2a2a2a',
  },
};

/* Compliance & Alerting Screen */
export const complianceContainerStyles = {
  padding: '24px',
};

export const complianceTitleStyles = {
  fontWeight: 600,
  marginBottom: '8px',
  color: '#fff',
};

export const complianceSubtitleStyles = {
  marginBottom: '24px',
  color: '#aaa',
};

export const compliancePaperStyles = {
  padding: '16px',
  marginBottom: '16px',
  backgroundColor: '#0a0a0a',
  border: '1px solid #222',
};

export const complianceFeatureTitleStyles = {
  fontWeight: 600,
  color: '#fff',
};

export const complianceFeatureDescriptionStyles = {
  color: '#aaa',
};

export const complianceListItemStyles = {
  display: 'flex',
  gap: 2,
};

/* Settings Screen */
export const settingsContainerStyles = {
  padding: '24px',
  backgroundColor: '#0a0a0a',
  border: '1px solid #222',
  color: '#fff',
  margin: '24px',
};