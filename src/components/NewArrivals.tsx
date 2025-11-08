'use client'

import Button from './Button'
import { useProducts } from '@/context/ProductContext'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import ProductSkeleton from './ProductSkeleton'

const NewArrivals = () => {

  const { products, loading } = useProducts();

  return (
    <section className='overflow-x-hidden'>
      <div className='flex items-end justify-between'>
        <h1 className='inline-block leading-8'>New <span className='block'>Arrivals</span></h1>
        <Button text='All Products' href='/shop' />
      </div>
      <div className='mt-12 flex items-start overflow-x-auto gap-6'>
        {loading ? <div className='flex gap-4 items-center overflow-x-auto w-full'>
          {Array.from({ length: 10 }).map((_, index) =>
            <div key={index} className='w-full min-w-[250px] max-w-[250px]'><ProductSkeleton /></div>
          )}
        </div> :
          products && products.length > 0 && products.slice(0, 10).map((product, index) =>
            <div key={index} className='group overflow-clip'>
              <div className='p-3 bg-neutral-2 space-y-3'>
                <div className='flex item-start justify-between'>
                  <h4 className='px-2.5 py-0.5 rounded-sm bg-neutral-1 font-bold h-fit'>NEW</h4>
                  <button
                    className='text-neutral-4 bg-neutral-1 p-1.5 rounded-full shadow-lg lg:opacity-0 group-hover:opacity-100 transition-all duration-500'
                  ><Heart size={20} className='hover-scale' /></button>
                </div>
                {product.discount !== 0 ? <h5 className='bg-green text-center text-neutral-1 font-semibold rounded-sm w-fit h-5 px-2.5'>-{product.discount}%</h5> : <h5 className='h-5'></h5>}
                <Link href={`/shop/${product.id}`} className='overflow-hidden block w-[250px] h-[250px] rounded-md'>
                  <Image width={400} height={400} priority src={product.images[0].url.replace(
                    "/upload/",
                    "/upload/f_auto,q_auto,w_600/"
                  )} alt={product.name} className='h-full w-full object-cover object-center hover:scale-110 active:scale-110 transition-all duration-500' />
                </Link>
                <button className='hover-scale bg-neutral-7 text-neutral-1 p-3 rounded-md w-full text-center font-inter lg:opacity-0 group-hover:opacity-100  transition-all duration-700'>Add to Cart</button>
              </div>
              <div className='space-y-0.5 p-3'>
                <Link href={`/shop/${product.id}`} className='font-bold line-clamp-1'>{product.name}</Link>
                <span className='text-sm font-bold'>{product.discount ? product.discountedAmount : product.price}</span>
                <span className='text-sm ml-4 line-through text-neutral-4'>{product.discount ? `$${product.price}` : ''}</span>
              </div>
            </div>
          )
        }
      </div>
    </section>
  )
}

export default NewArrivals
