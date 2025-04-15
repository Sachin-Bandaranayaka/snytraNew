import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

// GET /api/user/tickets - Get tickets for the current user
export async function GET(request: NextRequest) {
    try {
        // Get current user
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const userId = searchParams.get('userId');

        // Verify user has permission to access these tickets
        if (userId && user.id.toString() !== userId && user.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized to access these tickets' },
                { status: 403 }
            );
        }

        // Forward to the main tickets endpoint
        const mainTicketsUrl = new URL('/api/tickets', request.url);

        // Preserve all original query parameters
        searchParams.forEach((value, key) => {
            mainTicketsUrl.searchParams.append(key, value);
        });

        // Use the fetch API to call our own tickets endpoint
        const response = await fetch(mainTicketsUrl.toString(), {
            headers: {
                // Forward authentication headers
                cookie: request.headers.get('cookie') || '',
                authorization: request.headers.get('authorization') || ''
            }
        });

        // If the tickets endpoint returns successfully
        if (response.ok) {
            const data = await response.json();
            return NextResponse.json({ tickets: data });
        } else {
            // If there was an error from the tickets endpoint
            const errorText = await response.text();
            return NextResponse.json(
                { error: 'Failed to fetch tickets', details: errorText },
                { status: response.status }
            );
        }

    } catch (error) {
        console.error('Get user tickets error:', error);
        return NextResponse.json(
            { error: 'Something went wrong while fetching tickets' },
            { status: 500 }
        );
    }
}

// POST /api/user/tickets - Create a new ticket
export async function POST(request: NextRequest) {
    try {
        // Get current user
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Forward to the main tickets endpoint
        const mainTicketsUrl = new URL('/api/tickets', request.url);

        // Use the fetch API to call our own tickets endpoint
        const response = await fetch(mainTicketsUrl.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                cookie: request.headers.get('cookie') || '',
                authorization: request.headers.get('authorization') || ''
            },
            body: await request.text()
        });

        // Return the response from the main endpoint
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });

    } catch (error) {
        console.error('Create user ticket error:', error);
        return NextResponse.json(
            { error: 'Something went wrong while creating the ticket' },
            { status: 500 }
        );
    }
} 