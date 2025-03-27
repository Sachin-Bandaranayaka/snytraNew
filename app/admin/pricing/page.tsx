import { db } from '@/lib/db';
import { pricingPackages, userSubscriptions } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash, Tag, ChevronLeft } from 'lucide-react';

export const metadata = {
    title: 'Pricing Packages - Admin Panel',
};

async function PricingPackagesPage() {
    // Fetch all pricing packages
    const packages = await db
        .select({
            id: pricingPackages.id,
            name: pricingPackages.name,
            description: pricingPackages.description,
            price: pricingPackages.price,
            billingCycle: pricingPackages.billingCycle,
            isPopular: pricingPackages.isPopular,
            isActive: pricingPackages.isActive,
            createdAt: pricingPackages.createdAt,
        })
        .from(pricingPackages)
        .orderBy(pricingPackages.price);

    // Get subscription count for each package
    const packagesWithCounts = await Promise.all(
        packages.map(async (pkg) => {
            const subscriptions = await db
                .select({ id: userSubscriptions.id })
                .from(userSubscriptions)
                .where(eq(userSubscriptions.packageId, pkg.id))
                .where(eq(userSubscriptions.status, 'active'));

            return {
                ...pkg,
                activeSubscriptions: subscriptions.length,
                formattedPrice: (pkg.price / 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }),
                createdAt: new Date(pkg.createdAt).toLocaleDateString(),
            };
        })
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Pricing Packages</h1>
                <div className="flex space-x-4">
                    <Link href="/admin/pricing/new">
                        <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Package
                        </Button>
                    </Link>
                    <Link href="/admin">
                        <Button variant="outline" size="sm">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Billing Cycle</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Popular</TableHead>
                            <TableHead>Subscribers</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {packagesWithCounts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    No pricing packages found. Create a new package to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            packagesWithCounts.map((pkg) => (
                                <TableRow key={pkg.id}>
                                    <TableCell className="font-medium">
                                        <div>
                                            <div>{pkg.name}</div>
                                            {pkg.description && (
                                                <div className="text-xs text-gray-500 mt-1">{pkg.description}</div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>{pkg.formattedPrice}</TableCell>
                                    <TableCell>
                                        <span className="capitalize">{pkg.billingCycle}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs ${pkg.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {pkg.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {pkg.isPopular ? (
                                            <Tag className="h-4 w-4 text-yellow-500" />
                                        ) : null}
                                    </TableCell>
                                    <TableCell>
                                        {pkg.activeSubscriptions}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Link href={`/admin/pricing/${pkg.id}/edit`}>
                                                <Button variant="outline" size="icon" className="h-8 w-8">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/pricing/${pkg.id}/delete`}>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500"
                                                    disabled={pkg.activeSubscriptions > 0}
                                                    title={pkg.activeSubscriptions > 0 ? "Cannot delete package with active subscriptions" : "Delete package"}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default PricingPackagesPage; 