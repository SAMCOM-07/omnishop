'use client'

import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import { useProducts } from '@/context/ProductContext'

const ShopPage = () => {

  const { products, loading } = useProducts();

  return (
    <div className='container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
      {loading ? Array.from({ length: 15 }).map((_, index) => <ProductSkeleton key={index} />) :
        products && products.length > 0 && products.map((product, index) =>
          <ProductCard key={index} {...product} />
        )
      }
    </div>
  )
}

export default ShopPage
