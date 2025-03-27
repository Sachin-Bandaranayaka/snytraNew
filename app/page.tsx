import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="bg-[#f8f5eb]">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto py-6 sm:py-8 md:py-12 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#e85c2c] mb-3 md:mb-4">
          Revolutionize Your <br className="hidden sm:block" /> Restaurant Management
        </h1>
        <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto">Smart tools to streamline your menu, orders, and operations.</p>
        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-5 sm:px-6 py-4 sm:py-5 text-base">Get Started</Button>
      </section>

      {/* Admin Dashboard Preview */}
      <section className="container mx-auto mb-12 md:mb-20 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">Admin Dashboard</h2>
        <div className="relative border border-gray-200 rounded-xl p-3 md:p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#e85c2c] mr-2"></div>
              <span className="font-medium text-[#e85c2c] text-sm md:text-base">Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-200 rounded-full px-2 md:px-3 py-1 text-xs flex items-center">
                <span className="mr-2">Online Order</span>
                <div className="w-6 md:w-8 h-4 bg-white rounded-full relative">
                  <div className="absolute right-0 top-0 w-4 h-4 bg-[#e85c2c] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2 text-sm md:text-base">Waiting List (12)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-2 rounded-lg">
                  <div className="text-xs md:text-sm font-medium">John Doe</div>
                  <div className="text-xs text-gray-500">Party of 4 • 15m</div>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></div>
                    <span className="text-xs">Waiting</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-sm md:text-base">Orders (20)</h3>
              <button className="text-xs bg-[#e85c2c] text-white px-2 py-1 rounded">View More</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-2 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs md:text-sm font-medium">Order #{i + 1}</div>
                    <button className="text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Burger</span>
                      <span>$ 9.99</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Fries and Drink</span>
                      <span>$ 5.99</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Promo Fries</span>
                      <span>$ 0.00</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-sm md:text-base">Top Seller Menu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {[
                { name: "Margherita Pizza", price: "12.99", img: "/placeholder.svg?height=60&width=60" },
                { name: "Chicken Curry", price: "15.99", img: "/placeholder.svg?height=60&width=60" },
                { name: "New York Cheesecake", price: "8.99", img: "/placeholder.svg?height=60&width=60" },
                { name: "Grilled Salmon", price: "18.99", img: "/placeholder.svg?height=60&width=60" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-2 rounded-lg flex">
                  <Image
                    src={item.img || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded mr-2 w-12 h-12 md:w-[60px] md:h-[60px] object-cover"
                  />
                  <div>
                    <div className="text-xs md:text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">Popular choice</div>
                    <div className="text-xs md:text-sm font-medium mt-1">${item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#e85c2c]" : "bg-gray-300"}`}></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="container mx-auto py-10 md:py-16 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#e85c2c] mb-2">Features Overview</h2>
        <p className="text-center mb-8 md:mb-12">Discover our useful features</p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row">
              <div className="bg-purple-100 p-3 md:p-4 rounded-lg mb-4 md:mb-0 md:mr-4 flex justify-center md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="purple"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:w-8 md:h-8"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Menu & Inventory Management</h3>
                <p className="text-gray-600 text-sm md:text-base">Efficiently manage your menu items and inventory levels.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row">
              <div className="bg-red-100 p-3 md:p-4 rounded-lg mb-4 md:mb-0 md:mr-4 flex justify-center md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:w-8 md:h-8"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Customer Engagement</h3>
                <p className="text-gray-600 text-sm md:text-base">Enhance customer loyalty with QR ordering and effective communication.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row">
              <div className="bg-blue-100 p-3 md:p-4 rounded-lg mb-4 md:mb-0 md:mr-4 flex justify-center md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="blue"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:w-8 md:h-8"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Real-Time Analytics</h3>
                <p className="text-gray-600 text-sm md:text-base">Gain valuable insights into sales trends and stock levels.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row">
              <div className="bg-pink-100 p-3 md:p-4 rounded-lg mb-4 md:mb-0 md:mr-4 flex justify-center md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="hotpink"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:w-8 md:h-8"
                >
                  <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"></path>
                  <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"></path>
                  <line x1="12" y1="22" x2="12" y2="13"></line>
                  <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Order Management</h3>
                <p className="text-gray-600 text-sm md:text-base">Stay on top of live orders, refunds, and updates.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto py-10 md:py-16 px-4">
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Trusted by restaurants across <span className="text-[#e85c2c]">the globe</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#e85c2c]">10k+</div>
              <p className="text-sm md:text-base text-gray-500 mt-2">Restaurants Served</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#e85c2c]">500k+</div>
              <p className="text-sm md:text-base text-gray-500 mt-2">Orders Processed</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#e85c2c]">99.9%</div>
              <p className="text-sm md:text-base text-gray-500 mt-2">Uptime</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#e85c2c]">24/7</div>
              <p className="text-sm md:text-base text-gray-500 mt-2">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto py-10 md:py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
        <p className="text-center mb-8 md:mb-12">Hear from restaurant owners like you</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "John Smith",
              role: "Owner, The Gourmet Kitchen",
              quote: "This platform has completely transformed how we manage our restaurant. From inventory to customer orders, everything is streamlined.",
            },
            {
              name: "Lisa Johnson",
              role: "Manager, Seaside Bistro",
              quote: "The analytics dashboard gives us incredible insights into our business. We've been able to optimize our menu and increase profits significantly.",
            },
            {
              name: "Michael Chen",
              role: "Chef & Owner, Fusion Flavors",
              quote: "Customer engagement has never been easier. The feedback system has helped us improve our dishes and create a loyal customer base.",
            },
          ].map((testimonial, i) => (
            <Card key={i} className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e85c2c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-50"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-600 flex-grow text-sm md:text-base mb-4">{testimonial.quote}</p>
                  <div>
                    <div className="font-medium text-base">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-10 md:py-16 px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
        <p className="mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
          Join thousands of restaurants worldwide and start streamlining your operations today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6">Get Started</Button>
          <Button variant="outline" className="border-[#e85c2c] text-[#e85c2c] hover:bg-[#e85c2c]/10 px-8 py-6">
            Book a Demo
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

