"use client";

import { useState, useEffect } from 'react';
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

interface EditCategoryPageProps {
    params: {
        id: string;
    };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
    const categoryId = params.id;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCategory, setIsLoadingCategory] = useState(true);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
        },
    });

    // Fetch the category data
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                setIsLoadingCategory(true);
                const response = await fetch(`/api/blog/categories/${categoryId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch category');
                }

                const categoryData = await response.json();

                // Set the form values with the fetched data
                form.setValue('name', categoryData.name);
                form.setValue('slug', categoryData.slug);
                form.setValue('description', categoryData.description || '');
            } catch (error) {
                console.error('Error fetching category data:', error);
                toast.error('Failed to load category data');
            } finally {
                setIsLoadingCategory(false);
            }
        };

        fetchCategoryData();
    }, [categoryId, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/blog/categories/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            toast.success('Category updated successfully');
            router.push('/admin/blog/categories');
            router.refresh();
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Failed to update category');
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

    if (isLoadingCategory) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
                <div className="rounded-md border p-6 text-center">
                    Loading category data...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
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
                                {isLoading ? 'Updating...' : 'Update Category'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
} 