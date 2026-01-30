'use client';

import { useWishlist } from '@/context/WishlistContext';
import { AddToCartBtn, RemoveFromWishlistButton } from '../Buttons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

const MyWishlist = () => {

  const { wishlistItems, loadingWishlist } = useWishlist();




  if (wishlistItems?.length === 0 && !loadingWishlist) {
    return (
      <div className='container py-24'>
        <p className='text-center mt-16 text-neutral-4'>Your wishlist is empty.</p>
        <Link href="/shop" className='block w-fit mx-auto mt-6 submit-button'>Go to Shop</Link>
      </div>
    )
  }

  if (loadingWishlist) {
    return (
      <div className='container py-24 grid place-content-center'>
        <p className='text-center text-neutral-4'>Loading Wishlist . . .</p>
      </div>
    )
  }

  return (
    <section className='w-full'>
      {/* sm widths */}

      <section className='lg:hidden flex flex-col gap-8'>
        {
          wishlistItems && wishlistItems.length > 0 && wishlistItems.map(item =>
            <div key={item.id}
              className={cn('flex flex-col gap-4 pb-6', wishlistItems.length > 1 && 'border-b-2 border-neutral-3')}
            >
              <div className='flex gap-4 items-center'>
                <RemoveFromWishlistButton productId={item.id} />
                <Link href={`/shop/${item.id}`} className='aspect-square overflow-hidden block rounded-md w-28 h-28 bg-neutral-2'>
                  <Image width={400} height={400} priority src={item.images[0].url.replace(
                    "/upload/",
                    "/upload/f_auto,q_auto,w_600/"
                  )} alt={item.name} className='h-full w-full object-cover object-center hover:scale-110 active:scale-110 transition-all duration-500' />
                </Link>
                <div>
                  <div className='flex flex-col gap-4'>
                    <Link href={`/shop/${item.id}`} className='font-semibold line-clamp-1 max-w-42'>{item.name}</Link>
                  </div>
                  <span className='text-sm font-semibold'>${item.discountedAmount ?? item.price}</span>
                </div>
              </div>
              <AddToCartBtn product={item} />
            </div>
          )
        }
      </section>

      {/* widths above sm */}
      <table className='w-full hidden lg:table'>
        <thead>
          <tr className='border-b-2 border-neutral-3'>
            {['Product', 'Price', 'Action'].map((head) => (
              <th key={head} className={cn('text-center pb-4 font-bold', head === 'Product' && 'text-left')}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody className=''>
          {wishlistItems && wishlistItems.length !== 0 && wishlistItems?.map((item) =>
            <tr key={item.id} className='border-b border-neutral-3 text-center'>
              <td className='py-6 pr-4'>
                <div className='flex items-center gap-4'>
                  <RemoveFromWishlistButton productId={item.id} />
                  <Link href={`/shop/${item.id}`} className='aspect-square overflow-hidden block rounded-md w-28 h-28 bg-neutral-2'>
                    <Image width={400} height={400} priority src={item.images[0].url.replace(
                      "/upload/",
                      "/upload/f_auto,q_auto,w_600/"
                    )} alt={item.name} className='h-full w-full object-cover object-center hover:scale-110 active:scale-110 transition-all duration-500' />
                  </Link>
                  <div className='flex flex-col gap-4'>
                    <Link href={`/shop/${item.id}`} className='font-semibold line-clamp-1 max-w-42 xl:max-w-full'>{item.name}</Link>
                  </div>
                </div>
              </td>
              <td className='font-semibold px-4'>${item.discountedAmount ?? item.price}</td>
              <td className='pl-4'>
                <AddToCartBtn product={item} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}

export default MyWishlist
