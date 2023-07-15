import { buffer } from 'micro'
import { stripe } from '@/lib/stripe'
import { NextResponsese } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const buf = await buffer(request)
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json(
      { message: 'Missing the stripe signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      bug,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Webhook error ' + err },
      { status: 400 }
    )
  }
}
