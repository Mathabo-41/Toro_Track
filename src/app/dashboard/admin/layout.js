// src/app/dashboard/admin/layout.js
//'use client';

import DashboardLayout from '../../layout';
import { Box, Typography, styled } from '@mui/material';

/**
 * Admin Layout Wrapper
 * Provides consistent layout for all admin pages with navigation
 */
export default function AdminLayout({ children }) {
  return (
    <DashboardLayout>
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
        {children}
      </Box>
    </DashboardLayout>
  );
}