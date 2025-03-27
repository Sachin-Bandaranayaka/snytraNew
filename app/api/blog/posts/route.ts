import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// GET /api/blog/posts - Get all blog posts
export async function GET(request: NextRequest) {
    try {
        const posts = await db
            .select()
            .from(blogPosts)
            .orderBy(blogPosts.createdAt);

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog posts' },
            { status: 500 }
        );
    }
}

// POST /api/blog/posts - Create a new blog post
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.slug || !body.content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existingPost = await db
            .select({ id: blogPosts.id })
            .from(blogPosts)
            .where(eq(blogPosts.slug, body.slug));

        if (existingPost.length > 0) {
            return NextResponse.json(
                { error: 'A post with this slug already exists' },
                { status: 400 }
            );
        }

        // Prepare data for insertion
        const postData = {
            title: body.title,
            slug: body.slug,
            content: body.content,
            excerpt: body.excerpt || null,
            featuredImage: body.featuredImage || null,
            categoryId: body.categoryId ? parseInt(body.categoryId) : null,
            authorId: 1, // Default to admin user or get from session
            status: body.status || 'draft',
            publishedAt: body.status === 'published' ? new Date() : null,
        };

        // Insert new post
        const newPost = await db.insert(blogPosts).values(postData).returning();

        return NextResponse.json(newPost[0], { status: 201 });
    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json(
            { error: 'Failed to create blog post' },
            { status: 500 }
        );
    }
} 