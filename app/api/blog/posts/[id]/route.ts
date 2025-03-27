import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq } from 'drizzle-orm';

interface RouteParams {
    params: {
        id: string;
    };
}

// GET /api/blog/posts/[id] - Get a specific blog post
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid post ID' },
                { status: 400 }
            );
        }

        const post = await db
            .select()
            .from(blogPosts)
            .where(eq(blogPosts.id, id));

        if (post.length === 0) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(post[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog post' },
            { status: 500 }
        );
    }
}

// PUT /api/blog/posts/[id] - Update a blog post
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid post ID' },
                { status: 400 }
            );
        }

        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.slug || !body.content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if the post exists
        const existingPost = await db
            .select({ id: blogPosts.id })
            .from(blogPosts)
            .where(eq(blogPosts.id, id));

        if (existingPost.length === 0) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        // Check if slug already exists (for another post)
        const slugCheck = await db
            .select({ id: blogPosts.id })
            .from(blogPosts)
            .where(eq(blogPosts.slug, body.slug));

        if (slugCheck.length > 0 && slugCheck[0].id !== id) {
            return NextResponse.json(
                { error: 'A different post with this slug already exists' },
                { status: 400 }
            );
        }

        // Prepare update data
        const updateData: any = {
            title: body.title,
            slug: body.slug,
            content: body.content,
            excerpt: body.excerpt || null,
            featuredImage: body.featuredImage || null,
            categoryId: body.categoryId ? parseInt(body.categoryId) : null,
            status: body.status || 'draft',
            updatedAt: new Date(),
        };

        // If status changed to published, update publishedAt
        if (body.status === 'published') {
            const currentPost = await db
                .select({ status: blogPosts.status, publishedAt: blogPosts.publishedAt })
                .from(blogPosts)
                .where(eq(blogPosts.id, id));

            if (currentPost[0].status !== 'published' || !currentPost[0].publishedAt) {
                updateData.publishedAt = new Date();
            }
        }

        // Update the post
        const updatedPost = await db
            .update(blogPosts)
            .set(updateData)
            .where(eq(blogPosts.id, id))
            .returning();

        return NextResponse.json(updatedPost[0], { status: 200 });
    } catch (error) {
        console.error('Error updating blog post:', error);
        return NextResponse.json(
            { error: 'Failed to update blog post' },
            { status: 500 }
        );
    }
}

// DELETE /api/blog/posts/[id] - Delete a blog post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid post ID' },
                { status: 400 }
            );
        }

        // Check if the post exists
        const existingPost = await db
            .select({ id: blogPosts.id })
            .from(blogPosts)
            .where(eq(blogPosts.id, id));

        if (existingPost.length === 0) {
            return NextResponse.json(
                { error: 'Blog post not found' },
                { status: 404 }
            );
        }

        // Delete the post
        await db
            .delete(blogPosts)
            .where(eq(blogPosts.id, id));

        return NextResponse.json(
            { message: 'Blog post deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog post' },
            { status: 500 }
        );
    }
} 