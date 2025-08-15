// features/admin/SystemSettings/useSettings.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as svc from '../settingsService/page';

export function useSettings() {
  const qc = useQueryClient();

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError
  } = useQuery('settings:categories', svc.getCategories);

  const updateMut = useMutation(svc.updateCategory, {
    onSuccess: () => qc.invalidateQueries('settings:categories')
  });

  const maintenanceMut = useMutation(svc.performMaintenance);

  const dangerousMut = useMutation(svc.dangerousAction);

  return {
    categories,
    categoriesLoading,
    categoriesError,
    updateCategory: updateMut.mutate,
    updating: updateMut.isLoading,
    runMaintenance: maintenanceMut.mutate,
    maintenanceLoading: maintenanceMut.isLoading,
    runDangerous: dangerousMut.mutate,
    dangerousLoading: dangerousMut.isLoading
  };
}
