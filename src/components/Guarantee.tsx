import { Car, CardSim, LockIcon, PhoneIcon} from 'lucide-react'

const guarantee = [
  {
    icon: <Car size={38} />,
    title: 'Free Shipping',
    description: 'On all orders over $50'
  },
  {
    icon: <CardSim size={38} />,
    title: 'Money-Back',
    description: 'On all orders over $50'
  },
  {
    icon: <LockIcon size={38} />,
    title: 'Secure Payments',
    description: 'Secured by Stripe'
  },
  {
    icon: <PhoneIcon size={38} />,
    title: '24/7 Support',
    description: 'Phone & Email Support'
  },

]

const Guarantee = () => {
  return (
    <section aria-label="Our guarantees" className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
      {
        guarantee.map((g, index) =>
          <div className='hover:scale-105 transition-all duration-300 p-4 bg-neutral-2 space-y-2 h-48 flex justify-center items-center flex-col text-center' key={index}>
            <span aria-hidden="true">{g.icon}</span>
            <h3>{g.title}</h3>
            <p className='text-xs md:text-sm text-neutral-4'>{g.description}</p>
          </div>
        )
      }
    </section>
  )
}

export default Guarantee
