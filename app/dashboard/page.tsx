"use client";

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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    companyId: number | null;
    jobTitle: string | null;
    phoneNumber: string | null;
    createdAt: string;
}

interface Company {
    id: number;
    name: string;
    industry: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    country: string | null;
    businessSize: string | null;
    numberOfLocations: number | null;
    taxId: string | null;
    businessRegistration: string | null;
    expectedOrderVolume: string | null;
    createdAt: string;
    updatedAt: string;
}

interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: string;
    statusColor: string;
}

interface Subscription {
    plan: string;
    status: string;
    nextBillingDate: string;
    amount: string;
    features: string[];
}

export default function DashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [company, setCompany] = useState<Company | null>(null);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [supportTickets, setSupportTickets] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [subscription, setSubscription] = useState<Subscription>({
        plan: "Basic",
        status: "Active",
        nextBillingDate: "Next month",
        amount: "$0",
        features: [
            "Online Ordering System",
            "Basic Menu Management",
            "1 Staff Account"
        ]
    });

    // Downloads (this could be fetched from API in the future)
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

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);

                // Fetch user data
                const userResponse = await fetch('/api/auth/me');
                if (!userResponse.ok) {
                    if (userResponse.status === 401) {
                        // Not authenticated
                        router.push('/signin');
                        return;
                    }
                    throw new Error('Failed to fetch user data');
                }

                const userData = await userResponse.json();
                setUser(userData.user);
                setCompany(userData.company);

                console.log("User data loaded:", userData.user);

                // If user has companyId, fetch subscription data
                if (userData.user?.id) {
                    try {
                        // Fetch subscription data using real endpoint
                        console.log("Fetching subscription data for user:", userData.user.id);
                        const subscriptionResponse = await fetch(`/api/user/subscription?userId=${userData.user.id}`);
                        if (subscriptionResponse.ok) {
                            const subscriptionData = await subscriptionResponse.json();
                            console.log("Subscription data:", subscriptionData);

                            if (subscriptionData.hasSubscription && subscriptionData.subscription?.package) {
                                const pkg = subscriptionData.subscription.package;
                                const sub = subscriptionData.subscription.subscription;

                                // Parse features from string to array
                                let featuresArray: string[] = [];
                                try {
                                    featuresArray = JSON.parse(pkg.features || '[]');
                                } catch (e) {
                                    console.error('Error parsing features:', e);
                                    featuresArray = pkg.features?.split(',') || [];
                                }

                                setSubscription({
                                    plan: pkg.name,
                                    status: sub.status,
                                    nextBillingDate: new Date(sub.endDate).toLocaleDateString(),
                                    amount: `$${(pkg.price / 100).toFixed(2)}`,
                                    features: featuresArray
                                });
                            }
                        } else {
                            console.error("Failed to fetch subscription data:", await subscriptionResponse.text());
                        }
                    } catch (error) {
                        console.error("Error fetching subscription data:", error);
                    }

                    try {
                        // Fetch invoices data using real endpoint
                        console.log("Fetching invoices data for user:", userData.user.id);
                        const invoicesResponse = await fetch(`/api/user/invoices?userId=${userData.user.id}`);
                        if (invoicesResponse.ok) {
                            const invoicesData = await invoicesResponse.json();
                            console.log("Invoices data:", invoicesData);

                            // Transform Stripe invoices to our format
                            if (invoicesData.invoices && invoicesData.invoices.length > 0) {
                                const formattedInvoices = invoicesData.invoices.map((invoice: any) => ({
                                    id: invoice.id,
                                    date: new Date(invoice.created * 1000).toLocaleDateString(),
                                    amount: `$${(invoice.amount_paid / 100).toFixed(2)}`,
                                    status: invoice.status === 'paid' ? 'Paid' : invoice.status,
                                    statusColor: invoice.status === 'paid'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                }));

                                setInvoices(formattedInvoices);
                            }
                        } else {
                            console.error("Failed to fetch invoices data:", await invoicesResponse.text());
                        }
                    } catch (error) {
                        console.error("Error fetching invoices data:", error);
                    }

                    try {
                        // Fetch support tickets data
                        console.log("Fetching support tickets for user:", userData.user.id);
                        const ticketsResponse = await fetch(`/api/user/tickets?userId=${userData.user.id}`);
                        if (ticketsResponse.ok) {
                            const ticketsData = await ticketsResponse.json();
                            console.log("Tickets data:", ticketsData);

                            if (ticketsData.tickets && ticketsData.tickets.length > 0) {
                                const formattedTickets = ticketsData.tickets.map((ticket: any) => ({
                                    id: ticket.id,
                                    subject: ticket.subject,
                                    date: new Date(ticket.createdAt).toLocaleDateString(),
                                    status: ticket.status,
                                    statusColor: ticket.status === 'Open'
                                        ? 'bg-blue-100 text-blue-800'
                                        : ticket.status === 'In Progress'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-gray-100 text-gray-800',
                                    priority: ticket.priority || 'Medium'
                                }));

                                setSupportTickets(formattedTickets);
                            }
                        } else {
                            console.error("Failed to fetch tickets data:", await ticketsResponse.text());
                        }
                    } catch (error) {
                        console.error("Error fetching tickets data:", error);
                    }

                    try {
                        // Fetch notifications data
                        console.log("Fetching notifications for user:", userData.user.id);
                        const notificationsResponse = await fetch(`/api/user/notifications?userId=${userData.user.id}`);
                        if (notificationsResponse.ok) {
                            const notificationsData = await notificationsResponse.json();
                            console.log("Notifications data:", notificationsData);

                            if (notificationsData.notifications && notificationsData.notifications.length > 0) {
                                const formattedNotifications = notificationsData.notifications.map((notification: any) => ({
                                    id: notification.id,
                                    title: notification.title,
                                    description: notification.content,
                                    time: formatTimeAgo(new Date(notification.createdAt)),
                                    read: notification.read === true
                                }));

                                setNotifications(formattedNotifications);
                            } else {
                                // Default notification if none exist
                                setNotifications([
                                    {
                                        id: 1,
                                        title: "Subscription Renewal",
                                        description: "Your subscription will renew in 15 days. Please update payment method if needed.",
                                        time: "2 days ago",
                                        read: false,
                                    }
                                ]);
                            }
                        } else {
                            console.error("Failed to fetch notifications data:", await notificationsResponse.text());
                        }
                    } catch (error) {
                        console.error("Error fetching notifications data:", error);
                    }
                } else {
                    console.error("User ID not found in response:", userData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    // Helper function to format time ago
    const formatTimeAgo = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffDays > 7) {
            return date.toLocaleDateString();
        } else if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-700">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Page header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, {user?.name || 'User'}!</p>
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
                                    {invoices.length > 0 ? invoices.map((invoice, index) => (
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
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="py-3 text-center text-sm text-gray-500">
                                                No invoices found
                                            </td>
                                        </tr>
                                    )}
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
                                {supportTickets.length > 0 ? supportTickets.map((ticket, index) => (
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
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="py-3 text-center text-sm text-gray-500">
                                            No support tickets found
                                        </td>
                                    </tr>
                                )}
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

                {/* Company Information */}
                <Card className="md:col-span-2 hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                        <CardDescription>Details about your business</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {company ? (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium">Company Name:</span>
                                        <span className="text-sm">{company.name}</span>
                                    </div>
                                    {company.industry && (
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">Industry:</span>
                                            <span className="text-sm">{company.industry}</span>
                                        </div>
                                    )}
                                    {company.businessSize && (
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">Business Size:</span>
                                            <span className="text-sm">{company.businessSize}</span>
                                        </div>
                                    )}
                                    {company.address && (
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">Address:</span>
                                            <span className="text-sm">
                                                {company.address}, {company.city}, {company.state} {company.postalCode}, {company.country}
                                            </span>
                                        </div>
                                    )}
                                    <div className="border-t pt-4 mt-4">
                                        <Link href="/dashboard/profile" className="text-blue-600 hover:underline text-sm font-medium">
                                            Update Company Information
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-gray-500 mb-4">No company information available</p>
                                    <Button size="sm">
                                        Add Company Details
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 