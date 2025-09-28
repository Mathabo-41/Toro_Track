// This file contains the shared styles for the dashboard sidebar.

const drawerWidth = 260;

export const drawer = {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: '#283618',
        borderRight: '2px solid #6b705c',
        color: '#fefae0'
    }
};

export const drawerHeader = {
    p: 2,
    borderBottom: '2px solid #6b705c',
    display: 'flex',
    alignItems: 'center',
    gap: 1.5
};

export const logoText = {
    color: '#fefae0',
    fontWeight: 'bold'
};

const baseListItemButton = {
    color: '#fefae0',
    borderRadius: '8px',
    marginBottom: '4px',
    '&:hover': {
        backgroundColor: '#6b705c'
    }
};

export const listItemButton = {
    ...baseListItemButton,
    backgroundColor: 'transparent',
};

export const activeListItemButton = {
    ...baseListItemButton,
    backgroundColor: '#606c38',
};

export const sidebarFooter = {
    marginTop: 'auto',
    p: 2,
    borderTop: '2px solid #6b705c'
};

export const profileBox = {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
    gap: 1.5
};

export const profileText = {
    fontWeight: '600',
    color: '#fefae0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
};

export const profileEmailText = {
    fontSize: '0.8rem',
    color: 'rgba(254, 250, 224, 0.7)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
};

export const logoutButton = {
    color: '#fefae0',
    borderColor: '#fefae0',
    '&:hover': {
        background: '#6b705c',
        borderColor: '#fefae0'
    }
};