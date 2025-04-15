import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { menuItems, menuCategories, users } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET a specific menu item by ID
export async function GET(
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

        // Get menu item with category data
        const itemResult = await db
            .select({
                id: menuItems.id,
                name: menuItems.name,
                description: menuItems.description,
                price: menuItems.price,
                imageUrl: menuItems.imageUrl,
                isVegetarian: menuItems.isVegetarian,
                isVegan: menuItems.isVegan,
                isGlutenFree: menuItems.isGlutenFree,
                spiceLevel: menuItems.spiceLevel,
                preparationTime: menuItems.preparationTime,
                isActive: menuItems.isActive,
                isFeatured: menuItems.isFeatured,
                displayOrder: menuItems.displayOrder,
                categoryId: menuItems.categoryId,
                categoryName: menuCategories.name,
                createdAt: menuItems.createdAt,
                updatedAt: menuItems.updatedAt
            })
            .from(menuItems)
            .leftJoin(menuCategories, eq(menuItems.categoryId, menuCategories.id))
            .where(
                and(
                    eq(menuItems.id, id),
                    eq(menuItems.companyId, user.id)
                )
            )
            .limit(1)

        if (!itemResult.length) {
            return NextResponse.json(
                { error: 'Menu item not found' },
                { status: 404 }
            )
        }

        const item = itemResult[0]

        // Format the result
        const formattedItem = {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price / 100, // Convert price from cents to dollars
            priceFormatted: `$${(item.price / 100).toFixed(2)}`,
            image: item.imageUrl || `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`,
            category: item.categoryName,
            categoryId: item.categoryId,
            isVegetarian: item.isVegetarian,
            isVegan: item.isVegan,
            isGlutenFree: item.isGlutenFree,
            spiceLevel: item.spiceLevel,
            preparationTime: item.preparationTime,
            isActive: item.isActive,
            isFeatured: item.isFeatured,
            displayOrder: item.displayOrder,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }

        return NextResponse.json(formattedItem)
    } catch (error) {
        console.error('Error fetching menu item:', error)
        return NextResponse.json(
            { error: 'Failed to fetch menu item' },
            { status: 500 }
        )
    }
}

// PUT/PATCH - Update a menu item
export async function PATCH(
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
                { error: 'Menu item not found or you do not have permission to update it' },
                { status: 404 }
            )
        }

        // Parse request body
        const requestBody = await request.json()
        const {
            name,
            description,
            price,
            imageUrl,
            categoryId,
            isVegetarian,
            isVegan,
            isGlutenFree,
            spiceLevel,
            preparationTime,
            isActive,
            isFeatured,
            displayOrder
        } = requestBody

        // Create update object with only fields that are provided
        const updateData: any = {}

        if (name !== undefined) updateData.name = name
        if (description !== undefined) updateData.description = description
        if (price !== undefined) updateData.price = Math.round(parseFloat(price.toString()) * 100) // Convert to cents
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl
        if (isVegetarian !== undefined) updateData.isVegetarian = isVegetarian
        if (isVegan !== undefined) updateData.isVegan = isVegan
        if (isGlutenFree !== undefined) updateData.isGlutenFree = isGlutenFree
        if (spiceLevel !== undefined) updateData.spiceLevel = spiceLevel
        if (preparationTime !== undefined) updateData.preparationTime = preparationTime
        if (isActive !== undefined) updateData.isActive = isActive
        if (isFeatured !== undefined) updateData.isFeatured = isFeatured
        if (displayOrder !== undefined) updateData.displayOrder = displayOrder

        // If categoryId is provided, validate it first
        if (categoryId !== undefined) {
            const categoryCheck = await db
                .select({ id: menuCategories.id })
                .from(menuCategories)
                .where(
                    and(
                        eq(menuCategories.id, categoryId),
                        eq(menuCategories.companyId, user.id)
                    )
                )
                .limit(1)

            if (!categoryCheck.length) {
                return NextResponse.json(
                    { error: 'Invalid category ID' },
                    { status: 400 }
                )
            }

            updateData.categoryId = categoryId
        }

        // Add updatedAt timestamp
        updateData.updatedAt = new Date()

        // Update menu item
        await db
            .update(menuItems)
            .set(updateData)
            .where(
                and(
                    eq(menuItems.id, id),
                    eq(menuItems.companyId, user.id)
                )
            )

        // Get updated item
        const updatedItem = await db
            .select()
            .from(menuItems)
            .where(eq(menuItems.id, id))
            .limit(1)

        if (!updatedItem.length) {
            return NextResponse.json(
                { error: 'Failed to retrieve updated menu item' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Menu item updated successfully',
            item: {
                ...updatedItem[0],
                price: updatedItem[0].price / 100 // Convert back to dollars for response
            }
        })
    } catch (error) {
        console.error('Error updating menu item:', error)
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