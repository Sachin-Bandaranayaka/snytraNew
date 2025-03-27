import { db } from '@/lib/db';
import { blogPosts, blogCategories, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash, Eye, ChevronLeft } from 'lucide-react';

export const metadata = {
    title: 'Blog Management - Admin Panel',
};

async function BlogManagementPage() {
    // Fetch all blog posts with their categories and authors
    const posts = await db
        .select({
            id: blogPosts.id,
            title: blogPosts.title,
            slug: blogPosts.slug,
            status: blogPosts.status,
            createdAt: blogPosts.createdAt,
            publishedAt: blogPosts.publishedAt,
            categoryId: blogPosts.categoryId,
            authorId: blogPosts.authorId,
        })
        .from(blogPosts)
        .orderBy(blogPosts.createdAt);

    // Get categories for each post
    const postsWithCategories = await Promise.all(
        posts.map(async (post) => {
            // Get category
            let category = { name: 'Uncategorized' };
            if (post.categoryId) {
                const categoryResult = await db
                    .select({ name: blogCategories.name })
                    .from(blogCategories)
                    .where(eq(blogCategories.id, post.categoryId));

                if (categoryResult.length > 0) {
                    category = categoryResult[0];
                }
            }

            // Get author
            let author = { name: 'Unknown', email: '' };
            if (post.authorId) {
                const authorResult = await db
                    .select({ name: users.name, email: users.email })
                    .from(users)
                    .where(eq(users.id, post.authorId));

                if (authorResult.length > 0) {
                    author = authorResult[0];
                }
            }

            return {
                ...post,
                category: category.name,
                author: author.name || author.email,
                createdAt: new Date(post.createdAt).toLocaleDateString(),
                publishedAt: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published',
            };
        })
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                <div className="flex space-x-4">
                    <Link href="/admin/blog/categories">
                        <Button variant="outline" size="sm">
                            Manage Categories
                        </Button>
                    </Link>
                    <Link href="/admin/blog/new">
                        <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Post
                        </Button>
                    </Link>
                    <Link href="/admin">
                        <Button variant="outline" size="sm">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {postsWithCategories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">
                                    No blog posts found. Create a new post to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            postsWithCategories.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>{post.slug}</TableCell>
                                    <TableCell>{post.category}</TableCell>
                                    <TableCell>{post.author}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs ${post.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{post.createdAt}</TableCell>
                                    <TableCell>{post.publishedAt}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Link href={`/blog/${post.slug}`} target="_blank">
                                                <Button variant="outline" size="icon" className="h-8 w-8">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/blog/${post.id}/edit`}>
                                                <Button variant="outline" size="icon" className="h-8 w-8">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/blog/${post.id}/delete`}>
                                                <Button variant="outline" size="icon" className="h-8 w-8 text-red-500">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default BlogManagementPage; 