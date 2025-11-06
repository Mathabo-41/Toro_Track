/* This file ensures that the screen loads and opens immediately by wrapping the content with lazy loading and suspense fallback to display a loading message */

import React, { Suspense, lazy } from 'react';

// This line forces the page to be dynamic and skips pre-rendering
export const dynamic = 'force-dynamic';

// Import LoadingScreen component
import LoadingScreen from '../common/LoadingScreen';

const LazyAdminOverviewContent = lazy(() => import('./ReportsContent'));

export default function AdminOverviewPage() {
  return (
    // Use the LoadingScreen component in the fallback prop
    <Suspense fallback={<LoadingScreen message="Loading Reports..." />}>
      <LazyAdminOverviewContent />
    </Suspense>
  );
}