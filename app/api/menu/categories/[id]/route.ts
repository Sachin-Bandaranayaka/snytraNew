import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { menuCategories } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/auth'

interface RouteParams {
    params: {
        id: string
    }
}

// GET a specific category
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser()

        if (!user) {
            // For development environment, use mock data
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json({
                    id: parseInt(params.id),
                    name: "Mock Category",
                    description: "This is a mock category for development",
                    displayOrder: 1,
                    isActive: true,
                    imageUrl: `https://via.placeholder.com/500x500?text=Category+${params.id}`,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    mock: true
                });
            }

            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get category
        const category = await db
            .select()
            .from(menuCategories)
            .where(
                and(
                    eq(menuCategories.id, parseInt(params.id)),
                    eq(menuCategories.companyid, user.id)
                )
            )
            .limit(1)

        if (!category.length) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(category[0])
    } catch (error) {
        console.error('Error fetching category:', error)

        // For development environment, use mock data
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({
                id: parseInt(params.id),
                name: "Mock Category",
                description: "This is a mock category for development",
                displayOrder: 1,
                isActive: true,
                imageUrl: `https://via.placeholder.com/500x500?text=Category+${params.id}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                mock: true,
                error: true
            });
        }

        return NextResponse.json(
            { error: 'Failed to fetch category' },
            { status: 500 }
        )
    }
}

// UPDATE a category
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser()

        if (!user) {
            // For development environment, use mock data
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json({
                    success: true,
                    message: 'Category updated successfully (mock)',
                    mock: true
                });
            }

            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Check if the category exists and belongs to the user
        const existingCategory = await db
            .select()
            .from(menuCategories)
            .where(
                and(
                    eq(menuCategories.id, parseInt(params.id)),
                    eq(menuCategories.companyid, user.id)
                )
            )
            .limit(1)

        if (!existingCategory.length) {
            return NextResponse.json(
                { error: 'Category not found or access denied' },
                { status: 404 }
            )
        }

        // Parse the form data
        const formData = await request.formData()
        const name = formData.get('name') as string
        const description = formData.get('description') as string
        const displayOrder = parseInt(formData.get('displayOrder') as string || '0')
        const isActive = formData.get('isActive') === 'true'
        const image = formData.get('image') as File | null

        // Validate required fields
        if (!name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            )
        }

        // Handle image upload if provided
        let imageUrl = existingCategory[0].imageUrl
        if (image && image instanceof File) {
            // In a real application, you would upload the image to a storage service
            // and get back a URL. For this example, we'll just use a placeholder
            imageUrl = `https://via.placeholder.com/500x500?text=${encodeURIComponent(name)}`
        }

        // Update the category
        await db
            .update(menuCategories)
            .set({
                name,
                description,
                displayOrder,
                isActive,
                imageUrl,
                updatedAt: new Date()
            })
            .where(eq(menuCategories.id, parseInt(params.id)))

        return NextResponse.json({
            success: true,
            message: 'Category updated successfully'
        })
    } catch (error) {
        console.error('Error updating category:', error)

        // For development environment, return mock success
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({
                success: true,
                message: 'Category updated successfully (error fallback)',
                mock: true
            });
        }

        return NextResponse.json(
            { error: 'Failed to update category' },
            { status: 500 }
        )
    }
} 