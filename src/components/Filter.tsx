'use client'

import { categoriesLinks, priceLinks } from '@/data/links'
import { cn } from '@/lib/utils'
import { ListFilter } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'


const Filter = ({ category, min, max }: { category: string, min: string, max: string }) => {

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false)


  return (
    <section className='w-full md:min-w-[16rem] md:max-w-[16rem] sticky inset-0 top-14  z-40 bg-neutral-1 mr-4'>
      <div className='sticky inset-0 py-6 top-14'>
        <button className='inline-flex gap-1 items-center border border-border py-1 px-3 rounded-lg font-semibold' onClick={() => setIsOpen(true)}><ListFilter size={16} />Filter</button>

        {/* filter(side bar) from medium upward */}
        <aside className='hidden md:block'>

          {/* filter by categories */}
          <h3 className='mt-6 mb-4'>CATEGORIES</h3>
          <div className='flex flex-col overflow-y-scroll gap-4 h-60'>
            {
              categoriesLinks.map((link, index) => {
                const activeLink = `${pathname}?c=${category}` === link.href || link.href === '/shop' && !category
                return (
                  <Link className={cn('text-neutral-4 text-sm hover:font-bold transition-all duration-500 w-fit inline', activeLink && 'border-b font-semibold text-neutral-7')} key={index} href={link.href}>{link.name}</Link>
                )
              }
              )
            }
          </div>

          {/* filter by prices */}
          <h3 className='mt-6 mb-4'>PRICES</h3>
          <div className='flex flex-col gap-3 pr-4'>
            {
              priceLinks.map((link, index) => {
                const activeLink = `${pathname}?min=${min}&max=${max}` === `${pathname}?${link.href}` || link.price === 'All Prices' && (!min || !max);
                return (
                  <Link className={cn(' text-sm inline-flex items-center justify-between font-semibold transition-all duration-500 w-full', activeLink ? 'text-neutral-7' : 'text-neutral-4')} key={index} href={category && link.href !== '' ? `${pathname}?c=${category}&${link.href}` : `${pathname}?${link.href}`}>{link.price}<span className={cn('w-5 h-5 border border-border rounded-sm grid place-content-center', activeLink && 'text-neutral-1 bg-neutral-7')}>{activeLink ? '✔' : ''}</span></Link>
                )
              }
              )
            }
          </div>
        </aside>




        {/* filter for small width */}
        <div className={cn('md:hidden absolute inset-0 top-16 bg-neutral-1 shadow-lg border border-border h-fit p-4 rounded-lg transition-opacity duration-300', isOpen ? 'opacity-100 z-50' : 'opacity-0 z-0')} onClick={() => setIsOpen(false)}>

          {/* filter by cateogories */}
          <h3 className='mb-4'>CATEGORIES</h3>
          <div className='flex flex-wrap gap-2'>
            {
              categoriesLinks.map((link, index) => {
                const activeLink = pathname + '?c=' + category === link.href || link.href === '/shop' && !category
                return (
                  <Link className={cn('text-neutral-4 text-xs py-1 px-2 rounded-full hover:font-bold transition-all duration-500 w-fit inline', activeLink ? 'bg-neutral-3 font-bold' : 'bg-neutral-2', isOpen ? 'opacity-100 z-50' : 'opacity-0 -z-500')} key={index} href={link.href}>{link.name}</Link>
                )
              }
              )
            }
          </div>


          {/* filter by prices */}
          <h3 className='mb-4 mt-8'>PRICES</h3>
          <div className='flex flex-wrap gap-3'>
            {
              priceLinks.map((link, index) => {
                const activeLink = `${pathname}?min=${min}&max=${max}` === `${pathname}?${link.href}` || link.href === '';
                return (
                  <Link className={cn(' text-sm inline-flex items-center justify-between font-semibold transition-all duration-500 w-full', activeLink ? 'text-neutral-7' : 'text-neutral-4')} key={index} href={category && link.href !== '' ? `/shop?${category}&${link.href}` : `/shop?${link.href}`}>{link.price}<span className={cn('w-5 h-5 border border-border rounded-sm grid place-content-center', activeLink && 'text-neutral-1 bg-neutral-7')}>{activeLink ? '✔' : ''}</span></Link>
                )
              }
              )
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Filter
