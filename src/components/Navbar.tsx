'use client'

import { navLinks } from "@/data/links"
import { cn } from "@/lib/utils"
import { Search, ShoppingCart, User2Icon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { LogInButton } from "./auth/AuthButtons"
import LogoText from './../../public/images/omnishop-text.png';
import Image from "next/image"
import { useAuth } from "@/hooks/useAuth"
import { UserIconSkeleton } from "./Skeletons"



const Navbar = () => {

  const pathname = usePathname();
  const { totalQuantity } = useCart();

  const { isLoggedIn, loadingUser, user } = useAuth();

  return (
    <>
      <header className="container py-4 flex items-center gap-6 justify-between">
        <div className="flex items-center gap-6">
          {/* logo */}
          <Link href={'/'} className="font-extrabold text-lg md:text-xl lg:text-2xl tracking-tight text-green">
            <Image src={LogoText} alt="Omnishop Logo" className="w-24" />
          </Link>
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

        <Link href="/search" className="flex text-neutral-4/70 hover:scale-105 active:scale-95 transition-all duration-300 items-center gap-2 bg-neutral-2 shadow-inner shadow-neutral-4 px-3 py-1.5 rounded-full grow max-w-sm font-inter">
          <Search size={20} />
          Search . . .
        </Link>

        <div className="hidden md:flex items-center gap-6">

          {
            isLoggedIn ? <Link href={'/profile'}> {user?.photoURL ? <img src={`${user?.photoURL}`} className="rounded-full bg-neutral-3 hover-scale object-cover w-8 h-8" /> : <User2Icon size={30} className="bg-neutral-3 hover-scale text-neutral-4 rounded-full p-1" />}</Link> : loadingUser ? <UserIconSkeleton /> : <LogInButton />
          }
          <Link href={'/cart'} className="relative hover-scale">
            <ShoppingCart size={20} />
            <div className='rounded-full p-1 font-bold text-green text-sm absolute left-4.5 -top-3.5'>{totalQuantity}</div>
          </Link>
        </div>
      </header>
    </>
  )
}

export default Navbar
