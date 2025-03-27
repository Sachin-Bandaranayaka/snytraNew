import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactSubmissions } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid ID format' },
                { status: 400 }
            );
        }

        // Update the status to 'read'
        const result = await db.update(contactSubmissions)
            .set({
                status: 'read',
                updatedAt: new Date()
            })
            .where(eq(contactSubmissions.id, id))
            .returning();

        if (result.length === 0) {
            return NextResponse.json(
                { error: 'Contact submission not found' },
                { status: 404 }
            );
        }

        // Revalidate the contacts page to refresh the data
        revalidatePath('/admin/contacts');

        return NextResponse.json({
            success: true,
            message: 'Contact submission marked as read',
            data: result[0]
        });
    } catch (error) {
        console.error('Error updating contact submission:', error);
        return NextResponse.json(
            { error: 'Failed to update contact submission' },
            { status: 500 }
        );
    }
} 