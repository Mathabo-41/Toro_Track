// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

// A simple function to simulate a network delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Dummy data to simulate server responses
const DUMMY_ASSET_TYPES = [
  { id: 1, name: 'Type 1' },
  { id: 2, name: 'Type 2' },
  { id: 3, name: 'Type 3' },
];

const DUMMY_CLIENTS = [
  { id: 1, name: 'Client A' },
  { id: 2, name: 'Client B' },
  { id: 3, name: 'Client C' },
];

/**
 * Service function to get available report options.
 * @returns {Promise<{ assetTypes: Array, clients: Array }>}
 */
export async function getReportOptions() {
  await sleep(500);
  return {
    assetTypes: DUMMY_ASSET_TYPES,
    clients: DUMMY_CLIENTS,
  };
}

/**
 * Service function to simulate exporting a PDF report.
 * @param {object} params
 * @returns {Promise<string>}
 */
export async function exportPdfReport(params) {
  await sleep(1000);
  console.log('Exporting PDF with params:', params);
  return 'PDF report generated successfully.';
}

/**
 * Service function to simulate exporting a CSV report.
 * @param {object} params
 * @returns {Promise<string>}
 */
export async function exportCsvReport(params) {
  await sleep(1000);
  console.log('Exporting CSV with params:', params);
  return 'CSV report generated successfully.';
}

/**
 * Service function to simulate setting a scheduled report.
 * @param {object} params
 * @returns {Promise<string>}
 */
export async function setReportSchedule(params) {
  await sleep(1000);
  console.log('Setting schedule with params:', params);
  return 'Report schedule set successfully.';
}

/**
 * Service function to simulate generating an on-demand audit snapshot.
 * @param {object} params
 * @returns {Promise<string>}
 */
export async function generateAuditSnapshot(params) {
  await sleep(1000);
  console.log('Generating snapshot with params:', params);
  return 'Audit snapshot generated successfully.';
}