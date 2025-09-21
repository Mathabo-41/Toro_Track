// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

// hardcode for the users list
export const usersData = [
  { id: 1, name: 'Mandla Mbele', email: 'mbelemandla@example.com', role: 'Admin', team: 'Management', tasks: ['Review projects'] },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Project Manager', team: 'Development', tasks: ['Lead team A'] },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Developer', team: 'Frontend', tasks: ['Implement UI'] },
];

// hardcode for available teams
export const teamsData = ['Management', 'Development', 'Frontend', 'Backend', 'Design'];

// hardcode for common tasks
export const tasksData = ['Review projects', 'Lead team A', 'Implement UI', 'API development', 'Design mockups'];

// hardcode for the sidebar navigation menu
export const adminMenuData = [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Settings', path: '/dashboard/admin/settings' },
];