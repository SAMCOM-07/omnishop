import { MailIcon } from 'lucide-react'
import Image from 'next/image';
// import  from './../../public/images/pillow-bed-decoration-interior-bedroom.jpg';
import AdBannerImg from './../../public/images/clothes2.jpg';
const Newsletter = () => {
  return (

    <div className="flex flex-col md:flex-row bg-neutral-2 gap-12 items-center">
      <Image
        src={AdBannerImg}
        alt='banner Image'
        priority
        className='w-full md:w-1/2 h-full object-cover aspect-auto object-center'
      />
      <div className='p-6 md:p-0 pb-20 md:pb-0 flex flex-col w-full overflow-hidden items-center'>
        <h1>Join Our Newsletter</h1>
        <p className='mt-2 text-center'>Subscribe to get new products notifications</p>
        <form action="" className='flex items-center justify-between border-b border-neutral-4 py-2 mt-6'>
          <MailIcon />
          <input type="text" className='flex-1 w-full outline-none text-neutral-5 px-2' placeholder='Enter email address' />
          <button type='submit' className='hover:text-neutral-4 active:text-neutral-7 transition-color duration-300 text-sm'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Newsletter
