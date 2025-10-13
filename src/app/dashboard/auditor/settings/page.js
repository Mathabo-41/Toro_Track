/* This file ensures that the screen loads and opens immediately by wrapping the content with lazy loading and suspense fallback to display a loading message */

'use client';

import React, { Suspense, lazy } from 'react';
import LoadingScreen from '../common/LoadingScreen';

// Lazily import the main content of the settings page.
// This allows the loading screen to be displayed while the main component is fetched.
const LazySettingsContent = lazy(() => import('./SettingsContent'));

export default function SettingsPage() {
  return (
    // The Suspense component wraps the lazy-loaded component.
    // The 'fallback' prop takes the component to render during the wait.
    <Suspense fallback={<LoadingScreen message="Loading Settings..." />}>
      <LazySettingsContent />
    </Suspense>
  );
}