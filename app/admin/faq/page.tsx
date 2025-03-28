import Link from 'next/link';
import { db } from '@/lib/db';
import { faqCategories } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { PlusCircle, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

async function FAQManagementPage() {
    // Fetch all FAQ categories
    const categories = await db.select().from(faqCategories).orderBy(faqCategories.order);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">FAQ Management</h1>
                <div className="flex space-x-4">
                    <Link href="/admin/faq/categories/new">
                        <Button variant="outline" size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Category
                        </Button>
                    </Link>
                    <Link href="/admin/faq/new">
                        <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New FAQ Item
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

            {categories.length === 0 ? (
                <Card>
                    <CardContent className="py-10">
                        <div className="text-center">
                            <h3 className="text-lg font-medium">No FAQ categories found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Get started by creating a new category.
                            </p>
                            <div className="mt-6">
                                <Link href="/admin/faq/categories/new">
                                    <Button>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Create FAQ Category
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {categories.map((category) => (
                        <Card key={category.id}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle>{category.title}</CardTitle>
                                    <div className="flex space-x-2">
                                        <Link href={`/admin/faq/categories/${category.id}`}>
                                            <Button variant="outline" size="sm">
                                                Manage Category
                                            </Button>
                                        </Link>
                                        <Link href={`/admin/faq/new?categoryId=${category.id}`}>
                                            <Button size="sm">
                                                Add FAQ to This Category
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                {category.description && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {category.description}
                                    </p>
                                )}
                            </CardHeader>
                            <CardContent>
                                <Link href={`/admin/faq/categories/${category.id}`} className="text-blue-600 hover:underline text-sm">
                                    Manage questions in this category →
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FAQManagementPage; 