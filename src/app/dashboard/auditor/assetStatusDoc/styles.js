// Contains the inline styles and sx overrides for the asset status documentation screen

export const assetStatusContainer = {
  display: 'grid',
  gap: 2,
  backgroundColor: '#fefae0',
  p: 2
}

export const assetStatusTitle = {
  mb: 1,
  fontWeight: 600
}

export const assetStatusSubtitle = {
  mb: 3,
  color: 'rgba(0, 0, 0, 0.7)'
}

export const headerRightSectionStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  
};

export const searchFieldStyles = {
  width: '300px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '5px',
    backgroundColor: '#fefaf0',
    fontSize: '0.9rem',
    height: '40px', 
    '& fieldset': {
      borderColor: '#525252',
    },
    '&:hover fieldset': {
      borderColor: '#525252',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#283618',
      borderWidth: '2px',
    },
  },
};

// style for the table
export const assetStatusPaper = {
  p: 2,
  mb: 2,
  backgroundColor: '#fefae0',
  border: '2px solid #525252', 
  borderRadius: '8px', 
  width: 'fit-content', 
  margin: '16px auto', 
}

export const assetStatusSectionTitle = {
  mb: 1,
  fontWeight: 500
}
