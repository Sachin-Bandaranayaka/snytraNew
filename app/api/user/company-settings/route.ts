import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { companySettings, users } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET company settings for the authenticated user/company
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

        if (settingsResult.length === 0) {
            // Create default settings if none exist
            const defaultSettings = {
                companyId: user.id,
                logoUrl: null,
                primaryColor: '#e85c2c',
                secondaryColor: '#f8f5eb',
                siteTitle: user.name ? `${user.name}'s Restaurant` : 'My Restaurant',
                siteDescription: 'A delicious place to eat',
                businessHours: 'Mon-Fri: 9am-10pm, Sat-Sun: 10am-11pm',
                address: null,
                phone: null,
                email: session.user.email,
                socialMedia: { facebook: '', instagram: '', twitter: '' },
                customDomain: null
            }

            // Insert default settings
            const insertResult = await db.insert(companySettings).values(defaultSettings)

            return NextResponse.json({
                settings: defaultSettings
            })
        }

        return NextResponse.json({
            settings: settingsResult[0]
        })
    } catch (error) {
        console.error('Error fetching company settings:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST update company settings
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

        // Parse request body
        const body = await request.json()
        const updatedSettings = body.settings

        // Validate required fields
        if (!updatedSettings) {
            return NextResponse.json(
                { error: 'Settings data is required' },
                { status: 400 }
            )
        }

        // Check if settings exist
        const existingSettings = await db.select({ id: companySettings.id })
            .from(companySettings)
            .where(eq(companySettings.companyId, user.id))

        if (existingSettings.length === 0) {
            // Insert new settings
            const newSettings = {
                companyId: user.id,
                ...updatedSettings,
                updatedAt: new Date()
            }

            await db.insert(companySettings).values(newSettings)
        } else {
            // Update existing settings
            await db.update(companySettings)
                .set({
                    ...updatedSettings,
                    updatedAt: new Date()
                })
                .where(eq(companySettings.companyId, user.id))
        }

        return NextResponse.json({
            success: true,
            message: 'Settings updated successfully'
        })
    } catch (error) {
        console.error('Error updating company settings:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 