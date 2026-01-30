'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOutButton } from '../auth/AuthButtons'
import { useAuth } from '@/hooks/useAuth'
import { CameraIcon, User2Icon } from 'lucide-react'

const SideProfile = () => {

  const pathname = usePathname()
  const { user, profileDetails } = useAuth();

  const links = [
    { name: 'Account', href: '/profile' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Address', href: '/address' },
    { name: 'Orders', href: '/order' },
  ]

  return (
    <aside className='w-full h-fit p-6 flex flex-col gap-4 md:shadow-lg rounded-md md:max-w-xs md:min-w-xs font-inter'>
      <div className='self-center relative'>
        <div className='w-34 h-34 rounded-full bg-neutral-3 text-green overflow-hidden flex items-center justify-center'>
          {user?.photoURL ? <img src={user?.photoURL!} alt="Profile Picture" className='object-cover w-full h-full object-center' /> : <User2Icon size={45} />}
        </div>
        <label className='text-neutral-1 bg-neutral-5 w-8 h-8 grid place-content-center p-5 rounded-full border-2 border-neutral-1 self-center absolute bottom-0 right-0 cursor-pointer'><input type="file" hidden className='hidden' /><CameraIcon size={25} /></label>
      </div>
      <h3 className='text-center self-center'>{profileDetails?.username || user?.displayName || 'User'}</h3>

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
