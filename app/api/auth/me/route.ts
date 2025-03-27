import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { db } from '@/lib/db';
import { users, companies } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    try {
        // Get token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
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
        const userResults = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            companyId: users.companyId,
            jobTitle: users.jobTitle,
            phoneNumber: users.phoneNumber,
            createdAt: users.createdAt,
        }).from(users).where(eq(users.id, payload.id));

        if (userResults.length === 0) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const user = userResults[0];
        let companyData = null;

        // Fetch company data if companyId exists
        if (user.companyId) {
            const companyResults = await db.select().from(companies).where(eq(companies.id, user.companyId));
            if (companyResults.length > 0) {
                companyData = companyResults[0];
            }
        }

        return NextResponse.json({
            user,
            company: companyData
        });

    } catch (error) {
        console.error('Get current user error:', error);
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 401 }
        );
    }
} 