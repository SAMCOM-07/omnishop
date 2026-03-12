import CartBreadCrumb from '@/components/CartBreadCrumb'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const CheckoutSummary = dynamic(() => import('@/components/cart/CheckoutSummary'))

export const metadata: Metadata = {
  title: "Checkout | Omnishop",
  description: "Review your order and proceed to payment on Omnishop",
}

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
