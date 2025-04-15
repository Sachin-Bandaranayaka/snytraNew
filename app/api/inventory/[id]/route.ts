import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { inventoryItems, users } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET a specific inventory item by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid inventory item ID' },
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

        // Get inventory item
        const itemResult = await db
            .select()
            .from(inventoryItems)
            .where(
                and(
                    eq(inventoryItems.id, id),
                    eq(inventoryItems.companyId, user.id)
                )
            )
            .limit(1)

        if (!itemResult.length) {
            return NextResponse.json(
                { error: 'Inventory item not found' },
                { status: 404 }
            )
        }

        const item = itemResult[0]

        // Calculate stock status
        const stockStatus = item.quantity <= 0
            ? 'out'
            : item.quantity <= item.reorderLevel
                ? 'low'
                : 'in'

        // Format the result
        const formattedItem = {
            ...item,
            costPerUnitFormatted: item.costPerUnit ? `$${(item.costPerUnit / 100).toFixed(2)}` : null,
            stockStatus
        }

        return NextResponse.json(formattedItem)
    } catch (error) {
        console.error('Error fetching inventory item:', error)
        return NextResponse.json(
            { error: 'Failed to fetch inventory item' },
            { status: 500 }
        )
    }
}

// PATCH - Update an inventory item
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid inventory item ID' },
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

        // Verify inventory item exists and belongs to user's company
        const itemCheck = await db
            .select({ id: inventoryItems.id })
            .from(inventoryItems)
            .where(
                and(
                    eq(inventoryItems.id, id),
                    eq(inventoryItems.companyId, user.id)
                )
            )
            .limit(1)

        if (!itemCheck.length) {
            return NextResponse.json(
                { error: 'Inventory item not found or you do not have permission to update it' },
                { status: 404 }
            )
        }

        // Parse request body
        const requestBody = await request.json()
        const {
            name,
            description,
            sku,
            category,
            unit,
            quantity,
            reorderLevel,
            costPerUnit,
            supplier,
            imageUrl,
            isActive
        } = requestBody

        // Create update object with only fields that are provided
        const updateData: any = {}

        if (name !== undefined) updateData.name = name
        if (description !== undefined) updateData.description = description
        if (sku !== undefined) updateData.sku = sku
        if (category !== undefined) updateData.category = category
        if (unit !== undefined) updateData.unit = unit
        if (quantity !== undefined) updateData.quantity = quantity
        if (reorderLevel !== undefined) updateData.reorderLevel = reorderLevel
        if (supplier !== undefined) updateData.supplier = supplier
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl
        if (isActive !== undefined) updateData.isActive = isActive

        // Process cost per unit if provided
        if (costPerUnit !== undefined && costPerUnit !== null) {
            updateData.costPerUnit = Math.round(parseFloat(costPerUnit.toString()) * 100)
        } else if (costPerUnit === null) {
            updateData.costPerUnit = null
        }

        // Add updatedAt timestamp
        updateData.updatedAt = new Date()

        // Update inventory item
        await db
            .update(inventoryItems)
            .set(updateData)
            .where(
                and(
                    eq(inventoryItems.id, id),
                    eq(inventoryItems.companyId, user.id)
                )
            )

        // Get updated item
        const updatedItem = await db
            .select()
            .from(inventoryItems)
            .where(eq(inventoryItems.id, id))
            .limit(1)

        if (!updatedItem.length) {
            return NextResponse.json(
                { error: 'Failed to retrieve updated inventory item' },
                { status: 500 }
            )
        }

        const item = updatedItem[0]

        // Calculate stock status
        const stockStatus = item.quantity <= 0
            ? 'out'
            : item.quantity <= item.reorderLevel
                ? 'low'
                : 'in'

        return NextResponse.json({
            success: true,
            message: 'Inventory item updated successfully',
            item: {
                ...item,
                costPerUnitFormatted: item.costPerUnit ? `$${(item.costPerUnit / 100).toFixed(2)}` : null,
                stockStatus
            }
        })
    } catch (error) {
        console.error('Error updating inventory item:', error)
        return NextResponse.json(
            { error: 'Failed to update inventory item' },
            { status: 500 }
        )
    }
}

// DELETE - Remove an inventory item
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid inventory item ID' },
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

        // Verify inventory item exists and belongs to user's company
        const itemCheck = await db
            .select({ id: inventoryItems.id })
            .from(inventoryItems)
            .where(
                and(
                    eq(inventoryItems.id, id),
                    eq(inventoryItems.companyId, user.id)
                )
            )
            .limit(1)

        if (!itemCheck.length) {
            return NextResponse.json(
                { error: 'Inventory item not found or you do not have permission to delete it' },
                { status: 404 }
            )
        }

        // Delete inventory item
        await db
            .delete(inventoryItems)
            .where(
                and(
                    eq(inventoryItems.id, id),
                    eq(inventoryItems.companyId, user.id)
                )
            )

        return NextResponse.json({
            success: true,
            message: 'Inventory item deleted successfully'
        })
    } catch (error) {
        console.error('Error deleting inventory item:', error)
        return NextResponse.json(
            { error: 'Failed to delete inventory item' },
            { status: 500 }
        )
    }
} 