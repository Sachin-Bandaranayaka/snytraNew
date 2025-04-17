import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { companySettings, restaurantTheme, companies } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ restaurant: string }> }
) {
    try {
        // First await params itself, then access the restaurant property
        const params = await context.params;
        const restaurantSlug = params.restaurant;

        // Find the company with the matching custom domain or name
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

        // Get company settings
        const settings = await db.query.companySettings.findFirst({
            where: eq(companySettings.companyId, company.id),
        });

        // Get theme settings
        const theme = await db.query.restaurantTheme.findFirst({
            where: eq(restaurantTheme.companyId, company.id),
        });

        // Return public-safe data (omit sensitive information)
        const publicSettings = settings
            ? {
                logoUrl: settings.logoUrl,
                primaryColor: settings.primaryColor,
                secondaryColor: settings.secondaryColor,
                siteTitle: settings.siteTitle,
                siteDescription: settings.siteDescription,
                businessHours: settings.businessHours,
                address: settings.address,
                phone: settings.phone,
                email: settings.email,
                faviconUrl: settings.faviconUrl,
                bannerImageUrl: settings.bannerImageUrl,
                footerText: settings.footerText,
                metaDescription: settings.metaDescription,
            }
            : {};

        return NextResponse.json({
            settings: publicSettings,
            theme: theme || {},
        });
    } catch (error) {
        console.error("Error fetching restaurant theme:", error);
        return NextResponse.json(
            { error: "Failed to fetch restaurant theme" },
            { status: 500 }
        );
    }
} 