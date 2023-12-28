import { USER_API } from '@/constants/api-endpoints';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  console.log('CALLBACK', code);

  try {
    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      console.log('CALLBACK:1');
      const res = await supabase.auth.exchangeCodeForSession(code);
      if (res.data.session?.access_token) {
        console.log(
          'CALLBACK DATA',
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}${USER_API.createUser.api}`,
          res.data.session?.access_token,
        );
        try {
          const resp = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}${USER_API.createUser.api}`,
            '',
            {
              headers: {
                Authorization: `Bearer ${res.data.session?.access_token}`,
              },
            },
          );
          console.log('CALLBACK RESP', resp?.data);
        } catch (error) {
          return NextResponse.redirect(`${requestUrl.origin}/app/`);
        }
      } else {
        console.log('CALLBACK NOT ACCESS TOKEN', JSON.stringify(res.data));
      }
    }
  } catch (error) {
    console.log('CALLBACK ERR', error);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/app`);
}
