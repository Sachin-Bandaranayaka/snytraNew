"use client";

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { X, Plus, Trash2 } from 'lucide-react';

// Define schemas for form validation
const orderItemSchema = z.object({
    menuItemId: z.coerce.number().int().optional(),
    name: z.string().min(1, "Item name is required"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    quantity: z.coerce.number().int().positive("Quantity must be at least 1"),
    notes: z.string().optional(),
});

const customerSchema = z.object({
    name: z.string().min(1, "Customer name is required"),
    email: z.string().email("Invalid email").optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    address: z.string().optional().or(z.literal('')),
});

const formSchema = z.object({
    customer: customerSchema.optional(),
    orderType: z.enum(["dine-in", "takeaway", "delivery"]),
    items: z.array(orderItemSchema).min(1, "At least one item is required"),
    tableNumber: z.coerce.number().int().positive().optional(),
    notes: z.string().optional(),
    paymentMethod: z.enum(["cash", "card", "online"]).optional(),
    paymentStatus: z.enum(["pending", "paid"]).default("pending"),
});

type OrderFormValues = z.infer<typeof formSchema>;

interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: string;
}

interface OrderFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function OrderForm({ onSuccess, onCancel }: OrderFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

    // Initialize form
    const form = useForm<OrderFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orderType: "dine-in",
            items: [],
            paymentStatus: "pending",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    // Fetch menu items
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('/api/menu-items');
                if (!response.ok) {
                    throw new Error('Failed to fetch menu items');
                }
                const data = await response.json();
                setMenuItems(data.items || []);
            } catch (error) {
                console.error('Error fetching menu items:', error);
                toast({
                    title: "Error",
                    description: "Failed to load menu items. Please try again later.",
                    variant: "destructive"
                });
                // Use mock data as fallback
                setMenuItems([
                    { id: 1, name: 'Burger', price: 899, category: 'Main' },
                    { id: 2, name: 'Fries', price: 299, category: 'Side' },
                    { id: 3, name: 'Cola', price: 199, category: 'Drink' },
                    { id: 4, name: 'Pizza', price: 1299, category: 'Main' },
                ]);
            }
        };

        fetchMenuItems();
    }, []);

    // Handle adding menu item to order
    const handleAddMenuItem = () => {
        if (selectedMenuItem) {
            append({
                menuItemId: selectedMenuItem.id,
                name: selectedMenuItem.name,
                price: selectedMenuItem.price / 100, // Convert from cents to display currency
                quantity: 1,
                notes: '',
            });
            setSelectedMenuItem(null);
        }
    };

    // Handle item selection
    const handleMenuItemSelect = (itemId: string) => {
        const id = parseInt(itemId);
        const item = menuItems.find(item => item.id === id);
        if (item) {
            setSelectedMenuItem(item);
        }
    };

    // Handle form submission
    const onSubmit = async (values: OrderFormValues) => {
        setIsSubmitting(true);

        // Format data for API
        const orderData = {
            ...values,
            items: values.items.map(item => ({
                ...item,
                price: Math.round(item.price * 100), // Convert to cents for storage
                subtotal: Math.round(item.price * 100) * item.quantity,
            })),
            // Calculate totals
            subtotal: values.items.reduce((sum, item) => sum + (item.price * 100 * item.quantity), 0),
            tax: Math.round(values.items.reduce((sum, item) => sum + (item.price * 100 * item.quantity), 0) * 0.1), // 10% tax
            deliveryFee: values.orderType === 'delivery' ? 500 : 0, // $5 delivery fee
        };

        // Calculate total
        orderData.total = orderData.subtotal + orderData.tax + orderData.deliveryFee;

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'An error occurred while creating the order');
            }

            toast({
                title: "Success",
                description: "Order created successfully",
            });

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error creating order:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : 'Failed to create order',
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
                    name="orderType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Order Type*</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select order type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="dine-in">Dine-in</SelectItem>
                                    <SelectItem value="takeaway">Takeaway</SelectItem>
                                    <SelectItem value="delivery">Delivery</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.watch('orderType') === 'dine-in' && (
                    <FormField
                        control={form.control}
                        name="tableNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Table Number*</FormLabel>
                                <FormControl>
                                    <Input type="number" min="1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <div className="space-y-4 border rounded-md p-4">
                    <h3 className="font-medium">Customer Information</h3>

                    <FormField
                        control={form.control}
                        name="customer.name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Customer name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="customer.email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="customer.phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {form.watch('orderType') === 'delivery' && (
                        <FormField
                            control={form.control}
                            name="customer.address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Delivery Address*</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Delivery address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>

                <div className="space-y-4 border rounded-md p-4">
                    <h3 className="font-medium">Order Items</h3>

                    <div className="flex gap-2 items-end">
                        <div className="flex-1">
                            <FormLabel>Add Menu Item</FormLabel>
                            <Select onValueChange={handleMenuItemSelect}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a menu item" />
                                </SelectTrigger>
                                <SelectContent>
                                    {menuItems.map((item) => (
                                        <SelectItem key={item.id} value={item.id.toString()}>
                                            {item.name} - ${(item.price / 100).toFixed(2)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            type="button"
                            onClick={handleAddMenuItem}
                            disabled={!selectedMenuItem}
                            className="bg-[#e85c2c] hover:bg-[#d24e20]"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                        </Button>
                    </div>

                    {fields.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                            No items added yet. Select items from the menu above.
                        </div>
                    )}

                    {fields.length > 0 && (
                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="border rounded-md p-3 space-y-3 relative">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 h-6 w-6"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>

                                    <div className="font-medium">{form.watch(`items.${index}.name`)}</div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`items.${index}.price`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Price</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" step="0.01" min="0" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`items.${index}.quantity`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Quantity</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" min="1" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.notes`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Special Instructions</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="e.g., No onions" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Method</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select payment method" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="card">Card</SelectItem>
                                        <SelectItem value="online">Online</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="paymentStatus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select payment status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Order Notes</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Any additional notes about the order..."
                                    {...field}
                                    rows={3}
                                />
                            </FormControl>
                            <FormMessage />
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
                    <Button
                        type="submit"
                        disabled={isSubmitting || fields.length === 0}
                        className="bg-[#e85c2c] hover:bg-[#d24e20]"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Order'}
                    </Button>
                </div>
            </form>
        </Form>
    );
} 