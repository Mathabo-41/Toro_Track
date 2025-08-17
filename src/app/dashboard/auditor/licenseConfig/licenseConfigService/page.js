// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

/**
 * hardcode data for the license usage bar chart.
 * @type {Array<Object>}
 */
export const licenseData = [
  { software: 'Photoshop', assigned: 80, purchased: 100 },
  { software: 'AutoCAD', assigned: 60, purchased: 50 },
  { software: 'Office 365', assigned: 120, purchased: 120 },
];

/**
 * hardcode data for the per-client license register data grid.
 * @type {Array<Object>}
 */
export const licenseRows = [
  { id: 1, licenseName: 'Photoshop', licenseKey: 'ABC123', status: 'Active' },
  { id: 2, licenseName: 'AutoCAD', licenseKey: 'DEF456', status: 'Expired' },
  { id: 3, licenseName: 'Office 365', licenseKey: 'GHI789', status: 'Active' },
  { id: 4, licenseName: 'Adobe', licenseKey: 'JKL000', status: 'Active' },
  { id: 5, licenseName: 'Visual Studio', licenseKey: 'MNO111', status: 'Active' },
];

/**
 * hardcode data for the sidebar navigation menu.
 * @type {Array<Object>}
 */
export const sidebarMenu = [
  { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
  { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
  { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
  { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
  { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
  { name: 'Settings', path: '/dashboard/auditor/settings' },
];

/**
 * hardcode data for the upcoming license renewals.
 * @type {Array<Object>}
 */
export const renewalData = [
  {
    label: '30 days',
    color: 'warning',
    keys: ['XYZ123', 'ABC456', 'JKL789', 'MNO000'],
  },
  {
    label: '60 days',
    color: 'error',
    keys: ['UVW000'],
  },
  {
    label: '90 days',
    color: 'default',
    keys: ['LMN888', 'DEF333'],
  },
];