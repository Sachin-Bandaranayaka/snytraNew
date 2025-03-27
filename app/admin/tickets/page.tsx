"use client";

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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTickets, updateTicket } from "@/lib/api/tickets";

export default function AdminTicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [assigneeFilter, setAssigneeFilter] = useState("all");

    // Fetch tickets
    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                // Create a filter object for API request
                const filters = {};
                if (statusFilter && statusFilter !== "all") filters.status = statusFilter;
                if (priorityFilter && priorityFilter !== "all") filters.priority = priorityFilter;
                if (categoryFilter && categoryFilter !== "all") filters.category = categoryFilter;

                const ticketsData = await getTickets(Object.keys(filters).length > 0 ? filters : undefined);
                setTickets(ticketsData);
                setError("");
            } catch (err) {
                console.error("Error fetching tickets:", err);
                setError("Failed to load tickets. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [statusFilter, priorityFilter, categoryFilter]);

    // Handle ticket assignment
    const handleAssign = async (ticketId, assigneeId) => {
        try {
            await updateTicket(ticketId, { assignedTo: assigneeId });

            // Refresh tickets
            const updatedTickets = await getTickets();
            setTickets(updatedTickets);
        } catch (err) {
            console.error("Error assigning ticket:", err);
            setError("Failed to assign ticket.");
        }
    };

    // Filter tickets based on search and assignee filter
    const filteredTickets = tickets.filter((ticket) => {
        // Additional client-side filtering for search and assignee
        const matchesSearch = searchTerm === "" ||
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.id.toString().toLowerCase().includes(searchTerm.toLowerCase());

        const matchesAssignee = assigneeFilter === "all" ||
            (assigneeFilter === "unassigned" && !ticket.assignedTo) ||
            (ticket.assignedTo && ticket.assignedToUser?.name?.toLowerCase().includes(assigneeFilter.toLowerCase()));

        return matchesSearch && matchesAssignee;
    });

    // Count tickets by status
    const openCount = tickets.filter(t => t.status.toLowerCase() === "open").length;
    const inProgressCount = tickets.filter(t => t.status.toLowerCase() === "in progress").length;
    const resolvedCount = tickets.filter(t => t.status.toLowerCase() === "resolved").length;
    const closedCount = tickets.filter(t => t.status.toLowerCase() === "closed").length;

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

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleString();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Support Tickets</h1>
                    <p className="text-gray-500">Manage customer support requests</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{openCount}</div>
                        <p className="text-sm text-gray-500">Open Tickets</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{inProgressCount}</div>
                        <p className="text-sm text-gray-500">In Progress</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{resolvedCount}</div>
                        <p className="text-sm text-gray-500">Resolved</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{closedCount}</div>
                        <p className="text-sm text-gray-500">Closed</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block text-gray-700">
                                Search
                            </label>
                            <Input
                                placeholder="Search tickets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block text-gray-700">
                                Status
                            </label>
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
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
                                value={priorityFilter}
                                onValueChange={setPriorityFilter}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Priorities</SelectItem>
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
                                value={categoryFilter}
                                onValueChange={setCategoryFilter}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
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
                        <div>
                            <label className="text-sm font-medium mb-1 block text-gray-700">
                                Assignee
                            </label>
                            <Select
                                value={assigneeFilter}
                                onValueChange={setAssigneeFilter}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select assignee" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Assignees</SelectItem>
                                    <SelectItem value="unassigned">Unassigned</SelectItem>
                                    <SelectItem value="1">John Doe</SelectItem>
                                    <SelectItem value="2">Jane Smith</SelectItem>
                                    <SelectItem value="3">Mike Johnson</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="all" className="w-full mb-6">
                <TabsList>
                    <TabsTrigger value="all">All Tickets</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <TicketsTable
                        tickets={filteredTickets}
                        loading={loading}
                        error={error}
                        getStatusColor={getStatusColor}
                        getPriorityColor={getPriorityColor}
                        formatDate={formatDate}
                        onAssign={handleAssign}
                    />
                </TabsContent>
                <TabsContent value="open">
                    <TicketsTable
                        tickets={filteredTickets.filter(t => t.status.toLowerCase() === "open")}
                        loading={loading}
                        error={error}
                        getStatusColor={getStatusColor}
                        getPriorityColor={getPriorityColor}
                        formatDate={formatDate}
                        onAssign={handleAssign}
                    />
                </TabsContent>
                <TabsContent value="in-progress">
                    <TicketsTable
                        tickets={filteredTickets.filter(t => t.status.toLowerCase() === "in progress")}
                        loading={loading}
                        error={error}
                        getStatusColor={getStatusColor}
                        getPriorityColor={getPriorityColor}
                        formatDate={formatDate}
                        onAssign={handleAssign}
                    />
                </TabsContent>
                <TabsContent value="resolved">
                    <TicketsTable
                        tickets={filteredTickets.filter(t => t.status.toLowerCase() === "resolved")}
                        loading={loading}
                        error={error}
                        getStatusColor={getStatusColor}
                        getPriorityColor={getPriorityColor}
                        formatDate={formatDate}
                        onAssign={handleAssign}
                    />
                </TabsContent>
                <TabsContent value="closed">
                    <TicketsTable
                        tickets={filteredTickets.filter(t => t.status.toLowerCase() === "closed")}
                        loading={loading}
                        error={error}
                        getStatusColor={getStatusColor}
                        getPriorityColor={getPriorityColor}
                        formatDate={formatDate}
                        onAssign={handleAssign}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

// Tickets table component
function TicketsTable({
    tickets,
    loading,
    error,
    getStatusColor,
    getPriorityColor,
    formatDate,
    onAssign
}) {
    const [assigningTicket, setAssigningTicket] = useState(null);

    const handleAssign = (ticketId, userId) => {
        onAssign(ticketId, userId);
        setAssigningTicket(null);
    };

    if (loading) {
        return (
            <Card>
                <CardContent className="flex justify-center items-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="p-6 text-center text-red-500">
                    {error}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Ticket ID</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Assignee</TableHead>
                                <TableHead>Last Update</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tickets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                                        No tickets found matching your filters.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tickets.map((ticket) => (
                                    <TableRow key={ticket.id}>
                                        <TableCell className="font-medium">
                                            <Link href={`/admin/tickets/${ticket.id}`} className="text-blue-600 hover:underline">
                                                TKT-{ticket.id}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate">
                                            <Link href={`/admin/tickets/${ticket.id}`} className="hover:underline" title={ticket.subject}>
                                                {ticket.subject}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm font-medium">{ticket.user?.name || 'Customer'}</div>
                                            <div className="text-xs text-gray-500">{ticket.user?.email || ''}</div>
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
                                        <TableCell>
                                            {ticket.assignedToUser ? (
                                                ticket.assignedToUser.name
                                            ) : (
                                                <span className="text-gray-500">Unassigned</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{formatDate(ticket.updatedAt)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/tickets/${ticket.id}`}
                                                    className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                                >
                                                    View
                                                </Link>
                                                {!ticket.assignedTo && (
                                                    <>
                                                        {assigningTicket === ticket.id ? (
                                                            <Select
                                                                defaultValue="agent"
                                                                onValueChange={(value) => handleAssign(ticket.id, value)}
                                                            >
                                                                <SelectTrigger className="h-8 w-[150px]">
                                                                    <SelectValue placeholder="Select agent" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="agent">Select agent</SelectItem>
                                                                    <SelectItem value="1">John Doe</SelectItem>
                                                                    <SelectItem value="2">Jane Smith</SelectItem>
                                                                    <SelectItem value="3">Mike Johnson</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        ) : (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-8 px-3 text-xs"
                                                                onClick={() => setAssigningTicket(ticket.id)}
                                                            >
                                                                Assign
                                                            </Button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
                <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">{tickets.length}</span> tickets
                </div>
            </CardFooter>
        </Card>
    );
} 