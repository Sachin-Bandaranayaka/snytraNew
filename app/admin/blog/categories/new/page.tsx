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
import { toast } from 'sonner';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Category name is required' }),
    slug: z.string().min(1, { message: 'Slug is required' }),
    description: z.string().optional(),
});

export default function NewCategoryPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const response = await fetch('/api/blog/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to create category');
            }

            toast.success('Category created successfully');
            router.push('/admin/blog/categories');
            router.refresh();
        } catch (error) {
            console.error('Error creating category:', error);
            toast.error('Failed to create category');
        } finally {
            setIsLoading(false);
        }
    }

    function generateSlug(name: string) {
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        form.setValue('slug', slug);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Create New Category</h1>
                <Link href="/admin/blog/categories">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Categories
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Category name"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                // Auto-generate slug from name if slug is empty
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
                                        <Input placeholder="category-slug" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This will be used in the URL (e.g., /blog/category/category-slug)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Category description (optional)"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        A brief description of what this category is about
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Create Category'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
} 