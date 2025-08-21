'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Snackbar, Alert } from '@mui/material';
import Sidebar from './sidebar';

export default function DashboardContent({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogout = () => {
    setOpenSnackbar(true);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };
  
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--background)',
      color: 'var(--foreground)'
    }}>
      {/* Pass the 'pathname' as a prop to the self-contained Sidebar */}
      <Sidebar pathname={pathname} />

      {/* Main content area */}
      <main style={{
        flex: 1,
        padding: '2rem',
        background: '#fefae0',
        color: '#525252',
        overflowY: 'auto',
        maxHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '1000px',
          marginBottom: '20px',
          position: 'relative',
          zIndex: 1,
          width: '100%'
        }}>
          {children} {/* Renders the content of the current page */}
        </div>
      </main>

      {/* Snackbar for logout feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Logging out...
        </Alert>
      </Snackbar>
    </div>
  );
}