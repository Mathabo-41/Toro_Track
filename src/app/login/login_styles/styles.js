// These styles are now compatible with MUI's 'sx' prop.

export const mainContainer = {
  position: 'relative',
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: { xs: "1rem", md: "2rem" },
  flexDirection: "column",
  overflow: 'hidden',
};

// This style is for the <video> tag, so it remains a simple object.
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
  padding: { xs: "1rem", md: "2rem" },
  borderRadius: "16px",
};

export const formContainer = {
  backgroundColor: "rgba(253, 255, 252, 0.1)",
  padding: { xs: "1.5rem", md: "2rem" },
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
  fontSize: { xs: "1.75rem", md: "2rem" },
  fontWeight: "bold",
};

export const formStyle = {
  width: { xs: "85%", md: "80%" }, // Responsive width
  margin: "0 auto",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const inputField = {
  width: "100%",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "1rem",
  fontFamily: "Disekt Mono, monospace",
  background: "rgba(255, 255, 255, 0.6)",
  color: "#525252",
  '& .MuiInputBase-input': {
    color: '#525252',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: '#283618',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#606c38',
      borderWidth: '2px',
    },
  },
};

export const passwordField = {
  ...inputField, // Inherit styles from inputField
  marginBottom: "2rem",
};

export const loginButton = {
  backgroundColor: "#283618",
  color: "#606c38", // text color
  padding: "1rem 2.5rem",
  borderRadius: "8px",
  fontSize: "1.125rem",
  fontWeight: "600",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: { xs: "95%", md: "90%" },
  marginBottom: "1.5rem",
  fontFamily: "Disekt Mono, monospace",
  '&:hover': {
    backgroundColor: '#606c38',
    color: '#283618',
    borderColor: '#283618',
    border: '1px solid',
  },
  '&:disabled': {
    backgroundColor: 'grey.500',
  }
};