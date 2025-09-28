// Creates a Supabase client for client-side (browser) use.
import { createBrowserClient } from '@supabase/ssr';

export const createSupabaseClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );