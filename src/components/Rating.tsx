import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import React from 'react'

const Rating = ({ rating }: { rating: number }) => {
  return (
    <>
      {rating > 0 ? <div className='flex items-center -ml-1'>
        {Array.from({ length: 5 }, (_, i) => i < Math.floor(rating)).map((isFilled, i) => (
          <StarIcon
            key={i}
            className={cn(isFilled ? "fill-orange" : "fill-neutral-3", 'text-neutral-1')}
          />
        ))}
      </div> : <div className='flex items-center -ml-1'>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className='fill-neutral-3 text-neutral-1'
          />
        ))}
      </div>}</>
  )
}

export default Rating
