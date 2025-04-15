import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { menuItems, menuCategories, users } from '@/lib/schema'
import { eq, and, desc, asc, sql } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/auth'

// GET all menu items for the current user's company
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
        const featured = searchParams.get('featured')
        const active = searchParams.get('active') !== 'false' // Default to true
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = (page - 1) * limit

        // Build query conditions with raw SQL to avoid column name issues
        let conditions = [`menu_items."restaurant_id" = ${user.id}`]

        if (category) {
            // First get the category ID using raw SQL
            const categoryQuery = `
                SELECT id 
                FROM menu_categories 
                WHERE menu_categories."companyId" = ${user.id} 
                AND menu_categories.name = '${category}'
                LIMIT 1
            `

            const categoryResult = await db.execute(categoryQuery)
            const categoryRows = categoryResult.rows || [];

            if (categoryRows.length) {
                conditions.push(`menu_items."categoryId" = ${categoryRows[0].id}`)
            }
        }

        if (featured === 'true') {
            conditions.push(`menu_items."isFeatured" = true`)
        }

        // We'll ignore the active condition if the column doesn't exist yet
        // if (active) {
        //     conditions.push(`menu_items."isActive" = true`)
        // }

        // Use raw SQL for the where clause
        const whereClause = conditions.join(' AND ')

        // Get menu items with related category data using raw SQL
        const menuItemsQuery = `
            SELECT 
                menu_items.id,
                menu_items.name,
                menu_items.description,
                menu_items.price,
                menu_items."image_url" as "imageUrl",
                menu_items."categoryId" as "categoryId",
                menu_categories.name as "categoryName",
                menu_items."createdAt" as "createdAt",
                menu_items."updatedAt" as "updatedAt"
            FROM menu_items
            LEFT JOIN menu_categories ON menu_items."categoryId" = menu_categories.id
            WHERE ${whereClause}
            ORDER BY menu_items.name ASC
            LIMIT ${limit} OFFSET ${offset}
        `

        const result = await db.execute(menuItemsQuery)
        const menuItemsResult = result.rows || [];

        // Get total count for pagination
        const countQuery = `
            SELECT COUNT(*) as count
            FROM menu_items
            WHERE ${whereClause}
        `

        const countResult = await db.execute(countQuery)
        const total = parseInt(countResult.rows?.[0]?.count || '0')
        const totalPages = Math.ceil(total / limit)

        // Format the results to match frontend expectations
        const formattedMenuItems = menuItemsResult.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            // Convert price from cents to dollars
            price: item.price / 100,
            priceFormatted: `$${(item.price / 100).toFixed(2)}`,
            image: item.imageUrl || `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`,
            category: item.categoryName,
            categoryId: item.categoryId,
            // Add default values for properties that might not exist in the database
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            spiceLevel: 0,
            preparationTime: 0,
            isActive: true,
            isFeatured: false,
            displayOrder: 0,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }))

        return NextResponse.json({
            items: formattedMenuItems,
            pagination: {
                total,
                page,
                limit,
                totalPages
            }
        })
    } catch (error) {
        console.error('Error fetching menu items:', error)
        return NextResponse.json(
            { error: 'Failed to fetch menu items' },
            { status: 500 }
        )
    }
}

// POST - Create a new menu item
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

        // Validate required fields
        if (!name || price === undefined || !categoryId) {
            return NextResponse.json(
                { error: 'Missing required fields: name, price, and categoryId are required' },
                { status: 400 }
            )
        }

        // Validate category exists and belongs to user's company
        const categoryQuery = `
            SELECT id
            FROM menu_categories
            WHERE id = ${categoryId}
            AND "companyId" = ${user.id}
            LIMIT 1
        `

        const categoryResult = await db.execute(categoryQuery)
        const categoryRows = categoryResult.rows || [];

        if (!categoryRows.length) {
            return NextResponse.json(
                { error: 'Invalid category ID' },
                { status: 400 }
            )
        }

        // Convert price to cents for storage
        const priceInCents = Math.round(parseFloat(price.toString()) * 100)

        // Create menu item using raw SQL
        const createMenuItemQuery = `
            INSERT INTO menu_items (
                "restaurant_id", "categoryId", name, description, price, "image_url",
                "isVegetarian", "isVegan", "isGlutenFree", "spiceLevel", "preparationTime",
                "isActive", "isFeatured", "displayOrder"
            )
            VALUES (
                ${user.id}, ${categoryId}, '${name}', ${description ? `'${description}'` : 'NULL'}, 
                ${priceInCents}, ${imageUrl ? `'${imageUrl}'` : 'NULL'},
                ${isVegetarian ? 'true' : 'false'}, ${isVegan ? 'true' : 'false'}, 
                ${isGlutenFree ? 'true' : 'false'}, ${spiceLevel || 'NULL'}, ${preparationTime || 'NULL'},
                ${isActive !== false ? 'true' : 'false'}, ${isFeatured ? 'true' : 'false'}, ${displayOrder || 0}
            )
            RETURNING id, name, price
        `

        const result = await db.execute(createMenuItemQuery)
        const rows = result.rows || [];

        return NextResponse.json({
            success: true,
            message: 'Menu item created successfully',
            item: {
                ...rows[0],
                price: rows[0].price / 100 // Convert back to dollars for response
            }
        })
    } catch (error) {
        console.error('Error creating menu item:', error)
        return NextResponse.json(
            { error: 'Failed to create menu item' },
            { status: 500 }
        )
    }
} 