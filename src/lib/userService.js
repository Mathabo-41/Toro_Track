// This file handles fetching user profile data.
import { createSupabaseClient } from '@/lib/supabase/client';

/*
* Fetches the profile data for the currently authenticated user.
*/
export const getCurrentUserProfile = async () => {
  const supabase = createSupabaseClient();
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