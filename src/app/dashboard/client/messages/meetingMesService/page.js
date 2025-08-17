// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.

// hardcode "dummy code"
const DUMMY_TEAM_MEMBERS = [
  { id: 1, name: 'Alex Johnson', role: 'Project Manager', avatar: '/avatars/1.jpg', online: true },
  { id: 2, name: 'Sarah Chen', role: 'UI/UX Designer', avatar: '/avatars/2.jpg', online: false },
  { id: 3, name: 'Michael Brown', role: 'Frontend Dev', avatar: '/avatars/3.jpg', online: true }
];

const DUMMY_CONVERSATIONS = [
  {
    id: 1,
    with: 'Thabo Johnson',
    lastMessage: 'Let me check the timeline and get back to you',
    time: '2h ago',
    unread: 3,
    messages: [
      { sender: 'Thabo Johnson', text: 'Hi there! How can I help?', time: '10:30 AM', read: true },
      { sender: 'You', text: 'When will the next design mockups be ready?', time: '10:32 AM', read: true },
      { sender: 'Thabo Johnson', text: 'We\'re targeting Friday for the first round', time: '11:45 AM', read: true },
      { sender: 'Thabo Johnson', text: 'Let me check the timeline and get back to you', time: '2h ago', read: false }
    ]
  },
  {
    id: 2,
    with: 'Sarah Mokoena',
    lastMessage: 'I\'ve updated the color scheme per our discussion',
    time: '1d ago',
    unread: 0,
    messages: [
      { sender: 'Sarah Mokoena', text: 'Here are the initial color concepts', time: 'Yesterday', read: true },
      { sender: 'You', text: 'I like option 2 but can we try darker blues?', time: 'Yesterday', read: true },
      { sender: 'Sarah Mokoena', text: 'I\'ve updated the color scheme per our discussion', time: '1d ago', read: true }
    ]
  }
];

const DUMMY_NOTIFICATIONS = [
  { id: 1, text: 'New project milestone added', time: '30m ago', read: false, type: 'project' },
  { id: 2, text: 'Meeting scheduled for tomorrow at 2pm', time: '2h ago', read: true, type: 'meeting' },
  { id: 3, text: 'Alex Johnson replied to your query', time: '5h ago', read: true, type: 'query' }
];

const DUMMY_MEETINGS = [
  { id: 1, title: 'Design Review', date: 'Tomorrow, 2:00 PM', participants: ['Alex', 'Sarah'], status: 'confirmed' },
  { id: 2, title: 'Project Kickoff', date: 'Jan 15, 10:00 AM', participants: ['Full Team'], status: 'completed' }
];

// Asynchronous functions to simulate API calls
export const fetchTeamMembers = async () => {
  return new Promise(resolve => setTimeout(() => resolve(DUMMY_TEAM_MEMBERS), 500));
};

export const fetchConversations = async () => {
  return new Promise(resolve => setTimeout(() => resolve(DUMMY_CONVERSATIONS), 500));
};

export const fetchNotifications = async () => {
  return new Promise(resolve => setTimeout(() => resolve(DUMMY_NOTIFICATIONS), 500));
};

export const fetchMeetings = async () => {
  return new Promise(resolve => setTimeout(() => resolve(DUMMY_MEETINGS), 500));
};

export const sendMessage = async ({ conversationId, text }) => {
  console.log(`Sending message to conversation ${conversationId}: ${text}`);
  // Simulate a network request
  return new Promise(resolve => setTimeout(() => {
    // where we send message to API
    const sentMessage = {
      sender: 'You',
      text: text,
      time: 'Just now',
      read: true,
    };
    console.log('Message sent successfully:', sentMessage);
    resolve(sentMessage);
  }, 500));
};