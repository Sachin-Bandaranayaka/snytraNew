import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supportTickets, users } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

// GET /api/tickets/[id] - Get a specific ticket
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const unwrappedParams = await params;
        const ticketId = parseInt(unwrappedParams.id);

        if (isNaN(ticketId)) {
            return NextResponse.json({ error: 'Invalid ticket ID' }, { status: 400 });
        }

        // Query for the ticket
        const [ticket] = await db.select()
            .from(supportTickets)
            .where(eq(supportTickets.id, ticketId));

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        // Ensure the user has access to this ticket
        if (currentUser.role !== 'admin' && ticket.userId !== currentUser.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Get assigned user info if available
        let assignedToUser = null;
        if (ticket.assignedTo) {
            const [user] = await db.select({
                id: users.id,
                name: users.name,
                email: users.email,
            })
                .from(users)
                .where(eq(users.id, ticket.assignedTo));

            assignedToUser = user;
        }

        return NextResponse.json({
            ...ticket,
            assignedToUser,
        });
    } catch (error) {
        console.error('Error fetching ticket:', error);
        return NextResponse.json({ error: 'Failed to fetch ticket' }, { status: 500 });
    }
}

// PATCH /api/tickets/[id] - Update a ticket (status, priority, assigned user)
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const unwrappedParams = await params;
        const ticketId = parseInt(unwrappedParams.id);

        if (isNaN(ticketId)) {
            return NextResponse.json({ error: 'Invalid ticket ID' }, { status: 400 });
        }

        // Get the ticket
        const [ticket] = await db.select()
            .from(supportTickets)
            .where(eq(supportTickets.id, ticketId));

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        // Only admin or the ticket owner can update the ticket
        if (currentUser.role !== 'admin' && ticket.userId !== currentUser.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const data = await request.json();

        // Prepare update data
        const updateData: any = {};

        // Regular users can only close their tickets
        if (currentUser.role !== 'admin') {
            if (data.status === 'closed') {
                updateData.status = 'closed';
            } else {
                return NextResponse.json({ error: 'Unauthorized to update this field' }, { status: 403 });
            }
        } else {
            // Admins can update all fields
            if (data.status) updateData.status = data.status;
            if (data.priority) updateData.priority = data.priority;
            if (data.assignedTo !== undefined) updateData.assignedTo = data.assignedTo;

            // Mark who replied last if specified
            if (data.lastReplyBy) updateData.lastReplyBy = data.lastReplyBy;
        }

        // Update the ticket
        const [updatedTicket] = await db.update(supportTickets)
            .set({
                ...updateData,
                updatedAt: new Date(),
            })
            .where(eq(supportTickets.id, ticketId))
            .returning();

        return NextResponse.json(updatedTicket);
    } catch (error) {
        console.error('Error updating ticket:', error);
        return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
    }
}

// DELETE /api/tickets/[id] - Delete a ticket (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const unwrappedParams = await params;
        const ticketId = parseInt(unwrappedParams.id);

        if (isNaN(ticketId)) {
            return NextResponse.json({ error: 'Invalid ticket ID' }, { status: 400 });
        }

        // Delete the ticket
        await db.delete(supportTickets)
            .where(eq(supportTickets.id, ticketId));

        return NextResponse.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        return NextResponse.json({ error: 'Failed to delete ticket' }, { status: 500 });
    }
} 