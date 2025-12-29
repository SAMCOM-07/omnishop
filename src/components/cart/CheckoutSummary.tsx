'use client';

import CartBreadCrumb from '../CartBreadCrumb';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CheckoutSummary = () => {
  const pathname = usePathname()

  const { cartItems } = useCart();

  return (
    <div className=''>
      <form className='text-sm space-y-6 text-neutral-4'>

        {/* contact information */}
        <div className='border-card'>
          <span className='text-neutral-7 text-lg font-semibold'>Contact Information</span>
          <div className='flex items-center gap-4'>
            <label className='w-full'><span className='font-semibold block text-xs'>FIRST NAME *</span><input required type="text" placeholder='First name' className="input-field" /></label>
            <label className='w-full'><span className='font-semibold block text-xs'>LAST NAME *</span><input required type="text" placeholder='Last name' className="input-field" /></label>
          </div>

          <label className='w-full'><span className='font-semibold block text-xs'>PHONE NUMBER *</span><input required type="tel" placeholder='Phone number' className="input-field" /></label>
          <label className='w-full'><span className='font-semibold block text-xs'>EMAIL *</span><input required type="email" placeholder='Email' className="input-field" /></label>
        </div>

        {/* shipping address */}
        <div className="border-card">
          <span className='text-neutral-7 text-lg font-semibold'>Shipping Address</span>
          <label className='w-full'><span className='font-semibold block text-xs'>STREET ADDRESS *</span><input required type="text" placeholder='Street address' className="input-field" /></label>
          <label className='w-full'><span className='font-semibold block text-xs'>COUNTRY *</span><input required type="text" placeholder='Country' className="input-field" /></label>
          <label className='w-full'><span className='font-semibold block text-xs'>TOWN / CITY *</span><input required type="text" placeholder='Town / City' className="input-field" /></label>
          <div className='flex items-center gap-4'>
            <label className='w-full'><span className='font-semibold block text-xs'>STATE *</span><input required type="text" placeholder='State' className="input-field" /></label>
            <label className='w-full'><span className='font-semibold block text-xs'>ZIP CODE *</span><input required type="text" placeholder='Zip code' className="input-field" /></label>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-card">
          <span className='text-neutral-7 text-lg font-semibold'>Payment Method</span>
          <label className='w-full'><span className='font-semibold block text-xs'>CARD NUMBER *</span><input required type="text" placeholder='0000 0000 0000 0000' className="input-field" /></label>
          <div className='flex items-center gap-4'>
            <label className='w-full'><span className='font-semibold block text-xs'>EXPIRY DATE *</span><input required type="text" placeholder='MM/YY' className="input-field" /></label>
            <label className='w-full'><span className='font-semibold block text-xs'>CVV *</span><input required type="text" placeholder='CVV' className="input-field" /></label>
          </div>
        </div>
        <Link href="/completed" className="w-full block bg-neutral-7 text-white p-3 rounded-md hover:bg-neutral-5 transition-all duration-300 text-center mt-4 active:scale-95">Place Order</Link>
      </form>
    </div>
  )
}

export default CheckoutSummary
