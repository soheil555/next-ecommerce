'use client'

import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

interface IProps {
  session: Session | null
}

export function Nav({ session }: IProps) {
  return (
    <nav className='flex justify-between items-center p-8 '>
      <Link href='/'>Styled</Link>

      <ul className='flex items-center gap-6'>
        <li className='text-4xl cursor-pointer'>
          <AiOutlineShopping />
        </li>

        <li>
          {session ? (
            <Image
              className='rounded-full border-2 border-black/70'
              width={50}
              height={50}
              src={session.user?.image || '/default-profile.png'}
              alt={session.user?.name || 'github profile picture'}
              objectFit='cover'
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
  )
}
