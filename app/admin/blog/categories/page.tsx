import { db } from '@/lib/db';
import { blogCategories, blogPosts } from '@/lib/schema';
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
import { PlusCircle, Pencil, Trash, ChevronLeft } from 'lucide-react';

export const metadata = {
    title: 'Blog Categories - Admin Panel',
};

async function BlogCategoriesPage() {
    // Fetch all categories
    const categories = await db
        .select({
            id: blogCategories.id,
            name: blogCategories.name,
            slug: blogCategories.slug,
            description: blogCategories.description,
            createdAt: blogCategories.createdAt,
        })
        .from(blogCategories)
        .orderBy(blogCategories.name);

    // Get post count for each category
    const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
            const posts = await db
                .select({ id: blogPosts.id })
                .from(blogPosts)
                .where(eq(blogPosts.categoryId, category.id));

            return {
                ...category,
                postCount: posts.length,
                createdAt: new Date(category.createdAt).toLocaleDateString(),
            };
        })
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Blog Categories</h1>
                <div className="flex space-x-4">
                    <Link href="/admin/blog/categories/new">
                        <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Category
                        </Button>
                    </Link>
                    <Link href="/admin/blog">
                        <Button variant="outline" size="sm">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Posts
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Posts</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categoriesWithCounts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No categories found. Create a new category to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            categoriesWithCounts.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.name}</TableCell>
                                    <TableCell>{category.slug}</TableCell>
                                    <TableCell>{category.description || 'No description'}</TableCell>
                                    <TableCell>{category.postCount}</TableCell>
                                    <TableCell>{category.createdAt}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Link href={`/admin/blog/categories/${category.id}/edit`}>
                                                <Button variant="outline" size="icon" className="h-8 w-8">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/blog/categories/${category.id}/delete`}>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500"
                                                    disabled={category.postCount > 0}
                                                    title={category.postCount > 0 ? "Cannot delete category with posts" : "Delete category"}
                                                >
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

export default BlogCategoriesPage; 