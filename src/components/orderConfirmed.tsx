'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { UserState, useCartStore } from '../store'

export function OrderConfirmed() {
  const emptyCart = useCartStore(state => state.emptyCart)
  const toggleCart = useCartStore(state => state.toggleCart)
  const setPaymentIntentId = useCartStore(state => state.setPaymentIntentId)
  const setUserState = useCartStore(state => state.setUserState)

  useEffect(() => {
    emptyCart()
    setPaymentIntentId('')
  }, [emptyCart])

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className='my-12 flex flex-col justify-center items-center gap-2'
    >
      <h3 className='font-medium'>Your order has been placed 🚀</h3>
      <p className='text-gray-700'>Check your email for the receipt.</p>

      <Link href='/dashboard' className='mt-4'>
        <button
          onClick={() => {
            toggleCart()
            setUserState(UserState.Cart)
          }}
          className='bg-teal-700 hover:bg-teal-800 text-white py-2 px-3 rounded-md'
        >
          Check your order
        </button>
      </Link>
    </motion.div>
  )
}
