// Contains the list of features in the side bar 

import { create } from 'zustand';

  export const useClientStore = create((set) => ({
    // Displays the list of features on the sidebar
    selectedMenu: '/dashboard/client/details',
    setSelectedMenu: (path) => set({ selectedMenu: path }),

    // Enables the client to search information in the search bar
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
  }));
  
  // Side bar feature list
  export const clientMenu = [
    { name: 'Project Details',        path: '/dashboard/client/details' },
    { name: 'Raise Query',            path: '/dashboard/client/query' },
    { name: 'Agenda',    path: '/dashboard/client/messages' },
    { name: 'Settings',               path: '/dashboard/client/settings' }
  ];