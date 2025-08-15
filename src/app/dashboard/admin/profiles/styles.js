export const searchField = {
  bgcolor: '#fefaf0',
  boder: '2x solid #525252',
  color:'#525252',
};

export const addClientButton = {
  color: '#fefaf0',
  backgroundColor:'#283618',
  BorderColor: '#fefaf0',
  border: '1px solid',
  '&:hover': {
    backgroundColor: '#31572c', 
    color: '#fefaf0',
    BorderColor: '#fefaf0',
    border: '1px solid',
  },
  ml: 2

};

export const clientCard = {
  color:'#525252',
  backgroundColor:'#fefaf0',
  boder: '2x solid #525252',
  mb: 4
};

export const tableContainer = {
  color:'#525252',
  backgroundColor:'#fefaf0',
  boder: '2x solid #525252',
  maxHeight: 400
};

export const tableHeader = {
  color:'#525252',
  backgroundColor:'#fefaf0',
};

export const tableHeaderCell = {
  color:'#525252',
  backgroundColor:'#fefaf0',
  fontWeight: 700
};

export const tableRow = {
  color:'#525252',
  backgroundColor:'#fefaf0',
  cursor: 'pointer'
};

export const clientTableCell = {
  color:'#525252',
  backgroundColor:'#fefaf0',
  py: 1
};

export const clientLogoAvatar = {
  bground:'#525252',
  width: 40,
  height: 40
};

export const contactIcon = {
  color: '#525252'
};

export const projectsIcon = {
  color: 'text.secondary'
};

export const statusChip = (status) => {
  const colorMap = {
    premium: '#6a994e',
    active: '#f77f00',
    inactive: '#e63946'
  };
  return {
    textTransform: 'capitalize',
    color: `${colorMap[status]}.main`
  };
};

export const actionButton = {
  color: '#525252'
};

export const statsCard = {
  p: 2
};

export const statsCardContent = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export const statsCardValue = (color) => ({
  fontWeight: 700,
  color: `${color}.main`
});

export const statsAvatar = (bg, fg) => ({
  bgcolor: `${bg}.main`,
  color: `${fg}.contrastText`
});

export const menuPaper = {
  mt: 1
};

export const menuItem = {
  '&:hover': {
    bgcolor: 'action.hover'
  }
};

export const menuDivider = {
  my: 1
};
