'use client'

import Link from 'next/link'
import Image from 'next/image'
import LogoText from './../../public/images/omnishop-text.png';
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'


const Footer = () => {

  const pathname = usePathname()

  return (
    <div className='bg-neutral-7 text-neutral-1 py-20 w-full gap-4 text-sm'>
      <div className='container flex flex-col md:flex-row justify-between items-center md:items-center gap-12'>
        <div className='flex flex-col md:flex-row items-center gap-6'>
          <Link href="/" className="inline-block brightness-100">
            <Image src={LogoText} width={120} height={120} alt="Product Picture" />
          </Link>
          <div className='md:h-6 md:w-0.5 w-6 h-0.5 -mt-2 md:m-0 bg bg-neutral-4 '></div>
          <h6 className='font-extralight text-neutral-3'>Where you get all Products</h6>
        </div>

        <ul className='flex flex-col md:flex-row items-center gap-6'>
          <li><Link href="/" className={cn('hover:text-green/50 transition-colors duration-300', pathname === '/' && 'text-green')}>Home</Link></li>
          <li><Link href="/shop" className={cn('hover:text-green/50 transition-colors duration-300', pathname === '/shop' && 'text-green')}>Shop</Link></li>

        </ul>
        <span>Developed by: <a href='https://samuelshonde.vercel.app' target='_blank' rel="noopener noreferrer" className='text-blue italic underline'>Samuel</a></span>
      </div>
    </div>
  )
}

export default Footer
