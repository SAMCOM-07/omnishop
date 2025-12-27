import { useCart } from '@/context/CartContext';
import React from 'react'

const ShoppingCart = () => {

  const { cartItems, totalPrice } = useCart();

 

  return (
    <section>
      {cartItems && cartItems.length > 0 ?
        cartItems.map(item =>
          <div key={item.id} className='mb-4 p-4 border border-gray-300 rounded'>

          </div>
        ) : <p className='text-3xl'>Your Cart is Empty</p>
      }
    </section>
  )
}

export default ShoppingCart
