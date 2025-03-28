import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { db } from "@/lib/db"
import { faqCategories, faqItems } from "@/lib/schema"
import { eq } from "drizzle-orm"

export default async function FAQPage() {
    // Fetch FAQ categories and items from the database
    const categories = await db.select().from(faqCategories)
        .where(eq(faqCategories.isActive, true))
        .orderBy(faqCategories.order);

    // For each category, fetch the FAQ items
    const categoriesWithItems = await Promise.all(
        categories.map(async (category) => {
            const items = await db.select().from(faqItems)
                .where(eq(faqItems.categoryId, category.id))
                .where(eq(faqItems.isActive, true))
                .orderBy(faqItems.order);

            return {
                ...category,
                questions: items.map(item => ({
                    id: `faq-${item.id}`,
                    question: item.question,
                    answer: item.answer
                }))
            };
        })
    );

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
                        <span className="text-[#e85c2c]">Frequently Asked Questions</span>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Find answers to common questions about Restaurant AI Platform. If you can't find what you're looking for, please contact our support team.
                    </p>
                </div>

                {/* Question Search */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="search"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-[#e85c2c] focus:border-[#e85c2c] outline-none"
                            placeholder="Search for questions..."
                            required
                        />
                    </div>
                </div>

                {/* FAQ Categories */}
                <div className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {categoriesWithItems.map((category, index) => (
                            <a
                                key={index}
                                href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                            >
                                <h3 className="font-bold text-[#e85c2c]">{category.title}</h3>
                                <p className="text-sm text-gray-600">{category.questions.length} questions</p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* FAQ Sections */}
                <div className="space-y-12">
                    {categoriesWithItems.map((category, index) => (
                        <div key={index} className="mb-12" id={category.title.toLowerCase().replace(/\s+/g, '-')}>
                            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{category.title}</h2>
                            <Accordion type="single" collapsible className="space-y-4">
                                {category.questions.map((faq) => (
                                    <AccordionItem key={faq.id} value={faq.id} className="bg-white rounded-lg p-2">
                                        <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-[#e85c2c] px-4">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="px-4 pb-4 text-gray-600">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm text-center mt-16">
                    <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-gray-600 mb-6">
                        If you couldn't find the answer to your question, please contact our support team.
                    </p>
                    <Link href="/contact" className="bg-[#e85c2c] text-white px-6 py-3 rounded-md font-medium hover:bg-[#d84c1b] transition-colors">
                        Contact Support
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
} 