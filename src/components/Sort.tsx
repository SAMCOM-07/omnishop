'use client'

import { sortings } from '@/data/links'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const Sort = ({ category, min, max, sort }: { category: string, min: string, max: string, sort: string }) => {

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

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
    <div ref={dropdownRef}>
      <button className='inline-flex gap-3 items-center border border-border py-0.5 px-2 rounded-lg relative capitalize font-inter' onClick={() => setIsOpen(true)}>{sort ? sort : 'Relevant'} {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>

      <div className={cn('w-42 bg-neutral-1 border border-border rounded-lg shadow-md absolute top-16 right-0', isOpen ? 'block' : 'hidden')}>
        <div className='flex flex-col gap-3 p-2'>
          {sortings && sortings.map((sorting) => {
            const activeSort = `${pathname}?sort=${sort}` === `${pathname}?${sorting.href}` || sorting.href === '' && !sort
            return (
              <Link
                key={sorting.title}
                onClick={() => setIsOpen(false)}
                href={`${pathname}?${category ? `c=${category}` : ''}${min || max ? `&min=${min}&max=${max}` : ''}&${sorting.href}`}
                className={cn('py-1 px-2 rounded-md text-neutral-4 ', activeSort && 'bg-neutral-3')}
              >{sorting.title}</Link>
            )
          }
          )}
        </div>
      </div>
    </div>
  )
}

export default Sort
