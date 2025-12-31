'use client';

import { useRouter } from 'next/navigation';
import OrderSummary from './OrderSummary';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const CheckoutSummary = () => {
  const router = useRouter();
   const { cartItems, loadingCart } = useCart();
     const { isLoggedIn, loadingUser } = useAuth();

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData)
    console.log(data)
    try {
      router.push('/completed');
    } catch (error) {

    }
  };

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
    <div className='w-full'>
      <form action={handleSubmit} className='text-sm space-y-6 pt-24 flex flex-col lg:flex-row gap-8 w-full'>

        <div className='flex flex-col gap-6 lg:w-[60%]'>
          {/* contact information */}
          <div className='border-card'>
            <span className='text-neutral-7 text-lg font-semibold'>Contact Information</span>
            <div className='flex items-center gap-4'>
              <label className='w-full'><span className='form-title'>FIRST NAME *</span><input required type="text" placeholder='First name' className="input-field" /></label>
              <label className='w-full'><span className='form-title'>LAST NAME *</span><input required type="text" placeholder='Last name' className="input-field" /></label>
            </div>

            <label className='w-full'><span className='form-title'>PHONE NUMBER *</span><input required type="tel" placeholder='Phone number' className="input-field" /></label>
            <label className='w-full'><span className='form-title'>EMAIL *</span><input required type="email" placeholder='Email' className="input-field" /></label>
          </div>

          {/* shipping address */}
          <div className="border-card">
            <span className='text-neutral-7 text-lg font-semibold'>Shipping Address</span>
            <label className='w-full'><span className='form-title'>STREET ADDRESS *</span><input required type="text" placeholder='Street address' className="input-field" /></label>
            <label className='w-full'><span className='form-title'>COUNTRY *</span><input required type="text" placeholder='Country' className="input-field" /></label>
            <label className='w-full'><span className='form-title'>TOWN / CITY *</span><input required type="text" placeholder='Town / City' className="input-field" /></label>
            <div className='flex items-center gap-4'>
              <label className='w-full'><span className='form-title'>STATE *</span><input required type="text" placeholder='State' className="input-field" /></label>
              <label className='w-full'><span className='form-title'>ZIP CODE *</span><input required type="text" placeholder='Zip code' className="input-field" /></label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border-card">
            <span className='text-neutral-7 text-lg font-semibold'>Payment Method</span>
            <label className='w-full'><span className='form-title'>CARD NUMBER *</span><input required min={16} max={16} type="text" placeholder='0000 0000 0000 0000' className="input-field" /></label>
            <div className='flex items-center gap-4'>
              <label className='w-full'><span className='form-title'>EXPIRY DATE *</span><input required min={4} max={4} type="text" placeholder='MM/YY' className="input-field" /></label>
              <label className='w-full'><span className='form-title'>CVV *</span><input required min={3} max={3} type="text" placeholder='CVV' className="input-field" /></label>
            </div>
          </div>
        </div>
        <div className='lg:w-[40%]'>
          <OrderSummary />
          <button className="w-full block mt-4 submit-button">Place Order</button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutSummary




// 'use client';

// import { useState } from 'react';
// import { z } from 'zod';
// import CartBreadCrumb from '../CartBreadCrumb';
// import { useCart } from '@/context/CartContext';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import OrderSummary from './OrderSummary';

// // Define Zod schema for validation
// const schema = z.object({
//   firstName: z.string().min(1, { message: 'First name is required' }),
//   lastName: z.string().min(1, { message: 'Last name is required' }),
//   phone: z.string().min(1, { message: 'Phone number is required' }),
//   email: z.string().email({ message: 'Invalid email address' }),
//   street: z.string().min(1, { message: 'Street address is required' }),
//   country: z.string().min(1, { message: 'Country is required' }),
//   city: z.string().min(1, { message: 'Town/City is required' }),
//   state: z.string().min(1, { message: 'State is required' }),
//   zip: z.string().min(1, { message: 'Zip code is required' }),
//   cardNumber: z.string().min(1, { message: 'Card number is required' }).max(16, { message: 'Card number must be at most 16 digits' }),
//   expiry: z.string().min(1, { message: 'Expiry date is required' }).max(4, { message: 'Expiry date must be in MM/YY format' }),
//   cvv: z.string().min(1, { message: 'CVV is required' }).max(3, { message: 'CVV must be at most 3 digits' }),
// });

// const CheckoutSummary = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { cartItems } = useCart();

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//     street: '',
//     country: '',
//     city: '',
//     state: '',
//     zip: '',
//     cardNumber: '',
//     expiry: '',
//     cvv: '',
//   });

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     setErrors({}); // Reset errors

//     try {
//       // Validate the data with Zod
//       await schema.parseAsync(formData);
//       // If successful, redirect or perform other actions
//       router.push('/completed');
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         // Check if errors exist
//         const formattedErrors = error.errors?.length > 0
//           ? error.errors.reduce((acc, curr) => {
//             acc[curr.path[0]] = curr.message;
//             return acc;
//           }, {})
//           : {}; // Empty object if there are no errors
//         setErrors(formattedErrors); // Set errors in state
//       } else {
//         console.error("An unexpected error occurred:", error); // Log unexpected errors
//       }
//     }
//   };


//   return (
//     <div className='w-full'>
//       <form onSubmit={handleSubmit} className='text-sm space-y-6 text-neutral-4 pt-24 flex flex-col lg:flex-row gap-8 w-full'>
//         <div className='flex flex-col gap-6 lg:w-[60%]'>
//           {/* Contact information */}
//           <div className='border-card'>
//             <span className='text-neutral-7 text-lg font-semibold'>Contact Information</span>
//             <div className='flex items-center gap-4'>
//               <label className='w-full'>
//                 <span className='form-title'>FIRST NAME *</span>
//                 <input
                  
//                   type='text'
//                   name='firstName'
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
//                 />
//                 {errors.firstName && <span className='text-red-500'>{errors.firstName}</span>}
//               </label>
//               <label className='w-full'>
//                 <span className='form-title'>LAST NAME *</span>
//                 <input
                  
//                   type='text'
//                   name='lastName'
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
//                 />
//                 {errors.lastName && <span className='text-red-500'>{errors.lastName}</span>}
//               </label>
//             </div>
//             {/* Other fields... */}
//             <label className='w-full'>
//               <span className='form-title'>PHONE NUMBER *</span>
//               <input
                
//                 type='tel'
//                 name='phone'
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
//               />
//               {errors.phone && <span className='text-red-500'>{errors.phone}</span>}
//             </label>
//             <label className='w-full'>
//               <span className='form-title'>EMAIL *</span>
//               <input
                
//                 type='email'
//                 name='email'
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`input-field ${errors.email ? 'border-red-500' : ''}`}
//               />
//               {errors.email && <span className='text-red-500'>{errors.email}</span>}
//             </label>
//           </div>
//           {/* Shipping address */}
//           <div className="border-card">
//             <span className='text-neutral-7 text-lg font-semibold'>Shipping Address</span>
//             <label className='w-full'>
//               <span className='form-title'>STREET ADDRESS *</span>
//               <input
                
//                 type='text'
//                 name='street'
//                 value={formData.street}
//                 onChange={handleChange}
//                 className={`input-field ${errors.street ? 'border-red-500' : ''}`}
//               />
//               {errors.street && <span className='text-red-500'>{errors.street}</span>}
//             </label>
//             <label className='w-full'>
//               <span className='form-title'>COUNTRY *</span>
//               <input
                
//                 type='text'
//                 name='country'
//                 value={formData.country}
//                 onChange={handleChange}
//                 className={`input-field ${errors.country ? 'border-red-500' : ''}`}
//               />
//               {errors.country && <span className='text-red-500'>{errors.country}</span>}
//             </label>
//             <label className='w-full'>
//               <span className='form-title'>TOWN / CITY *</span>
//               <input
                
//                 type='text'
//                 name='city'
//                 value={formData.city}
//                 onChange={handleChange}
//                 className={`input-field ${errors.city ? 'border-red-500' : ''}`}
//               />
//               {errors.city && <span className='text-red-500'>{errors.city}</span>}
//             </label>
//             <div className='flex items-center gap-4'>
//               <label className='w-full'>
//                 <span className='form-title'>STATE *</span>
//                 <input
                  
//                   type='text'
//                   name='state'
//                   value={formData.state}
//                   onChange={handleChange}
//                   className={`input-field ${errors.state ? 'border-red-500' : ''}`}
//                 />
//                 {errors.state && <span className='text-red-500'>{errors.state}</span>}
//               </label>
//               <label className='w-full'>
//                 <span className='form-title'>ZIP CODE *</span>
//                 <input
                  
//                   type='text'
//                   name='zip'
//                   value={formData.zip}
//                   onChange={handleChange}
//                   className={`input-field ${errors.zip ? 'border-red-500' : ''}`}
//                 />
//                 {errors.zip && <span className='text-red-500'>{errors.zip}</span>}
//               </label>
//             </div>
//           </div>
//           {/* Payment Method */}
//           <div className="border-card">
//             <span className='text-neutral-7 text-lg font-semibold'>Payment Method</span>
//             <label className='w-full'>
//               <span className='form-title'>CARD NUMBER *</span>
//               <input
                
//                 type='text'
//                 name='cardNumber'
//                 value={formData.cardNumber}
//                 onChange={handleChange}
//                 className={`input-field ${errors.cardNumber ? 'border-red-500' : ''}`}
//               />
//               {errors.cardNumber && <span className='text-red-500'>{errors.cardNumber}</span>}
//             </label>
//             <div className='flex items-center gap-4'>
//               <label className='w-full'>
//                 <span className='form-title'>EXPIRY DATE *</span>
//                 <input
                  
//                   type='text'
//                   name='expiry'
//                   value={formData.expiry}
//                   onChange={handleChange}
//                   className={`input-field ${errors.expiry ? 'border-red-500' : ''}`}
//                 />
//                 {errors.expiry && <span className='text-red-500'>{errors.expiry}</span>}
//               </label>
//               <label className='w-full'>
//                 <span className='form-title'>CVV *</span>
//                 <input
                  
//                   type='text'
//                   name='cvv'
//                   value={formData.cvv}
//                   onChange={handleChange}
//                   className={`input-field ${errors.cvv ? 'border-red-500' : ''}`}
//                 />
//                 {errors.cvv && <span className='text-red-500'>{errors.cvv}</span>}
//               </label>
//             </div>
//           </div>
//         </div>
//         <div className='lg:w-[40%]'>
//           <OrderSummary />
//           <button className="w-full block bg-neutral-7 text-white p-3 rounded-md hover:bg-neutral-5 transition-all duration-300 text-center mt-4 active:scale-95">
//             Place Order
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CheckoutSummary;
