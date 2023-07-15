import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { OrderStatus } from '@prisma/client'

export async function POST(request: Request) {
  const body = await request.text()
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
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Webhook error ' + err },
      { status: 400 }
    )
  }

  switch (event.type) {
    case 'charge.succeeded':
      const charge = event.data.object as Stripe.Charge
      if (charge.payment_intent) {
        await prisma.order.update({
          where: {
            paymentIntentId: charge.payment_intent as string,
          },
          data: {
            status: OrderStatus.CONFIRMED,
          },
        })
      }
      break
    default:
      console.log('Unhandled event type:' + event.type)
  }

  return NextResponse.json({ received: true })
}
