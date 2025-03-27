import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import * as bcrypt from 'bcryptjs';

// Input validation schema
const userSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate input data
        const validation = userSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.format() },
                { status: 400 }
            );
        }

        const { name, email, password } = validation.data;

        // Check if user with email already exists
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning({ id: users.id, name: users.name, email: users.email, role: users.role });

        // Return success response with user data (excluding password)
        return NextResponse.json({
            message: 'User registered successfully',
            user: result[0]
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Something went wrong during registration' },
            { status: 500 }
        );
    }
} 