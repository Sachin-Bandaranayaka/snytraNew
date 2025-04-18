import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { companySettings, restaurantTheme, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth"; // Import getCurrentUser

// Get theme settings for a specific restaurant by slug or preview
export async function GET(
  request: NextRequest,
  { params }: { params: { restaurant: string } }
) {
  try {
    // Await the params to resolve the promise
    const resolvedParams = await Promise.resolve(params);
    const restaurantSlug = resolvedParams.restaurant; // Use restaurantSlug

    // Special case for development preview: Fetch current user's theme
    if (restaurantSlug === 'preview' && process.env.NODE_ENV === 'development') {
      const user = await getCurrentUser();
      if (!user) {
        // Return default mock data if no user is logged in during preview
        return NextResponse.json({
          settings: {
            siteTitle: "Preview Restaurant",
            logoUrl: "/logo.png", // Use a default local logo
            primaryColor: "#e85c2c", // Default primary
            secondaryColor: "#f8f5eb", // Default secondary
            bannerImageUrl: "https://placehold.co/1200x600?text=Preview+Banner",
            footerText: "Preview Footer Text",
            address: "123 Preview St",
            phone: "(000) 000-0000",
            email: "preview@example.com"
          },
          theme: {
            fontFamily: "Inter",
            menuLayout: "grid",
            heroStyle: "centered",
            accentColor: "#1a1a0f", // Default accent
            buttonStyle: "rounded",
            customCSS: ""
          },
          isPreview: true,
          mockData: true // Indicate it's still mock if no user found
        });
      }

      // Fetch actual settings for the logged-in user
      const settings = await db.query.companySettings.findFirst({
        where: eq(companySettings.companyId, user.id),
      });
      const theme = await db.query.restaurantTheme.findFirst({
        where: eq(restaurantTheme.companyId, user.id),
      });

      return NextResponse.json({
        settings: settings || { siteTitle: "Preview (Using Defaults)", primaryColor: "#e85c2c", secondaryColor: "#f8f5eb" }, // Provide fallback
        theme: theme || { fontFamily: "Inter", accentColor: "#1a1a0f", buttonStyle: "rounded" }, // Provide fallback
        isPreview: true
      });
    }

    // Try to connect to the database, if it fails in development mode, return mock data
    let userResult = [];
    try {
      // First, find the user by the restaurant slug
      userResult = await db
        .select()
        .from(users)
        .where(
          eq(
            users.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            restaurantSlug.toLowerCase() // Use restaurantSlug
          )
        )
        .limit(1);
    } catch (dbError) {
      console.error("Database error when querying for restaurant:", dbError);
      // If in development and there's a DB error, fall back to mock data
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          settings: {
            siteTitle: restaurantSlug, // Use restaurantSlug
            logoUrl: "https://placehold.co/200x200",
            primaryColor: "#e85c2c",
            secondaryColor: "#f8f5eb",
            bannerImageUrl: "https://placehold.co/1200x600?text=" + encodeURIComponent(restaurantSlug), // Use restaurantSlug
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
          mockData: true,
          error: "Database connection error, using mock data"
        });
      }
      throw dbError; // Re-throw for production
    }

    if (!userResult.length) {
      // For development, return mock data when restaurant can't be found
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          settings: {
            siteTitle: restaurantSlug, // Use restaurantSlug
            logoUrl: "https://placehold.co/200x200",
            primaryColor: "#e85c2c",
            secondaryColor: "#f8f5eb",
            bannerImageUrl: "https://placehold.co/1200x600?text=" + encodeURIComponent(restaurantSlug), // Use restaurantSlug
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

      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    const user = userResult[0];

    // Get company settings
    const settingsResult = await db
      .select()
      .from(companySettings)
      .where(eq(companySettings.companyId, user.id));

    const settings = settingsResult.length > 0 ? settingsResult[0] : null;

    // Get theme settings
    const themeResult = await db
      .select()
      .from(restaurantTheme)
      .where(eq(restaurantTheme.companyId, user.id));

    const theme = themeResult.length > 0 ? themeResult[0] : null;

    // Combine settings and theme
    return NextResponse.json({
      settings: settings || {},
      theme: theme || {},
    });
  } catch (error) {
    console.error("Error fetching restaurant theme:", error);

    // For development, return mock data on error
    if (process.env.NODE_ENV === 'development') {
      // Safely access restaurant slug from params without causing errors
      let safeRestaurantSlug = "Restaurant";
      try {
        // Use the already resolved restaurantSlug variable
        safeRestaurantSlug = restaurantSlug || "Restaurant";
      } catch (_) { }

      return NextResponse.json({
        settings: {
          siteTitle: safeRestaurantSlug, // Use safeRestaurantSlug
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
        mockData: true,
        error: "Error occurred but mock data provided"
      });
    }

    return NextResponse.json(
      { error: "Failed to fetch restaurant theme" },
      { status: 500 }
    );
  }
}