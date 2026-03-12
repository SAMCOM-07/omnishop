import { MailIcon } from 'lucide-react'
import Image from 'next/image';
import AdBannerImg from './../../public/images/clothes2.avif';
const Newsletter = () => {
  return (

    <section aria-label="Newsletter signup" className="flex flex-col md:flex-row bg-neutral-2 gap-12 items-stretch min-h-75 md:min-h-100">
      <div className="relative w-full md:w-1/2 min-h-64 md:min-h-full shrink-0">
        <Image
          src={AdBannerImg}
          alt='Newsletter banner'
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className='object-cover object-center'
        />
      </div>
      <div className='p-6 md:p-0 pb-20 md:pb-0 flex flex-col justify-center w-full overflow-hidden items-center'>
        <h1>Join Our Newsletter</h1>
        <p className='mt-2 text-center'>Subscribe to get new products notifications</p>
        <form action="" aria-label="Subscribe to newsletter" className='flex items-center justify-between border-b border-neutral-4 py-2 mt-6'>
          <MailIcon aria-hidden="true" />
          <input type="email" aria-label="Email address" className='flex-1 w-full outline-none text-neutral-5 px-2' placeholder='Enter email address' />
          <button type='submit' className='hover:text-neutral-4 active:text-neutral-7 transition-color duration-300 text-sm'>Subscribe</button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
