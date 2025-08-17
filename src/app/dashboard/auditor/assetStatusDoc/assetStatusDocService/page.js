// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

export const getAssetStatusDocData = async () => {
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const auditTrailMenu = [
    { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
    { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
    { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
    { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
    { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
    { name: 'Settings', path: '/dashboard/auditor/settings' }
  ];

  // hardcode
  const statusData = [
    { id: 1, asset: "Laptop - Dell XPS 13", status: "Deployed" },
    { id: 2, asset: "Router - Cisco 2901", status: "In Transit" },
    { id: 3, asset: "Software - Adobe CC", status: "Under Maintenance" },
    { id: 4, asset: "Printer - HP LaserJet", status: "Retired" },
  ];

  const documentsData = [
    "Delivery Note #12345.pdf",
    "Client Sign-off Form - Project Alpha.pdf",
    "Warranty Certificate - Dell XPS 13.pdf",
    "Disposal Form - HP Printer.pdf",
  ];

  const digitalSignatures = [
    { client: "Acme Corp", date: "2025-07-30", status: "Accepted" },
    { client: "Globex Inc", date: "2025-07-28", status: "Pending" },
  ];
  
  const userInfo = {
    name: "Sipho Ellen",
    role: "Auditor"
  };

  return {
    auditTrailMenu,
    statusData,
    documentsData,
    digitalSignatures,
    userInfo,
  };
};