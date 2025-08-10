'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardLayout({ children }) {
  // Router and pathname hooks for navigation and active link detection
  const router = useRouter();
  const pathname = usePathname();

  // State to manage the sidebar's open/closed state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // State to track which navigation category is currently expanded
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Object containing all dashboard categories and their navigation items
  const categories = {
   admin: {
  icon: '',
  items: [
  { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' } // Profile, app-wide settings
  ]
}
,
   /* projectManager: {
      icon: '',
      items: [
        { name: 'Projects ,Project Documentation & Progresss', path: '/dashboard/projectManager/projects' },
        { name: 'Project Teams', path: '/dashboard/projectManager/teams' },
        { name: 'Clients', path: '/dashboard/projectManager/clients' },
        { name: 'Settings', path: '/dashboard/projectManager/settings' }
      ]
    },*/
    auditor: {
      icon: '',
      items: [
        { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
        { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
        { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
        { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
        { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
        { name: 'Settings', path: '/dashboard/auditor/settings' }
      ]
    },
    client: {
      icon: '',
      items: [
        { name: 'Project Details', path: '/dashboard/client/details' },
        { name: 'Raise Query', path: '/dashboard/client/query' },
        { name: 'Meetings,Messages & Notifications', path: '/dashboard/client/messages' },
        { name: 'Settings', path: '/dashboard/client/settings' }
      ]
    },
  };

  // Function to determine the active category based on the current URL path
  const getActiveCategory = () => {
    if (pathname.includes('/admin')) return 'admin';
    if (pathname.includes('/projectManager')) return 'projectManager';
    if (pathname.includes('/auditor')) return 'auditor';
    if (pathname.includes('/client')) return 'client';
    return null;
  };

  // Store the active category in a variable
  const activeCategory = getActiveCategory();

  // Function to toggle a category's expanded state
  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Function to handle the logout action and redirect to the login page
  const handleLogout = () => {
    router.push('/login');
  };

  return (
    // Main container for the entire dashboard layout
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--background)',
      color: 'var(--foreground)'
    }}>
      {/* Sidebar Navigation */}
      <div style={{
        width: sidebarOpen ? '280px' : '80px',
        background: '#283618', // Dark green sidebar background
        borderRight: '1px solid #6b705c', // Subtle border
        padding: '1rem',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)'
      }}>
        {/* Logo and sidebar toggle button section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          padding: '0.5rem',
          gap: '0.5rem'
        }}>
          {/* Display full logo and text when sidebar is open */}
          {sidebarOpen ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0
              }}>
                <Image
                  src="/toroLogo.jpg" // Path to the logo image
                  alt="Toro Track Logo"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h2 style={{ 
                fontWeight: '700',
                color: '#fefae0', // Light text color
                fontSize: '1.25rem',
                whiteSpace: 'nowrap'
              }}>
                Toro Track
              </h2>
            </div>
          ) : (
            // Display only logo image when sidebar is closed
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <Image
                src="/toroLogo.jpg" // Path to the logo image
                alt="Toro Track Icon"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          {/* Button to toggle the sidebar's open/closed state */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#fefae0', // Light button color
              fontSize: '1.2rem',
              flexShrink: 0
            }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation menu for categories and sub-items */}
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {/* Map through each category to create navigation links */}
            {Object.entries(categories).map(([category, { icon, items }]) => (
              <li key={category} style={{ marginBottom: '0.5rem' }}>
                {/* Clickable category header to expand/collapse sub-items */}
                <div 
                  onClick={() => toggleCategory(category)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: activeCategory === category ? '#6b705c' : 'transparent', // Highlight active category
                    color: '#fefae0', // Light text color
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    ':hover': {
                      background: '#6b705c'
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                      marginRight: sidebarOpen ? '0.75rem' : '0',
                      fontSize: '1.1rem'
                    }}>
                      {icon}
                    </span>
                    {sidebarOpen && (
                      <span style={{ 
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {category.replace(/([A-Z])/g, ' $1').trim()} {/* Adds space before capital letters */}
                      </span>
                    )}
                  </div>
                  {/* Expansion indicator icon */}
                  {sidebarOpen && (
                    <span style={{ 
                      transition: 'transform 0.3s ease',
                      transform: expandedCategory === category ? 'rotate(90deg)' : 'rotate(0)'
                    }}>
                      ›
                    </span>
                  )}
                </div>
                
                {/* Horizontal line to separate categories */}
                <div style={{ borderBottom: '1px solid #6b705c', margin: '0.5rem 0' }} />

                {/* Sub-items list, only visible when category is expanded */}
                {sidebarOpen && expandedCategory === category && (
                  <ul style={{ 
                    listStyle: 'none', 
                    paddingLeft: '1.5rem',
                    marginTop: '0.5rem',
                    animation: 'fadeIn 0.3s ease-out'
                  }}>
                    {/* Map through sub-items to create navigation links */}
                    {items.map((item) => (
                      <li key={item.name} style={{ marginBottom: '0.25rem' }}>
                        <Link href={item.path} passHref>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '6px',
                            background: pathname === item.path ? 'rgba(243, 114, 44, 0.2)' : 'transparent', // Highlight active sub-item
                            color: pathname === item.path ? '#f3722c' : '#fefae0', // Orange for active, light for inactive
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              background: '#6b705c'
                            }
                          }}>
                            <span style={{ 
                              marginRight: '0.5rem',
                              fontSize: '0.9rem'
                            }}>
                              
                            </span>
                            <span style={{ fontSize: '0.9rem' }}>
                              {item.name}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile and logout section at the bottom of the sidebar */}
        <div style={{
          padding: '1rem',
          borderTop: '2px solid #6b705c',
          marginTop: 'auto'
        }}>
          {/* User profile picture and details */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              border: '2px solid #f3722c' // Orange border for profile picture
            }}>
              <Image
                src="/toroLogo.jpg" // Path to the user's profile image
                alt="User Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            {/* Display user name and email when sidebar is open */}
            {sidebarOpen && (
              <div style={{ minWidth: 0 }}>
                <p style={{ 
                  fontWeight: '600', 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#fefae0' // Light text color
                }}>
                  John Doe
                </p>
                <p style={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.8, 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgba(254, 250, 224, 0.7)' // Semi-transparent light text
                }}>
                  {activeCategory ? `${activeCategory.replace(/([A-Z])/g, ' $1').trim()}@toro.com` : 'user@toro.com'}
                </p>
              </div>
            )}
          </div>
          {/* Logout button */}
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid #fefae0', // Light border
              borderRadius: '8px',
              color: '#fefae0', // Light text color
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              ':hover': {
                background: '#6b705c' // Darker background on hover
              }
            }}
          >
            {sidebarOpen ? 'Logout' : '→'}
          </button>
        </div>
      </div>

      {/* Main content area where children components are rendered */}
      <main style={{
        flex: 1,
        padding: '2rem',
        background: '#fefae0', // Light, earthy background
        color: '#525252',
        overflowY: 'auto',
        maxHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'

      }}>
        <div style={{
          maxWidth: '1000px',
          marginBottom: '20',
          position: 'relative',
          zIndex: 1
        }}>
          {children} {/* Renders the content of the current page */}
        </div>
      </main>

      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}