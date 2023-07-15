'use client'

import { FormEvent, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCartStore, UserState } from '@/store'

export function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const setUserState = useCartStore(state => state.setUserState)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsLoading(true)

    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    if (!result.error) setUserState(UserState.Success)

    setIsLoading(false)
  }

  return (
    <form id='payment-form'>
      <PaymentElement id='payment-element' options={{ layout: 'tabs' }} />
      <button
        className='bg-teal-700 p-2 rounded-lg'
        onClick={handleSubmit}
        id='submit'
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? 'Processing' : 'Pay now'}
      </button>
    </form>
  )
}
