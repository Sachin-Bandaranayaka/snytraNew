import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function DataProcessingAgreementPage() {
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
                        <span className="text-[#e85c2c]">Data Processing Agreement</span>
                    </div>
                </div>

                {/* Data Processing Agreement Content */}
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm mb-16">
                    <h1 className="text-3xl font-bold mb-2">Data Processing Agreement</h1>
                    <p className="text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

                    <div className="prose max-w-none">
                        <h2 className="text-xl font-bold mt-8 mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            This Data Processing Agreement ("DPA") forms part of the Terms of Service or other agreement between Restaurant AI Platform ("Processor", "we", "us", or "our") and the customer ("Controller", "you", or "your") using our services (collectively, the "Agreement").
                        </p>
                        <p className="mb-4">
                            This DPA reflects the parties' agreement with respect to the processing of personal data by us on your behalf in connection with our services under the Agreement. All capitalized terms not defined herein shall have the meaning set forth in the Agreement.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">2. Definitions</h2>
                        <p className="mb-4">
                            For the purposes of this DPA, the following definitions shall apply:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li><strong>"Data Protection Laws"</strong> means all applicable laws and regulations regarding the processing of Personal Data, including but not limited to the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).</li>
                            <li><strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person ("Data Subject") processed by us on behalf of you.</li>
                            <li><strong>"Processing"</strong> means any operation performed on Personal Data, such as collection, recording, organization, structuring, storage, adaptation, alteration, retrieval, consultation, use, disclosure, dissemination, restriction, erasure, or destruction.</li>
                            <li><strong>"Data Subject"</strong> means an identified or identifiable natural person to whom the Personal Data relates.</li>
                            <li><strong>"Sub-processor"</strong> means any processor engaged by us to process Personal Data on your behalf.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">3. Scope and Responsibilities</h2>
                        <h3 className="text-lg font-semibold mt-6 mb-2">3.1 Processing Scope</h3>
                        <p className="mb-4">
                            We will process Personal Data on your behalf as necessary to provide the services as described in the Agreement and in accordance with your documented instructions.
                        </p>

                        <h3 className="text-lg font-semibold mt-6 mb-2">3.2 Controller Responsibilities</h3>
                        <p className="mb-4">
                            You warrant and represent that:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>You have the legal authority to provide the Personal Data to us.</li>
                            <li>You have obtained all necessary consents and permissions from Data Subjects for the processing of their Personal Data.</li>
                            <li>Your instructions to us regarding the processing of Personal Data comply with all applicable Data Protection Laws.</li>
                            <li>You will provide clear and sufficient instructions regarding the processing of Personal Data.</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-2">3.3 Processor Responsibilities</h3>
                        <p className="mb-4">
                            We warrant and represent that:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>We will process Personal Data only on your documented instructions.</li>
                            <li>We will ensure that persons authorized to process the Personal Data have committed themselves to confidentiality.</li>
                            <li>We will implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.</li>
                            <li>We will assist you in ensuring compliance with your obligations under applicable Data Protection Laws.</li>
                            <li>We will make available to you all information necessary to demonstrate compliance with the obligations set forth in this DPA.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">4. Types of Personal Data Processed</h2>
                        <p className="mb-4">
                            The types of Personal Data we may process on your behalf include:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li><strong>Customer Data:</strong> Names, email addresses, phone numbers, and other contact information of your customers.</li>
                            <li><strong>Employee Data:</strong> Names, email addresses, phone numbers, and employment details of your staff members.</li>
                            <li><strong>Order Data:</strong> Information about food orders, including items ordered, delivery addresses, and order preferences.</li>
                            <li><strong>Payment Data:</strong> Payment method details and transaction records (excluding full credit card numbers or CVV codes).</li>
                            <li><strong>Analytics Data:</strong> Customer behavior, preferences, and usage patterns within your restaurant operations.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">5. Duration of Processing</h2>
                        <p className="mb-4">
                            We will process Personal Data for the duration of the Agreement, unless otherwise agreed in writing or required by applicable law.
                        </p>
                        <p className="mb-4">
                            Upon termination of the Agreement or upon your request, we will, at your choice, delete or return all Personal Data to you and delete existing copies unless applicable law requires storage of the Personal Data.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">6. Sub-processing</h2>
                        <h3 className="text-lg font-semibold mt-6 mb-2">6.1 Authorization for Sub-processing</h3>
                        <p className="mb-4">
                            You hereby authorize us to engage Sub-processors for the processing of Personal Data. We will maintain a list of current Sub-processors and will provide you with this list upon request.
                        </p>

                        <h3 className="text-lg font-semibold mt-6 mb-2">6.2 Sub-processor Requirements</h3>
                        <p className="mb-4">
                            We will:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Enter into a written agreement with each Sub-processor imposing data protection terms no less protective than those in this DPA.</li>
                            <li>Remain fully liable for the performance of each Sub-processor's obligations.</li>
                            <li>Inform you of any intended changes concerning the addition or replacement of Sub-processors, giving you the opportunity to object to such changes.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">7. Security Measures</h2>
                        <p className="mb-4">
                            We will implement and maintain appropriate technical and organizational security measures to protect Personal Data from accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. These measures include, but are not limited to:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li><strong>Access Control:</strong> Limiting access to Personal Data to authorized personnel on a need-to-know basis.</li>
                            <li><strong>Encryption:</strong> Encrypting Personal Data both in transit and at rest.</li>
                            <li><strong>Backup and Recovery:</strong> Regular backup procedures and disaster recovery plans.</li>
                            <li><strong>Security Testing:</strong> Regular security assessments, penetration testing, and vulnerability scanning.</li>
                            <li><strong>Employee Training:</strong> Regular training for employees on data protection and security practices.</li>
                            <li><strong>Incident Response:</strong> Documented procedures for detecting, reporting, and responding to security incidents.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">8. Data Subject Rights</h2>
                        <p className="mb-4">
                            We will assist you in fulfilling your obligation to respond to Data Subject requests to exercise their rights under applicable Data Protection Laws, including but not limited to rights of access, rectification, erasure, restriction of processing, data portability, and objection to processing.
                        </p>
                        <p className="mb-4">
                            If we receive a request from a Data Subject directly, we will promptly notify you and not respond to the request without your prior authorization, unless legally required to do so.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">9. Data Breach Notification</h2>
                        <p className="mb-4">
                            In the event of a personal data breach affecting your Personal Data, we will:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Notify you without undue delay upon becoming aware of the breach.</li>
                            <li>Provide you with sufficient information to allow you to meet any obligations to report the breach to supervisory authorities or Data Subjects.</li>
                            <li>Take reasonable steps to mitigate the effects of the breach and minimize potential damage.</li>
                            <li>Cooperate with you and take such steps as are directed by you to assist in the investigation, mitigation, and remediation of the breach.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">10. Data Protection Impact Assessments</h2>
                        <p className="mb-4">
                            We will provide reasonable assistance to you with any data protection impact assessments and prior consultations with supervisory authorities that you are required to carry out under applicable Data Protection Laws in relation to the processing of Personal Data by us.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">11. Audit Rights</h2>
                        <p className="mb-4">
                            We will make available to you all information necessary to demonstrate compliance with the obligations set forth in this DPA and allow for and contribute to audits, including inspections, conducted by you or an auditor mandated by you, provided that:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>You provide reasonable prior notice of any audit.</li>
                            <li>Audits are conducted during normal business hours.</li>
                            <li>You bear the costs of any audit.</li>
                            <li>Audits do not disrupt our normal business operations.</li>
                            <li>Any third-party auditor signs appropriate confidentiality agreements.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">12. International Data Transfers</h2>
                        <p className="mb-4">
                            We will not transfer Personal Data outside the jurisdiction in which it was initially collected unless appropriate safeguards are in place as required by applicable Data Protection Laws. Such safeguards may include:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>An adequacy decision by the relevant authority.</li>
                            <li>Standard Contractual Clauses approved by the European Commission.</li>
                            <li>Binding Corporate Rules.</li>
                            <li>Other appropriate legal mechanisms for transfers.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">13. Contact Information</h2>
                        <p className="mb-4">
                            For data protection related inquiries, please contact our Data Protection Officer at:
                        </p>
                        <p className="mb-4">
                            Email: privacy@restaurantai.com<br />
                            Address: Restaurant AI Platform, 123 Tech Avenue, San Francisco, CA 94103, USA<br />
                            Phone: (123) 456-7890
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
} 