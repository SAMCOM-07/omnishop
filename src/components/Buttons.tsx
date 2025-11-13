'use client'

import { ArrowRight, ChevronLeft, Heart } from "lucide-react";
import Link from "next/link";


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
export const AddToCartBtn = ({ productId }: { productId: string | undefined }) => {
  return (
    <button className='hover:scale-105 active:scale-95 transition-transform duration-300 bg-neutral-7 text-xs md:textbase text-neutral-1 p-3 rounded-md w-full text-center font-inter'>Add to Cart</button>
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
    <button className='border border-border p-2 text-xs md:textbase rounded-lg w-full text-center font-inter flex items-center justify-center gap-2 hover:bg-neutral-5 hover:text-neutral-1 active:scale-95 transition-all duration-300'><Heart size={18} /><span>Add to Wish List</span></button>
  )
}

export const GoBackButton = () => {
  return (
    <button
      onClick={ () => window.history.back() }
      className="w-fit text-neutral-4 inline-flex items-center gap-1 group text-sm md:text-base group [direction:ltr] font-inter"
    >
      <ChevronLeft size={18} className="group-hover:-translate-x-0.5 group-active:translate-0 transition-transform duration-200"/>
      <span>back</span>
    </button>
  );
}