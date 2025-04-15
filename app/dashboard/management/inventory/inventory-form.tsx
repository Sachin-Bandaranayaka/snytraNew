"use client";

import { useState } from 'react';
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
import { toast } from '@/components/ui/use-toast';
import { DialogClose } from '@/components/ui/dialog';

// Define schema for form validation
const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters',
    }),
    description: z.string().optional(),
    sku: z.string().optional(),
    category: z.string().optional(),
    unit: z.string().optional(),
    quantity: z.coerce.number().int().nonnegative().default(0),
    reorderLevel: z.coerce.number().int().nonnegative().default(10),
    costPerUnit: z.string().optional().transform(val => {
        if (!val) return null;
        // Remove currency symbols and convert to cents
        const parsed = parseFloat(val.replace(/[^0-9.]/g, ''));
        return isNaN(parsed) ? null : parsed;
    }),
    supplier: z.string().optional(),
    imageUrl: z.string().optional(),
    isActive: z.boolean().default(true),
});

type InventoryFormValues = z.infer<typeof formSchema>;

const CATEGORY_OPTIONS = [
    "Beverages",
    "Dairy",
    "Meat",
    "Produce",
    "Bakery",
    "Dry Goods",
    "Supplies",
    "Other",
];

const UNIT_OPTIONS = [
    "ea",
    "g",
    "kg",
    "ml",
    "l",
    "oz",
    "lb",
    "pcs",
    "pack",
    "case",
    "box",
];

interface InventoryFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function InventoryForm({ onSuccess, onCancel }: InventoryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form
    const form = useForm<InventoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            sku: '',
            category: '',
            unit: 'ea',
            quantity: 0,
            reorderLevel: 10,
            costPerUnit: '',
            supplier: '',
            imageUrl: '',
            isActive: true,
        },
    });

    // Handle form submission
    const onSubmit = async (values: InventoryFormValues) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'An error occurred while creating the inventory item');
            }

            toast({
                title: "Success",
                description: "Inventory item created successfully",
            });

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error creating inventory item:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : 'Failed to create inventory item',
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name*</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Coffee Beans" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="sku"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>SKU</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., CB-001" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
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
                                        {CATEGORY_OPTIONS.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Unit</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a unit" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {UNIT_OPTIONS.map((unit) => (
                                            <SelectItem key={unit} value={unit}>
                                                {unit}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="costPerUnit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cost Per Unit</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., $5.99" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="reorderLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reorder Level</FormLabel>
                                <FormControl>
                                    <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormDescription>
                                    When stock falls below this level, it will be marked as low
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Supplier</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Acme Foods Inc." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
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
                                    placeholder="Provide details about this inventory item..."
                                    {...field}
                                    rows={3}
                                />
                            </FormControl>
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
                                    When active, this item will appear in inventory lists
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-4 pt-2">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting} className="bg-[#e85c2c] hover:bg-[#d24e20]">
                        {isSubmitting ? 'Creating...' : 'Create Item'}
                    </Button>
                </div>
            </form>
        </Form>
    );
} 