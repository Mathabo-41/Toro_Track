'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Use dynamic to lazily load the DashboardContent component
const LazyDashboardContent = dynamic(() => import('./DashboardContent'), {
  loading: () => <p>Loading...</p>
});

export default function DashboardLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <LazyDashboardContent>{children}</LazyDashboardContent>
    </Suspense>
  );
}