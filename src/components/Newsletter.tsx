import { MailIcon } from 'lucide-react'
import Image from 'next/image';
import AdBannerImg from './../../public/images/pillow-bed-decoration-interior-bedroom.jpg';

const Newsletter = () => {
  return (

    <div className="flex flex-col md:flex-row bg-neutral-2 gap-12 items-center">
      <Image
        src={AdBannerImg}
        alt='banner Image'
        priority
        className='w-full md:w-1/2 h-full object-cover aspect-auto object-center'
      />
      <div className='p-6 md:p-0 md:pr-6 flex flex-col w-full overflow-hidden items-center'>
        <h1>Join Our Newsletter</h1>
        <p className='mt-2'>Sign up for deals, new products and promotions</p>
        <form action="" className='flex items-center justify-between gap- border-b border-neutral-4 py-2 mt-4'>
          <MailIcon />
          <input type="text" className='flex-1 outline-none text-neutral-5 px-2' placeholder='Enter email address' />
          <button type='submit' className='hover:text-neutral-4 active:text-neutral-7 transition-color duration-300 text-sm'>Subscribe</button>
        </form>
      </div>
    </div>
    // <div className='bg-neutral-2 text-center h-[400px] w-full overflow-hidden grid lg:grid-cols-3 grid-cols-1 items-center place-content-center lg:place-content-center-safe gap-12'>
    //   <div className='col-span-2 max-w-lg mx-auto p-6'>
    //     <h1>Join Our Newsletter</h1>
    //     <p className='w-sm md:w-full mt-2'>Sign up for deals, new products and promotions</p>
    //     <form action="" className='flex items-center justify-between gap-2 border-b border-neutral-4 py-2 mt-4'>
    //       <MailIcon />
    //       <input type="text" className='flex-1 outline-none text-neutral-5 px-2 lg:w-md' placeholder='Enter email address' />
    //       <button type='submit' className='hover:text-neutral-4 active:text-neutral-7 transition-color duration-300 text-sm'>Subscribe</button>
    //     </form>
    //   </div>
    //   <div className='h-[150%] w-full'>
    //     <Image
    //       src={Chair}
    //       alt='Chair Image'
    //       priority
    //       className='object-cover h-full w-full object-top-left hidden lg:block'
    //     />
    //   </div>
    // </div>
  )
}

export default Newsletter
