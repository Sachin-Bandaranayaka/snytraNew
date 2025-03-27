import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// Middleware for API routes that require admin role
export async function requireAdmin(handler: Function) {
    return async (req: Request) => {
        try {
            const cookieStore = cookies();
            const token = cookieStore.get('auth-token')?.value;

            if (!token) {
                return NextResponse.json(
                    { error: 'Authentication required' },
                    { status: 401 }
                );
            }

            // Verify token
            const secret = new TextEncoder().encode(
                process.env.AUTH_SECRET || 'fallback-secret'
            );

            const verifiedToken = await jwtVerify(token, secret);
            const payload = verifiedToken.payload as { id: number; email: string; role: string };

            // Get user from database
            const userResults = await db
                .select({
                    id: users.id,
                    role: users.role,
                })
                .from(users)
                .where(eq(users.id, payload.id));

            if (userResults.length === 0) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 401 }
                );
            }

            const user = userResults[0];

            if (user.role !== 'admin') {
                return NextResponse.json(
                    { error: 'Admin access required' },
                    { status: 403 }
                );
            }

            // Pass the admin user to the handler
            return handler(req, user);
        } catch (error) {
            console.error('Admin auth error:', error);
            return NextResponse.json(
                { error: 'Authentication failed' },
                { status: 401 }
            );
        }
    };
} 