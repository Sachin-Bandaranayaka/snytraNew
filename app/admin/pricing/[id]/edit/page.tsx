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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Package name is required' }),
    description: z.string().optional(),
    price: z.coerce.number().min(0, { message: 'Price must be a positive number' }),
    billingCycle: z.enum(['monthly', 'annually']),
    features: z.string().min(1, { message: 'Features are required' }),
    isPopular: z.boolean().default(false),
    isActive: z.boolean().default(true),
});

interface EditPricingPackagePageProps {
    params: {
        id: string;
    };
}

export default function EditPricingPackagePage({ params }: EditPricingPackagePageProps) {
    const packageId = params.id;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPackage, setIsLoadingPackage] = useState(true);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            billingCycle: 'monthly',
            features: '',
            isPopular: false,
            isActive: true,
        },
    });

    // Fetch the package data
    useEffect(() => {
        const fetchPackageData = async () => {
            try {
                setIsLoadingPackage(true);
                const response = await fetch(`/api/pricing/packages/${packageId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch pricing package');
                }

                const packageData = await response.json();

                // Set the form values with the fetched data
                form.setValue('name', packageData.name);
                form.setValue('description', packageData.description || '');
                form.setValue('price', packageData.price / 100); // Convert cents to dollars
                form.setValue('billingCycle', packageData.billingCycle);
                form.setValue('features', packageData.features || '');
                form.setValue('isPopular', packageData.isPopular);
                form.setValue('isActive', packageData.isActive);
            } catch (error) {
                console.error('Error fetching package data:', error);
                toast.error('Failed to load package data');
            } finally {
                setIsLoadingPackage(false);
            }
        };

        fetchPackageData();
    }, [packageId, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            // Convert price to cents for storage
            const data = {
                ...values,
                price: Math.round(values.price * 100), // Convert to cents
            };

            const response = await fetch(`/api/pricing/packages/${packageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to update pricing package');
            }

            toast.success('Pricing package updated successfully');
            router.push('/admin/pricing');
            router.refresh();
        } catch (error) {
            console.error('Error updating pricing package:', error);
            toast.error('Failed to update pricing package');
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoadingPackage) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Edit Pricing Package</h1>
                <div className="rounded-md border p-6 text-center">
                    Loading package data...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Edit Pricing Package</h1>
                <Link href="/admin/pricing">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Packages
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
                                    <FormLabel>Package Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Basic, Pro, Enterprise, etc." {...field} />
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
                                            placeholder="Brief description of the package (optional)"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        A short description of what's included in this package
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price (USD)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                placeholder="29.99"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the price in dollars (e.g., 29.99)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="billingCycle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Billing Cycle</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select billing cycle" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                <SelectItem value="annually">Annually</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            How often customers will be billed
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="features"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Features</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter one feature per line"
                                            className="min-h-[150px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        List the features included in this package (one per line)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="isPopular"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Popular Package
                                            </FormLabel>
                                            <FormDescription>
                                                Mark this package as popular (will be highlighted on the pricing page)
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
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Active
                                            </FormLabel>
                                            <FormDescription>
                                                Enable this package to be visible on the pricing page
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

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Updating...' : 'Update Package'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
} 