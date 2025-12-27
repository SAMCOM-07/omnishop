import React from 'react'

const CartBreadCrumb = () => {

  const pages = [
    { id: 1, title: 'Shopping Cart' },
    { id: 2, title: 'Checkout Summary' },
    { id: 3, title: 'Order Completed' },
  ]

  return (
    <div className='flex items-center justify-evenly gap-6 min-w-full whitespace-nowrap overflow-hidden'>

      {pages.map((page) => (
        <div key={page.id} className='flex items-center gap-2 font-inter text-sm min-w-70 md:min-w-auto'>
          <span className='w-8 h-8 grid place-content-center p-2 rounded-full bg-neutral-4 text-neutral-1'>{page.id}</span>
          <span className='text-neutral-4'>{page.title}</span>
        </div>
      ))}

    </div>
  )
}

export default CartBreadCrumb
