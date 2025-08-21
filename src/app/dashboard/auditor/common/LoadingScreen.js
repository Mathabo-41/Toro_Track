'use client';

// A reusable component for the suspense fallback loading screen.
export default function LoadingScreen({ message = "Loading..." }) {
  const loadingStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fefaf0',
    color: '#283618',
    fontFamily: 'Disket Mono, monospace', // Added a fallback font
    fontWeight: 'bold',
    fontSize: '1.2rem',
  };

  return (
    <div style={loadingStyles}>
      <span>{message}</span>
    </div>
  );
}