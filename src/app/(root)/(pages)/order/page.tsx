import SideProfile from '@/components/profile/SideProfile'

const OrderPage = () => {
  return (
    <div className='container'>
      <h1 className='text-center my-8'>Order History</h1>
      <div className='flex flex-col md:flex-row gap-12 lg:gap-18 w-full'>
        <SideProfile />
        My order history component to be added here
      </div>
    </div>
  )
}

export default OrderPage
