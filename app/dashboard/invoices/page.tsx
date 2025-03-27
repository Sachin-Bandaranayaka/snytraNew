"use client";

import { useEffect, useState } from "react";
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
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/components/ui/use-toast";

interface Invoice {
    id: string;
    number: string;
    created: number;
    period_start: number;
    period_end: number;
    amount_paid: number;
    amount_due: number;
    amount_remaining: number;
    status: string;
    hosted_invoice_url: string;
    invoice_pdf: string;
    lines: {
        data: Array<{
            description: string;
            amount: number;
        }>;
    };
}

export default function InvoicesPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateRangeFilter, setDateRangeFilter] = useState("all");

    // Fetch real invoice data
    useEffect(() => {
        const fetchInvoiceData = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/user/invoices?userId=${user.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch invoice data");
                }

                const data = await response.json();
                setInvoices(data.invoices || []);
                setFilteredInvoices(data.invoices || []);
            } catch (error) {
                console.error("Error fetching invoices:", error);
                toast({
                    title: "Error",
                    description: "There was an error loading your invoice history.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchInvoiceData();
    }, [user, toast]);

    // Filter invoices based on search term, status, and date range
    useEffect(() => {
        let filtered = [...invoices];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(invoice =>
                invoice.number.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (statusFilter !== "all") {
            filtered = filtered.filter(invoice =>
                invoice.status === statusFilter
            );
        }

        // Filter by date range
        if (dateRangeFilter !== "all") {
            const now = Date.now() / 1000; // Current time in seconds
            let cutoffTime = now;

            if (dateRangeFilter === "30days") {
                cutoffTime = now - (30 * 24 * 60 * 60); // 30 days ago
            } else if (dateRangeFilter === "6months") {
                cutoffTime = now - (180 * 24 * 60 * 60); // 6 months ago
            } else if (dateRangeFilter === "year") {
                cutoffTime = now - (365 * 24 * 60 * 60); // 1 year ago
            }

            filtered = filtered.filter(invoice =>
                invoice.created >= cutoffTime
            );
        }

        setFilteredInvoices(filtered);
    }, [invoices, searchTerm, statusFilter, dateRangeFilter]);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString();
    };

    const formatAmount = (amount: number) => {
        return `$${(amount / 100).toFixed(2)}`;
    };

    const getStatusClassName = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'open':
                return 'bg-blue-100 text-blue-800';
            case 'void':
            case 'uncollectible':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleApplyFilters = () => {
        // Filters are applied automatically via useEffect
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DashboardNavbar />
                <div className="flex">
                    <DashboardSidebar />
                    <main className="flex-1 p-6">
                        <div className="flex justify-center items-center h-96">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

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
                            <Button variant="outline"
                                onClick={() => window.open(filteredInvoices[0]?.invoice_pdf, '_blank')}
                                disabled={!filteredInvoices.length || !filteredInvoices[0]?.invoice_pdf}
                            >
                                Export Latest
                            </Button>
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
                                    <Input
                                        placeholder="Search invoices..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block text-gray-700">
                                        Status
                                    </label>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="open">Pending</SelectItem>
                                            <SelectItem value="void">Voided</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block text-gray-700">
                                        Date Range
                                    </label>
                                    <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
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
                                    <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Invoices table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Invoice History</CardTitle>
                            <CardDescription>
                                Showing {filteredInvoices.length} invoices
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {filteredInvoices.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Invoice ID</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredInvoices.map((invoice) => (
                                                <TableRow key={invoice.id}>
                                                    <TableCell className="font-medium">
                                                        {invoice.number}
                                                    </TableCell>
                                                    <TableCell>{formatDate(invoice.created)}</TableCell>
                                                    <TableCell>{formatAmount(invoice.amount_paid)}</TableCell>
                                                    <TableCell>
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClassName(invoice.status)}`}
                                                        >
                                                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 px-2 text-xs"
                                                                onClick={() => window.open(invoice.hosted_invoice_url, '_blank')}
                                                                disabled={!invoice.hosted_invoice_url}
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
                                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                </svg>
                                                                View
                                                            </Button>
                                                            {invoice.invoice_pdf && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-8 px-2 text-xs"
                                                                    onClick={() => window.open(invoice.invoice_pdf, '_blank')}
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
                                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                        <polyline points="7 10 12 15 17 10"></polyline>
                                                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                    </svg>
                                                                    PDF
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No invoices found</p>
                                    {!invoices.length && (
                                        <p className="text-gray-500 mt-2">Start your subscription to see invoices here</p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
} 