import { ProductType } from '@/types/types';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartBtn } from './Buttons';
import Rating from './Rating';

const ProductCard = (p: ProductType) => {

  const product = {...p};
  
  return (
    <div className='group overflow-clip'>
      <div className='p-3 bg-neutral-2 space-y-3'>
        <div className='flex items-center justify-between'>
          {product.discount !== 0 ? <h5 className='bg-green rounded-small text-center text-neutral-1 font-semibold rounded-sm w-fit h-5 px-2.5'>-{product.discount}%</h5> : <h5 className='h-5'></h5>}
          <button
            className='text-neutral-4 bg-neutral-1 p-1.5 rounded-full shadow-lg lg:opacity-0 group-hover:opacity-100 transition-all duration-500'
          ><Heart size={20} className='hover-scale' /></button>
        </div>
        <Link href={`/shop/${product.id}`} className='aspect-square overflow-hidden block rounded-md w-full'>
          <Image width={400} height={400} priority src={product.images[0].url.replace(
            "/upload/",
            "/upload/f_auto,q_auto,w_600/"
          )} alt={product.name} className='h-full w-full object-cover object-center hover:scale-110 active:scale-110 transition-all duration-500' />
        </Link>
        <div className='lg:opacity-0 group-hover:opacity-100 transition-all duration-700'>
          <AddToCartBtn product={product} />
        </div>
      </div>
      <div className='p-3'>
        <Rating rating={product.rating} />
        <Link href={`/shop/${product.id}`} className='font-bold line-clamp-1'>{product.name}</Link>

        <span className='text-sm font-bold'>{product.discount ? '$' + product.discountedAmount : '$' + product.price}</span>
        <span className='text-sm ml-4 line-through text-neutral-4'>{product.discount ? `$${product.price}` : ''}</span>
      </div>
    </div>
  )
}

export default ProductCard


