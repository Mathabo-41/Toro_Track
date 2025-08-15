// src/app/dashboard/admin/projects/useProfiles/page.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as service from '../profilesService/page';

export function useProfiles() {
  const qc = useQueryClient();

  // Fetch all profiles using the new v5 object syntax
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['profiles'],
    queryFn: service.getProfiles
  });

  // Create new profile using the correct v5 object syntax
  const createMutation = useMutation({
    mutationFn: service.createProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profiles'] })
  });

  // Update existing profile using the correct v5 object syntax
  const updateMutation = useMutation({
    mutationFn: service.updateProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profiles'] })
  });

  // Remove profile using the correct v5 object syntax
  const deleteMutation = useMutation({
    mutationFn: service.deleteProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profiles'] })
  });

  return {
    profiles: data,
    isLoading,
    error,
    createProfile: createMutation.mutate,
    updateProfile: updateMutation.mutate,
    deleteProfile: deleteMutation.mutate
  };
}