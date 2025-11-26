'use client'

import { cn } from '@/lib/utils'
import { HomeIcon, Search, ShoppingBagIcon, ShoppingCart, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Hamburger = () => {

  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/', icon: <HomeIcon size={20} /> },
    { name: 'Shop', href: '/shop', icon: <ShoppingBagIcon size={20} /> },
    { name: 'Search', href: '/search', icon: <Search size={20} /> },
    { name: 'Cart', href: '/cart', icon: <ShoppingCart size={20} /> },
    { name: 'Profile', href: '/profile', icon: <User2Icon size={20} /> },
  ]

  return (
    <div className='flex items-center justify-between font-inter gap-4 py-3 container md:hidden'>
      {
        links.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link key={index} href={link.href} className={cn('flex flex-col gap-0.5 items-center text-xs sm:text-sm', isActive ? 'text-green' : 'text-neutral-4', link.name === 'Cart' && 'relative')}>{link.icon}<span>{link.name}</span>
              {link.name === 'Cart' &&
                <div className='rounded-full p-1 font-bold text-green absolute -right-3 -top-3'>2</div>}
            </Link>)
        }
        )
      }
    </div>
  )
}

export default Hamburger
