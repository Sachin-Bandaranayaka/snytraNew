'use client';

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import DashboardNavbar from "@/components/dashboard/navbar";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { getTickets, createTicket } from "@/lib/api/tickets";
import { useRouter } from "next/navigation";

export default function SupportTicketsPage() {
    const router = useRouter();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: "",
        priority: "",
        category: "",
    });
    const [formData, setFormData] = useState({
        subject: "",
        description: "",
        category: "",
        priority: "medium",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Fetch tickets on component mount and when filters change
    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                // Create a new filter object excluding empty strings
                const activeFilters = Object.fromEntries(
                    Object.entries(filters).filter(([_, value]) => value && value !== "all")
                );

                const data = await getTickets(Object.keys(activeFilters).length > 0 ? activeFilters : undefined);
                setTickets(data);
                setError("");
            } catch (err) {
                console.error("Error fetching tickets:", err);
                setError("Failed to load tickets. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [filters]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    // Handle select input changes
    const handleSelectChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    // Handle filter changes
    const handleFilterChange = (field, value) => {
        setFilters({
            ...filters,
            [field]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            if (!formData.subject || !formData.description || !formData.category) {
                setError("Please fill in all required fields");
                return;
            }

            const newTicket = await createTicket(formData);

            // Reset form and close dialog
            setFormData({
                subject: "",
                description: "",
                category: "",
                priority: "medium",
            });

            // Refresh tickets list and navigate to the new ticket
            router.push(`/dashboard/tickets/${newTicket.id}`);
        } catch (err) {
            console.error("Error creating ticket:", err);
            setError("Failed to create ticket. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Function to get status color
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'open':
                return 'bg-blue-100 text-blue-800';
            case 'in progress':
                return 'bg-purple-100 text-purple-800';
            case 'resolved':
                return 'bg-green-100 text-green-800';
            case 'closed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Function to get priority color
    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Filter tickets by search query
    const filteredTickets = tickets.filter(ticket =>
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toString().includes(searchQuery.toLowerCase())
    );

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
                            <h1 className="text-2xl font-bold">Support Tickets</h1>
                            <p className="text-gray-500">Manage and track your support requests</p>
                        </div>
                        <div className="flex space-x-3">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Create New Ticket</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Create Support Ticket</DialogTitle>
                                        <DialogDescription>
                                            Submit a new support request. Our team will respond as soon as possible.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid gap-4 py-4">
                                            {error && (
                                                <div className="text-red-500 text-sm">{error}</div>
                                            )}
                                            <div className="grid gap-2">
                                                <label htmlFor="subject" className="text-sm font-medium">
                                                    Subject *
                                                </label>
                                                <Input
                                                    id="subject"
                                                    placeholder="Brief summary of your issue"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <label htmlFor="category" className="text-sm font-medium">
                                                        Category *
                                                    </label>
                                                    <Select
                                                        value={formData.category}
                                                        onValueChange={(value) => handleSelectChange("category", value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="technical">Technical Issue</SelectItem>
                                                            <SelectItem value="billing">Billing</SelectItem>
                                                            <SelectItem value="account">Account</SelectItem>
                                                            <SelectItem value="feature">Feature Request</SelectItem>
                                                            <SelectItem value="integration">Integration</SelectItem>
                                                            <SelectItem value="training">Training</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <label htmlFor="priority" className="text-sm font-medium">
                                                        Priority
                                                    </label>
                                                    <Select
                                                        value={formData.priority}
                                                        onValueChange={(value) => handleSelectChange("priority", value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select priority" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="low">Low</SelectItem>
                                                            <SelectItem value="medium">Medium</SelectItem>
                                                            <SelectItem value="high">High</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="grid gap-2">
                                                <label htmlFor="description" className="text-sm font-medium">
                                                    Description *
                                                </label>
                                                <Textarea
                                                    id="description"
                                                    placeholder="Please provide details about your issue"
                                                    rows={5}
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? "Submitting..." : "Submit Ticket"}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Filters */}
                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block text-gray-700">
                                        Search
                                    </label>
                                    <Input
                                        placeholder="Search tickets..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block text-gray-700">
                                        Status
                                    </label>
                                    <Select
                                        defaultValue="all"
                                        onValueChange={(value) => handleFilterChange("status", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="open">Open</SelectItem>
                                            <SelectItem value="in progress">In Progress</SelectItem>
                                            <SelectItem value="resolved">Resolved</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block text-gray-700">
                                        Priority
                                    </label>
                                    <Select
                                        defaultValue="all"
                                        onValueChange={(value) => handleFilterChange("priority", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block text-gray-700">
                                        Category
                                    </label>
                                    <Select
                                        defaultValue="all"
                                        onValueChange={(value) => handleFilterChange("category", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="technical">Technical Issue</SelectItem>
                                            <SelectItem value="billing">Billing</SelectItem>
                                            <SelectItem value="account">Account</SelectItem>
                                            <SelectItem value="feature">Feature Request</SelectItem>
                                            <SelectItem value="integration">Integration</SelectItem>
                                            <SelectItem value="training">Training</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tickets table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Support Tickets</CardTitle>
                            <CardDescription>
                                {loading ? 'Loading tickets...' : `Showing ${filteredTickets.length} tickets`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <div className="text-red-500 mb-4">{error}</div>
                            )}

                            {loading ? (
                                <div className="flex justify-center items-center p-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Ticket ID</TableHead>
                                                <TableHead>Subject</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Priority</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Created</TableHead>
                                                <TableHead>Last Update</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredTickets.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={8} className="text-center py-8">
                                                        No tickets found. Create a new one to get started.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredTickets.map((ticket) => (
                                                    <TableRow key={ticket.id}>
                                                        <TableCell className="font-medium">
                                                            <Link
                                                                href={`/dashboard/tickets/${ticket.id}`}
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                TKT-{ticket.id}
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell className="max-w-[200px] truncate">
                                                            <Link
                                                                href={`/dashboard/tickets/${ticket.id}`}
                                                                className="hover:underline"
                                                                title={ticket.subject}
                                                            >
                                                                {ticket.subject}
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant="outline"
                                                                className={`${getStatusColor(ticket.status)} border-0`}
                                                            >
                                                                {ticket.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant="outline"
                                                                className={`${getPriorityColor(ticket.priority)} border-0`}
                                                            >
                                                                {ticket.priority}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>{ticket.category}</TableCell>
                                                        <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                                                        <TableCell>{new Date(ticket.updatedAt).toLocaleDateString()}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Link
                                                                href={`/dashboard/tickets/${ticket.id}`}
                                                                className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                                            >
                                                                View
                                                            </Link>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}