import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AcceptableUsePolicyPage() {
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
                        <span className="text-[#e85c2c]">Acceptable Use Policy</span>
                    </div>
                </div>

                {/* Acceptable Use Policy Content */}
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm mb-16">
                    <h1 className="text-3xl font-bold mb-2">Acceptable Use Policy</h1>
                    <p className="text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

                    <div className="prose max-w-none">
                        <h2 className="text-xl font-bold mt-8 mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            This Acceptable Use Policy ("Policy") outlines the guidelines and rules for using the Restaurant AI Platform services, website, and any associated applications or services (collectively, the "Services"). By accessing or using our Services, you agree to comply with this Policy.
                        </p>
                        <p className="mb-4">
                            We reserve the right to modify this Policy at any time. Your continued use of the Services after such modifications constitutes your acceptance of the revised Policy. It is your responsibility to regularly check for updates to this Policy.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">2. Prohibited Activities</h2>
                        <p className="mb-4">
                            When using our Services, you agree not to engage in any of the following prohibited activities:
                        </p>

                        <h3 className="text-lg font-semibold mt-6 mb-2">2.1 Illegal Activities</h3>
                        <p className="mb-4">
                            You may not use our Services to:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Violate any applicable local, state, national, or international law or regulation.</li>
                            <li>Engage in, promote, or facilitate illegal activities.</li>
                            <li>Infringe upon or violate the intellectual property rights of others.</li>
                            <li>Commit fraud, misrepresentation, or deceptive practices.</li>
                            <li>Violate or attempt to violate the security of the Services or any related network or system.</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-2">2.2 Harmful Content</h3>
                        <p className="mb-4">
                            You may not post, upload, or distribute any content that:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of another's privacy, or hateful.</li>
                            <li>Promotes violence, discrimination, or illegal activities.</li>
                            <li>Contains sexually explicit material or is pornographic in nature.</li>
                            <li>Exploits or harms children in any way.</li>
                            <li>Infringes on any patent, trademark, trade secret, copyright, or other proprietary rights.</li>
                            <li>Contains malicious code, viruses, or harmful components designed to interrupt, destroy, or limit the functionality of any software, hardware, or telecommunications equipment.</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-2">2.3 System Interference</h3>
                        <p className="mb-4">
                            You may not:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Interfere with or disrupt the Services or servers or networks connected to the Services.</li>
                            <li>Disobey any requirements, procedures, policies, or regulations of networks connected to the Services.</li>
                            <li>Use any high-volume automated means (such as robots, spiders, or scripts) to access the Services.</li>
                            <li>Attempt to gain unauthorized access to any portion of the Services or any other accounts, systems, or networks connected to the Services.</li>
                            <li>Monitor data or traffic on the Services without our express authorization.</li>
                            <li>Conduct security tests or vulnerability scans on our systems without prior written permission.</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-2">2.4 Commercial Misuse</h3>
                        <p className="mb-4">
                            You may not:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Use the Services for any purpose that is not expressly permitted by this Policy or your subscription plan.</li>
                            <li>Resell, lease, loan, or sublicense the Services to any third party without our express written permission.</li>
                            <li>Use the Services to develop a competing product or service.</li>
                            <li>Reverse engineer, decompile, or disassemble any portion of the Services.</li>
                            <li>Scrape, mine, or otherwise collect data from the Services for any commercial purpose without our express permission.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">3. User Content Guidelines</h2>
                        <p className="mb-4">
                            In addition to the prohibited activities above, the following guidelines apply to any content you submit, upload, or otherwise make available through our Services:
                        </p>

                        <h3 className="text-lg font-semibold mt-6 mb-2">3.1 Accuracy</h3>
                        <p className="mb-4">
                            All content must be accurate and not misleading. You should not make false claims about your products, services, or business.
                        </p>

                        <h3 className="text-lg font-semibold mt-6 mb-2">3.2 Appropriateness</h3>
                        <p className="mb-4">
                            Content must be appropriate for all audiences and consistent with the professional nature of our Services. This includes avoiding excessive profanity, explicit content, or content that could be offensive to others.
                        </p>

                        <h3 className="text-lg font-semibold mt-6 mb-2">3.3 Ownership and Rights</h3>
                        <p className="mb-4">
                            You must only upload content for which you have the necessary rights, licenses, consents, and permissions. This includes respecting copyrights, trademarks, and other intellectual property rights of third parties.
                        </p>

                        <h3 className="text-lg font-semibold mt-6 mb-2">3.4 Compliance with Food Service Regulations</h3>
                        <p className="mb-4">
                            Any content related to food services must comply with all applicable health and safety regulations, including but not limited to proper food handling procedures, allergen information, and nutritional facts.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">4. Account Security</h2>
                        <p className="mb-4">
                            You are responsible for maintaining the security of your account, including:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Using strong, unique passwords and regularly updating them.</li>
                            <li>Keeping your login credentials confidential.</li>
                            <li>Ensuring that your account is only accessed by authorized individuals.</li>
                            <li>Logging out of your account when using shared devices.</li>
                            <li>Notifying us immediately of any unauthorized access or security breach related to your account.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">5. API Usage</h2>
                        <p className="mb-4">
                            If you use our APIs, you must:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Adhere to any rate limits we impose.</li>
                            <li>Not attempt to circumvent any limitations or restrictions.</li>
                            <li>Include proper attribution when required.</li>
                            <li>Not cache or store our data longer than permitted.</li>
                            <li>Keep any API keys or credentials secure.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">6. Monitoring and Enforcement</h2>
                        <p className="mb-4">
                            We reserve the right to:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Monitor the Services for violations of this Policy.</li>
                            <li>Remove or refuse any content that violates this Policy or that we find objectionable.</li>
                            <li>Suspend or terminate access to the Services for users who violate this Policy.</li>
                            <li>Take appropriate legal action against violators.</li>
                            <li>Cooperate with law enforcement authorities in investigating claims of illegal activity.</li>
                        </ul>
                        <p className="mb-4">
                            While we strive to enforce this Policy consistently, our failure to enforce any part of it should not be considered a waiver of our right to do so in the future.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">7. Reporting Violations</h2>
                        <p className="mb-4">
                            If you become aware of any violation of this Policy, please report it to us at legal@restaurantai.com. Please provide us with as much detail as possible to help us address the issue effectively.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">8. Consequences of Violation</h2>
                        <p className="mb-4">
                            Violations of this Policy may result in:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Temporary or permanent suspension of your account.</li>
                            <li>Removal of violating content.</li>
                            <li>Termination of your subscription without refund.</li>
                            <li>Legal action, if appropriate.</li>
                            <li>Reporting to relevant law enforcement authorities.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">9. Contact Information</h2>
                        <p className="mb-4">
                            If you have any questions about this Acceptable Use Policy, please contact us at:
                        </p>
                        <p className="mb-4">
                            Restaurant AI Platform<br />
                            Legal Department<br />
                            123 Tech Avenue<br />
                            San Francisco, CA 94103<br />
                            United States<br />
                            Email: legal@restaurantai.com<br />
                            Phone: (123) 456-7890
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
} 