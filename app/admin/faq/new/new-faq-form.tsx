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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

// Define schema for form validation
const formSchema = z.object({
    categoryId: z.coerce.number().int().positive({
        message: 'Please select a category',
    }),
    question: z.string().min(5, {
        message: 'Question must be at least 5 characters',
    }),
    answer: z.string().min(5, {
        message: 'Answer must be at least 5 characters',
    }),
    order: z.coerce.number().int().nonnegative().default(0),
    isActive: z.boolean().default(true),
});

type Category = {
    id: number;
    title: string;
    description: string | null;
    slug: string;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

interface NewFAQFormProps {
    categories: Category[];
    preselectedCategoryId?: number;
}

export default function NewFAQForm({ categories, preselectedCategoryId }: NewFAQFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: preselectedCategoryId || 0,
            question: '',
            answer: '',
            order: 0,
            isActive: true,
        },
    });

    // Handle form submission
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/admin/faq/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'An error occurred while creating the FAQ item');
            }

            toast.success('FAQ item created successfully');
            router.push(`/admin/faq/categories/${values.categoryId}`);
            router.refresh();
        } catch (error) {
            console.error('Error creating FAQ item:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to create FAQ item');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(parseInt(value))}
                                defaultValue={field.value ? field.value.toString() : undefined}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Select the category this FAQ item belongs to
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., How do I reset my password?" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the question as it will appear on the FAQ page
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Provide a detailed answer to the question..."
                                    {...field}
                                    rows={5}
                                />
                            </FormControl>
                            <FormDescription>
                                Provide a clear and helpful answer
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
                                Controls the order of display within the category. Lower numbers appear first.
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
                                    When active, this FAQ item will be visible on the FAQ page
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
                        {isSubmitting ? 'Creating...' : 'Create FAQ Item'}
                    </Button>
                </div>
            </form>
        </Form>
    );
} 