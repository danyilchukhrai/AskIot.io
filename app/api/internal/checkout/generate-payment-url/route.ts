import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const { sessionId } = await request.json();

  if (sessionId) {
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (checkoutSession) {
      return NextResponse.json(
        {
          url: checkoutSession.url,
        },
        {
          status: 200,
        },
      );
    } else {
      return NextResponse.json(
        { error: 'Server error' },
        {
          status: 500,
        },
      );
    }
  } else {
    return NextResponse.json(
      { error: 'Server error' },
      {
        status: 500,
      },
    );
  }
}
