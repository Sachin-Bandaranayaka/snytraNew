import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { db } from '@/lib/db';
import { moduleAccess, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
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

        // Get user ID from database
        const userResults = await db.select({
            id: users.id,
        }).from(users).where(eq(users.id, payload.id));

        if (userResults.length === 0) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const userId = userResults[0].id;

        // Enable all modules for the user
        await enableAllModules(userId);

        return NextResponse.json({
            success: true,
            message: "Module access enabled successfully"
        });

    } catch (error) {
        console.error('Enable module access error:', error);
        return NextResponse.json(
            { error: 'Failed to enable module access' },
            { status: 500 }
        );
    }
}

async function enableAllModules(userId: number) {
    try {
        console.log(`Manually enabling module access for user ${userId}`);

        // Enable order management module
        await db.insert(moduleAccess).values({
            companyId: userId,
            moduleName: 'order_management',
            isEnabled: true,
            maxUsers: 5,
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
            createdAt: new Date(),
            updatedAt: new Date(),
        }).onConflictDoUpdate({
            target: [moduleAccess.companyId, moduleAccess.moduleName],
            set: {
                isEnabled: true,
                updatedAt: new Date(),
            }
        });

        // Enable inventory management module
        await db.insert(moduleAccess).values({
            companyId: userId,
            moduleName: 'inventory_management',
            isEnabled: true,
            maxUsers: 5,
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
            createdAt: new Date(),
            updatedAt: new Date(),
        }).onConflictDoUpdate({
            target: [moduleAccess.companyId, moduleAccess.moduleName],
            set: {
                isEnabled: true,
                updatedAt: new Date(),
            }
        });

        // Enable staff management module
        await db.insert(moduleAccess).values({
            companyId: userId,
            moduleName: 'staff_management',
            isEnabled: true,
            maxUsers: 5,
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
            createdAt: new Date(),
            updatedAt: new Date(),
        }).onConflictDoUpdate({
            target: [moduleAccess.companyId, moduleAccess.moduleName],
            set: {
                isEnabled: true,
                updatedAt: new Date(),
            }
        });

        // Enable website management module
        await db.insert(moduleAccess).values({
            companyId: userId,
            moduleName: 'website_management',
            isEnabled: true,
            maxUsers: 5,
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
            createdAt: new Date(),
            updatedAt: new Date(),
        }).onConflictDoUpdate({
            target: [moduleAccess.companyId, moduleAccess.moduleName],
            set: {
                isEnabled: true,
                updatedAt: new Date(),
            }
        });

        console.log(`Module access manually enabled successfully for user ${userId}`);
    } catch (error) {
        console.error(`Error enabling module access for user ${userId}:`, error);
        throw error;
    }
} 