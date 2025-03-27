"use client";

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, User } from "lucide-react"

export function Navbar() {
  const { user, isLoading, logOut } = useAuth();

  return (
    <header className="bg-[#1e1e1e] text-white py-3 px-4 rounded-lg mx-4 mt-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Restaurant Management Logo" width={200} height={200} className="mr-2" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-orange-300">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-orange-300">
            About Us
          </Link>
          <Link href="/what-we-offer" className="text-white hover:text-orange-300">
            What We Offer
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-white hover:text-orange-300">
              Products <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1e1e1e] border-gray-700 mt-1">
              <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800">
                <Link href="/products/online-ordering" className="w-full">
                  Online Ordering System
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800">
                <Link href="/products/ai-calling" className="w-full">
                  AI Calling
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800">
                <Link href="/products/ai-whatsapp" className="w-full">
                  AI WhatsApp Messaging
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800">
                <Link href="/products/ai-sms" className="w-full">
                  AI SMS Messaging
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800">
                <Link href="/products/lead-generation" className="w-full">
                  Lead Generation
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/pricing" className="text-white hover:text-orange-300">
            Pricing
          </Link>
          <Link href="/blog" className="text-white hover:text-orange-300">
            Blog
          </Link>
          <Link href="/contact" className="text-white hover:text-orange-300">
            Contact Us
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          {isLoading ? (
            // Loading state for auth
            <div className="w-20 h-10 bg-gray-700 animate-pulse rounded"></div>
          ) : user ? (
            // User is logged in
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatar-placeholder.png" alt={user.name || ""} />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-500 focus:text-red-500"
                  onClick={() => logOut()}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // User is not logged in
            <>
              <Link href="/signin">
                <Button variant="ghost" className="text-white hover:text-orange-300">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

// Default export for backward compatibility
export default Navbar;

