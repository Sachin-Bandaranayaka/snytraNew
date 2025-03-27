import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userSubscriptions } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

// Initialize Stripe
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

export async function GET(request: NextRequest) {
    try {
        // Get userId from the authenticated session or query param
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        try {
            // Fetch the user's subscription to get the Stripe customer ID
            const userSub = await db
                .select()
                .from(userSubscriptions)
                .where(eq(userSubscriptions.userId, parseInt(userId)))
                .limit(1);

            if (!userSub || userSub.length === 0) {
                console.log('No subscription found for user:', userId);
                return NextResponse.json({ invoices: [] });
            }

            // Check if Stripe customer ID exists
            if (!userSub[0].stripeCustomerId) {
                console.log('User has subscription but no Stripe customer ID:', userId);
                return NextResponse.json({ invoices: [] });
            }

            // Check if Stripe is initialized
            if (!stripe) {
                console.error('Stripe client not initialized');
                return NextResponse.json({ invoices: [], error: 'Stripe not configured' });
            }

            // Fetch invoices from Stripe
            const invoices = await stripe.invoices.list({
                customer: userSub[0].stripeCustomerId,
                limit: 10,
            });

            return NextResponse.json({ invoices: invoices.data });
        } catch (dbError) {
            console.error('Database error:', dbError);
            // Return empty invoices array instead of error to ensure UI doesn't break
            return NextResponse.json({ invoices: [] });
        }
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return NextResponse.json({
            error: 'Failed to fetch invoices',
            message: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
} 