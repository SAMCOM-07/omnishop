import CheckoutSummary from '@/components/cart/CheckoutSummary'
import OrderSummary from '@/components/cart/OrderSummary'
import CartBreadCrumb from '@/components/CartBreadCrumb'
import React from 'react'

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
