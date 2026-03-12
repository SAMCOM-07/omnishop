'use client'

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/types";
import { ArrowRight, ChevronLeft, Heart, Minus, Plus, X } from "lucide-react";
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
        <ArrowRight aria-hidden="true" size={18} />
      </span>
    </Link>
  );
};


// add to cart button
export const AddToCartBtn = ({ product }: { product: ProductType }) => {

  const { addToCart, setCount } = useCart();
  const { removeFromWishlist, wishlistItems } = useWishlist();
  const productIsInWishlist = !!wishlistItems?.find(item => item.id === product.id);

  return (
    <button aria-label={`Add ${product.name} to cart`} onClick={() => {
      addToCart(product);
      setCount(1);
      wishlistItems && productIsInWishlist && removeFromWishlist(product.id as string);
    }} className='whitespace-nowrap hover:scale-105 active:scale-95 transition-transform duration-300 bg-neutral-7 text-xs md:textbase text-neutral-1 p-3 rounded-md w-full text-center font-inter'>Add to Cart</button>
  )
}


// wish list button without text

export const WishListBtn = ({ product }: { product: ProductType }) => {
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const productIsInWishlist = !!wishlistItems?.find(item => item.id === product.id);
  return (
    <button
      aria-label={productIsInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      onClick={() => productIsInWishlist ? removeFromWishlist(product.id as string) : addToWishlist(product)}
      className={cn('bg-neutral-1 p-1.5 shadow-lg rounded-full text-neutral-4 hover-scale')}><Heart aria-hidden="true" size={20} className={cn(productIsInWishlist ? 'fill-green text-green' : 'fill-none')} /></button>
  )
}

// wish list button
export const WishListBtnWithText = ({ product }: { product: ProductType }) => {
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const productIsInWishlist = !!wishlistItems?.find(item => item.id === product.id);
  return (
    <button
      aria-label={productIsInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      onClick={() => productIsInWishlist ? removeFromWishlist(product.id as string) : addToWishlist(product)}
      className='border border-neutral-4 p-2 text-xs md:textbase rounded-lg w-full text-center font-inter flex items-center justify-center gap-2 hover:bg-neutral-5 hover:text-neutral-1 active:scale-95 transition-all duration-300'><Heart aria-hidden="true" size={18} className={cn(productIsInWishlist ? 'fill-green text-green' : 'fill-none')} /><span>{productIsInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span></button>
  )
}


export const RemoveFromWishlistButton = ({ productId }: { productId: string | undefined }) => {
  const { removeFromWishlist } = useWishlist();
  return (
    <button aria-label="Remove from wishlist" onClick={() => removeFromWishlist(productId!)} className="flex items-center text-neutral-4 text-sm gap-1.5"><X aria-hidden="true" size={22} /> </button>
  )
}


// go back button
export const GoBackButton = () => {
  return (
    <button
      aria-label="Go back to previous page"
      onClick={() => window.history.back()}
      className="sticky top-16 z-50 py-3 w-full bg-neutral-1 text-neutral-4 flex items-center gap-1 group text-sm md:text-base group [direction:ltr] font-inter"
    >
      <ChevronLeft aria-hidden="true" size={18} className="group-hover:-translate-x-0.5 group-active:translate-0 transition-transform duration-200" />
      <span>back</span>
    </button>
  );
}


// quantity update button
export const QuantityUpdateButton = () => {
  const { count, setCount } = useCart()

  return (
    <div role="group" aria-label="Quantity selector" className="bg-neutral-2 max-w-28 min-w-28 w-full p-1.5 flex justify-between items-center rounded-full shadow-inner">
      <button
        aria-label="Decrease quantity"
        disabled={count <= 1}
        onClick={() => {
          setCount(prev => prev <= 1 ? 1 : prev - 1);
        }}
        className="bg-neutral-1 p-1 shadow-md rounded-full text-neutral-5 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"><Minus aria-hidden="true" className="hover-scale" size={16} /></button>
      <span aria-live="polite" className="font-bold text-sm">{count}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => {
          setCount(prev => prev + 1);
        }}
        className="bg-neutral-1 p-1 shadow-md rounded-full text-neutral-5 hover-scale"><Plus aria-hidden="true" className="hover-scale" size={16} /></button>
    </div >
  )
}


// remove from cart button
export const RemoveFromCartButton = ({ productId, text }: { productId: string | undefined, text?: string }) => {

  const { removeFromCart } = useCart();

  return (
    <button aria-label="Remove from cart" onClick={() => removeFromCart(productId!)} className="flex items-center text-neutral-4 text-sm gap-1.5"><X aria-hidden="true" size={20} /> {text ? text : ''}</button>
  )
}


export const IncreaseAndDecreaseButton = ({ productId, quantity }: { productId: string | undefined, quantity: number }) => {

  const { increaseQuantity, decreaseQuantity } = useCart();
  return (
    <div role="group" aria-label="Item quantity" className="bg-neutral-2 max-w-28 min-w-24 w-full p-1.5 flex justify-between items-center rounded-full shadow-inner">
      <button
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={() => decreaseQuantity(productId!)}
        className="bg-neutral-1 p-1 shadow-md rounded-full text-neutral-5 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"><Minus aria-hidden="true" className="hover-scale" size={14} /></button>
      <span aria-live="polite" className="text-sm font-semibold">{quantity}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => increaseQuantity(productId!)}
        className="bg-neutral-1 p-1 shadow-md rounded-full text-neutral-5 hover-scale"><Plus aria-hidden="true" className="hover-scale" size={14} /></button>
    </div >
  )
}