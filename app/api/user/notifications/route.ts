import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';

// Input validation schema
const notificationsSchema = z.object({
    emailNotifications: z.boolean(),
    smsNotifications: z.boolean(),
});

// Mark all as read validation schema
const markAllReadSchema = z.object({
    userId: z.string().or(z.number()).optional(),
});

// GET /api/user/notifications - Get all notifications for the current user
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

        // Verify user has permission to access these notifications
        if (userId && user.id.toString() !== userId && user.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized to access these notifications' },
                { status: 403 }
            );
        }

        // In a real application, you would fetch notifications from the database
        // This is sample data for demonstration purposes
        const sampleNotifications = [
            {
                id: 1,
                title: "Subscription Renewal",
                content: "Your subscription will renew in 15 days. Please update payment method if needed.",
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                read: false
            },
            {
                id: 2,
                title: "New Feature Available",
                content: "We've added a new AI-powered menu optimization tool. Check it out!",
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
                read: true
            },
            {
                id: 3,
                title: "System Maintenance",
                content: "Scheduled maintenance completed successfully. All systems operational.",
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                read: true
            }
        ];

        // Return notifications
        return NextResponse.json({
            notifications: sampleNotifications
        });

    } catch (error) {
        console.error('Get notifications error:', error);
        return NextResponse.json(
            { error: 'Something went wrong while fetching notifications' },
            { status: 500 }
        );
    }
}

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

// Mark all notifications as read
export async function PATCH(request: NextRequest) {
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
        const validation = markAllReadSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.format() },
                { status: 400 }
            );
        }

        const { userId } = validation.data;

        // Verify user has permission
        if (userId && user.id.toString() !== userId && user.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized to mark these notifications as read' },
                { status: 403 }
            );
        }

        // In a real application, you would update the database
        console.log(`User ${user.id} marked all notifications as read`);

        // Return success response
        return NextResponse.json({
            message: 'All notifications marked as read'
        });

    } catch (error) {
        console.error('Mark all notifications read error:', error);
        return NextResponse.json(
            { error: 'Something went wrong while marking notifications as read' },
            { status: 500 }
        );
    }
} 