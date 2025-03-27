import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogCategories } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// GET /api/blog/categories - Get all blog categories
export async function GET(request: NextRequest) {
    try {
        const categories = await db
            .select()
            .from(blogCategories)
            .orderBy(blogCategories.name);

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error('Error fetching blog categories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog categories' },
            { status: 500 }
        );
    }
}

// POST /api/blog/categories - Create a new blog category
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.slug) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existingCategory = await db
            .select({ id: blogCategories.id })
            .from(blogCategories)
            .where(eq(blogCategories.slug, body.slug));

        if (existingCategory.length > 0) {
            return NextResponse.json(
                { error: 'A category with this slug already exists' },
                { status: 400 }
            );
        }

        // Insert new category
        const newCategory = await db
            .insert(blogCategories)
            .values({
                name: body.name,
                slug: body.slug,
                description: body.description || null,
            })
            .returning();

        return NextResponse.json(newCategory[0], { status: 201 });
    } catch (error) {
        console.error('Error creating blog category:', error);
        return NextResponse.json(
            { error: 'Failed to create blog category' },
            { status: 500 }
        );
    }
} 