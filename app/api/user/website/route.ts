import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { companySettings, users, menuCategories, menuItems, companies } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/auth'

// GET website configuration and data
export async function GET(request: NextRequest) {
    try {
        // Get the authenticated user using the custom function
        const user = await getCurrentUser()

        if (!user) {
            // For development environment, return mock data
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json({
                    websiteUrl: "https://demo-restaurant.snytra.com",
                    settings: {
                        siteTitle: "Demo Restaurant",
                        logoUrl: "https://placehold.co/200x200",
                        primaryColor: "#e85c2c",
                        secondaryColor: "#f8f5eb",
                        accentColor: "#1a1a0f",
                        fontFamily: "Inter",
                        buttonStyle: "rounded",
                        heroStyle: "centered",
                        heroImage: "https://placehold.co/1200x600",
                        showHero: true,
                        showAbout: true,
                        showMenu: true,
                        showGallery: true,
                        showContact: true,
                        aboutText: "Welcome to Demo Restaurant, where we serve delicious food made with fresh, locally-sourced ingredients.",
                        contactNumber: "(123) 456-7890",
                        address: "123 Food Street, Cuisine City"
                    },
                    menu: {
                        categories: [],
                        items: []
                    },
                    isActive: true,
                    mockData: true
                });
            }

            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        try {
            // Get company settings
            const settingsResult = await db.select()
                .from(companySettings)
                .where(eq(companySettings.companyId, user.id))

            const settings = settingsResult.length > 0
                ? settingsResult[0]
                : null;

            // Get menu categories
            const categories = await db.select()
                .from(menuCategories)
                .where(eq(menuCategories.companyid, user.id))

            // Get menu items
            const items = await db.select()
                .from(menuItems)
                .where(eq(menuItems.companyid, user.id))

            // Generate website URL
            let websiteUrl = '';

            if (settings?.customDomain) {
                websiteUrl = `https://${settings.customDomain}`;
            } else {
                // Generate a slug from company name or user name
                const slug = (settings?.siteTitle || user.name || 'restaurant')
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '');

                websiteUrl = `https://${slug}.snytra.com`;
            }

            return NextResponse.json({
                websiteUrl,
                settings,
                menu: {
                    categories,
                    items
                },
                isActive: true // This would be determined by subscription status in a real implementation
            })
        } catch (dbError) {
            console.error('Database error while fetching website data:', dbError)

            // For development, return mock data
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json({
                    websiteUrl: "https://demo-restaurant.snytra.com",
                    settings: {
                        siteTitle: "Demo Restaurant",
                        logoUrl: "https://placehold.co/200x200",
                        primaryColor: "#e85c2c",
                        secondaryColor: "#f8f5eb",
                        accentColor: "#1a1a0f",
                        fontFamily: "Inter",
                        buttonStyle: "rounded",
                        heroStyle: "centered",
                        heroImage: "https://placehold.co/1200x600",
                        showHero: true,
                        showAbout: true,
                        showMenu: true,
                        showGallery: true,
                        showContact: true,
                        aboutText: "Welcome to Demo Restaurant, where we serve delicious food made with fresh, locally-sourced ingredients.",
                        contactNumber: "(123) 456-7890",
                        address: "123 Food Street, Cuisine City"
                    },
                    menu: {
                        categories: [],
                        items: []
                    },
                    isActive: true,
                    mockData: true,
                    error: "Database error but mock data provided"
                });
            }

            throw dbError; // Re-throw for production
        }
    } catch (error) {
        console.error('Error fetching website data:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST to update website settings
export async function POST(request: NextRequest) {
    try {
        // Get the authenticated user using the custom function
        const user = await getCurrentUser()

        if (!user) {
            // For development environment, return mock success
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json({
                    success: true,
                    message: 'Website settings updated successfully (mock)',
                    mockData: true
                });
            }

            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get the settings from the request body
        const body = await request.json();
        const { settings } = body;

        if (!settings) {
            return NextResponse.json(
                { error: 'Settings are required' },
                { status: 400 }
            )
        }

        try {
            // Check if the settings exist for this company
            const existingSettings = await db.select()
                .from(companySettings)
                .where(eq(companySettings.companyId, user.id))

            if (existingSettings.length > 0) {
                // Update existing settings
                await db.update(companySettings)
                    .set({
                        siteTitle: settings.siteTitle,
                        logoUrl: settings.logoUrl,
                        primaryColor: settings.primaryColor,
                        secondaryColor: settings.secondaryColor,
                        heroImage: settings.heroImage,
                        showHero: settings.showHero,
                        showAbout: settings.showAbout,
                        showMenu: settings.showMenu,
                        showGallery: settings.showGallery,
                        showContact: settings.showContact,
                        aboutText: settings.aboutText,
                        contactNumber: settings.contactNumber,
                        address: settings.address,
                        updatedAt: new Date()
                    })
                    .where(eq(companySettings.companyId, user.id))

                // Log confirmation of update
                console.log(`Updated settings for company ${user.id}`);
            } else {
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
                            name: settings.siteTitle || user.name || 'My Restaurant',
                            address: settings.address || '',
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                }

                // Now create the settings
                await db.insert(companySettings)
                    .values({
                        companyId: user.id,
                        siteTitle: settings.siteTitle,
                        logoUrl: settings.logoUrl,
                        primaryColor: settings.primaryColor,
                        secondaryColor: settings.secondaryColor,
                        heroImage: settings.heroImage,
                        showHero: settings.showHero,
                        showAbout: settings.showAbout,
                        showMenu: settings.showMenu,
                        showGallery: settings.showGallery,
                        showContact: settings.showContact,
                        aboutText: settings.aboutText,
                        contactNumber: settings.contactNumber,
                        address: settings.address,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })

                // Log confirmation of creation
                console.log(`Created new settings for company ${user.id}`);
            }

            return NextResponse.json({
                success: true,
                message: 'Website settings updated successfully',
                settings: settings
            });
        } catch (dbError) {
            console.error('Database error when updating settings:', dbError);

            // If there's a foreign key constraint error, inform the user properly
            if (dbError.message && dbError.message.includes('violates foreign key constraint')) {
                return NextResponse.json(
                    {
                        error: 'Cannot update settings: your user account is not properly linked to a company record. Please contact support.',
                        details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
                    },
                    { status: 400 }
                )
            }

            throw dbError; // Re-throw for the outer catch
        }
    } catch (error) {
        console.error('Error updating website settings:', error)
        return NextResponse.json(
            { error: 'Internal server error when updating settings' },
            { status: 500 }
        )
    }
}