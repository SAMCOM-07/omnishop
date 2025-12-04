import ProductCard from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/Skeletons';
import { getProductsByPriceRange, getProductsByCategory, getAllProducts, getProductsByCategoryAndPriceRange } from '@/lib/getProducts';
import { Suspense } from 'react';
import bannerImg from './../../../../../public/images/clothes2.jpg';
import Image from 'next/image';
import { LinkButton } from '@/components/Buttons';
import Sort from '@/components/Sort';
import Filter from '@/components/Filter';
import Newsletter from '@/components/Newsletter';
import { ProductType } from '@/types/types';

const ShopPage = async ({ searchParams }: { searchParams: { c: string, min: string, max: string, sort: string } }) => {

  const { c, min, max, sort } = await searchParams;

  let products;

  if (c && (min && max)) {
    const p: ProductType[] = await getProductsByCategoryAndPriceRange(c, min, max);
    if (sort) {
      products = p.sort((a, b) => sort === 'low' ? a.discountedAmount - b.discountedAmount : b.discountedAmount - a.discountedAmount)
    }
    else {
      products = p;
    }
  } else if (c && (!min && !max)) {
    const p: ProductType[] = await getProductsByCategory(c);
    if (sort) {
      products = p.sort((a, b) => sort === 'low' ? a.discountedAmount - b.discountedAmount : b.discountedAmount - a.discountedAmount)
    }
    else {
      products = p;
    }
  } else if ((min && max) && !c) {
    const p: ProductType[] = await getProductsByPriceRange(min, max);
    if (sort) {
      products = p.sort((a, b) => sort === 'low' ? a.discountedAmount - b.discountedAmount : b.discountedAmount - a.discountedAmount)
    }
    else {
      products = p;
    }
  } else {
    const p: ProductType[] = await getAllProducts();
    if (sort) {
      products = p.sort((a, b) => sort === 'low' ? a.discountedAmount - b.discountedAmount : b.discountedAmount - a.discountedAmount)
    }
    else {
      products = p;
    }
  }



  return (
    <>
      <section className='flex items-center justify-center overflow-hidden bg-gray-500 relative '>
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

      <div className='container flex flex-col md:flex-row mt-8 mb-18'>
        <Filter category={c} min={min} max={max} sort={sort} />
        <div className='w-full'>
          <div className='flex items-center justify-between sticky inset-0 top-32 md:top-14 pt-6 pb-3 z-30 bg-neutral-1'>
            {c ? <h3 className='capitalize'>{c} {min && max ? ` ($${min} - $${max})` : ''}</h3> : <h3 className=''>All Products {min && max ? ` ($${min} - $${max})` : ''}</h3>}
            <Sort category={c} min={min} max={max} sort={sort} />
          </div>

          {/* product grid */}
          <Suspense fallback={<div className='product-fallback mt-6'>
            {Array.from({ length: 15 }).map((_, index) => <ProductSkeleton key={index} />)}
          </div>}>
            <div className='product-grid mt-6'>
              {
                products && products.length > 0 ? products.map((product) =>
                  <ProductCard key={product.id} {...product} />
                ) : <p className='py-32 col-span-full place-content-center w-full h-full text-center'>No product found !</p>
              }
            </div>
          </Suspense>
        </div>
      </div>


      <Newsletter />
    </>
  )
}

export default ShopPage
