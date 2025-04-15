import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { companySettings, users, menuCategories, menuItems } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET website configuration and data
export async function GET(request: NextRequest) {
    try {
        // Get the authenticated user session
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get user from database
        const userResult = await db.select().from(users).where(eq(users.email, session.user.email))

        if (!userResult.length) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        const user = userResult[0]

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
            .where(eq(menuCategories.companyId, user.id))

        // Get menu items
        const items = await db.select()
            .from(menuItems)
            .where(eq(menuItems.companyId, user.id))

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
    } catch (error) {
        console.error('Error fetching website data:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST to publish website changes
export async function POST(request: NextRequest) {
    try {
        // Get the authenticated user session
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get user from database
        const userResult = await db.select().from(users).where(eq(users.email, session.user.email))

        if (!userResult.length) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        const user = userResult[0]

        // In a real implementation, this would trigger a website rebuild/deploy
        // For now, we'll just return a success message

        return NextResponse.json({
            success: true,
            message: 'Website changes published successfully'
        })
    } catch (error) {
        console.error('Error publishing website:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 