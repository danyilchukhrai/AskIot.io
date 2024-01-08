import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request: Request) {
  const { sessionId } = await request.json();
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    NextResponse.json({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (err: any) {
    NextResponse.json(
      {
        error: err?.message,
      },
      {
        status: 500,
      },
    );
  }
}
