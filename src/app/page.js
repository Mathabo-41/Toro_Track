/* Welcome Screen*/
'use client';

import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import { Box, IconButton } from '@mui/material';
import {
  mainContainerStyles,
  videoBackgroundStyles,
  subtleOverlayStyles,
  logoContainerStyles,
  continueButtonStyles,
} from './welcomeStyles.js';
import Link from 'next/link';

export default function Welcome() {
  const router = useRouter();

  /**
   * Navigates to the login screen.
   */
  const handleContinue = () => {
    try {
      router.push('/login'); // Navigate to the login screen
    } catch (error) {
      console.error("Failed to navigate:", error);
      // Handle navigation error if needed
    }
  };

  return (
    <Box component="main" sx={mainContainerStyles}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={videoBackgroundStyles}
      >
        <source src="/appImages/welcome_animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle overlay for better text readability */}
      <Box sx={subtleOverlayStyles}></Box>

      {/* Logo Image Container (now responsive) */}
      <Box sx={logoContainerStyles}>
        <Image
          src="/appImages/logo.png"
          alt="Logo"
          width={500}
          height={150}
          priority
          style={{ width: '100%', height: 'auto' }} // Image scales to fit the Box
        />
      </Box>

      {/* Continue Button (now an IconButton) */}
      <IconButton
        onClick={handleContinue}
        sx={continueButtonStyles}
        aria-label="Continue to login"
      >
        <ArrowForwardIcon sx={{ color: '#606c38' }} />
      </IconButton>
    </Box>
  );
}