import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TermsOfServicePage() {
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
                        <span className="text-[#e85c2c]">Terms of Service</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-sm">
                    <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
                    <p className="text-sm text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

                    <div className="prose prose-lg max-w-none">
                        <p>
                            These Terms of Service ("Terms") govern your access to and use of the Restaurant AI Platform website, products, and services ("Services"). Please read these Terms carefully, and contact us if you have any questions. By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
                        </p>

                        <h2>1. Using Our Services</h2>
                        <p>
                            You must follow any policies made available to you within the Services. You may use our Services only as permitted by law. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.
                        </p>

                        <h3>1.1 Your Account</h3>
                        <p>
                            You may need to create an account to use some of our Services. You are responsible for safeguarding your account, so use a strong password and limit its use to this account. We cannot and will not be liable for any loss or damage arising from your failure to comply with the above.
                        </p>

                        <h3>1.2 Service Eligibility</h3>
                        <p>
                            To use our Services, you must be at least 18 years old and capable of forming a binding contract with Restaurant AI Platform. You must also not be prohibited from receiving any aspect of our Service under applicable laws.
                        </p>

                        <h2>2. Privacy and Copyright Protection</h2>
                        <p>
                            Our <Link href="/legal/privacy-policy" className="text-[#e85c2c] hover:underline">Privacy Policy</Link> explains how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that Restaurant AI Platform can use such data in accordance with our privacy policies.
                        </p>

                        <h2>3. Your Content in Our Services</h2>
                        <p>
                            Our Services allow you to upload, submit, store, send, or receive content, such as restaurant menus, customer information, and other materials ("Customer Content"). You retain ownership of any intellectual property rights that you hold in that Customer Content.
                        </p>

                        <p>
                            When you upload, submit, store, send, or receive Customer Content to or through our Services, you give Restaurant AI Platform (and those we work with) a worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display and distribute such Customer Content. The rights you grant in this license are for the limited purpose of operating, promoting, and improving our Services, and to develop new ones. This license continues even if you stop using our Services. Make sure you have the necessary rights to grant us this license for any Customer Content that you submit to our Services.
                        </p>

                        <h2>4. Subscription and Payments</h2>
                        <p>
                            Some of our Services require payment of fees. You shall pay all applicable fees, as described in the Services in connection with such Services selected by you. We reserve the right to change our prices. If we change our prices for a recurring payment subscription, we will provide notice of the change through the Services or by email at least 30 days before the change is to take effect. Your continued use of the Services after the price change becomes effective constitutes your agreement to pay the changed amount.
                        </p>

                        <p>
                            You may cancel your subscription at any time by contacting our customer support team. If you cancel, you will not be billed for any additional terms of service, and service will continue until the end of the current subscription term. If you cancel, you will not receive a refund for any service already paid for.
                        </p>

                        <h2>5. Software in Our Services</h2>
                        <p>
                            When a Service requires or includes downloadable software, this software may update automatically on your device once a new version or feature is available. Some Services may let you adjust your automatic update settings.
                        </p>

                        <p>
                            Restaurant AI Platform gives you a personal, worldwide, royalty-free, non-assignable and non-exclusive license to use the software provided to you by Restaurant AI Platform as part of the Services. This license is for the sole purpose of enabling you to use and enjoy the benefit of the Services as provided by Restaurant AI Platform, in the manner permitted by these Terms.
                        </p>

                        <h2>6. Modifying and Terminating Our Services</h2>
                        <p>
                            We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether. You can stop using our Services at any time, although we'll be sorry to see you go. Restaurant AI Platform may also stop providing Services to you, or add or create new limits to our Services at any time.
                        </p>

                        <h2>7. Our Warranties and Disclaimers</h2>
                        <p>
                            We provide our Services using a commercially reasonable level of skill and care and we hope that you will enjoy using them. But there are certain things that we don't promise about our Services.
                        </p>

                        <p>
                            OTHER THAN AS EXPRESSLY SET OUT IN THESE TERMS OR ADDITIONAL TERMS, NEITHER RESTAURANT AI PLATFORM NOR ITS SUPPLIERS OR DISTRIBUTORS MAKE ANY SPECIFIC PROMISES ABOUT THE SERVICES. FOR EXAMPLE, WE DON'T MAKE ANY COMMITMENTS ABOUT THE CONTENT WITHIN THE SERVICES, THE SPECIFIC FUNCTIONS OF THE SERVICES, OR THEIR RELIABILITY, AVAILABILITY, OR ABILITY TO MEET YOUR NEEDS. WE PROVIDE THE SERVICES "AS IS".
                        </p>

                        <p>
                            SOME JURISDICTIONS PROVIDE FOR CERTAIN WARRANTIES, LIKE THE IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. TO THE EXTENT PERMITTED BY LAW, WE EXCLUDE ALL WARRANTIES.
                        </p>

                        <h2>8. Liability for Our Services</h2>
                        <p>
                            WHEN PERMITTED BY LAW, RESTAURANT AI PLATFORM, AND RESTAURANT AI PLATFORM'S SUPPLIERS AND DISTRIBUTORS, WILL NOT BE RESPONSIBLE FOR LOST PROFITS, REVENUES, OR DATA, FINANCIAL LOSSES OR INDIRECT, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES.
                        </p>

                        <p>
                            TO THE EXTENT PERMITTED BY LAW, THE TOTAL LIABILITY OF RESTAURANT AI PLATFORM, AND ITS SUPPLIERS AND DISTRIBUTORS, FOR ANY CLAIMS UNDER THESE TERMS, INCLUDING FOR ANY IMPLIED WARRANTIES, IS LIMITED TO THE AMOUNT YOU PAID US TO USE THE SERVICES (OR, IF WE CHOOSE, TO SUPPLYING YOU THE SERVICES AGAIN).
                        </p>

                        <p>
                            IN ALL CASES, RESTAURANT AI PLATFORM, AND ITS SUPPLIERS AND DISTRIBUTORS, WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE THAT IS NOT REASONABLY FORESEEABLE.
                        </p>

                        <h2>9. About These Terms</h2>
                        <p>
                            We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes to the law or changes to our Services. You should look at the terms regularly. We'll post notice of modifications to these terms on this page. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted. However, changes addressing new functions for a Service or changes made for legal reasons will be effective immediately.
                        </p>

                        <p>
                            If you do not agree to the modified terms for a Service, you should discontinue your use of that Service.
                        </p>

                        <p>
                            These Terms constitute the entire agreement between you and Restaurant AI Platform regarding your use of the Services and supersede and replace any prior agreements between you and Restaurant AI Platform regarding the Services.
                        </p>

                        <h2>10. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <p>
                            Email: legal@restaurantai.com<br />
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