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
      <section className="container mx-auto py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#e85c2c] mb-4">
          Revolutionize Your <br /> Restaurant Management
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">Smart tools to streamline your menu, orders, and operations.</p>
        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6 text-lg">Get Started</Button>
      </section>

      {/* Admin Dashboard Preview */}
      <section className="container mx-auto mb-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
        <div className="relative border border-gray-200 rounded-xl p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#e85c2c] mr-2"></div>
              <span className="font-medium text-[#e85c2c]">Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-200 rounded-full px-3 py-1 text-xs flex items-center">
                <span className="mr-2">Online Order</span>
                <div className="w-8 h-4 bg-white rounded-full relative">
                  <div className="absolute right-0 top-0 w-4 h-4 bg-[#e85c2c] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Waiting List (12)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-2 rounded-lg">
                  <div className="text-sm font-medium">John Doe</div>
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
              <h3 className="font-medium">Orders (20)</h3>
              <button className="text-xs bg-[#e85c2c] text-white px-2 py-1 rounded">View More</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-2 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-sm font-medium">Order #{i + 1}</div>
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
            <h3 className="font-medium mb-2">Top Seller Menu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
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
                    className="rounded mr-2"
                  />
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">Popular choice</div>
                    <div className="text-sm font-medium mt-1">${item.price}</div>
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
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-[#e85c2c] mb-2">Features Overview</h2>
        <p className="text-center mb-12">Discover our useful features</p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-6 flex">
              <div className="bg-purple-100 p-4 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="purple"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Menu & Inventory Management</h3>
                <p className="text-gray-600">Efficiently manage your menu items and inventory levels.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-6 flex">
              <div className="bg-red-100 p-4 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Customer Engagement</h3>
                <p className="text-gray-600">Enhance customer loyalty with QR ordering and effective communication.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-6 flex">
              <div className="bg-blue-100 p-4 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="blue"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
                <p className="text-gray-600">Gain valuable insights into sales trends and stock levels.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-6 flex">
              <div className="bg-pink-100 p-4 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="hotpink"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"></path>
                  <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"></path>
                  <line x1="12" y1="22" x2="12" y2="13"></line>
                  <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Order Management</h3>
                <p className="text-gray-600">Stay on top of live orders, refunds, and updates.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What We Offer */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-[#e85c2c] mb-2">What We Offer</h2>
        <p className="text-center mb-12">Discover our top offerings</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="bg-[#fff0eb] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
              >
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                <path d="M7 7h.01"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Table Scan & Ordering</h3>
            <p className="text-gray-600">Efficient order placement</p>
          </div>

          <div className="text-center">
            <div className="bg-[#fff0eb] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Order Tracking</h3>
            <p className="text-gray-600">Real-time order tracking</p>
          </div>

          <div className="text-center">
            <div className="bg-[#fff0eb] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
              >
                <path d="M2 20h.01"></path>
                <path d="M7 20v-4"></path>
                <path d="M12 20v-8"></path>
                <path d="M17 20V8"></path>
                <path d="M22 4v16"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
            <p className="text-gray-600">Track & manage stock levels</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="bg-[#fff0eb] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <line x1="3" x2="21" y1="9" y2="9"></line>
                <line x1="9" x2="9" y1="21" y2="9"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Admin Dashboard</h3>
            <p className="text-gray-600">Comprehensive admin tools</p>
          </div>

          <div className="text-center">
            <div className="bg-[#fff0eb] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
              >
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Kitchen/Staff Dashboard</h3>
            <p className="text-gray-600">View orders and get them ready for the user</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-[#e85c2c] mb-2">Customer Reviews</h2>
        <p className="text-center mb-12">What our customers says about us.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              review: "User-friendly interface and efficient order management.",
            },
            {
              review: "Real-time analytics have transformed our decision-making process.",
            },
            {
              review: "Customer engagement tools helped boost our loyalty program.",
            },
          ].map((item, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                    <Image src="/placeholder.svg?height=40&width=40" alt="Customer" width={40} height={40} />
                  </div>
                  <div>
                    <div className="font-bold">Alex</div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p>{item.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

