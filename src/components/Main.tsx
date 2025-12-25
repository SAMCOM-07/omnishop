'use client'

import { banners } from '@/data/images'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { LinkButton } from "./Buttons"

import Chair from "../../public/images/chair.png"
import Link from 'next/link'
import Shirt from './../../public/images/floating-white-shirt-stockcake-removebg-preview.png';
import Bag from './../../public/images/ei_1757649839935-removebg-preview.png';

const Main = () => {

  const [currentBanner, setCurrentBanner] = useState(0)

  return (
    <main className='mb-24'>

      {/* banner section */}
      <section className='flex items-center justify-center overflow-hidden bg-gray-500 relative'>
        {
          banners && banners.length > 0 && banners.map((banner, index) =>
            <div key={banner.id}
              className={cn('lg:h-150 h-100 bg-gray-200 transition-all duration-500 relative', currentBanner === index ? 'w-full' : 'w-0')}>
              <Image
                src={banner.img}
                alt='banner Image'
                priority
                width={600}
                height={400}
                className='w-full h-full object-cover object-center'
              />
            </div>
          )
        }

        {/* banner buttons */}
        <button aria-label='scroll-left' onClick={() => setCurrentBanner(prev => prev === 0 ? 0 : prev - 1)} className='arrow-button left-6'><ChevronLeft /></button>
        <button aria-label='scroll-right' onClick={() => setCurrentBanner(prev => prev === banners.length - 1 ? banners.length - 1 : prev + 1)} className='arrow-button right-6'><ChevronRight /></button>

        {/* navigation button */}
        <div className='flex items-center gap-2 absolute bottom-6'>
          {[...banners].map((_, index) =>
            <button key={index} onClick={() => setCurrentBanner(index)} className={cn('h-2.5 rounded-full bg-neutral-1 transition-all duration-300 z-40', currentBanner === index ? 'w-5 bg-green' : 'w-2.5')}></button>
          )}
        </div>

        {/* texts, overlay and CTA button */}
        <div className='text-center grid place-content-center absolute bg-black/50  inset-0 w-full h-full text-neutral-1'>
          <h1 className='max-w-[70%] mx-auto sm:text-3xl lg:text-5xl font-extrabold'>Omnishop Where You Get All Kinds Of Products </h1>
          <span className='max-w-[70%] mx-auto mt-2 text-xs sm:text-sm lg:text-lg font-bold'>Built with Next.js, Tailwind Css, Typescript, Firebase and Cloudinary</span>
          <Link href={'/shop'} className='animate-bounce text-xs md:text-sm bg-green px-3 py-1.5 font-bold rounded-full w-fit justify-self-center mt-4 shadow-md hover:animate-none shadow-neutral-3'>SHOP NOW</Link>
        </div>
      </section>

      {/* hero text (motto) section */}
      <section className='container grid grid-cols-1 sm:grid-cols-2 sm:items-center gap-6 mt-12'>
        <div className='text-4xl lg:text-6xl xl:text-7xl'>
          <div>Simply Unique <span className='text-neutral-4'>/</span></div>
          <div>Simply Better <span className='text-neutral-4'>.</span></div>
        </div>
        <p className='font-poppins text-neutral-4 max-w-md lg:text-lg xl:text-xl'>
          <span className='font-bold text-green'>Omnishop</span> is a all products store based in Lagos, Nigeria. Est since 240 BC.
        </p>
      </section>

      {/* showcase section */}
      <section className='container grid grid-cols-1 lg:grid-cols-2 gap-4 mt-12 [direction:ltr]'>
        {/* 1 */}
        <div className='bg-neutral-2 p-6 overflow-hidden space-y-4 w-full'>
          <h2>Furniture</h2>
          <LinkButton text='Show More' href='/shop?c=furniture' />
          <div className='overflow-hidden w-full '>
            <Image src={Chair} alt='chair (sofa)' className='h-full w-full object-cover object-center' />
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
              <Image src={Shirt} alt='cloth' className='h-full w-full object-cover object-center' />
            </div>
          </div>
          {/* 2 */}
          <div className='bg-neutral-2 p-6 flex gap-4 overflow-hidden justify-between items-end h-1/2 [direction:rtl] lg:[direction:ltr]'>
            <div className='space-y-2'>
              <h2>Travel Bags</h2>
              <LinkButton text='Show More' href='/shop?c=home & kitchen' />
            </div>
            <div className='overflow-hidden w-[40%] h-full'>
              <Image src={Bag} alt='cloth' className='h-full w-full object-cover object-center' />
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}

export default Main
