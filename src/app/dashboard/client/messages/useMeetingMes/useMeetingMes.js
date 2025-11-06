// MODIFIED: page.js

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import * as meetingMesService from '../meetingMesService/service';

// MODIFIED: Zustand Store - removed message/conversation state
const useMeetingMesStore = create((set) => ({
  activeTab: 0,
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export const useMeetingMes = () => {
  const queryClient = useQueryClient();
  // MODIFIED: Destructured only the needed state from the store
  const { activeTab, setActiveTab } = useMeetingMesStore();

  const { data: meetings = [], isLoading: isLoadingMeetings } = useQuery({
    queryKey: ['meetings'],
    queryFn: meetingMesService.fetchMeetings,
  });

  const { data: notifications = [], isLoading: isLoadingNotifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: meetingMesService.fetchNotifications,
  });

  // MODIFIED: Return object with only the necessary values
  return {
    activeTab,
    setActiveTab,
    meetings,
    notifications,
    isLoadingMeetings,
    isLoadingNotifications
  };
};