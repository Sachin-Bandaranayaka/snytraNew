import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { db } from './db';
import { users } from './schema';
import { eq } from 'drizzle-orm';

// Get the current user from the auth token
export async function getCurrentUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return null;
        }

        // Verify token
        const secret = new TextEncoder().encode(
            process.env.AUTH_SECRET || 'fallback-secret'
        );

        const verifiedToken = await jwtVerify(token, secret);
        const payload = verifiedToken.payload as { id: number; email: string; role: string };

        // Get user from database
        const userResults = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            createdAt: users.createdAt,
        }).from(users).where(eq(users.id, payload.id));

        if (userResults.length === 0) {
            return null;
        }

        return userResults[0];
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
}

// Middleware for API routes that require authentication
export async function requireAuth(handler: Function) {
    return async (req: Request) => {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        return handler(req, user);
    };
}

// Middleware for API routes that require admin role
export async function requireAdmin(handler: Function) {
    return async (req: Request) => {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        if (user.role !== 'admin') {
            return NextResponse.json(
                { error: 'Admin access required' },
                { status: 403 }
            );
        }

        return handler(req, user);
    };
} 