import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { db } from './db';
import { users } from './schema';
import { eq } from 'drizzle-orm';
import { NextAuthOptions } from 'next-auth';

// NextAuth options for authentication configuration
export const authOptions: NextAuthOptions = {
    // Define your auth providers, callbacks, and options here
    // This is intentionally minimal, just to satisfy the import
    // You should configure this with your actual authentication needs
    providers: [],
    secret: process.env.AUTH_SECRET || 'fallback-secret',
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as number;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};

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

        return await handler(req, user);
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

        return await handler(req, user);
    };
} 