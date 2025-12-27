// 'use client'

// import CheckoutSummary from "@/components/cart/CheckoutSummary"
// import OrderCompleted from "@/components/cart/OrderCompleted"
// import ShoppingCart from "@/components/cart/ShoppingCart"
// import { useState } from "react";

// const CartsPage = () => {

//   const [pageIndex, setPageIndex] = useState(1);

//   const pages = [
//     { id: 1, title: 'Shopping Cart' },
//     { id: 2, title: 'Checkout Summary' },
//     { id: 3, title: 'Order Completed' },
//   ]

//   return (
//     <div className='h-screen container mx-auto my-18'>
//       {pageIndex === 1 && <h1 className="cart-header">Cart</h1>}
//       {pageIndex === 2 && <h1 className="cart-header">Checkout</h1>}
//       {pageIndex === 3 && <h1 className="cart-header">Complete!</h1>}




//       {pageIndex === 1 && <ShoppingCart />}
//       {pageIndex === 2 && <CheckoutSummary />}
//       {pageIndex === 3 && <OrderCompleted />}
//     </div>
//   )
// }

// export default CartsPage


import CartBreadCrumb from '@/components/CartBreadCrumb'
import React from 'react'

const CartPage = () => {
  return (
    <div className='container'>
      <h1 className='cart-header'>Cart</h1>
      <CartBreadCrumb />
    </div>
  )
}

export default CartPage
