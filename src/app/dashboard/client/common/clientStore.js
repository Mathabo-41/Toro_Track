import create from 'zustand'

export const useClientStore = create((set) => ({
  // Sidebar state
  currentPath: '/dashboard/client/details',
  clientMenu: [
    { name: 'Project Details',        path: '/dashboard/client/details' },
    { name: 'Raise Query',            path: '/dashboard/client/query' },
    { name: 'Meetings & Messages',    path: '/dashboard/client/messages' },
    { name: 'Settings',               path: '/dashboard/client/settings' }
  ],

  // Search (for future use)
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  // Update the active menu path
  setCurrentPath: (path) => set({ currentPath: path })
}))
