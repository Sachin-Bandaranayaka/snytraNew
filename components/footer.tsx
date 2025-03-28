import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 pt-8 md:pt-12 pb-6 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div className="col-span-2 sm:col-span-2 md:col-span-1 mb-6 md:mb-0">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image src="/logo.png" alt="Business Management Logo" width={200} height={200} className="w-40 md:w-auto h-auto mr-2" />
              </Link>
              <p className="text-sm text-gray-600 mb-2">Empowering businesses, one customer at a time.</p>
            </div>
            <p className="text-sm text-gray-600">Discover seamless dining with Our App</p>
          </div>

          <div>
            <h3 className="font-bold mb-3 md:mb-4">Features</h3>
            <ul className="space-y-1 md:space-y-2 text-sm">
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
            <h3 className="font-bold mb-3 md:mb-4">Company</h3>
            <ul className="space-y-1 md:space-y-2 text-sm">
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
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-[#e85c2c]">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3 md:mb-4">Resources</h3>
            <ul className="space-y-1 md:space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-[#e85c2c]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-600 hover:text-[#e85c2c]">
                  Resource Center
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

        <div className="border-t border-gray-200 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-600">
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Default export for backward compatibility
export default Footer;

