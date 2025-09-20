// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

// Hardcode, mock API function to fetch project data.
export const getProjects = async () => {
  return [
    {
      id: 1,
      name: 'Website Redesign',
      client: 'Acme Corp',
      status: 'low priority',
      dueDate: '2023-12-15',
      progress: 75,
      team: ['JD', 'AS', 'MP']
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'Globex Inc',
      status: 'pending',
      dueDate: '2024-02-28',
      progress: 30,
      team: ['AS', 'TP', 'RW']
    },
    {
      id: 3,
      name: 'E-commerce Platform',
      client: 'Initech',
      status: 'completed',
      dueDate: '2023-10-10',
      progress: 100,
      team: ['JD', 'MP']
    },
    {
      id: 4,
      name: 'CRM System',
      client: 'Umbrella Corp',
      status: 'pending',
      dueDate: '2024-05-20',
      progress: 10,
      team: ['TP', 'RW', 'AS']
    }
  ];
};

// Hardcode, Mock API function to fetch team members data.
export const getTeamMembers = async () => {
  return [
    { id: 1, name: 'Mandla Mbele', initials: 'MM' },
    { id: 2, name: 'Alice Smith', initials: 'AS' },
    { id: 3, name: 'Michael P.', initials: 'MP' },
    { id: 4, name: 'Taylor P.', initials: 'TP' },
    { id: 5, name: 'Robert W.', initials: 'RW' }
  ];
};