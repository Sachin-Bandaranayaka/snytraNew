import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { companySettings, restaurantTheme, users, companies } from "@/lib/schema";
import { validateUser, getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

// Get theme settings for the current user's company
export async function GET(request: NextRequest) {
    try {
        // Validate the user and get their company ID
        const user = await getCurrentUser();

        if (!user) {
            // For development environment, return mock data for testing
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json({
                    settings: {
                        siteTitle: "My Restaurant",
                        logoUrl: "https://placehold.co/200x200",
                        primaryColor: "#e85c2c",
                        secondaryColor: "#f8f5eb",
                        bannerImageUrl: "https://placehold.co/1200x600",
                        footerText: "Empowering restaurants with Snytra",
                        address: "123 Food Street, Cuisine City",
                        phone: "(123) 456-7890",
                        email: "hello@restaurant.com"
                    },
                    theme: {
                        fontFamily: "Inter",
                        menuLayout: "grid",
                        heroStyle: "centered",
                        accentColor: "#1a1a0f",
                        buttonStyle: "rounded",
                        customCSS: ""
                    },
                    mockData: true
                });
            }

            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get company settings
        const settings = await db.query.companySettings.findFirst({
            where: eq(companySettings.companyId, user.id),
        });

        // Get theme settings
        const theme = await db.query.restaurantTheme.findFirst({
            where: eq(restaurantTheme.companyId, user.id),
        });

        // Combine settings and theme
        return NextResponse.json({
            settings: settings || {},
            theme: theme || {}
        });
    } catch (error) {
        console.error("Error fetching restaurant theme:", error);
        return NextResponse.json(
            { error: "Failed to fetch restaurant theme" },
            { status: 500 }
        );
    }
}

// Update theme settings
export async function PUT(request: NextRequest) {
    try {
        // Validate the user and get their company ID
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify user exists in the database
        const userExists = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.id, user.id))
            .limit(1);

        if (!userExists.length) {
            return NextResponse.json(
                { error: "User record not found. Please contact support." },
                { status: 400 }
            );
        }

        // Check if a company record exists for this user
        const companyRecord = await db
            .select()
            .from(companies)
            .where(eq(companies.id, user.id))
            .limit(1);

        // If no company record exists, create one
        if (companyRecord.length === 0) {
            console.log(`Creating company record for user ${user.id}`);
            await db.insert(companies)
                .values({
                    id: user.id, // Use same ID as user for simplicity
                    name: user.name || 'My Restaurant',
                    address: '',
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
        }

        const data = await request.json();
        const { settings = {}, theme = {} } = data;

        // Update company settings if they exist
        if (Object.keys(settings).length > 0) {
            const existingSettings = await db.query.companySettings.findFirst({
                where: eq(companySettings.companyId, user.id),
            });

            if (existingSettings) {
                await db
                    .update(companySettings)
                    .set({
                        ...settings,
                        updatedAt: new Date(),
                    })
                    .where(eq(companySettings.companyId, user.id));
                console.log(`Updated company settings for user ${user.id}`);
            } else {
                // Always insert if not existing
                await db.insert(companySettings).values({
                    companyId: user.id,
                    ...settings,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                console.log(`Created new company settings for user ${user.id}`);
            }
        }

        // Update theme settings if they exist
        if (Object.keys(theme).length > 0) {
            // Check if theme exists
            const existingTheme = await db.query.restaurantTheme.findFirst({
                where: eq(restaurantTheme.companyId, user.id),
            });

            if (existingTheme) {
                await db
                    .update(restaurantTheme)
                    .set({
                        ...theme,
                        updatedAt: new Date(),
                    })
                    .where(eq(restaurantTheme.companyId, user.id));
                console.log(`Updated restaurant theme for user ${user.id}`);
            } else {
                // Always insert if not existing
                await db.insert(restaurantTheme).values({
                    companyId: user.id,
                    ...theme,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                console.log(`Created new restaurant theme for user ${user.id}`);
            }
        }

        // Get the updated settings and theme (Always fetch and return real data now)
        const updatedSettings = await db.query.companySettings.findFirst({
            where: eq(companySettings.companyId, user.id),
        });

        const updatedTheme = await db.query.restaurantTheme.findFirst({
            where: eq(restaurantTheme.companyId, user.id),
        });

        return NextResponse.json({
            success: true,
            message: "Theme settings updated successfully",
            settings: updatedSettings || {},
            theme: updatedTheme || {},
        });
    } catch (error) {
        console.error("Error updating restaurant theme:", error);

        // Check for specific error types
        if (error.message && error.message.includes('violates foreign key constraint')) {
            return NextResponse.json(
                {
                    error: "Cannot update settings: your user account is not properly linked in the database. Please contact support.",
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to update restaurant theme" },
            { status: 500 }
        );
    }
} 