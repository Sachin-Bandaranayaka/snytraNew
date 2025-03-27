import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { pricingPackages, userSubscriptions } from '@/lib/schema';
import { eq } from 'drizzle-orm';

interface RouteParams {
    params: {
        id: string;
    };
}

// GET /api/pricing/packages/[id] - Get a specific pricing package
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid package ID' },
                { status: 400 }
            );
        }

        const pkg = await db
            .select()
            .from(pricingPackages)
            .where(eq(pricingPackages.id, id));

        if (pkg.length === 0) {
            return NextResponse.json(
                { error: 'Pricing package not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(pkg[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching pricing package:', error);
        return NextResponse.json(
            { error: 'Failed to fetch pricing package' },
            { status: 500 }
        );
    }
}

// PUT /api/pricing/packages/[id] - Update a pricing package
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid package ID' },
                { status: 400 }
            );
        }

        const body = await request.json();

        // Validate required fields
        if (!body.name || body.price === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if the package exists
        const existingPackage = await db
            .select({ id: pricingPackages.id })
            .from(pricingPackages)
            .where(eq(pricingPackages.id, id));

        if (existingPackage.length === 0) {
            return NextResponse.json(
                { error: 'Pricing package not found' },
                { status: 404 }
            );
        }

        // Update the package
        const updatedPackage = await db
            .update(pricingPackages)
            .set({
                name: body.name,
                description: body.description || null,
                price: body.price,
                billingCycle: body.billingCycle || 'monthly',
                features: body.features,
                isPopular: body.isPopular || false,
                isActive: body.isActive !== undefined ? body.isActive : true,
                updatedAt: new Date(),
            })
            .where(eq(pricingPackages.id, id))
            .returning();

        return NextResponse.json(updatedPackage[0], { status: 200 });
    } catch (error) {
        console.error('Error updating pricing package:', error);
        return NextResponse.json(
            { error: 'Failed to update pricing package' },
            { status: 500 }
        );
    }
}

// DELETE /api/pricing/packages/[id] - Delete a pricing package
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid package ID' },
                { status: 400 }
            );
        }

        // Check if the package exists
        const existingPackage = await db
            .select({ id: pricingPackages.id })
            .from(pricingPackages)
            .where(eq(pricingPackages.id, id));

        if (existingPackage.length === 0) {
            return NextResponse.json(
                { error: 'Pricing package not found' },
                { status: 404 }
            );
        }

        // Check if any subscriptions are using this package
        const subscriptionsWithPackage = await db
            .select({ id: userSubscriptions.id })
            .from(userSubscriptions)
            .where(eq(userSubscriptions.packageId, id))
            .where(eq(userSubscriptions.status, 'active'));

        if (subscriptionsWithPackage.length > 0) {
            return NextResponse.json(
                { error: 'Cannot delete package because it has active subscriptions' },
                { status: 400 }
            );
        }

        // Delete the package
        await db
            .delete(pricingPackages)
            .where(eq(pricingPackages.id, id));

        return NextResponse.json(
            { message: 'Pricing package deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting pricing package:', error);
        return NextResponse.json(
            { error: 'Failed to delete pricing package' },
            { status: 500 }
        );
    }
} 