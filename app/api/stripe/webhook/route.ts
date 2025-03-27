import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { userSubscriptions, pricingPackages, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// Initialize Stripe with your secret key from environment variable
let stripe: Stripe | null = null;

try {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error('Missing STRIPE_SECRET_KEY environment variable');
    } else {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2025-02-24.acacia',
        });
    }
} catch (error) {
    console.error('Failed to initialize Stripe client:', error);
}

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature') as string;

    if (!signature) {
        return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
    }

    // Check if Stripe is initialized
    if (!stripe) {
        return NextResponse.json({ error: 'Stripe is not configured correctly' }, { status: 500 });
    }

    try {
        // Verify the webhook signature
        const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!stripeWebhookSecret) {
            console.error('Missing STRIPE_WEBHOOK_SECRET environment variable');
            return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
        }

        // Construct the event
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            stripeWebhookSecret
        );

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object as Stripe.Checkout.Session;

                // Extract the customer and subscription data
                const customerId = session.customer as string;
                const subscriptionId = session.subscription as string;
                const userId = session.client_reference_id;

                if (!userId) {
                    console.error('No user ID provided in session');
                    return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
                }

                // Get package details from the session metadata
                const packageId = session.metadata?.packageId;

                if (!packageId) {
                    console.error('No package ID provided in session metadata');
                    return NextResponse.json({ error: 'No package ID provided' }, { status: 400 });
                }

                // Create or update the user subscription
                await db.insert(userSubscriptions).values({
                    userId: Number(userId),
                    packageId: Number(packageId),
                    startDate: new Date(),
                    status: 'active',
                    paymentStatus: 'paid',
                    // Store Stripe customer and subscription IDs for future reference
                    stripeCustomerId: customerId,
                    stripeSubscriptionId: subscriptionId,
                }).onConflictDoUpdate({
                    target: [userSubscriptions.userId, userSubscriptions.packageId],
                    set: {
                        status: 'active',
                        paymentStatus: 'paid',
                        stripeCustomerId: customerId,
                        stripeSubscriptionId: subscriptionId,
                        updatedAt: new Date(),
                    }
                });

                break;

            case 'customer.subscription.updated':
                const subscription = event.data.object as Stripe.Subscription;
                // Update subscription status based on the subscription object
                // Implement logic to update subscription in your database
                break;

            case 'customer.subscription.deleted':
                const deletedSubscription = event.data.object as Stripe.Subscription;
                // Mark subscription as cancelled
                // Implement logic to update subscription in your database
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error('Webhook error:', err);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 400 }
        );
    }
} 