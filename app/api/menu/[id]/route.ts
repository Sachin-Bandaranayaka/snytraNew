import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { menuItems, menuCategories, users } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/auth'

interface RouteParams {
    params: {
        id: string
    }
}

// GET a specific menu item
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser()

        if (!user) {
            // For development environment, use mock data
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json({
                    id: parseInt(params.id),
                    name: "Mock Menu Item",
                    description: "This is a mock menu item for development",
                    price: 1299, // In cents
                    priceFormatted: "₹12.99",
                    categoryId: 1,
                    category: "Pizza",
                    isVegetarian: true,
                    isVegan: false,
                    isGlutenFree: false,
                    isFeatured: true,
                    imageUrl: `https://via.placeholder.com/500x500?text=Item+${params.id}`,
                    mock: true
                });
            }

            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get menu item
        const menuItem = await db
            .select()
            .from(menuItems)
            .where(
                and(
                    eq(menuItems.id, parseInt(params.id)),
                    eq(menuItems.companyId, user.id)
                )
            )
            .limit(1)

        if (!menuItem.length) {
            return NextResponse.json(
                { error: 'Menu item not found' },
                { status: 404 }
            )
        }

        // Get category information
        const category = await db
            .select()
            .from(menuCategories)
            .where(eq(menuCategories.id, menuItem[0].categoryId))
            .limit(1)

        // Format the menu item
        const formattedItem = {
            ...menuItem[0],
            priceFormatted: `₹${(menuItem[0].price / 100).toFixed(2)}`,
            category: category.length > 0 ? category[0].name : 'Uncategorized'
        }

        return NextResponse.json(formattedItem)
    } catch (error) {
        console.error('Error fetching menu item:', error)

        // For development environment, use mock data
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({
                id: parseInt(params.id),
                name: "Mock Menu Item",
                description: "This is a mock menu item for development",
                price: 1299, // In cents
                priceFormatted: "₹12.99",
                categoryId: 1,
                category: "Pizza",
                isVegetarian: true,
                isVegan: false,
                isGlutenFree: false,
                isFeatured: true,
                imageUrl: `https://via.placeholder.com/500x500?text=Item+${params.id}`,
                mock: true,
                error: true
            });
        }

        return NextResponse.json(
            { error: 'Failed to fetch menu item' },
            { status: 500 }
        )
    }
}

// UPDATE a menu item
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser()

        if (!user) {
            // For development environment, use mock data
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json({
                    success: true,
                    message: 'Menu item updated successfully (mock)',
                    mock: true
                });
            }

            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Check if the item exists and belongs to the user
        const existingItem = await db
            .select()
            .from(menuItems)
            .where(
                and(
                    eq(menuItems.id, parseInt(params.id)),
                    eq(menuItems.companyId, user.id)
                )
            )
            .limit(1)

        if (!existingItem.length) {
            return NextResponse.json(
                { error: 'Menu item not found or access denied' },
                { status: 404 }
            )
        }

        // Parse the form data
        const formData = await request.formData()
        const name = formData.get('name') as string
        const description = formData.get('description') as string
        const price = parseInt(formData.get('price') as string)
        const categoryId = parseInt(formData.get('categoryId') as string)
        const isVegetarian = formData.get('isVegetarian') === 'true'
        const isVegan = formData.get('isVegan') === 'true'
        const isGlutenFree = formData.get('isGlutenFree') === 'true'
        const isFeatured = formData.get('isFeatured') === 'true'
        const image = formData.get('image') as File | null

        // Validate required fields
        if (!name || isNaN(price) || isNaN(categoryId)) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Handle image upload if provided
        let imageUrl = existingItem[0].imageUrl
        if (image && image instanceof File) {
            // In a real application, you would upload the image to a storage service
            // and get back a URL. For this example, we'll just use a placeholder
            imageUrl = `https://via.placeholder.com/500x500?text=${encodeURIComponent(name)}`
        }

        // Update the menu item
        await db
            .update(menuItems)
            .set({
                name,
                description,
                price,
                categoryId,
                isVegetarian,
                isVegan,
                isGlutenFree,
                isFeatured,
                imageUrl,
                updatedAt: new Date()
            })
            .where(eq(menuItems.id, parseInt(params.id)))

        return NextResponse.json({
            success: true,
            message: 'Menu item updated successfully'
        })
    } catch (error) {
        console.error('Error updating menu item:', error)

        // For development environment, return mock success
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({
                success: true,
                message: 'Menu item updated successfully (error fallback)',
                mock: true
            });
        }

        return NextResponse.json(
            { error: 'Failed to update menu item' },
            { status: 500 }
        )
    }
}

// DELETE - Remove a menu item
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid menu item ID' },
                { status: 400 }
            )
        }

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

        // Verify menu item exists and belongs to user's company
        const itemCheck = await db
            .select({ id: menuItems.id })
            .from(menuItems)
            .where(
                and(
                    eq(menuItems.id, id),
                    eq(menuItems.companyId, user.id)
                )
            )
            .limit(1)

        if (!itemCheck.length) {
            return NextResponse.json(
                { error: 'Menu item not found or you do not have permission to delete it' },
                { status: 404 }
            )
        }

        // Delete menu item
        await db
            .delete(menuItems)
            .where(
                and(
                    eq(menuItems.id, id),
                    eq(menuItems.companyId, user.id)
                )
            )

        return NextResponse.json({
            success: true,
            message: 'Menu item deleted successfully'
        })
    } catch (error) {
        console.error('Error deleting menu item:', error)
        return NextResponse.json(
            { error: 'Failed to delete menu item' },
            { status: 500 }
        )
    }
} 