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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import DashboardNavbar from "@/components/dashboard/navbar";
import DashboardSidebar from "@/components/dashboard/sidebar";

export default function InvoicesPage() {
    // Invoice data
    const invoices = [
        {
            id: "INV-2023-05",
            date: "April 15, 2023",
            dueDate: "April 15, 2023",
            amount: "$49.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
            plan: "Pro",
            period: "April 15, 2023 - May 14, 2023",
        },
        {
            id: "INV-2023-04",
            date: "March 15, 2023",
            dueDate: "March 15, 2023",
            amount: "$49.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
            plan: "Pro",
            period: "March 15, 2023 - April 14, 2023",
        },
        {
            id: "INV-2023-03",
            date: "February 15, 2023",
            dueDate: "February 15, 2023",
            amount: "$39.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
            plan: "Pro",
            period: "February 15, 2023 - March 14, 2023",
        },
        {
            id: "INV-2023-02",
            date: "January 15, 2023",
            dueDate: "January 15, 2023",
            amount: "$39.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
            plan: "Pro",
            period: "January 15, 2023 - February 14, 2023",
        },
        {
            id: "INV-2023-01",
            date: "December 15, 2022",
            dueDate: "December 15, 2022",
            amount: "$29.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
            plan: "Basic",
            period: "December 15, 2022 - January 14, 2023",
        },
        {
            id: "INV-2022-12",
            date: "November 15, 2022",
            dueDate: "November 15, 2022",
            amount: "$29.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
            plan: "Basic",
            period: "November 15, 2022 - December 14, 2022",
        },
        {
            id: "INV-2022-11",
            date: "October 15, 2022",
            dueDate: "October 15, 2022",
            amount: "$29.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
            plan: "Basic",
            period: "October 15, 2022 - November 14, 2022",
        },
        {
            id: "INV-2022-10",
            date: "September 15, 2022",
            dueDate: "September 15, 2022",
            amount: "$29.99",
            status: "Paid",
            statusColor: "bg-green-100 text-green-800",
            plan: "Basic",
            period: "September 15, 2022 - October 14, 2022",
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
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-2xl font-bold">Invoices</h1>
                            <p className="text-gray-500">View and download your invoice history</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button variant="outline">Export All</Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block text-gray-700">
                                        Search
                                    </label>
                                    <Input placeholder="Search invoices..." />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block text-gray-700">
                                        Status
                                    </label>
                                    <Select defaultValue="all">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="overdue">Overdue</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block text-gray-700">
                                        Date Range
                                    </label>
                                    <Select defaultValue="all">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select date range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All time</SelectItem>
                                            <SelectItem value="30days">Last 30 days</SelectItem>
                                            <SelectItem value="6months">Last 6 months</SelectItem>
                                            <SelectItem value="year">Last year</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end">
                                    <Button className="w-full">Apply Filters</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Invoices table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Invoice History</CardTitle>
                            <CardDescription>
                                Showing {invoices.length} invoices
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Invoice ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Due Date</TableHead>
                                            <TableHead>Plan</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invoices.map((invoice) => (
                                            <TableRow key={invoice.id}>
                                                <TableCell className="font-medium">
                                                    <Link
                                                        href={`/dashboard/invoices/${invoice.id}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {invoice.id}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{invoice.date}</TableCell>
                                                <TableCell>{invoice.dueDate}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span>{invoice.plan}</span>
                                                        <span className="text-xs text-gray-500">{invoice.period}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{invoice.amount}</TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${invoice.statusColor}`}
                                                    >
                                                        {invoice.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 px-2 text-xs"
                                                        >
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
                                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                                <polyline points="7 10 12 15 17 10" />
                                                                <line x1="12" y1="15" x2="12" y2="3" />
                                                            </svg>
                                                            PDF
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 px-2 text-xs"
                                                        >
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
                                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                            </svg>
                                                            Copy
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
                            <div className="text-sm text-gray-500">
                                Showing <span className="font-medium">1</span> to{" "}
                                <span className="font-medium">{invoices.length}</span> of{" "}
                                <span className="font-medium">{invoices.length}</span> invoices
                            </div>
                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline" disabled>
                                    Previous
                                </Button>
                                <Button size="sm" variant="outline" disabled>
                                    Next
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </main>
            </div>
        </div>
    );
} 