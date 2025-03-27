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

interface DeletePostPageProps {
    params: {
        id: string;
    };
}

export default function DeletePostPage({ params }: DeletePostPageProps) {
    const postId = params.id;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    // Fetch post data on component mount
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/blog/posts/${postId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }

                const postData = await response.json();
                setPost(postData);
            } catch (error) {
                console.error('Error fetching post data:', error);
                toast.error('Failed to load post data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostData();
    }, [postId]);

    // Handle post deletion
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await fetch(`/api/blog/posts/${postId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            toast.success('Post deleted successfully');
            router.push('/admin/blog');
            router.refresh();
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Failed to delete post');
        } finally {
            setIsDeleting(false);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        setIsOpen(false);
        router.push('/admin/blog');
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Delete Blog Post</h1>
                <div className="rounded-md border p-6 text-center">
                    Loading post data...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Delete Blog Post</h1>
                <Link href="/admin/blog">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Posts
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border p-6">
                {post ? (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            Are you sure you want to delete this post?
                        </h2>
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">Title:</span> {post.title}
                            </p>
                            <p>
                                <span className="font-semibold">Slug:</span> {post.slug}
                            </p>
                            <p>
                                <span className="font-semibold">Status:</span>{' '}
                                <span className={`${post.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {post.status}
                                </span>
                            </p>
                            {post.excerpt && (
                                <p>
                                    <span className="font-semibold">Excerpt:</span> {post.excerpt}
                                </p>
                            )}
                        </div>

                        <div className="pt-4 flex space-x-4">
                            <Button
                                variant="destructive"
                                onClick={() => setIsOpen(true)}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Post'}
                            </Button>
                            <Link href="/admin/blog">
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p>Post not found or could not be loaded.</p>
                        <div className="mt-4">
                            <Link href="/admin/blog">
                                <Button>Return to Post List</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <AlertDialog open={isOpen && !!post} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the blog post "{post?.title}" and remove its data from the server.
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