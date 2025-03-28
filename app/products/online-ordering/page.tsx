import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function OnlineOrderingSystemPage() {
    // Sample pricing data - in real implementation, this would be fetched from database
    const pricingTiers = [
        {
            name: "Basic",
            price: 49,
            setupFee: 99,
            features: [
                "Online menu management",
                "Order tracking",
                "Customer database",
                "Basic analytics",
                "Email support"
            ]
        },
        {
            name: "Pro",
            price: 99,
            setupFee: 149,
            features: [
                "All Basic features",
                "Custom branding",
                "Advanced analytics",
                "Priority support",
                "Multiple location support",
                "Menu customization"
            ]
        },
        {
            name: "Enterprise",
            price: "Custom",
            setupFee: "Custom",
            features: [
                "All Pro features",
                "Dedicated account manager",
                "API access",
                "Custom integrations",
                "24/7 support",
                "High volume order processing"
            ]
        }
    ]

    return (
        <div className="bg-[#f8f5eb] min-h-screen">
            <Navbar />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <section className="mb-16 text-center">
                    <div className="inline-block bg-orange-100 text-[#e85c2c] px-4 py-1 rounded-full text-sm font-medium mb-4">
                        Online Ordering System
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">
                        Streamline Your Business's <br /> Online Ordering
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg mb-8">
                        Increase revenue and reduce operational costs with our powerful online ordering system
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6 text-lg">Get Started</Button>
                        <Button variant="outline" className="border-[#e85c2c] text-[#e85c2c] hover:bg-orange-50 px-8 py-6 text-lg">View Demo</Button>
                    </div>
                </section>

                {/* Dashboard Preview */}
                <section className="mb-20">
                    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-[#e85c2c] mr-2"></div>
                                <span className="font-medium text-[#e85c2c]">Online Ordering Dashboard</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="bg-gray-200 rounded-full px-3 py-1 text-xs flex items-center">
                                    <span className="mr-2">Live Orders</span>
                                    <div className="w-8 h-4 bg-white rounded-full relative">
                                        <div className="absolute right-0 top-0 w-4 h-4 bg-[#e85c2c] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-medium mb-2">Incoming Orders (8)</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="bg-gray-50 p-3 rounded-lg border-l-4 border-[#e85c2c]">
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm font-medium">Order #{1000 + i}</div>
                                            <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">New</div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">2 min ago</div>
                                        <div className="text-sm font-medium mt-2">$24.99</div>
                                        <div className="mt-2 flex justify-between">
                                            <Button variant="ghost" size="sm" className="text-xs h-7 px-2">Details</Button>
                                            <Button size="sm" className="text-xs h-7 px-2 bg-[#e85c2c] hover:bg-[#d04a1d] text-white">Accept</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Order Analytics</h3>
                                <select className="text-xs border rounded px-2 py-1">
                                    <option>Today</option>
                                    <option>This Week</option>
                                    <option>This Month</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500">Total Orders</div>
                                    <div className="text-2xl font-bold">248</div>
                                    <div className="text-xs text-green-600 mt-1">↑ 24% from last week</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500">Average Order Value</div>
                                    <div className="text-2xl font-bold">$32.75</div>
                                    <div className="text-xs text-green-600 mt-1">↑ 5% from last week</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500">Completed Orders</div>
                                    <div className="text-2xl font-bold">231</div>
                                    <div className="text-xs text-gray-600 mt-1">93% completion rate</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Top Selling Items</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { name: "Signature Burger", price: "15.99", orders: 87, img: "/placeholder.svg?height=80&width=80" },
                                    { name: "Margherita Pizza", price: "18.99", orders: 64, img: "/placeholder.svg?height=80&width=80" },
                                    { name: "Chicken Wings", price: "12.99", orders: 58, img: "/placeholder.svg?height=80&width=80" },
                                    { name: "Vegan Bowl", price: "14.99", orders: 42, img: "/placeholder.svg?height=80&width=80" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-50 p-4 rounded-lg flex">
                                        <Image
                                            src={item.img || "/placeholder.svg"}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="rounded-lg mr-3 object-cover"
                                        />
                                        <div>
                                            <div className="text-sm font-medium">{item.name}</div>
                                            <div className="text-xs text-gray-500">{item.orders} orders this month</div>
                                            <div className="text-sm font-medium mt-2">${item.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Powerful Features to Grow Your Business</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Our online ordering system is designed to help businesses increase revenue and streamline operations
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="14" x="2" y="5" rx="2" />
                                    <line x1="2" x2="22" y1="10" y2="10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Direct Online Ordering</h3>
                            <p className="text-gray-600">Accept orders directly through your website without commission fees from third-party platforms.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                            <p className="text-gray-600">Accept multiple payment methods with our PCI-compliant secure payment processing.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                                    <path d="M22 12A10 10 0 0 0 12 2v10z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
                            <p className="text-gray-600">Gain valuable insights into your sales, customer behavior, and most popular items.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Customer Management</h3>
                            <p className="text-gray-600">Build customer profiles, track order history, and create targeted marketing campaigns.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m18 16 4-4-4-4" />
                                    <path d="m6 8-4 4 4 4" />
                                    <path d="m14.5 4-5 16" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Menu Management</h3>
                            <p className="text-gray-600">Easily update menu items, prices, descriptions, and availability in real-time.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                                    <line x1="4" x2="4" y1="22" y2="15" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Multi-location Support</h3>
                            <p className="text-gray-600">Manage multiple business locations from a single dashboard with location-specific menus.</p>
                        </div>
                    </div>
                </section>

                {/* Pricing Chart */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Transparent Pricing</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Choose the plan that works best for your business's online ordering needs
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {pricingTiers.map((tier, index) => (
                            <div key={index} className={`rounded-lg shadow-sm overflow-hidden ${index === 1 ? 'border-2 border-[#e85c2c]' : 'border border-gray-200'}`}>
                                <div className={`p-6 ${index === 1 ? 'bg-[#fff0eb]' : 'bg-white'}`}>
                                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                    <div className="mb-4">
                                        <span className="text-3xl font-bold">{typeof tier.price === 'number' ? `$${tier.price}` : tier.price}</span>
                                        {typeof tier.price === 'number' && <span className="text-gray-500">/month</span>}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-6">
                                        Setup fee: {typeof tier.setupFee === 'number' ? `$${tier.setupFee}` : tier.setupFee}
                                    </div>
                                    <Button className={`w-full ${index === 1 ? 'bg-[#e85c2c] hover:bg-[#d04a1d] text-white' : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'}`}>
                                        {index === 2 ? 'Contact Sales' : 'Get Started'}
                                    </Button>
                                </div>
                                <div className="bg-white p-6">
                                    <p className="text-sm font-medium mb-4">What's included:</p>
                                    <ul className="space-y-3">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Join hundreds of businesses that have transformed their online ordering experience
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e85c2c" stroke="none">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-6">"Since implementing the online ordering system, we've seen a 35% increase in our takeout revenue. The platform is incredibly easy to use for both our staff and customers."</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                <div>
                                    <p className="font-medium">Sarah Johnson</p>
                                    <p className="text-sm text-gray-500">Owner, Bistro Deluxe</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e85c2c" stroke="none">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-6">"The analytics feature has been a game-changer for our business. We can now see exactly what items are selling well and optimize our menu accordingly."</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                <div>
                                    <p className="font-medium">Michael Chen</p>
                                    <p className="text-sm text-gray-500">Manager, Spice House</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e85c2c" stroke="none">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-6">"Customer satisfaction has gone through the roof since we started using this platform. The ordering process is seamless, and we've reduced errors by 90%."</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                <div>
                                    <p className="font-medium">Jessica Rodriguez</p>
                                    <p className="text-sm text-gray-500">Owner, Fresh Bites</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-[#1e1e1e] text-white p-12 rounded-lg text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business's Online Ordering?</h2>
                    <p className="mb-8 max-w-2xl mx-auto">Join hundreds of businesses that have increased their revenue with our online ordering system</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6 text-lg">Get Started Today</Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1e1e1e] px-8 py-6 text-lg">Schedule a Demo</Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
} 