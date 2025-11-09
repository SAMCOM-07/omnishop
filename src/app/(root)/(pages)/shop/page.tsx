import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/getProducts';

const ShopPage = async () => {

  const products = await getProducts();

  return (
    <div className='container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
      {
        products && products.length > 0 && products.map((product, index) =>
          <ProductCard key={index} {...product} />
        )
      }
    </div>
  )
}

export default ShopPage
