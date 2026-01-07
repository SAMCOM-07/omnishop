import MyAccount from '@/components/profile/MyAccount'
import SideProfile from '@/components/profile/SideProfile'
import React from 'react'

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
