'use client'

import { IncreaseAndDecreaseButton } from '@/components/Buttons';
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
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import React from 'react'

const CartPage = () => {

  const { cartItems, addToCart, removeFromCart } = useCart();

  return (
    <div className='container'>
      <h1 className='cart-header'>Cart</h1>
      <CartBreadCrumb />
      <section className='mt-8'>
        <span className='py-4 border-b-2 border-neutral-3 block'>Product</span>
        <div className='flex flex-col gap-4 mt-6'>
          {
            cartItems && cartItems.length === 0 ? <p className='text-center py-20 text-gray-500'>Your cart is empty.</p> : cartItems?.map((item =>
              <div key={item.id}>
                <div>
                  <Image src={item.images[0].url} priority alt={item.name} width={100} height={100} />
                  <div>
                    <h2>{item.name}</h2>
                    <IncreaseAndDecreaseButton productId={item.id} quantity={item.quantity}/>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default CartPage
