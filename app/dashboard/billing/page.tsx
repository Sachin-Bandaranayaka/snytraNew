import Link from "next/link";
import Image from "next/image";
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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import DashboardNavbar from "@/components/dashboard/navbar";
import DashboardSidebar from "@/components/dashboard/sidebar";

export default function BillingPage() {
    // Billing summary
    const billingSummary = {
        nextBillingDate: "May 15, 2023",
        amount: "$49.99",
        plan: "Pro",
        status: "Active",
    };

    // Payment methods
    const paymentMethods = [
        {
            id: "pm_1234567890",
            type: "Visa",
            last4: "4242",
            expMonth: "12",
            expYear: "2024",
            isDefault: true,
        },
        {
            id: "pm_0987654321",
            type: "Mastercard",
            last4: "5555",
            expMonth: "08",
            expYear: "2025",
            isDefault: false,
        },
    ];

    // Billing history
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
        {
            id: "INV-2023-02",
            date: "January 15, 2023",
            amount: "$39.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
        },
        {
            id: "INV-2023-01",
            date: "December 15, 2022",
            amount: "$29.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
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
                            <h1 className="text-2xl font-bold">Billing</h1>
                            <p className="text-gray-500">Manage your payment methods and billing preferences</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button>Add Payment Method</Button>
                        </div>
                    </div>

                    <Tabs defaultValue="payment-methods" className="mb-8">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                            <TabsTrigger value="billing-history">Billing History</TabsTrigger>
                        </TabsList>

                        {/* Payment Methods Tab */}
                        <TabsContent value="payment-methods">
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Billing Summary</CardTitle>
                                        <CardDescription>Your current subscription and next payment</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Next Billing Date</h3>
                                                <p className="font-medium">{billingSummary.nextBillingDate}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Amount</h3>
                                                <p className="font-medium">{billingSummary.amount}/month</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Plan</h3>
                                                <p className="font-medium">{billingSummary.plan}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {billingSummary.status}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Methods</CardTitle>
                                        <CardDescription>Manage your saved payment methods</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {paymentMethods.map((method) => (
                                                <div key={method.id} className="flex items-center justify-between border p-4 rounded-lg">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0">
                                                            {method.type === "Visa" && (
                                                                <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="48" height="32" rx="4" fill="#EDF2F7" />
                                                                    <path d="M18.435 21.5H15.2133L17.0292 10.5H20.2508L18.435 21.5Z" fill="#2A2A6C" />
                                                                    <path d="M27.91 10.7017C27.2117 10.4683 26.1133 10.2333 24.7883 10.2333C21.8367 10.2333 19.7617 11.7667 19.745 13.9667C19.7283 15.6333 21.235 16.5667 22.3517 17.1333C23.5 17.7167 23.9067 18.0833 23.9067 18.5833C23.89 19.3333 22.985 19.6833 22.1483 19.6833C20.9667 19.6833 20.3333 19.5 19.3767 19.1L18.9867 18.9333L18.5633 21.7C19.39 22.0167 20.9333 22.2833 22.5267 22.3C25.6667 22.3 27.7083 20.7833 27.7267 18.4333C27.7433 17.1 26.9083 16.0667 25.1433 15.2167C24.075 14.6833 23.4083 14.3333 23.4083 13.8C23.425 13.3 23.9917 12.8 25.2067 12.8C26.2317 12.7833 26.9767 13.0167 27.5433 13.25L27.8267 13.3833L28.2517 10.7L27.91 10.7017Z" fill="#2A2A6C" />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M33.6774 10.5H31.1774C30.3674 10.5 29.7674 10.7333 29.4191 11.5167L25.1191 21.5H28.2924L28.9341 19.7833H32.5841L32.9008 21.5H35.7424L33.6774 10.5ZM29.8424 17.3667C30.0341 16.8667 31.0341 14.1333 31.0341 14.1333C31.0174 14.1667 31.2924 13.4167 31.4424 12.9333L31.6424 14.0167C31.6424 14.0167 32.2424 16.9333 32.3341 17.3667H29.8424Z" fill="#2A2A6C" />
                                                                    <path d="M14.5892 10.5L11.6375 17.8833L11.3442 16.6333C10.8525 15.0667 9.16921 13.3667 7.3042 12.55L9.98754 21.4833H13.1775L17.7775 10.5H14.5892Z" fill="#2A2A6C" />
                                                                    <path d="M9.00005 11.2167C8.70838 11.0833 8.09171 10.9333 7.34171 10.9333C4.59171 10.9333 2.60005 12.4 2.60005 14.6167C2.60005 16.2833 3.94171 17.2 4.99171 17.7667C6.05005 18.3333 6.38338 18.7 6.38338 19.1833C6.38338 19.9167 5.50838 20.25 4.68338 20.25C3.53338 20.25 2.89171 20.0833 1.91671 19.6833L1.53338 19.5L1.12505 22.1333C1.52505 22.3333 2.54171 22.6333 3.60005 22.65C6.50838 22.65 8.45838 21.2 8.47505 18.8C8.47505 17.4833 7.60838 16.45 6.00005 15.6C5.00838 15.0667 4.41671 14.7 4.41671 14.1333C4.41671 13.6167 5.01671 13.1 6.27505 13.1C7.31671 13.0833 8.06671 13.3167 8.64171 13.5667L8.92505 13.7L9.33338 11.2167" fill="#E79800" />
                                                                </svg>
                                                            )}
                                                            {method.type === "Mastercard" && (
                                                                <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="48" height="32" rx="4" fill="#EDF2F7" />
                                                                    <path d="M30.5833 9.33325H17.4166C13.8333 9.33325 10.9166 12.2499 10.9166 15.8333V16.1666C10.9166 19.7499 13.8333 22.6666 17.4166 22.6666H30.5833C34.1666 22.6666 37.0833 19.7499 37.0833 16.1666V15.8333C37.0833 12.2499 34.1666 9.33325 30.5833 9.33325Z" fill="#F7F9FA" />
                                                                    <path d="M18.5 19.8572C20.4 19.8572 22 18.2571 22 16.3571C22 14.4571 20.5 12.8572 18.5 12.8572C16.6 12.8572 15 14.4571 15 16.3571C15 18.2571 16.5 19.8572 18.5 19.8572Z" fill="#D50000" />
                                                                    <path d="M29.5 19.8572C31.4 19.8572 33 18.2571 33 16.3571C33 14.4571 31.5 12.8572 29.5 12.8572C27.6 12.8572 26 14.4571 26 16.3571C26 18.2571 27.5 19.8572 29.5 19.8572Z" fill="#FF6B00" />
                                                                    <path d="M27.4166 12.8572C28.0833 13.7572 28.4166 14.9572 28.4166 16.1572C28.4166 17.4572 28.0833 18.5572 27.4166 19.4572C26.7499 18.5572 26.4166 17.3572 26.4166 16.1572C26.4166 14.9572 26.7499 13.7572 27.4166 12.8572Z" fill="#FF9300" />
                                                                    <path d="M20.5834 12.8572C21.2501 13.7572 21.5834 14.9572 21.5834 16.1572C21.5834 17.4572 21.2501 18.5572 20.5834 19.4572C19.9168 18.5572 19.5834 17.3572 19.5834 16.1572C19.5834 14.9572 19.9168 13.7572 20.5834 12.8572Z" fill="#D50000" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">{method.type} ending in {method.last4}</p>
                                                            <p className="text-xs text-gray-500">Expires {method.expMonth}/{method.expYear}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        {method.isDefault && (
                                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                                Default
                                                            </span>
                                                        )}
                                                        <Button variant="outline" size="sm">Edit</Button>
                                                        {!method.isDefault && (
                                                            <Button variant="outline" size="sm">Make Default</Button>
                                                        )}
                                                        {!method.isDefault && (
                                                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                                                Remove
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-start">
                                        <Button>Add New Payment Method</Button>
                                    </CardFooter>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Billing Information</CardTitle>
                                        <CardDescription>Your billing address and tax information</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Billing Contact</h3>
                                                <p className="font-medium">John Smith</p>
                                                <p className="text-sm text-gray-500">john.smith@example.com</p>
                                                <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Billing Address</h3>
                                                <p className="text-sm">
                                                    123 Main Street<br />
                                                    Suite 101<br />
                                                    San Francisco, CA 94105<br />
                                                    United States
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline">Update Billing Information</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Billing History Tab */}
                        <TabsContent value="billing-history">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Billing History</CardTitle>
                                            <CardDescription>View and download your past invoices</CardDescription>
                                        </div>
                                        <Link href="/dashboard/invoices">
                                            <Button variant="outline" size="sm">View All Invoices</Button>
                                        </Link>
                                    </div>
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
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
} 