"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Loader2, AlertCircle, Trash2, Edit, MoreHorizontal, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    priceFormatted?: string;
    image: string;
    category: string;
    categoryId: number;
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
    isFeatured?: boolean;
    displayOrder?: number;
}

interface Category {
    id: number;
    name: string;
    description?: string;
    displayOrder?: number;
    isActive?: boolean;
    createdAt?: string;
    imageUrl?: string;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

function MenuManagement() {
    const [loading, setLoading] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        total: 0,
        page: 1,
        limit: 50,
        totalPages: 0
    });
    const [categoryPagination, setCategoryPagination] = useState<Pagination>({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    });
    const [activeTab, setActiveTab] = useState("items");
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean, type: 'item' | 'category', id: number | null, name: string }>({
        open: false,
        type: 'item',
        id: null,
        name: ''
    });
    const [deleting, setDeleting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    // Function to fetch menu items from API
    const fetchMenuItems = async (page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/menu?page=${page}&limit=50`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch menu items');
            }

            const data = await response.json();
            setMenuItems(data.items || []);
            setPagination(data.pagination || {
                total: 0,
                page: 1,
                limit: 50,
                totalPages: 0
            });
        } catch (err) {
            console.error('Error fetching menu items:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');

            // Show error toast
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : 'Failed to load menu items',
                variant: "destructive",
            });

            // Fall back to mock data in development environment
            if (process.env.NODE_ENV === 'development') {
                setMenuItems([
                    {
                        id: 1,
                        name: "Margherita Pizza",
                        description: "Classic tomato sauce, mozzarella cheese, and fresh basil.",
                        price: 12.99,
                        priceFormatted: "₹12.99",
                        image: "/items/margherita.jpg",
                        category: "Pizza",
                        categoryId: 1,
                        isFeatured: true
                    },
                    {
                        id: 2,
                        name: "Caesar Salad",
                        description: "Crisp romaine lettuce, croutons, and Caesar dressing.",
                        price: 8.99,
                        priceFormatted: "₹8.99",
                        image: "/items/caesar-salad.jpg",
                        category: "Salad",
                        categoryId: 2
                    }
                ]);

                toast({
                    title: "Development Mode",
                    description: "Using mock data since API request failed",
                    variant: "default",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch categories
    const fetchCategories = async (page = 1) => {
        setLoadingCategories(true);

        try {
            const response = await fetch(`/api/menu/categories?page=${page}&limit=10`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch categories');
            }

            const data = await response.json();
            setCategories(data.categories || []);
            setCategoryPagination(data.pagination || {
                total: 0,
                page: 1,
                limit: 10,
                totalPages: 0
            });
        } catch (err) {
            console.error('Error fetching categories:', err);

            // Show error toast
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : 'Failed to load categories',
                variant: "destructive",
            });

            // Fall back to mock data in development environment
            if (process.env.NODE_ENV === 'development') {
                setCategories([
                    {
                        id: 1,
                        name: "Pizza",
                        description: "Italian dish with a round, flattened base of dough topped with various ingredients",
                        displayOrder: 1,
                        isActive: true
                    },
                    {
                        id: 2,
                        name: "Salad",
                        description: "Mix of fresh vegetables, often with dressing",
                        displayOrder: 2,
                        isActive: true
                    },
                    {
                        id: 3,
                        name: "Pasta",
                        description: "Italian food typically made from wheat flour and shaped into various forms",
                        displayOrder: 3,
                        isActive: true
                    }
                ]);
            }
        } finally {
            setLoadingCategories(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchMenuItems();
        fetchCategories();
    }, []);

    const getCategoryIcon = (category: string) => {
        switch (category?.toLowerCase()) {
            case "pizza":
                return "🍕";
            case "salad":
                return "🥗";
            case "pasta":
                return "🍝";
            case "dessert":
                return "🍰";
            default:
                return "🍴";
        }
    };

    const handleAddNewMenu = () => {
        // Navigate to menu item creation page
        router.push('/dashboard/management/menu/new');
    };

    const handleAddCategory = () => {
        // Navigate to category creation page
        router.push('/dashboard/management/menu/categories/new');
    };

    const handleEditMenuItem = (id: number) => {
        router.push(`/dashboard/management/menu/edit/${id}`);
    };

    const handleEditCategory = (id: number) => {
        router.push(`/dashboard/management/menu/categories/edit/${id}`);
    };

    const openDeleteDialog = (type: 'item' | 'category', id: number, name: string) => {
        setDeleteDialog({
            open: true,
            type,
            id,
            name
        });
    };

    const handleDelete = async () => {
        if (!deleteDialog.id) return;

        setDeleting(true);

        try {
            const endpoint = deleteDialog.type === 'item'
                ? `/api/menu?id=${deleteDialog.id}`
                : `/api/menu/categories?id=${deleteDialog.id}`;

            const response = await fetch(endpoint, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to delete ${deleteDialog.type}`);
            }

            // Remove item from state
            if (deleteDialog.type === 'item') {
                setMenuItems(prev => prev.filter(item => item.id !== deleteDialog.id));
            } else {
                setCategories(prev => prev.filter(cat => cat.id !== deleteDialog.id));
            }

            toast({
                title: "Success",
                description: `${deleteDialog.type === 'item' ? 'Menu item' : 'Category'} deleted successfully`,
            });

            // Close dialog
            setDeleteDialog({ open: false, type: 'item', id: null, name: '' });

            // Refresh data
            if (deleteDialog.type === 'item') {
                fetchMenuItems();
            } else {
                fetchCategories();
            }
        } catch (error) {
            console.error(`Error deleting ${deleteDialog.type}:`, error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : `Failed to delete ${deleteDialog.type}`,
                variant: "destructive",
            });
        } finally {
            setDeleting(false);
        }
    };

    const getItemCount = (categoryId: number) => {
        return menuItems.filter(item => item.categoryId === categoryId).length;
    };

    if (loading && loadingCategories) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-[#e85c2c]" />
                    <p className="text-sm text-gray-500">Loading menu data...</p>
                </div>
            </div>
        );
    }

    if (error && menuItems.length === 0 && categories.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center gap-2 max-w-md text-center">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    <h3 className="text-xl font-semibold">Failed to load menu data</h3>
                    <p className="text-sm text-gray-500">{error}</p>
                    <Button
                        variant="outline"
                        onClick={() => {
                            fetchMenuItems();
                            fetchCategories();
                        }}
                        className="mt-2"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#f7f5f1] min-h-screen">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-[#e85c2c]">Menu Management</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" className="bg-white" onClick={handleAddCategory}>
                            <Tag className="mr-2 h-4 w-4" />
                            Add Category
                        </Button>
                        <Button className="bg-[#e85c2c] hover:bg-[#d24e20] text-white" onClick={handleAddNewMenu}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Menu Item
                        </Button>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                    <TabsList className="mb-4">
                        <TabsTrigger value="items">Menu Items</TabsTrigger>
                        <TabsTrigger value="categories">Categories</TabsTrigger>
                    </TabsList>

                    <TabsContent value="items">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Menu Items ({pagination.total})</h2>
                        </div>

                        {menuItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg">
                                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <Plus className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700">No menu items yet</h3>
                                <p className="text-gray-500 mt-2 text-center max-w-md">
                                    Add your first menu item to get started. You can organize items by categories and highlight featured items.
                                </p>
                                <Button
                                    className="mt-4 bg-[#e85c2c] hover:bg-[#d24e20] text-white"
                                    onClick={handleAddNewMenu}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add First Menu Item
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {menuItems.map((item) => (
                                    <Card key={item.id} className="overflow-hidden border border-gray-200 bg-white">
                                        <div className="relative">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="absolute right-2 top-2 h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEditMenuItem(item.id)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => openDeleteDialog('item', item.id, item.name)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="flex h-full">
                                            <div className="p-3 w-1/3">
                                                <img
                                                    src={item.image || `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover rounded-md"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`;
                                                    }}
                                                />
                                            </div>
                                            <div className="p-3 flex-1 flex flex-col">
                                                <h3 className="font-semibold text-base">{item.name}</h3>
                                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                                                <div className="mt-auto">
                                                    <p className="text-[#e85c2c] font-semibold">{item.priceFormatted || `₹${item.price.toFixed(2)}`}</p>
                                                    <div className="flex gap-2 mt-2 items-center flex-wrap">
                                                        <Badge variant="outline" className="bg-gray-100 text-gray-800 px-2 py-0.5 text-xs">
                                                            {getCategoryIcon(item.category)} {item.category}
                                                        </Badge>
                                                        {item.isFeatured && (
                                                            <Badge className="bg-red-100 text-red-800 px-2 py-0.5 text-xs">
                                                                Best Seller
                                                            </Badge>
                                                        )}
                                                        {item.isVegetarian && (
                                                            <Badge variant="outline" className="bg-green-100 text-green-800 px-2 py-0.5 text-xs">
                                                                Vegetarian
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center mt-6">
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => fetchMenuItems(pagination.page - 1)}
                                        disabled={pagination.page === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => fetchMenuItems(pagination.page + 1)}
                                        disabled={pagination.page === pagination.totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="categories">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Categories ({categoryPagination.total})</h2>
                        </div>

                        {categories.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg">
                                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <Tag className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700">No categories yet</h3>
                                <p className="text-gray-500 mt-2 text-center max-w-md">
                                    Add categories to organize your menu items. Categories make it easier for customers to browse your menu.
                                </p>
                                <Button
                                    className="mt-4 bg-[#e85c2c] hover:bg-[#d24e20] text-white"
                                    onClick={handleAddCategory}
                                >
                                    <Tag className="mr-2 h-4 w-4" />
                                    Add First Category
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {categories.map((category) => (
                                    <Card key={category.id} className="overflow-hidden border border-gray-200 bg-white">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-lg">{category.name}</CardTitle>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleEditCategory(category.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => openDeleteDialog('category', category.id, category.name)}
                                                            disabled={getItemCount(category.id) > 0}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description || 'No description'}</p>
                                            <div className="flex justify-between items-center">
                                                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                                                    {getItemCount(category.id)} items
                                                </Badge>
                                                {!category.isActive && (
                                                    <Badge variant="outline" className="bg-red-100 text-red-800">
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {categoryPagination.totalPages > 1 && (
                            <div className="flex justify-center mt-6">
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => fetchCategories(categoryPagination.page - 1)}
                                        disabled={categoryPagination.page === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => fetchCategories(categoryPagination.page + 1)}
                                        disabled={categoryPagination.page === categoryPagination.totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialog.open} onOpenChange={(open) => {
                if (!open) setDeleteDialog({ ...deleteDialog, open: false });
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This will permanently delete the {deleteDialog.type === 'item' ? 'menu item' : 'category'} "{deleteDialog.name}".
                            {deleteDialog.type === 'category' && " All menu items in this category will also need to be reassigned or deleted."}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialog({ ...deleteDialog, open: false })}
                            disabled={deleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {deleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MenuManagement; 