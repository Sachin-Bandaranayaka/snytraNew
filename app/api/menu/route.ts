import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { menuItems, menuCategories } from '@/lib/schema'
import { eq, and, desc, asc, sql } from 'drizzle-orm'
import { executeQuery } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

// GET all menu items for the current user's company
export async function GET(request: NextRequest) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser()

        if (!user) {
            // For development environment, use mock data
            if (process.env.NODE_ENV === 'development') {
                const mockItems = [
                    {
                        id: 1,
                        name: "Margherita Pizza",
                        description: "Classic tomato sauce, mozzarella cheese, and fresh basil.",
                        price: 1299,
                        priceFormatted: "₹12.99",
                        image: "/items/margherita.jpg",
                        category: "Pizza",
                        categoryId: 1,
                        isFeatured: true,
                        isVegetarian: true,
                        isVegan: false,
                        isGlutenFree: false,
                        spiceLevel: 0,
                        preparationTime: 15,
                        isActive: true,
                        displayOrder: 1
                    },
                    {
                        id: 2,
                        name: "Caesar Salad",
                        description: "Crisp romaine lettuce, croutons, and Caesar dressing.",
                        price: 899,
                        priceFormatted: "₹8.99",
                        image: "/items/caesar-salad.jpg",
                        category: "Salad",
                        categoryId: 2,
                        isFeatured: false,
                        isVegetarian: true,
                        isVegan: false,
                        isGlutenFree: true,
                        spiceLevel: 0,
                        preparationTime: 10,
                        isActive: true,
                        displayOrder: 2
                    },
                    {
                        id: 3,
                        name: "Pasta Carbonara",
                        description: "Classic Italian pasta dish with eggs, cheese, bacon and black pepper.",
                        price: 1599,
                        priceFormatted: "₹15.99",
                        image: "/items/carbonara.jpg",
                        category: "Pasta",
                        categoryId: 3,
                        isFeatured: true,
                        isVegetarian: false,
                        isVegan: false,
                        isGlutenFree: false,
                        spiceLevel: 1,
                        preparationTime: 20,
                        isActive: true,
                        displayOrder: 3
                    }
                ];

                return NextResponse.json({
                    items: mockItems,
                    pagination: {
                        total: mockItems.length,
                        page: 1,
                        limit: 50,
                        totalPages: 1
                    },
                    mockData: true
                });
            }

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

        try {
            // Use parameterized queries instead of string interpolation
            let menuItemsQuery = `
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
                WHERE menu_items."restaurant_id" = $1
            `;

            const params = [user.id];
            let paramCount = 1;

            if (category) {
                // First get the category ID using a parameterized query
                const categoryResult = await executeQuery(
                    `SELECT id FROM menu_categories WHERE menu_categories."companyId" = $1 AND menu_categories.name = $2 LIMIT 1`,
                    [user.id, category]
                );

                const categoryRows = categoryResult.rows || [];
                if (categoryRows.length) {
                    paramCount++;
                    menuItemsQuery += ` AND menu_items."categoryId" = $${paramCount}`;
                    params.push(categoryRows[0].id);
                }
            }

            if (featured === 'true') {
                paramCount++;
                menuItemsQuery += ` AND menu_items."isFeatured" = $${paramCount}`;
                params.push(true);
            }

            // Add order by, limit and offset
            menuItemsQuery += ` ORDER BY menu_items.name ASC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
            params.push(limit, offset);

            // Execute the query
            const result = await executeQuery(menuItemsQuery, params);
            const menuItemsResult = result.rows || [];

            // Get total count for pagination using parameterized query
            const countQuery = `
                SELECT COUNT(*) as count
                FROM menu_items
                WHERE menu_items."restaurant_id" = $1
            `;

            // Apply the same filters to the count query
            let countParams = [user.id];
            let countParamCount = 1;

            if (category && params.length > 1) {
                countParamCount++;
                countQuery += ` AND menu_items."categoryId" = $${countParamCount}`;
                countParams.push(params[1]);
            }

            if (featured === 'true') {
                countParamCount++;
                countQuery += ` AND menu_items."isFeatured" = $${countParamCount}`;
                countParams.push(true);
            }

            const countResult = await executeQuery(countQuery, countParams);
            const total = parseInt(countResult.rows?.[0]?.count || '0');
            const totalPages = Math.ceil(total / limit);

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
            }));

            return NextResponse.json({
                items: formattedMenuItems,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages
                }
            });
        } catch (dbError) {
            console.error('Database error when fetching menu items:', dbError);

            // Provide mock data in development mode for a better development experience
            if (process.env.NODE_ENV === 'development') {
                console.log('Returning mock data for development');

                const mockItems = [
                    {
                        id: 1,
                        name: "Margherita Pizza",
                        description: "Classic tomato sauce, mozzarella cheese, and fresh basil.",
                        price: 12.99,
                        priceFormatted: "$12.99",
                        image: "/items/margherita.jpg",
                        category: "Pizza",
                        categoryId: 1,
                        isFeatured: true,
                        isVegetarian: true,
                        isVegan: false,
                        isGlutenFree: false,
                        spiceLevel: 0,
                        preparationTime: 15,
                        isActive: true,
                        displayOrder: 1
                    },
                    {
                        id: 2,
                        name: "Caesar Salad",
                        description: "Crisp romaine lettuce, croutons, and Caesar dressing.",
                        price: 8.99,
                        priceFormatted: "$8.99",
                        image: "/items/caesar-salad.jpg",
                        category: "Salad",
                        categoryId: 2,
                        isFeatured: false,
                        isVegetarian: true,
                        isVegan: false,
                        isGlutenFree: true,
                        spiceLevel: 0,
                        preparationTime: 10,
                        isActive: true,
                        displayOrder: 2
                    }
                ];

                return NextResponse.json({
                    items: mockItems,
                    pagination: {
                        total: mockItems.length,
                        page: 1,
                        limit: 50,
                        totalPages: 1
                    },
                    mockData: true
                });
            }

            throw dbError;
        }
    } catch (error) {
        console.error('Error fetching menu items:', error)

        const errorMessage = error instanceof Error
            ? error.message
            : 'An unknown error occurred';

        return NextResponse.json(
            {
                error: 'Failed to fetch menu items',
                details: errorMessage,
                timestamp: new Date().toISOString()
            },
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
            // For development environment, use mock data
            if (process.env.NODE_ENV === 'development') {
                try {
                    const body = await request.json();
                    return NextResponse.json({
                        success: true,
                        message: 'Menu item created successfully (mock)',
                        item: {
                            id: Math.floor(100 + Math.random() * 900),
                            name: body.name || 'Mock Menu Item',
                            price: body.price || 1299,
                            categoryId: body.categoryId || 1,
                            createdAt: new Date().toISOString()
                        },
                        mock: true
                    });
                } catch (e) {
                    return NextResponse.json({
                        success: true,
                        message: 'Menu item created successfully (generic mock)',
                        item: {
                            id: Math.floor(100 + Math.random() * 900),
                            name: 'Mock Menu Item',
                            createdAt: new Date().toISOString()
                        },
                        mock: true
                    });
                }
            }

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

        // Validate category exists and belongs to user's company using parameterized query
        const categoryQuery = `
            SELECT id
            FROM menu_categories
            WHERE id = $1
            AND "companyId" = $2
            LIMIT 1
        `;

        const categoryResult = await executeQuery(categoryQuery, [categoryId, user.id]);
        const categoryRows = categoryResult.rows || [];

        if (!categoryRows.length) {
            return NextResponse.json(
                { error: 'Invalid category ID or category does not belong to your company' },
                { status: 400 }
            )
        }

        // Convert price to cents for storage
        const priceInCents = Math.round(parseFloat(price.toString()) * 100)

        // Create menu item using parameterized query
        const createMenuItemQuery = `
            INSERT INTO menu_items (
                "restaurant_id", "categoryId", name, description, price, "image_url",
                "isVegetarian", "isVegan", "isGlutenFree", "spiceLevel", "preparationTime",
                "isActive", "isFeatured", "displayOrder"
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
            )
            RETURNING id, name, price
        `;

        const createParams = [
            user.id,
            categoryId,
            name,
            description || null,
            priceInCents,
            imageUrl || null,
            isVegetarian || false,
            isVegan || false,
            isGlutenFree || false,
            spiceLevel || null,
            preparationTime || null,
            isActive !== false,
            isFeatured || false,
            displayOrder || 0
        ];

        const result = await executeQuery(createMenuItemQuery, createParams);
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

        // For development environment, return mock success
        if (process.env.NODE_ENV === 'development') {
            try {
                const body = await request.json();
                return NextResponse.json({
                    success: true,
                    message: 'Menu item created successfully (error fallback)',
                    item: {
                        id: Math.floor(100 + Math.random() * 900),
                        name: body.name || 'Mock Menu Item'
                    },
                    mock: true
                });
            } catch (e) {
                return NextResponse.json({
                    success: true,
                    message: 'Menu item created successfully (generic error fallback)',
                    item: {
                        id: Math.floor(100 + Math.random() * 900),
                        name: 'Mock Menu Item'
                    },
                    mock: true
                });
            }
        }

        return NextResponse.json(
            { error: 'Failed to create menu item' },
            { status: 500 }
        )
    }
}

// Add a DELETE endpoint for menu items
export async function DELETE(request: NextRequest) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser()

        if (!user) {
            // For development environment, use mock data
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json({
                    success: true,
                    message: 'Menu item deleted successfully (mock)',
                    mock: true
                });
            }

            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Parse query parameters to get the item ID
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'Item ID is required' },
                { status: 400 }
            )
        }

        // Delete the menu item
        await db
            .delete(menuItems)
            .where(
                and(
                    eq(menuItems.id, parseInt(id)),
                    eq(menuItems.companyId, user.id)
                )
            )

        return NextResponse.json({
            success: true,
            message: 'Menu item deleted successfully'
        })
    } catch (error) {
        console.error('Error deleting menu item:', error)

        // For development environment, return mock success
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({
                success: true,
                message: 'Menu item deleted successfully (error fallback)',
                mock: true
            });
        }

        return NextResponse.json(
            { error: 'Failed to delete menu item' },
            { status: 500 }
        )
    }
} 