// Contains the global styles, which are the styles that when modified,
//  automatically updates all screens under the admin folder.

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
  color: '#fefaf0',
  borderBottom: '2px solid #606c38',
  display: 'flex',
};

export const listItemButton = {
    color: '#fefaf0',
    '&:hover': {
      backgroundColor: '#606c38',
      color: '#fefaf0',
    },
};

export const activeListItemButton = {
  backgroundColor: '#606c38', 
  color: '#fefaf0',
}

export const mainContentBox = {
  flexGrow: 1,
  p: 3,
  color: '#525252',
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
