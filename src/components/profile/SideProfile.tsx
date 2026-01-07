'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOutButton } from '../auth/AuthButtons'
import { useAuth } from '@/hooks/useAuth'
import { User2Icon } from 'lucide-react'
import { useState } from 'react'

const SideProfile = () => {

  const pathname = usePathname()
  const { user } = useAuth();

  const links = [
    { name: 'Account', href: '/profile' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Address', href: '/address' },
    { name: 'Orders', href: '/order' },
  ]

  return (
    <aside className='w-full h-fit px-6 py-12 flex flex-col gap-4 md:shadow-lg rounded-md md:max-w-md font-inter'>
      <div className='w-24 h-24 rounded-full bg-neutral-3 text-green overflow-hidden grid place-content-center self-center'>{user?.photoURL ? <img src={user?.photoURL!} alt="Profile Picture" width={96} height={96} /> : <User2Icon size={45} />}</div>
      <h3 className='text-center self-center'>{user?.displayName ?? 'User'}</h3>

      {/* for md & above screen sizes */}
      <ul className='flex md:flex-col gap-2 md:gap-6 justify-between mt-6 text-neutral-4 tracking-wider overflow-x-auto'>
        {
          links.map(link => {
            const isActive = pathname === link.href
            return (
              <li key={link.name} className={cn('py-2 hover:text-neutral-6 transition-color duration-300', isActive && 'border-b-2 text-green font-semibold')}><Link className='block' href={link.href}>{link.name}</Link></li>
            )
          })
        }
      </ul>

      <div className='mt-4 self-center'>
        <LogOutButton />
      </div>
    </aside>
  )
}

export default SideProfile
