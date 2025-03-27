import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LeadGenerationPage() {
    // Sample pricing data - in a real implementation, this would be fetched from database
    const pricingTiers = [
        {
            name: "Basic",
            price: 59,
            leadsPerMonth: 50,
            features: [
                "AI-powered lead generation",
                "Web form integrations",
                "Basic lead qualification",
                "Email notifications",
                "Basic analytics"
            ]
        },
        {
            name: "Pro",
            price: 119,
            leadsPerMonth: 200,
            features: [
                "All Basic features",
                "Advanced lead scoring",
                "CRM integration",
                "Lead nurturing workflows",
                "SMS notifications",
                "Priority support"
            ]
        },
        {
            name: "Enterprise",
            price: "Custom",
            leadsPerMonth: "Unlimited",
            features: [
                "All Pro features",
                "Custom lead capture forms",
                "Advanced segmentation",
                "Multi-location support",
                "API access",
                "Dedicated account manager"
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
                        Lead Generation
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">
                        Grow Your Restaurant's <br /> Customer Base
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg mb-8">
                        Attract high-quality leads and convert them into loyal customers with our AI-powered lead generation system
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
                                <span className="font-medium text-[#e85c2c]">Lead Generation Dashboard</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <select className="text-xs border rounded px-2 py-1">
                                    <option>This Week</option>
                                    <option>This Month</option>
                                    <option>This Year</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500">Total Leads</div>
                                    <div className="text-2xl font-bold">127</div>
                                    <div className="text-xs text-green-600 mt-1">↑ 18% from last week</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500">Conversion Rate</div>
                                    <div className="text-2xl font-bold">21.4%</div>
                                    <div className="text-xs text-green-600 mt-1">↑ 3.2% from last week</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500">Cost per Lead</div>
                                    <div className="text-2xl font-bold">$4.87</div>
                                    <div className="text-xs text-green-600 mt-1">↓ $0.56 from last week</div>
                                </div>
                            </div>

                            <h3 className="font-medium mb-2">Recent Leads (8)</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-50 text-gray-600 text-sm">
                                        <tr>
                                            <th className="py-2 px-3 text-left">Name</th>
                                            <th className="py-2 px-3 text-left">Email</th>
                                            <th className="py-2 px-3 text-left">Phone</th>
                                            <th className="py-2 px-3 text-left">Source</th>
                                            <th className="py-2 px-3 text-left">Status</th>
                                            <th className="py-2 px-3 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-200">
                                        {[
                                            { name: "Jennifer Lee", email: "jennifer@example.com", phone: "(555) 123-4567", source: "Website", status: "New" },
                                            { name: "Michael Brown", email: "michael@example.com", phone: "(555) 234-5678", source: "Facebook", status: "Contacted" },
                                            { name: "Sarah Johnson", email: "sarah@example.com", phone: "(555) 345-6789", source: "Instagram", status: "Interested" },
                                            { name: "David Wilson", email: "david@example.com", phone: "(555) 456-7890", source: "Google", status: "New" },
                                            { name: "Emily Davis", email: "emily@example.com", phone: "(555) 567-8901", source: "Website", status: "New" },
                                        ].map((lead, i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="py-3 px-3">{lead.name}</td>
                                                <td className="py-3 px-3">{lead.email}</td>
                                                <td className="py-3 px-3">{lead.phone}</td>
                                                <td className="py-3 px-3">{lead.source}</td>
                                                <td className="py-3 px-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${lead.status === "New" ? "bg-blue-100 text-blue-800" :
                                                        lead.status === "Contacted" ? "bg-yellow-100 text-yellow-800" :
                                                            "bg-green-100 text-green-800"
                                                        }`}>
                                                        {lead.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-3">
                                                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2">View</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Lead Sources</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Website Form</span>
                                        <span className="text-sm text-gray-500">42%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full">
                                        <div className="bg-[#e85c2c] h-2 rounded-full" style={{ width: "42%" }}></div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Facebook</span>
                                        <span className="text-sm text-gray-500">27%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full">
                                        <div className="bg-[#e85c2c] h-2 rounded-full" style={{ width: "27%" }}></div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Google</span>
                                        <span className="text-sm text-gray-500">18%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full">
                                        <div className="bg-[#e85c2c] h-2 rounded-full" style={{ width: "18%" }}></div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Instagram</span>
                                        <span className="text-sm text-gray-500">13%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full">
                                        <div className="bg-[#e85c2c] h-2 rounded-full" style={{ width: "13%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">How It Works</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Our AI-powered lead generation system helps you attract and convert new customers in four simple steps
                    </p>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="bg-orange-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-[#e85c2c] text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Attract</h3>
                            <p className="text-gray-600">
                                Deploy high-converting lead magnets and landing pages designed specifically for restaurants.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="bg-orange-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-[#e85c2c] text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Capture</h3>
                            <p className="text-gray-600">
                                Collect visitor information through optimized forms integrated across your digital presence.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="bg-orange-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-[#e85c2c] text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Nurture</h3>
                            <p className="text-gray-600">
                                Engage leads with AI-driven personalized email and SMS sequences to build relationships.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="bg-orange-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-[#e85c2c] text-2xl font-bold">4</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Convert</h3>
                            <p className="text-gray-600">
                                Turn leads into customers with targeted offers and promotions based on their preferences.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Key Features</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Our lead generation system is packed with features designed specifically for restaurants
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Multi-channel Lead Capture</h3>
                            <p className="text-gray-600">
                                Collect leads from your website, social media, Google Business Profile, and more—all in one place.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 7h-9"></path>
                                    <path d="M14 17H5"></path>
                                    <circle cx="17" cy="17" r="3"></circle>
                                    <circle cx="7" cy="7" r="3"></circle>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">AI Lead Scoring</h3>
                            <p className="text-gray-600">
                                Automatically prioritize leads based on their likelihood to convert, helping you focus on the most promising opportunities.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                    <line x1="3" x2="21" y1="9" y2="9"></line>
                                    <line x1="9" x2="9" y1="21" y2="9"></line>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Customizable Lead Forms</h3>
                            <p className="text-gray-600">
                                Create beautiful, high-converting lead capture forms tailored to your restaurant's branding and needs.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                            <p className="text-gray-600">
                                Track lead sources, conversion rates, and ROI with detailed analytics to optimize your marketing efforts.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Customer Segmentation</h3>
                            <p className="text-gray-600">
                                Group leads based on preferences, behaviors, and demographics to tailor your marketing messages effectively.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e85c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"></path>
                                    <polyline points="8 10 12 14 16 10"></polyline>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Automated Follow-ups</h3>
                            <p className="text-gray-600">
                                Set up automated email and SMS sequences to nurture leads without requiring manual intervention.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-2">Pricing Plans</h2>
                    <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Choose the right lead generation plan for your restaurant's growth goals
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
                                        Up to {tier.leadsPerMonth} leads per month
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
                        Additional leads are billed at $1.50 per lead. Volume discounts available for annual commitments.
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-[#1e1e1e] text-white p-12 rounded-lg text-center">
                    <h2 className="text-3xl font-bold mb-4">Start Growing Your Customer Base Today</h2>
                    <p className="mb-8 max-w-2xl mx-auto">Join hundreds of restaurants using our lead generation system to attract new customers</p>
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