'use client'

import { UserState, useCartStore, useStore } from '@/store'
import { CartItem } from './cartItem'
import Image from 'next/image'
import { formatPrice } from '@/lib/formatPrice'
import { motion } from 'framer-motion'
import { totalPrice } from '@/lib/totalPrice'
import { Checkout } from './checkout'
import { OrderConfirmed } from './orderConfirmed'

export function Cart() {
  const cartItems = useStore(useCartStore, state => state.cart)
  const userState = useStore(useCartStore, state => state.userState)
  const setUserState = useCartStore(state => state.setUserState)
  const toggleCart = useCartStore(state => state.toggleCart)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={toggleCart}
      className='fixed top-0 left-0 w-full h-screen bg-black/25 z-50'
    >
      <div
        onClick={e => e.stopPropagation()}
        className='absolute top-0 right-0 w-full md:w-1/2 lg:w-1/3 h-screen bg-white px-6 py-12 overflow-y-scroll'
      >
        {userState === UserState.Cart && (
          <>
            <button onClick={toggleCart} className='font-medium'>
              Back to store 🏃‍♀️
            </button>

            <div className='flex flex-col gap-8 mt-12'>
              {cartItems?.map(item => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
          </>
        )}

        {userState === UserState.Cart && !!cartItems?.length && (
          <motion.div layout>
            <p className='my-4 text-gray-700'>
              Total: {formatPrice(totalPrice(cartItems))}
            </p>
            <button
              onClick={() => setUserState(UserState.Checkout)}
              className='bg-teal-700 hover:bg-teal-800 w-full p-4 text-white rounded-md'
            >
              Checkout
            </button>
          </motion.div>
        )}

        {userState === UserState.Cart && !cartItems?.length && (
          <motion.div
            initial={{ opacity: 0, rotateZ: -10 }}
            animate={{ opacity: 1, rotateZ: 0 }}
            className='flex flex-col items-center justify-center gap-4 pt-56'
          >
            <h3 className='text-xl'>Cart is empty 😢</h3>
            <Image src='/basket.png' alt='basket' width={300} height={300} />
          </motion.div>
        )}

        {userState === UserState.Checkout && <Checkout />}

        {userState === UserState.Success && <OrderConfirmed />}
      </div>
    </motion.div>
  )
}
