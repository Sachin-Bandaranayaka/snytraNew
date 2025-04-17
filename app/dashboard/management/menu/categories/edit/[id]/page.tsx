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
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";

// Form schema definition
const categorySchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    description: z.string().optional(),
    image: z.any().optional(),
    isActive: z.boolean().default(true),
    displayOrder: z.string().optional().transform(val => val ? parseInt(val, 10) : 0),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface Category {
    id: number;
    name: string;
    description?: string;
    displayOrder?: number;
    isActive?: boolean;
    imageUrl?: string;
}

export default function EditCategory() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Initialize form
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
            isActive: true,
            displayOrder: "0",
        },
    });

    // Fetch category data
    useEffect(() => {
        const fetchCategory = async () => {
            if (!params.id) return;

            try {
                const response = await fetch(`/api/menu/categories/${params.id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch category');
                }

                const data = await response.json();

                // Set form values
                form.reset({
                    name: data.name,
                    description: data.description || "",
                    displayOrder: data.displayOrder?.toString() || "0",
                    isActive: data.isActive !== false, // Default to true if undefined
                });

                // Set image preview if available
                if (data.imageUrl) {
                    setImagePreview(data.imageUrl);
                }
            } catch (error) {
                console.error('Error fetching category:', error);
                toast({
                    title: "Error",
                    description: "Could not load category. Please try again.",
                    variant: "destructive",
                });

                // For development, use mock data
                if (process.env.NODE_ENV === 'development') {
                    const mockCategory = {
                        id: parseInt(params.id as string),
                        name: "Mock Category",
                        description: "This is a mock category for development",
                        displayOrder: 1,
                        isActive: true,
                    };

                    form.reset({
                        name: mockCategory.name,
                        description: mockCategory.description,
                        displayOrder: mockCategory.displayOrder.toString(),
                        isActive: mockCategory.isActive,
                    });
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategory();
    }, [params.id, form, toast]);

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
    const onSubmit = async (data: CategoryFormValues) => {
        if (!params.id) return;

        setIsSubmitting(true);

        try {
            // Create FormData to handle file upload
            const formData = new FormData();
            formData.append("id", params.id as string);
            formData.append("name", data.name);
            formData.append("description", data.description || "");
            formData.append("isActive", data.isActive ? "true" : "false");
            formData.append("displayOrder", data.displayOrder?.toString() || "0");

            if (data.image instanceof File) {
                formData.append("image", data.image);
            }

            // Send the request
            const response = await fetch(`/api/menu/categories/${params.id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update category');
            }

            toast({
                title: "Success",
                description: "Category has been updated successfully",
            });

            // Redirect back to menu management
            router.push('/dashboard/management/menu?tab=categories');
        } catch (error) {
            console.error('Error updating category:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : 'Failed to update category',
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
                    <p className="text-sm text-gray-500">Loading category...</p>
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
                <h1 className="text-3xl font-bold text-[#e85c2c]">Edit Category</h1>
                <p className="text-gray-600 mt-1">Update the details for this category</p>
            </div>

            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Category Details</CardTitle>
                    <CardDescription>
                        Edit the details for this menu category. All fields marked with * are required.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Pizza" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            A short, descriptive name for the category
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
                                                placeholder="Describe this category"
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Optional description to provide more details about this category
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="displayOrder"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Display Order</FormLabel>
                                            <FormControl>
                                                <Input type="number" min="0" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Categories with lower numbers will be displayed first
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="isActive"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                            <div className="space-y-0.5">
                                                <FormLabel>Active Status</FormLabel>
                                                <FormDescription>
                                                    Toggle to activate or deactivate this category
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

                            <FormItem className="space-y-2">
                                <FormLabel>Category Image</FormLabel>
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
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isSubmitting ? 'Updating...' : 'Update Category'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
} 