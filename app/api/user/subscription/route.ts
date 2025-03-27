import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userSubscriptions, pricingPackages } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
});

export async function GET(request: NextRequest) {
    try {
        // Get userId from the authenticated session or query param
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Fetch the user's subscription from our database
        const subscription = await db
            .select({
                subscription: userSubscriptions,
                package: pricingPackages,
            })
            .from(userSubscriptions)
            .leftJoin(pricingPackages, eq(userSubscriptions.packageId, pricingPackages.id))
            .where(and(
                eq(userSubscriptions.userId, parseInt(userId)),
                eq(userSubscriptions.status, 'active')
            ))
            .limit(1);

        if (!subscription || subscription.length === 0) {
            return NextResponse.json({
                hasSubscription: false,
                subscription: null,
                stripeSubscription: null
            });
        }

        // If there's a Stripe subscription ID, fetch details from Stripe
        let stripeSubscription = null;
        if (subscription[0].subscription.stripeSubscriptionId) {
            stripeSubscription = await stripe.subscriptions.retrieve(
                subscription[0].subscription.stripeSubscriptionId
            );
        }

        return NextResponse.json({
            hasSubscription: true,
            subscription: subscription[0],
            stripeSubscription
        });
    } catch (error) {
        console.error('Error fetching subscription:', error);
        return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
    }
} 