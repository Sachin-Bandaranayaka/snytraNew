import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ResourcesPage() {
    // Resource categories
    const resourceCategories = [
        {
            id: "guides",
            title: "Guides & Tutorials",
            description: "Step-by-step instructions and comprehensive guides for using our platform effectively.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
            )
        },
        {
            id: "case-studies",
            title: "Case Studies",
            description: "Real-world success stories from restaurants that have implemented our solutions.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M12 18v-6"></path>
                    <path d="M8 18v-1"></path>
                    <path d="M16 18v-3"></path>
                </svg>
            )
        },
        {
            id: "research",
            title: "Industry Research",
            description: "Insights and trends from our analysis of the restaurant and hospitality sector.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"></path>
                    <path d="m12 12 4 10 1.7-4.3L22 16Z"></path>
                </svg>
            )
        },
        {
            id: "webinars",
            title: "Webinars & Videos",
            description: "Recorded sessions and live webinars on industry topics and platform features.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
            )
        },
        {
            id: "templates",
            title: "Templates & Tools",
            description: "Downloadable resources to help streamline your restaurant operations.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>
            )
        },
        {
            id: "faq",
            title: "FAQ",
            description: "Answers to commonly asked questions about our platform and services.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path d="M12 17h.01"></path>
                </svg>
            )
        }
    ];

    // Featured resources
    const featuredResources = [
        {
            title: "Complete Guide to AI-Powered Ordering",
            description: "Learn how to set up and optimize your AI-powered ordering system to maximize efficiency and improve customer satisfaction.",
            image: "/placeholder.svg?height=200&width=350",
            category: "Guides & Tutorials",
            readTime: "15 min read",
            link: "/resources/guides/ai-powered-ordering"
        },
        {
            title: "Case Study: How Johnny's Bistro Increased Revenue by 35%",
            description: "See how a small family-owned restaurant transformed their business using our AI platform.",
            image: "/placeholder.svg?height=200&width=350",
            category: "Case Studies",
            readTime: "10 min read",
            link: "/resources/case-studies/johnnys-bistro"
        },
        {
            title: "2023 Restaurant Technology Trends Report",
            description: "Our comprehensive analysis of the latest technology trends shaping the restaurant industry in 2023 and beyond.",
            image: "/placeholder.svg?height=200&width=350",
            category: "Industry Research",
            readTime: "25 min read",
            link: "/resources/research/technology-trends-2023"
        }
    ];

    // Recent webinars
    const recentWebinars = [
        {
            title: "Mastering Customer Retention with AI",
            description: "Learn strategies to keep customers coming back using data-driven insights and personalized experiences.",
            date: "October 15, 2023",
            duration: "45 minutes",
            image: "/placeholder.svg?height=150&width=250",
            link: "/resources/webinars/customer-retention"
        },
        {
            title: "Optimizing Your Menu for Profitability",
            description: "Discover how to analyze menu performance and make data-driven decisions to increase profitability.",
            date: "September 28, 2023",
            duration: "60 minutes",
            image: "/placeholder.svg?height=150&width=250",
            link: "/resources/webinars/menu-optimization"
        },
        {
            title: "Implementing Contactless Dining Solutions",
            description: "A practical guide to implementing QR code menus, mobile ordering, and contactless payment systems.",
            date: "September 12, 2023",
            duration: "50 minutes",
            image: "/placeholder.svg?height=150&width=250",
            link: "/resources/webinars/contactless-dining"
        }
    ];

    // Downloadable templates
    const downloadableTemplates = [
        {
            title: "Restaurant Financial Forecasting Template",
            description: "A comprehensive Excel template to help you forecast revenue, expenses, and profitability.",
            format: "Excel (.xlsx)",
            size: "1.2 MB",
            link: "#"
        },
        {
            title: "Menu Engineering Worksheet",
            description: "Analyze your menu items' popularity and profitability to optimize your offerings.",
            format: "Excel (.xlsx)",
            size: "0.9 MB",
            link: "#"
        },
        {
            title: "Staff Scheduling Template",
            description: "Streamline your staff scheduling process with this easy-to-use template.",
            format: "Excel (.xlsx)",
            size: "0.8 MB",
            link: "#"
        },
        {
            title: "Restaurant Marketing Calendar",
            description: "Plan your marketing activities throughout the year with this strategic calendar template.",
            format: "PDF & Excel",
            size: "1.5 MB",
            link: "#"
        }
    ];

    return (
        <div className="bg-[#f8f5eb] min-h-screen">
            <Navbar />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-16">
                {/* Breadcrumbs */}
                <div className="mb-8">
                    <div className="flex items-center text-sm">
                        <Link href="/" className="text-gray-600 hover:text-[#e85c2c]">
                            Home
                        </Link>
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
                            className="mx-2"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        <span className="text-[#e85c2c]">Resources</span>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Resource Center</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Explore our collection of guides, templates, research, and more to help you optimize your restaurant operations and grow your business.
                    </p>
                </div>

                {/* Resource Categories */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {resourceCategories.map((category) => (
                            <Link
                                href={`/resources/${category.id}`}
                                key={category.id}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                            >
                                <div className="text-[#e85c2c] mb-4">{category.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                                <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
                                <div className="flex items-center text-[#e85c2c] font-medium">
                                    Explore
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
                                        className="ml-1"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="m12 5 7 7-7 7"></path>
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Featured Resources */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Featured Resources</h2>
                        <Link href="/resources/featured" className="text-[#e85c2c] hover:underline font-medium flex items-center">
                            View all
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
                                className="ml-1"
                            >
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredResources.map((resource, index) => (
                            <Link
                                href={resource.link}
                                key={index}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                            >
                                <div className="relative w-full h-48">
                                    <Image
                                        src={resource.image}
                                        alt={resource.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center mb-2">
                                        <span className="text-xs font-medium bg-orange-100 text-[#e85c2c] px-2 py-1 rounded-full">{resource.category}</span>
                                        <span className="text-xs text-gray-500 ml-2">{resource.readTime}</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                                    <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
                                    <div className="text-[#e85c2c] font-medium text-sm">Read more</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Webinars */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Recent Webinars</h2>
                        <Link href="/resources/webinars" className="text-[#e85c2c] hover:underline font-medium flex items-center">
                            View all
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
                                className="ml-1"
                            >
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentWebinars.map((webinar, index) => (
                            <Link
                                href={webinar.link}
                                key={index}
                                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                            >
                                <div className="relative w-full h-36 mb-4 rounded-lg overflow-hidden">
                                    <Image
                                        src={webinar.image}
                                        alt={webinar.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 24 24"
                                            fill="white"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="opacity-80"
                                        >
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polygon points="10 8 16 12 10 16 10 8" fill="white"></polygon>
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center text-xs text-gray-500 mb-2">
                                        <span>{webinar.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>{webinar.duration}</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{webinar.title}</h3>
                                    <p className="text-gray-600 text-sm">{webinar.description}</p>
                                </div>
                                <div className="mt-4 text-[#e85c2c] font-medium text-sm">Watch webinar</div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Downloadable Templates */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-8">Free Templates & Tools</h2>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <p className="text-gray-600 mb-6">
                            Download these free resources to help streamline your restaurant operations and improve efficiency.
                        </p>
                        <div className="divide-y">
                            {downloadableTemplates.map((template, index) => (
                                <div key={index} className="py-4 flex items-center justify-between">
                                    <div className="flex-grow pr-4">
                                        <h3 className="font-bold mb-1">{template.title}</h3>
                                        <p className="text-sm text-gray-600">{template.description}</p>
                                        <div className="flex items-center mt-2 text-xs text-gray-500">
                                            <span className="bg-gray-100 px-2 py-1 rounded">{template.format}</span>
                                            <span className="ml-2">{template.size}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" asChild className="flex-shrink-0">
                                        <a href={template.link} download>
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
                                                className="mr-2"
                                            >
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Newsletter Sign-up */}
                <div className="bg-[#1e1e1e] text-white p-8 rounded-xl mb-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-2">Stay Updated with Restaurant Industry Insights</h2>
                        <p className="text-gray-300 mb-6">
                            Subscribe to our newsletter to receive the latest resources, trends, and tips delivered straight to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white"
                            />
                            <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white py-3">
                                Subscribe
                            </Button>
                        </div>
                        <p className="text-xs text-gray-400 mt-3">
                            By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
                        </p>
                    </div>
                </div>

                {/* Help Section */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Our support team is here to help. Contact us and we'll point you to the right resources or answer your questions directly.
                    </p>
                    <Link href="/contact">
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white">
                            Contact Support
                        </Button>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    )
} 