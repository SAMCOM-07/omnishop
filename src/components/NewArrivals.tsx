import { LinkButton, WishListBtn } from './Buttons'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProducts } from '@/lib/getProducts'
import { AddToCartBtn } from './Buttons'
import Rating from './Rating'
import { ProductType } from '@/types/types'

const NewArrivals = async () => {

  const products: ProductType[] = await getAllProducts();

  return (
    <section className='overflow-x-hidden'>
      <div className='flex items-end justify-between'>
        <h1 className='inline-block leading-8'>New <span className='block'>Arrivals</span></h1>
        <LinkButton text='All Products' href='/shop' />
      </div>
      <div className='mt-12 flex items-start overflow-x-auto gap-6'>
        {
          products && products.length > 0 ? products.slice(0, 10).map((p, index) => {
            const product = { ...p }
            return (
              <div key={index} className='group overflow-clip'>
                <div className='p-3 bg-neutral-2 space-y-3'>
                  <div className='flex item-start justify-between'>
                    <h4 className='px-2.5 py-0.5 rounded-sm bg-neutral-1 font-bold h-fit'>NEW</h4>
                    <WishListBtn productId={product.id} />
                  </div>
                  {product.discount !== 0 ? <h5 className='bg-green text-center text-neutral-1 font-semibold rounded-sm w-fit h-5 px-2.5'>-{product.discount}%</h5> : <h5 className='h-5'></h5>}
                  <Link href={`/shop/${product.id}`} className='overflow-hidden block w-[250px] h-[250px] rounded-md'>
                    <Image width={400} height={400} priority src={product.images[0].url.replace(
                      "/upload/",
                      "/upload/f_auto,q_auto,w_600/"
                    )} alt={product.name} className='h-full w-full object-cover object-center hover:scale-110 active:scale-110 transition-all duration-500' />
                  </Link>
                  <AddToCartBtn product={product} />
                </div>
                <div className='space-y-0.5 p-3'>
                  <Rating rating={product.rating} />
                  <Link href={`/shop/${product.id}`} className='font-bold line-clamp-1'>{product.name}</Link>
                  <span className='text-sm font-bold'>{product.discount ? '$' + product.discountedAmount : '$' + product.price}</span>
                  <span className='text-sm ml-4 line-through text-neutral-4'>{product.discount ? `$${product.price}` : ''}</span>
                </div>
              </div>
            )
          }
          ) : <p className='text-center w-full py-12'>No product found !</p>
        }
      </div>
    </section>
  )
}

export default NewArrivals
