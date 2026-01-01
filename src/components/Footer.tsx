'use client'

import React from 'react'
import { LogOutButton } from './auth/AuthButtons'
import Link from 'next/link'
import Image from 'next/image'
import LogoText from './../../public/images/omnishop-text.png';


const Footer = () => {
  return (
    <div className='bg-neutral-7 text-neutral-1 py-20 w-full gap-4 text-sm'>
      <div className='container flex flex-col md:flex-row justify-between items-start md:items-center gap-12'>
        <div className='flex items-center gap-6'>
          <Link href="/" className="inline-block brightness-100">
            <Image src={LogoText} width={120} height={120} alt="Product Picture" />
          </Link>
          <div className='h-6 w-0.5 bg bg-neutral-4'></div>
          <h6 className='font-extralight text-neutral-3'>Where you get all Products</h6>
        </div>

        <ul className='flex items-center gap-6'>
          <li><Link href="/" className='hover:text-green transition-colors duration-300'>Home</Link></li>
          <li><Link href="/shop" className='hover:text-green transition-colors duration-300'>Shop</Link></li>
          
        </ul>
        <LogOutButton />
      </div>
    </div>
  )
}

export default Footer
