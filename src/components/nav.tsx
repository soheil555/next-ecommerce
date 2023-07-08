'use client'

import { useCartStore, useStore } from '@/store'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './cart'
import { AnimatePresence, motion } from 'framer-motion'

interface IProps {
  session: Session | null
}

export function Nav({ session }: IProps) {
  const isCartOpen = useStore(useCartStore, state => state.isOpen)
  const cartLen = useStore(useCartStore, state => state.cart.length)
  const toggleCart = useCartStore(state => state.toggleCart)

  return (
    <>
      <nav className='flex justify-between items-center p-8 '>
        <Link href='/'>Styled</Link>

        <ul className='flex items-center gap-6'>
          <li onClick={toggleCart} className='text-4xl cursor-pointer relative'>
            <AiOutlineShopping />

            <AnimatePresence>
              {cartLen && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className='absolute -top-1 -right-1 text-xs text-white bg-teal-700 rounded-full h-5 w-5 flex justify-center items-center'
                >
                  {cartLen}
                </motion.span>
              )}
            </AnimatePresence>
          </li>

          <li>
            {session ? (
              <Image
                className='rounded-full border-2 border-black/70 object-cover'
                width={50}
                height={50}
                src={session.user?.image || '/default-profile.png'}
                alt={session.user?.name || 'github profile picture'}
              />
            ) : (
              <button
                onClick={() => signIn()}
                className='bg-teal-500 hover:bg-teal-600 text-white text-lg p-2 rounded-lg'
              >
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>

      <AnimatePresence>{isCartOpen && <Cart />}</AnimatePresence>
    </>
  )
}
