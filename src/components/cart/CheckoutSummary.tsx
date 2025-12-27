'use client';

import CartBreadCrumb from '../CartBreadCrumb';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';

const CheckoutSummary = () => {
  const pathname = usePathname()

  const { cartItems, totalPrice } = useCart();

  return (
    <div className='container'>
      <h1 className='cart-header'>Checkout</h1>
      <CartBreadCrumb />


      {/* cart items display for width above md */}
      <section className='mt-8 hidden md:block'>
        <table>

        </table>
      </section>
    </div>
  )
}

export default CheckoutSummary
