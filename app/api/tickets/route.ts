import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supportTickets, users } from '@/lib/schema';
import { desc, eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

// GET /api/tickets - Get all tickets for the current user (or all tickets for admin)
export async function GET(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status');
        const priority = searchParams.get('priority');
        const category = searchParams.get('category');

        let query = db.select({
            id: supportTickets.id,
            subject: supportTickets.subject,
            description: supportTickets.description,
            status: supportTickets.status,
            priority: supportTickets.priority,
            category: supportTickets.category,
            createdAt: supportTickets.createdAt,
            updatedAt: supportTickets.updatedAt,
            lastReplyBy: supportTickets.lastReplyBy,
            userId: supportTickets.userId,
            assignedTo: supportTickets.assignedTo,
        })
            .from(supportTickets);

        // Apply filters
        if (status) {
            query = query.where(eq(supportTickets.status, status));
        }

        if (priority) {
            query = query.where(eq(supportTickets.priority, priority));
        }

        if (category) {
            query = query.where(eq(supportTickets.category, category));
        }

        // For normal users, only show their own tickets
        // For admins, show all tickets
        if (currentUser.role !== 'admin') {
            query = query.where(eq(supportTickets.userId, currentUser.id));
        }

        // Order by latest tickets first
        query = query.orderBy(desc(supportTickets.createdAt));

        const tickets = await query;

        return NextResponse.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
    }
}

// POST /api/tickets - Create a new ticket
export async function POST(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();

        // Validate request data
        if (!data.subject || !data.description || !data.category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create the ticket
        const [newTicket] = await db.insert(supportTickets)
            .values({
                userId: currentUser.id,
                subject: data.subject,
                description: data.description,
                category: data.category,
                priority: data.priority || 'medium',
                status: 'open',
                lastReplyBy: 'user',
            })
            .returning();

        return NextResponse.json(newTicket, { status: 201 });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
    }
} 