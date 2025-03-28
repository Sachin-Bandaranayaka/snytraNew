import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { faqCategories } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import NewFAQForm from './new-faq-form';

export const metadata: Metadata = {
    title: 'Add New FAQ',
    description: 'Create a new FAQ item',
};

export default async function NewFAQPage({
    searchParams,
}: {
    searchParams?: { categoryId?: string };
}) {
    // Fetch all categories for the dropdown
    const categories = await db.select().from(faqCategories)
        .where(faqCategories.isActive, '=', true)
        .orderBy(faqCategories.title);

    // Get the pre-selected categoryId from the URL if it exists
    const preselectedCategoryId = searchParams?.categoryId
        ? parseInt(searchParams.categoryId)
        : undefined;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Add New FAQ Item</h1>
                <Link href="/admin/faq">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to FAQ Management
                    </Button>
                </Link>
            </div>

            <div className="border rounded-lg p-4">
                <NewFAQForm categories={categories} preselectedCategoryId={preselectedCategoryId} />
            </div>
        </div>
    );
} 