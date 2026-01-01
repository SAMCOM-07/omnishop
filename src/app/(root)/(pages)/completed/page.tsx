import OrderCompleted from '@/components/cart/OrderCompleted'
import CartBreadCrumb from '@/components/CartBreadCrumb'
import React from 'react'

const CompletionPage = () => {
  return (
    <div className='container'>
      <h1 className='cart-header'>Completed</h1>
      <CartBreadCrumb pageId={3} />

      <div className='my-24 flex justify-center items-center'>
        <OrderCompleted />
      </div>

    </div>
  )
}

export default CompletionPage
