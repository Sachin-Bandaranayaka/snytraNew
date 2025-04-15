import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { inventoryItems, users } from '@/lib/schema'
import { eq, and, asc, desc, lte, gte, gt, or, like, sql } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/auth'

// GET all inventory items for the current user's company
export async function GET(request: NextRequest) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Parse query parameters
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const stockStatus = searchParams.get('status')
        const search = searchParams.get('search')
        const sortBy = searchParams.get('sortBy') || 'name'
        const sortOrder = searchParams.get('sortOrder') || 'asc'
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = (page - 1) * limit

        // Build query conditions with raw SQL to avoid column name issues
        let conditions = [`inventory_items."companyId" = ${user.id}`]

        if (category) {
            conditions.push(`inventory_items.category = '${category}'`)
        }

        if (stockStatus === 'low') {
            conditions.push(`inventory_items.quantity > 0 AND inventory_items.quantity <= inventory_items."reorderLevel"`)
        } else if (stockStatus === 'out') {
            conditions.push(`inventory_items.quantity <= 0`)
        }

        if (search) {
            // Simpler search without using lower() function
            conditions.push(`(
                inventory_items.name LIKE '%${search}%' OR
                inventory_items.sku LIKE '%${search}%' OR
                inventory_items.category LIKE '%${search}%'
            )`)
        }

        // Build sort options
        let orderByClause = 'inventory_items.name ASC'
        if (sortBy === 'name') {
            orderByClause = `inventory_items.name ${sortOrder.toUpperCase()}`
        } else if (sortBy === 'quantity') {
            orderByClause = `inventory_items.quantity ${sortOrder.toUpperCase()}`
        } else if (sortBy === 'category') {
            orderByClause = `inventory_items.category ${sortOrder.toUpperCase()}`
        } else if (sortBy === 'sku') {
            orderByClause = `inventory_items.sku ${sortOrder.toUpperCase()}`
        }

        // Use raw SQL to avoid column name issues
        const whereClause = conditions.join(' AND ')

        // Get inventory items using raw SQL
        const inventoryItemsQuery = `
            SELECT *
            FROM inventory_items
            WHERE ${whereClause}
            ORDER BY ${orderByClause}
            LIMIT ${limit} OFFSET ${offset}
        `

        const result = await db.execute(inventoryItemsQuery)
        const inventoryItemsResult = result.rows || [];

        // Get total count for pagination using raw SQL
        const countQuery = `
            SELECT COUNT(*) as count
            FROM inventory_items
            WHERE ${whereClause}
        `

        const countResult = await db.execute(countQuery)
        const total = parseInt(countResult.rows?.[0]?.count || '0')
        const totalPages = Math.ceil(total / limit)

        // Calculate stock status for each item
        const formattedItems = inventoryItemsResult.map(item => ({
            ...item,
            costPerUnitFormatted: item.costPerUnit ? `$${(item.costPerUnit / 100).toFixed(2)}` : null,
            stockStatus: item.quantity <= 0
                ? 'out'
                : item.quantity <= item.reorderLevel
                    ? 'low'
                    : 'in'
        }))

        // Get counts for dashboard using raw SQL
        const lowStockCountQuery = `
            SELECT COUNT(*) as count
            FROM inventory_items
            WHERE inventory_items."companyId" = ${user.id}
            AND inventory_items.quantity > 0
            AND inventory_items.quantity <= inventory_items."reorderLevel"
        `

        const outOfStockCountQuery = `
            SELECT COUNT(*) as count
            FROM inventory_items
            WHERE inventory_items."companyId" = ${user.id}
            AND inventory_items.quantity <= 0
        `

        const lowStockCount = await db.execute(lowStockCountQuery)
        const outOfStockCount = await db.execute(outOfStockCountQuery)

        return NextResponse.json({
            items: formattedItems,
            pagination: {
                total,
                page,
                limit,
                totalPages
            },
            stats: {
                total,
                lowStock: parseInt(lowStockCount.rows?.[0]?.count || '0'),
                outOfStock: parseInt(outOfStockCount.rows?.[0]?.count || '0')
            }
        })
    } catch (error) {
        console.error('Error fetching inventory items:', error)
        return NextResponse.json(
            { error: 'Failed to fetch inventory items' },
            { status: 500 }
        )
    }
}

// POST - Create a new inventory item
export async function POST(request: NextRequest) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
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

        // Validate required fields
        if (!name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            )
        }

        // Convert cost to cents for storage if provided
        let costInCents = null
        if (costPerUnit !== undefined && costPerUnit !== null) {
            costInCents = Math.round(parseFloat(costPerUnit.toString()) * 100)
        }

        // Create inventory item using raw SQL
        const createInventoryItemQuery = `
            INSERT INTO inventory_items (
                "companyId", name, description, sku, category, unit, quantity, 
                "reorderLevel", "costPerUnit", supplier, "image_url", "isActive"
            )
            VALUES (
                ${user.id}, '${name}', ${description ? `'${description}'` : 'NULL'}, 
                ${sku ? `'${sku}'` : 'NULL'}, ${category ? `'${category}'` : 'NULL'}, 
                ${unit ? `'${unit}'` : 'NULL'}, ${quantity || 0}, ${reorderLevel || 10}, 
                ${costInCents !== null ? costInCents : 'NULL'}, 
                ${supplier ? `'${supplier}'` : 'NULL'}, 
                ${imageUrl ? `'${imageUrl}'` : 'NULL'}, 
                ${isActive !== false ? 'true' : 'false'}
            )
            RETURNING id, name, quantity
        `

        const result = await db.execute(createInventoryItemQuery)
        const rows = result.rows || [];

        return NextResponse.json({
            success: true,
            message: 'Inventory item created successfully',
            item: rows[0]
        })
    } catch (error) {
        console.error('Error creating inventory item:', error)
        return NextResponse.json(
            { error: 'Failed to create inventory item' },
            { status: 500 }
        )
    }
} 