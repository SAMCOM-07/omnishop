import CartBreadCrumb from '@/components/CartBreadCrumb'
import dynamic from 'next/dynamic'

const CheckoutSummary = dynamic(() => import('@/components/cart/CheckoutSummary'))

const CheckOutPage = () => {
  return (
    <div className='container'>
      <h1 className='cart-header'>Checkout</h1>
      <CartBreadCrumb pageId={2} />

      
        <CheckoutSummary />
        
     
    </div>
  )
}

export default CheckOutPage
