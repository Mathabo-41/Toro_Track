import { createClient } from "@supabase/supabase-js";

//  Replace with your actual project values from Supabase dashboard
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//  Create a single Supabase client for the whole app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
