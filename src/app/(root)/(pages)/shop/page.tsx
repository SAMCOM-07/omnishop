import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import { getProducts } from '@/lib/getProducts';
import { Suspense } from 'react';
import bannerImg from './../../../../../public/images/clothes2.jpg';
import Image from 'next/image';
import { LinkButton } from '@/components/Buttons';

const ShopPage = async ({ searchParams }: { searchParams: { c: string } }) => {

  const { c } = await searchParams;
  const products = await getProducts(c);

  return (
    <>
      <section className='flex items-center justify-center overflow-hidden bg-gray-500 relative'>
        <div
          className='w-full lg:h-[600px] h-[400px] bg-gray-200 transition-all duration-500 relative'>
          <Image
            src={bannerImg}
            alt='banner Image'
            priority
            width={600}
            height={400}
            className='w-full h-full object-cover object-center'
          />
        </div>
        {/* texts, overlay and CTA button */}
        <div className='text-center flex flex-col gap-3 items-center justify-center p-6 absolute bg-black/50  inset-0 w-full h-full text-neutral-1'>
          <h1 className='mx-auto sm:text-3xl lg:text-5xl leading-6.5 lg:leading-10 font-extrabold'>Feel Free To Shop Anything !!!</h1>
          <span className='mx-auto mt-2 text-xs sm:text-sm lg:text-lg font-bold'>You can filter by category and also sort</span>
          <LinkButton text='Go Home' href='/' />
        </div>
      </section>

      {/* heading */}

      <div className='container flex'>
        {c ? <h1 className='mt-12 text-center'>Category: <span className='text-green capitalize'>{c}</span></h1> : <h1 className='mt-12 text-center'>All Products</h1>}
      </div>

      {/* product grid */}
      <Suspense fallback={<div className='product-fallback mt-12'>
        {Array.from({ length: 15 }).map((_, index) => <ProductSkeleton key={index} />)}
      </div>}>
        <div className='product-grid mt-12'>
          {
            products && products.length > 0 ? products.map((product) =>
              <ProductCard key={product.id} {...product} />
            ) : <p className='py-6 col-span-full place-self-center'>No product found !</p>
          }
        </div>
      </Suspense>
    </>
  )
}

export default ShopPage
