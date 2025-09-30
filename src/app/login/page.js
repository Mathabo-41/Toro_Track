// This file contains the client-side logic for the login page.
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  mainContainer,
  videoBackground,
  subtleOverlay,
  mainContentContainer,
  formContainer,
  loginTitle,
  formStyle,
  inputField,
  passwordField,
  loginButton,
  loginButtonHover,
  globalStyles,
} from './login_styles/styles.js';
import CircularProgress from '@mui/material/CircularProgress'; 

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  /**Looading State */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  

  // Initialize the new Supabase client inside the component.
  const supabase = createSupabaseClient();

  /*
  Handles the standard email and password login process.
  It authenticates the user, fetches their role from the database,
  and redirects them to the appropriate dashboard.
  */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) throw signInError;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      // Redirect based on the user's role
      switch (profile.role) {
        case 'admin':
          router.push('/dashboard/admin/overview');
          break;
        case 'client':
          router.push('/dashboard/client/details');
          break;
        case 'auditor':
          router.push('/dashboard/auditor/audit-trail');
          break;
        default:
          router.push('/login');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={mainContainer}>
      <video autoPlay loop muted playsInline style={videoBackground}>
        <source src="/appImages/logo_animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={subtleOverlay}></div>

      <div style={mainContentContainer}>
        <div style={formContainer}>
          <h2 style={loginTitle}>Login</h2>
          <form onSubmit={handleLogin} style={formStyle}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputField}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={passwordField}
            />
            <button
              type="submit"
              style={isHovered ? { ...loginButton, ...loginButtonHover } : loginButton}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          </form>
        </div>
      </div>

      {/*  Full-screen overlay while logging in */}
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          zIndex: 2000
        }}>
          <CircularProgress style={{ color: '#fefae0', marginBottom: '1rem' }} />
          <p style={{ color: '#fefae0', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Logging you in...
          </p>
        </div>
      )}

      <style jsx global>{globalStyles}</style>
    </main>
  );
}