// styles.js

import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  TableCell,
  TableContainer,
  AppBar,
  Toolbar,
  TextField,
  Select,
  Button,
  Paper,
  Card,
  List,
  ListItem,
  Dialog,
  Chip,
  Container,
  InputBase
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

/* ──────────────── Audit Trail & Logging Styles ──────────────── */
export const AuditTrailContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  margin: 0,
  padding: 0,
  width: "100%",
  minHeight: "100vh",
  boxSizing: "border-box",
  fontFamily: "monospace",
}));


export const AuditTrailCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "monospace",
  color: "#000",
}));

export const AuditTrailTitleBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#FF6B00",
  color: "#000",
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: "monospace",
}));

export const AuditTrailTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  fontFamily: "monospace",
  color: "#000",
  whiteSpace: "nowrap",
}));

export const AuditTrailSearch = styled("input")(({ theme }) => ({
  fontFamily: "monospace",
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "0.9rem",
  width: "500px",
}));

export const AuditTrailTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: "#fff",
  fontFamily: "monospace",
}));

export const AuditTrailHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#FF6B00",
  color: "#000",
  fontFamily: "monospace",
}));

export const AuditTrailSerialCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "monospace",
  color: theme.palette.text.primary,
}));


/* ──────────────── License & Configuration Tracking Styles ──────────────── */

// Root container
export const LicenseTrackingContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  color: "#000000",
  minHeight: "100vh",
  padding: theme.spacing(2),
  fontFamily: "monospace",
}));

// AppBar
export const LicenseAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#FF4D00",
  color: "#000000",
}));

// Title Text
export const LicenseAppTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1.25rem",
  whiteSpace: "nowrap",
}));

// Toolbar container
export const LicenseToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

// Flex container for controls
export const LicenseControls = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

// Search bar container
export const LicenseSearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f1f1f1",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "500px",
  },
}));

// Search icon wrapper
export const LicenseSearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// Search input
export const LicenseSearchInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

// Section box (common for left/right/bottom sections)
export const LicenseSectionBox = styled(Box)(({ theme }) => ({
  border: "1px solid #ccc",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  backgroundColor: "#fff",
}));

// Section titles
export const LicenseSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

/* Dashboard Style */

// Optional: Paper wrapper for the dashboard area
export const LicenseDashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#fff",
}));

// Optional: Box for summary row
export const LicenseDashboardSummaryRow = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: theme.spacing(2),
}));

export const LicenseDashboardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1.25rem",
  marginBottom: theme.spacing(2),
}));

/* Expiry & Renewal Alerts Styles */

export const RenewalCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#fff",
}));

export const RenewalTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

export const RenewalSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const LicenseChip = styled(Chip)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 500,
}));

export const LicenseKeyList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

export const LicenseKeyItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const MoreText = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  fontStyle: "italic",
  paddingLeft: theme.spacing(2),
  cursor: "pointer",
  color: theme.palette.primary.main,
}));

/* ──────────────── Asset Status & Documentation ──────────────── */
// Container with white background and black text
export const AssetStatusContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  color: "#000000",
  minHeight: "100vh",
  width: "100%",      
  padding: theme.spacing(4),
  boxSizing: "border-box",
  fontFamily: "monospace",
}));


// Section paper wrapper
export const AssetStatusPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

// Title for page main header
export const AssetStatusTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
}));

// Subtitle under main header
export const AssetStatusSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

// Section headers inside the page
export const AssetStatusSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
}));

/* ──────────────── Reporting & Export ──────────────── */
// Root container for the page
export const ReportingExportContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  color: "#000000",
  minHeight: "100vh",
  padding: theme.spacing(4),
  fontFamily: "monospace",
}));

// Main title
export const ReportingExportTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "2rem",
  marginBottom: theme.spacing(1),
}));

// Subtitle
export const ReportingExportSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  marginBottom: theme.spacing(3),
}));

// Section paper wrapper
export const ReportingExportSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  backgroundColor: "#ffffff",
}));

// Section title
export const ReportingExportSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1.2rem",
  marginBottom: theme.spacing(1),
}));

// Section description text
export const ReportingExportSectionDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  marginBottom: theme.spacing(2),
}));

// Button styles (if you want to customize further)
export const ReportingExportButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 500,
}));

export const ReportingExportTitleBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#FF6B00",
  color: "#000",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  fontFamily: "monospace",
}));

export const ReportingExportTitleText = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  fontFamily: "monospace",
  color: "#000",
  whiteSpace: "nowrap",
}));

export const ReportingExportSearch = styled("input")(({ theme }) => ({
  fontFamily: "monospace",
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "0.9rem",
  width: "500px",
}));

/* ──────────────── Compliance & Alerting ──────────────── */
// Root container
export const ComplianceContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  color: "#000000",
  minHeight: "100vh",
  paddingBottom: theme.spacing(8),
  paddingTop: 0,
  fontFamily: "monospace",
}));

// Title text
export const ComplianceTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: theme.spacing(1),
})) ;

// Subtitle/Intro text
export const ComplianceSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  marginBottom: theme.spacing(4),
})) ;

// Paper wrapper for features list
export const CompliancePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#ffffff",
})) ;

// Feature title
export const ComplianceFeatureTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 600,
})) ;

// Feature description
export const ComplianceFeatureDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  color: theme.palette.text.primary,
})) ;

// Optional: List item customization (if needed)
export const ComplianceListItem = styled(ListItem)(({ theme }) => ({
  alignItems: "flex-start",
})) ;

// Title bar container
export const ComplianceTitleBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#FF6B00",
  color: "#000",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  fontFamily: "monospace",
}));

// Title text inside title bar
export const ComplianceTitleText = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  fontFamily: "monospace",
  color: "#000",
  whiteSpace: "nowrap",
}));

// Search input in title bar
export const ComplianceSearchInput = styled("input")(({ theme }) => ({
  fontFamily: "monospace",
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "0.9rem",
  width: "500px",
}));

/* ──────────────── Settings Styles ──────────────── */
export const SettingsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  color: "#000000",
  minHeight: "100vh",
  width: "100%",
  padding: theme.spacing(4),
  boxSizing: "border-box",
  fontFamily: "monospace",
}));

// Title bar container
export const SettingsTitleBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#FF6B00",
  color: "#000000",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(4),
}));

// Title text
export const SettingsTitleText = styled("h1")(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  fontFamily: "monospace",
  margin: 0,
}));

// Search input
export const SettingsSearch = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  maxWidth: 360,
  border: "1px solid #ccc",
  fontFamily: "monospace",
}));