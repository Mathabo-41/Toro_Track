import { Box } from '@mui/material';

/**
 * Admin Layout Wrapper
 * Provides consistent layout for all admin pages with navigation
 */
export default function AdminLayout({ children }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
      {children}
    </Box>
  );
}