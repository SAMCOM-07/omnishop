'use client';

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";



const CartBreadCrumb = ({pageId}: {pageId?: number}) => {

  const pathname = usePathname();

  const pages = [
    { id: 1, title: 'Shopping Cart', href: '/cart' },
    { id: 2, title: 'Checkout Summary', href: '/checkout' },
    { id: 3, title: 'Order Completed', href: '/completed' },
  ]

  return (
    <div className={cn('flex items-center gap-6 min-w-full whitespace-nowrap overflow-hidden', pageId === 1 && 'justify-start md:justify-evenly', pageId === 2 && 'justify-center md:justify-evenly ', pageId === 3 && 'justify-end md:justify-evenly')}>
      {pages.map((page) => {
        const isActive = page.title.toLowerCase().includes(pathname.slice(1));
        const isCompleted = pages.indexOf(page) < pages.findIndex(p => p.title.toLowerCase().includes(pathname.slice(1)));
        return (
          <div key={page.id} className={cn('flex items-center gap-2 text-sm min-w-70 md:min-w-auto pb-4', isActive && 'border-b-2 border-neutral-7', isCompleted && 'border-b-2 border-green')}>
            <span className={cn('w-8 h-8 grid place-content-center p-1.5 rounded-full text-neutral-1', isActive ? 'bg-neutral-7' : 'bg-neutral-4', isCompleted && 'bg-green')}>{isCompleted ? <Check className="w-5 h-5" /> : page.id}</span>
            <span className={cn(isActive ? 'text-neutral-7 font-semibold' : 'text-neutral-4', isCompleted && 'text-green font-bold')}>{page.title}</span>
          </div>
        )
      })}

    </div>
  )
}

export default CartBreadCrumb
