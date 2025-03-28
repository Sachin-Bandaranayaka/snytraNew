import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { faqCategories, faqItems } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { PlusCircle, ChevronLeft, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { eq } from 'drizzle-orm';

async function ManageFAQCategoryPage({ params }: { params: { id: string } }) {
    const categoryId = parseInt(params.id);

    if (isNaN(categoryId)) {
        notFound();
    }

    // Fetch the category
    const categoryResult = await db
        .select()
        .from(faqCategories)
        .where(eq(faqCategories.id, categoryId))
        .limit(1);

    const category = categoryResult[0];

    if (!category) {
        notFound();
    }

    // Fetch all FAQ items in this category
    const items = await db.select().from(faqItems)
        .where(eq(faqItems.categoryId, categoryId))
        .orderBy(faqItems.order);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{category.title}</h1>
                    <p className="text-gray-500 mt-1">
                        {category.description || "No description provided"}
                    </p>
                </div>
                <div className="flex space-x-4">
                    <Link href={`/admin/faq/new?categoryId=${category.id}`}>
                        <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add FAQ Item
                        </Button>
                    </Link>
                    <Link href={`/admin/faq/categories/${category.id}/edit`}>
                        <Button variant="outline" size="sm">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Category
                        </Button>
                    </Link>
                    <Link href="/admin/faq">
                        <Button variant="outline" size="sm">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to FAQ Management
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex space-x-2 items-center">
                <Badge variant={category.isActive ? "success" : "destructive"}>
                    {category.isActive ? "Active" : "Inactive"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                    Display Order: {category.order}
                </span>
            </div>

            <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">FAQ Items ({items.length})</h2>

                {items.length === 0 ? (
                    <Card>
                        <CardContent className="py-10">
                            <div className="text-center">
                                <h3 className="text-lg font-medium">No FAQ items found in this category</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Get started by adding new questions and answers.
                                </p>
                                <div className="mt-6">
                                    <Link href={`/admin/faq/new?categoryId=${category.id}`}>
                                        <Button>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Add FAQ Item
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {items.map((item) => (
                            <Card key={item.id}>
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg">{item.question}</CardTitle>
                                        <div className="flex space-x-2">
                                            <Link href={`/admin/faq/${item.id}/edit`}>
                                                <Button variant="ghost" size="sm">
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/faq/${item.id}/delete`}>
                                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose prose-sm max-w-none">
                                        <p>{item.answer}</p>
                                    </div>
                                    <div className="flex space-x-2 mt-4">
                                        <Badge variant={item.isActive ? "success" : "destructive"} className="text-xs">
                                            {item.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                            Order: {item.order}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageFAQCategoryPage; 