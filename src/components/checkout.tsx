'use client'

import { useCartStore, useStore } from '@/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { motion } from 'framer-motion'
import { CheckoutForm } from './checkoutForm'
import { OrderAnimation } from './orderAnimation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string)

export function Checkout() {
  const router = useRouter()
  const cartItems = useStore(useCartStore, state => state.cart)
  const paymentIntentId = useStore(useCartStore, state => state.paymentIntentId)
  const setPaymentIntentId = useCartStore(state => state.setPaymentIntentId)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    if (cartItems && typeof paymentIntentId === 'string') {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, paymentIntentId }),
      })
        .then(res => {
          if (res.status === 401) return router.push('/api/auth/signin')
          return res.json()
        })
        .then((data: { clientSecret: string; paymentIntentId: string }) => {
          setClientSecret(data.clientSecret)
          setPaymentIntentId(data.paymentIntentId)
        })
    }
  }, [cartItems, paymentIntentId, router, setPaymentIntentId])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  }

  return (
    <div>
      {!clientSecret && <OrderAnimation />}
      {clientSecret && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </motion.div>
      )}
    </div>
  )
}
