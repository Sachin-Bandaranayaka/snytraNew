import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AIWhatsAppPage() {
    // Sample pricing data - in a real implementation, this would be fetched from database
    const pricingTiers = [
        {
            name: "Basic",
            price: 49,
            messagesPerMonth: 1000,
            features: [
                "AI-powered WhatsApp messaging",
                "Booking confirmations",
                "Order updates",
                "Basic analytics",
                "Email support"
            ]
        },
        {
            name: "Pro",
            price: 99,
            messagesPerMonth: 5000,
            features: [
                "All Basic features",
                "Advanced conversation flows",
                "Custom bot personality",
                "Chat transcriptions",
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
                "Multi-language support",
                "Custom AI training",
                "White-labeled solution",
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
                        AI WhatsApp Messaging
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">
                        Connect With Customers <br /> Where They Already Are
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg mb-8">
                        Automate customer service, reservations, and orders with intelligent WhatsApp messaging
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6 text-lg">Get Started</Button>
                        <Button variant="outline" className="border-[#e85c2c] text-[#e85c2c] hover:bg-orange-50 px-8 py-6 text-lg">View Demo</Button>
                    </div>
                </section>

                {/* Chat Demo */}
                <section className="mb-20 max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                        <div className="bg-[#128C7E] text-white p-4 flex items-center">
                            <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M17.415 14.382C17.117 14.233 15.656 13.515 15.384 13.415C15.112 13.316 14.914 13.267 14.715 13.565C14.517 13.864 13.948 14.532 13.775 14.731C13.601 14.93 13.428 14.954 13.131 14.806C12.834 14.657 11.876 14.341 10.741 13.329C9.858 12.541 9.261 11.568 9.088 11.27C8.914 10.972 9.070 10.811 9.218 10.663C9.352 10.53 9.516 10.316 9.664 10.143C9.813 9.97 9.862 9.846 9.961 9.647C10.061 9.449 10.012 9.275 9.937 9.127C9.862 8.978 9.268 7.515 9.020 6.92C8.779 6.341 8.534 6.419 8.352 6.41C8.178 6.402 7.980 6.4 7.782 6.4C7.584 6.4 7.262 6.474 6.990 6.773C6.718 7.072 5.950 7.79 5.950 9.252C5.950 10.715 7.014 12.128 7.163 12.327C7.312 12.526 9.258 15.525 12.239 16.812C12.949 17.118 13.502 17.301 13.933 17.437C14.645 17.664 15.290 17.632 15.800 17.555C16.370 17.47 17.563 16.836 17.811 16.142C18.059 15.448 18.059 14.853 17.984 14.731C17.910 14.609 17.712 14.532 17.415 14.382ZM12.04 21.952H12.035C10.264 21.952 8.520 21.485 6.997 20.61L6.642 20.392L2.915 21.366L3.907 17.730L3.667 17.361C2.704 15.782 2.191 13.947 2.192 12.062C2.194 6.984 6.323 2.855 12.045 2.855C14.799 2.855 17.378 3.932 19.303 5.858C20.257 6.81 21.014 7.937 21.523 9.176C22.032 10.415 22.284 11.741 22.262 13.078C22.260 18.156 18.131 21.952 12.04 21.952ZM20.213 3.677C18.940 2.401 17.429 1.387 15.770 0.696C14.111 0.005 12.338 -0.347 10.558 -0.341C4.803 -0.341 0.111 4.349 0.108 9.689C0.108 11.398 0.527 13.068 1.323 14.564L0 19.628L5.199 18.337C6.642 19.054 8.243 19.429 9.868 19.430H9.873C15.629 19.430 20.322 14.741 20.325 9.401C20.332 7.621 19.980 5.869 19.290 4.229C18.600 2.588 17.587 1.114 16.311 -0.159" />
                            </svg>
                            <div>
                                <p className="font-medium">Bistro Deluxe</p>
                                <p className="text-xs opacity-75">Online now</p>
                            </div>
                        </div>
                        <div className="p-4 h-96 overflow-y-auto flex flex-col space-y-4">
                            <div className="flex justify-end">
                                <div className="bg-[#DCF8C6] p-3 rounded-lg max-w-xs">
                                    <p className="text-sm">Hi, I'd like to make a reservation for 4 people this Saturday at 7pm</p>
                                    <p className="text-xs text-gray-500 text-right mt-1">4:32 PM</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="bg-white border border-gray-200 p-3 rounded-lg max-w-xs shadow-sm">
                                    <p className="text-sm">Hello! I'd be happy to help you with a reservation for 4 people on Saturday at 7 PM. Let me check our availability...</p>
                                    <p className="text-xs text-gray-500 text-right mt-1">4:32 PM</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="bg-white border border-gray-200 p-3 rounded-lg max-w-xs shadow-sm">
                                    <p className="text-sm">Great news! We have a table available at that time. May I know your name for the reservation?</p>
                                    <p className="text-xs text-gray-500 text-right mt-1">4:33 PM</p>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <div className="bg-[#DCF8C6] p-3 rounded-lg max-w-xs">
                                    <p className="text-sm">John Smith</p>
                                    <p className="text-xs text-gray-500 text-right mt-1">4:33 PM</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="bg-white border border-gray-200 p-3 rounded-lg max-w-xs shadow-sm">
                                    <p className="text-sm">Thank you, John. I've reserved a table for 4 people this Saturday at 7 PM under the name Smith. You'll receive a confirmation shortly. Is there anything else I can help you with?</p>
                                    <p className="text-xs text-gray-500 text-right mt-1">4:34 PM</p>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <div className="bg-[#DCF8C6] p-3 rounded-lg max-w-xs">
                                    <p className="text-sm">Do you have a vegan menu?</p>
                                    <p className="text-xs text-gray-500 text-right mt-1">4:34 PM</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="bg-white border border-gray-200 p-3 rounded-lg max-w-xs shadow-sm">
                                    <p className="text-sm">Yes, we have several delicious vegan options! Our chef's special vegan risotto is particularly popular. Would you like me to send you our vegan menu?</p>
                                    <p className="text-xs text-gray-500 text-right mt-1">4:35 PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-t p-3 flex items-center">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
                            />
                            <button className="ml-2 bg-[#128C7E] text-white p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m22 2-7 20-4-9-9-4Z" />
                                    <path d="M22 2 11 13" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Why Choose AI WhatsApp Messaging?</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Enhance customer experience and streamline operations with our powerful WhatsApp integration
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <div className="bg-orange-100 p-4 rounded-full inline-block mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Meet Customers Where They Are</h3>
                            <p className="text-gray-600">
                                Engage with customers on WhatsApp, a platform they already use daily, without requiring them to download another app.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <div className="bg-orange-100 p-4 rounded-full inline-block mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">24/7 Instant Responses</h3>
                            <p className="text-gray-600">
                                Provide immediate responses to customer queries at any time of day, improving satisfaction and engagement.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <div className="bg-orange-100 p-4 rounded-full inline-block mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Personalized Experience</h3>
                            <p className="text-gray-600">
                                Create personalized interactions based on customer history and preferences, enhancing the dining experience.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Key Features</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Our AI WhatsApp messaging system provides powerful tools to enhance your restaurant's customer communications
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Smart Reservation Management</h3>
                                <p className="text-gray-600">
                                    Accept, modify, and cancel reservations directly through WhatsApp with automatic integration into your booking system.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Menu & Information Queries</h3>
                                <p className="text-gray-600">
                                    Let customers ask about menu items, ingredients, allergens, hours, location, and other common questions.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="18" x="3" y="3" rx="2" />
                                    <path d="m8 12 3 3 6-6" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Order Status Updates</h3>
                                <p className="text-gray-600">
                                    Send automated order confirmations, preparation updates, and delivery notifications to keep customers informed.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Loyalty Program Integration</h3>
                                <p className="text-gray-600">
                                    Manage loyalty points, rewards, and special offers through the WhatsApp interface to increase repeat business.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                                    <path d="M22 12A10 10 0 0 0 12 2v10z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Analytics & Insights</h3>
                                <p className="text-gray-600">
                                    Gain valuable data on customer interactions, popular questions, and engagement patterns to improve your service.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Seamless Human Handoff</h3>
                                <p className="text-gray-600">
                                    When needed, conversations can be smoothly transferred to your staff with complete context preservation.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Pricing Plans</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Choose the right AI WhatsApp messaging plan for your restaurant's needs
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

                    <div className="text-center mt-6 text-sm text-gray-600">
                        Need more messages? Contact our sales team for custom volume pricing.
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-[#1e1e1e] text-white p-12 rounded-lg text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Customer Communications?</h2>
                    <p className="mb-8 max-w-2xl mx-auto">Join hundreds of restaurants automating customer interactions with AI WhatsApp messaging</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6 text-lg">Start Your Free Trial</Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1e1e1e] px-8 py-6 text-lg">Schedule a Demo</Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}