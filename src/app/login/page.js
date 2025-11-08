// This file contains the client-side UI for the login page.
// It now uses the useLogin hook for all logic.
'use client';

import {
  mainContainer,
  videoBackground,
  subtleOverlay,
  mainContentContainer,
  formContainer,
  loginTitle,
  formStyle,
  inputField,
  passwordField,
  loginButton,
} from './login_styles/styles.js';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Backdrop
} from '@mui/material';
import { useLogin } from './useLogin.js';

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isLoading,
    error,
  } = useLogin();

  return (
    <Box component="main" sx={mainContainer}>
      {/* The <video> tag uses the 'style' prop because 'sx' does not work
        on it, and the styles are simple properties.
      */}
      <video autoPlay loop muted playsInline style={videoBackground}>
        <source src="/appImages/logo_animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Box sx={subtleOverlay}></Box>

      <Box sx={mainContentContainer}>
        <Box sx={formContainer}>
          <Typography variant="h2" sx={loginTitle}>
            Login
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
            <TextField
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={inputField}
              disabled={isLoading}
            />
            <TextField
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={passwordField}
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="contained"
              sx={loginButton}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            
            {error && (
              <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                {error}
              </Alert>
            )}
          </Box>
        </Box>
      </Box>

      {/* Full-screen loading overlay */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: 2000, 
          display: 'flex', 
          flexDirection: 'column' 
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" sx={{ mt: 2, color: '#fefae0' }}>
          Logging you in...
        </Typography>
      </Backdrop>
    </Box>
  );
}