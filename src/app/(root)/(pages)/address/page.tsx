import SideProfile from '@/components/profile/SideProfile'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "My addresses | Omnishop",
  description: "Manage your delivery addresses and saved locations on Omnishop",
}

const AdressPage = () => {
  return (
    <div className='container'>
      <h1 className='text-center my-8'>Address</h1>
      <div className='flex flex-col md:flex-row gap-12 lg:gap-18 w-full'>
        <SideProfile />
        My addresses component to be added here
      </div>
    </div>
  )
}

export default AdressPage
