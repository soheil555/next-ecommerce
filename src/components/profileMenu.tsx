'use client'

import { Menu } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'

interface IProps {
  session: Session
}

export function ProfileMenu({ session }: IProps) {
  return (
    <Menu as='div' className='relative inline-block'>
      <Menu.Button>
        <Image
          className='rounded-full border-2 border-black/70 object-cover'
          width={50}
          height={50}
          src={session.user?.image || '/default-profile.png'}
          alt={session.user?.name || 'github profile picture'}
        />
      </Menu.Button>

      <Menu.Items className=' bg-slate-100 p-4 rounded-lg absolute right-0 w-36 flex flex-col items-start gap-3 z-50'>
        <Menu.Item>
          {({ active }) => (
            <Link
              href='/dashboard'
              className={`${active && 'bg-slate-200'} p-2 rounded-lg`}
            >
              <button>Dashboard</button>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => signOut()}
              className={`${active && 'bg-slate-200'} p-2 rounded-lg`}
            >
              Signout
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
