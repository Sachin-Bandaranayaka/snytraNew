import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supportTickets, ticketMessages, users } from '@/lib/schema';
import { eq, and, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

// GET /api/tickets/[id]/messages - Get all messages for a ticket
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const ticketId = parseInt(params.id);

        if (isNaN(ticketId)) {
            return NextResponse.json({ error: 'Invalid ticket ID' }, { status: 400 });
        }

        // Get the ticket to check permissions
        const [ticket] = await db.select()
            .from(supportTickets)
            .where(eq(supportTickets.id, ticketId));

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        // Check if user has access to this ticket
        if (currentUser.role !== 'admin' && ticket.userId !== currentUser.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Get messages for the ticket
        // For regular users, filter out internal messages
        let query = db.select({
            id: ticketMessages.id,
            ticketId: ticketMessages.ticketId,
            userId: ticketMessages.userId,
            message: ticketMessages.message,
            isInternal: ticketMessages.isInternal,
            attachments: ticketMessages.attachments,
            createdAt: ticketMessages.createdAt,
            user: {
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role,
            },
        })
            .from(ticketMessages)
            .innerJoin(users, eq(ticketMessages.userId, users.id))
            .where(eq(ticketMessages.ticketId, ticketId));

        // Filter out internal messages for non-admin users
        if (currentUser.role !== 'admin') {
            query = query.where(eq(ticketMessages.isInternal, false));
        }

        // Order by creation date (oldest first)
        query = query.orderBy(ticketMessages.createdAt);

        const messages = await query;

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

// POST /api/tickets/[id]/messages - Add a message to a ticket
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const ticketId = parseInt(params.id);

        if (isNaN(ticketId)) {
            return NextResponse.json({ error: 'Invalid ticket ID' }, { status: 400 });
        }

        // Get the ticket to check permissions
        const [ticket] = await db.select()
            .from(supportTickets)
            .where(eq(supportTickets.id, ticketId));

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        // Check if user has access to this ticket
        if (currentUser.role !== 'admin' && ticket.userId !== currentUser.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const data = await request.json();

        // Validate data
        if (!data.message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Check if isInternal is set (only admins can create internal notes)
        if (data.isInternal && currentUser.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized to create internal notes' }, { status: 403 });
        }

        // Create the message
        const [newMessage] = await db.insert(ticketMessages)
            .values({
                ticketId,
                userId: currentUser.id,
                message: data.message,
                isInternal: data.isInternal || false,
                attachments: data.attachments || null,
            })
            .returning();

        // Update the ticket's lastReplyBy and status if needed
        await db.update(supportTickets)
            .set({
                lastReplyBy: currentUser.role === 'admin' ? 'admin' : 'user',
                status: data.isInternal ? ticket.status : (ticket.status === 'closed' ? 'open' : ticket.status),
                updatedAt: new Date(),
            })
            .where(eq(supportTickets.id, ticketId));

        // Get the user info
        const [user] = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
        })
            .from(users)
            .where(eq(users.id, currentUser.id));

        return NextResponse.json({
            ...newMessage,
            user,
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating message:', error);
        return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
    }
} 