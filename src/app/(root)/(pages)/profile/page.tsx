import MyAccount from '@/components/profile/MyAccount'
import SideProfile from '@/components/profile/SideProfile'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your account and profile settings',
}

const ProfilePage = () => {
  return (
    <div className='container'>
      <h1 className='text-center my-8'>My Account</h1>
      <div className='flex flex-col md:flex-row gap-12 lg:gap-18 w-full'>
        <SideProfile />
        <MyAccount />
      </div>
    </div>
  )
}

export default ProfilePage
