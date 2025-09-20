import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ⚠️ Service role key, server only!
);

export async function POST(req) {
  try {
    const { email, role } = await req.json();

    // Temporary random password
    const tempPassword = crypto.randomUUID().slice(0, 10);

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true, // this triggers Supabase to send the email
      user_metadata: { role }, // store role for later
    });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      user: data.user,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
