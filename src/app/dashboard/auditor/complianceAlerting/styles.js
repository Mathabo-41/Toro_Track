// Contains the inline styles and sx overrides for the compliance & alerting screen

import { Height } from "@mui/icons-material"; // Helps with Adjusting search bar height

export const fullScreenContainerStyles = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f5f7fa',
};

export const drawerStyles = {
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
};

export const drawerHeaderStyles = {
  p: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '2px solid #525252',
};

export const mainContentBoxStyles = {
  flexGrow: 1,
  p: 3,
  ml: '240px',
  display: 'flex',
  flexDirection: 'column',
};

export const headerBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 4,
  pb: 2,
  borderBottom: '1px solid #ddd',
};

export const pageTitleStyles = {
  fontFamily: 'Disek, monospace',
  color: '#525252',
};

export const headerRightSectionStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

export const searchFieldStyles = {
  width: '300px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '5px',
    backgroundColor: '#fefaf0',
    fontSize: '0.9rem',
    height: '40px',
    '& fieldset': {
      borderColor: '#525252',
    },
    '&:hover fieldset': {
      borderColor: '#525252',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#283618',
      borderWidth: '2px',
    },
  },
};

export const userProfileStyles = {
  display: 'flex',
  color: '#525252',
  alignItems: 'center',
  gap: 1,
};

export const userInfoStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
};

export const auditorTextStyles = {
  color: '#888',
};

export const compliancePaperStyles = {
  p: 3,
  backgroundColor: '#ccd5ae',
  border: '2px #525252',
};

export const complianceFeatureTitleStyles = {
  fontWeight: 'bold',
  fontFamily: 'Disek, monospace',
  color: '#283618',
};

export const complianceFeatureDescriptionStyles = {
  color: '#606c38',
};

export const complianceListItemStyles = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2,
  mb: 2,
  p: 2,
  backgroundColor: '#e9edc9',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
};

// --- NEW STYLES ADDED BELOW ---

export const exportButtonStyles = {
  backgroundColor: '#606c38',
  color: '#fefae0',
  height: '40px',
  '&:hover': {
    backgroundColor: '#283618',
  },
};

export const activeAlertsTableContainerStyles = {
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#e9edc9',
};

export const tableHeaderCellStyles = {
  backgroundColor: '#ccd5ae',
  color: '#283618',
  fontWeight: 'bold',
  fontFamily: 'Disek, monospace',
};

export const getSeverityChipColor = (severity) => {
  switch (severity.toLowerCase()) {
    case 'critical': return 'error';
    case 'high': return 'warning';
    case 'medium': return 'info';
    case 'low': return 'success';
    default: return 'default';
  }
};

export const securityComplianceSectionStyles = {
  p: 3,
  backgroundColor: '#ccd5ae',
  borderRadius: '8px',
  border: '2px solid #525252',
};

export const securityListItemStyles = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2,
  p: 2,
  backgroundColor: '#e9edc9',
  borderRadius: '8px',
  height: '100%', // Ensure items in the same row have equal height
};