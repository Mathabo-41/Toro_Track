import { colors } from '@mui/material';

export const mainBox = {
  display: 'flex',
  height: '100vh',
  backgroundColor: colors.grey[50],
};

export const drawerPaper = {
  width: 240,
  boxSizing: 'border-box',
};

export const drawerHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 64,
  backgroundColor: colors.primary.main,
  color: colors.common.white,
};

export const listItemButton = {
  justifyContent: 'flex-start',
  px: 2,
};

export const activeListItemButton = {
  backgroundColor: colors.primary.light,
  fontWeight: 'bold',
};

export const mainContentBox = {
  flexGrow: 1,
  ml: 30,
  p: 3,
  overflow: 'auto',
};

export const headerBox = {
  mb: 3,
};

export const headerTitle = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
};

export const headerIcon = {
  mr: 1,
};

export const headerSubtitle = {
  color: colors.text.secondary,
};

export const newQueryCard = { mb: 3 };
export const newQueryTitle = { fontWeight: 600, mb: 2 };
export const newQueryTextField = { mb: 2 };
export const newQueryInputLabel = { mb: 1 };
export const newQuerySelect = { backgroundColor: colors.common.white };
export const newQuerySelectOutline = { borderColor: colors.grey[300] };
export const attachFileButton = { textTransform: 'none', mb: 2 };
export const attachedFileBox = {
  display: 'flex',
  alignItems: 'center',
  mt: 1,
};
export const attachedFileText = { mr: 1 };
export const removeFileButton = {};
export const submitButton = { textTransform: 'none' };

export const previousQueriesCard = { mb: 3 };
export const previousQueriesTitle = { fontWeight: 600, mb: 2 };
export const previousQueriesTableContainer = { maxHeight: 400 };
export const previousQueriesTableCellHeader = { fontWeight: 'bold' };
export const previousQueriesTableCell = { cursor: 'pointer' };
export const queryRow = { cursor: 'pointer' };
export const noQueriesBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 200,
};
export const noQueriesText = { color: colors.text.secondary };

export const queryCard = { mb: 3 };
export const backButton = { mb: 2, textTransform: 'none' };
export const queryDetailTitle = { fontWeight: 600 };
export const queryStatusChip = (status) => ({
  backgroundColor:
    status === 'resolved' ? colors.success.main : colors.warning.main,
  color: colors.common.white,
  textTransform: 'capitalize',
});
export const queryInfoBox = { mb: 2 };
export const queryInfoLabel = { fontWeight: 500, mt: 1 };
export const queryInfoValue = { mb: 1 };
export const attachmentsBox = { mt: 2, mb: 2 };
export const attachmentsTableContainer = { mb: 2 };
export const attachmentFileIcon = { mr: 1 };
export const downloadButton = { textTransform: 'none' };
export const responseBox = { mt: 2, mb: 2 };
export const responseLabel = { fontWeight: 500, mb: 1 };
