import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import * as bcrypt from 'bcryptjs';

// Input validation schema
const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
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
        const validation = passwordSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.format() },
                { status: 400 }
            );
        }

        const { currentPassword, newPassword } = validation.data;

        // Get user with password
        const userResults = await db.select()
            .from(users)
            .where(eq(users.id, user.id));

        if (userResults.length === 0) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const userWithPassword = userResults[0];

        // Verify current password
        const passwordMatch = await bcrypt.compare(
            currentPassword,
            userWithPassword.password as string
        );

        if (!passwordMatch) {
            return NextResponse.json(
                { error: 'Current password is incorrect' },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        await db.update(users)
            .set({
                password: hashedPassword,
                updatedAt: new Date()
            })
            .where(eq(users.id, user.id));

        // Return success response
        return NextResponse.json({
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error('Password update error:', error);
        return NextResponse.json(
            { error: 'Something went wrong during password update' },
            { status: 500 }
        );
    }
} 