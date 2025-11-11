'use client'

import { cn } from '@/lib/utils'
import { HomeIcon, ShoppingBagIcon, ShoppingBasket, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Hamburger = () => {

  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/', icon: <HomeIcon size={20} /> },
    { name: 'Shop', href: '/shop', icon: <ShoppingBagIcon size={20} /> },
    { name: 'Cart', href: '/cart', icon: <ShoppingBasket size={20} /> },
    { name: 'Profile', href: '/profile', icon: <User2Icon size={20} /> },
  ]

  return (
    <div className='flex items-center justify-between font-inter gap-4 py-3 px-12 container md:hidden'>
      {
        links.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link key={index} href={link.href} className={cn('flex flex-col gap-0.5 items-center text-sm', isActive ? 'text-green':'text-neutral-4')}>{link.icon}<span>{link.name}</span></Link>)
        }
        )
      }
    </div>
  )
}

export default Hamburger
