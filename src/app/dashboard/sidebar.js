'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar({ pathname }) {
  const router = useRouter();

  // State is now fully encapsulated within the Sidebar component
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = {
    admin: {
      items: [
        { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
        { name: 'Performance Reports', path: '/dashboard/admin/reports' },
        { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
        { name: 'Projects', path: '/dashboard/admin/projects' },
        { name: 'Teams & Users', path: '/dashboard/admin/users' },
       //{ name: 'Permissions', path: '/dashboard/admin/permissions' },
        { name: 'Settings', path: '/dashboard/admin/settings' }
      ]
    },
    auditor: {
      items: [
        { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
        { name: 'License Configuration', path: '/dashboard/auditor/licenseConfig' },
        { name: 'Asset Status Docs', path: '/dashboard/auditor/assetStatusDoc' },
        { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
        { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
        { name: 'Settings', path: '/dashboard/auditor/settings' }
      ]
    },
    client: {
      items: [
        { name: 'Project Details', path: '/dashboard/client/details' },
        { name: 'Raise Query', path: '/dashboard/client/query' },
        { name: 'Agenda', path: '/dashboard/client/messages' },
        { name: 'Settings', path: '/dashboard/client/settings' }
      ]
    },
  };
  
  // OPTIMIZATION: Memoize the active category calculation. This logic now only runs when the 'pathname' prop changes.
  const activeCategory = useMemo(() => {
    if (pathname.includes('/admin')) return 'admin';
    if (pathname.includes('/auditor')) return 'auditor';
    if (pathname.includes('/client')) return 'client';
    return null;
  }, [pathname]);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div style={{
      width: sidebarOpen ? '280px' : '80px',
      background: '#283618',
      borderRight: '1px solid #6b705c',
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
        {sidebarOpen ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
              <Image src="/toroLogo.jpg" alt="Toro Track Logo" fill style={{ objectFit: 'cover' }} />
            </div>
            <h2 style={{ fontWeight: '700', color: '#fefae0', fontSize: '1.25rem', whiteSpace: 'nowrap' }}>Toro Track</h2>
          </div>
        ) : (
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            <Image src="/toroLogo.jpg" alt="Toro Track Icon" fill style={{ objectFit: 'cover' }} />
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fefae0', fontSize: '1.2rem', flexShrink: 0 }}>
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </div>

      {/* Navigation menu */}
      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(categories).map(([category, { icon, items }]) => (
            <li key={category} style={{ marginBottom: '0.5rem' }}>
              <div onClick={() => toggleCategory(category)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '8px', background: activeCategory === category ? '#6b705c' : 'transparent', color: '#fefae0', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: sidebarOpen ? '0.75rem' : '0', fontSize: '1.1rem' }}>{icon}</span>
                  {sidebarOpen && <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>{category}</span>}
                </div>
                {sidebarOpen && <span style={{ transition: 'transform 0.3s ease', transform: expandedCategory === category ? 'rotate(90deg)' : 'rotate(0)' }}>›</span>}
              </div>
              <div style={{ borderBottom: '1px solid #6b705c', margin: '0.5rem 0' }} />
              {sidebarOpen && expandedCategory === category && (
                <ul style={{ listStyle: 'none', paddingLeft: '1.5rem', marginTop: '0.5rem', animation: 'fadeIn 0.3s ease-out' }}>
                  {items.map((item) => (
                    <li key={item.name} style={{ marginBottom: '0.25rem' }}>
                      <Link 
                        href={item.path} 
                        passHref
                        // Add the prefetch on mouse enter to the Link component
                        onMouseEnter={() => router.prefetch(item.path)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '6px', background: pathname === item.path ? 'rgba(243, 114, 44, 0.2)' : 'transparent', color: pathname === item.path ? '#f3722c' : '#fefae0', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                          <span style={{ fontSize: '0.9rem' }}>{item.name}</span>
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

      {/* User profile and logout section */}
      <div style={{ padding: '1rem', borderTop: '2px solid #6b705c', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', overflow: 'hidden', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid #f3722c' }}>
            <Image src="/toroLogo.jpg" alt="User Profile" fill style={{ objectFit: 'cover' }} />
          </div>
          {sidebarOpen && (
            <div style={{ minWidth: 0 }}>
              <p style={{ fontWeight: '600', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fefae0' }}>John Doe</p>
              <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'rgba(254, 250, 224, 0.7)' }}>
                {activeCategory ? `${activeCategory}@toro.com` : 'user@toro.com'}
              </p>
            </div>
          )}
        </div>
        <button onClick={handleLogout} style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: '1px solid #fefae0', borderRadius: '8px', color: '#fefae0', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {sidebarOpen ? 'Logout' : '→'}
        </button>
      </div>
    </div>
  );
}