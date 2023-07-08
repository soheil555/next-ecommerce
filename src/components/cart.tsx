import { useCartStore, useStore } from '@/store'
import { CartItem } from './cartItem'
import { useEffect } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/formatPrice'

export function Cart() {
  const cartItems = useStore(useCartStore, state => state.cart)
  const toggleCart = useCartStore(state => state.toggleCart)

  const totalPrice =
    cartItems?.reduce<number>((acc, item) => {
      let unitAmount = item.unitAmount

      if (unitAmount === null || unitAmount === '') unitAmount = 0
      else if (typeof unitAmount === 'string')
        unitAmount = parseFloat(unitAmount)

      return acc + unitAmount * item.quantity
    }, 0) || 0

  useEffect(() => {
    console.log(cartItems)
  }, [cartItems])

  return (
    <div
      onClick={toggleCart}
      className='fixed top-0 left-0 w-full h-screen bg-black/25 z-50'
    >
      <div
        onClick={e => e.stopPropagation()}
        className='absolute top-0 right-0 w-full md:w-1/2 lg:w-1/3 h-screen bg-white px-6 pt-12'
      >
        <button onClick={toggleCart} className='font-medium'>
          Back to store 🏃‍♀️
        </button>

        <div className='flex flex-col gap-8 mt-12'>
          {cartItems?.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        {cartItems?.length ? (
          <>
            <p className='my-4 text-gray-700'>
              Total: {formatPrice(totalPrice)}
            </p>
            <button className='bg-teal-700 hover:bg-teal-800 w-full p-4 text-white rounded-md'>
              Checkout
            </button>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center gap-4 pt-56'>
            <h3 className='text-xl'>Cart is empty 😢</h3>
            <Image src='/basket.png' alt='basket' width={300} height={300} />
          </div>
        )}
      </div>
    </div>
  )
}
