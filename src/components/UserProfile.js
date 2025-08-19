'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UserProfile({ sidebarOpen, activeCategory }) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div style={{
      padding: '1rem',
      borderTop: '2px solid #6b705c',
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
          border: '2px solid #f3722c'
        }}>
          <Image
            src="/toroLogo.jpg"
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
              textOverflow: 'ellipsis',
              color: '#fefae0'
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
              color: 'rgba(254, 250, 224, 0.7)'
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
          border: '1px solid #fefae0',
          borderRadius: '8px',
          color: '#fefae0',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
      >
        {sidebarOpen ? 'Logout' : '→'}
      </button>
    </div>
  );
}
