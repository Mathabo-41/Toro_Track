export const mainContainer = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
};

export const videoBackground = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '1535px',
  height: '760px',
  objectFit: 'cover',
  transform: 'translate(-50%, -50%)',
  zIndex: -1,
};

export const subtleOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: -1,
};

export const logoImage = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: 'auto',
  zIndex: 1,
};

export const continueButton = {
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
};

export const continueButtonHover = {
  transform: 'scale(1.1)',
  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
};