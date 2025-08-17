// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import * as meetingMesService from '../meetingMesService/page';

// Zustand Store for UI state (active tabs, text inputs)
const useMeetingMesStore = create((set) => ({
  activeTab: 0,
  activeConversation: null,
  newMessage: '',
  searchTerm: '',
  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveConversation: (conversation) => set({ activeConversation: conversation }),
  setNewMessage: (message) => set({ newMessage: message }),
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

/**
 * managing the state and logic of the messages and meetings screen. It uses Zustand for local UI state and React Query for server state.
 */
export const useMeetingMes = () => {
  const queryClient = useQueryClient();
  const { activeTab, activeConversation, newMessage, searchTerm,
          setActiveTab, setActiveConversation, setNewMessage, setSearchTerm } = useMeetingMesStore();

  // React Query hooks for fetching server state
  const { data: conversations = [], isLoading: isLoadingConversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: meetingMesService.fetchConversations,
  });

  const { data: meetings = [], isLoading: isLoadingMeetings } = useQuery({
    queryKey: ['meetings'],
    queryFn: meetingMesService.fetchMeetings,
  });

  const { data: notifications = [], isLoading: isLoadingNotifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: meetingMesService.fetchNotifications,
  });

  const { data: teamMembers = [], isLoading: isLoadingTeam } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: meetingMesService.fetchTeamMembers,
  });

  // React Query mutation for sending a new message
  const sendMessageMutation = useMutation({
    mutationFn: meetingMesService.sendMessage,
    onSuccess: () => {
      // Invalidate the conversations cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  // Handlers
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && activeConversation) {
      // Call the mutation with the new message and active conversation ID
      sendMessageMutation.mutate({
        conversationId: activeConversation.id,
        text: newMessage,
      });
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.with.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    activeTab,
    setActiveTab,
    activeConversation,
    setActiveConversation,
    newMessage,
    setNewMessage,
    searchTerm,
    setSearchTerm,
    handleSendMessage,
    filteredConversations,
    meetings,
    notifications,
    teamMembers,
    isLoadingConversations,
    isLoadingMeetings,
    isLoadingNotifications,
    isLoadingTeam
  };
};