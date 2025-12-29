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
          <h3 className='text-neutral-7'>Contact Information</h3>
          <div className='flex items-center gap-4'>
            <label className='w-full'><span className='font-semibold block'>FIRST NAME *</span><input type="text" placeholder='First name' className="input-field" /></label>
            <label className='w-full'><span className='font-semibold block'>LAST NAME *</span><input type="text" placeholder='Last name' className="input-field" /></label>
          </div>

          <label className='w-full'><span className='font-semibold block'>PHONE NUMBER *</span><input type="tel" placeholder='Phone number' className="input-field" /></label>
          <label className='w-full'><span className='font-semibold block'>EMAIL *</span><input type="email" placeholder='Email' className="input-field" /></label>
        </div>

        {/* shipping address */}
        <div className="border-card">
          <h3 className='text-neutral-7'>Shipping Address</h3>
          <label className='w-full'><span className='font-semibold block'>STREET ADDRESS *</span><input type="text" placeholder='Street address' className="input-field" /></label>
          <label className='w-full'><span className='font-semibold block'>COUNTRY *</span><input type="text" placeholder='Country' className="input-field" /></label>
          <label className='w-full'><span className='font-semibold block'>TOWN / CITY *</span><input type="text" placeholder='Town / City' className="input-field" /></label>
          <div className='flex items-center gap-4'>
            <label className='w-full'><span className='font-semibold block'>STATE *</span><input type="text" placeholder='State' className="input-field" /></label>
            <label className='w-full'><span className='font-semibold block'>ZIP CODE *</span><input type="text" placeholder='Zip code' className="input-field" /></label>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-card">
          <h3 className='text-neutral-7'>Payment Method</h3>
          <label className='w-full'><span className='font-semibold block'>CARD NUMBER *</span><input type="text" placeholder='0000 0000 0000 0000' className="input-field" /></label>
          <div className='flex items-center gap-4'>
            <label className='w-full'><span className='font-semibold block'>EXPIRY DATE *</span><input type="text" placeholder='MM/YY' className="input-field" /></label>
            <label className='w-full'><span className='font-semibold block'>CVV *</span><input type="text" placeholder='CVV' className="input-field" /></label>
          </div>
        </div>
        <Link href="/completed" className="w-full block bg-neutral-5 text-white p-3 rounded-md hover:bg-neutral-7 transition-all duration-300 text-center mt-4 active:scale-95">Place Order</Link>
      </form>
    </div>
  )
}

export default CheckoutSummary
