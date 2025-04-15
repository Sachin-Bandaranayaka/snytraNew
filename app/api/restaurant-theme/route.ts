import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { companySettings, restaurantTheme } from "@/lib/schema";
import { validateUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

// Get theme settings for the current user's company
export async function GET(request: NextRequest) {
    try {
        // Validate the user and get their company ID
        const user = await validateUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get company settings
        const settings = await db.query.companySettings.findFirst({
            where: eq(companySettings.companyId, user.companyId),
        });

        // Get theme settings
        const theme = await db.query.restaurantTheme.findFirst({
            where: eq(restaurantTheme.companyId, user.companyId),
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
        const user = await validateUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await request.json();
        const { settings = {}, theme = {} } = data;

        // Update company settings
        if (Object.keys(settings).length > 0) {
            await db
                .update(companySettings)
                .set({
                    ...settings,
                    updatedAt: new Date(),
                })
                .where(eq(companySettings.companyId, user.companyId));
        }

        // Check if theme exists
        const existingTheme = await db.query.restaurantTheme.findFirst({
            where: eq(restaurantTheme.companyId, user.companyId),
        });

        // Update or insert theme settings
        if (existingTheme) {
            if (Object.keys(theme).length > 0) {
                await db
                    .update(restaurantTheme)
                    .set({
                        ...theme,
                        updatedAt: new Date(),
                    })
                    .where(eq(restaurantTheme.companyId, user.companyId));
            }
        } else {
            // Insert new theme
            await db.insert(restaurantTheme).values({
                companyId: user.companyId,
                ...theme,
            });
        }

        return NextResponse.json({
            success: true,
            message: "Theme settings updated successfully",
        });
    } catch (error) {
        console.error("Error updating restaurant theme:", error);
        return NextResponse.json(
            { error: "Failed to update restaurant theme" },
            { status: 500 }
        );
    }
} 