"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Loader2, AlertCircle } from "lucide-react";

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

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

function MenuManagement() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        total: 0,
        page: 1,
        limit: 50,
        totalPages: 0
    });
    const { toast } = useToast();

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
                        priceFormatted: "$12.99",
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
                        priceFormatted: "$8.99",
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

    // Initial data fetch
    useEffect(() => {
        fetchMenuItems();
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
        // This would open a modal or navigate to a form page
        toast({
            title: "Add New Menu",
            description: "Feature coming soon!",
        });
    };

    const handleAddCategory = () => {
        // This would open a modal or navigate to a form page
        toast({
            title: "Add New Category",
            description: "Feature coming soon!",
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-[#e85c2c]" />
                    <p className="text-sm text-gray-500">Loading menu items...</p>
                </div>
            </div>
        );
    }

    if (error && menuItems.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center gap-2 max-w-md text-center">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    <h3 className="text-xl font-semibold">Failed to load menu items</h3>
                    <p className="text-sm text-gray-500">{error}</p>
                    <Button
                        variant="outline"
                        onClick={() => fetchMenuItems()}
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
                            Add Category
                        </Button>
                        <Button className="bg-[#e85c2c] hover:bg-[#d24e20] text-white" onClick={handleAddNewMenu}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Menu
                        </Button>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Menus ({pagination.total})</h2>
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
                                        <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                                        <div className="mt-auto">
                                            <p className="text-[#e85c2c] font-semibold">{item.priceFormatted || `$${item.price.toFixed(2)}`}</p>
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
            </div>
        </div>
    );
}

export default MenuManagement; 