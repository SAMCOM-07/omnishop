'use client';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const OrderCompleted = () => {

  const { cartItems, setCartItems, loadingCart } = useCart();
  const router = useRouter();
  const { isLoggedIn, loadingUser } = useAuth();

  const details = [
    { label: 'Order Id', value: '#123456789' },
    { label: 'Date', value: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
    { label: 'Total Amount', value: `$${cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}` },
    { label: 'Payment Method', value: 'Credit Card' },
  ]

  useEffect(() => {
    if (!loadingUser && !isLoggedIn) {
      router.replace("/login");
      toast.error("Login to continue");
    }
  }, [isLoggedIn, loadingUser]);

  useEffect(() => {
    if (!loadingCart && (!cartItems || cartItems.length === 0)) {
      router.replace("/shop");
      toast.info("Your cart is empty");
    }
  }, [cartItems]);

  return (
    <div className='p-6 flex flex-col gap-6 items-center shadow-xl md:w-xl lg:w-2xl w-full rounded-md'>
      <h3 className='text-neutral-4'>Thank you! 🎉</h3>
      <h3 className='max-w-sm text-3xl text-center font-semibold'>Your order has been received</h3>
      <div className='overflow-x-auto max-w-[70%]'>
        <div className='flex items-center gap-8 pb-2 pt-4'>
          {
            cartItems && cartItems.length > 0 ? [...cartItems].reverse()?.map(item =>
              <div key={item.id} className='relative'>
                <div className='aspect-square overflow-hidden rounded-md w-22 h-22 bg-neutral-2'>
                  <Image width={400} height={400} priority src={item.images[0].url.replace(
                    "/upload/",
                    "/upload/f_auto,q_auto,w_600/"
                  )} alt={item.name} className='h-full w-full object-cover object-center' />
                </div>
                <span className='bg-green rounded-full w-6 h-6 p-2 grid place-content-center text-neutral-1 text-sm absolute -top-3 -right-3 '>{item.quantity}</span>
              </div>
            ) : <p className='text-neutral-4 w-full text-center'>Loading . . .</p>
          }
        </div>
      </div>

      {/* for sm width */}
      {/* <div className='flex flex-col gap-4 mt-6 w-full md:hidden'>
        {details.map((detail) => (
          <div key={detail.label} className='flex flex-col gap-1 border-b-2 border-neutral-3 pb-4'>
            <span className='text-neutral-4 font-inter'>{detail.label}:</span>
            <span className='font-semibold'>{detail.value}</span>
          </div>
        ))}
      </div> */}

      {/* for md and larger width */}
      <div className='flex flex-col gap-4 mt-6 w-full'>
        {details.map((detail) => (
          <div key={detail.label} className='flex justify-between border-b-2 border-neutral-3 pb-4'>
            <span className='text-neutral-4 font-inter'>{detail.label}:</span>
            <span className='font-semibold'>{detail.value}</span>
          </div>
        ))}
      </div>

      <button onClick={() => {
        router.push('/shop');
        setCartItems([]);
        localStorage.removeItem('cart');
      }} className='submit-button'>Continue Shopping</button>
    </div>
  )
}

export default OrderCompleted
