'use client'

import { useCart } from "@/context/CartContext";
import { ProductType } from "@/types/types";
import { ArrowRight, ChevronLeft, Heart, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


// link button
export const LinkButton = ({ text, href }: { text: string, href: string }) => {
  return (
    <Link
      href={href}
      className="w-fit border-b inline-flex py-0.5 items-center gap-1 group text-sm md:text-base [direction:ltr]"
    >
      <span>{text}</span>
      <span className="group-hover:translate-x-0.5 group-active:translate-0 transition-transform duration-200">
        <ArrowRight size={18} />
      </span>
    </Link>
  );
};


// add to cart button
export const AddToCartBtn = ({ product }: { product: ProductType }) => {

  const { addToCart, setCount } = useCart();

  return (
    <button onClick={() => {
      addToCart(product);
      setCount(1);
    }} className='hover:scale-105 active:scale-95 transition-transform duration-300 bg-neutral-7 text-xs md:textbase text-neutral-1 p-3 rounded-md w-full text-center font-inter'>Add to Cart</button>
  )
}


// wish list button without text

export const WishListBtn = ({ productId }: { productId: string | undefined }) => {
  return (
    <button className='bg-neutral-1 p-1.5 shadow-lg rounded-full text-neutral-4 hover-scale'><Heart size={20} /></button>
  )
}

// wish list button
export const WishListBtnWithText = ({ productId }: { productId: string | undefined }) => {
  return (
    <button className='border border-neutral-4 p-2 text-xs md:textbase rounded-lg w-full text-center font-inter flex items-center justify-center gap-2 hover:bg-neutral-5 hover:text-neutral-1 active:scale-95 transition-all duration-300'><Heart size={18} /><span>Add to Wish List</span></button>
  )
}

export const GoBackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="sticky top-16 z-50 py-3 w-full bg-neutral-1 text-neutral-4 flex items-center gap-1 group text-sm md:text-base group [direction:ltr] font-inter"
    >
      <ChevronLeft size={18} className="group-hover:-translate-x-0.5 group-active:translate-0 transition-transform duration-200" />
      <span>back</span>
    </button>
  );
}


// quantity update button
export const QuantityUpdateButton = () => {
  const { count, setCount } = useCart()

  return (
    <div className="bg-neutral-2 max-w-28 min-w-28 w-full p-1.5 flex justify-between items-center rounded-full shadow-inner">
      <button
        disabled={count <= 1}
        onClick={() => {
          setCount(prev => prev <= 1 ? 1 : prev - 1);
        }}
        className="bg-neutral-1 p-1 shadow-md rounded-full text-neutral-5 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"><Minus className="hover-scale" size={16} /></button>
      <span className="font-bold text-sm">{count}</span>
      <button
        onClick={() => {
          setCount(prev => prev + 1);
        }}
        className="bg-neutral-1 p-1 shadow-md rounded-full text-neutral-5 hover-scale"><Plus className="hover-scale" size={16} /></button>
    </div >
  )
}


// remove from cart button
export const RemoveFromCartButton = ({ productId }: { productId: string }) => {

  const { removeFromCart } = useCart();

  return (
    <button onClick={() => removeFromCart(productId)} className="text-xl">Remove</button>
  )
}


export const IncreaseAndDecreaseButton = ({ productId, quantity }: { productId: string | undefined, quantity: number }) => {

  const { increaseQuantity, decreaseQuantity } = useCart();
  return (
    <div className="bg-neutral-2 max-w-28 min-w-28 w-full p-1.5 flex justify-between items-center rounded-full shadow-inner">
      <button
        disabled={quantity <= 1}
        onClick={() => decreaseQuantity(productId!)}
        className="bg-neutral-1 p-1 shadow-md rounded-full text-neutral-5 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"><Minus className="hover-scale" size={16} /></button>
      <span className="font-bold text-sm">{quantity}</span>
      <button
        onClick={() => increaseQuantity(productId!)}
        className="bg-neutral-1 p-1 shadow-md rounded-full text-neutral-5 hover-scale"><Plus className="hover-scale" size={16} /></button>
    </div >
  )
}