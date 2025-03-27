import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CareersPage() {
    // Sample jobs data - in a real implementation, this would be fetched from database
    const jobs = [
        {
            id: 1,
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
            ]
        },
        {
            id: 2,
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
            ]
        },
        {
            id: 3,
            title: "Product Manager",
            department: "Product",
            location: "New York, NY (Hybrid)",
            type: "Full Time",
            postedDate: "March 5, 2023",
            description: "We're seeking a Product Manager to lead the development and go-to-market strategy for our restaurant technology products. You'll work closely with engineering, design, marketing, and sales teams to ensure we're building products that solve real customer problems.",
            responsibilities: [
                "Define product vision, strategy, and roadmap based on market research and customer feedback",
                "Gather and prioritize product requirements and create detailed product specifications",
                "Work closely with engineering and design teams throughout the product development lifecycle",
                "Analyze market trends and competition to inform product decisions",
                "Collaborate with marketing and sales to develop go-to-market strategies"
            ],
            requirements: [
                "3+ years of experience in product management",
                "Strong understanding of technology and software development processes",
                "Excellent analytical, communication, and presentation skills",
                "Experience with agile development methodologies",
                "Bachelor's degree in Business, Computer Science, or related field"
            ]
        },
        {
            id: 4,
            title: "Customer Success Manager",
            department: "Customer Success",
            location: "Chicago, IL (Hybrid)",
            type: "Full Time",
            postedDate: "March 3, 2023",
            description: "We're looking for a Customer Success Manager to ensure our restaurant clients achieve their desired outcomes with our technology solutions. You'll be responsible for building relationships, driving product adoption, and ensuring high retention rates.",
            responsibilities: [
                "Serve as the primary point of contact for a portfolio of key restaurant clients",
                "Develop strong relationships with clients and understand their business goals",
                "Create and execute customer success plans to drive product adoption and satisfaction",
                "Monitor customer health metrics and proactively address potential issues",
                "Collaborate with product, sales, and support teams to ensure customer success"
            ],
            requirements: [
                "3+ years of experience in customer success or account management",
                "Strong communication, presentation, and relationship-building skills",
                "Experience with CRM systems and customer success tools",
                "Understanding of SaaS business models and customer lifecycle",
                "Bachelor's degree in Business, Communications, or related field"
            ]
        },
        {
            id: 5,
            title: "UX/UI Designer",
            department: "Design",
            location: "Remote (US)",
            type: "Full Time",
            postedDate: "February 28, 2023",
            description: "We're seeking a talented UX/UI Designer to create intuitive and engaging experiences for our restaurant technology products. You'll work closely with product and engineering teams to design user-centered interfaces that solve complex problems in simple ways.",
            responsibilities: [
                "Create wireframes, prototypes, and high-fidelity designs for web and mobile applications",
                "Conduct user research and usability testing to inform design decisions",
                "Develop and maintain design systems and style guides",
                "Collaborate with product managers and engineers to implement designs",
                "Stay current with UX trends and best practices"
            ],
            requirements: [
                "3+ years of experience in UX/UI design",
                "Proficiency in design tools such as Figma, Sketch, or Adobe XD",
                "Strong portfolio demonstrating user-centered design process",
                "Experience with responsive design and mobile interfaces",
                "Excellent visual design skills and attention to detail"
            ]
        },
        {
            id: 6,
            title: "Sales Development Representative",
            department: "Sales",
            location: "Austin, TX (Hybrid)",
            type: "Full Time",
            postedDate: "February 25, 2023",
            description: "We're looking for a Sales Development Representative to generate and qualify leads for our restaurant technology solutions. You'll be responsible for outbound prospecting, initial conversations with potential clients, and setting up meetings for our Account Executives.",
            responsibilities: [
                "Conduct outbound prospecting via email, phone, and social media",
                "Qualify inbound leads based on established criteria",
                "Schedule meetings between qualified prospects and Account Executives",
                "Maintain accurate records in CRM system",
                "Achieve monthly quotas for qualified meetings and opportunities"
            ],
            requirements: [
                "1+ years of experience in sales development or similar role",
                "Strong communication and interpersonal skills",
                "Experience with CRM systems and sales tools",
                "Ability to understand and articulate value propositions",
                "Bachelor's degree in Business, Marketing, or related field"
            ]
        },
        {
            id: 7,
            title: "DevOps Engineer",
            department: "Engineering",
            location: "San Francisco, CA (Hybrid)",
            type: "Full Time",
            postedDate: "February 20, 2023",
            description: "We're seeking a DevOps Engineer to help us build and maintain our cloud infrastructure and deployment pipelines. You'll work on automating processes, ensuring system reliability, and optimizing our development workflow.",
            responsibilities: [
                "Design, build, and maintain cloud infrastructure on AWS",
                "Implement and manage CI/CD pipelines",
                "Monitor system performance and troubleshoot issues",
                "Collaborate with development teams to streamline deployment processes",
                "Implement security best practices and ensure compliance"
            ],
            requirements: [
                "3+ years of experience in DevOps or SRE roles",
                "Strong knowledge of AWS services and infrastructure as code",
                "Experience with CI/CD tools such as Jenkins, GitHub Actions, or CircleCI",
                "Familiarity with containerization and orchestration technologies",
                "Excellent problem-solving abilities and documentation skills"
            ]
        },
        {
            id: 8,
            title: "Marketing Manager",
            department: "Marketing",
            location: "New York, NY (Hybrid)",
            type: "Full Time",
            postedDate: "February 15, 2023",
            description: "We're looking for a Marketing Manager to develop and execute marketing strategies for our restaurant technology products. You'll be responsible for demand generation, content marketing, and brand awareness initiatives.",
            responsibilities: [
                "Develop and implement marketing campaigns across various channels",
                "Create compelling content for website, blog, social media, and email",
                "Manage digital marketing initiatives including SEO, SEM, and social media",
                "Track and analyze marketing metrics to optimize campaigns",
                "Collaborate with product and sales teams to align messaging and goals"
            ],
            requirements: [
                "3+ years of experience in B2B marketing",
                "Strong writing and content creation skills",
                "Experience with marketing automation and analytics tools",
                "Knowledge of digital marketing strategies and best practices",
                "Bachelor's degree in Marketing, Communications, or related field"
            ]
        }
    ];

    // Get unique departments and locations for filtering
    const departments = [...new Set(jobs.map(job => job.department))];
    const locations = [...new Set(jobs.map(job => job.location))];

    return (
        <div className="bg-[#f8f5eb] min-h-screen">
            <Navbar />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-16">
                {/* Careers Header */}
                <section className="mb-16 text-center">
                    <div className="inline-block bg-orange-100 text-[#e85c2c] px-4 py-1 rounded-full text-sm font-medium mb-4">
                        Join Our Team
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">
                        Careers at Restaurant AI
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg mb-8">
                        Help us revolutionize the restaurant industry with innovative AI solutions
                    </p>
                </section>

                {/* Our Values */}
                <section className="mb-20">
                    <div className="bg-white rounded-xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#e85c2c"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 2v4"></path>
                                        <path d="m4.93 6.93 2.83 2.83"></path>
                                        <path d="M2 12h4"></path>
                                        <path d="m4.93 17.07 2.83-2.83"></path>
                                        <path d="M12 18v4"></path>
                                        <path d="m17.07 17.07-2.83-2.83"></path>
                                        <path d="M18 12h4"></path>
                                        <path d="m17.07 6.93-2.83 2.83"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                                <p className="text-gray-600">
                                    We're constantly pushing boundaries and exploring new technologies to solve complex problems in the restaurant industry.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#e85c2c"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                                <p className="text-gray-600">
                                    We believe in the power of diverse perspectives and work together across teams to achieve our shared mission.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#e85c2c"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                                        <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                                        <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                                        <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                                        <path d="m7 8 10 8"></path>
                                        <path d="m7 16 10-8"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Impact</h3>
                                <p className="text-gray-600">
                                    We're committed to creating meaningful change for restaurants, helping them thrive in a challenging industry.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Job Listings */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8">Open Positions</h2>

                    {/* Filters */}
                    <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Department</label>
                                <select className="w-full p-2 border rounded-lg">
                                    <option value="">All Departments</option>
                                    {departments.map((department, index) => (
                                        <option key={index} value={department}>{department}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Location</label>
                                <select className="w-full p-2 border rounded-lg">
                                    <option value="">All Locations</option>
                                    {locations.map((location, index) => (
                                        <option key={index} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Job Type</label>
                                <select className="w-full p-2 border rounded-lg">
                                    <option value="">All Types</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Job List */}
                    <div className="space-y-6">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                                            <div className="text-gray-600 text-sm">{job.department} • {job.location} • {job.type}</div>
                                        </div>
                                        <div className="mt-4 md:mt-0">
                                            <div className="text-sm text-gray-500 mb-2">Posted on {job.postedDate}</div>
                                            <Link href={`/careers/${job.id}`}>
                                                <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white">View Details</Button>
                                            </Link>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4">{job.description}</p>
                                    <div className="text-sm">
                                        <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {job.responsibilities.slice(0, 3).map((responsibility, index) => (
                                                <li key={index} className="text-gray-600">{responsibility}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Benefits */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 text-center">Why Work With Us</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#e85c2c"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Continuous Learning</h3>
                            <p className="text-gray-600">
                                We offer learning stipends, conference attendance, and regular knowledge-sharing sessions.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#e85c2c"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 6v6l4 2"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Flexible Schedule</h3>
                            <p className="text-gray-600">
                                We focus on results, not hours. Enjoy flexible work schedules and remote options.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#e85c2c"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Comprehensive Benefits</h3>
                            <p className="text-gray-600">
                                Health, dental, vision insurance, 401(k) matching, and generous PTO.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-3 rounded-lg inline-block mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#e85c2c"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Career Growth</h3>
                            <p className="text-gray-600">
                                Clear paths for advancement, mentorship opportunities, and leadership development.
                            </p>
                        </div>
                    </div>
                </section>

                {/* No Positions? */}
                <section className="mb-16 bg-white p-8 rounded-xl shadow-sm">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">Don't See a Position That Fits?</h2>
                        <p className="text-gray-600 mb-6">
                            We're always interested in connecting with talented individuals. Send us your resume and tell us how you can contribute to our mission.
                        </p>
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white px-8 py-6">
                            Submit Your Resume
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
} 