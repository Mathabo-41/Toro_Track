// MODIFIED: Contains the inline styles and sx overrides for the asset status documentation screen

export const assetStatusContainer = {
  display: 'grid',
  gap: 2,
  backgroundColor: '#fefae0',
  p: 2
}

// MODIFIED: Added font family for consistency
export const assetStatusTitle = {
  mb: 1,
  fontWeight: 600,
  fontFamily: 'Disek, monospace', // Added font
  color: '#525252',
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
    '& fieldset': { borderColor: '#525252' },
    '&:hover fieldset': { borderColor: '#525252' },
    '&.Mui-focused fieldset': { borderColor: '#283618', borderWidth: '2px' },
  },
};

// REMOVED: assetStatusPaper style as it is replaced by more specific styles

// MODIFIED: Added font family for consistency
export const assetStatusSectionTitle = {
  mb: 2, // Added margin bottom for spacing
  fontWeight: 500,
  fontFamily: 'Disek, monospace', // Added font
  color: '#283618',
};

// --- NEW STYLES ADDED BELOW for the table ---

// NEW: Style for the table container, matching the 'Active Alerts' table
export const tableContainerStyles = {
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#e9edc9',
  border: '2px solid #283618', // The requested dark green border
};

// NEW: Style for the table header cells
export const tableHeaderCellStyles = {
  backgroundColor: '#ccd5ae',
  color: '#283618',
  fontWeight: 'bold',
  fontFamily: 'Disek, monospace',
};