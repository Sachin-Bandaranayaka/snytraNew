import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userSubscriptions, pricingPackages } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import Stripe from 'stripe';

// Initialize Stripe
let stripe: Stripe | null = null;

try {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error('Missing STRIPE_SECRET_KEY environment variable');
    } else {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2023-10-16', // Use a stable version
        });
    }
} catch (error) {
    console.error('Failed to initialize Stripe client:', error);
}

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

        // Return no subscription if none found
        if (!subscription || subscription.length === 0) {
            console.log(`No active subscription found for user ${userId}`);
            return NextResponse.json({
                hasSubscription: false,
                subscription: null,
                stripeSubscription: null
            });
        }

        console.log(`Found subscription for user ${userId}:`, JSON.stringify(subscription[0], null, 2));

        // If there's a Stripe subscription ID, fetch details from Stripe
        let stripeSubscription = null;
        if (subscription[0].subscription.stripeSubscriptionId && stripe) {
            try {
                // Skip Stripe API call if using bypass_verification value
                if (subscription[0].subscription.stripeSubscriptionId === 'bypass_verification') {
                    console.log('Using bypass_verification subscription ID - skipping Stripe API call');
                } else {
                    stripeSubscription = await stripe.subscriptions.retrieve(
                        subscription[0].subscription.stripeSubscriptionId
                    );
                    console.log(`Retrieved Stripe subscription: ${subscription[0].subscription.stripeSubscriptionId}`);
                }
            } catch (stripeError) {
                console.error(`Error retrieving Stripe subscription: ${stripeError}`);
                // Don't fail the request if Stripe data can't be retrieved
            }
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