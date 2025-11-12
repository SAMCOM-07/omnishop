'use client'

import { cn } from '@/lib/utils';
import Image from 'next/image'
import { useState } from 'react';

interface ProductDetailsImagesProps {
  productImages: { publicId: string, url: string }[];
  discount: number;
}

const ProductDetailsImages = ({ productImages, discount }: ProductDetailsImagesProps) => {

  const [count, setCount] = useState(0);

  return (
    <div className='grid grid-cols-1 gap-2 max-w-lg mx-auto min-h-96'>
      <div className='w-full aspect-square bg-neutral-2 relative'>
        <Image src={productImages[count]?.url} alt={`Product Image`} width={400} height={400} className='w-full h-full object-cover object-center' />
      {/* discount indicator */}
      {discount !== 0 && <h4 className='bg-green rounded-small text-center text-neutral-1 font-semibold rounded-sm w-fit px-2.5 absolute top-5 left-5'>-{discount}%</h4> }
      </div>

      {
        productImages.length > 1 && <div className={cn('grid gap-2 max-h-20 overflow-hidden', productImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3')}>
          <div onClick={() => setCount(0)} >
            <Image src={productImages[0]?.url} alt={`Product Image 1`} width={400} height={400} className={cn('w-full object-cover object-top h-full transition-opacity duration-300', count === 0 ? 'opacity-100' : 'opacity-50')} />
          </div>
          {
            productImages.length > 1 && <div onClick={() => setCount(1)} >
              <Image src={productImages[1]?.url} alt={`Product Image 2`} width={400} height={400} className={cn('w-full object-cover object-top h-full transition-opacity duration-300', count === 1 ? 'opacity-100' : 'opacity-50')} />
            </div>
          }
          {
            productImages.length > 2 && <div onClick={() => setCount(2)} >
              <Image src={productImages[2]?.url} alt={`Product Image 3`} width={400} height={400} className={cn('w-full object-cover object-top h-full transition-opacity duration-300', count === 2 ? 'opacity-100' : 'opacity-50')} />
            </div>
          }
        </div>
      }

    </div >
  )
}

export default ProductDetailsImages
