// This file contains all the logic and state management for the project details feature.
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProjectData, fetchComments, postComment } from '../detailsService/page';

/**
 * Custom hook to manage state and data fetching for the Project Details page.
 * @param {number} projectId The ID of the project to display.
 * @returns {object} An object containing all necessary state, data, and handlers.
 */
export const useDetails = (projectId) => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState(0);
  const [commentText, setCommentText] = useState('');

  // Fetch all data for the given project ID.
  const { data: projectData, isLoading, error } = useQuery({
    queryKey: ['projectData', projectId],
    queryFn: () => fetchProjectData(projectId),
    enabled: !!projectId, // Only run the query if projectId is available.
  });

  // Fetch comments for the given project ID.
  const { data: comments, isLoading: isCommentsLoading } = useQuery({
    queryKey: ['comments', projectId],
    queryFn: () => fetchComments(projectId),
    enabled: !!projectId,
  });
  
  // Mutation for posting a new comment.
  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', projectId] });
      setCommentText('');
    },
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      postCommentMutation.mutate({ projectId, commentText });
    }
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  return {
    activeTab,
    commentText,
    projectData,
    isLoading,
    error,
    comments,
    isCommentsLoading,
    handleTabChange,
    handleCommentSubmit,
    handleCommentChange,
  };
};