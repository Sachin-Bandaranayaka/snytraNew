"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";

// Form schema definition
const menuItemSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    description: z.string().optional(),
    price: z.string().refine((val) => !isNaN(parseFloat(val)), {
        message: "Price must be a valid number",
    }),
    categoryId: z.string().min(1, { message: "Please select a category" }),
    image: z.any().optional(),
    isVegetarian: z.boolean().default(false),
    isVegan: z.boolean().default(false),
    isGlutenFree: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

interface Category {
    id: number;
    name: string;
}

interface MenuItem {
    id: number;
    name: string;
    description?: string;
    price: number;
    categoryId: number;
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
    isFeatured?: boolean;
    imageUrl?: string;
}

export default function EditMenuItem() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Initialize form
    const form = useForm<MenuItemFormValues>({
        resolver: zodResolver(menuItemSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            categoryId: "",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            isFeatured: false,
        },
    });

    // Fetch menu item data
    useEffect(() => {
        const fetchMenuItem = async () => {
            if (!params.id) return;

            try {
                const response = await fetch(`/api/menu/${params.id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch menu item');
                }

                const data = await response.json();

                // Set form values
                form.reset({
                    name: data.name,
                    description: data.description || "",
                    price: (data.price / 100).toString(), // Convert from cents to dollars
                    categoryId: data.categoryId.toString(),
                    isVegetarian: data.isVegetarian || false,
                    isVegan: data.isVegan || false,
                    isGlutenFree: data.isGlutenFree || false,
                    isFeatured: data.isFeatured || false,
                });

                // Set image preview if available
                if (data.imageUrl) {
                    setImagePreview(data.imageUrl);
                }
            } catch (error) {
                console.error('Error fetching menu item:', error);
                toast({
                    title: "Error",
                    description: "Could not load menu item. Please try again.",
                    variant: "destructive",
                });

                // For development, use mock data
                if (process.env.NODE_ENV === 'development') {
                    const mockItem = {
                        id: parseInt(params.id as string),
                        name: "Mock Menu Item",
                        description: "This is a mock menu item for development",
                        price: 1299, // In cents
                        categoryId: 1,
                        isVegetarian: true,
                        isVegan: false,
                        isGlutenFree: false,
                        isFeatured: true,
                    };

                    form.reset({
                        name: mockItem.name,
                        description: mockItem.description,
                        price: (mockItem.price / 100).toString(),
                        categoryId: mockItem.categoryId.toString(),
                        isVegetarian: mockItem.isVegetarian,
                        isVegan: mockItem.isVegan,
                        isGlutenFree: mockItem.isGlutenFree,
                        isFeatured: mockItem.isFeatured,
                    });
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchMenuItem();
    }, [params.id, form, toast]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/menu/categories');

                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const data = await response.json();
                setCategories(data.categories || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast({
                    title: "Error",
                    description: "Failed to load categories. Please try again.",
                    variant: "destructive",
                });

                // Set mock categories for development
                if (process.env.NODE_ENV === 'development') {
                    setCategories([
                        { id: 1, name: "Pizza" },
                        { id: 2, name: "Salad" },
                        { id: 3, name: "Pasta" },
                    ]);
                }
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, [toast]);

    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            form.setValue("image", file);
        }
    };

    // Form submission handler
    const onSubmit = async (data: MenuItemFormValues) => {
        if (!params.id) return;

        setIsSubmitting(true);

        try {
            // Convert price from dollars to cents
            const priceInCents = Math.round(parseFloat(data.price) * 100);

            // Create FormData to handle file upload
            const formData = new FormData();
            formData.append("id", params.id as string);
            formData.append("name", data.name);
            formData.append("description", data.description || "");
            formData.append("price", priceInCents.toString());
            formData.append("categoryId", data.categoryId);
            formData.append("isVegetarian", data.isVegetarian ? "true" : "false");
            formData.append("isVegan", data.isVegan ? "true" : "false");
            formData.append("isGlutenFree", data.isGlutenFree ? "true" : "false");
            formData.append("isFeatured", data.isFeatured ? "true" : "false");

            if (data.image instanceof File) {
                formData.append("image", data.image);
            }

            // Send the request
            const response = await fetch(`/api/menu/${params.id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update menu item');
            }

            toast({
                title: "Success",
                description: "Menu item has been updated successfully",
            });

            // Redirect back to menu management
            router.push('/dashboard/management/menu');
        } catch (error) {
            console.error('Error updating menu item:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : 'Failed to update menu item',
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-[#e85c2c]" />
                    <p className="text-sm text-gray-500">Loading menu item...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#f7f5f1] min-h-screen p-6">
            <div className="mb-6">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="mb-4"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Menu
                </Button>
                <h1 className="text-3xl font-bold text-[#e85c2c]">Edit Menu Item</h1>
                <p className="text-gray-600 mt-1">Update the details for this menu item</p>
            </div>

            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Menu Item Details</CardTitle>
                    <CardDescription>
                        Edit the details for this menu item. All fields marked with * are required.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Pizza Margherita" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price (₹) *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="199.99" {...field} />
                                                </FormControl>
                                                <FormDescription>Enter the price in rupees (₹)</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="categoryId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category *</FormLabel>
                                                <Select
                                                    disabled={loadingCategories}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {loadingCategories ? (
                                                            <div className="flex items-center justify-center p-2">
                                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                                Loading...
                                                            </div>
                                                        ) : categories.length > 0 ? (
                                                            categories.map((category) => (
                                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))
                                                        ) : (
                                                            <div className="p-2 text-center text-sm">
                                                                No categories available. Please add a category first.
                                                            </div>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="isVegetarian"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                                    <div className="space-y-0.5">
                                                        <FormLabel>Vegetarian</FormLabel>
                                                        <FormDescription>
                                                            Mark if this item is vegetarian
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="isVegan"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                                    <div className="space-y-0.5">
                                                        <FormLabel>Vegan</FormLabel>
                                                        <FormDescription>
                                                            Mark if this item is vegan
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="isGlutenFree"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                                    <div className="space-y-0.5">
                                                        <FormLabel>Gluten Free</FormLabel>
                                                        <FormDescription>
                                                            Mark if this item is gluten free
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="isFeatured"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                                    <div className="space-y-0.5">
                                                        <FormLabel>Featured Item</FormLabel>
                                                        <FormDescription>
                                                            Mark if this is a featured menu item
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe your menu item"
                                                        className="min-h-[120px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormItem className="space-y-2">
                                        <FormLabel>Item Image</FormLabel>
                                        <div className="flex flex-col gap-4">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="cursor-pointer"
                                            />
                                            {imagePreview && (
                                                <div className="relative w-full h-[200px] rounded-md overflow-hidden border">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <FormDescription>
                                            Upload a new image or keep the existing one.
                                        </FormDescription>
                                    </FormItem>
                                </div>
                            </div>

                            <CardFooter className="flex justify-end gap-2 px-0">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.back()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#e85c2c] hover:bg-[#d24e20] text-white"
                                    disabled={isSubmitting || categories.length === 0}
                                >
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isSubmitting ? 'Updating...' : 'Update Menu Item'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
} 