// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

//hardcode
const complianceFeaturesDummyData = [
  {
    title: 'Compliance Checklist Templates',
    description:
      'Pre-define steps for software license audits, hardware disposal protocols, and data-protection reviews.',
  },
  {
    title: 'Role-Based Alerts',
    description:
      'Trigger notifications when required documentation is missing or retention periods are about to expire.',
  },
  {
    title: 'Role-Based Access Controls',
    description:
      'Ensure auditors have read-only access to production systems, and that sensitive actions are logged and restricted.',
  },
  {
    title: 'Reporting & Analytics',
    description:
      'Generate detailed reports on compliance status and identify areas of concern.',
  },
  {
    title: 'Audit Trail Logging',
    description:
      'Maintain a chronological record of all actions for accountability and verification.',
  },
];

/**
 * Simulates an asynchronous API call to fetch compliance features.
 * @returns {Promise<Array<Object>>} A promise that resolves with the compliance features data.
 */
export async function fetchComplianceFeatures() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(complianceFeaturesDummyData);
    }, 500); // Simulate network delay
  });
}