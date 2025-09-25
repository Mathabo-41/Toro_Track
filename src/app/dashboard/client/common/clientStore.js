// This file contains the global state management for the client portal.
import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient';

export const useClientStore = create((set, get) => ({
  // Holds the fetched profile data for the logged-in client.
  profile: null,
  isLoadingProfile: false,
  
  // Fetches profile data from the database and updates the state.
  fetchProfile: async () => {
    if (get().profile) return; // Avoid re-fetching if data already exists.
    
    set({ isLoadingProfile: true });
    try {
      const { data, error } = await supabase.rpc('get_client_settings_data');
      if (error) throw error;
      set({ profile: data, isLoadingProfile: false });
    } catch (error) {
      console.error('Error fetching client profile:', error);
      set({ isLoadingProfile: false });
    }
  },

  // State for the sidebar menu selection.
  selectedMenu: '/dashboard/client/details',
  setSelectedMenu: (path) => set({ selectedMenu: path }),

  // State for the search query.
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
  
// Side bar feature list.
export const clientMenu = [
  { name: 'Project Details', path: '/dashboard/client/details' },
  { name: 'Raise Query', path: '/dashboard/client/query' },
  { name: 'Agenda', path: '/dashboard/client/messages' },
  { name: 'Settings', path: '/dashboard/client/settings' }
];