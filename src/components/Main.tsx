'use client'


import Image from 'next/image'
import { useState } from 'react'
import { LinkButton } from "./Buttons"

import Chair from "../../public/images/chair.avif"
import Link from 'next/link'
import Shirt from './../../public/images/white-shirt.avif';
import Bag from './../../public/images/travel-bags.avif';
import Banner from './../../public/images/clothes1.avif';

const Main = () => {

 

  return (
    <main className='mb-24'>

      {/* banner section */}
      <section aria-label="Hero banner" className='flex items-center justify-center overflow-hidden bg-gray-500 relative'>
        <div className="w-full lg:h-150 h-100 bg-gray-200 transition-all duration-500 relative">
          <Image
            src={Banner}
            alt='Omnishop hero banner — shop all products'
            priority
            fetchPriority='high'
            width={400}
            height={200}
            sizes="100vw"
            className='w-full h-full object-cover object-center'
          />
        </div>

        {/* texts, overlay and CTA button */}
        <div className='text-center grid place-content-center absolute bg-black/50  inset-0 w-full h-full text-neutral-1'>
          <h1 className='max-w-[70%] mx-auto sm:text-3xl lg:text-5xl font-extrabold'>Omnishop Where You Get All Kinds Of Products </h1>
          <span className='max-w-[70%] mx-auto mt-2 text-xs sm:text-sm lg:text-lg font-bold'>Built with Next.js, Tailwind Css, Typescript, Firebase and Cloudinary</span>
          <Link href={'/shop'} className='animate-bounce text-xs md:text-sm bg-green/40 px-3 py-1.5 font-bold rounded-full w-fit justify-self-center mt-4 shadow-md hover:animate-none shadow-neutral-3 backdrop-blur-sm'>SHOP NOW</Link>
        </div>
      </section>

      {/* hero text (motto) section */}
      <section aria-label="Our promise" className='container grid grid-cols-1 sm:grid-cols-2 sm:items-center gap-6 mt-12'>
        <div className='text-4xl lg:text-6xl xl:text-7xl'>
          <div>Simply Unique <span className='text-neutral-4'>/</span></div>
          <div>Simply Better <span className='text-neutral-4'>.</span></div>
        </div>
        <p className='font-poppins text-neutral-4 max-w-md lg:text-lg xl:text-xl'>
          <span className='font-bold text-green'>Omnishop</span> is a all products store based in Lagos, Nigeria. Est since 240 BC.
        </p>
      </section>

      {/* showcase section */}
      <section aria-label="Shop by category" className='container grid grid-cols-1 lg:grid-cols-2 gap-4 mt-12 [direction:ltr]'>
        {/* 1 */}
        <div className='bg-neutral-2 p-6 overflow-hidden space-y-4 w-full'>
          <h2>Furniture</h2>
          <LinkButton text='Show More' href='/shop?c=furniture' />
          <div className='overflow-hidden w-full '>
            <Image src={Chair} alt='chair (sofa)' width={400} height={400} priority sizes="(min-width: 1024px) 50vw, 100vw" className='h-full w-full object-cover object-center' />
          </div>
        </div>
        {/* 2 & 3 container */}
        <div className='flex flex-col gap-4'>
          {/* 2 */}
          <div className='bg-neutral-2 p-6 flex gap-4 overflow-hidden justify-between items-end h-1/2'>
            <div className='space-y-2'>
              <h2>Cloth</h2>
              <LinkButton text='Show More' href='/shop?c=fashion' />
            </div>
            <div className='overflow-hidden w-[60%] h-full'>
              <Image src={Shirt} alt='cloth' width={400} height={400} priority sizes="(min-width: 1024px) 30vw, 60vw" className='h-full w-full object-cover object-center' />
            </div>
          </div>
          {/* 2 */}
          <div className='bg-neutral-2 p-6 flex gap-4 overflow-hidden justify-between items-end h-1/2 [direction:rtl] lg:[direction:ltr]'>
            <div className='space-y-2'>
              <h2>Travel Bags</h2>
              <LinkButton text='Show More' href='/shop?c=home & kitchen' />
            </div>
            <div className='overflow-hidden w-[40%] h-full'>
              <Image src={Bag} alt='travel bag' width={400} height={400} priority sizes="(min-width: 1024px) 20vw, 40vw" className='h-full w-full object-cover object-center' />
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}

export default Main
