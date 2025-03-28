import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import NewCategoryForm from './new-category-form';

export const metadata: Metadata = {
    title: 'Add New FAQ Category',
    description: 'Create a new FAQ category',
};

export default function NewFAQCategoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Add New FAQ Category</h1>
                <Link href="/admin/faq">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to FAQ Management
                    </Button>
                </Link>
            </div>

            <div className="border rounded-lg p-4">
                <NewCategoryForm />
            </div>
        </div>
    );
} 