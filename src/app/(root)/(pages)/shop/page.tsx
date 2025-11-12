import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import { getProducts } from '@/lib/getProducts';
import { Suspense } from 'react';

const ShopPage = async () => {

  const products = await getProducts();

  return (
    <Suspense fallback={<div className='product-fallback mt-12'>
      {Array.from({ length: 15 }).map((_, index) => <ProductSkeleton key={index} />)}
    </div>}>
      <div className='product-grid mt-12'>
        {
          products && products.length > 0 ? products.map((product) =>
            <ProductCard key={product.id} {...product} />
          ): <p className='py-6 col-span-full place-self-center'>No product found !</p>
        }
      </div>
    </Suspense>
  )
}

export default ShopPage
