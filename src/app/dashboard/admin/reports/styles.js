// features/admin/PerformanceReports/styles.js

export const reportsMainContentBox = {
  flexGrow: 1,
  p: 3,
  BorderColor: '#525252',
   border: '1px solid',
  backgroundColor: '#fefaf0'
};

export const reportsPageHeaderText = {
  display: 'flex',
  alignItems: 'center',
  mb: 1
};

export const reportsPageHeaderIcon = {
  mr: 1,
  color: 'primary.main'
};

export const reportsMetricCard = {
  height: '100%'
};

export const reportsMetricTitle = {
  color: 'text.secondary'
};

export const reportsMetricValue = {
  mt: 1,
  mb: 1
};

export const reportsTrend = {
  mt: 1
};

export const reportsTrendIconUp = {
  color: 'success.main'
};

export const reportsTrendIconDown = {
  color: 'error.main'
};

export const reportsTrendText = (trend) => ({
  color: trend === 'up' ? 'success.main' : 'error.main'
});

export const reportsMetricAvatar = {
  bgcolor: 'info.main'
};

export const reportsChartCard = {
  height: '100%',
  BorderColor: '#525252',
   border: '1px solid',
   backgroundColor: '#fefaf0'
};

export const reportsChartTitle = {
  display: 'flex',
  alignItems: 'center',
  mb: 2
};

export const reportsChartBox = {
  height: 240,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const reportsRecentActivitiesCard = {
  mb: 4,
  BorderColor: '#525252',
   border: '1px solid',
   backgroundColor: '#fefaf0'
};

export const reportsTableContainer = {
  maxHeight: 300,
  BorderColor: '#525252',
   border: '1px solid',
   backgroundColor: '#fefaf0'
};

export const reportsTableHeader = {
  BorderColor: '#525252',
   border: '1px solid',
   backgroundColor: '#fefaf0'
};

export const reportsTableHeaderCell = {
   backgroundColor: '#fefaf0',
  fontWeight: 'bold'
};

export const reportsTableRow = {
  '&:hover': {
    backgroundColor: 'action.selected'
  }
};

export const reportsTableCell = {
  py: 1,
  px: 2
};

export const reportsStatusChip = (status) => ({
  backgroundColor:
    status === 'completed'
      ? 'success.light'
      : status === 'pending'
      ? 'warning.light'
      : 'info.light',
  color:
    status === 'completed'
      ? 'success.main'
      : status === 'pending'
      ? 'warning.main'
      : 'info.main',
  textTransform: 'capitalize'
});

export const reportsExportCard = {
   backgroundColor: '#fefaf0',
   BorderColor: '#525252',
   border: '1px solid',
  p: 2,
  mt: 4
};

export const reportsExportButton = {
  color: '#fefaf0',
  backgroundColor:'#283618',
  BorderColor: '#fefaf0',
  border: '1px solid',
  '&:hover': {
    backgroundColor: '#31572c', 
    color: '#fefaf0',
    BorderColor: '#fefaf0',
    border: '1px solid',
  }
}
