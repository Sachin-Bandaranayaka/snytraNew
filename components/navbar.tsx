import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function Navbar() {
  return (
    <header className="bg-[#1e1e1e] text-white py-3 px-4 rounded-lg mx-4 mt-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.svg" alt="Restaurant Management Logo" width={40} height={40} className="mr-2" />
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
          <Link href="/signin">
            <Button variant="ghost" className="text-white hover:text-orange-300">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

