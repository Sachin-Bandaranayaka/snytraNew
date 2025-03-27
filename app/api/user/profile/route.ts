import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';

// Input validation schema
const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
});

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
        const validation = profileSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.format() },
                { status: 400 }
            );
        }

        const { name } = validation.data;

        // Update user in database
        const result = await db.update(users)
            .set({
                name,
                updatedAt: new Date()
            })
            .where(eq(users.id, user.id))
            .returning({
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role
            });

        if (result.length === 0) {
            return NextResponse.json(
                { error: 'Failed to update profile' },
                { status: 500 }
            );
        }

        // Return success response with updated user data
        return NextResponse.json({
            message: 'Profile updated successfully',
            user: result[0]
        });

    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json(
            { error: 'Something went wrong during profile update' },
            { status: 500 }
        );
    }
} 