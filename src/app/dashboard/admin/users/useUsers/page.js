// features/admin/Profiles/useProfiles.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as service from '../usersService/page';



function useProfiles() {
  const qc = useQueryClient();

  // Fetch all profiles
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['profiles'],
    queryFn: service.getUsers
  });

  // Create new
  const createMutation = useMutation({
    mutationFn: service.createProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profiles'] })
  });

  // Update existing
  const updateMutation = useMutation({
    mutationFn: service.updateProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profiles'] })
  });

  // Remove
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

export default useProfiles;