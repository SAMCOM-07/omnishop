import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import { getProducts } from '@/lib/getProducts';
import { Suspense } from 'react';

const ShopPage = async () => {

  const products = await getProducts();

  return (
    <Suspense fallback={<div className='container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
      {Array.from({ length: 15 }).map((_, index) => <ProductSkeleton key={index} />)}
    </div>}>
      <div className='container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {
          products && products.length > 0 && products.map((product, index) =>
            <ProductCard key={index} {...product} />
          )
        }
      </div>
    </Suspense>
  )
}

export default ShopPage
