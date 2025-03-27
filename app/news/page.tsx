import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function NewsPage() {
    // Sample news data - in a real implementation, this would be fetched from database
    const newsItems = [
        {
            id: 1,
            title: "Restaurant AI Platform Raises $5M in Series A Funding",
            excerpt: "Leading restaurant technology company secures major investment to accelerate growth and product development.",
            content: "Restaurant AI Platform, a leading provider of artificial intelligence solutions for the restaurant industry, today announced it has secured $5 million in Series A funding led by Tech Ventures Capital with participation from Food Innovation Fund and several strategic angel investors. The funding will be used to accelerate product development and expand the company's market presence.",
            date: "March 10, 2023",
            category: "Company News",
            image: "/placeholder.svg?height=400&width=600"
        },
        {
            id: 2,
            title: "New Partnership Announced with Global Restaurant Chain",
            excerpt: "Restaurant AI Platform partners with international restaurant group to deploy AI-powered ordering system across 500+ locations.",
            content: "Restaurant AI Platform has announced a strategic partnership with Global Restaurant Group, which operates over 500 restaurants across 15 countries. The partnership will see Restaurant AI Platform's online ordering system and AI-powered customer service solutions deployed across all Global Restaurant Group locations over the next 18 months.",
            date: "February 22, 2023",
            category: "Partnerships",
            image: "/placeholder.svg?height=400&width=600"
        },
        {
            id: 3,
            title: "Restaurant AI Platform Named 'Top Food Tech Innovation of 2023'",
            excerpt: "Industry recognition for revolutionary AI technology that's transforming the restaurant experience.",
            content: "Restaurant AI Platform has been named 'Top Food Tech Innovation of 2023' by Restaurant Technology Magazine in its annual awards. The company was recognized for its groundbreaking AI-powered ordering and customer service solutions that have demonstrated significant improvements in operational efficiency and customer satisfaction for restaurant operators.",
            date: "February 5, 2023",
            category: "Awards",
            image: "/placeholder.svg?height=400&width=600"
        },
        {
            id: 4,
            title: "Restaurant AI Platform Launches New WhatsApp Integration",
            excerpt: "New feature allows restaurants to automate customer communications through popular messaging platform.",
            content: "Restaurant AI Platform today announced the launch of its new WhatsApp integration, allowing restaurants to automate customer communications through the popular messaging platform. The new feature enables restaurants to confirm reservations, send order updates, collect feedback, and answer common customer queries automatically through WhatsApp, providing a seamless experience for both restaurant operators and their customers.",
            date: "January 18, 2023",
            category: "Product Updates",
            image: "/placeholder.svg?height=400&width=600"
        },
        {
            id: 5,
            title: "Restaurant AI Platform Expands Operations to European Market",
            excerpt: "Company announces new office in London to support growing European customer base.",
            content: "Restaurant AI Platform today announced the opening of its first European office in London, UK. The expansion comes in response to growing demand for the company's AI-powered restaurant solutions in the European market. The new office will serve as a hub for sales, customer support, and business development activities across Europe.",
            date: "December 10, 2022",
            category: "Company News",
            image: "/placeholder.svg?height=400&width=600"
        },
        {
            id: 6,
            title: "Restaurant AI Platform Achieves SOC 2 Type II Compliance",
            excerpt: "Certification confirms company's commitment to data security and privacy standards.",
            content: "Restaurant AI Platform today announced it has successfully completed the Service Organization Control (SOC) 2 Type II audit, demonstrating the company's commitment to data security and privacy. The certification verifies that Restaurant AI Platform's information security practices, policies, procedures, and operations meet the SOC 2 standards for security, availability, and confidentiality.",
            date: "November 25, 2022",
            category: "Security",
            image: "/placeholder.svg?height=400&width=600"
        }
    ];

    // Get unique categories for filtering
    const categories = [...new Set(newsItems.map(item => item.category))];

    return (
        <div className="bg-[#f8f5eb] min-h-screen">
            <Navbar />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-16">
                {/* News Header */}
                <section className="mb-16 text-center">
                    <div className="inline-block bg-orange-100 text-[#e85c2c] px-4 py-1 rounded-full text-sm font-medium mb-4">
                        Latest Updates
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">
                        News & Press Releases
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg mb-8">
                        Stay updated with the latest announcements, partnerships, and achievements
                    </p>
                </section>

                {/* Filters */}
                <section className="mb-12">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" className="bg-white">
                                All
                            </Button>
                            {categories.map((category, index) => (
                                <Button key={index} variant="outline" className="bg-white">
                                    {category}
                                </Button>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search news..."
                                className="pl-10 pr-4 py-2 border rounded-lg bg-white w-full md:w-64"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Featured News */}
                <section className="mb-16">
                    <Link href={`/news/${newsItems[0].id}`} className="group block">
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="relative h-64 md:h-full">
                                    <Image
                                        src={newsItems[0].image}
                                        alt={newsItems[0].title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <div className="inline-block bg-orange-100 text-[#e85c2c] px-3 py-1 rounded-full text-xs font-medium mb-4">
                                        {newsItems[0].category}
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4 group-hover:text-[#e85c2c] transition-colors duration-300">
                                        {newsItems[0].title}
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        {newsItems[0].excerpt}
                                    </p>
                                    <div className="text-sm text-gray-500 mb-6">
                                        {newsItems[0].date}
                                    </div>
                                    <Button className="self-start bg-[#e85c2c] hover:bg-[#d04a1d] text-white">
                                        Read More
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>

                {/* News Grid */}
                <section className="mb-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsItems.slice(1).map((item) => (
                            <Link href={`/news/${item.id}`} key={item.id} className="group">
                                <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full transition-transform duration-300 group-hover:-translate-y-1 flex flex-col">
                                    <div className="relative h-48">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#e85c2c] text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {item.category}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="text-sm text-gray-500 mb-2">
                                            {item.date}
                                        </div>
                                        <h2 className="text-xl font-bold mb-2 group-hover:text-[#e85c2c] transition-colors duration-300">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-600 mb-4 flex-grow">
                                            {item.excerpt}
                                        </p>
                                        <div className="text-[#e85c2c] font-medium text-sm inline-flex items-center">
                                            Read More
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
                                                className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                                            >
                                                <path d="M5 12h14"></path>
                                                <path d="m12 5 7 7-7 7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Pagination */}
                <section className="flex justify-center mb-12">
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" className="bg-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </Button>
                        <Button variant="outline" className="bg-[#e85c2c] text-white">
                            1
                        </Button>
                        <Button variant="outline" className="bg-white">
                            2
                        </Button>
                        <Button variant="outline" className="bg-white">
                            3
                        </Button>
                        <Button variant="outline" size="icon" className="bg-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </Button>
                    </div>
                </section>

                {/* Press Contact */}
                <section className="mt-20 bg-white p-8 rounded-xl shadow-sm">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-center">Press Contact</h2>
                        <p className="text-gray-600 mb-6 text-center">
                            For press inquiries, please contact our media relations team.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-medium mb-2">Media Relations</h3>
                                <div className="flex items-center mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#e85c2c"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-2"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                    <span>(123) 456-7890</span>
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#e85c2c"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-2"
                                    >
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                    <span>press@restaurantai.com</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-medium mb-2">Press Kit</h3>
                                <p className="text-gray-600 mb-4">
                                    Download our press kit for logos, product images, and company information.
                                </p>
                                <Button className="w-full bg-[#e85c2c] hover:bg-[#d04a1d] text-white">
                                    Download Press Kit
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
} 