import ProductCard from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/Skeletons';
import { getProductsByPriceRange, getProductsByCategory, getAllProducts, getProductsByCategoryAndPriceRange } from '@/lib/getProducts';
import { Suspense } from 'react';
import bannerImg from './../../../../../public/images/clothes2.jpg';
import Image from 'next/image';
import { LinkButton } from '@/components/Buttons';
import Sort from '@/components/Sort';
import Filter from '@/components/Filter';

const ShopPage = async ({ searchParams }: { searchParams: { c: string, min: string, max: string } }) => {

  const { c, min, max } = await searchParams;

  let products;

  if (c && (min || max)) {
    products = await getProductsByCategoryAndPriceRange(c, min, max);
  } else if (c) {
    products = await getProductsByCategory(c);
  } else if (min || max) {
    products = await getProductsByPriceRange(min, max);
  }
  else {
    products = await getAllProducts();
  }



  return (
    <>
      <section className='flex items-center justify-center overflow-hidden bg-gray-500 relative'>
        <div
          className='w-full lg:h-[600px] h-[400px] bg-gray-200 transition-all duration-500'>
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

      {/* filter, sort and category-title */}

      <div className='container flex flex-col md:flex-row mt-8'>
        <Filter category={c} min={min} max={max} />
        <div className='w-full'>
          <div className='flex items-center justify-between sticky inset-0 top-32 md:top-14 py-6 z-30 bg-neutral-1'>
            {c ? <h3 className='capitalize'>{c}</h3> : <h3 className=''>All Products</h3>}
            <Sort />
          </div>

          {/* product grid */}
          <Suspense fallback={<div className='product-fallback mt-6'>
            {Array.from({ length: 15 }).map((_, index) => <ProductSkeleton key={index} />)}
          </div>}>
            <div className='product-grid mt-6'>
              {
                products && products.length > 0 ? products.map((product) =>
                  <ProductCard key={product.id} {...product} />
                ) : <p className='py-6 col-span-full place-self-center w-full'>No product found !</p>
              }
            </div>
          </Suspense>
        </div>
      </div>


    </>
  )
}

export default ShopPage
