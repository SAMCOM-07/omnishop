import ProductSkeleton from '@/components/ProductSkeleton'


const ProductLoadingPage = () => {
  return (
    <div className='container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
      {Array.from({ length: 15 }).map((_, index) => <ProductSkeleton key={index} />)}
    </div>
  )
}

export default ProductLoadingPage
