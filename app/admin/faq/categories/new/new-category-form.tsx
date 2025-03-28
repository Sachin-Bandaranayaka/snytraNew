"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

// Define schema for form validation
const formSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
    slug: z.string().min(3, { message: 'Slug must be at least 3 characters' })
        .regex(/^[a-z0-9-]+$/, { message: 'Slug can only contain lowercase letters, numbers, and hyphens' }),
    description: z.string().optional(),
    order: z.coerce.number().int().nonnegative().default(0),
    isActive: z.boolean().default(true),
});

export default function NewCategoryForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            slug: '',
            description: '',
            order: 0,
            isActive: true,
        },
    });

    // Generate a slug from the title
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
            .trim();
    };

    // Handle form submission
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/admin/faq/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'An error occurred while creating the category');
            }

            toast.success('FAQ category created successfully');
            router.push('/admin/faq');
            router.refresh();
        } catch (error) {
            console.error('Error creating FAQ category:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to create FAQ category');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., General Questions"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        // Auto-generate slug when user types in title field
                                        if (!form.getValues('slug')) {
                                            form.setValue('slug', generateSlug(e.target.value), {
                                                shouldValidate: true,
                                            });
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The name of the FAQ category as it will appear to users
                            </FormDescription>
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
                                <Input placeholder="e.g., general-questions" {...field} />
                            </FormControl>
                            <FormDescription>
                                The URL-friendly version of the title. Used in the URL for this category.
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
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Brief description of this category..."
                                    {...field}
                                    rows={3}
                                />
                            </FormControl>
                            <FormDescription>
                                Help users understand what questions are in this category
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Display Order</FormLabel>
                            <FormControl>
                                <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormDescription>
                                Controls the order of display. Lower numbers appear first.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Active</FormLabel>
                                <FormDescription>
                                    When active, this category will be visible on the FAQ page
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-4">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => router.push('/admin/faq')}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Category'}
                    </Button>
                </div>
            </form>
        </Form>
    );
} 