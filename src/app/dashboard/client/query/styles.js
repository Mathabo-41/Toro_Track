// Contains the inline styles and sx overrides for the raise query screen

export const mainContentBox = {
  flexGrow: 1,
  p: 3,
  backgroundColor: '#fefaf0',
  color: '#525252',
  marginLeft: 30
};

export const pageHeader = {
  mb: 4,
  display: 'flex',
  flexDirection: 'column',
  color: '#525252',
  alignItems: 'flex-start'
};

export const pageHeaderText = {
  color: '#525252',
  fontWeight: 500
};

export const pageHeaderIcon = {
  mr: 1,
  verticalAlign: 'middle',
  color: '#f3722c' 
};

export const pageHeaderSubtitle = {
  color: '#525252'
};

export const detailCard = {
  backgroundColor: '#e0e0e0', 
  border: '1px solid #a3a699'
};

export const detailBackButton = {
  color: '#f3722c',
  mb: 2
};

export const detailTitle = {
  color: '#283618'
};

export const detailChip = (status) => {
  let backgroundColor, color, border;
  if (status === 'resolved') {
    backgroundColor = 'rgba(46, 125, 50, 0.2)';
    color = '#81c784';
    border = '1px solid #2e7d32';
  } else if (status === 'in-progress') {
    backgroundColor = 'rgba(255, 152, 0, 0.2)';
    color = '#ffb74d';
    border = '1px solid #ff9800';
  } else {
    backgroundColor = 'rgba(97, 97, 97, 0.2)';
    color = '#bdbdbd';
    border = '1px solid #616161';
  }
  return {
    backgroundColor,
    color,
    border,
    size: 'small',
    icon: status === 'resolved' ? <ResolvedIcon /> : <PendingIcon />
  };
};

export const detailSectionTitle = {
  color: '#525252',
  mb: 1
};

export const detailSectionText = {
  color: '#283618',
  mb: 2
};

export const attachmentsTableContainer = {
  backgroundColor: 'transparent',
  border: '1px solid #a3a699'
};

export const attachmentsTableFileText = {
  color: '#283618'
};

export const attachmentsTableFileSize = {
  color: '#283618'
};

export const attachmentsDownloadButton = {
  color: '#f3722c',
  borderColor: '#f3722c',
  '&:hover': {
    borderColor: '#e65c19'
  }
};

export const responseBox = {
  backgroundColor: '#a3a699', 
  p: 3,
  borderRadius: 1,
  border: '1px solid #6b705c'
};

export const responseTitle = {
  color: '#283618',
  mb: 1
};

export const responseText = {
  color: '#283618'
};

export const formCard = {
  backgroundColor: '#ccd5ae',
  border: '2px solid #606c38',
  height: '100%'
};

export const formHeader = {
  color: '#283618',
  mb: 2,
  fontWeight: 500
};

export const formTextField = {
  '& .MuiInputLabel-root': { color: '#525252' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6b705c',
    },
    '&:hover fieldset': {
      borderColor: '#283618',
    },
  },
  '& .MuiInputBase-input': { color: '#283618' }
};

export const formSelect = {
  color: '#283618',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#6b705c',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#283618',
  },
  '& .MuiSvgIcon-root': {
    color: '#6b705c'
  }
};

export const attachButton = {
  color: '#606c38',
  borderColor: '#606c38',
  '&:hover': {
    border: '#283618',
    backgroundColor: '#283618',
  }
};

export const attachedFileBox = {
  mt: 1,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#a3a699',
  p: 1,
  borderRadius: 1
};

export const attachedFileText = {
  color: '#283618',
  flexGrow: 1
};

export const attachedFileDeleteButton = {
  color: '#d32f2f'
};

export const submitButton = {
  backgroundColor: '#f3722c',
  color: '#fefae0',
  '&:hover': {
    backgroundColor: '#e65c19'
  }
};

export const queriesCard = {
  backgroundColor: '#ccd5ae',
  border: '2px solid #606c38',
  height: '100%'
};

export const queriesHeader = {
  color: '#283618',
  mb: 2,
  fontWeight: 500
};

export const queriesTableContainer = {
  backgroundColor: 'transparent',
  border: '1px solid #a3a699'
};

export const queriesTableCell = {
  color: '#283618'
};

export const queriesTableCellHeader = {
  color: '#283618',
  fontWeight: 'bold'
};

export const queriesTableRow = {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(40, 54, 24, 0.05)'
  }
};

export const queriesStatusChip = (status) => {
  let backgroundColor, color, border;
  if (status === 'resolved') {
    backgroundColor = 'rgba(46, 125, 50, 0.2)';
    color = '#042c06ff';
    border = '1px solid #2e7d32';
  } else if (status === 'in-progress') {
    backgroundColor = 'rgba(255, 152, 0, 0.2)';
    color = '#f59403ff';
    border = '1px solid #ff9800';
  } else {
    backgroundColor = 'rgba(97, 97, 97, 0.2)';
    color = '#871089ff';
    border = '1px solid #5a0657ff';
  }
  return {
    backgroundColor,
    color,
    border,
    size: 'small'
  };
};

export const noQueriesBox = {
  p: 3,
  textAlign: 'center',
  backgroundColor: '#a3a699',
  borderRadius: 1
};

export const noQueriesText = {
  color: '#283618'
};