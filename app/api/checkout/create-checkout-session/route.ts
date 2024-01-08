import { API_ENDPOINT } from '@/configs/appConfig';
import { REQUEST_METHOD } from '@/constants/common';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const { type, env } = await request.json();
  try {
    const response = await fetch(`${API_ENDPOINT}/public/stripe/create-checkout-session`, {
      method: REQUEST_METHOD.POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        env,
      }),
    });
    const data = await response.json();
    const checkoutSession = await stripe.checkout.sessions.retrieve(data.id);
    return NextResponse.json(
      {
        url: checkoutSession.url,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      {
        status: 500,
      },
    );
  }
}
