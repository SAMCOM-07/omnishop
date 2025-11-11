import { HomeIcon, ShoppingBagIcon, ShoppingBasket, UserCircleIcon } from 'lucide-react'

const Hamburger = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-6 container md:hidden'>
      <HomeIcon />
      <ShoppingBagIcon />
      <ShoppingBasket />
      <UserCircleIcon />
    </div>
  )
}

export default Hamburger
