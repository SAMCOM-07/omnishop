'use client'

import { navLinks } from "@/data/links"
import { cn } from "@/lib/utils"
import { MenuIcon, Search, ShoppingBagIcon, UserCircleIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


const Navbar = () => {

  const pathname = usePathname();

  return (
    <header className="container w-full py-6 sticky inset-0 z-40 bg-white/50 backdrop-blur-xs flex items-center gap-6 justify-between">
      <div className="flex items-center gap-2">
        {/* nav button */}
        <button className="lg:hidden"><MenuIcon size={20} /></button>
        {/* logo */}
        <Link href={'/'} className="font-bold text-lg md:text-xl lg:text-2xl  tracking-tight text-green">Omnishop</Link>
      </div>
      {/* nav links */}
      <nav className='hidden lg:flex items-center gap-12'>
        {
          navLinks && navLinks.map(link => {
            const activeLink = pathname === link.href
            return (
              <Link href={link.href}
                key={link.name}
                className={cn(
                  activeLink ? "text-neutral-7 font-semibold" : "text-neutral-4 hover:text-neutral-5",
                  "transition-colors duration-300"
                )}
              >{link.name}</Link>)
          }
          )
        }
      </nav>
      <div className="flex items-center gap-4">
        <Search size={20} />
        <UserCircleIcon size={20} />
        <ShoppingBagIcon size={20} />
      </div>
    </header>
  )
}

export default Navbar
