'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";



const CartBreadCrumb = () => {

  const pathname = usePathname();

  const pages = [
    { id: 1, title: 'Shopping Cart', href: '/cart' },
    { id: 2, title: 'Checkout Summary', href: '/checkout' },
    { id: 3, title: 'Order Completed', href: '/completed' },
  ]

  return (
    <div className='flex items-center justify-evenly gap-6 min-w-full whitespace-nowrap overflow-hidden'>

      {pages.map((page) => {
        const isActive = page.title.toLowerCase().includes(pathname.slice(1));
        const isCompleted = false
        return (
          <div key={page.id} className={cn('flex items-center gap-2 text-sm min-w-70 md:min-w-auto pb-4', isActive && 'border-b-2 border-neutral-7')}>
            <span className={cn('w-8 h-8 grid place-content-center p-1.5 rounded-full text-neutral-1', isActive ? 'bg-neutral-7' : 'bg-neutral-4', isCompleted && 'bg-green')}>{page.id}</span>
            <Link href={page.href} className={cn(isActive ? 'text-neutral-7 font-semibold' : 'text-neutral-4', isCompleted && 'text-green font-bold')}>{page.title}</Link>
          </div>
        )
      })}

    </div>
  )
}

export default CartBreadCrumb
