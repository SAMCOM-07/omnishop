import SideProfile from '@/components/profile/SideProfile'

const WishListPage = () => {
  return (
    <div className='container'>
      <h1 className='text-center my-18'>My Wishlist</h1>
      <div className='flex flex-col md:flex-row gap-12 lg:gap-18 w-full'>
        <SideProfile />
        My wish list component to be added here
      </div>
    </div>
  )
}

export default WishListPage
