import CartBreadCrumb from '@/components/CartBreadCrumb';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ShoppingCart = dynamic(() => import('@/components/cart/ShoppingCart'));


export const metadata: Metadata = {
  title: "My Cart | Omnishop",
  description: "View and manage your cart items on Omnishop",
}

const CartPage = () => {

  return (
    <div className='container font-inter'>
      <h1 className='cart-header'>Cart</h1>
      <CartBreadCrumb pageId={1} />
      
      <div className='mt-24'>
        <ShoppingCart />
      </div>
    </div>
  )
}

export default CartPage
