// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

export const auditTrailMenu = [
  { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
  { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
  { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
  { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
  { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
  { name: 'Settings', path: '/dashboard/auditor/settings' }
];

// hardcode
export const auditTrailData = [
  {
    orderId: "#ORD8864",
    signOff: "Themba Ngozo (Asset Manager)",
    timestamp: "2023-10-01 10:00",
    status: "Delivered",
    receiver: "Dean Edwards",
    type: "Hardware",
    serial: "SN123456",
  },
  {
    orderId: "#ORD4931",
    signOff: "Musa Mokoena (Storage Manager)",
    timestamp: "2023-10-02 11:00",
    status: "Delivered",
    receiver: "Mandla Zulu",
    type: "Hardware",
    serial: "SN123457",
  },
  {
    orderId: "#ORD2211",
    signOff: "Themba Ngozo (Asset Manager)",
    timestamp: "2023-10-03 12:00",
    status: "In transit",
    receiver: "Pieter Cole",
    type: "Hardware",
    serial: "SN123458",
  },
  {
    orderId: "#ORD7700",
    signOff: "Themba Ngozo (Asset Manager)",
    timestamp: "2023-10-04 13:00",
    status: "Processing",
    receiver: "Lesedi Mofokeng",
    type: "Software",
    serial: "SN123459",
  },
  {
    orderId: "#ORD3231",
    signOff: "Musa Mokoena (Storage Manager)",
    timestamp: "2023-10-05 14:00",
    status: "Processing",
    receiver: "Mthuthuzi Langa",
    type: "Software",
    serial: "SN123460",
  },
];