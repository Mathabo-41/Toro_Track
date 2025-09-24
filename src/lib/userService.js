// This file handles fetching user profile data.
import { supabase } from '@/lib/supabaseClient';

/*
* Fetches the profile data for the currently authenticated user.
*/
export const getCurrentUserProfile = async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Error fetching user session:', userError);
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('Error fetching user profile:', profileError);
    return null;
  }

  return profile;
};