import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LegalPage() {
    // Legal document list
    const legalDocuments = [
        {
            title: "Privacy Policy",
            description: "Learn how we collect, use, and protect your personal information.",
            path: "/legal/privacy-policy",
            lastUpdated: "March 1, 2023"
        },
        {
            title: "Terms of Service",
            description: "The rules and guidelines that govern the use of our platform and services.",
            path: "/legal/terms-of-service",
            lastUpdated: "March 1, 2023"
        },
        {
            title: "Cookie Policy",
            description: "Information about how we use cookies and similar technologies.",
            path: "/legal/cookie-policy",
            lastUpdated: "March 1, 2023"
        },
        {
            title: "Acceptable Use Policy",
            description: "Guidelines for appropriate use of our platform and services.",
            path: "/legal/acceptable-use-policy",
            lastUpdated: "March 1, 2023"
        },
        {
            title: "Data Processing Agreement",
            description: "Information about how we process data on behalf of our customers.",
            path: "/legal/data-processing-agreement",
            lastUpdated: "March 1, 2023"
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
                        <span className="text-[#e85c2c]">Legal</span>
                    </div>
                </div>

                {/* Page Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Documents</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Here you'll find all legal documents related to our platform and services. We're committed to transparency and protecting your rights.
                    </p>
                </div>

                {/* Legal Documents */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {legalDocuments.map((doc, index) => (
                        <Link href={doc.path} key={index} className="group">
                            <div className="bg-white rounded-lg p-6 shadow-sm h-full transition-shadow duration-300 hover:shadow-md flex flex-col">
                                <h2 className="text-xl font-bold mb-2 group-hover:text-[#e85c2c] transition-colors duration-300">{doc.title}</h2>
                                <p className="text-gray-600 mb-4 flex-grow">{doc.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Last updated: {doc.lastUpdated}</span>
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

                {/* Contact Section */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
                        <p className="text-gray-600 mb-6">
                            If you have any questions about our legal policies or need additional information, please don't hesitate to contact our legal team.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 text-left mb-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-medium mb-2">Legal Department</h3>
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
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                    <span>legal@restaurantai.com</span>
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
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                    <span>(123) 456-7890</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-medium mb-2">Privacy Concerns</h3>
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
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                    <span>privacy@restaurantai.com</span>
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
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                    <span>(123) 456-7891</span>
                                </div>
                            </div>
                        </div>
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white">Contact Our Legal Team</Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
} 