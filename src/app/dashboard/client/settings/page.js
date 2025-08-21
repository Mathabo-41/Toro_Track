/* This file ensures that the screen loads and opens immediately by wrapping the content with lazy loading and suspense fallback to display a loading message */

'use client';

import React, { Suspense, lazy } from 'react';
// Removed unused imports if they are not needed elsewhere
// import { Box, CircularProgress } from '@mui/material';
// import * as globalStyles from '../common/styles';

// Import LoadingScreen component
import LoadingScreen from '../common/LoadingScreen';

const LazyAdminOverviewContent = lazy(() => import('./SettingsContent'));

export default function AdminOverviewPage() {
  return (
    // Use the LoadingScreen component in the fallback prop
    <Suspense fallback={<LoadingScreen message="Loading Settings..." />}>
      <LazyAdminOverviewContent />
    </Suspense>
  );
}