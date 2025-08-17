// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

// hardcode project data
const dummyProjectData = {
  id: 'PRJ-2023-045',
  name: 'E-commerce Website Redesign',
  description: 'Complete redesign of the existing e-commerce platform with modern UI/UX and improved checkout flow.',
  status: 'active',
  progress: 65,
  startDate: '2023-11-15',
  deadline: '2024-03-20',
  budget: 'R 28,500',
  team: [
    { id: 1, name: 'Thabo Johnson', role: 'Project Manager', avatar: '/avatars/1.jpg' },
    { id: 2, name: 'Sarah Mokoena', role: 'UI/UX Designer', avatar: '/avatars/2.jpg' },
    { id: 3, name: 'Michael B.Jordan', role: 'Frontend Developer', avatar: '/avatars/3.jpg' },
    { id: 4, name: 'David Wilson', role: 'Backend Developer', avatar: '/avatars/4.jpg' },
  ],
  milestones: [
    { id: 1, name: 'Discovery Phase', status: 'completed', dueDate: '2023-12-01' },
    { id: 2, name: 'UI/UX Design', status: 'completed', dueDate: '2024-01-15' },
    { id: 3, name: 'Frontend Development', status: 'in-progress', dueDate: '2024-02-28' },
    { id: 4, name: 'Backend Integration', status: 'pending', dueDate: '2024-03-10' },
    { id: 5, name: 'Testing & Launch', status: 'pending', dueDate: '2024-03-20' },
  ],
  files: [
    { id: 1, name: 'Project Scope.pdf', type: 'pdf', size: '2.4 MB', date: '2023-11-10' },
    { id: 2, name: 'Wireframes.sketch', type: 'sketch', size: '5.1 MB', date: '2023-12-05' },
    { id: 3, name: 'Style Guide.pdf', type: 'pdf', size: '3.2 MB', date: '2024-01-20' },
  ],
};

const dummyComments = [
  { id: 1, user: 'Thabo Johnson', text: 'The initial designs have been approved by the client. Moving to development phase.', time: '2 days ago' },
  { id: 2, user: 'You', text: 'The checkout flow needs some adjustments based on our last discussion.', time: '1 day ago' },
];

/**
 * Simulates an API call to fetch project data.
 * @returns {Promise<object>} A promise that resolves with the project data.
 */
export const fetchProjectData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyProjectData);
    }, 500); // Simulate network delay
  });
};

/**
 * Simulates an API call to fetch discussion comments.
 * @returns {Promise<Array>} A promise that resolves with the comments data.
 */
export const fetchComments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyComments);
    }, 500); // Simulate network delay
  });
};

/**
 * Simulates an API call to post a new comment.
 * @param {string} newComment The new comment to post.
 * @returns {Promise<Array>} A promise that resolves with the updated list of comments.
 */
export const postComment = (newComment) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCommentObject = {
        id: Math.random(),
        user: 'You',
        text: newComment,
        time: 'Just now',
      };
      const updatedComments = [...dummyComments, newCommentObject];
      resolve(updatedComments);
    }, 500);
  });
};