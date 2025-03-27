import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function BlogPostPage({ params }: { params: { id: string } }) {
    // In a real application, you would fetch this data from an API or database
    // Here we're using a hardcoded post for demonstration
    const post = {
        id: params.id,
        title: "How AI is Revolutionizing Customer Service in Restaurants",
        excerpt: "Learn how artificial intelligence is transforming the way restaurants interact with their customers.",
        content: `
      <p>In recent years, artificial intelligence has emerged as a game-changer in the restaurant industry, particularly in the realm of customer service. From automating routine tasks to providing personalized customer experiences, AI technologies are helping restaurants enhance operational efficiency while delivering superior service.</p>
      
      <h2>The Rise of AI-Powered Customer Service</h2>
      
      <p>As consumer expectations continue to evolve, restaurants face mounting pressure to provide quick, personalized, and frictionless service experiences. This is where AI steps in, offering innovative solutions to age-old customer service challenges.</p>
      
      <p>AI-powered systems can handle a multitude of customer interactions simultaneously, ensuring that no query goes unanswered and no customer feels neglected. Whether it's making reservations, answering frequently asked questions, or processing orders, AI can handle these tasks with remarkable efficiency and accuracy.</p>
      
      <h2>Key Applications of AI in Restaurant Customer Service</h2>
      
      <h3>1. Automated Ordering Systems</h3>
      
      <p>AI-driven ordering systems are becoming increasingly sophisticated, capable of understanding complex orders and preferences. These systems can process orders through various channels, including voice commands, text messages, and chat interfaces, providing customers with multiple convenient options to place their orders.</p>
      
      <h3>2. Personalized Recommendations</h3>
      
      <p>By analyzing customer data, AI can offer personalized menu recommendations based on previous orders, dietary preferences, and even current weather conditions. This level of personalization not only enhances the customer experience but also presents opportunities for upselling and cross-selling.</p>
      
      <h3>3. Intelligent Chatbots</h3>
      
      <p>AI-powered chatbots can handle customer inquiries 24/7, providing instant responses to common questions about menu items, operating hours, reservation policies, and more. Advanced chatbots can even understand context and sentiment, allowing them to provide more nuanced and helpful responses.</p>
      
      <h2>Benefits for Restaurants</h2>
      
      <p>The integration of AI in customer service offers numerous benefits for restaurants:</p>
      
      <ul>
        <li><strong>Reduced Operational Costs:</strong> By automating routine tasks, restaurants can optimize staff allocation and reduce labor costs.</li>
        <li><strong>Improved Efficiency:</strong> AI systems can handle multiple customer interactions simultaneously, reducing wait times and enhancing service speed.</li>
        <li><strong>Enhanced Customer Satisfaction:</strong> Personalized experiences and prompt service lead to higher customer satisfaction and loyalty.</li>
        <li><strong>Valuable Insights:</strong> AI systems collect and analyze customer data, providing restaurants with actionable insights to improve their offerings and service.</li>
      </ul>
      
      <h2>Real-World Success Stories</h2>
      
      <p>Many restaurants have already embraced AI-powered customer service with impressive results. For instance, [Restaurant Name] reported a 30% increase in online orders after implementing an AI ordering system, while [Another Restaurant] saw their customer satisfaction scores improve by 25% following the introduction of an AI chatbot.</p>
      
      <h2>The Future of AI in Restaurant Customer Service</h2>
      
      <p>As AI technology continues to evolve, we can expect even more innovative applications in restaurant customer service. From emotion recognition to predictive analytics, the possibilities are vast and exciting.</p>
      
      <p>However, it's important to note that AI should complement, not replace, human service. The warmth, empathy, and personal touch that human staff provide remain irreplaceable aspects of the dining experience. The most successful restaurants will be those that strike the right balance between AI efficiency and human connection.</p>
      
      <h2>Conclusion</h2>
      
      <p>AI is undoubtedly revolutionizing customer service in the restaurant industry, offering unprecedented opportunities to enhance efficiency, personalization, and customer satisfaction. As the technology matures and becomes more accessible, restaurants of all sizes can leverage AI to elevate their customer service and stay competitive in an increasingly digital marketplace.</p>
    `,
        author: "Michael Chen",
        authorTitle: "AI & Technology Specialist",
        authorBio: "Michael Chen is a technology consultant specializing in AI applications for the restaurant and hospitality industry. With over 10 years of experience, he has helped numerous businesses implement innovative tech solutions.",
        authorImage: "/placeholder-user.jpg",
        date: "February 12, 2023",
        category: "Technology",
        tags: ["AI", "customer service", "automation"],
        image: "/placeholder.svg?height=600&width=1200",
        readTime: "5 min read"
    };

    // Sample related posts
    const relatedPosts = [
        {
            id: 2,
            title: "The Future of Restaurant Technology in 2023",
            excerpt: "Explore the latest technological innovations shaping the restaurant industry this year.",
            author: "David Johnson",
            date: "February 28, 2023",
            image: "/placeholder.svg?height=200&width=300",
            readTime: "8 min read"
        },
        {
            id: 4,
            title: "Effective Strategies for Managing Online Orders",
            excerpt: "Master the art of efficiently handling online orders to maximize customer satisfaction and revenue.",
            author: "Sarah Williams",
            date: "January 25, 2023",
            image: "/placeholder.svg?height=200&width=300",
            readTime: "7 min read"
        },
        {
            id: 6,
            title: "The Impact of WhatsApp Business on Restaurant Communication",
            excerpt: "Explore how WhatsApp Business is changing the way restaurants communicate with their customers.",
            author: "Lisa Johnson",
            date: "December 15, 2022",
            image: "/placeholder.svg?height=200&width=300",
            readTime: "4 min read"
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
                        <Link href="/blog" className="text-gray-600 hover:text-[#e85c2c]">
                            Blog
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
                        <span className="text-[#e85c2c]">{post.title}</span>
                    </div>
                </div>

                {/* Post Header */}
                <div className="mb-8">
                    <div className="inline-block bg-orange-100 text-[#e85c2c] px-4 py-1 rounded-full text-sm font-medium mb-4">
                        {post.category}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h1>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="mb-12 relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Post Content and Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Post Content */}
                    <div className="lg:col-span-3">
                        <div
                            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-a:text-[#e85c2c] prose-a:no-underline hover:prose-a:underline"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Tags */}
                        <div className="mt-12 mb-8">
                            <p className="text-sm font-medium mb-2">Tags:</p>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="text-xs px-3 py-1 bg-white rounded-full border">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Author Bio */}
                        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm">
                            <div className="flex items-start">
                                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src={post.authorImage}
                                        alt={post.author}
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{post.author}</h3>
                                    <p className="text-[#e85c2c] text-sm mb-2">{post.authorTitle}</p>
                                    <p className="text-gray-600 text-sm">{post.authorBio}</p>
                                </div>
                            </div>
                        </div>

                        {/* Share Buttons */}
                        <div className="mt-8 mb-12">
                            <p className="text-sm font-medium mb-2">Share this article:</p>
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
                            {/* Related Posts */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-4">Related Posts</h3>
                                <div className="space-y-4">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id} className="block group">
                                            <div className="flex items-start">
                                                <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={relatedPost.image}
                                                        alt={relatedPost.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <h4 className="text-sm font-medium group-hover:text-[#e85c2c]">
                                                        {relatedPost.title}
                                                    </h4>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {relatedPost.date}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Popular Tags */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-xs px-3 py-1 bg-white rounded-full border hover:bg-gray-50 cursor-pointer"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    <span className="text-xs px-3 py-1 bg-white rounded-full border hover:bg-gray-50 cursor-pointer">
                                        Restaurant
                                    </span>
                                    <span className="text-xs px-3 py-1 bg-white rounded-full border hover:bg-gray-50 cursor-pointer">
                                        Digital Marketing
                                    </span>
                                    <span className="text-xs px-3 py-1 bg-white rounded-full border hover:bg-gray-50 cursor-pointer">
                                        Technology
                                    </span>
                                    <span className="text-xs px-3 py-1 bg-white rounded-full border hover:bg-gray-50 cursor-pointer">
                                        Food Service
                                    </span>
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="p-6 bg-white rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold mb-2">Subscribe to Our Newsletter</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Get the latest industry insights, tips, and updates delivered straight to your inbox.
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

                {/* More Articles Section */}
                <section className="mt-20">
                    <h2 className="text-2xl font-bold mb-8">More Articles</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {relatedPosts.map((post) => (
                            <Link href={`/blog/${post.id}`} key={post.id} className="group">
                                <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                                    <div className="relative h-48">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 mb-2">
                                            <span>{post.date}</span>
                                            <span className="mx-2">•</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h2 className="text-xl font-bold mb-2 group-hover:text-[#e85c2c] transition-colors duration-300">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 mb-4">
                                            {post.excerpt}
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