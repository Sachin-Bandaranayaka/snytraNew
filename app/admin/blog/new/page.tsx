"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    slug: z.string().min(1, { message: 'Slug is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
    excerpt: z.string().optional(),
    categoryId: z.string().optional(),
    status: z.enum(['draft', 'published']),
    featuredImage: z.string().optional(),
});

export default function NewPostPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    // Fetch categories when the component mounts
    useState(() => {
        fetch('/api/blog/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                toast.error('Failed to load categories');
            });
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            slug: '',
            content: '',
            excerpt: '',
            status: 'draft',
            featuredImage: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const response = await fetch('/api/blog/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to create blog post');
            }

            toast.success('Blog post created successfully');
            router.push('/admin/blog');
            router.refresh();
        } catch (error) {
            console.error('Error creating blog post:', error);
            toast.error('Failed to create blog post');
        } finally {
            setIsLoading(false);
        }
    }

    function generateSlug(title: string) {
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        form.setValue('slug', slug);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Create New Blog Post</h1>
                <Link href="/admin/blog">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Posts
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Post title"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                // Auto-generate slug from title if slug is empty
                                                if (!form.getValues('slug')) {
                                                    generateSlug(e.target.value);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="post-slug" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This will be used in the URL (e.g., /blog/post-slug)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category: any) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write your post content here..."
                                            className="min-h-[300px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Excerpt</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="A short summary of your post (optional)"
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This will be displayed in blog listing pages
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="featuredImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Featured Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/image.jpg" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a URL for the featured image (optional)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select post status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Only published posts will be visible to the public
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Create Post'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
} 