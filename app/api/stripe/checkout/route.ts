import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { pricingPackages } from '@/lib/schema';
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

// Create a Stripe checkout session
export async function POST(request: NextRequest) {
    try {
        // Check if Stripe is initialized
        if (!stripe) {
            return NextResponse.json(
                { error: 'Stripe is not configured correctly' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { packageId, userId, billingPeriod = 'monthly', successUrl, cancelUrl } = body;

        if (!packageId || !successUrl || !cancelUrl) {
            return NextResponse.json(
                { error: 'Missing required fields: packageId, successUrl, cancelUrl' },
                { status: 400 }
            );
        }

        // Fetch the pricing package from the database
        const [pricingPackage] = await db
            .select()
            .from(pricingPackages)
            .where(eq(pricingPackages.id, packageId));

        if (!pricingPackage) {
            return NextResponse.json(
                { error: 'Pricing package not found' },
                { status: 404 }
            );
        }

        // Calculate price based on billing period
        let finalPrice = pricingPackage.price;
        let interval = 'month';

        if (billingPeriod === 'yearly') {
            // Apply 5% discount for yearly billing
            finalPrice = Math.round(pricingPackage.price * 12 * 0.95);
            interval = 'year';
        }

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${pricingPackage.name} (${billingPeriod.charAt(0).toUpperCase() + billingPeriod.slice(1)})`,
                            description: pricingPackage.description || undefined,
                        },
                        unit_amount: finalPrice, // Price in cents
                        recurring: {
                            interval: interval as 'month' | 'year',
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: successUrl,
            cancel_url: cancelUrl,
            // Include metadata to use in the webhook
            metadata: {
                packageId: packageId.toString(),
                billingPeriod,
            },
            // Include client_reference_id to identify the user (if logged in)
            ...(userId ? { client_reference_id: userId.toString() } : {}),

            billing_address_collection: 'required',
            // Allow promotion codes
            allow_promotion_codes: true,
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
} 