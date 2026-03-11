import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'

const Rating = ({ rating }: { rating: number }) => {
  return (
    <>
      {rating > 0 ? <div role="img" aria-label={`Rating: ${Math.ceil(rating)} out of 5 stars`} className='flex items-center -ml-1'>
        {Array.from({ length: 5 }, (_, i) => i < Math.ceil(rating)).map((isFilled, i) => (
          <StarIcon
            aria-hidden="true"
            size={18}
            key={i}
            className={cn(isFilled ? "fill-orange" : "fill-neutral-3", 'text-transparent')}
          />
        ))}
      </div> : <div role="img" aria-label="No rating" className='flex items-center -ml-1'>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            aria-hidden="true"
            size={18}
            key={i}
            className='fill-neutral-3 text-transparent'
          />
        ))}
      </div>}</>
  )
}

export default Rating
