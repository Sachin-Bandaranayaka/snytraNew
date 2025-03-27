import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function JobDetailPage({ params }: { params: { id: string } }) {
    // Sample jobs data - in a real implementation, this would be fetched from database
    const jobs = [
        {
            id: "1",
            title: "Senior Full Stack Developer",
            department: "Engineering",
            location: "San Francisco, CA (Hybrid)",
            type: "Full Time",
            postedDate: "March 15, 2023",
            description: "We're seeking an experienced Full Stack Developer to join our engineering team. You'll work on building and maintaining our core restaurant management platform, implementing new features, and ensuring scalability and performance.",
            responsibilities: [
                "Develop and maintain web applications using React, Node.js, and TypeScript",
                "Design and implement RESTful APIs and microservices",
                "Work closely with product managers and designers to implement new features",
                "Optimize applications for maximum speed and scalability",
                "Participate in code reviews and mentor junior developers"
            ],
            requirements: [
                "5+ years of experience in full stack development",
                "Strong proficiency in JavaScript/TypeScript, React, and Node.js",
                "Experience with cloud services (AWS, GCP, or Azure)",
                "Familiarity with database technologies (SQL and NoSQL)",
                "Excellent problem-solving abilities and communication skills"
            ],
            preferredQualifications: [
                "Experience with GraphQL and Apollo",
                "Knowledge of CI/CD pipelines and DevOps practices",
                "Previous experience in the restaurant or hospitality industry",
                "Contributions to open-source projects",
                "Experience with real-time applications and WebSockets"
            ],
            benefits: [
                "Competitive salary and equity package",
                "Health, dental, and vision insurance",
                "401(k) matching",
                "Generous PTO and paid parental leave",
                "Home office stipend",
                "Professional development budget",
                "Flexible work arrangements"
            ]
        },
        {
            id: "2",
            title: "AI/ML Engineer",
            department: "Engineering",
            location: "Remote (US)",
            type: "Full Time",
            postedDate: "March 10, 2023",
            description: "We're looking for an AI/ML Engineer to help us build and improve our AI solutions for the restaurant industry. You'll work on developing and optimizing machine learning models for natural language processing, chatbots, and predictive analytics.",
            responsibilities: [
                "Design, develop, and deploy machine learning models for production",
                "Collaborate with cross-functional teams to identify and implement AI-driven solutions",
                "Improve existing AI features and develop new ones",
                "Stay current with the latest developments in AI/ML technologies",
                "Participate in the full machine learning lifecycle from data collection to deployment"
            ],
            requirements: [
                "3+ years of experience in machine learning engineering",
                "Strong knowledge of Python and machine learning frameworks (TensorFlow, PyTorch)",
                "Experience with NLP and conversational AI",
                "Familiarity with cloud-based ML services",
                "MS or PhD in Computer Science, Machine Learning, or related field"
            ],
            preferredQualifications: [
                "Experience with speech recognition or synthesis",
                "Knowledge of reinforcement learning",
                "Experience with MLOps and model deployment",
                "Previous work in the restaurant or hospitality industry",
                "Publications in relevant AI/ML conferences or journals"
            ],
            benefits: [
                "Competitive salary and equity package",
                "Health, dental, and vision insurance",
                "401(k) matching",
                "Generous PTO and paid parental leave",
                "Home office stipend",
                "Professional development budget",
                "Flexible work arrangements"
            ]
        }
    ];

    // Find the requested job
    const job = jobs.find(job => job.id === params.id) || jobs[0];

    // Get similar jobs (exclude current job)
    const similarJobs = jobs.filter(j => j.id !== params.id).slice(0, 2);

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
                        <Link href="/careers" className="text-gray-600 hover:text-[#e85c2c]">
                            Careers
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
                        <span className="text-[#e85c2c]">{job.title}</span>
                    </div>
                </div>

                {/* Job Detail and Application Form */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Job Detail */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <div className="mb-6">
                                <div className="inline-block bg-orange-100 text-[#e85c2c] px-3 py-1 rounded-full text-xs font-medium mb-2">
                                    {job.department}
                                </div>
                                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                                <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
                                    <div className="flex items-center mr-4 mb-2">
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
                                            className="mr-1"
                                        >
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        {job.location}
                                    </div>
                                    <div className="flex items-center mr-4 mb-2">
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
                                            className="mr-1"
                                        >
                                            <path d="M12 20h9"></path>
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                        </svg>
                                        {job.type}
                                    </div>
                                    <div className="flex items-center mb-2">
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
                                            className="mr-1"
                                        >
                                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                                            <line x1="16" x2="16" y1="2" y2="6"></line>
                                            <line x1="8" x2="8" y1="2" y2="6"></line>
                                            <line x1="3" x2="21" y1="10" y2="10"></line>
                                        </svg>
                                        Posted on {job.postedDate}
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-8">{job.description}</p>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    {job.responsibilities.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Requirements</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    {job.requirements.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Preferred Qualifications</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    {job.preferredQualifications.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Benefits</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    {job.benefits.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold mb-4">About Restaurant AI</h2>
                                <p className="text-gray-700 mb-4">
                                    Restaurant AI is a leading provider of artificial intelligence solutions for the restaurant industry. Our mission is to help restaurants improve operational efficiency, enhance customer experiences, and drive growth through innovative technology. We're backed by top-tier investors and are growing rapidly to meet the increasing demand for our solutions.
                                </p>
                                <p className="text-gray-700">
                                    We're a diverse and inclusive team of engineers, designers, product managers, and industry experts who are passionate about transforming the restaurant industry. We offer a collaborative work environment, competitive compensation and benefits, and opportunities for professional growth.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Application Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                                <h2 className="text-xl font-bold mb-4">Apply for this position</h2>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                                            Full Name<span className="text-red-500">*</span>
                                        </label>
                                        <Input id="fullName" type="text" placeholder="John Doe" required />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                                            Email<span className="text-red-500">*</span>
                                        </label>
                                        <Input id="email" type="email" placeholder="john.doe@example.com" required />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                                            Phone Number
                                        </label>
                                        <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Resume/CV<span className="text-red-500">*</span>
                                        </label>
                                        <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mx-auto text-gray-400 mb-2"
                                            >
                                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                                <polyline points="14 2 14 8 20 8"></polyline>
                                                <path d="M12 18v-6"></path>
                                                <path d="m9 15 3 3 3-3"></path>
                                            </svg>
                                            <div className="text-sm text-gray-500 mb-2">
                                                Drag and drop your resume/CV here or
                                            </div>
                                            <Button variant="outline" size="sm" className="text-[#e85c2c]">
                                                Browse Files
                                            </Button>
                                            <input type="file" className="hidden" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="coverLetter" className="block text-sm font-medium mb-1">
                                            Cover Letter
                                        </label>
                                        <Textarea
                                            id="coverLetter"
                                            placeholder="Tell us why you're interested in this position and what you'll bring to our team."
                                            rows={4}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="linkedIn" className="block text-sm font-medium mb-1">
                                            LinkedIn Profile
                                        </label>
                                        <Input id="linkedIn" type="url" placeholder="https://linkedin.com/in/johndoe" />
                                    </div>

                                    <div>
                                        <label htmlFor="portfolioWebsite" className="block text-sm font-medium mb-1">
                                            Portfolio/Website
                                        </label>
                                        <Input id="portfolioWebsite" type="url" placeholder="https://yourwebsite.com" />
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <Checkbox id="termsConditions" className="mt-1" />
                                        <label htmlFor="termsConditions" className="text-sm text-gray-700">
                                            I consent to Restaurant AI storing and processing my data for recruitment purposes. I have read and accept the <Link href="/privacy" className="text-[#e85c2c] hover:underline">Privacy Policy</Link>.
                                        </label>
                                    </div>

                                    <Button className="w-full bg-[#e85c2c] hover:bg-[#d04a1d] text-white">
                                        Submit Application
                                    </Button>
                                </form>
                            </div>

                            {/* Similar Jobs */}
                            {similarJobs.length > 0 && (
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <h3 className="text-lg font-bold mb-4">Similar Positions</h3>
                                    <div className="space-y-4">
                                        {similarJobs.map((similarJob) => (
                                            <Link href={`/careers/${similarJob.id}`} key={similarJob.id} className="block group">
                                                <div className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors">
                                                    <h4 className="font-bold group-hover:text-[#e85c2c] transition-colors">
                                                        {similarJob.title}
                                                    </h4>
                                                    <div className="text-sm text-gray-600 mt-1 mb-2">
                                                        {similarJob.department} • {similarJob.location}
                                                    </div>
                                                    <div className="text-sm text-[#e85c2c] font-medium inline-flex items-center">
                                                        View Position
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
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Job Sharing */}
                <div className="mt-12 mb-16 bg-white p-6 rounded-xl shadow-sm">
                    <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold mb-1">Know someone perfect for this job?</h3>
                            <p className="text-gray-600">Share this job opening with your network</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-3">
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
            </main>

            <Footer />
        </div>
    )
} 