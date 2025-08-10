'use client';

import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Welcome() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/login'); // Navigate to the login screen
  };

  return (
    <main style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          // These values are set for a 1920x1080 screen
          width: '1535px',
          height: '760px',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
        }}
      >
        {/*
          ACTION REQUIRED: You must replace this with the local path to your downloaded video.
          The public Canva link will not work here.
        */}
        <source src="/appImages/welcome_animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: -1,
      }}></div>

      {/* Logo Image */}
      <img
        src="/appImages/logo.png"
        alt="Logo"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px', // Adjust the width as needed
          height: 'auto', // Maintain aspect ratio
          zIndex: 1, // Ensure the logo is above the video and overlay
        }}
      />

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '2rem',
          backgroundColor: '#283618',
          backdropFilter: 'blur(10px)',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ArrowForwardIcon sx={{ color: '#606c38' }} />
      </button>
    </main>
  );
}