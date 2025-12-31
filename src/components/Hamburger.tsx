'use client'

import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'
import { Heart, HomeIcon, ShoppingBagIcon, ShoppingCart, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogInButton } from './auth/AuthButtons'
import { useAuth } from '@/hooks/useAuth'
import { UserIconSkeleton } from './Skeletons'

const Hamburger = () => {

  const pathname = usePathname();
  const { totalQuantity } = useCart();
  const { isLoggedIn, loadingUser, user } = useAuth();

  const links = [
    { name: 'Home', href: '/', icon: <HomeIcon size={20} /> },
    { name: 'Shop', href: '/shop', icon: <ShoppingBagIcon size={20} /> },
    { name: 'Cart', href: '/cart', icon: <ShoppingCart size={20} /> },
    { name: 'Wishlist', href: '/wishlist', icon: <Heart size={20} /> },
  ]

  return (
    <div className='flex items-center justify-between font-inter gap-4 py-3 container md:hidden'>
      {
        links.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link key={index} href={link.href} className={cn('flex flex-col gap-0.5 items-center text-xs sm:text-sm', isActive ? 'text-green' : 'text-neutral-4', link.name === 'Cart' && 'relative')}>{link.icon}<span>{link.name}</span>
              {link.name === 'Cart' &&
                <div className='rounded-full p-1 font-semibold text-green absolute left-6 -top-3'>{totalQuantity}</div>}
            </Link>)
        }
        )
      }
      {
        isLoggedIn ? <Link href={'/profile'} className={cn('flex flex-col gap-0.5 items-center text-xs sm:text-sm', pathname === '/profile' ? 'text-green' : 'text-neutral-4')}>{user?.photoURL ? <img src={`${user?.photoURL}`} alt="User Profile" className="rounded-full bg-neutral-3 hover-scale object-cover w-6 h-6" /> : <User2Icon size={30} className="bg-neutral-3 hover-scale text-neutral-4 rounded-full p-1" />}<span>Profile</span>
        </Link> : loadingUser ? <UserIconSkeleton /> : <LogInButton />
      }
    </div>
  )
}

export default Hamburger
