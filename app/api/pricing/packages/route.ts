import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { pricingPackages } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// GET /api/pricing/packages - Get all pricing packages
export async function GET(request: NextRequest) {
    try {
        const packages = await db
            .select()
            .from(pricingPackages)
            .orderBy(pricingPackages.price);

        return NextResponse.json(packages, { status: 200 });
    } catch (error) {
        console.error('Error fetching pricing packages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch pricing packages' },
            { status: 500 }
        );
    }
}

// POST /api/pricing/packages - Create a new pricing package
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || body.price === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Insert new pricing package
        const newPackage = await db
            .insert(pricingPackages)
            .values({
                name: body.name,
                description: body.description || null,
                price: body.price,
                billingCycle: body.billingCycle || 'monthly',
                features: body.features,
                isPopular: body.isPopular || false,
                isActive: body.isActive !== undefined ? body.isActive : true,
            })
            .returning();

        return NextResponse.json(newPackage[0], { status: 201 });
    } catch (error) {
        console.error('Error creating pricing package:', error);
        return NextResponse.json(
            { error: 'Failed to create pricing package' },
            { status: 500 }
        );
    }
} 