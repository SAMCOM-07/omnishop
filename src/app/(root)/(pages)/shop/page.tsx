import ProductCard from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/Skeletons';
import { getProductsByPriceRange, getProductsByCategory, getAllProducts, getProductsByCategoryAndPriceRange } from '@/lib/getProducts';
import { Suspense } from 'react';
import bannerImg from './../../../../../public/images/clothes2.jpg';
import Image from 'next/image';
import { LinkButton } from '@/components/Buttons';
import Sort from '@/components/Sort';
import Filter from '@/components/Filter';
import { ProductType } from '@/types/types';

const sortProducts = (products: ProductType[], sortOrder?: string): ProductType[] => {
  if (!sortOrder) return products;
  return products.sort((a, b) =>
    sortOrder === 'low'
      ? a.discountedAmount - b.discountedAmount
      : b.discountedAmount - a.discountedAmount
  );
};

const ShopPage = async ({ searchParams }: { searchParams: { c: string, min: string, max: string, sort: string } }) => {

  const { c, min, max, sort } = await searchParams;

  let productsData: ProductType[];

  if (c && (min && max)) {
    productsData = await getProductsByCategoryAndPriceRange(c, min, max);
  } else if (c && (!min && !max)) {
    productsData = await getProductsByCategory(c);
  } else if ((min && max) && !c) {
    productsData = await getProductsByPriceRange(min, max);
  } else {
    productsData = await getAllProducts();
  }

  const products = sortProducts(productsData, sort);



  return (
    <>
      <section className='flex items-center justify-center overflow-hidden bg-gray-500 relative '>
        <div
          className='w-full lg:h-150 h-100 bg-gray-200 transition-all duration-500'>
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
        <div>
          <div className='md:min-w-[16rem] md:max-w-[16rem] sticky top-14 z-40 bg-neutral-1 mr-4 '>
            <Filter category={c} min={min} max={max} sort={sort} />
          </div>
        </div>
        <div className='w-full'>
          <div className='flex items-center justify-between sticky top-32 md:top-14 pt-6 pb-3 z-30 bg-neutral-1'>
            <h3 className='capitalize'>{c ? c : 'All Products'} {min && max ? ` ($${min} - $${max})` : '(All Prices)'}</h3>
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
    </>
  )
}

export default ShopPage
