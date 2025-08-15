// /features/admin/Permissions/styles.js

export const permissionsCard = {
  mb: 4
};

export const tableContainer = {
  maxHeight: 400
};

export const tableHead = {
  backgroundColor: 'action.hover'
};

export const tableHeaderCell = {
  fontWeight: 700
};

export const tableRow = {
  cursor: 'pointer'
};

export const tableCell = {
  py: 1
};

export const roleIconStack = {
  '& .MuiSvgIcon-root': {
    fontSize: 20
  }
};

export const roleSelect = (color) => ({
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center'
  },
  color: `${color}.main`
});

export const permissionMenuItem = (color) => ({
  '&:hover': {
    backgroundColor: `${color}.light`
  }
});

export const permissionChip = (color) => ({
  display: 'flex',
  alignItems: 'center',
  color: `${color}.main`
});

export const summaryCard = {
  mt: 4,
  p: 2
};

export const summaryCardContent = {
  display: 'flex',
  flexDirection: 'column'
};

export const summaryIconAvatar = (color) => ({
  bgcolor: `${color}.main`,
  width: 40,
  height: 40
});

export const saveButtonBox = {
  mt: 4,
  textAlign: 'right'
};

export const saveButton = {
  px: 4
};
