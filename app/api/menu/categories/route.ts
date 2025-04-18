import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { menuCategories, users, menuItems } from '@/lib/schema'
import { eq, and, asc, sql } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/auth'

// GET all menu categories for the current user's company
export async function GET(request: NextRequest) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser();

        if (!user) {
            // For development environment, use mock data
            if (process.env.NODE_ENV === 'development') {
                const mockCategories = [
                    {
                        id: 1,
                        name: "Pizza",
                        description: "Italian dish with a round, flattened base of dough topped with various ingredients",
                        companyId: 1,
                        displayOrder: 1,
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    },
                    {
                        id: 2,
                        name: "Salad",
                        description: "Mix of fresh vegetables, often with dressing",
                        companyId: 1,
                        displayOrder: 2,
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    },
                    {
                        id: 3,
                        name: "Pasta",
                        description: "Italian food typically made from wheat flour and shaped into various forms",
                        companyId: 1,
                        displayOrder: 3,
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }
                ];

                return NextResponse.json({
                    categories: mockCategories,
                    pagination: {
                        total: mockCategories.length,
                        page: 1,
                        limit: 50,
                        totalPages: 1
                    },
                    mock: true
                });
            }

            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Parse query parameters
        const { searchParams } = new URL(request.url)
        const active = searchParams.get('active') !== 'false' // Default to true
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = (page - 1) * limit

        // Build query conditions
        let conditions = [eq(menuCategories.companyid, user.id)]

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
            .select({ count: sql`count(*)` })
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

        // For testing, return mock data if database error
        if (process.env.NODE_ENV === 'development') {
            const mockCategories = [
                {
                    id: 1,
                    name: "Pizza",
                    description: "Italian dish with a round, flattened base of dough topped with various ingredients",
                    companyId: 1,
                    restaurant_id: 1,
                    displayOrder: 1,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: "Salad",
                    description: "Mix of fresh vegetables, often with dressing",
                    companyId: 1,
                    restaurant_id: 1,
                    displayOrder: 2,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: 3,
                    name: "Pasta",
                    description: "Italian food typically made from wheat flour and shaped into various forms",
                    companyId: 1,
                    restaurant_id: 1,
                    displayOrder: 3,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];

            return NextResponse.json({
                categories: mockCategories,
                pagination: {
                    total: mockCategories.length,
                    page: 1,
                    limit: 50,
                    totalPages: 1
                },
                mock: true
            });
        }

        return NextResponse.json(
            { error: 'Failed to fetch menu categories' },
            { status: 500 }
        )
    }
}

// POST - Create a new menu category
export async function POST(request: NextRequest) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser();

        if (!user) {
            // For development environment, use mock data
            if (process.env.NODE_ENV === 'development') {
                try {
                    const requestBody = await request.json();
                    return NextResponse.json({
                        success: true,
                        message: 'Mock category created successfully',
                        category: {
                            id: Math.floor(100 + Math.random() * 900),
                            name: requestBody.name,
                            description: requestBody.description,
                            createdAt: new Date().toISOString()
                        },
                        mock: true
                    });
                } catch (error) {
                    // If JSON parsing fails, try to get form data
                    const formData = await request.formData();
                    return NextResponse.json({
                        success: true,
                        message: 'Mock category created successfully',
                        category: {
                            id: Math.floor(100 + Math.random() * 900),
                            name: formData.get('name')?.toString() || 'Mock Category',
                            description: formData.get('description')?.toString() || '',
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

        // Parse request body - handle both JSON and FormData
        let name, description, imageUrl, displayOrder, isActive;

        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('multipart/form-data')) {
            // Handle FormData
            const formData = await request.formData();
            name = formData.get('name')?.toString();
            description = formData.get('description')?.toString();

            // Handle file upload if needed
            const image = formData.get('image') as File | null;
            if (image && image instanceof File) {
                // In a real application, you would upload the image to a storage service
                // For now, we'll just use a placeholder URL
                imageUrl = `https://via.placeholder.com/500x500?text=${encodeURIComponent(name || 'Category')}`;
            }

            displayOrder = formData.get('displayOrder') ? parseInt(formData.get('displayOrder') as string) : 0;
            isActive = formData.get('isActive') === 'true';
        } else {
            // Try to parse as JSON
            try {
                const requestBody = await request.json();
                name = requestBody.name;
                description = requestBody.description;
                imageUrl = requestBody.imageUrl;
                displayOrder = requestBody.displayOrder || 0;
                isActive = requestBody.isActive !== false;
            } catch (parseError) {
                console.error('Error parsing request body:', parseError);
                return NextResponse.json(
                    { error: 'Invalid request format. Expected JSON or FormData.' },
                    { status: 400 }
                );
            }
        }

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
                companyid: user.id,
                restaurant_id: user.id, // Use the same ID for restaurant_id as companyid
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

        // For development environment, return mock success
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({
                success: true,
                message: 'Mock category created successfully (error fallback)',
                category: {
                    id: Math.floor(100 + Math.random() * 900),
                    name: 'Generic Mock Category'
                },
                mock: true
            });
        }

        return NextResponse.json(
            { error: 'Failed to create menu category' },
            { status: 500 }
        )
    }
}

// DELETE - Delete a menu category
export async function DELETE(request: NextRequest) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser();

        if (!user) {
            // For development environment, use mock data
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json({
                    success: true,
                    message: 'Category deleted successfully (mock)',
                    mock: true
                });
            }

            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Parse query parameters to get the category ID
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'Category ID is required' },
                { status: 400 }
            )
        }

        // Check if there are menu items using this category
        const menuItemsCount = await db
            .select({ count: db.fn.count() })
            .from(menuItems)
            .where(
                and(
                    eq(menuItems.categoryId, parseInt(id)),
                    eq(menuItems.companyid, user.id)
                )
            )

        const itemCount = Number(menuItemsCount[0].count) || 0

        if (itemCount > 0) {
            return NextResponse.json(
                { error: 'Cannot delete category that has menu items. Please remove or reassign the items first.' },
                { status: 400 }
            )
        }

        // Delete the category
        await db
            .delete(menuCategories)
            .where(
                and(
                    eq(menuCategories.id, parseInt(id)),
                    eq(menuCategories.companyid, user.id)
                )
            )

        return NextResponse.json({
            success: true,
            message: 'Category deleted successfully'
        })
    } catch (error) {
        console.error('Error deleting category:', error)

        // For development environment, return mock success
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({
                success: true,
                message: 'Category deleted successfully (error fallback)',
                mock: true
            });
        }

        return NextResponse.json(
            { error: 'Failed to delete category' },
            { status: 500 }
        )
    }
} 