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
import {
    ManagementPageLayout,
    PrimaryButton,
    LoadingSpinner
} from "@/components/ui/management-page-layout"

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
        <ManagementPageLayout
            title="Menu Management"
            description="Manage your restaurant's menu items and categories"
            headerAction={
                <PrimaryButton>Add First Menu Item</PrimaryButton>
            }
        >
            <div className="flex border-b border-gray-200 mb-6">
                <button className="py-2 px-3 border-b-2 border-[#e85c2c] text-[#e85c2c] font-medium">
                    Menu Items
                </button>
                <button className="py-2 px-3 border-b-2 border-transparent text-gray-500 hover:text-gray-800">
                    Categories
                </button>
            </div>

            <Card className="py-16">
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-gray-100 p-6 rounded-full mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">No menu items yet</h2>
                    <p className="text-gray-500 text-center max-w-md mb-8">
                        Add your first menu item to get started. You can organize items by categories and highlight featured items.
                    </p>
                    <PrimaryButton>
                        Add First Menu Item
                    </PrimaryButton>
                </div>
            </Card>
        </ManagementPageLayout>
    );
}

export default MenuManagement; 