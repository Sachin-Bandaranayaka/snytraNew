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
import { ChevronDown, Menu, X, User } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { user, isLoading, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-[#1e1e1e] text-white py-2 px-4 rounded-lg mx-4 mt-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Business Management Logo" width={150} height={150} className="mr-2 w-auto h-8 md:h-10" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link href="/" className="text-white hover:text-orange-300 text-sm">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-orange-300 text-sm">
            About Us
          </Link>
          <Link href="/what-we-offer" className="text-white hover:text-orange-300 text-sm">
            What We Offer
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-white hover:text-orange-300 text-sm">
              Products <ChevronDown className="ml-1 h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1e1e1e] border-gray-700 mt-1">
              <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800 text-sm">
                <Link href="/products/online-ordering" className="w-full">
                  Online Ordering System
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800 text-sm">
                <Link href="/products/ai-calling" className="w-full">
                  AI Calling
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800 text-sm">
                <Link href="/products/ai-whatsapp" className="w-full">
                  AI WhatsApp Messaging
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800 text-sm">
                <Link href="/products/ai-sms" className="w-full">
                  AI SMS Messaging
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800 text-sm">
                <Link href="/products/lead-generation" className="w-full">
                  Lead Generation
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/pricing" className="text-white hover:text-orange-300 text-sm">
            Pricing
          </Link>
          <Link href="/blog" className="text-white hover:text-orange-300 text-sm">
            Blog
          </Link>
          <Link href="/contact" className="text-white hover:text-orange-300 text-sm">
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="p-0 md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>

          {isLoading ? (
            // Loading state for auth
            <div className="w-16 h-8 bg-gray-700 animate-pulse rounded"></div>
          ) : user ? (
            // User is logged in
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar-placeholder.png" alt={user.name || ""} />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer text-sm">Dashboard</Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer text-sm">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="cursor-pointer text-sm">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer text-sm">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-500 focus:text-red-500 text-sm"
                  onClick={() => logOut()}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // User is not logged in
            <>
              <div className="hidden md:block">
                <Link href="/signin">
                  <Button variant="ghost" className="text-white hover:text-orange-300 text-sm h-8 px-3">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white text-sm h-8 px-3">Sign Up</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1e1e1e] py-4 px-2 mt-2 rounded-lg animate-in slide-in-from-top">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-white hover:text-orange-300 px-4 py-2 hover:bg-gray-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-orange-300 px-4 py-2 hover:bg-gray-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/what-we-offer"
              className="text-white hover:text-orange-300 px-4 py-2 hover:bg-gray-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              What We Offer
            </Link>

            <div className="px-4 py-2">
              <p className="mb-2 font-semibold">Products</p>
              <div className="ml-4 flex flex-col space-y-2">
                <Link
                  href="/products/online-ordering"
                  className="text-white hover:text-orange-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Online Ordering System
                </Link>
                <Link
                  href="/products/ai-calling"
                  className="text-white hover:text-orange-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI Calling
                </Link>
                <Link
                  href="/products/ai-whatsapp"
                  className="text-white hover:text-orange-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI WhatsApp Messaging
                </Link>
                <Link
                  href="/products/ai-sms"
                  className="text-white hover:text-orange-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI SMS Messaging
                </Link>
                <Link
                  href="/products/lead-generation"
                  className="text-white hover:text-orange-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Lead Generation
                </Link>
              </div>
            </div>

            <Link
              href="/pricing"
              className="text-white hover:text-orange-300 px-4 py-2 hover:bg-gray-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-white hover:text-orange-300 px-4 py-2 hover:bg-gray-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-orange-300 px-4 py-2 hover:bg-gray-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>

            {!user && (
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-700">
                <Link
                  href="/signin"
                  className="px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-center text-white hover:text-orange-300">
                    Sign In
                  </Button>
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full justify-center bg-[#e85c2c] hover:bg-[#d04a1d] text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

// Default export for backward compatibility
export default Navbar;

