import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import DashboardNavbar from "@/components/dashboard/navbar"
import DashboardSidebar from "@/components/dashboard/sidebar"

export default function DashboardPage() {
    // Subscription details
    const subscription = {
        plan: "Pro",
        status: "Active",
        nextBillingDate: "May 15, 2023",
        amount: "$49.99",
        features: [
            "Online Ordering System",
            "AI Calling Assistant",
            "WhatsApp Integration",
            "SMS Marketing",
            "5 Staff Accounts"
        ]
    };

    // Billing summary
    const billingHistory = [
        {
            id: "INV-2023-05",
            date: "April 15, 2023",
            amount: "$49.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
        },
        {
            id: "INV-2023-04",
            date: "March 15, 2023",
            amount: "$49.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
        },
        {
            id: "INV-2023-03",
            date: "February 15, 2023",
            amount: "$39.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
        },
    ];

    // Support tickets
    const supportTickets = [
        {
            id: "TKT-1285",
            subject: "Integration with POS system",
            date: "Today, 2:30 PM",
            status: "Open",
            statusColor: "bg-blue-100 text-blue-800",
            priority: "Medium"
        },
        {
            id: "TKT-1278",
            subject: "Question about billing",
            date: "April 02, 2023",
            status: "Closed",
            statusColor: "bg-gray-100 text-gray-800",
            priority: "Low"
        },
    ];

    // Downloads
    const downloads = [
        {
            title: "Restaurant AI User Guide",
            type: "PDF",
            size: "2.4 MB",
            date: "Updated April 10, 2023"
        },
        {
            title: "Integration API Documentation",
            type: "PDF",
            size: "1.8 MB",
            date: "Updated March 25, 2023"
        },
        {
            title: "Mobile App Setup Guide",
            type: "PDF",
            size: "3.1 MB",
            date: "Updated April 5, 2023"
        },
    ];

    // Recent notifications
    const notifications = [
        {
            id: 1,
            title: "Subscription Renewal",
            description: "Your subscription will renew in 15 days. Please update payment method if needed.",
            time: "2 days ago",
            read: false,
        },
        {
            id: 2,
            title: "Support Ticket Update",
            description: "Your ticket #TKT-1278 has been resolved. Please review and close if satisfied.",
            time: "3 days ago",
            read: false,
        },
        {
            id: 3,
            title: "New Feature Available",
            description: "QR Code ordering is now available in your package. Check it out!",
            time: "1 week ago",
            read: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNavbar />

            <div className="flex">
                <DashboardSidebar />

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Page header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-gray-500">Welcome back, Restaurant Owner!</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button variant="outline">Download Invoice</Button>
                            <Button>Create Support Ticket</Button>
                        </div>
                    </div>

                    {/* Subscription Summary */}
                    <Card className="mb-8">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Current Subscription</CardTitle>
                                <Button variant="outline" size="sm">
                                    Manage Subscription
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-2">
                                        {subscription.plan}
                                    </span>
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        {subscription.status}
                                    </span>
                                </div>
                                <div className="mt-4 md:mt-0 text-sm">
                                    <span className="text-gray-500">Next billing: </span>
                                    <span className="font-medium">{subscription.nextBillingDate} • {subscription.amount}/month</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {subscription.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-green-500"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main content area */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Recent Invoices */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Recent Invoices</CardTitle>
                                    <Link href="/dashboard/invoices" className="text-sm text-blue-600 hover:underline">
                                        View All
                                    </Link>
                                </div>
                                <CardDescription>
                                    Your billing history
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-xs font-medium text-gray-500 border-b">
                                                <th className="pb-3 text-left">Invoice ID</th>
                                                <th className="pb-3 text-left">Date</th>
                                                <th className="pb-3 text-left">Amount</th>
                                                <th className="pb-3 text-left">Status</th>
                                                <th className="pb-3 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {billingHistory.map((invoice, index) => (
                                                <tr key={index} className="border-b border-gray-100 last:border-none">
                                                    <td className="py-3 text-sm font-medium">
                                                        {invoice.id}
                                                    </td>
                                                    <td className="py-3 text-sm text-gray-500">
                                                        {invoice.date}
                                                    </td>
                                                    <td className="py-3 text-sm">{invoice.amount}</td>
                                                    <td className="py-3 text-sm">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${invoice.statusColor}`}
                                                        >
                                                            {invoice.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 text-sm">
                                                        <Button variant="ghost" size="sm" className="h-8">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="18"
                                                                height="18"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="mr-1"
                                                            >
                                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                                <polyline points="7 10 12 15 17 10" />
                                                                <line x1="12" y1="15" x2="12" y2="3" />
                                                            </svg>
                                                            PDF
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Notifications</CardTitle>
                                    <Button variant="ghost" size="sm" className="h-auto p-0 text-sm text-blue-600 hover:text-blue-800">
                                        Mark all as read
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start ${!notification.read ? "bg-blue-50 -mx-2 p-2 rounded-md" : ""
                                                }`}
                                        >
                                            <div
                                                className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${!notification.read ? "bg-blue-500" : "bg-gray-200"
                                                    }`}
                                            ></div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium">{notification.title}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {notification.description}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t pt-4 flex justify-center">
                                <Button variant="ghost" size="sm" className="text-sm w-full">
                                    View All Notifications
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Support Tickets */}
                    <Card className="mb-8">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Support Tickets</CardTitle>
                                <Link href="/dashboard/tickets" className="text-sm text-blue-600 hover:underline">
                                    View All Tickets
                                </Link>
                            </div>
                            <CardDescription>
                                Your recent support requests
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-xs font-medium text-gray-500 border-b">
                                            <th className="pb-3 text-left">Ticket ID</th>
                                            <th className="pb-3 text-left">Subject</th>
                                            <th className="pb-3 text-left">Date</th>
                                            <th className="pb-3 text-left">Status</th>
                                            <th className="pb-3 text-left">Priority</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {supportTickets.map((ticket, index) => (
                                            <tr key={index} className="border-b border-gray-100 last:border-none">
                                                <td className="py-3 text-sm font-medium">
                                                    {ticket.id}
                                                </td>
                                                <td className="py-3 text-sm">{ticket.subject}</td>
                                                <td className="py-3 text-sm text-gray-500">
                                                    {ticket.date}
                                                </td>
                                                <td className="py-3 text-sm">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.statusColor}`}
                                                    >
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-sm">{ticket.priority}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex justify-start">
                            <Button>
                                Create New Ticket
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Downloads */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Downloads</CardTitle>
                                <CardDescription>Access documentation and resources</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {downloads.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-blue-100 rounded">
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
                                                        className="text-blue-600"
                                                    >
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                        <path d="M14 2v6h6" />
                                                        <path d="M16 13H8" />
                                                        <path d="M16 17H8" />
                                                        <path d="M10 9H8" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{item.title}</p>
                                                    <p className="text-xs text-gray-500">{item.type} • {item.size} • {item.date}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="h-8">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-1"
                                                >
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="7 10 12 15 17 10" />
                                                    <line x1="12" y1="15" x2="12" y2="3" />
                                                </svg>
                                                Download
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Support */}
                        <Card className="md:col-span-2 hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center justify-center text-center mb-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-blue-500 mb-4"
                                    >
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                    </svg>
                                    <h3 className="text-lg font-medium mb-2">Need Help?</h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Our support team is available 24/7 to assist you with any questions or issues you might have.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                                        <Button variant="outline" className="w-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2"
                                            >
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                            </svg>
                                            Call Us
                                        </Button>
                                        <Button className="w-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2"
                                            >
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                            </svg>
                                            Live Chat
                                        </Button>
                                    </div>
                                </div>
                                <div className="border-t pt-4 text-center">
                                    <p className="text-sm text-gray-500 mb-2">Email us directly</p>
                                    <a href="mailto:support@restaurantai.com" className="text-blue-600 hover:underline text-sm font-medium">
                                        support@restaurantai.com
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
} 