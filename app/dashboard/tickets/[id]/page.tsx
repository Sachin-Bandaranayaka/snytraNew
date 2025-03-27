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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardNavbar from "@/components/dashboard/navbar";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { getTicket, updateTicket, getTicketMessages, addTicketMessage } from "@/lib/api/tickets";

export default function TicketDetailPage({ params }: { params: { id: string } }) {
    const unwrappedParams = use(params);
    const ticketId = parseInt(unwrappedParams.id);
    const router = useRouter();

    const [ticket, setTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messageLoading, setMessageLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const [isInternal, setIsInternal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false); // This would come from auth context in a real app

    // Fetch ticket data and message history
    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                setLoading(true);
                const ticketData = await getTicket(ticketId);
                setTicket(ticketData);

                // Check if user is admin - this would be from auth context in a real app
                // For demo purposes, we're assuming the user is an admin
                setIsAdmin(true);

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

    // Update ticket status
    const handleStatusChange = async (newStatus) => {
        try {
            const updatedTicket = await updateTicket(ticketId, { status: newStatus });
            setTicket(updatedTicket);
        } catch (err) {
            console.error("Error updating ticket status:", err);
            setError("Failed to update ticket status.");
        }
    };

    // Update ticket priority
    const handlePriorityChange = async (newPriority) => {
        try {
            const updatedTicket = await updateTicket(ticketId, { priority: newPriority });
            setTicket(updatedTicket);
        } catch (err) {
            console.error("Error updating ticket priority:", err);
            setError("Failed to update ticket priority.");
        }
    };

    // Send a new message
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const messageData = {
                message: newMessage,
                isInternal: isAdmin ? isInternal : false,
            };

            const addedMessage = await addTicketMessage(ticketId, messageData);
            setMessages([...messages, addedMessage]);
            setNewMessage("");
            setIsInternal(false);
        } catch (err) {
            console.error("Error sending message:", err);
            setError("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNavbar />

            <div className="flex">
                <DashboardSidebar />

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Page header with back button */}
                    <div className="flex items-center mb-6">
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/dashboard/tickets')}
                            className="mr-2"
                        >
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
                                className="mr-2 h-4 w-4"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            Back to Tickets
                        </Button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center p-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 p-4">{error}</div>
                    ) : ticket ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Ticket details */}
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl">
                                                    {ticket.subject}
                                                </CardTitle>
                                                <CardDescription className="mt-1">
                                                    Ticket ID: TKT-{ticket.id}
                                                </CardDescription>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={`${getStatusColor(ticket.status)} border-0 text-sm`}
                                            >
                                                {ticket.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
                                            </div>

                                            <Separator />

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Created</h3>
                                                    <p className="text-sm">{formatDate(ticket.createdAt)}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
                                                    <p className="text-sm">{formatDate(ticket.updatedAt)}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                                                    <p className="text-sm capitalize">{ticket.category}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Priority</h3>
                                                    <Badge
                                                        variant="outline"
                                                        className={`${getPriorityColor(ticket.priority)} border-0 text-xs`}
                                                    >
                                                        {ticket.priority}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Messages */}
                                <div className="mt-6">
                                    <h2 className="text-lg font-semibold mb-4">Conversation</h2>

                                    {messageLoading ? (
                                        <div className="flex justify-center items-center p-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        </div>
                                    ) : messages.length === 0 ? (
                                        <Card>
                                            <CardContent className="p-6 text-center text-gray-500">
                                                No messages yet. Start the conversation by sending a message below.
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        <div className="space-y-4">
                                            {messages.map((msg) => (
                                                <Card
                                                    key={msg.id}
                                                    className={`${msg.isInternal ? 'border-l-4 border-l-amber-500' : ''}`}
                                                >
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start">
                                                            <Avatar className="h-8 w-8 mr-3">
                                                                <AvatarFallback>
                                                                    {msg.user?.name?.charAt(0) || 'U'}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1">
                                                                <div className="flex justify-between items-baseline mb-1">
                                                                    <div className="font-medium text-sm">{msg.user?.name || 'User'}</div>
                                                                    <div className="text-xs text-gray-500">
                                                                        {formatDate(msg.createdAt)}
                                                                        {msg.isInternal && (
                                                                            <span className="ml-2 text-amber-600 font-medium">(Internal Note)</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}

                                    {/* New message form */}
                                    <Card className="mt-4">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-sm font-medium">Add Reply</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleSendMessage}>
                                                <Textarea
                                                    placeholder="Type your message here..."
                                                    className="mb-3"
                                                    rows={4}
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                />
                                                <div className="flex justify-between items-center">
                                                    {isAdmin && (
                                                        <div className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                id="internal-note"
                                                                checked={isInternal}
                                                                onChange={(e) => setIsInternal(e.target.checked)}
                                                                className="mr-2"
                                                            />
                                                            <label htmlFor="internal-note" className="text-sm text-gray-700">
                                                                Mark as internal note
                                                            </label>
                                                        </div>
                                                    )}
                                                    <Button
                                                        type="submit"
                                                        disabled={isSubmitting || !newMessage.trim()}
                                                        className="ml-auto"
                                                    >
                                                        {isSubmitting ? "Sending..." : "Send Message"}
                                                    </Button>
                                                </div>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Ticket actions sidebar */}
                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Ticket Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium mb-2">Status</h3>
                                            <Select
                                                value={ticket.status?.toLowerCase()}
                                                onValueChange={handleStatusChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
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
                                            <h3 className="text-sm font-medium mb-2">Priority</h3>
                                            <Select
                                                value={ticket.priority?.toLowerCase()}
                                                onValueChange={handlePriorityChange}
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

                                        {isAdmin && (
                                            <div>
                                                <h3 className="text-sm font-medium mb-2">Assign To</h3>
                                                <Select defaultValue="unassigned">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select agent" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="unassigned">Unassigned</SelectItem>
                                                        <SelectItem value="1">John Doe</SelectItem>
                                                        <SelectItem value="2">Jane Smith</SelectItem>
                                                        <SelectItem value="3">Mike Johnson</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}

                                        <Separator />

                                        {ticket.status !== 'closed' && (
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                onClick={() => handleStatusChange('closed')}
                                            >
                                                Close Ticket
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Customer Information */}
                                <Card className="mt-4">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Customer Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <Avatar className="h-10 w-10 mr-3">
                                                    <AvatarFallback>C</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">Customer Name</div>
                                                    <div className="text-sm text-gray-500">customer@example.com</div>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Customer Since</h3>
                                                <p className="text-sm">January 10, 2023</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Subscription</h3>
                                                <p className="text-sm">Premium Plan</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-8">
                            <h2 className="text-xl font-bold">Ticket not found</h2>
                            <p className="text-gray-500 mt-2">The ticket you're looking for doesn't exist or you don't have permission to view it.</p>
                            <Button
                                onClick={() => router.push('/dashboard/tickets')}
                                className="mt-4"
                            >
                                Go Back to Tickets
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
} 