"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getTicket, updateTicket, getTicketMessages, addTicketMessage } from "@/lib/api/tickets";

export default function AdminTicketDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const unwrappedParams = use(params);
    const ticketId = parseInt(unwrappedParams.id);

    const [ticket, setTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messageLoading, setMessageLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const [isInternalNote, setIsInternalNote] = useState(false);
    const [error, setError] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [savingTicket, setSavingTicket] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    // Fetch ticket and messages
    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                setLoading(true);
                const ticketData = await getTicket(ticketId);
                setTicket(ticketData);
                setError("");
            } catch (err) {
                console.error("Error fetching ticket:", err);
                setError("Failed to load ticket details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        const fetchMessages = async () => {
            try {
                setMessageLoading(true);
                const messagesData = await getTicketMessages(ticketId);
                setMessages(messagesData);
            } catch (err) {
                console.error("Error fetching messages:", err);
            } finally {
                setMessageLoading(false);
            }
        };

        if (ticketId) {
            fetchTicketData();
            fetchMessages();
        }
    }, [ticketId]);

    // Handle sending a new message
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        setIsSending(true);
        try {
            const messageData = {
                message: newMessage,
                isInternal: isInternalNote
            };

            const addedMessage = await addTicketMessage(ticketId, messageData);
            setMessages([...messages, addedMessage]);
            setNewMessage("");
            setIsInternalNote(false);
        } catch (err) {
            console.error("Error sending message:", err);
            setError("Failed to send message. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    // Handle updating ticket details
    const handleSaveTicket = async () => {
        if (!ticket) return;

        setSavingTicket(true);
        try {
            const updatedTicket = await updateTicket(ticketId, {
                status: ticket.status,
                priority: ticket.priority,
                assignedTo: ticket.assignedTo
            });

            setTicket(updatedTicket);
            setError("");
        } catch (err) {
            console.error("Error updating ticket:", err);
            setError("Failed to update ticket. Please try again.");
        } finally {
            setSavingTicket(false);
        }
    };

    // Handle status change
    const handleStatusChange = (value) => {
        setTicket({
            ...ticket,
            status: value
        });
    };

    // Handle priority change
    const handlePriorityChange = (value) => {
        setTicket({
            ...ticket,
            priority: value
        });
    };

    // Handle assignment change
    const handleAssignmentChange = (value) => {
        setTicket({
            ...ticket,
            assignedTo: value === "unassigned" ? null : parseInt(value)
        });
    };

    // Function to get status color
    const getStatusColor = (status) => {
        if (!status) return 'bg-gray-100 text-gray-800';

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
        if (!priority) return 'bg-gray-100 text-gray-800';

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

    // Filter messages for tabs
    const allMessages = messages;
    const customerMessages = messages.filter(msg => !msg.isInternal);
    const internalNotes = messages.filter(msg => msg.isInternal);

    // Support team members for assignment
    const teamMembers = [
        { id: 0, name: "Unassigned" },
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Mike Johnson" },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error && !ticket) {
        return (
            <div className="text-center p-8">
                <div className="text-red-500 mb-4">{error}</div>
                <Button onClick={() => router.push('/admin/tickets')}>
                    Back to Tickets
                </Button>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="text-center p-8">
                <h2 className="text-xl font-bold">Ticket not found</h2>
                <p className="text-gray-500 mt-2">The ticket you're looking for doesn't exist.</p>
                <Button
                    onClick={() => router.push('/admin/tickets')}
                    className="mt-4"
                >
                    Go Back to Tickets
                </Button>
            </div>
        );
    }

    return (
        <div>
            {/* Back button */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/admin/tickets')}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to tickets
                </Button>
            </div>

            {/* Ticket header */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">{ticket.subject}</h1>
                        <p className="text-gray-500">
                            Ticket TKT-{ticket.id} • Created {formatDate(ticket.createdAt)} • From {ticket.user?.name || 'Customer'}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getStatusColor(ticket.status)} border-0`}>
                            {ticket.status}
                        </Badge>
                        <Badge variant="outline" className={`${getPriorityColor(ticket.priority)} border-0`}>
                            {ticket.priority}
                        </Badge>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
                    {error}
                </div>
            )}

            {/* Ticket details */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Conversation */}
                <div className="flex-1">
                    <Card>
                        <CardHeader className="pb-3">
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList>
                                    <TabsTrigger value="all">All Messages</TabsTrigger>
                                    <TabsTrigger value="customer">Customer Thread</TabsTrigger>
                                    <TabsTrigger value="internal">Internal Notes</TabsTrigger>
                                </TabsList>

                                <TabsContent value="all">
                                    <CardTitle className="mt-4 text-lg">Conversation History</CardTitle>
                                    <CardDescription>
                                        Showing all messages and internal notes
                                    </CardDescription>
                                </TabsContent>
                                <TabsContent value="customer">
                                    <CardTitle className="mt-4 text-lg">Customer Thread</CardTitle>
                                    <CardDescription>
                                        Showing only messages visible to the customer
                                    </CardDescription>
                                </TabsContent>
                                <TabsContent value="internal">
                                    <CardTitle className="mt-4 text-lg">Internal Notes</CardTitle>
                                    <CardDescription>
                                        Showing only internal team notes
                                    </CardDescription>
                                </TabsContent>
                            </Tabs>
                        </CardHeader>
                        <CardContent>
                            {messageLoading ? (
                                <div className="flex justify-center items-center p-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                                        <TabsList className="hidden">
                                            <TabsTrigger value="all">All</TabsTrigger>
                                            <TabsTrigger value="customer">Customer</TabsTrigger>
                                            <TabsTrigger value="internal">Internal</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="all" className="mt-0">
                                            {allMessages.length === 0 ? (
                                                <div className="text-center py-8 text-gray-500">
                                                    No messages for this ticket yet.
                                                </div>
                                            ) : (
                                                allMessages.map((message) => (
                                                    <MessageItem
                                                        key={message.id}
                                                        message={message}
                                                        formatDate={formatDate}
                                                    />
                                                ))
                                            )}
                                        </TabsContent>
                                        <TabsContent value="customer" className="mt-0">
                                            {customerMessages.length === 0 ? (
                                                <div className="text-center py-8 text-gray-500">
                                                    No customer-visible messages for this ticket yet.
                                                </div>
                                            ) : (
                                                customerMessages.map((message) => (
                                                    <MessageItem
                                                        key={message.id}
                                                        message={message}
                                                        formatDate={formatDate}
                                                    />
                                                ))
                                            )}
                                        </TabsContent>
                                        <TabsContent value="internal" className="mt-0">
                                            {internalNotes.length === 0 ? (
                                                <div className="text-center py-8 text-gray-500">
                                                    No internal notes for this ticket.
                                                </div>
                                            ) : (
                                                internalNotes.map((message) => (
                                                    <MessageItem
                                                        key={message.id}
                                                        message={message}
                                                        formatDate={formatDate}
                                                    />
                                                ))
                                            )}
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col border-t pt-6">
                            <div className="w-full space-y-4">
                                <Textarea
                                    placeholder="Type your reply or internal note..."
                                    className="w-full min-h-[120px]"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="internal-note"
                                                checked={isInternalNote}
                                                onCheckedChange={(checked) => setIsInternalNote(checked as boolean)}
                                            />
                                            <Label htmlFor="internal-note">
                                                Internal note (not visible to customer)
                                            </Label>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim() || isSending}
                                    >
                                        {isSending ? "Sending..." : (isInternalNote ? "Add Internal Note" : "Send Reply")}
                                    </Button>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>

                {/* Ticket info and customer details */}
                <div className="w-full lg:w-80 space-y-6">
                    {/* Ticket actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Ticket Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="status" className="text-sm font-medium text-gray-500">
                                        Status
                                    </Label>
                                    <Select
                                        value={ticket.status?.toLowerCase() || "open"}
                                        onValueChange={handleStatusChange}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Change status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="open">Open</SelectItem>
                                            <SelectItem value="in progress">In Progress</SelectItem>
                                            <SelectItem value="resolved">Resolved</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="priority" className="text-sm font-medium text-gray-500">
                                        Priority
                                    </Label>
                                    <Select
                                        value={ticket.priority?.toLowerCase() || "medium"}
                                        onValueChange={handlePriorityChange}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Change priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="assignee" className="text-sm font-medium text-gray-500">
                                        Assigned To
                                    </Label>
                                    <Select
                                        value={ticket.assignedTo?.toString() || "unassigned"}
                                        onValueChange={handleAssignmentChange}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Assign ticket" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {teamMembers.map((member) => (
                                                <SelectItem
                                                    key={member.id}
                                                    value={member.id === 0 ? "unassigned" : member.id.toString()}
                                                >
                                                    {member.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex justify-end space-x-2">
                            <Button
                                onClick={handleSaveTicket}
                                disabled={savingTicket}
                            >
                                {savingTicket ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Customer info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Avatar className="h-16 w-16 mb-2">
                                    <AvatarFallback className="text-lg">
                                        {ticket.user?.name?.charAt(0) || 'C'}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-medium text-lg">{ticket.user?.name || 'Customer'}</h3>
                                    <p className="text-gray-500">{ticket.user?.email || 'N/A'}</p>
                                </div>
                                <div className="border-t pt-4 space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Customer ID</p>
                                        <p className="text-sm">{ticket.userId || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ticket information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Ticket Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Ticket ID</p>
                                    <p className="text-sm">TKT-{ticket.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Created</p>
                                    <p className="text-sm">{formatDate(ticket.createdAt)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Last Updated</p>
                                    <p className="text-sm">{formatDate(ticket.updatedAt)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p className="text-sm">{ticket.category}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Message component
function MessageItem({ message, formatDate }) {
    return (
        <div className={`flex gap-4 ${message.isInternal ? "bg-amber-50 p-4 rounded-md border border-amber-100" : ""}`}>
            <Avatar className="h-10 w-10 mt-1">
                <AvatarFallback className={message.user?.role === "admin" ? "bg-blue-100 text-blue-700" : undefined}>
                    {message.user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <div className="font-medium">
                        {message.user?.name || 'User'}
                        {message.user?.role === "admin" && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                Support Team
                            </span>
                        )}
                        {message.isInternal && (
                            <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                Internal Note
                            </span>
                        )}
                    </div>
                    <div className="text-xs text-gray-500">
                        {formatDate(message.createdAt)}
                    </div>
                </div>
                <div className="mt-1 text-gray-700 whitespace-pre-wrap">
                    {message.message}
                </div>
                {message.attachments && (
                    <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-2">Attachment: {message.attachments}</p>
                    </div>
                )}
            </div>
        </div>
    );
} 