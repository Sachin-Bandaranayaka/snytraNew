import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function NewsDetailPage({ params }: { params: { id: string } }) {
    // Sample news items - in a real implementation, these would be fetched from a database
    const newsItems = [
        {
            id: "1",
            title: "Restaurant AI Platform Raises $5M in Series A Funding",
            excerpt: "Leading restaurant technology company secures major investment to accelerate growth and product development.",
            content: `
        <p>Restaurant AI Platform, a leading provider of artificial intelligence solutions for the restaurant industry, today announced it has secured $5 million in Series A funding led by Tech Ventures Capital with participation from Food Innovation Fund and several strategic angel investors.</p>
        
        <p>The funding will be used to accelerate product development and expand the company's market presence in North America and Europe. Specifically, the company plans to enhance its AI-powered ordering system, develop new features for its customer service automation platform, and strengthen its sales and marketing efforts.</p>
        
        <p>"This investment represents a significant milestone in our journey to revolutionize the restaurant industry through AI technology," said John Smith, CEO of Restaurant AI Platform. "We're excited to partner with Tech Ventures Capital and our other investors to bring our innovative solutions to more restaurants around the world."</p>
        
        <p>Restaurant AI Platform has experienced rapid growth since its founding in 2020, with its customer base expanding by 300% in the past year alone. The company's solutions are currently used by over 1,000 restaurants across the United States and Canada.</p>
        
        <p>"We believe Restaurant AI Platform is at the forefront of transforming how restaurants operate and engage with their customers," said Sarah Johnson, Partner at Tech Ventures Capital. "Their technology addresses critical challenges in the industry, such as labor shortages and rising operational costs, while enhancing the customer experience. We're thrilled to support their vision and growth."</p>
        
        <p>The company will also use the funding to double its team size over the next 12 months, with a focus on hiring engineers, data scientists, and customer success specialists.</p>
        
        <p>For more information about Restaurant AI Platform and its solutions, visit <a href="https://www.restaurantaiplatform.com">www.restaurantaiplatform.com</a>.</p>
        
        <h2>About Restaurant AI Platform</h2>
        
        <p>Restaurant AI Platform provides artificial intelligence solutions that help restaurants streamline operations, enhance customer experiences, and increase revenue. Its flagship products include an AI-powered online ordering system, intelligent chatbots for customer service, and predictive analytics tools for business optimization. Founded in 2020, the company is headquartered in San Francisco with additional offices in New York and Toronto.</p>
        
        <h2>About Tech Ventures Capital</h2>
        
        <p>Tech Ventures Capital is a leading venture capital firm focused on early-stage investments in technology companies. With over $500 million under management, the firm has backed numerous successful startups in the foodtech, fintech, and AI sectors. Tech Ventures Capital provides not only financial support but also strategic guidance and access to its extensive network of industry connections.</p>
        
        <h2>About Food Innovation Fund</h2>
        
        <p>Food Innovation Fund is a specialized investment firm dedicated to supporting disruptive technologies in the food and restaurant industry. The fund invests in companies that are using technology to transform how food is produced, distributed, and consumed. Since its inception in 2018, Food Innovation Fund has invested in over 30 companies across the food technology ecosystem.</p>
      `,
            date: "March 10, 2023",
            category: "Company News",
            image: "/placeholder.svg?height=600&width=1200"
        },
        {
            id: "2",
            title: "New Partnership Announced with Global Restaurant Chain",
            excerpt: "Restaurant AI Platform partners with international restaurant group to deploy AI-powered ordering system across 500+ locations.",
            content: `
        <p>Restaurant AI Platform has announced a strategic partnership with Global Restaurant Group, which operates over 500 restaurants across 15 countries. The partnership will see Restaurant AI Platform's online ordering system and AI-powered customer service solutions deployed across all Global Restaurant Group locations over the next 18 months.</p>
        
        <p>The implementation will begin with a pilot program in 50 locations across the United States, Canada, and the UK, before expanding to all Global Restaurant Group establishments by the end of 2024. This marks one of the largest deployments of AI technology in the restaurant industry to date.</p>
        
        <p>"We're thrilled to partner with Global Restaurant Group on this transformative initiative," said John Smith, CEO of Restaurant AI Platform. "This collaboration represents a significant validation of our technology and its ability to deliver value at scale. We're excited to help Global Restaurant Group enhance its operational efficiency and customer experience across its global footprint."</p>
        
        <p>Global Restaurant Group, known for its diverse portfolio of casual dining and quick-service restaurant brands, has been seeking innovative solutions to standardize its digital ordering experience and improve customer engagement. After a comprehensive evaluation of available technologies, the company selected Restaurant AI Platform for its advanced AI capabilities, seamless integration with existing systems, and proven track record of success.</p>
        
        <p>"In today's competitive landscape, delivering an exceptional digital experience is as important as the quality of our food," said Robert Johnson, Chief Digital Officer at Global Restaurant Group. "Restaurant AI Platform's solution gives us the ability to offer personalized, efficient service at scale, while also providing valuable insights that will help us continuously improve our offerings. We're excited about the positive impact this partnership will have on our customers and our business."</p>
        
        <p>The implementation will include Restaurant AI Platform's full suite of solutions, including its online ordering system, AI-powered chatbots for customer service, and analytics dashboard for business intelligence. The technology will be integrated with Global Restaurant Group's existing point-of-sale systems, loyalty programs, and kitchen display systems.</p>
        
        <p>For more information about Restaurant AI Platform and its solutions, visit <a href="https://www.restaurantaiplatform.com">www.restaurantaiplatform.com</a>.</p>
      `,
            date: "February 22, 2023",
            category: "Partnerships",
            image: "/placeholder.svg?height=600&width=1200"
        }
    ];

    // Find the requested news item
    const newsItem = newsItems.find(item => item.id === params.id) || newsItems[0];

    // Get other news items for "More News" section
    const otherNews = newsItems.filter(item => item.id !== params.id).slice(0, 3);

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
                        <Link href="/news" className="text-gray-600 hover:text-[#e85c2c]">
                            News
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
                        <span className="text-[#e85c2c]">{newsItem.title}</span>
                    </div>
                </div>

                {/* News Header */}
                <div className="mb-8">
                    <div className="inline-block bg-orange-100 text-[#e85c2c] px-4 py-1 rounded-full text-sm font-medium mb-4">
                        {newsItem.category}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {newsItem.title}
                    </h1>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <span>{newsItem.date}</span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="mb-12 relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                    <Image
                        src={newsItem.image}
                        alt={newsItem.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* News Content and Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* News Content */}
                    <div className="lg:col-span-3">
                        <div
                            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-a:text-[#e85c2c] prose-a:no-underline hover:prose-a:underline"
                            dangerouslySetInnerHTML={{ __html: newsItem.content }}
                        />

                        {/* Share Buttons */}
                        <div className="mt-12 mb-12">
                            <p className="text-sm font-medium mb-2">Share this news:</p>
                            <div className="flex items-center space-x-3">
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="#1877F2"
                                        stroke="#1877F2"
                                        strokeWidth="0"
                                    >
                                        <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                                    </svg>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="#1DA1F2"
                                        stroke="#1DA1F2"
                                        strokeWidth="0"
                                    >
                                        <path d="M22 5.89998C21.2483 6.21998 20.4534 6.42998 19.64 6.52998C20.4982 6.02998 21.1413 5.21998 21.45 4.24998C20.6436 4.74285 19.7608 5.08276 18.84 5.26001C18.2238 4.61395 17.4057 4.18661 16.5133 4.06163C15.6209 3.93665 14.7093 4.12262 13.9318 4.58752C13.1543 5.05243 12.5545 5.76965 12.2353 6.62801C11.9162 7.48638 11.8957 8.43469 12.18 9.30776C9.25 9.15998 6.634 7.58998 4.934 5.27998C4.36539 6.22676 4.20195 7.35276 4.48893 8.4048C4.77592 9.45683 5.48677 10.3291 6.424 10.8C5.77822 10.7817 5.14883 10.6005 4.6 10.2728V10.3244C4.60023 11.3074 4.94337 12.257 5.5649 13.0056C6.18643 13.7541 7.0459 14.2517 8 14.4144C7.40563 14.5832 6.78037 14.6067 6.174 14.4828C6.43307 15.3202 6.96879 16.047 7.69936 16.5636C8.42993 17.0801 9.31489 17.3624 10.22 17.3744C8.73691 18.5489 6.91035 19.1821 5.028 19.18C4.71441 19.1762 4.40126 19.157 4.09 19.1224C6.00162 20.3679 8.24015 21.0246 10.526 21.02C13.5386 21.0457 16.4412 19.8258 18.5682 17.6918C20.6951 15.5578 21.847 12.6462 21.821 9.63395C21.821 9.46678 21.815 9.28998 21.808 9.11998C22.6166 8.54906 23.3184 7.8365 23.88 7.01998C23.1281 7.33998 22.3282 7.54998 21.516 7.64998L22 5.89998Z"></path>
                                    </svg>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="#0A66C2"
                                        stroke="#0A66C2"
                                        strokeWidth="0"
                                    >
                                        <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"></path>
                                        <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"></path>
                                        <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18C16 18.5523 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"></path>
                                    </svg>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
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
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            {/* Press Contact */}
                            <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold mb-4">Press Contact</h3>
                                <div className="flex items-center mb-3">
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
                                <div className="flex items-center mb-4">
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
                                <Button className="w-full bg-[#e85c2c] hover:bg-[#d04a1d] text-white">
                                    Download Press Kit
                                </Button>
                            </div>

                            {/* Recent News */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-4">Recent News</h3>
                                <div className="space-y-4">
                                    {otherNews.map((news) => (
                                        <Link href={`/news/${news.id}`} key={news.id} className="block group">
                                            <div className="flex items-start">
                                                <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={news.image}
                                                        alt={news.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <h4 className="text-sm font-medium group-hover:text-[#e85c2c]">
                                                        {news.title}
                                                    </h4>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {news.date}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="p-6 bg-white rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold mb-2">Subscribe to Updates</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Get the latest news and announcements delivered to your inbox.
                                </p>
                                <div className="space-y-2">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full px-3 py-2 rounded-lg border text-sm"
                                    />
                                    <Button className="w-full bg-[#e85c2c] hover:bg-[#d04a1d] text-white">
                                        Subscribe
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More News Section */}
                <section className="mt-20">
                    <h2 className="text-2xl font-bold mb-8">More News</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {otherNews.map((news) => (
                            <Link href={`/news/${news.id}`} key={news.id} className="group">
                                <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full transition-transform duration-300 group-hover:-translate-y-1 flex flex-col">
                                    <div className="relative h-48">
                                        <Image
                                            src={news.image}
                                            alt={news.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#e85c2c] text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {news.category}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="text-sm text-gray-500 mb-2">
                                            {news.date}
                                        </div>
                                        <h2 className="text-xl font-bold mb-2 group-hover:text-[#e85c2c] transition-colors duration-300">
                                            {news.title}
                                        </h2>
                                        <p className="text-gray-600 mb-4 flex-grow">
                                            {news.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
} 