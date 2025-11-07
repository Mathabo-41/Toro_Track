/**
 * Styles for the Welcome screen (page.js), optimized for MUI sx prop.
 */

export const mainContainerStyles = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
};

export const videoBackgroundStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth: '100%',
  minHeight: '100%',
  width: 'auto',
  height: 'auto',
  objectFit: 'cover',
  transform: 'translate(-50%, -50%)',
  zIndex: -1,
};

export const subtleOverlayStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: -1,
};

export const logoContainerStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 'auto',
  zIndex: 1,
  // Use MUI breakpoints for responsive width
  width: {
    xs: '80%', // 80% wide on extra-small screens
    sm: 400,    // 400px wide on small screens
    md: 500,    // 500px wide on medium screens and up
  },
};

export const continueButtonStyles = {
  position: 'absolute',
  top: '1rem',
  // Responsive positioning for the button
  right: {
    xs: '1rem', // 1rem from right on extra-small
    md: '2rem', // 2rem from right on medium and up
  },
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
  // Handle hover state directly within the sx prop
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
};