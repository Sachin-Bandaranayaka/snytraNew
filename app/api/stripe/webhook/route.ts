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
    console.log('Webhook received:', new Date().toISOString());

    try {
        const body = await request.text();
        const signature = request.headers.get('stripe-signature') as string;

        if (!signature) {
            console.error('Missing Stripe signature');
            return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
        }

        // Check if Stripe is initialized
        if (!stripe) {
            console.error('Stripe is not configured correctly');
            return NextResponse.json({ error: 'Stripe is not configured correctly' }, { status: 500 });
        }

        // Verify the webhook signature
        const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!stripeWebhookSecret) {
            console.error('Missing STRIPE_WEBHOOK_SECRET environment variable');
            return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
        }

        let event;
        try {
            // Construct the event
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                stripeWebhookSecret
            );
            console.log(`Webhook event received: ${event.type} [${event.id}]`);
        } catch (err: any) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
        }

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                console.log('Processing checkout.session.completed event');
                const session = event.data.object as Stripe.Checkout.Session;
                console.log('Session data:', JSON.stringify(session, null, 2));

                // Extract the customer and subscription data
                const customerId = session.customer as string;
                const subscriptionId = session.subscription as string;
                const userId = session.client_reference_id;

                console.log('Extracted data:', {
                    customerId,
                    subscriptionId,
                    userId,
                    metadata: session.metadata || 'no metadata'
                });

                if (!userId) {
                    console.error('No user ID provided in session');
                    return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
                }

                // Get package details from the session metadata
                const packageId = session.metadata?.packageId;
                console.log(`Processing subscription for user ${userId} with package ${packageId}`);

                if (!packageId) {
                    console.error('No package ID provided in session metadata');
                    return NextResponse.json({ error: 'No package ID provided' }, { status: 400 });
                }

                try {
                    // Create or update the user subscription
                    await db.insert(userSubscriptions).values({
                        userId: Number(userId),
                        packageId: Number(packageId),
                        startDate: new Date(),
                        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                        status: 'active',
                        paymentStatus: 'paid',
                        // Store Stripe customer and subscription IDs for future reference
                        stripeCustomerId: customerId,
                        stripeSubscriptionId: subscriptionId,
                        createdAt: new Date(),
                        updatedAt: new Date()
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
                    console.log(`Subscription created/updated successfully for user ${userId}`);
                } catch (dbError) {
                    console.error('Database error while processing subscription:', dbError);
                    return NextResponse.json({ error: 'Database error while processing subscription' }, { status: 500 });
                }
                break;

            case 'customer.subscription.updated':
                console.log('Processing customer.subscription.updated event');
                const subscription = event.data.object as Stripe.Subscription;
                console.log('Subscription data:', JSON.stringify(subscription, null, 2));

                try {
                    // Find the subscription in our database using the Stripe subscription ID
                    const existingSubs = await db
                        .select()
                        .from(userSubscriptions)
                        .where(eq(userSubscriptions.stripeSubscriptionId, subscription.id));

                    if (existingSubs.length === 0) {
                        console.log(`No subscription found with Stripe ID: ${subscription.id}`);
                        return NextResponse.json({ received: true, message: 'No matching subscription found' });
                    }

                    const existingSub = existingSubs[0];

                    // Update the subscription status
                    const status = subscription.status === 'active' ? 'active' :
                        subscription.status === 'canceled' ? 'cancelled' :
                            subscription.status === 'past_due' ? 'past_due' : 'inactive';

                    await db
                        .update(userSubscriptions)
                        .set({
                            status,
                            updatedAt: new Date(),
                            // If there's a current_period_end, update the endDate
                            ...(subscription.current_period_end ? {
                                endDate: new Date(subscription.current_period_end * 1000)
                            } : {})
                        })
                        .where(eq(userSubscriptions.id, existingSub.id));

                    console.log(`Subscription ${existingSub.id} updated with status: ${status}`);
                } catch (dbError) {
                    console.error('Database error while updating subscription:', dbError);
                    return NextResponse.json({ error: 'Database error while updating subscription' }, { status: 500 });
                }
                break;

            case 'customer.subscription.deleted':
                console.log('Processing customer.subscription.deleted event');
                const deletedSubscription = event.data.object as Stripe.Subscription;
                console.log('Deleted Subscription ID:', deletedSubscription.id);

                try {
                    // Find and update the subscription in our database
                    await db
                        .update(userSubscriptions)
                        .set({
                            status: 'cancelled',
                            updatedAt: new Date()
                        })
                        .where(eq(userSubscriptions.stripeSubscriptionId, deletedSubscription.id));

                    console.log(`Subscription with Stripe ID ${deletedSubscription.id} marked as cancelled`);
                } catch (dbError) {
                    console.error('Database error while cancelling subscription:', dbError);
                    return NextResponse.json({ error: 'Database error while cancelling subscription' }, { status: 500 });
                }
                break;

            case 'invoice.payment_succeeded':
                console.log('Processing invoice.payment_succeeded event');
                // Handle successful invoice payment
                break;

            case 'invoice.payment_failed':
                console.log('Processing invoice.payment_failed event');
                // Handle failed invoice payment
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true, eventType: event.type });
    } catch (err) {
        console.error('Webhook error:', err);
        return NextResponse.json(
            { error: 'Webhook handler failed', message: err instanceof Error ? err.message : String(err) },
            { status: 500 }
        );
    }
} 