'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Categories and their sub-items
  const categories = {
   admin: {
  icon: '👑',
  items: [
    { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
  { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
  { name: 'Projects', path: '/dashboard/admin/projects' },
  { name: 'Teams & Users', path: '/dashboard/admin/users' },
  { name: 'Permissions', path: '/dashboard/admin/permissions' },
  { name: 'Performance Reports', path: '/dashboard/admin/reports' },
  { name: 'Settings', path: '/dashboard/admin/settings' }                    // Profile, app-wide settings
  ]
}
,
    projectManager: {
      icon: '👔',
      items: [
        { name: 'Projects ,Project Documentation & Progresss', path: '/dashboard/projectManager/projects' },
        { name: 'Project Teams', path: '/dashboard/projectManager/teams' },
        { name: 'Clients', path: '/dashboard/projectManager/clients' },
        { name: 'Settings', path: '/dashboard/projectManager/settings' }
      ]
    },
    auditor: {
      icon: '🔍',
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
      icon: '👔',
      items: [
        { name: 'Project Details', path: '/dashboard/client/details' },
        { name: 'Raise Query', path: '/dashboard/client/query' },
        { name: 'Meetings,Messages & Notifications', path: '/dashboard/client/messages' },
        { name: 'Settings', path: '/dashboard/client/settings' }
      ]
    },
  };

  // Determine active category based on current route
  const getActiveCategory = () => {
    if (pathname.includes('/admin')) return 'admin';
    if (pathname.includes('/projectManager')) return 'projectManager';
    if (pathname.includes('/auditor')) return 'auditor';
    if (pathname.includes('/client')) return 'client';
    return null;
  };

  const activeCategory = getActiveCategory();

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--background)',
      color: 'var(--foreground)'
    }}>
      {/* Sidebar Navigation */}
      <div style={{
        width: sidebarOpen ? '280px' : '80px',
        background: 'var(--background)',
        borderRight: '1px solid #e2e8f0',
        padding: '1rem',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)'
      }}>
        {/* Logo Section with Image */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          padding: '0.5rem',
          gap: '0.5rem'
        }}>
          {sidebarOpen ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* actual image path */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0
              }}>
                <Image
                  src="/toroLogo.jpg" //  //  logo path
                  alt="Toro Track Logo"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h2 style={{ 
                fontWeight: '700',
                color: 'var(--brand-color)',
                fontSize: '1.25rem',
                whiteSpace: 'nowrap'
              }}>
                Toro Track
              </h2>
            </div>
          ) : (
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <Image
                src="/toroLogo.jpg" // Update with your icon path
                alt="Toro Track Icon"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--foreground)',
              fontSize: '1.2rem',
              flexShrink: 0
            }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Category Navigation */}
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(categories).map(([category, { icon, items }]) => (
              <li key={category} style={{ marginBottom: '0.5rem' }}>
                {/* Category Header */}
                <div 
                  onClick={() => toggleCategory(category)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: activeCategory === category ? 'var(--brand-color)' : 'transparent',
                    color: activeCategory === category ? 'white' : 'var(--foreground)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    ':hover': {
                      background: activeCategory === category ? 'var(--brand-color)' : 'rgba(0,0,0,0.05)'
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
                  {sidebarOpen && (
                    <span style={{ 
                      transition: 'transform 0.3s ease',
                      transform: expandedCategory === category ? 'rotate(90deg)' : 'rotate(0)'
                    }}>
                      ›
                    </span>
                  )}
                </div>

                {/* Sub-items */}
                {sidebarOpen && expandedCategory === category && (
                  <ul style={{ 
                    listStyle: 'none', 
                    paddingLeft: '1.5rem',
                    marginTop: '0.5rem',
                    animation: 'fadeIn 0.3s ease-out'
                  }}>
                    {items.map((item) => (
                      <li key={item.name} style={{ marginBottom: '0.25rem' }}>
                        <Link href={item.path} passHref>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '6px',
                            background: pathname === item.path ? 'rgba(49, 130, 206, 0.2)' : 'transparent',
                            color: pathname === item.path ? 'var(--brand-color)' : 'var(--foreground)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              background: 'rgba(0,0,0,0.05)'
                            }
                          }}>
                            <span style={{ 
                              marginRight: '0.5rem',
                              fontSize: '0.9rem'
                            }}>
                              •
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

        {/* User Profile Section with Picture */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid #e2e8f0',
          marginTop: 'auto'
        }}>
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
              border: '2px solid var(--brand-color)'
            }}>
              <Image
                src="/toroLogo.jpg" // user image path
                alt="User Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            {sidebarOpen && (
              <div style={{ minWidth: 0 }}>
                <p style={{ 
                  fontWeight: '600', 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  John Doe
                </p>
                <p style={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.8, 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {activeCategory ? `${activeCategory.replace(/([A-Z])/g, ' $1').trim()}@toro.com` : 'user@toro.com'}
                </p>
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid var(--brand-color)',
              borderRadius: '8px',
              color: 'var(--brand-color)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              ':hover': {
                background: 'rgba(49, 130, 206, 0.1)'
              }
            }}
          >
            {sidebarOpen ? 'Logout' : '→'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        padding: '2rem',
        background: 'var(--background)',
        color: 'var(--foreground)',
        overflowY: 'auto',
        maxHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'

      }}>
        {/*background image/pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
         right: 0,
          bottom: 0,
          backgroundImage: 'url(/toroLogo.jpg)', // Add your pattern
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
transform: 'scale(0.)',

          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          pointerEvents: 'none',
          zIndex: 0,
          //filter: 'blur(1px)', // Optional: adds depth effect
          transition: 'all 0.3s ease' // Smooth resizing
        }} />
        
        <div style={{
          maxWidth: '1000px',
          //maxHeight: '1000px',
          marginBottom: '20',
          position: 'relative',
          zIndex: 1
        }}>
          {children}
        </div>
      </main>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}