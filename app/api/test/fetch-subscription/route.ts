import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userSubscriptions, pricingPackages } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    try {
        // Get userId from the query param
        const userId = request.nextUrl.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        console.log(`Fetching subscription for user ID: ${userId}`);

        // Fetch the user's subscription from our database
        const subscription = await db
            .select({
                subscription: userSubscriptions,
                package: pricingPackages,
            })
            .from(userSubscriptions)
            .leftJoin(pricingPackages, eq(userSubscriptions.packageId, pricingPackages.id))
            .where(eq(userSubscriptions.userId, parseInt(userId)))
            .limit(1);

        console.log('Subscription query result:', JSON.stringify(subscription));

        if (!subscription || subscription.length === 0) {
            return NextResponse.json({
                hasSubscription: false,
                message: 'No subscription found for this user',
                subscription: null
            });
        }

        return NextResponse.json({
            hasSubscription: true,
            message: 'Subscription found',
            subscription: subscription[0]
        });
    } catch (error: any) {
        console.error('Error fetching subscription:', error);
        return NextResponse.json({
            hasSubscription: false,
            error: 'Failed to fetch subscription',
            message: error.message
        }, { status: 500 });
    }
} 