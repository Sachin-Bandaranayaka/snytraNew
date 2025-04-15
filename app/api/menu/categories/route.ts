import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { menuCategories, users } from '@/lib/schema'
import { eq, and, asc } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET all menu categories for the current user's company
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

        // Parse query parameters
        const { searchParams } = new URL(request.url)
        const active = searchParams.get('active') !== 'false' // Default to true
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = (page - 1) * limit

        // Build query conditions
        let conditions = [eq(menuCategories.companyId, user.id)]

        if (active) {
            conditions.push(eq(menuCategories.isActive, true))
        }

        // Get menu categories
        const categoriesResult = await db
            .select()
            .from(menuCategories)
            .where(and(...conditions))
            .orderBy(asc(menuCategories.displayOrder), asc(menuCategories.name))
            .limit(limit)
            .offset(offset)

        // Get total count for pagination
        const countResult = await db
            .select({ count: db.fn.count() })
            .from(menuCategories)
            .where(and(...conditions))

        const total = Number(countResult[0].count) || 0
        const totalPages = Math.ceil(total / limit)

        return NextResponse.json({
            categories: categoriesResult,
            pagination: {
                total,
                page,
                limit,
                totalPages
            }
        })
    } catch (error) {
        console.error('Error fetching menu categories:', error)
        return NextResponse.json(
            { error: 'Failed to fetch menu categories' },
            { status: 500 }
        )
    }
}

// POST - Create a new menu category
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
        const requestBody = await request.json()
        const {
            name,
            description,
            imageUrl,
            displayOrder,
            isActive
        } = requestBody

        // Validate required fields
        if (!name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            )
        }

        // Create category
        const result = await db
            .insert(menuCategories)
            .values({
                companyId: user.id,
                name,
                description,
                imageUrl,
                displayOrder: displayOrder || 0,
                isActive: isActive !== false // Default to true
            })
            .returning({
                id: menuCategories.id,
                name: menuCategories.name
            })

        return NextResponse.json({
            success: true,
            message: 'Menu category created successfully',
            category: result[0]
        })
    } catch (error) {
        console.error('Error creating menu category:', error)
        return NextResponse.json(
            { error: 'Failed to create menu category' },
            { status: 500 }
        )
    }
} 