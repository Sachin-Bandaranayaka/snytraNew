import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';

// Input validation schema
const notificationsSchema = z.object({
    emailNotifications: z.boolean(),
    smsNotifications: z.boolean(),
});

// This is a placeholder implementation. In a real application, you would
// store notification preferences in a database table.
export async function PUT(request: NextRequest) {
    try {
        // Get current user
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Parse request body
        const body = await request.json();

        // Validate input data
        const validation = notificationsSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.format() },
                { status: 400 }
            );
        }

        const { emailNotifications, smsNotifications } = validation.data;

        // In a real application, you would update notification preferences in the database
        console.log(`User ${user.id} updated notification preferences:`, {
            emailNotifications,
            smsNotifications,
        });

        // Return success response
        return NextResponse.json({
            message: 'Notification preferences updated successfully'
        });

    } catch (error) {
        console.error('Update notification preferences error:', error);
        return NextResponse.json(
            { error: 'Something went wrong while updating notification preferences' },
            { status: 500 }
        );
    }
} 