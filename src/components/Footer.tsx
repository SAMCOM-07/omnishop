'use client'

import React from 'react'
import { LogOutButton } from './auth/AuthButtons'


const Footer = () => {
  return (
    <div className='bg-neutral-7 text-neutral-1 py-20 text-center w-full flex flex-col items-center gap-4'>
      Footer
      <LogOutButton />
    </div>
  )
}

export default Footer
