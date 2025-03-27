import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Image src="/logo.svg" alt="Restaurant Management Logo" width={40} height={40} className="mr-2" />
            </div>
            <p className="text-sm text-gray-600 mb-2">Empowering restaurants, one table at a time.</p>
            <p className="text-sm text-gray-600">Discover seamless dining with Our App</p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#e85c2c]">
                  Reservation system
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#e85c2c]">
                  Table management
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#e85c2c]">
                  CRM and guest profiles
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#e85c2c]">
                  Waitlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#e85c2c]">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#e85c2c]">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="text-gray-600 hover:text-[#e85c2c]">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms-of-service" className="text-gray-600 hover:text-[#e85c2c]">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-[#e85c2c]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-[#e85c2c]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-gray-600 hover:text-[#e85c2c]">
                  Legal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-[#e85c2c]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#e85c2c]">
                  Research
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#e85c2c]">
                  Success stories
                </Link>
              </li>
              <li>
                <Link href="/legal/cookie-policy" className="text-gray-600 hover:text-[#e85c2c]">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/acceptable-use-policy" className="text-gray-600 hover:text-[#e85c2c]">
                  Acceptable Use Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/data-processing-agreement" className="text-gray-600 hover:text-[#e85c2c]">
                  Data Processing Agreement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

