'use client'

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { IncreaseAndDecreaseButton, RemoveFromCartButton } from "../Buttons";
import { useState } from "react";

const OrderSummary = () => {

  const { cartItems, subTotalPrice } = useCart();
  const cartItemsReversed = cartItems?.slice().reverse();
  const [shippingCost, setShippingCost] = useState(0);

  const shippingOptions = [
    { id: 1, name: 'Free Shipping', cost: 0.00 },
    { id: 2, name: 'Express Shipping', cost: 15.00 },
    { id: 3, name: 'Pick Up', cost: 25.00 },
  ];

  return (
    <div className="w-full h-fit border border-neutral-4 p-4 rounded-md flex flex-col gap-3">
      <h3>Order Summary</h3>

      <section className="flex flex-col overflow-y-auto max-h-150">
        {
          cartItemsReversed && cartItemsReversed.length !== 0 && cartItemsReversed?.map((item =>
            <div key={item.id} className='flex items-center gap-12 justify-between py-6 border-b border-neutral-3'>
              <div className='flex items-center gap-3'>
                <Link href={`/shop/${item.id}`} className='aspect-square overflow-hidden block rounded-md w-28 h-28 bg-neutral-2'>
                  <Image width={400} height={400} priority src={item.images[0].url.replace(
                    "/upload/",
                    "/upload/f_auto,q_auto,w_600/"
                  )} alt={item.name} className='h-full w-full object-cover object-center hover:scale-110 active:scale-110 transition-all duration-500' />
                </Link>
                <div className='flex flex-col gap-2 h-full items-left'>
                  <Link href={`/shop/${item.id}`} className='max-w-40 sm:max-w-full line-clamp-1 font-semibold'>{item.name}</Link>
                  <span className='font-inter text-neutral-5 text-sm'>${item.discountedAmount ?? item.price}</span>
                  <span className='font-inter text-sm'>Quantity: {item.quantity}</span>
                </div>
              </div>

              <span className='font-semibold text-sm'>${item.discountedAmount ? (item.discountedAmount * item.quantity).toFixed(2) : (item.price * item.quantity).toFixed(2)}</span>

            </div>
          ))
        }
      </section>

      <div className="space-y-4 font-inter mt-8">
        <div className="space-y-3 text-sm">
          {shippingOptions.map((option) => (
            <button type="button" className="w-full" onClick={() => setShippingCost(option.cost)}>
              <label key={option.id} className="flex items-center gap-4 justify-between p-3 border border-neutral-4/50 rounded-md checked:bg-neutral-2/50 hover:bg-neutral-2/50 transition-all duration-300 cursor-pointer">
                <div className='flex items-center gap-3'>
                  <input type="radio" name="shipping" value={option.name} defaultChecked={option.id === 1} />
                  <span>{option.name}</span>
                </div>
                <span>${option.cost.toFixed(2)}</span>
              </label>
            </button>
          ))}
          <div className="mt-8 pt-4 flex flex-col gap-4 font-inter">
            <div className="flex items-center justify-between">
              <span>Subtotal:</span>
              <span>${subTotalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <span>Total:</span>
              <span>${(subTotalPrice + shippingCost).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default OrderSummary
