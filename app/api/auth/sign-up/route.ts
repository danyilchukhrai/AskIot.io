import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const body = await request.json();
  const { email, password } = body;
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  });

  if (error) {
    console.error("Supabase Error:", error.message);
    return NextResponse.json(
      {
        error: 'Could not authenticate user',
        details: error.message // logging error from server , front end dev thinks this is caused by supabase
      },
      {
        status: 500,
      },
    );
  }
  

  const { user } = data;

  if (!user) {
    return NextResponse.json(
      {
        error: 'User creation failed',
        details: 'No user data returned from Supabase'
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

