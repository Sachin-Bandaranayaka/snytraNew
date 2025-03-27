import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactSubmissions } from '@/lib/schema';

export async function POST(request: Request) {
    try {
        const { name, email, phone, message } = await request.json();

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Save to database
        const result = await db.insert(contactSubmissions).values({
            name,
            email,
            subject: phone, // Using phone number as subject
            message,
            status: 'new',
        }).returning();

        return NextResponse.json({
            success: true,
            message: 'Contact form submitted successfully',
            data: result[0]
        });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return NextResponse.json(
            { error: 'Failed to submit contact form' },
            { status: 500 }
        );
    }
} 