import CartBreadCrumb from '@/components/CartBreadCrumb';
import dynamic from 'next/dynamic';

const ShoppingCart = dynamic(() => import('@/components/cart/ShoppingCart'));

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
