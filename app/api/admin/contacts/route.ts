import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactSubmissions } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
    try {
        // Fetch all contact submissions, ordered by most recent first
        const submissions = await db.select()
            .from(contactSubmissions)
            .orderBy(desc(contactSubmissions.createdAt));

        return NextResponse.json(submissions);
    } catch (error) {
        console.error('Error fetching contact submissions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contact submissions' },
            { status: 500 }
        );
    }
} 