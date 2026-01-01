import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'

const Rating = ({ rating }: { rating: number }) => {
  return (
    <>
      {rating > 0 ? <div className='flex items-center -ml-1'>
        {Array.from({ length: 5 }, (_, i) => i < Math.ceil(rating)).map((isFilled, i) => (
          <StarIcon
            size={18}
            key={i}
            className={cn(isFilled ? "fill-orange" : "fill-neutral-3", 'text-transparent')}
          />
        ))}
      </div> : <div className='flex items-center -ml-1'>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            size={18}
            key={i}
            className='fill-neutral-3 text-transparent'
          />
        ))}
      </div>}</>
  )
}

export default Rating
