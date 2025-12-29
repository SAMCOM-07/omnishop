'use client'

import { IncreaseAndDecreaseButton, RemoveFromCartButton } from '@/components/Buttons';
import CartBreadCrumb from '@/components/CartBreadCrumb'
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ShoppingCart = () => {

  const pathname = usePathname()

  const { cartItems, loading, subTotalPrice } = useCart();

  const cartItemsReversed = cartItems?.slice().reverse();
  const tableHead = ['Product', 'Quantity', 'Price', 'Subtotal']

  if (cartItemsReversed?.length === 0) {
    return (
      <div className='container py-24'>
        <p className='text-center mt-16 text-neutral-4'>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className='flex-1 w-full'>
      {/* cart items display for sm & md width */}
      <section className='lg:hidden'>
        <span className='py-4 border-b-2 border-neutral-3 block'>Product</span>
        <div className='flex flex-col overflow-y-auto max-h-150'>
          {
            cartItemsReversed && cartItemsReversed.length !== 0 && cartItemsReversed?.map((item =>
              <div key={item.id} className='flex items-center gap-12 justify-between py-6 border-b border-neutral-3'>
                <div className='flex items-center gap-3'>
                  <Link href={`/shop/${item.id}`} className='aspect-square overflow-hidden block rounded-md w-28 h-28 bg-neutral-2'>
                    <Image width={400} height={400} priority src={item.images[0].url.replace(
                      "/upload/",
                      "/upload/f_auto,q_auto,w_600/"
                    )} alt={item.name} className='h-full w-full object-cover object-center hover:scale-110 active:scale-110 transition-all duration-500' />
                  </Link>
                  <div className='flex flex-col gap-2 h-full items-left'>
                    <Link href={`/shop/${item.id}`} className='max-w-40 sm:max-w-full line-clamp-1 font-semibold'>{item.name}</Link>
                    <span className='font-inter text-neutral-5 text-sm'>${item.discountedAmount ?? item.price}</span>
                    <IncreaseAndDecreaseButton productId={item.id} quantity={item.quantity} />
                  </div>
                </div>
                <div className='flex flex-col gap-2 items-end'>
                  <span className='font-semibold text-sm'>${item.discountedAmount ? item.discountedAmount * item.quantity : item.price * item.quantity}</span>
                  <RemoveFromCartButton productId={item.id} />
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* cart items display for width above md */}
      <section className='hidden lg:block overflow-y-auto max-h-150'>
        <table className='w-full '>
          <thead>
            <tr className='border-b-2 border-neutral-3'>
              {tableHead.map((head) => (
                <th key={head} className={cn('text-center pb-4 font-bold', head === 'Product' && 'text-left', head === 'Quantity' && 'lg:text-left pl-4')}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className=''>
            {cartItems && cartItems.length !== 0 && cartItems?.map((item) =>
              <tr key={item.id} className='border-b border-neutral-3 text-center'>
                <td className='py-6'>
                  <div className='flex items-center gap-4'>
                    <Link href={`/shop/${item.id}`} className='aspect-square overflow-hidden block rounded-md w-28 h-28 bg-neutral-2'>
                      <Image width={400} height={400} priority src={item.images[0].url.replace(
                        "/upload/",
                        "/upload/f_auto,q_auto,w_600/"
                      )} alt={item.name} className='h-full w-full object-cover object-center hover:scale-110 active:scale-110 transition-all duration-500' />
                    </Link>
                    <div className='flex flex-col gap-4'>
                      <Link href={`/shop/${item.id}`} className='font-semibold line-clamp-1'>{item.name}</Link>
                      <RemoveFromCartButton productId={item.id} text='Remove' />
                    </div>
                  </div>
                </td>
                <td>
                  <IncreaseAndDecreaseButton productId={item.id} quantity={item.quantity} />
                </td>
                <td className='font-semibold'>${item.discountedAmount ?? item.price}</td>
                <td className='font-semibold'>${(item.discountedAmount ?? item.price) * item.quantity}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <div className="mt-24 flex flex-col gap-4 font-inter font-semibold">
        <div className="flex items-center justify-between">
          <span>Subtotal:</span>
          <span>${subTotalPrice.toFixed(2)}</span>
        </div>

        <Link href="/checkout" className="w-full block bg-neutral-5 text-white p-3 rounded-md hover:bg-neutral-7 transition-all duration-300 text-center mt-4 active:scale-95">Checkout</Link>
      </div>
    </div>
  )
}

export default ShoppingCart