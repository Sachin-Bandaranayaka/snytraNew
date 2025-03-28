import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SupportPage() {
    // FAQs
    const faqs = [
        {
            question: "How do I update my subscription plan?",
            answer:
                "You can update your subscription plan by going to the 'My Subscription' page and clicking on the 'Change Plan' button. From there, you can choose a new plan that better fits your needs.",
            category: "Billing & Subscription",
        },
        {
            question: "How do I add or update payment methods?",
            answer:
                "To add or update your payment methods, navigate to the 'Billing' page, scroll down to the 'Payment Methods' section, and click on 'Add New Payment Method'. You can also edit or delete existing payment methods from the same page.",
            category: "Billing & Subscription",
        },
        {
            question: "What happens if I miss a payment?",
            answer:
                "If a payment attempt fails, we'll automatically retry the payment several times over the course of a week. During this time, your service will continue without interruption. You'll receive email notifications about the failed payment with instructions on how to update your payment method.",
            category: "Billing & Subscription",
        },
        {
            question: "How do I integrate with my existing POS system?",
            answer:
                "We support integration with most major POS systems. To get started, download our POS Connector Utility from the Downloads page. The utility includes step-by-step instructions for connecting to your specific POS system. If you encounter any issues, please submit a support ticket.",
            category: "Technical",
        },
        {
            question: "How do I create and customize restaurant menus?",
            answer:
                "You can create and customize your menu by navigating to the Menu section in the main dashboard. Click 'Add Item' to create new menu items, or click on existing items to edit them. You can organize items into categories, add images, set prices, and include descriptions.",
            category: "Usage",
        },
        {
            question: "How do I reset my password?",
            answer:
                "If you're logged in, go to your Profile settings to change your password. If you've forgotten your password, click on the 'Forgot Password' link on the login page, and we'll send you instructions to reset it to the email address associated with your account.",
            category: "Account",
        },
        {
            question: "Can I use the system on multiple devices?",
            answer:
                "Yes, you can access your account from any device with an internet connection. We offer apps for web, iOS, and Android. Your data syncs automatically across all devices, so you'll always have the most up-to-date information.",
            category: "Technical",
        },
        {
            question: "How do I add staff members to my account?",
            answer:
                "To add staff members, go to the 'Settings' page and select the 'Staff Management' tab. Click on 'Add Staff Member' and enter their email address and role. They'll receive an invitation to create their account with limited access based on the role you assigned.",
            category: "Account",
        },
    ];

    // Support options
    const supportOptions = [
        {
            title: "Submit a Ticket",
            description: "Create a new support ticket for our team to assist you",
            icon: (
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
                    className="text-blue-500"
                >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
            ),
            link: "/dashboard/tickets",
            buttonText: "Create Ticket",
        },
        {
            title: "Live Chat",
            description: "Chat with our support team for immediate assistance",
            icon: (
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
                    className="text-green-500"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <line x1="9" y1="10" x2="15" y2="10" />
                    <line x1="12" y1="7" x2="12" y2="13" />
                </svg>
            ),
            link: "#",
            buttonText: "Start Chat",
        },
        {
            title: "Email Support",
            description: "Send us an email and we'll get back to you within 24 hours",
            icon: (
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
                    className="text-purple-500"
                >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            ),
            link: "mailto:support@restaurantai.com",
            buttonText: "Email Us",
        },
        {
            title: "Phone Support",
            description: "Speak directly with our support team",
            icon: (
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
                    className="text-orange-500"
                >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
            ),
            link: "tel:+1-800-123-4567",
            buttonText: "Call Us",
        },
    ];

    // Help resources
    const helpResources = [
        {
            title: "User Guide",
            description: "Complete guide to using the Restaurant AI platform",
            link: "/dashboard/downloads",
            icon: (
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
                    className="text-red-500"
                >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                </svg>
            ),
        },
        {
            title: "Video Tutorials",
            description: "Step-by-step video guides for common tasks",
            link: "https://youtube.com/restaurantai",
            icon: (
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
                    className="text-red-600"
                >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                </svg>
            ),
        },
        {
            title: "Knowledge Base",
            description: "Browse our extensive collection of help articles",
            link: "https://help.restaurantai.com",
            icon: (
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
                    className="text-blue-500"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                </svg>
            ),
        },
        {
            title: "Community Forum",
            description: "Connect with other users and share tips",
            link: "https://community.restaurantai.com",
            icon: (
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
                    className="text-green-500"
                >
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    <line x1="6" x2="14" y1="17" y2="17" />
                </svg>
            ),
        },
    ];

    return (
        <div>
            {/* Page header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Help & Support</h1>
                    <p className="text-gray-500">Get assistance with your Restaurant AI platform</p>
                </div>
            </div>

            {/* Support cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {supportOptions.map((option, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                {option.icon}
                                <CardTitle className="text-lg">{option.title}</CardTitle>
                            </div>
                            <CardDescription>{option.description}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Link href={option.link}>
                                <Button variant="default" className="w-full">
                                    {option.buttonText}
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Help Resources */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Self-Help Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {helpResources.map((resource, index) => (
                        <Card key={index} className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="p-3 bg-gray-100 rounded-full mb-4">
                                        {resource.icon}
                                    </div>
                                    <h3 className="font-medium mb-2">{resource.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{resource.description}</p>
                                    <Button variant="outline" asChild>
                                        <Link href={resource.link}>View Resource</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription>
                            Find quick answers to common questions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium mb-3 text-blue-600">
                                    Billing & Subscription
                                </h3>
                                <Accordion type="single" collapsible className="w-full">
                                    {faqs
                                        .filter((faq) => faq.category === "Billing & Subscription")
                                        .map((faq, index) => (
                                            <AccordionItem key={index} value={`billing-${index}`}>
                                                <AccordionTrigger className="text-left">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-gray-600">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                </Accordion>

                                <h3 className="font-medium mb-3 mt-6 text-blue-600">
                                    Account
                                </h3>
                                <Accordion type="single" collapsible className="w-full">
                                    {faqs
                                        .filter((faq) => faq.category === "Account")
                                        .map((faq, index) => (
                                            <AccordionItem key={index} value={`account-${index}`}>
                                                <AccordionTrigger className="text-left">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-gray-600">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                </Accordion>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3 text-blue-600">
                                    Technical
                                </h3>
                                <Accordion type="single" collapsible className="w-full">
                                    {faqs
                                        .filter((faq) => faq.category === "Technical")
                                        .map((faq, index) => (
                                            <AccordionItem key={index} value={`technical-${index}`}>
                                                <AccordionTrigger className="text-left">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-gray-600">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                </Accordion>

                                <h3 className="font-medium mb-3 mt-6 text-blue-600">
                                    Usage
                                </h3>
                                <Accordion type="single" collapsible className="w-full">
                                    {faqs
                                        .filter((faq) => faq.category === "Usage")
                                        .map((faq, index) => (
                                            <AccordionItem key={index} value={`usage-${index}`}>
                                                <AccordionTrigger className="text-left">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-gray-600">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                </Accordion>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t flex justify-center pt-6">
                        <p className="text-sm text-gray-500">
                            Can't find what you're looking for?{" "}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="link" className="p-0 h-auto">
                                        Contact our support team
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Contact Support</DialogTitle>
                                        <DialogDescription>
                                            Fill out the form below and we'll get back to you as soon as possible.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <label htmlFor="name" className="text-sm font-medium">
                                                    Name
                                                </label>
                                                <Input id="name" />
                                            </div>
                                            <div className="grid gap-2">
                                                <label htmlFor="email" className="text-sm font-medium">
                                                    Email
                                                </label>
                                                <Input id="email" type="email" />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <label htmlFor="subject" className="text-sm font-medium">
                                                Subject
                                            </label>
                                            <Input id="subject" />
                                        </div>
                                        <div className="grid gap-2">
                                            <label htmlFor="message" className="text-sm font-medium">
                                                Message
                                            </label>
                                            <Textarea
                                                id="message"
                                                rows={5}
                                                placeholder="Please describe your issue in detail"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Send Message</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
} 