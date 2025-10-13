// Contains the list of features in the side bar

import { create } from 'zustand';

  // Displays the list of features on the sidebar
  export const useAuditorStore = create((set) => ({
    selectedMenu: '/dashboard/auditor/audit-trail',
    setSelectedMenu: (path) => set({ selectedMenu: path }),

    // Enables the client to search information in the search bar
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
  }));
  
  // Side bar feature list
  export const auditorMenu = [
    { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
    { name: 'License Configuration', path: '/dashboard/auditor/licenseConfig' },
    { name: 'Asset Status', path: '/dashboard/auditor/assetStatusDoc' },
    { name: 'Report', path: '/dashboard/auditor/reportingExport' },
    { name: 'Compliance Alerts', path: '/dashboard/auditor/complianceAlerting' },
    { name: 'Settings', path: '/dashboard/auditor/settings' }
  ];
