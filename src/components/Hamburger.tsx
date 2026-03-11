'use client'

import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'
import { Heart, HomeIcon, LogInIcon, ShoppingBagIcon, ShoppingCart, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogInButton } from './auth/AuthButtons'
import { useAuth } from '@/hooks/useAuth'
import { UserIconSkeleton } from './Skeletons'

const Hamburger = () => {

  const pathname = usePathname();
  const { totalQuantity } = useCart();
  const { isLoggedIn, loadingUser, user, profileDetails } = useAuth();

  const links = [
    { name: 'Home', href: '/', icon: <HomeIcon size={20} /> },
    { name: 'Shop', href: '/shop', icon: <ShoppingBagIcon size={20} /> },
    { name: 'Cart', href: '/cart', icon: <ShoppingCart size={20} /> },
    { name: 'Wishlist', href: '/wishlist', icon: <Heart size={20} /> },
  ]

  return (
    <nav aria-label="Mobile navigation" className='group flex items-center justify-between font-inter gap-4 py-3 container md:hidden'>
      {
        links.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link key={index} href={link.href} aria-label={link.name === 'Cart' ? `Cart, ${totalQuantity} items` : link.name} aria-current={isActive ? 'page' : undefined} className={cn('flex flex-col gap-0.5 items-center text-xs sm:text-sm', isActive ? 'text-green' : 'text-neutral-4', link.name === 'Cart' && 'relative')}><span aria-hidden="true">{link.icon}</span><span>{link.name}</span>
              {link.name === 'Cart' &&
                <div aria-hidden="true" className='rounded-full p-1 font-semibold text-green absolute left-6 -top-3'>{totalQuantity}</div>}
            </Link>)
        }
        )
      }
      {
        isLoggedIn ? <Link href={'/profile'} aria-label="Profile" aria-current={pathname === '/profile' ? 'page' : undefined} className={cn('flex flex-col gap-0.5 items-center text-xs sm:text-sm', pathname === '/profile' ? 'text-green' : 'text-neutral-4')}>{profileDetails?.profilePicture ? <img src={profileDetails.profilePicture} alt="Profile picture" className="rounded-full bg-neutral-3 hover-scale object-cover w-6 h-6" /> : user?.photoURL ? <img src={`${user?.photoURL}`} alt="Profile picture" className="rounded-full bg-neutral-3 hover-scale object-cover w-6 h-6" /> : <User2Icon aria-hidden="true" size={30} className="bg-neutral-3 hover-scale text-neutral-4 rounded-full p-1" />}<span>Profile</span>
        </Link> : loadingUser ? <UserIconSkeleton /> : <Link href={'/login'} className='flex flex-col gap-0.5 items-center text-xs sm:text-sm text-neutral-4'><LogInIcon size={18} /><span>Login</span>
        </Link>
      }
    </nav>
  )
}

export default Hamburger
