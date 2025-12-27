'use client'

import { IncreaseAndDecreaseButton, RemoveFromCartButton } from '@/components/Buttons';
import CartBreadCrumb from '@/components/CartBreadCrumb'
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ShoppingCart = () => {

  const pathname = usePathname()

  const { cartItems, totalPrice } = useCart();

  const tableHead = ['Product', 'Quantity', 'Price', 'Subtotal']

  if (cartItems?.length === 0) {
    return (
      <div className='container py-24'>
        <p className='text-center mt-16 text-neutral-4'>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1 className='cart-header'>Cart</h1>
      <CartBreadCrumb />

      {/* cart items display for sm & md width */}
      <section className='mt-8 md:hidden'>
        <span className='py-4 border-b-2 border-neutral-3 block'>Product</span>
        <div className='flex flex-col gap-4 mt-6'>
          {
            cartItems && cartItems.length !== 0 && cartItems?.map((item =>
              <div key={item.id} className='flex items-center gap-4 justify-between'>
                <div className='flex items-center gap-3'>
                  <Link href={`/shop/${item.id}`} className='aspect-square overflow-hidden block rounded-md w-28 h-28 bg-neutral-2'>
                    <Image width={400} height={400} priority src={item.images[0].url.replace(
                      "/upload/",
                      "/upload/f_auto,q_auto,w_600/"
                    )} alt={item.name} className='h-full w-full object-cover object-center hover:scale-110 active:scale-110 transition-all duration-500' />
                  </Link>
                  <div className='flex flex-col gap-2 justify-between h-full items-center'>
                    <Link href={`/shop/${item.id}`} className='max-w-24 line-clamp-1 font-semibold'>{item.name}</Link>
                    <IncreaseAndDecreaseButton productId={item.id} quantity={item.quantity} />
                  </div>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                  <span className='font-semibold text-sm'>${item.price}</span>
                  <RemoveFromCartButton productId={item.id} />
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* cart items display for width above md */}
      <section className='mt-8 hidden md:block'>
        <table>

        </table>
      </section>
    </div>
  )
}

export default ShoppingCart