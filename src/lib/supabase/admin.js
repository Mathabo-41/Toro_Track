// Creates a Supabase admin client for privileged operations.
import { createClient } from '@supabase/supabase-js';

export const createSupabaseAdminClient = () => {
    // This client uses the service_role key to bypass RLS.
    // Never expose this client or its key in the browser.
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );
};