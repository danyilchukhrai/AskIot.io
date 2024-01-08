import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const body = await request.json();
  const { email, password } = body;
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.json(
      {
        error: 'Could not authenticate user',
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    {
      message: 'Please check your email to verify your account',
    },
    { status: 200 },
  );
}
