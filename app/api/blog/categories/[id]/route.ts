import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogCategories, blogPosts } from '@/lib/schema';
import { eq } from 'drizzle-orm';

interface RouteParams {
    params: {
        id: string;
    };
}

// GET /api/blog/categories/[id] - Get a specific blog category
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid category ID' },
                { status: 400 }
            );
        }

        const category = await db
            .select()
            .from(blogCategories)
            .where(eq(blogCategories.id, id));

        if (category.length === 0) {
            return NextResponse.json(
                { error: 'Blog category not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(category[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching blog category:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog category' },
            { status: 500 }
        );
    }
}

// PUT /api/blog/categories/[id] - Update a blog category
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid category ID' },
                { status: 400 }
            );
        }

        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.slug) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if the category exists
        const existingCategory = await db
            .select({ id: blogCategories.id })
            .from(blogCategories)
            .where(eq(blogCategories.id, id));

        if (existingCategory.length === 0) {
            return NextResponse.json(
                { error: 'Blog category not found' },
                { status: 404 }
            );
        }

        // Check if slug already exists (for another category)
        const slugCheck = await db
            .select({ id: blogCategories.id })
            .from(blogCategories)
            .where(eq(blogCategories.slug, body.slug));

        if (slugCheck.length > 0 && slugCheck[0].id !== id) {
            return NextResponse.json(
                { error: 'A different category with this slug already exists' },
                { status: 400 }
            );
        }

        // Update the category
        const updatedCategory = await db
            .update(blogCategories)
            .set({
                name: body.name,
                slug: body.slug,
                description: body.description || null,
                updatedAt: new Date(),
            })
            .where(eq(blogCategories.id, id))
            .returning();

        return NextResponse.json(updatedCategory[0], { status: 200 });
    } catch (error) {
        console.error('Error updating blog category:', error);
        return NextResponse.json(
            { error: 'Failed to update blog category' },
            { status: 500 }
        );
    }
}

// DELETE /api/blog/categories/[id] - Delete a blog category
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid category ID' },
                { status: 400 }
            );
        }

        // Check if the category exists
        const existingCategory = await db
            .select({ id: blogCategories.id })
            .from(blogCategories)
            .where(eq(blogCategories.id, id));

        if (existingCategory.length === 0) {
            return NextResponse.json(
                { error: 'Blog category not found' },
                { status: 404 }
            );
        }

        // Check if any posts are using this category
        const postsWithCategory = await db
            .select({ id: blogPosts.id })
            .from(blogPosts)
            .where(eq(blogPosts.categoryId, id));

        if (postsWithCategory.length > 0) {
            return NextResponse.json(
                { error: 'Cannot delete category because it is associated with one or more posts' },
                { status: 400 }
            );
        }

        // Delete the category
        await db
            .delete(blogCategories)
            .where(eq(blogCategories.id, id));

        return NextResponse.json(
            { message: 'Blog category deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting blog category:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog category' },
            { status: 500 }
        );
    }
} 