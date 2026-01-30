'use client'

import { categoriesLinks, priceLinks } from '@/data/links'
import { cn } from '@/lib/utils'
import { Check, ListFilter, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'


const Filter = ({ category, min, max, sort }: { category: string, min: string, max: string, sort: string }) => {

  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [priceState, setPriceState] = useState('');

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [category, min, max, sort]);


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
    <section ref={scrollRef} className='w-full'>
      <div className='sticky inset-0 py-6 top-14'>
        <button className='inline-flex gap-1 items-center border border-border py-1 px-3 rounded-lg font-semibold'
          onClick={() => setIsOpen(prev => !prev)}
        >
          <ListFilter size={16} />Filter
        </button>

        {/* filter(side bar) from medium upward */}
        <aside className='hidden md:block'>

          {/* filter by categories */}
          <h3 className='mt-6 mb-4'>CATEGORIES</h3>
          <div className='flex flex-col overflow-y-scroll gap-4 h-60 text-sm'>
            {
              categoriesLinks.map((link) => {
                const isActive = selectedCategory === link.href || link.href === '/shop' && !selectedCategory
                return (
                  <label key={link.name} className="flex gap-2 items-center cursor-pointer">
                    <input
                      type="radio"
                      name='category'
                      checked={isActive}
                      onChange={() => setSelectedCategory(link.href)}
                      className='hidden'
                    />
                    <span className={cn('w-5 h-5 border border-border rounded-sm grid place-content-center', isActive && 'text-neutral-1 bg-neutral-7')}>
                      {isActive ? <Check className='p-1' /> : ''}
                    </span>
                    {link.name}
                  </label>
                )
              }
              )
            }
          </div>

          {/* filter by prices */}
          <h3 className='mt-6 mb-4'>PRICES</h3>
          <div className='flex flex-col gap-3 text-sm'>
            {
              priceLinks.map((link) => {
                const isActive = priceState === link.href || link.price === 'All Prices' && !priceState;
                return (
                  <label key={link.price} className="flex justify-between gap-2 items-center cursor-pointer">
                    {link.price}
                    <input
                      type="radio"
                      name='price'
                      checked={isActive}
                      onChange={() => setPriceState(link.href)}
                      className='hidden'
                    />
                    <span className={cn('w-5 h-5 border border-border rounded-sm grid place-content-center', isActive && 'text-neutral-1 bg-neutral-7')}>
                      {isActive ? <Check className='p-1' /> : ''}
                    </span>
                  </label>
                )
              }
              )
            }
          </div>
          <div className='flex flex-col gap-3 mt-8 text-sm'>
            <button
              onClick={() => {
                setSelectedCategory('');
                setPriceState('');
                setIsOpen(false);
                router.push(`/shop${sort ? `?sort=${sort}` : ''}`);
              }}
              className='text-sm text-red hover:underline font-medium transition-all duration-500'
            >
              Clear All Filters
            </button>
            <Link
              href={`${pathname}?${selectedCategory ? `c=${selectedCategory}` : ''}${selectedCategory && priceState ? '&' : ''}${priceState}${(selectedCategory || priceState) && sort ? '&' : ''}${sort ? `sort=${sort}` : ''}`}
              className='submit-button py-1.5'
            >
              Apply Filter
            </Link>
          </div>
        </aside>




        {/* filter for small width */}

        <div ref={dropdownRef} className={cn('md:hidden absolute inset-0 top-16 bg-neutral-1 shadow-lg border border-border min-h-fit p-4 rounded-lg', isOpen ? 'block' : 'hidden')}>

          {/* filter by cateogories */}
          <h3 className='mb-4 flex items-center justify-between'>CATEGORIES<button onClick={() => setIsOpen(false)}><X size={18} /></button></h3>

          <div className='flex flex-col overflow-y-scroll gap-3 h-60 text-sm'>
            {
              categoriesLinks.map(link => {
                const isActive = selectedCategory === link.href || link.href === '/shop' && !selectedCategory
                return (
                  <label
                    key={link.name}
                    className="flex gap-2 items-center cursor-pointer">
                    <input type="radio" name='category' checked={isActive}
                      onChange={() => setSelectedCategory(link.href)}
                      className='hidden'
                    />
                    <span className={cn('w-5 h-5 border border-border rounded-sm grid place-content-center', isActive && 'text-neutral-1 bg-neutral-7')}>{isActive ? <Check className='p-1' /> : ''}
                    </span>
                    {link.name}
                  </label>
                )
              }
              )
            }
          </div>


          {/* filter by prices */}
          <h3 className='mb-4 mt-8'>PRICES</h3>
          <div className='flex flex-col gap-3 text-sm'>
            {
              priceLinks.map((link) => {
                const isActive = priceState === link.href || (link.price === 'All Prices' && !priceState);
                return (
                  <label key={link.price} className="flex justify-between gap-2 items-center cursor-pointer">
                    {link.price}
                    <input
                      type="radio"
                      name='price'
                      checked={isActive}
                      onChange={() => setPriceState(link.href)}
                      className='hidden'
                    />
                    <span className={cn('w-5 h-5 border border-border rounded-sm grid place-content-center', isActive && 'text-neutral-1 bg-neutral-7')}>
                      {isActive ? <Check className='p-1' /> : ''}
                    </span>
                  </label>
                )
              })
            }
          </div>
          <div className='flex flex-col gap-3 mt-8 text-sm'>
            <button
              onClick={() => {
                setSelectedCategory('');
                setPriceState('');
                setIsOpen(false);
                router.push(`/shop${sort ? `?sort=${sort}` : ''}`);
              }}
              className='text-sm text-red hover:underline font-medium transition-all duration-500'
            >
              Clear All Filters
            </button>
            <Link
              href={`${pathname}?${selectedCategory ? `c=${selectedCategory}` : ''}${selectedCategory && priceState ? '&' : ''}${priceState}${(selectedCategory || priceState) && sort ? '&' : ''}${sort ? `sort=${sort}` : ''}`}
              onClick={() => setIsOpen(false)}
              className='submit-button py-1.5'
            >
              Apply Filter
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Filter
