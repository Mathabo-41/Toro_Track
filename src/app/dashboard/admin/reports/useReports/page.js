"use client";
// Contains all the logic and instructions for this feature.

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as service from '../reportsService/page';

export const useReports = () => {
  const [reports, setReports] = useState({});
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [viewMode, setViewMode] = useState('kanban');
  const [projectMenuAnchor, setProjectMenuAnchor] = useState(null);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const router = useRouter();
  
  const currentUser = { id: 'user-uuid-admin', role: 'admin' };
  const rolePermissions = {
      admin: { canEdit: true, canDelete: true, canMove: true, canAdd: true },
      auditor: { canEdit: true, canDelete: false, canMove: true, canAdd: true },
      client: { canEdit: true, canDelete: false, canMove: false, canAdd: true }
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [
        reportsData, 
        kanbanData, 
        membersData
      ] = await Promise.all([
        service.fetchReportMetrics(),
        service.fetchKanbanData(),
        service.fetchTeamMembers()
      ]);
      
      setReports(reportsData || {});
      setProjects(kanbanData || []);
      setTeamMembers(membersData || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);
  
  const handleNextProject = () => {
    if (currentProjectIndex < projects.length - 1) {
        setCurrentProjectIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePreviousProject = () => {
      if (currentProjectIndex > 0) {
          setCurrentProjectIndex(prevIndex => prevIndex - 1);
      }
  };
  
  const currentProject = projects.length > 0 ? projects[currentProjectIndex] : null;

  const handleProjectMenuClose = () => setProjectMenuAnchor(null);

  return {
    reports, projects, teamMembers, loading, error, menu: service.adminMenuData,
    currentProjectIndex, currentProject, viewMode, projectMenuAnchor, rolePermissions,
    openTaskDialog, isEditing, openSnackbar, snackbarSeverity, snackbarMessage,
    handleNextProject, handlePreviousProject, handleProjectMenuClose, setOpenTaskDialog
  };
};