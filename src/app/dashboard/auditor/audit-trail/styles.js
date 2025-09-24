// Contains the inline styles and sx overrides for the audit trail screen

import { Height } from "@mui/icons-material";

export const fullScreenContainerStyles = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
};

export const mainContentBoxStyles = {
  flexGrow: 1,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

export const headerBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const pageTitleStyles = {
  color: '#525252',
  fontWeight: 'bold',
};

export const headerRightSectionStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

export const searchFieldStyles = {
  height: '40px',
  width: '350px',
  '& .MuiOutlinedInput-root': {
    height: '100%',
    borderRadius: '20px',
    backgroundColor: '#fefaf0',
    '& fieldset': {
      borderColor: '#525252',
    },
    '&:hover fieldset': {
      borderColor: '#525252',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#283618',
    },
  },
};

export const addButtonStyles = {
    backgroundColor: '#6b705c',
    color: '#fefae0',
    fontWeight: 'bold',
    borderRadius: '20px',
    height: '40px',
    '&:hover': {
        backgroundColor: '#525252',
    },
};

export const userProfileStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

export const userInfoStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
};

export const auditorTextStyles = {
  color: '#757575',
};

export const tablePaperStyles = {
  marginTop: '24px',
  backgroundColor: '#fefaf0',
  color: '#525252',
  border:' 2px solid #525252',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};

export const tableCellHeaderStyles = {
  fontWeight: 'bold',
  backgroundColor: '#fefaf0',
  color: '#525252',
  borderBottom: '2px solid #525252',
};

export const tableCellBodyStyles = {
  borderBottom: '1px solid #525252',
};

export const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fefaf0',
    border: '2px solid #525252',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
};