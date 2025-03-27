import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, pricingPackages, userSubscriptions } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { addMonths } from 'date-fns';

// Create a test subscription for a user
export async function GET(request: NextRequest) {
    // For testing purposes only - would be removed in production
    try {
        // Get userId from query params
        const userId = request.nextUrl.searchParams.get('userId');

        // Now trying a hardcoded userId (for easier testing, remove in production)
        const effectiveUserId = userId || '1'; // Default to user ID 1 if not provided

        console.log(`Creating test subscription for user ID: ${effectiveUserId}`);

        // Get or create a pricing package
        const existingPackages = await db.select().from(pricingPackages).limit(1);
        let packageId;

        if (existingPackages.length > 0) {
            packageId = existingPackages[0].id;
        } else {
            // Create a sample package if none exists
            const result = await db.insert(pricingPackages).values({
                name: 'Premium Plan',
                description: 'Our best plan for restaurants',
                price: 9900, // $99.00
                billingCycle: 'monthly',
                features: JSON.stringify([
                    'Online Ordering System',
                    'Reservation Management',
                    '24/7 Support',
                    'Analytics Dashboard',
                    'Multiple Staff Accounts'
                ]),
                isPopular: true,
                isActive: true
            }).returning({ id: pricingPackages.id });

            packageId = result[0].id;
        }

        // Check if user already has a subscription
        const existingSubs = await db
            .select()
            .from(userSubscriptions)
            .where(eq(userSubscriptions.userId, parseInt(effectiveUserId)));

        const startDate = new Date();
        const endDate = addMonths(startDate, 1); // Subscription for 1 month

        let subscription;

        if (existingSubs.length > 0) {
            // Update existing subscription
            subscription = await db
                .update(userSubscriptions)
                .set({
                    packageId,
                    startDate,
                    endDate,
                    status: 'active',
                    paymentStatus: 'paid',
                    stripeCustomerId: 'cus_test_12345',
                    stripeSubscriptionId: 'sub_test_12345',
                    updatedAt: new Date()
                })
                .where(eq(userSubscriptions.userId, parseInt(effectiveUserId)))
                .returning();
        } else {
            // Create new subscription
            subscription = await db
                .insert(userSubscriptions)
                .values({
                    userId: parseInt(effectiveUserId),
                    packageId,
                    startDate,
                    endDate,
                    status: 'active',
                    paymentStatus: 'paid',
                    stripeCustomerId: 'cus_test_12345',
                    stripeSubscriptionId: 'sub_test_12345'
                })
                .returning();
        }

        return NextResponse.json({
            success: true,
            message: 'Test subscription created/updated successfully',
            subscription: subscription[0]
        });

    } catch (error: any) {
        console.error('Error creating test subscription:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
} 