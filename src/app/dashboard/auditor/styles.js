// styles.js
import { AlignHorizontalCenter } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const sidebarWidth = 280;

                                          /* -- Audit Trail Screen -- */
export const fullScreenContainerStyles = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#fefae0',
  width: '100vw',
  position: 'absolute',
  top: 0,
  left: 0,
};

/* Sidebar Styles */
export const drawerStyles = {
  width: sidebarWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: sidebarWidth,
    boxSizing: 'border-box',
    backgroundColor: '#283618',
    borderRight: '1px solid #222',
    color: '#fefae0',
  },
};

export const drawerHeaderStyles = {
  p: 2,
  borderBottom: '2px solid #6b705c',
};

export const listItemButtonStyles = (name, currentPath) => ({
  color: '#fefae0',
  backgroundColor: name === currentPath ? '#1a1a1a' : 'transparent',
  '&:hover': {
    backgroundColor: '#6b705c',
  },
});

export const mainContentBoxStyles = {
  flexGrow: 1,
  p: 1,
  backgroundColor: '#fefae0',
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
  color: '#525252',
  fontWeight: 500,
};

export const headerRightSectionStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

export const searchFieldStyles = {
  '& .MuiInputBase-input': { color: '#525252' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: alpha('#283618', 0.25) },
    '&:hover fieldset': { borderColor: '#283618' },
    '&.Mui-focused fieldset': { borderColor: '#283618' },
    backgroundColor: '#fefae0',
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
  color: '#525252',
  minWidth: '140px',
};

export const userInfoStyles = {
  textAlign: 'right',
};

export const auditorTextStyles = {
  fontWeight: 600,
};

/* Audit Trail Table Styles */
export const tablePaperStyles = {
  backgroundColor: '#fefae0',
  border: '1px solid #000',
  overflow: 'hidden',
};

export const tableCellHeaderStyles = {
  color: '#525252',
  fontWeight: 'bold',
  borderBottom: '1px solid #000',
};

export const tableCellBodyStyles = {
  color: '#525252',
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
  color: '#525252',
};

export const assetStatusSubtitle = {
  marginBottom: '24px',
  color: '#525252',
};

export const assetStatusPaper = {
  padding: '16px',
  marginBottom: '16px',
  backgroundColor: '#fefae0',
  border: '2px solid #283618',
};

export const assetStatusSectionTitle = {
  fontWeight: 600,
  marginBottom: '8px',
  color: '#525252',
};

/* Reporting & Export Screen */
export const reportingExportContainerStyles = {
  padding: '24px',
  backgroundColor: '#fefae0',
  color: '#525252',
};

export const reportingExportTitle = {
  fontWeight: 600,
  marginBottom: '8px',
  color: '#525252',
};

export const reportingExportSubtitle = {
  marginBottom: '24px',
  color: '#525252',
};

export const reportingExportSection = {
  backgroundColor: '#fefae0',
  border: '2px solid #283618',
  padding: '16px',
  marginBottom: '16px',
};

export const reportingExportSectionTitle = {
  fontWeight: 600,
  marginBottom: '8px',
  color: '#525252',
};

export const reportingExportSectionDescription = {
  marginBottom: '16px',
  color: '#525252',
};

export const reportingExportButton = {
  contained: {
    backgroundColor: '#283618',
    color: '#fefae0',
    fontWeight: 'bold',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      opacity: 2,
    },
  },
};

export const reportingExportFormControl = {
  '& .MuiInputBase-input': { color: '#525252' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: alpha('#283618', 0.44) },
    '&:hover fieldset': { borderColor: '#283618' },
    '&.Mui-focused fieldset': { borderColor: '#283618' },
    backgroundColor: '#fefae0',
  },
  '& .MuiInputBase-root': {
    color: '#525252',
  },
};

export const reportingExportSelect = {
  color: '#525252',
};

export const reportingExportMenuItem = {
  backgroundColor: '#fefae0',
  color: '#525252',
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
  color: '#525252',
};

export const complianceSubtitleStyles = {
  marginBottom: '24px',
  color: '#525252',
};

export const compliancePaperStyles = {
  padding: '16px',
  marginBottom: '16px',
  backgroundColor: '#fefae0',
  border: '1px solid #222',
};

export const complianceFeatureTitleStyles = {
  fontWeight: 600,
  color: '#525252',
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
  backgroundColor: '#fefae0',
  border: '1px solid #222',
  color: '#525252',
  margin: '24px',
};

export const saveButton = {
  variant: 'contained',
  color: '#fefae0',
  borderColor: '#283618',
  backgroundColor: '#283618',
  '&:hover': {
    backgroundColor: '#6b705c',
    borderColor: '#fefae0',
  },
  fontWeight: 'bold',
  height: '40px',
  width: '500px',
  display: 'block',
};