'use client'

import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext'

const ShopPage = () => {

  const { products } = useProducts();

  return (
    <div className='container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
      {
        products && products.length > 0 ? products.map((product, index) =>
          <ProductCard key={index} {...product} />
        ) : <p className='items-center text-2xl grid-cols-10'>No Product Found !!!</p>
      }
    </div>
  )
}

export default ShopPage
