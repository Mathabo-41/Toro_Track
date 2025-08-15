import create from 'zustand'

export const useAuditorStore = create((set) => ({
  // Sidebar navigation
  currentPath: '/dashboard/auditor/assetStatusDoc',
  auditTrailMenu: [
    { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
    { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
    { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
    { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
    { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
    { name: 'Settings', path: '/dashboard/auditor/settings' }
  ],

  // Search input
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Path setter (e.g. on page load)
  setCurrentPath: (path) => set({ currentPath: path })
}))
