'use client'
import React from 'react'
import Button from './Button'
import { useProducts } from '@/context/ProductContext'
import Image from 'next/image'
import { Heart } from 'lucide-react'

const NewArrivals = () => {

  const { products } = useProducts();


  return (
    <section className='overflow-x-hidden'>
      <div className='flex items-end justify-between'>
        <h1 className='inline-block leading-8'>New <span className='block'>Arrivals</span></h1>
        <Button text='More Products' href='/shop' />
      </div>
      <div className='mt-12 flex items-start overflow-x-auto gap-6 p-2'>
        {
          products && products.length > 0 ? products.slice(0, 10).map((product, index) =>
            <div key={index} className='group overflow-clip'>
              <div className='p-3 bg-neutral-2 space-y-2'>
                <div className='flex item-start justify-between'>
                  <h4 className='px-2.5 py-0.5 rounded-sm bg-neutral-1 font-bold h-fit'>NEW</h4>
                  <Heart size={36} className='text-neutral-4 bg-neutral-1 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500'/>
                </div>
                {product.discount !== 0 ? <h5 className='bg-green rounded-small text-center text-neutral-1 font-semibold rounded-sm w-fit h-5 px-2.5'>-{product.discount}%</h5> : <h5 className='h-5'></h5>}
                <div className='overflow-hidden w-[300px] h-[300px]'>
                  <Image width={400} height={400} priority src={product.images[0].url.replace(
                    "/upload/",
                    "/upload/f_auto,q_auto,w_600/"
                  )} alt={product.name} className='h-full w-full object-contain object-center' />
                </div>
                <button className='bg-neutral-7 text-neutral-1 p-3 rounded-md w-full text-center font-inter opacity-0 group-hover:opacity-100 transition-all duration-700'>Add to Cart</button>
              </div>
              <div className='space-y-0.5 p-3'>
                <h4 className='font-bold line-clamp-1'>{product.name}</h4>
                {/* <p className='line-clamp-2 leading-4 text-sm text-neutral-4'>{product.description}</p> */}
                {product.discountedAmount ? <span className='text-sm font-bold'>${product.discountedAmount}</span> : ''}
                <span className='text-sm ml-4 line-through text-neutral-4'>${product.price}</span>
              </div>
            </div>
          ) : <p className='items-center text-2xl grid-cols-10'>No Product Found !!!</p>
        }
      </div>
    </section>
  )
}

export default NewArrivals
