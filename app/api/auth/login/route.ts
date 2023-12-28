import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const { email, password } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      {
        error: 'Email or password is incorrect',
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      accessToken: data?.session?.access_token,
    },
    { status: 200 },
  );
}
