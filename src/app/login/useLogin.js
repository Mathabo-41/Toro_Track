// This file contains all the logic and state for the login page.
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from '@/lib/supabase/client';
import { useMutation } from '@tanstack/react-query';

/**
* Manages all state and logic for the login process.
*/
export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createSupabaseClient();

  /**
  * useMutation handles the login process, including loading and error states.
  */
  const { mutate: handleLogin, isPending: isLoading, error } = useMutation({
    mutationFn: async () => {
      // 1. Sign in the user
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) throw signInError;

      // 2. Fetch the user's profile to get their role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;
      
      return profile.role; // Return the role on success
    },
    onSuccess: (role) => {
      // 3. Redirect based on the user's role
      switch (role) {
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
          router.push('/login'); // Fallback
      }
    },
    // The 'error' object from the mutation is automatically populated on failure
  });

  /**
  * This function is called by the form's onSubmit.
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    handleLogin();
  };
  
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isLoading,
    // Provide a clean error message
    error: error ? error.message : null, 
  };
};