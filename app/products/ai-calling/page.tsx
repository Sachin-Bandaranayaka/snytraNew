import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AICallingPage() {
    // Sample pricing data - in a real implementation, this would be fetched from database
    const pricingTiers = [
        {
            name: "Starter",
            price: 59,
            callsPerMonth: 200,
            features: [
                "AI-powered automated calls",
                "Booking confirmations",
                "Basic call analytics",
                "Email summaries",
                "Standard voice options"
            ]
        },
        {
            name: "Professional",
            price: 149,
            callsPerMonth: 750,
            features: [
                "All Starter features",
                "Advanced call flows",
                "Custom voice personality",
                "Call transcriptions",
                "CRM integration",
                "Priority support"
            ]
        },
        {
            name: "Enterprise",
            price: "Custom",
            callsPerMonth: "Unlimited",
            features: [
                "All Professional features",
                "Dedicated phone numbers",
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
                        AI Calling
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">
                        Automate Your Restaurant's <br /> Phone Communications
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg mb-8">
                        Let AI handle your reservations, confirmations, and customer inquiries with natural, human-like conversations
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6 text-lg">Start Free Trial</Button>
                        <Button variant="outline" className="border-[#e85c2c] text-[#e85c2c] hover:bg-orange-50 px-8 py-6 text-lg">Listen to Demo</Button>
                    </div>
                </section>

                {/* Video Demo */}
                <section className="mb-20">
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-xl relative max-w-4xl mx-auto">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-white text-center">
                                <div className="bg-[#e85c2c] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                </div>
                                <p className="font-medium">Watch how AI Calling works</p>
                            </div>
                        </div>
                        <Image
                            src="/placeholder.svg?height=720&width=1280"
                            alt="AI Calling Demo"
                            width={1280}
                            height={720}
                            className="w-full h-full object-cover opacity-50"
                        />
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">How AI Calling Works</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Our AI calling system handles your restaurant's phone communications with natural, human-like conversations
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <div className="bg-orange-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-[#e85c2c] text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI Answers the Call</h3>
                            <p className="text-gray-600">
                                When a customer calls, our AI assistant answers immediately with a friendly greeting customized for your restaurant.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <div className="bg-orange-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-[#e85c2c] text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Natural Conversation</h3>
                            <p className="text-gray-600">
                                The AI engages in a natural conversation, understanding context, answering questions about hours, menu, and handling reservations.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <div className="bg-orange-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-[#e85c2c] text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Actions & Integration</h3>
                            <p className="text-gray-600">
                                The system takes reservations, adds them to your booking system, sends confirmation texts, and can transfer to staff when needed.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Key Features</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Our AI calling system provides powerful tools to enhance your restaurant's customer communications
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Natural Voice Interaction</h3>
                                <p className="text-gray-600">
                                    Our AI uses advanced natural language processing to deliver human-like conversations with customers, understanding context and nuance.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="14" x="2" y="5" rx="2" />
                                    <line x1="2" x2="22" y1="10" y2="10" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Reservation Management</h3>
                                <p className="text-gray-600">
                                    The AI takes reservations, checks availability, and integrates with your existing reservation system automatically.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Call Transcription & Insights</h3>
                                <p className="text-gray-600">
                                    Every call is transcribed and analyzed, providing valuable insights into customer preferences and common questions.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
                                <p className="text-gray-600">
                                    Never miss a call again. Our AI assistant is available 24/7, ensuring every customer inquiry is handled promptly.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                    <path d="m9 12 2 2 4-4"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Custom Voice & Personality</h3>
                                <p className="text-gray-600">
                                    Customize the AI's voice, accent, and personality to match your restaurant's brand and atmosphere.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 11 18-5v12L3 14v-3z"></path>
                                    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Smart Call Routing</h3>
                                <p className="text-gray-600">
                                    The AI can transfer calls to the appropriate staff member when necessary, ensuring complex inquiries are handled properly.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive Demo */}
                <section className="mb-20 bg-white p-8 rounded-xl shadow-sm">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Try a Demo Conversation</h2>
                            <p className="text-gray-600 mb-6">
                                Experience how our AI calling system handles typical restaurant interactions. Click on common questions to hear the AI's response.
                            </p>

                            <div className="space-y-3">
                                <button className="bg-gray-100 hover:bg-orange-100 text-left w-full p-3 rounded-lg transition-colors">
                                    "I'd like to book a table for 4 people this Friday at 7 PM"
                                </button>
                                <button className="bg-gray-100 hover:bg-orange-100 text-left w-full p-3 rounded-lg transition-colors">
                                    "What are your opening hours on weekends?"
                                </button>
                                <button className="bg-gray-100 hover:bg-orange-100 text-left w-full p-3 rounded-lg transition-colors">
                                    "Do you have any vegan options on your menu?"
                                </button>
                                <button className="bg-gray-100 hover:bg-orange-100 text-left w-full p-3 rounded-lg transition-colors">
                                    "I need to modify my reservation from yesterday"
                                </button>
                            </div>

                            <div className="mt-6">
                                <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white">Start Your Free Trial</Button>
                            </div>
                        </div>

                        <div className="bg-gray-100 rounded-xl p-6 h-80 flex flex-col">
                            <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
                                <div className="w-10 h-10 bg-[#e85c2c] rounded-full flex items-center justify-center text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium">AI Assistant</p>
                                    <p className="text-xs text-gray-500">Connected</p>
                                </div>
                            </div>

                            <div className="flex-grow overflow-y-auto space-y-4 mb-4">
                                <div className="bg-orange-100 p-3 rounded-lg inline-block max-w-xs">
                                    <p className="text-sm">Hello! Thank you for calling Bistro Deluxe. How may I assist you today?</p>
                                </div>

                                <div className="flex justify-end">
                                    <div className="bg-gray-200 p-3 rounded-lg inline-block max-w-xs">
                                        <p className="text-sm">Click on a question on the left to see the AI's response...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Pricing Plans</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Choose the right AI Calling plan for your restaurant's needs
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
                                        Includes {tier.callsPerMonth} calls per month
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
                        Need more calls? Contact our sales team for custom volume pricing.
                    </div>
                </section>

                {/* Testimonials */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Success Stories</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        See how restaurants are transforming their customer communications with AI Calling
                    </p>

                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e85c2c" stroke="none">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-6 text-lg">
                                "We were missing about 30% of our calls during peak hours. With AI Calling, we've captured those missed opportunities and increased our reservations by 25%. The customers love it because they always get a response, and my staff can focus on serving customers in the restaurant."
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                <div>
                                    <p className="font-medium">Thomas Reynolds</p>
                                    <p className="text-sm text-gray-500">Owner, The Harbor Grill</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e85c2c" stroke="none">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-6 text-lg">
                                "The AI Calling system paid for itself in the first month. We've reduced our staffing costs while improving our customer service. The AI handles all routine calls perfectly, and our team only gets involved for special requests. It's been a game-changer for our business."
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                <div>
                                    <p className="font-medium">Maria Sanchez</p>
                                    <p className="text-sm text-gray-500">General Manager, Cucina Bella</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Get answers to common questions about our AI Calling system
                    </p>

                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold mb-2">How natural does the AI voice sound?</h3>
                            <p className="text-gray-600">
                                Our AI uses the latest natural language processing and voice synthesis technologies to create human-like conversations. Most callers can't tell they're speaking with an AI assistant.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold mb-2">Can the AI handle complex requests or situations?</h3>
                            <p className="text-gray-600">
                                The AI handles most common restaurant inquiries seamlessly. For complex situations, the system can intelligently escalate to a staff member while providing context from the conversation.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold mb-2">How does the system integrate with my existing reservation software?</h3>
                            <p className="text-gray-600">
                                We offer integration with most popular reservation systems including OpenTable, Resy, and SevenRooms. Our team will help set up the connection during your onboarding process.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold mb-2">What happens if the AI can't answer a specific question?</h3>
                            <p className="text-gray-600">
                                If the AI encounters a question it can't answer, it will politely transfer the call to a staff member or take a message, ensuring no customer inquiry goes unanswered.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold mb-2">How long does it take to set up the AI Calling system?</h3>
                            <p className="text-gray-600">
                                Most restaurants are up and running within 1-2 business days. Our team handles the setup process, including customizing the AI's voice and personality to match your brand.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-[#1e1e1e] text-white p-12 rounded-lg text-center">
                    <h2 className="text-3xl font-bold mb-4">Never Miss Another Call</h2>
                    <p className="mb-8 max-w-2xl mx-auto">Transform your restaurant's phone communications with AI Calling</p>
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