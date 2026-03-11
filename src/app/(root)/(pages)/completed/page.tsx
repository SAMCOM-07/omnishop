import CartBreadCrumb from '@/components/CartBreadCrumb'
import dynamic from 'next/dynamic'

const OrderCompleted = dynamic(() => import('@/components/cart/OrderCompleted'))

const CompletionPage = () => {
  return (
    <div className='container'>
      <h1 className='cart-header'>Completed</h1>
      <CartBreadCrumb pageId={3} />

      <div className='my-24 flex justify-center items-center'>
        <OrderCompleted />
      </div>

    </div>
  )
}

export default CompletionPage
