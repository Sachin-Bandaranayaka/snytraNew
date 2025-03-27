import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivacyPolicyPage() {
    // Last updated date
    const lastUpdated = "March 1, 2023";

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
                        <Link href="/legal" className="text-gray-600 hover:text-[#e85c2c]">
                            Legal
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
                        <span className="text-[#e85c2c]">Privacy Policy</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-sm">
                    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-sm text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

                    <div className="prose prose-lg max-w-none">
                        <p>
                            At Restaurant AI Platform, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>

                        <h2>Information We Collect</h2>
                        <p>
                            We collect information that you provide directly to us when you register for an account, use our services, or communicate with us. The types of information we may collect include:
                        </p>
                        <ul>
                            <li>Personal identifiers, such as your name, email address, postal address, phone number, and other similar identifiers</li>
                            <li>Account information, such as your username and password</li>
                            <li>Business information, such as your company name, business type, and number of locations</li>
                            <li>Payment information, such as your credit card number (which is processed by our secure payment processor)</li>
                            <li>Any other information you choose to provide, such as when you fill out a form, respond to a survey, or communicate with our customer service</li>
                        </ul>

                        <p>
                            We also automatically collect certain information when you visit, use, or navigate our website. This information does not reveal your specific identity but may include:
                        </p>
                        <ul>
                            <li>Device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our website, and other technical information</li>
                            <li>Information collected through cookies, pixel tags, and other tracking technologies</li>
                        </ul>

                        <h2>How We Use Your Information</h2>
                        <p>
                            We use the information we collect for various business and commercial purposes, including:
                        </p>
                        <ul>
                            <li>Providing, personalizing, and improving our services</li>
                            <li>Processing your transactions and managing your account</li>
                            <li>Communicating with you about your account, our services, and other matters</li>
                            <li>Responding to your inquiries, comments, or postings</li>
                            <li>Marketing and advertising our services to you and others</li>
                            <li>Conducting research and analysis to better understand how users access and use our services</li>
                            <li>Developing new products and services</li>
                            <li>Protecting our and others' rights, property, or safety</li>
                            <li>Complying with legal obligations</li>
                            <li>For other purposes with your consent</li>
                        </ul>

                        <h2>How We Share Your Information</h2>
                        <p>
                            We may share your information with third parties in the following circumstances:
                        </p>
                        <ul>
                            <li>With service providers, contractors, and other third parties who perform services on our behalf</li>
                            <li>With your restaurant customers, to the extent necessary to provide our services</li>
                            <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
                            <li>With your consent or at your direction</li>
                            <li>When we believe it is necessary to comply with applicable laws or regulations, to protect the rights, property, and safety of Restaurant AI Platform, our users, or others</li>
                        </ul>

                        <h2>Your Rights and Choices</h2>
                        <p>
                            Depending on your location, you may have certain rights regarding your personal information, including:
                        </p>
                        <ul>
                            <li>The right to access the personal information we have about you</li>
                            <li>The right to request that we correct or update any personal information we have about you</li>
                            <li>The right to request that we delete certain personal information we have about you</li>
                            <li>The right to opt-out of the sale of your personal information</li>
                            <li>The right to withdraw your consent to our processing of your information</li>
                        </ul>

                        <p>
                            To exercise any of these rights, please contact us at privacy@restaurantai.com.
                        </p>

                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect the security of your personal information. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk.
                        </p>

                        <h2>Data Retention</h2>
                        <p>
                            We will retain your personal information only for as long as is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.
                        </p>

                        <h2>Children's Privacy</h2>
                        <p>
                            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we take steps to remove that information from our servers.
                        </p>

                        <h2>Changes to This Privacy Policy</h2>
                        <p>
                            We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date at the top of this policy. You are advised to review this privacy policy periodically for any changes.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy, please contact us at:
                        </p>
                        <p>
                            Email: privacy@restaurantai.com<br />
                            Address: 123 Restaurant Ave, Suite 456, San Francisco, CA 94103<br />
                            Phone: (123) 456-7890
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
} 