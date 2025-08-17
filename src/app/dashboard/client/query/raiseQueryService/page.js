// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

// hardcode query data
const DUMMY_QUERIES = [
  {
    id: 'QRY-001',
    title: 'Checkout Page Issue',
    status: 'resolved',
    date: '2023-11-15',
    category: 'Technical',
    description: 'The checkout page is not loading properly on mobile devices. The payment button disappears when scrolling.',
    response: 'This has been fixed in the latest update. Please clear your cache and try again.',
    attachments: []
  },
  {
    id: 'QRY-002',
    title: 'Design Revision Request',
    status: 'in-progress',
    date: '2023-12-03',
    category: 'Design',
    description: 'Can we make the product images larger on the category pages? They seem too small compared to the mockups.',
    response: 'Our design team is reviewing this request. We\'ll get back to you by Friday.',
    attachments: [
      { name: 'mockup-v1.pdf', size: '2.4 MB' }
    ]
  },
  {
    id: 'QRY-003',
    title: 'API Documentation',
    status: 'pending',
    date: '2023-12-10',
    category: 'Documentation',
    description: 'Where can I find the updated API documentation for the new endpoints?',
    response: '',
    attachments: []
  }
];

// Asynchronous function to simulate fetching queries
export const fetchQueries = async () => {
  return new Promise(resolve => setTimeout(() => resolve(DUMMY_QUERIES), 500));
};

// Asynchronous function to simulate submitting a new query
export const submitQuery = async (newQuery) => {
  console.log('Submitting new query:', newQuery);
  // Simulate a network request
  return new Promise(resolve => setTimeout(() => {
    // where we send query to database, so that admin can fetch it and read the query, then respond to the client
    const submittedQuery = {
      ...newQuery,
      id: `QRY-${DUMMY_QUERIES.length + 1}`,
    };
    console.log('Query submitted successfully:', submittedQuery);
    DUMMY_QUERIES.push(submittedQuery); // Add to hardcode data for demonstration
    resolve(submittedQuery);
  }, 500));
};