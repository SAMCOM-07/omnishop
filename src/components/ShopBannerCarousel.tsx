'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { banners } from '@/data/images'
import { cn } from '@/lib/utils'
import { LinkButton } from './Buttons'

const ShopBannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState(0)

  return (
    <section
      aria-label="Shop banner carousel"
      aria-roledescription="carousel"
      className='flex items-center justify-center overflow-hidden bg-gray-500 relative'
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Slide {currentBanner + 1} of {banners.length}
      </div>
      {
        banners && banners.length > 0 && banners.map((banner, index) =>
          <div
            key={banner.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${banners.length}`}
            aria-hidden={currentBanner !== index}
            className={cn('lg:h-150 h-100 bg-gray-200 transition-all duration-500 relative', currentBanner === index ? 'w-full' : 'w-0')}
          >
            <Image
              src={banner.img}
              alt={`Shop banner ${index + 1}`}
              priority={index === 0}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              width={400}
              height={200}
              sizes="100vw"
              className='w-full h-full object-cover object-center'
            />
          </div>
        )
      }

      {/* texts, overlay and CTA button */}
      <div className="text-center flex flex-col gap-3 items-center justify-center p-6 absolute bg-black/50 inset-0 w-full h-full text-neutral-1">
        <h1 className="mx-auto sm:text-3xl lg:text-5xl leading-6.5 lg:leading-10 font-extrabold">
          Feel Free To Shop Anything !!!
        </h1>
        <span className="mx-auto mt-2 text-xs sm:text-sm lg:text-lg font-bold">
          You can filter by category and also sort
        </span>
        <LinkButton text="Go Home" href="/" />
      </div>

      {/* banner buttons */}
      <button
        aria-label='Previous banner'
        onClick={() => setCurrentBanner(prev => prev === 0 ? 0 : prev - 1)}
        className='arrow-button left-6'
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <button
        aria-label='Next banner'
        onClick={() => setCurrentBanner(prev => prev === banners.length - 1 ? banners.length - 1 : prev + 1)}
        className='arrow-button right-6'
      >
        <ChevronRight aria-hidden="true" />
      </button>

      {/* navigation button */}
      <div className='flex items-center gap-2 absolute bottom-6'>
        {[...banners].map((_, index) =>
          <button
            key={index}
            aria-label={`Go to banner ${index + 1}`}
            aria-current={currentBanner === index ? 'true' : undefined}
            onClick={() => setCurrentBanner(index)}
            className={cn('h-2.5 rounded-full bg-neutral-1 transition-all duration-300 z-40', currentBanner === index ? 'w-5 bg-green' : 'w-2.5')}
          ></button>
        )}
      </div>

    </section>
  )
}

export default ShopBannerCarousel
