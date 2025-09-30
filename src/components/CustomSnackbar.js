// components/CustomSnackbar.js
'use client';

import { Snackbar, Alert } from '@mui/material';

export default function CustomSnackbar({ open, onClose, severity = "success", message, duration = 1500 }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: '100%',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
