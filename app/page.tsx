import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AdminDashboardCarousel from "@/components/admin-dashboard-carousel"
import AutoRotatingTestimonials from "@/components/auto-rotating-testimonials"

export default function Home() {
  // Testimonials data
  const testimonials = [
    {
      name: "John Smith",
      role: "Owner, The Gourmet Kitchen",
      quote: "This platform has completely transformed how we manage our business. From inventory to customer orders, everything is streamlined.",
    },
    {
      name: "Lisa Johnson",
      role: "Manager, Seaside Bistro",
      quote: "The analytics dashboard gives us incredible insights into our business. We've been able to optimize our menu and increase profits significantly.",
    },
    {
      name: "Michael Chen",
      role: "Chef & Owner, Fusion Flavors",
      quote: "Customer engagement has never been easier. The feedback system has helped us improve our offerings and create a loyal customer base.",
    },
    {
      name: "Amanda Rodriguez",
      role: "Owner, Taste of Mexico",
      quote: "The ordering system integration was seamless. Our customers love the easy online ordering, and our staff appreciate the organized workflow.",
    },
    {
      name: "Robert Kim",
      role: "General Manager, Seoul BBQ House",
      quote: "Support has been fantastic. Whenever we've had questions, the team responds quickly and effectively. They truly care about our success.",
    },
  ];

  return (
    <div className="bg-[#f8f5eb]">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto py-6 sm:py-8 md:py-12 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#e85c2c] mb-3 md:mb-4">
          Revolutionize Your <br className="hidden sm:block" /> Business Management
        </h1>
        <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto">Smart tools to streamline your menu, orders, and operations.</p>
        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-5 sm:px-6 py-4 sm:py-5 text-base">Get Started</Button>
      </section>

      {/* Admin Dashboard Preview */}
      <section className="container mx-auto mb-12 md:mb-20 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">Admin Dashboard</h2>
        <AdminDashboardCarousel />
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
            Trusted by businesses across <span className="text-[#e85c2c]">the globe</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#e85c2c]">10k+</div>
              <p className="text-sm md:text-base text-gray-500 mt-2">Businesses Served</p>
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
        <p className="text-center mb-8 md:mb-12">Hear from business owners like you</p>

        <div className="max-w-3xl mx-auto">
          <AutoRotatingTestimonials testimonials={testimonials} rotationInterval={6000} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-10 md:py-16 px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
        <p className="mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
          Join thousands of businesses worldwide and start streamlining your operations today.
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

