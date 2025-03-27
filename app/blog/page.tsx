"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"

// Dummy blog post data for fallback
const fallbackBlogPosts = [
    {
        id: 1,
        title: "How AI Is Revolutionizing Restaurant Customer Service",
        excerpt: "Discover how artificial intelligence is transforming the way restaurants interact with their customers.",
        content: "Artificial intelligence is transforming the restaurant industry in numerous ways...",
        featuredImage: "/blog-placeholder-1.jpg",
        slug: "ai-revolutionizing-restaurant-customer-service",
        categoryId: "Technology",
        createdAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "5 Strategies to Increase Your Restaurant's Online Orders",
        excerpt: "Learn proven tactics to boost your restaurant's online ordering system performance.",
        content: "With the growing popularity of food delivery apps and online ordering systems...",
        featuredImage: "/blog-placeholder-2.jpg",
        slug: "strategies-increase-restaurant-online-orders",
        categoryId: "Marketing",
        createdAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
    },
    {
        id: 3,
        title: "The Future of Restaurant Digital Marketing in 2024",
        excerpt: "Stay ahead of the competition with these digital marketing trends for restaurants.",
        content: "As we move further into 2024, the digital marketing landscape continues to evolve...",
        featuredImage: "/blog-placeholder-3.jpg",
        slug: "future-restaurant-digital-marketing-2024",
        categoryId: "Marketing",
        createdAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
    }
];

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState(fallbackBlogPosts);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const res = await fetch('/api/blog/posts', {
                    next: { revalidate: 60 } // Cache for 60 seconds
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch blog posts');
                }

                const data = await res.json();
                if (data && data.length > 0) {
                    setBlogPosts(data);
                }
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                // Keep using the fallback posts
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    // Get unique categories and tags for filtering
    const categories = [...new Set(blogPosts.map(post => post.categoryId ? post.categoryId.toString() : 'Uncategorized'))];
    // For tags, we would need to add tags to our schema or extract them from content
    const tags = ['digital marketing', 'social media', 'SEO', 'AI', 'automation', 'customer service'];

    return (
        <div className="bg-[#f8f5eb] min-h-screen">
            <Navbar />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-16">
                {/* Blog Header */}
                <section className="mb-16 text-center">
                    <div className="inline-block bg-orange-100 text-[#e85c2c] px-4 py-1 rounded-full text-sm font-medium mb-4">
                        Resources
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">
                        Restaurant Blog & Resources
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg mb-8">
                        Insights, tips, and trends to help you grow your restaurant business
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
                                placeholder="Search articles..."
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
                    <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Popular Tags:</p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <span key={index} className="text-xs px-3 py-1 bg-white rounded-full border">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#e85c2c]"></div>
                    </div>
                )}

                {/* Blog Posts Grid */}
                {!isLoading && (
                    <section className="mb-12">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.length > 0 ? (
                                blogPosts.map((post) => (
                                    <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                                        <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                                            <div className="relative h-48">
                                                <Image
                                                    src={post.featuredImage || "/placeholder.svg?height=200&width=300"}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute top-4 left-4 bg-[#e85c2c] text-white text-xs font-bold px-3 py-1 rounded-full">
                                                    {post.categoryId ? post.categoryId.toString() : "Uncategorized"}
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                                    <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>5 min read</span>
                                                </div>
                                                <h2 className="text-xl font-bold mb-2 group-hover:text-[#e85c2c] transition-colors duration-300">
                                                    {post.title}
                                                </h2>
                                                <p className="text-gray-600 mb-4">
                                                    {post.excerpt || post.content.substring(0, 120) + '...'}
                                                </p>
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                                                        <Image
                                                            src="/placeholder-user.jpg"
                                                            alt="Author"
                                                            width={32}
                                                            height={32}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium">Author</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-10">
                                    <p className="text-lg text-gray-600">No blog posts found</p>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Pagination - only show if we have posts */}
                {blogPosts.length > 0 && (
                    <section className="flex justify-center">
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
                )}

                {/* Newsletter Sign-up */}
                <section className="mt-20 bg-white p-8 rounded-xl shadow-sm">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
                        <p className="text-gray-600 mb-6">
                            Get the latest industry insights, tips, and updates delivered straight to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow px-4 py-3 rounded-lg border"
                            />
                            <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white py-3">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
} 