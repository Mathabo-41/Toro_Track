// This file handles Supabase session management for server-side rendering.
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

/*
* Middleware to refresh user session cookies.
*/
export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          req.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          req.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // This ensures the session is available for server-side components and API routes.
  await supabase.auth.getUser();
  
  return res;
}

/*
* Configuration to specify which paths the middleware should run on.
*/
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};