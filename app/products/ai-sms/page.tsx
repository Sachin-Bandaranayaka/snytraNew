import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AISMSPage() {
    // Sample pricing data - in a real implementation, this would be fetched from database
    const pricingTiers = [
        {
            name: "Basic",
            price: 39,
            messagesPerMonth: 500,
            features: [
                "AI-powered SMS messaging",
                "Booking confirmations",
                "Order notifications",
                "Basic analytics",
                "Email support"
            ]
        },
        {
            name: "Pro",
            price: 79,
            messagesPerMonth: 2000,
            features: [
                "All Basic features",
                "Advanced message flows",
                "Customer segmentation",
                "Custom templates",
                "CRM integration",
                "Priority support"
            ]
        },
        {
            name: "Enterprise",
            price: "Custom",
            messagesPerMonth: "Unlimited",
            features: [
                "All Pro features",
                "Advanced analytics",
                "Custom AI training",
                "Dedicated phone number",
                "API access",
                "24/7 support"
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
                        AI SMS Messaging
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">
                        Intelligent SMS Communication <br /> For Your Restaurant
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg mb-8">
                        Streamline customer interactions, confirmations, and promotions with AI-powered SMS messaging
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6 text-lg">Start Free Trial</Button>
                        <Button variant="outline" className="border-[#e85c2c] text-[#e85c2c] hover:bg-orange-50 px-8 py-6 text-lg">View Demo</Button>
                    </div>
                </section>

                {/* SMS Demo */}
                <section className="mb-20 max-w-md mx-auto">
                    <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg p-4">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                            <div className="bg-gray-200 p-3 flex items-center justify-center">
                                <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
                            </div>
                            <div className="h-96 p-4 overflow-y-auto flex flex-col space-y-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm">
                                        BD
                                    </div>
                                    <div className="bg-gray-200 p-3 rounded-2xl rounded-tl-none max-w-xs">
                                        <p className="text-sm">Hi John! This is Bistro Deluxe confirming your reservation for 4 people this Saturday at 7 PM. Reply YES to confirm or NO to cancel.</p>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <div className="bg-[#e85c2c] text-white p-3 rounded-2xl rounded-tr-none max-w-xs">
                                        <p className="text-sm">YES</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm">
                                        BD
                                    </div>
                                    <div className="bg-gray-200 p-3 rounded-2xl rounded-tl-none max-w-xs">
                                        <p className="text-sm">Thank you! Your reservation is confirmed. Would you like to pre-order any drinks or appetizers?</p>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <div className="bg-[#e85c2c] text-white p-3 rounded-2xl rounded-tr-none max-w-xs">
                                        <p className="text-sm">Can you recommend a good wine for 4 people?</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm">
                                        BD
                                    </div>
                                    <div className="bg-gray-200 p-3 rounded-2xl rounded-tl-none max-w-xs">
                                        <p className="text-sm">Based on our most popular choices for groups, I'd recommend our house Cabernet Sauvignon ($45) or the Pinot Grigio ($42). Both pair well with most of our menu items. Would you like to reserve either?</p>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <div className="bg-[#e85c2c] text-white p-3 rounded-2xl rounded-tr-none max-w-xs">
                                        <p className="text-sm">Let's go with the Cabernet, thanks!</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm">
                                        BD
                                    </div>
                                    <div className="bg-gray-200 p-3 rounded-2xl rounded-tl-none max-w-xs">
                                        <p className="text-sm">Perfect! I've added a bottle of Cabernet Sauvignon to your reservation. We look forward to serving you on Saturday at 7 PM. Is there anything else you need?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 p-3 flex items-center">
                                <input
                                    type="text"
                                    placeholder="Message"
                                    className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
                                />
                                <button className="ml-2 bg-[#e85c2c] text-white p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m22 2-7 20-4-9-9-4Z" />
                                        <path d="M22 2 11 13" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Key Features</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Our AI SMS messaging system offers powerful tools to enhance your restaurant communications
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Reservation Reminders</h3>
                            <p className="text-gray-600">
                                Send automated reservation confirmations and reminders to reduce no-shows and last-minute cancellations.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                                    <line x1="2" x2="22" y1="10" y2="10"></line>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Order Status Updates</h3>
                            <p className="text-gray-600">
                                Keep customers informed about their takeout and delivery orders with real-time status notifications.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19.5 14.5c0 2.485-2.015 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5Z"></path>
                                    <path d="M2 13.364c0-3.518 2.455-6.547 5.726-7.364.65-.161 1.324.022 1.827.511a1.59 1.59 0 0 1 .257 1.902c-.39.684-1.227 1.078-2.047.908A4.363 4.363 0 0 0 4 13.364V18c0 1.098.902 2 2 2h2.5"></path>
                                    <path d="m21.2 7.6-4.8 4.8"></path>
                                    <path d="m16.4 7.6 4.8 4.8"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Personalized Promotions</h3>
                            <p className="text-gray-600">
                                Send targeted special offers based on customer preferences and dining history to drive repeat visits.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Two-way Conversations</h3>
                            <p className="text-gray-600">
                                Enable customers to reply and engage in natural conversations with our AI to answer questions and provide assistance.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <path d="M16 13H8"></path>
                                    <path d="M16 17H8"></path>
                                    <path d="M10 9H8"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Feedback Collection</h3>
                            <p className="text-gray-600">
                                Automatically request and collect customer feedback after dining experiences to improve your service.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Seamless Integration</h3>
                            <p className="text-gray-600">
                                Integrate with your existing restaurant management systems, POS, and CRM for unified operations.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Pricing Plans</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Choose the right AI SMS messaging plan for your restaurant's needs
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {pricingTiers.map((tier, index) => (
                            <div key={index} className={`rounded-lg shadow-sm overflow-hidden ${index === 1 ? 'border-2 border-[#e85c2c]' : 'border border-gray-200'}`}>
                                <div className={`p-6 ${index === 1 ? 'bg-[#fff0eb]' : 'bg-white'}`}>
                                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                    <div className="mb-2">
                                        <span className="text-3xl font-bold">{typeof tier.price === 'number' ? `$${tier.price}` : tier.price}</span>
                                        {typeof tier.price === 'number' && <span className="text-gray-500">/month</span>}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-6">
                                        Includes {tier.messagesPerMonth} messages per month
                                    </div>
                                    <Button className={`w-full ${index === 1 ? 'bg-[#e85c2c] hover:bg-[#d04a1d] text-white' : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'}`}>
                                        {index === 2 ? 'Contact Sales' : 'Start Free Trial'}
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

                    <div className="text-center mt-6 text-sm text-gray-600">
                        Additional messages are billed at $0.02 per message. Volume discounts available.
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-[#1e1e1e] text-white p-12 rounded-lg text-center">
                    <h2 className="text-3xl font-bold mb-4">Start Connecting With Your Customers Today</h2>
                    <p className="mb-8 max-w-2xl mx-auto">Join hundreds of restaurants using AI SMS messaging to enhance customer communication</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6 text-lg">Start Your 14-Day Free Trial</Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1e1e1e] px-8 py-6 text-lg">Schedule a Demo</Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}