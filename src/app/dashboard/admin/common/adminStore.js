// Exports useAdminStore (Zustand store) and the adminMenu array.
import { create } from 'zustand';

export const useAdminStore = create((set) => ({
  selectedMenu: '/dashboard/admin/overview',
  setSelectedMenu: (path) => set({ selectedMenu: path }),
}));

export const adminMenu = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles',      path: '/dashboard/admin/profiles' },
  { name: 'Projects',             path: '/dashboard/admin/projects' },
  { name: 'Teams & Users',        path: '/dashboard/admin/users' },
  { name: 'Permissions',          path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports',  path: '/dashboard/admin/reports' },
  { name: 'Settings',             path: '/dashboard/admin/settings' }
];
