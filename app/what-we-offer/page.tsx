import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function WhatWeOfferPage() {
  return (
    <div className="bg-[#f8f5eb] min-h-screen">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Explore Our Services Section */}
        <section className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">Explore Our Services</h1>
          <p className="max-w-3xl mx-auto text-lg mb-8">Discover what our restaurant management app offers</p>
          <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6 text-lg">Get Started</Button>
        </section>

        {/* Order Management Dashboard Preview */}
        <section className="mb-20">
          <div className="border border-gray-200 rounded-xl p-4 bg-white">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-[#e85c2c] mr-2"></div>
              <span className="font-medium text-[#e85c2c]">Order Management</span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Order Metrics</h3>
                <button className="text-xs bg-[#e85c2c] text-white px-2 py-1 rounded">View More</button>
              </div>
              <p className="text-xs text-gray-500 mb-4">Overview of orders for today</p>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-2">Completed Orders</h4>
                  <p className="text-2xl font-bold">110</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-2">In Progress Orders</h4>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-2">Pending Orders</h4>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-2">Cancelled Orders</h4>
                  <p className="text-2xl font-bold">110</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Orders (20)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {[...Array(12)].map((_, i) => (
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
          </div>
        </section>

        {/* Our Offerings Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-[#e85c2c] mb-2">Our Offerings</h2>
          <p className="text-center mb-12">A showcase of our services</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-[#e85c2c] p-4 rounded-lg mr-4 h-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                  <path d="M7 7h.01"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Table Scan & Ordering</h3>
                <p className="text-gray-600 text-sm">QR code integration for seamless dine-in ordering</p>
              </div>
            </div>

            <div className="flex bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-[#e85c2c] p-4 rounded-lg mr-4 h-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                  <path d="m9 16 2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Order Management</h3>
                <p className="text-gray-600 text-sm">View live orders, update statuses, and process refunds</p>
              </div>
            </div>

            <div className="flex bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-[#e85c2c] p-4 rounded-lg mr-4 h-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" x2="12" y1="22" y2="12"></line>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Menu & Inventory Management</h3>
                <p className="text-gray-600 text-sm">Add, edit, and track menu items with low-stock alerts</p>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Engagement Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-[#e85c2c] mb-2">Customer Engagement</h2>
          <p className="text-center mb-12">Enhance customer interaction with loyalty programs</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="gold"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Customer Loyalty Programs</h3>
                  <p className="text-gray-600 text-sm">Reward loyal customers with discounts and special offers</p>
                </div>
              </div>
              <div className="mt-4">
                <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white">Admin</Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="green"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Analytics & Reports</h3>
                  <p className="text-gray-600 text-sm">
                    Track sales, monitor trends, and gain valuable insights for better decision-making
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white">Manager</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Online Presence Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-[#e85c2c] mb-2">Online Presence</h2>
          <p className="text-center mb-12">Stay connected with your audience</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                  <path d="M12 18h.01"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">Mobile App</h3>
              <p className="text-gray-600 text-sm">Convenient access for customers</p>
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
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="M12 4v16"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">Web Interface</h3>
              <p className="text-gray-600 text-sm">Efficient browsing and ordering</p>
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
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <line x1="3" x2="21" y1="9" y2="9"></line>
                  <line x1="9" x2="9" y1="21" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">Admin Dashboard</h3>
              <p className="text-gray-600 text-sm">Comprehensive management tools</p>
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
                  <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
                  <line x1="6" x2="18" y1="17" y2="17"></line>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">Kitchen Dashboard</h3>
              <p className="text-gray-600 text-sm">Real-time order tracking</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

