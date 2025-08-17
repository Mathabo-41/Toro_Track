// Contains the inline styles and sx overrides for the license & configuration screen

// Root container for the entire page, ensuring it takes up the full viewport.
export const fullScreenContainerStyles = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#faedcd',
};

// Styles for the permanent navigation drawer.
export const drawerStyles = {
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    backgroundColor: '#283618',
    color: '#fefae0',
  },
};

// Header section within the drawer.
export const drawerHeaderStyles = {
  p: 2,
  textAlign: 'center',
  borderBottom: '1px solid #6b705c',
};

// Styles for list item buttons in the sidebar, with a different style for the active link.
export const listItemButtonStyles = (isActive) => ({
  backgroundColor: isActive ? '#6b705c' : 'transparent',
  '&:hover': {
    backgroundColor: '#6b705c',
  },
});

// Main content area, flexing to fill the remaining space.
export const mainContentBoxStyles = {
  flexGrow: 1,
  p: 3,
  ml: '240px', // Adjust margin to account for the drawer width.
  width: 'calc(100% - 240px)',
};

// Header at the top of the main content area.
export const headerBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 4,
};

// Main page title style.
export const pageTitleStyles = {
  color: '#525252',
  fontfamily:'Disket, monospace',
};

// Right-side section of the header.
export const headerRightSectionStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

// User profile container.
export const userProfileStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  color: '#fefae0',

};

// User info (name and role) container.
export const userInfoStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  color: '#525252',
};

// Style for the 'Auditor' text.
export const auditorTextStyles = {
  color: '#6b705c',
};

// Styles for the Per-Client License Register Paper component.
export const perClientLicenseRegisterStyles = {
  ml: 6,
  p: 2,
  height: '100%',
  width: '500px',
  overflow: 'auto',
  color: '#525252',
  backgroundColor: '#fefae0',
  border: '2px solid #6b705c',
};

// Styles for the License Expiry & Renewal Alerts Paper component.
export const expiryRenewalAlertsStyles = {
  ml: 2,
  p: 2,
  height: '100%',
  width: '500px',
  overflow: 'auto',
  color: '#525252',
  backgroundColor: '#fefae0',
  border: '2px solid #6b705c',
};

// Styles for the License Usage & Entitlement Dashboard Paper component.
export const licenseUsageEntitlementDashboardStyles = {
  ml: 6,
  p: 2,
  height: '100%',
  width: '1100px',
  backgroundColor: '#fefae0',
  border: '2px solid #6b705c',
};

// Styles for the bar chart container.
export const licenseUsageChartContainerStyles = {
  height: 400,
};

// Styles for the total license usage box.
export const licenseTotalsBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  mt: 2,
  px: 1,
};

// Styles for the 'Over Usage' alert.
export const overUsageAlertStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  color: '#d32f2f',
};