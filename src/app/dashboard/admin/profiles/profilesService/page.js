// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

export async function fetchClients() {
  // hardcode
  return [
    {
      id: 1,
      name: 'Acme Corporation',
      contact: 'john.doe@acme.com',
      projects: 5,
      status: 'premium',
      logo: '/toroLogo.jpg',
    },
    {
      id: 2,
      name: 'Globex Inc',
      contact: 'jane.smith@globex.com',
      projects: 3,
      status: 'active',
      logo: '/toroLogo.jpg',
    },
    {
      id: 3,
      name: 'Toro Informatics',
      contact: 'toroi@toroinfo.com',
      projects: 2,
      status: 'active',
      logo: '/toroLogo.jpg',
    },
    {
      id: 4,
      name: 'Umbrella Corp',
      contact: 'alice.wesker@umbrella.com',
      projects: 7,
      status: 'premium',
      logo: '/toroLogo.jpg',
    },
    {
      id: 5,
      name: 'Wayne Enterprises',
      contact: 'bruce.wayne@wayne.com',
      projects: 4,
      status: 'inactive',
      logo: '/toroLogo.jpg',
    },
  ];
}