"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteCategoryPageProps {
    params: {
        id: string;
    };
}

export default function DeleteCategoryPage({ params }: DeleteCategoryPageProps) {
    const categoryId = params.id;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState<any>(null);
    const [postsCount, setPostsCount] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    // Fetch category data and check if it has posts
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/blog/categories/${categoryId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch category');
                }

                const categoryData = await response.json();
                setCategory(categoryData);

                // Get posts count for this category
                const postsResponse = await fetch(`/api/blog/posts?categoryId=${categoryId}`);
                if (postsResponse.ok) {
                    const postsData = await postsResponse.json();
                    setPostsCount(postsData.length);
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
                toast.error('Failed to load category data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategoryData();
    }, [categoryId]);

    // Handle category deletion
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await fetch(`/api/blog/categories/${categoryId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete category');
            }

            toast.success('Category deleted successfully');
            router.push('/admin/blog/categories');
            router.refresh();
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to delete category');
        } finally {
            setIsDeleting(false);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        setIsOpen(false);
        router.push('/admin/blog/categories');
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Delete Category</h1>
                <div className="rounded-md border p-6 text-center">
                    Loading category data...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Delete Category</h1>
                <Link href="/admin/blog/categories">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Categories
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border p-6">
                {category ? (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            Are you sure you want to delete this category?
                        </h2>
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">Category Name:</span> {category.name}
                            </p>
                            <p>
                                <span className="font-semibold">Slug:</span> {category.slug}
                            </p>
                            {category.description && (
                                <p>
                                    <span className="font-semibold">Description:</span> {category.description}
                                </p>
                            )}
                            <p>
                                <span className="font-semibold">Posts in this category:</span> {postsCount}
                            </p>
                        </div>

                        {postsCount > 0 ? (
                            <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200 text-yellow-800">
                                <p className="font-medium">Cannot delete this category</p>
                                <p className="mt-1">
                                    This category has {postsCount} {postsCount === 1 ? 'post' : 'posts'} associated with it.
                                    You must reassign or delete these posts before deleting this category.
                                </p>
                            </div>
                        ) : (
                            <div className="pt-4 flex space-x-4">
                                <Button
                                    variant="destructive"
                                    onClick={() => setIsOpen(true)}
                                    disabled={isDeleting || postsCount > 0}
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete Category'}
                                </Button>
                                <Link href="/admin/blog/categories">
                                    <Button variant="outline">Cancel</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p>Category not found or could not be loaded.</p>
                        <div className="mt-4">
                            <Link href="/admin/blog/categories">
                                <Button>Return to Categories</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <AlertDialog open={isOpen && !!category && postsCount === 0} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the category "{category?.name}" and remove its data from the server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
} 