'use client'

import { navLinks } from "@/data/links"
import { cn } from "@/lib/utils"
import { Search, ShoppingCart, UserCircleIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SearchPage from "./SearchPage"
import { Suspense, useState } from "react"
import { useCart } from "@/context/CartContext"


const Navbar = () => {

  const pathname = usePathname();
  const { totalQuantity } = useCart();

  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <header className="container py-4 flex items-center gap-6 justify-between">
        <div className="flex items-center gap-6">
          {/* logo */}
          <Link href={'/'} className="font-extrabold text-lg md:text-xl lg:text-2xl tracking-tight text-green">Omnishop</Link>
          {/* nav links */}
          <nav className='hidden md:flex items-center gap-6 px-3 py-1 rounded-full '>
            {
              navLinks && navLinks.map(link => {
                const activeLink = pathname === link.href
                return (
                  <Link href={link.href}
                    key={link.name}
                    className={cn(
                      activeLink ? "text-green font-semibold" : "text-neutral-4 hover:text-neutral-5",
                      "transition-colors duration-300"
                    )}
                  >{link.name}</Link>)
              }
              )
            }
          </nav>
        </div>

        <button onClick={() => setIsSearchOpen(true)} className="flex text-neutral-4/70 hover:scale-105 active:scale-95 transition-all duration-300 items-center gap-2 bg-neutral-2 shadow-inner shadow-neutral-4 px-3 py-1.5 rounded-full grow max-w-sm font-inter">
          <Search size={20} />
          Search . . .
        </button>

        <div className="hidden md:flex items-center gap-4">
          <UserCircleIcon size={20} />
          <Link href={'/cart'} className="relative">
            <ShoppingCart size={20} />
            <div className='rounded-full p-1 font-bold text-green text-sm absolute left-4.5 -top-3.5'>{totalQuantity}</div>
          </Link>
        </div>
      </header>



      {/* search page */}
      <div className={cn("fixed inset-0 w-full h-screen bg-neutral-1 overflow-y-auto", isSearchOpen ? 'block' : 'hidden')}>
        <Suspense >
          <SearchPage setIsSearchOpen={setIsSearchOpen} />
        </Suspense>
      </div>
    </>
  )
}

export default Navbar
