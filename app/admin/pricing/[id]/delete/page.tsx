"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeletePricingPackagePageProps {
    params: {
        id: string;
    };
}

export default function DeletePricingPackagePage({ params }: DeletePricingPackagePageProps) {
    const packageId = params.id;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [package_, setPackage] = useState<any>(null);
    const [subscriptionsCount, setSubscriptionsCount] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    // Fetch package data and check if it has subscriptions
    useEffect(() => {
        const fetchPackageData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/pricing/packages/${packageId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch pricing package');
                }

                const packageData = await response.json();
                setPackage(packageData);

                // Check for active subscriptions (would be implemented in a full app)
                const subscriptionsResponse = await fetch(`/api/pricing/packages/${packageId}/subscriptions`).catch(() => {
                    // If endpoint doesn't exist yet, just show 0 subscriptions for demo
                    return new Response(JSON.stringify({ count: 0 }), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    });
                });

                if (subscriptionsResponse.ok) {
                    const subscriptionsData = await subscriptionsResponse.json();
                    setSubscriptionsCount(subscriptionsData.count || 0);
                }
            } catch (error) {
                console.error('Error fetching package data:', error);
                toast.error('Failed to load package data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackageData();
    }, [packageId]);

    // Handle package deletion
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await fetch(`/api/pricing/packages/${packageId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete pricing package');
            }

            toast.success('Pricing package deleted successfully');
            router.push('/admin/pricing');
            router.refresh();
        } catch (error) {
            console.error('Error deleting pricing package:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to delete pricing package');
        } finally {
            setIsDeleting(false);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        setIsOpen(false);
        router.push('/admin/pricing');
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Delete Pricing Package</h1>
                <div className="rounded-md border p-6 text-center">
                    Loading package data...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Delete Pricing Package</h1>
                <Link href="/admin/pricing">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Packages
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border p-6">
                {package_ ? (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            Are you sure you want to delete this pricing package?
                        </h2>
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">Package Name:</span> {package_.name}
                            </p>
                            <p>
                                <span className="font-semibold">Price:</span>{' '}
                                {(package_.price / 100).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}{' '}
                                / {package_.billingCycle}
                            </p>
                            {package_.description && (
                                <p>
                                    <span className="font-semibold">Description:</span> {package_.description}
                                </p>
                            )}
                            <p>
                                <span className="font-semibold">Status:</span>{' '}
                                <span className={`${package_.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                                    {package_.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </p>
                            <p>
                                <span className="font-semibold">Popular:</span>{' '}
                                {package_.isPopular ? 'Yes' : 'No'}
                            </p>
                            <p>
                                <span className="font-semibold">Active Subscriptions:</span> {subscriptionsCount}
                            </p>
                        </div>

                        {subscriptionsCount > 0 ? (
                            <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200 text-yellow-800">
                                <p className="font-medium">Cannot delete this package</p>
                                <p className="mt-1">
                                    This package has {subscriptionsCount} active {subscriptionsCount === 1 ? 'subscription' : 'subscriptions'}.
                                    You must cancel or move these subscriptions before deleting this package.
                                </p>
                            </div>
                        ) : (
                            <div className="pt-4 flex space-x-4">
                                <Button
                                    variant="destructive"
                                    onClick={() => setIsOpen(true)}
                                    disabled={isDeleting || subscriptionsCount > 0}
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete Package'}
                                </Button>
                                <Link href="/admin/pricing">
                                    <Button variant="outline">Cancel</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p>Pricing package not found or could not be loaded.</p>
                        <div className="mt-4">
                            <Link href="/admin/pricing">
                                <Button>Return to Packages</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <AlertDialog open={isOpen && !!package_ && subscriptionsCount === 0} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the pricing package "{package_?.name}" and remove its data from the server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
} 