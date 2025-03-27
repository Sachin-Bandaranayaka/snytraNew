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

export default function SupportTicketsPage() {
    // Support tickets data
    const tickets = [
        {
            id: "TKT-1285",
            subject: "Integration with POS system",
            status: "Open",
            statusColor: "bg-blue-100 text-blue-800",
            priority: "Medium",
            priorityColor: "bg-yellow-100 text-yellow-800",
            created: "Today, 2:30 PM",
            lastUpdate: "Today, 3:15 PM",
            category: "Integration",
            description: "I need help integrating your system with our existing POS (Toast).",
            assignee: "Support Team",
        },
        {
            id: "TKT-1284",
            subject: "Feature request: Custom analytics dashboard",
            status: "In Progress",
            statusColor: "bg-purple-100 text-purple-800",
            priority: "Low",
            priorityColor: "bg-green-100 text-green-800",
            created: "April 05, 2023",
            lastUpdate: "April 06, 2023",
            category: "Feature Request",
            description: "We would like to request a custom analytics dashboard for our restaurant chain.",
            assignee: "Product Team",
        },
        {
            id: "TKT-1283",
            subject: "Payment method update failed",
            status: "Open",
            statusColor: "bg-blue-100 text-blue-800",
            priority: "High",
            priorityColor: "bg-red-100 text-red-800",
            created: "April 03, 2023",
            lastUpdate: "April 03, 2023",
            category: "Billing",
            description: "I'm trying to update my payment method but keep getting an error.",
            assignee: "Billing Team",
        },
        {
            id: "TKT-1282",
            subject: "Menu items not syncing correctly",
            status: "In Progress",
            statusColor: "bg-purple-100 text-purple-800",
            priority: "Medium",
            priorityColor: "bg-yellow-100 text-yellow-800",
            created: "March 28, 2023",
            lastUpdate: "April 01, 2023",
            category: "Technical Issue",
            description: "Some menu items are not syncing correctly between our website and the app.",
            assignee: "Technical Support",
        },
        {
            id: "TKT-1281",
            subject: "Need help with staff training",
            status: "Closed",
            statusColor: "bg-gray-100 text-gray-800",
            priority: "Low",
            priorityColor: "bg-green-100 text-green-800",
            created: "March 15, 2023",
            lastUpdate: "March 20, 2023",
            category: "Training",
            description: "We need assistance with staff training for the new ordering system.",
            assignee: "Customer Success",
        },
        {
            id: "TKT-1280",
            subject: "Account login issues",
            status: "Resolved",
            statusColor: "bg-green-100 text-green-800",
            priority: "Medium",
            priorityColor: "bg-yellow-100 text-yellow-800",
            created: "March 10, 2023",
            lastUpdate: "March 12, 2023",
            category: "Account",
            description: "Unable to login to the dashboard with correct credentials.",
            assignee: "Technical Support",
        },
        {
            id: "TKT-1279",
            subject: "Billing discrepancy on latest invoice",
            status: "Closed",
            statusColor: "bg-gray-100 text-gray-800",
            priority: "High",
            priorityColor: "bg-red-100 text-red-800",
            created: "February 28, 2023",
            lastUpdate: "March 05, 2023",
            category: "Billing",
            description: "There appears to be a billing discrepancy on my latest invoice.",
            assignee: "Billing Team",
        },
        {
            id: "TKT-1278",
            subject: "Question about billing",
            status: "Closed",
            statusColor: "bg-gray-100 text-gray-800",
            priority: "Low",
            priorityColor: "bg-green-100 text-green-800",
            created: "February 20, 2023",
            lastUpdate: "February 22, 2023",
            category: "Billing",
            description: "I have a question about my monthly billing cycle.",
            assignee: "Billing Team",
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
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <label htmlFor="subject" className="text-sm font-medium">
                                                Subject
                                            </label>
                                            <Input id="subject" placeholder="Brief summary of your issue" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <label htmlFor="category" className="text-sm font-medium">
                                                    Category
                                                </label>
                                                <Select>
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
                                                <Select defaultValue="medium">
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
                                                Description
                                            </label>
                                            <Textarea
                                                id="description"
                                                placeholder="Please provide details about your issue"
                                                rows={5}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <label htmlFor="attachments" className="text-sm font-medium">
                                                Attachments (Optional)
                                            </label>
                                            <Input id="attachments" type="file" multiple />
                                            <p className="text-xs text-gray-500">
                                                Upload screenshots or relevant files (Max 5MB per file)
                                            </p>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Submit Ticket</Button>
                                    </DialogFooter>
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
                                    <Input placeholder="Search tickets..." />
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
                                            <SelectItem value="open">Open</SelectItem>
                                            <SelectItem value="in-progress">In Progress</SelectItem>
                                            <SelectItem value="resolved">Resolved</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block text-gray-700">
                                        Priority
                                    </label>
                                    <Select defaultValue="all">
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
                                    <Select defaultValue="all">
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
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end">
                                    <Button className="w-full">Apply Filters</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tickets table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Support Tickets</CardTitle>
                            <CardDescription>
                                Showing {tickets.length} tickets
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
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
                                        {tickets.map((ticket) => (
                                            <TableRow key={ticket.id}>
                                                <TableCell className="font-medium">
                                                    <Link
                                                        href={`/dashboard/tickets/${ticket.id}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {ticket.id}
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
                                                        className={`${ticket.statusColor} border-0`}
                                                    >
                                                        {ticket.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={`${ticket.priorityColor} border-0`}
                                                    >
                                                        {ticket.priority}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{ticket.category}</TableCell>
                                                <TableCell>{ticket.created}</TableCell>
                                                <TableCell>{ticket.lastUpdate}</TableCell>
                                                <TableCell className="text-right">
                                                    <Link
                                                        href={`/dashboard/tickets/${ticket.id}`}
                                                        className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                                    >
                                                        View
                                                    </Link>
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
                                <span className="font-medium">{tickets.length}</span> of{" "}
                                <span className="font-medium">{tickets.length}</span> tickets
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