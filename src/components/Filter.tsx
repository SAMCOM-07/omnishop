'use client'

import { categoriesLinks } from '@/data/links'
import { cn } from '@/lib/utils'
import { ListFilter } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Filter = ({ category }: { category: string }) => {

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {

  }, [])

  return (
    <section className='w-full md:min-w-[16rem] md:max-w-[16rem] sticky inset-0 top-14  z-40 bg-neutral-1 mr-4'>
      <div className='sticky inset-0 top-14'>
        <span className='inline-flex gap-1 items-center py-6 font-semibold' onClick={() => setIsOpen(true)}><ListFilter size={16} />Filter</span>

        {/* filter(side bar) from medium upward */}
        <aside className='hidden md:block'>
          <h3 className='mt-6 mb-4'>CATEGORIES</h3>
          <div className='flex flex-col overflow-y-scroll gap-4 h-60'>
            {
              categoriesLinks.map((link, index) => {
                const activeLink = pathname + '?c=' + category === link.href || link.href === '/shop' && !category
                return (
                  <Link className={cn('text-neutral-4 text-sm font-light hover:font-bold transition-all duration-500 w-fit inline', activeLink && 'border-b font-semibold text-neutral-7')} key={index} href={link.href}>{link.name}</Link>
                )
              }
              )
            }
          </div>
        </aside>

        {/* filter for small width */}
        <div className={cn('md:hidden absolute inset-0 top-12 bg-neutral-1 shadow-md h-fit p-4 rounded-lg transition-opacity duration-300', isOpen ? 'opacity-100 z-50' : 'opacity-0 z-0')} onClick={() => setIsOpen(false)}>
          <h3 className='mb-4'>CATEGORIES</h3>
          <div className='flex flex-wrap gap-2'>
            {
              categoriesLinks.map((link, index) => {
                const activeLink = pathname + '?c=' + category === link.href || link.href === '/shop' && !category
                return (
                  <Link className={cn('text-neutral-4 text-sm py-1 px-2 rounded-full hover:font-bold transition-all duration-500 w-fit inline', activeLink ? 'bg-neutral-3 font-bold' : 'bg-neutral-2')} key={index} href={link.href}>{link.name}</Link>
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
