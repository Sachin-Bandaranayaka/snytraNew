import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CookiePolicyPage() {
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
                        <span className="text-[#e85c2c]">Cookie Policy</span>
                    </div>
                </div>

                {/* Cookie Policy Content */}
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm mb-16">
                    <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
                    <p className="text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

                    <div className="prose max-w-none">
                        <h2 className="text-xl font-bold mt-8 mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            This Cookie Policy explains how Restaurant AI Platform ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at restaurantai.com ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                        </p>
                        <p className="mb-4">
                            This Cookie Policy should be read together with our Privacy Policy and Terms of Service.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">2. What are Cookies?</h2>
                        <p className="mb-4">
                            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
                        </p>
                        <p className="mb-4">
                            Cookies set by the website owner (in this case, Restaurant AI Platform) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">3. Why Do We Use Cookies?</h2>
                        <p className="mb-4">
                            We use both first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">4. Types of Cookies We Use</h2>
                        <p className="mb-4">The specific types of first and third-party cookies served through our Website and the purposes they perform are described below:</p>

                        <h3 className="text-lg font-semibold mt-6 mb-2">4.1 Essential Cookies</h3>
                        <p className="mb-4">
                            These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Website, you cannot refuse them without impacting how our Website functions.
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Session cookies: These are temporary cookies that expire when you close your browser.</li>
                            <li>Authentication cookies: These help us recognize registered users and remember their login information.</li>
                            <li>Security cookies: These help protect against security risks and unauthorized activities.</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-2">4.2 Performance and Functionality Cookies</h3>
                        <p className="mb-4">
                            These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Preference cookies: These remember your preferences and settings.</li>
                            <li>Language cookies: These remember your language preference.</li>
                            <li>Customization cookies: These enable us to provide enhanced functionality and personalization.</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-2">4.3 Analytics and Customization Cookies</h3>
                        <p className="mb-4">
                            These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Google Analytics: We use Google Analytics to understand how visitors interact with our Website.</li>
                            <li>Hotjar: We use Hotjar to analyze user behavior and improve our Website design.</li>
                            <li>User journey cookies: These track your journey through our Website to help us improve user experience.</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-2">4.4 Advertising Cookies</h3>
                        <p className="mb-4">
                            These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Google Ads: Used to deliver targeted advertisements.</li>
                            <li>Facebook Pixel: Helps us measure the effectiveness of our advertising on Facebook.</li>
                            <li>Retargeting cookies: These allow us to show you relevant ads based on your previous interactions with our Website.</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-2">4.5 Social Media Cookies</h3>
                        <p className="mb-4">
                            These cookies are used to enable you to share pages and content from our Website through third-party social networking and other websites. These cookies may also be used for advertising purposes.
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Facebook: Share content and connect with your Facebook account.</li>
                            <li>Twitter: Share content and connect with your Twitter account.</li>
                            <li>LinkedIn: Share content and connect with your LinkedIn account.</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4">5. How Can You Control Cookies?</h2>
                        <p className="mb-4">
                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner on our Website.
                        </p>
                        <p className="mb-4">
                            You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Website, but your access to some functionality and areas of our Website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
                        </p>
                        <p className="mb-4">
                            In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" className="text-[#e85c2c] hover:underline">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" className="text-[#e85c2c] hover:underline">http://www.youronlinechoices.com</a>.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">6. How Often Will We Update This Cookie Policy?</h2>
                        <p className="mb-4">
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                        </p>
                        <p className="mb-4">
                            The date at the top of this Cookie Policy indicates when it was last updated.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4">7. Where Can You Get Further Information?</h2>
                        <p className="mb-4">
                            If you have any questions about our use of cookies or other technologies, please email us at privacy@restaurantai.com or contact us at:
                        </p>
                        <p className="mb-4">
                            Restaurant AI Platform<br />
                            123 Tech Avenue<br />
                            San Francisco, CA 94103<br />
                            United States<br />
                            Phone: (123) 456-7890
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
} 