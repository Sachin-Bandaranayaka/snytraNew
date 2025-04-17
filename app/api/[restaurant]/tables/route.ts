import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { restaurantTables, companies } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

// GET /api/[restaurant]/tables - Get all tables for a specific restaurant
export async function GET(
    request: NextRequest,
    { params }: { params: { restaurant: Promise<string> | string } }
) {
    try {
        // Must await the params in Next.js 15+
        const restaurantSlug = await params.restaurant;

        // Find the company with the matching slug
        const company = await db.query.companies.findFirst({
            where: (companies) => {
                return eq(companies.name, restaurantSlug);
            },
        });

        if (!company) {
            return NextResponse.json(
                { error: "Restaurant not found" },
                { status: 404 }
            );
        }

        // Get query parameters
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location');
        const status = searchParams.get('status') || 'available'; // Default to available
        const minCapacity = searchParams.get('minCapacity');

        // Build the query to get tables for this restaurant
        let query = db.select().from(restaurantTables)
            .where(
                and(
                    eq(restaurantTables.companyId, company.id),
                    eq(restaurantTables.isActive, true)
                )
            );

        // Apply additional filters
        if (location) {
            query = query.where(eq(restaurantTables.location, location));
        }

        if (status) {
            query = query.where(eq(restaurantTables.status, status));
        }

        if (minCapacity) {
            query = query.where(eq(restaurantTables.capacity, parseInt(minCapacity, 10)));
        }

        const tables = await query;

        return NextResponse.json({
            success: true,
            tables,
            restaurant: restaurantSlug
        });
    } catch (error) {
        console.error("Error fetching restaurant tables:", error);
        return NextResponse.json(
            { error: "Failed to fetch tables" },
            { status: 500 }
        );
    }
} 