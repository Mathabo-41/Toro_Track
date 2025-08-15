// Contains the seven global style objects

export const rootBox = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor:'#fefaf0',
};

export const drawerPaper = {
  width: 240,
  boxSizing: 'border-box',
  backgroundColor:'#283618'
};

export const drawerHeader = {
  p: 2,
  textAlign: 'center',
  color: '#fefaf0',
};

export const listItemButton = {
    color: '#fefaf0',
    '&:hover': {
      backgroundColor: '#606c38',
      color: '#fefaf0',
    },
};

export const mainContentBox = {
  flexGrow: 1,
  p: 3,
  color: '#525252',
  marginLeft: 35, // adjusts drawer width
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
  mb: 1
};

export const pageHeaderIcon = {
  color: '#525252',
  mr: 1
};
