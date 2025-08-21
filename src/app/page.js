/* Welcome Screen*/
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  mainContainer,
  videoBackground,
  subtleOverlay,
  logoImage,
  continueButton,
  continueButtonHover,
} from './welcomeStyles.js';

export default function Welcome() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleContinue = () => {
    router.push('/login'); // Navigate to the login screen
  };

  return (
    <main style={mainContainer}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={videoBackground}
      >
        <source src="/appImages/welcome_animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle overlay for better text readability */}
      <div style={subtleOverlay}></div>

      {/* Logo Image */}
      <img
        src="/appImages/logo.png"
        alt="Logo"
        style={logoImage}
      />

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        style={isHovered ? { ...continueButton, ...continueButtonHover } : continueButton}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ArrowForwardIcon sx={{ color: '#606c38' }} />
      </button>
    </main>
  );
}