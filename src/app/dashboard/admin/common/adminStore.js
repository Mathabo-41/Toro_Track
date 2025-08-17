// Contains the list of features in the side bar

import { create } from 'zustand';

// Displays the list of features on the sidebar
export const useAdminStore = create((set) => ({
  selectedMenu: '/dashboard/admin/overview',
  setSelectedMenu: (path) => set({ selectedMenu: path }),

  // Enables the client to search information in the search bar
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
}));

// Side bar feature list
export const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles',      path: '/dashboard/admin/profiles' },
  { name: 'Projects',             path: '/dashboard/admin/projects' },
  { name: 'Teams & Users',        path: '/dashboard/admin/users' },
  { name: 'Permissions',          path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports',  path: '/dashboard/admin/reports' },
  { name: 'Settings',             path: '/dashboard/admin/settings' }
];
