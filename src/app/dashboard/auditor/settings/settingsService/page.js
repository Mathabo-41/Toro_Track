// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

// hardcode "dummy code"
const dummySettings = {
  audit: {
    retentionPeriod: 90,
    immutableMode: true,
    autoCapture: {
      login: true,
    },
    timezone: "UTC",
  },
  delivery: {
    detailLevel: "full",
    allowManualOverride: false,
  },
  license: {
    alertThresholds: "30,60,90",
    usageWarningLevel: 90,
  },
  asset: {
    defaultStatuses: "In transit,Deployed",
    enableSignatureCapture: true,
  },
  report: {
    formats: "PDF,CSV",
    schedule: "Monthly",
  },
  compliance: {
    checklists: "Software audit,Hardware disposal",
    alertChannels: "Email",
  },
  access: {
    readOnlyMode: true,
    customRoles: "Junior Auditor,Senior Auditor",
  },
};

/**
 * Simulates an asynchronous API call to fetch current settings.
 * @returns {Promise<Object>} A promise that resolves with the settings data.
 */
export async function fetchSettings() {
  console.log("Fetching settings from API...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummySettings);
    }, 500); // Simulate network delay
  });
}

/**
 * Simulates an asynchronous API call to update settings.
 * @param {Object} newSettings - The new settings data to save.
 * @returns {Promise<Object>} A promise that resolves with the updated settings data.
 */
export async function updateSettings(newSettings) {
  console.log("Saving new settings to API:", newSettings);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newSettings);
    }, 500); // Simulate network delay
  });
}