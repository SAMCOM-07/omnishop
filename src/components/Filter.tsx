'use client'

import { categoriesLinks, priceLinks } from '@/data/links'
import { cn } from '@/lib/utils'
import { Check, ListFilter, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'


const Filter = ({ category, min, max, sort }: { category: string, min: string, max: string, sort: string }) => {

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false)


  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <section className='w-full md:min-w-[16rem] md:max-w-[16rem] sticky inset-0 top-14  z-40 bg-neutral-1 mr-4 '>
      <div className='sticky inset-0 py-6 top-14'>
        <div className='flex gap-2 items-center'>
          <button className='inline-flex gap-1 items-center border border-border py-1 px-3 rounded-lg font-semibold'
            onClick={() => setIsOpen(true)}
          ><ListFilter size={16} />Filter</button>
          {(category || min || max) && <Link href={`/shop${sort ? `?sort=${sort}` : ''}`}><X size={16} /></Link>}
        </div>

        {/* filter(side bar) from medium upward */}
        <aside className='hidden md:block'>

          {/* filter by categories */}
          <h3 className='mt-6 mb-4'>CATEGORIES</h3>
          <div className='flex flex-col overflow-y-scroll gap-4 h-60'>
            {
              categoriesLinks.map((link, index) => {
                const activeLink = `${pathname}?c=${category}` === link.href || link.href === '/shop?' && !category
                return (
                  <Link className={cn('text-neutral-4 text-sm hover:font-bold transition-all duration-500 w-fit inline', activeLink && 'border-b font-semibold text-neutral-7')} key={index}
                    href={`${link.href}${min || max ? `&min=${min}&max=${max}` : ''}${sort ? `&sort=${sort}` : ''}`}
                  >{link.name}</Link>
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
                  <Link className={cn(' text-sm inline-flex items-center justify-between transition-all duration-500 w-full hover:font-bold', activeLink ? 'text-neutral-7 font-bold' : 'text-neutral-4')} key={index}
                    href={`${pathname}?${category ? `c=${category}` : ''}&${link.href}${sort ? `&sort=${sort}` : ''}`}
                  >{link.price}<span className={cn('w-5 h-5 border border-border rounded-sm grid place-content-center', activeLink && 'text-neutral-1 bg-neutral-7')}>{activeLink ? <Check className='p-1' /> : ''}</span></Link>
                )
              }
              )
            }
          </div>
        </aside>




        {/* filter for small width */}

        <div ref={dropdownRef} className={cn('md:hidden absolute inset-0 top-16 bg-neutral-1 shadow-lg border border-border min-h-fit p-4 rounded-lg', isOpen ? 'block' : 'hidden')}>

          {/* filter by cateogories */}
          <h3 className='mb-4 flex items-center justify-between'>CATEGORIES<button onClick={() => setIsOpen(false)}><X size={18} /></button></h3>
          <div className='flex flex-wrap gap-2'>
            {
              categoriesLinks.map((link, index) => {
                const activeLink = `${pathname}?c=${category}` === link.href || link.href === '/shop?' && !category
                return (
                  <Link className={cn('text-neutral-4 text-xs py-1 px-2 rounded-full hover:bg-neutral-3 bg-neutral-2 transition-all duration-500 w-fit inline border border-border', activeLink && 'font-bold text-neutral-7' )} key={index}
                    href={`${link.href}${min || max ? `&min=${min}&max=${max}` : ''}${sort ? `&sort=${sort}` : ''}`}
                  >{link.name}</Link>
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
                const activeLink = `${pathname}?min=${min}&max=${max}` === `${pathname}?${link.href}` || link.price === 'All Prices' && (!min || !max);
                return (
                  <Link className={cn(' text-sm inline-flex items-center justify-between transition-all duration-500 w-full hover:font-bold', activeLink ? 'text-neutral-7 font-bold' : 'text-neutral-4')} key={index}
                    href={`${pathname}?${category ? `c=${category}` : ''}&${link.href}${sort ? `&sort=${sort}` : ''}`}
                  >{link.price}<span className={cn('w-5 h-5 border border-border rounded-sm grid place-content-center', activeLink && 'text-neutral-1 bg-neutral-7')}>{activeLink ? <Check className='p-1' /> : ''}</span></Link>
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
