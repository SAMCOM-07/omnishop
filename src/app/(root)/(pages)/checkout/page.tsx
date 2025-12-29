import CheckoutSummary from '@/components/cart/CheckoutSummary'
import CartBreadCrumb from '@/components/CartBreadCrumb'
import React from 'react'

const CheckOutPage = () => {
  return (
    <div className='container'>
      <h1 className='cart-header'>Checkout</h1>
      <CartBreadCrumb />

      <div className='mt-24'>
        <CheckoutSummary />
      </div>
    </div>
  )
}

export default CheckOutPage
