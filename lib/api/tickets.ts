// Client-side API functions for ticket operations

// Types
export interface Ticket {
    id: number;
    subject: string;
    description: string;
    status: string;
    priority: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    lastReplyBy: string;
    userId: number;
    assignedTo: number | null;
    assignedToUser?: {
        id: number;
        name: string;
        email: string;
    } | null;
}

export interface TicketMessage {
    id: number;
    ticketId: number;
    userId: number;
    message: string;
    isInternal: boolean;
    attachments?: string | null;
    createdAt: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

export interface NewTicket {
    subject: string;
    description: string;
    category: string;
    priority?: string;
}

export interface NewMessage {
    message: string;
    isInternal?: boolean;
    attachments?: string;
}

export interface TicketUpdate {
    status?: string;
    priority?: string;
    assignedTo?: number | null;
    lastReplyBy?: string;
}

// API Functions

// Get all tickets for the current user
export async function getTickets(filters?: { status?: string; priority?: string; category?: string }): Promise<Ticket[]> {
    let url = '/api/tickets';

    // Add query parameters if filters are provided
    if (filters) {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.priority) params.append('priority', filters.priority);
        if (filters.category) params.append('category', filters.category);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch tickets: ${response.statusText}`);
    }

    return response.json();
}

// Get a specific ticket
export async function getTicket(id: number): Promise<Ticket> {
    const response = await fetch(`/api/tickets/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch ticket: ${response.statusText}`);
    }

    return response.json();
}

// Create a new ticket
export async function createTicket(ticket: NewTicket): Promise<Ticket> {
    const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
    });

    if (!response.ok) {
        throw new Error(`Failed to create ticket: ${response.statusText}`);
    }

    return response.json();
}

// Update a ticket
export async function updateTicket(id: number, update: TicketUpdate): Promise<Ticket> {
    const response = await fetch(`/api/tickets/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    });

    if (!response.ok) {
        throw new Error(`Failed to update ticket: ${response.statusText}`);
    }

    return response.json();
}

// Delete a ticket (admin only)
export async function deleteTicket(id: number): Promise<void> {
    const response = await fetch(`/api/tickets/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete ticket: ${response.statusText}`);
    }
}

// Get messages for a ticket
export async function getTicketMessages(ticketId: number): Promise<TicketMessage[]> {
    const response = await fetch(`/api/tickets/${ticketId}/messages`);

    if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
    }

    return response.json();
}

// Add a message to a ticket
export async function addTicketMessage(ticketId: number, message: NewMessage): Promise<TicketMessage> {
    const response = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });

    if (!response.ok) {
        throw new Error(`Failed to add message: ${response.statusText}`);
    }

    return response.json();
} 