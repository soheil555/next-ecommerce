import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { totalPrice } from '@/lib/totalPrice'
import { CartItem } from '@/store'
import { OrderStatus, User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

interface RequestBody {
  cartItems: CartItem[]
  paymentIntentId: string
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const user = session.user as User

  let clientSecret: string
  let { cartItems, paymentIntentId } = (await request.json()) as RequestBody

  if (paymentIntentId) {
    try {
      const updatedPaymentIntent = await stripe.paymentIntents.update(
        paymentIntentId,
        {
          amount: totalPrice(cartItems),
        }
      )
      clientSecret = updatedPaymentIntent.client_secret || ''
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid payment intent' },
        { status: 400 }
      )
    }

    const existingOrder = await prisma.order.findFirst({
      where: {
        paymentIntentId,
      },
    })

    if (!existingOrder) {
      return NextResponse.json(
        { message: 'Invalid payment intent' },
        { status: 400 }
      )
    }

    await prisma.order.update({
      where: {
        id: existingOrder.id,
      },
      data: {
        amount: totalPrice(cartItems),
        products: {
          deleteMany: {},
          createMany: {
            data: cartItems.map(item => ({
              name: item.name,
              description: item.description,
              unitAmount: item.unitAmount,
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      },
    })
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice(cartItems),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })
    paymentIntentId = paymentIntent.id
    clientSecret = paymentIntent.client_secret || ''

    await prisma.order.create({
      data: {
        user: { connect: { id: user.id } },
        amount: totalPrice(cartItems),
        status: OrderStatus.PENDING,
        paymentIntentId: paymentIntent.id,
        products: {
          createMany: {
            data: cartItems.map(item => ({
              name: item.name,
              description: item.description,
              unitAmount: item.unitAmount,
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      },
    })
  }

  return NextResponse.json({ paymentIntentId, clientSecret })
}
