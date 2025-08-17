// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProjectData, postComment } from '../detailsService/page';

/**
 * Custom hook to manage state, data fetching, and event handlers for the Project Details page.
 * @returns {object} An object containing all necessary state, data, and handlers for the screen.
 */
export const useDetails = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState(0);
  const [commentText, setCommentText] = useState('');

  // --- React Query: Fetch Project Data ---
  const { data: projectData, isLoading, error } = useQuery({
    queryKey: ['projectData'],
    queryFn: fetchProjectData,
  });

  // --- React Query: Post Comment ---
  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      // Invalidate and refetch the comments query to get the new data
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setCommentText('');
    },
  });

  // --- React Query: Fetch Comments ---
  const { data: comments, isLoading: isCommentsLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: () => {
      // Simulating a fetch with the new comment
      const newComment = {
        id: Math.random(),
        user: 'You',
        text: commentText,
        time: 'Just now',
      };
      return postCommentMutation.mutateAsync(newComment);
    },
    // The query will only be enabled if a successful mutation has occurred
    enabled: postCommentMutation.isSuccess,
  });

  // --- Handlers ---
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      postCommentMutation.mutate(commentText);
    }
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  return {
    // State
    activeTab,
    commentText,
    // Data
    projectData,
    isLoading,
    error,
    comments,
    isCommentsLoading,
    // Handlers
    handleTabChange,
    handleCommentSubmit,
    handleCommentChange,
  };
};