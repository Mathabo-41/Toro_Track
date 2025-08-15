// features/admin/TeamsUsers/styles.js

// Header
export const usersPageHeaderText = {
  display: 'flex',
  alignItems: 'center',
  mb: 2
};

export const usersPageHeaderIcon = {
  mr: 1,
  color: 'primary.main'
};

// Search & Buttons
export const searchField = {
  backgroundColor: 'background.paper'
};

export const addUserButton = {
  textTransform: 'none'
};

// Users Table
export const usersCard = {
  mb: 4
};

export const usersTableContainer = {
  maxHeight: 400
};

export const usersTableHeader = {
  backgroundColor: 'action.hover'
};

export const usersTableHeaderCell = {
  fontWeight: 'bold'
};

export const usersTableRow = {
  '&:hover': {
    backgroundColor: 'action.selected'
  }
};

export const usersTableCell = {
  py: 1,
  px: 2
};

export const userAvatar = {
  width: 32,
  height: 32
};

export const roleChip = (role) => {
  const colorMap = {
    Admin: 'warning.main',
    'Project Manager': 'info.main',
    'Team Lead': 'success.main',
    Member: 'text.secondary'
  };
  return {
    backgroundColor: colorMap[role],
    color: 'common.white',
    textTransform: 'capitalize'
  };
};

// Context Menu
export const menuPaper = {
  minWidth: 180
};

export const menuItem = {
  py: 1
};

export const menuDivider = {
  my: 1
};

// Team Stats Cards
export const teamStatsCard = {
  height: '100%'
};

export const teamStatsValue = (color) => ({
  color: `${color}.main`,
  mt: 1
});

export const teamStatsAvatar = (bg, color) => ({
  bgcolor: bg,
  color: `${color}.main`
});

// Dialog (Add User)
export const createUserDialogPaper = {
  p: 2
};

export const createUserDialogTitle = {
  m: 0,
  p: 2
};

export const dialogCloseButton = {
  position: 'absolute',
  right: 8,
  top: 8
};

export const createUserDialogContent = {
  p: 2
};

export const dialogTextField = {
  mb: 2
};

export const dialogFormControl = {
  mb: 2
};

export const dialogInputLabel = {
  ml: 1
};

export const dialogSelect = {};

export const dialogSelectMenuItem = {};

export const dialogActions = {
  px: 3,
  pb: 2
};

export const dialogCancelButton = {
  textTransform: 'none'
};

export const createUserButton = {
  textTransform: 'none'
};
