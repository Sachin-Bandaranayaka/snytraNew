import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
    // FAQ categories and questions
    const faqCategories = [
        {
            title: "General Questions",
            questions: [
                {
                    id: "general-1",
                    question: "What is Restaurant AI Platform?",
                    answer: "Restaurant AI Platform is a comprehensive solution designed specifically for restaurants to streamline operations, enhance customer engagement, and increase revenue. Our platform offers AI-powered tools for online ordering, reservations, customer communication, marketing, and business intelligence."
                },
                {
                    id: "general-2",
                    question: "How can Restaurant AI Platform benefit my restaurant?",
                    answer: "Our platform can help increase your revenue by automating order taking, improving customer engagement, reducing operational costs, minimizing errors, and providing valuable insights to optimize your business. Many of our clients report 15-30% increases in order values and significant reductions in operational costs."
                },
                {
                    id: "general-3",
                    question: "Is Restaurant AI Platform suitable for all types of restaurants?",
                    answer: "Yes! Our platform is designed to be flexible and can be customized for various types of food service businesses, including quick-service restaurants, casual dining, fine dining, cafes, bakeries, ghost kitchens, and food trucks. We offer different plans to accommodate businesses of all sizes."
                },
                {
                    id: "general-4",
                    question: "What makes Restaurant AI Platform different from other restaurant software?",
                    answer: "Our platform stands out through its integrated AI capabilities, specifically designed for the restaurant industry. Unlike general-purpose solutions, we understand restaurant-specific challenges and offer tailored tools that can understand food orders, manage reservations intelligently, and engage customers in natural language through various channels."
                }
            ]
        },
        {
            title: "Getting Started",
            questions: [
                {
                    id: "start-1",
                    question: "How do I sign up for Restaurant AI Platform?",
                    answer: "Signing up is easy! Simply click the 'Sign Up' button at the top of our website and follow the guided process. You'll need to provide basic information about your restaurant and select a subscription plan. Alternatively, you can contact our sales team for a personalized onboarding experience."
                },
                {
                    id: "start-2",
                    question: "Is there a free trial available?",
                    answer: "Yes, we offer a 14-day free trial for new customers to explore our platform and see the benefits firsthand. The trial includes access to most features with reasonable usage limits. No credit card is required to start your trial."
                },
                {
                    id: "start-3",
                    question: "How long does it take to set up Restaurant AI Platform?",
                    answer: "Basic setup can be completed in as little as 24-48 hours. For more complex integrations or custom requirements, it may take 3-5 business days. Our customer success team will work closely with you to ensure a smooth transition and proper configuration of all features."
                },
                {
                    id: "start-4",
                    question: "Will I need to install any hardware or software?",
                    answer: "Restaurant AI Platform is a cloud-based solution, so there's no need to install any special software or hardware. You can access it from any device with an internet connection. For certain features like POS integration, minimal configuration may be required with your existing systems."
                }
            ]
        },
        {
            title: "Features & Services",
            questions: [
                {
                    id: "features-1",
                    question: "What is AI Calling and how does it work?",
                    answer: "AI Calling is our intelligent phone system that can automatically take orders, answer common questions, and manage reservations over the phone. It uses advanced speech recognition and natural language processing to understand customer requests and provide human-like interactions, freeing up your staff for other important tasks."
                },
                {
                    id: "features-2",
                    question: "How does the Online Ordering System work?",
                    answer: "Our Online Ordering System provides a customized ordering experience for your customers through your website or dedicated app. It includes menu management, real-time order tracking, integration with delivery services, payment processing, and analytics. The system can be branded to match your restaurant's identity and can integrate with your existing POS system."
                },
                {
                    id: "features-3",
                    question: "Can I manage multiple locations under one account?",
                    answer: "Absolutely! Our platform is designed to support multi-location restaurants. You can manage all your locations from a single dashboard while maintaining location-specific menus, pricing, hours, and reporting. This centralized management makes it easier to implement changes across your entire business."
                },
                {
                    id: "features-4",
                    question: "Do you offer marketing and promotional tools?",
                    answer: "Yes, our platform includes powerful marketing tools such as email campaigns, SMS marketing, loyalty programs, and promotional offers management. You can segment your customer base for targeted marketing, schedule automated campaigns, and track their performance through comprehensive analytics."
                }
            ]
        },
        {
            title: "Pricing & Billing",
            questions: [
                {
                    id: "pricing-1",
                    question: "How much does Restaurant AI Platform cost?",
                    answer: "We offer several subscription tiers to meet different needs and budgets. Our plans start at $99/month for basic features and scale up based on the size of your restaurant and the features you need. Visit our Pricing page for detailed information, or contact our sales team for a customized quote."
                },
                {
                    id: "pricing-2",
                    question: "Are there any setup or hidden fees?",
                    answer: "There are no hidden fees with our service. For standard implementations, there is no setup fee. For complex customizations or integrations, a one-time setup fee may apply, which will be clearly communicated upfront. All potential costs will be transparent before you commit."
                },
                {
                    id: "pricing-3",
                    question: "Can I change my subscription plan later?",
                    answer: "Yes, you can upgrade or downgrade your subscription plan at any time. Upgrades take effect immediately, while downgrades will be applied at the end of your current billing cycle. Our flexible approach ensures that you only pay for what you need as your business evolves."
                },
                {
                    id: "pricing-4",
                    question: "Do you offer discounts for annual subscriptions?",
                    answer: "Yes, we offer a 15% discount when you choose annual billing instead of monthly. This can provide significant savings while ensuring uninterrupted access to all the features your restaurant needs."
                }
            ]
        },
        {
            title: "Technical Support & Training",
            questions: [
                {
                    id: "support-1",
                    question: "What kind of support is available?",
                    answer: "We provide multi-channel support through email, live chat, and phone. Our support team is available 7 days a week, with extended hours during peak restaurant times. Premium support with dedicated account managers is available for Enterprise plans."
                },
                {
                    id: "support-2",
                    question: "Is training provided for my staff?",
                    answer: "Yes, we provide comprehensive training resources including live webinars, on-demand video tutorials, documentation, and guided walkthrough sessions. Additional personalized training sessions can be arranged for larger teams or specific needs."
                },
                {
                    id: "support-3",
                    question: "Can you help with data migration from my current system?",
                    answer: "Absolutely. Our team can assist with migrating your menu items, customer data, and historical orders from most major restaurant management systems. We follow secure data transfer protocols to ensure your information remains protected throughout the process."
                },
                {
                    id: "support-4",
                    question: "What happens if I need help during busy hours?",
                    answer: "We understand that restaurants operate during unconventional hours. That's why our support team is available during evenings and weekends. For urgent issues that impact your operations, we offer priority support with rapid response times to minimize any disruption to your business."
                }
            ]
        },
        {
            title: "Security & Data",
            questions: [
                {
                    id: "security-1",
                    question: "How secure is my restaurant's data on your platform?",
                    answer: "We take security very seriously. Our platform uses bank-level encryption (256-bit SSL), secure data centers, regular security audits, and follows industry best practices for data protection. We are compliant with PCI DSS standards for payment processing and implement comprehensive measures to protect your data against unauthorized access."
                },
                {
                    id: "security-2",
                    question: "Who owns the data collected through the platform?",
                    answer: "You retain full ownership of all your restaurant's data. We act as a processor of this information and will never sell or share your data with third parties without your explicit permission. You can export or delete your data at any time."
                },
                {
                    id: "security-3",
                    question: "Is customer payment information stored securely?",
                    answer: "We do not directly store credit card information. For payment processing, we partner with industry-leading payment processors that are fully PCI compliant. This approach ensures that sensitive payment data is handled with the highest security standards."
                },
                {
                    id: "security-4",
                    question: "How do you handle data backups?",
                    answer: "We perform automated daily backups of all data with point-in-time recovery options. Backups are encrypted and stored in geographically distributed locations to ensure data durability. Our backup system allows for quick restoration in the unlikely event of data loss."
                }
            ]
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
                        <span className="text-[#e85c2c]">Frequently Asked Questions</span>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="mb-16 text-center">
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
                        {faqCategories.map((category, index) => (
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
                <div className="max-w-4xl mx-auto">
                    {faqCategories.map((category, index) => (
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
                <div className="max-w-3xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-sm text-center">
                    <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-gray-600 mb-6">
                        Our support team is here to help. Contact us and we'll get back to you as soon as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-[#e85c2c] text-white rounded-lg hover:bg-[#d04a1d] transition-colors">
                            Contact Support
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </Link>
                        <a
                            href="#"
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            View Documentation
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
} 