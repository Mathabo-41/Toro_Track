// styles.js

// Inline styles as JavaScript objects
export const mainContainer = {
  position: 'relative',
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: "2rem",
  flexDirection: "column",
  overflow: 'hidden',
};

export const videoBackground = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100vw',
  height: '100vh',
  objectFit: 'cover',
  transform: 'translate(-50%, -50%)',
  zIndex: -2,
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

export const mainContentContainer = {
  textAlign: "center",
  maxWidth: "500px",
  width: "100%",
  zIndex: 1,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: "2rem",
  borderRadius: "16px",
};

export const formContainer = {
  backgroundColor: "rgba(253, 255, 252, 0.1)",
  padding: "2rem",
  borderRadius: "16px",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(253, 255, 252, 0.2)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  width: "100%",
};

export const loginTitle = {
  fontFamily: "Disekt Mono, monospace",
  color: "#283618",
  marginBottom: "1rem",
  textAlign: "center",
  fontSize: "2rem",
  fontWeight: "bold",
};

export const formStyle = {
  width: "80%",
  margin: "0 auto",
};

export const inputField = {
  width: "100%",
  padding: "1rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "1rem",
  fontFamily: "Disekt Mono, monospace",
  background: "rgba(255, 255, 255, 0.6)",
  color: "#525252",
  transform: "scale(0.9)",
  transformOrigin: "center",
};

export const passwordField = {
  ...inputField, // Inherit styles from inputField
  marginBottom: "2rem",
  color: "#525252",
};

export const loginButton = {
  display: "inline-block",
  backgroundColor: "#283618", 
  color: "#606c38",
  padding: "1rem 2.5rem",
  borderRadius: "8px",
  fontSize: "1.125rem",
  fontWeight: "600",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: "80%",
  transform: "scale(0.9)",
  transformOrigin: "center",
  marginBottom: "1.5rem",
  fontFamily: "Disekt Mono, monospace",
};

export const loginButtonHover = {
  backgroundColor: '#606c38',
  color: '#283618',
  borderColor: '#283618',
  border: '1px solid',
};

// Global styles for Next.js
export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Disekt+Mono&display=swap');
  body {
    margin: 0;
    font-family: 'Disekt Mono', monospace;
    color: #283618;
  }
`;
