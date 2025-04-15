"use client";

import { useState, useEffect } from "react";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
    Package,
    Plus,
    Search,
    Filter,
    RefreshCcw,
    AlertCircle
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import InventoryForm from "./inventory-form";

interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    quantity: number;
    unit: string;
    costPerUnit: number;
    costPerUnitFormatted: string;
    category: string;
    stockStatus: string;
    imageUrl?: string;
    supplier?: string;
    description?: string;
}

// Mock inventory data to use as fallback
const MOCK_INVENTORY: InventoryItem[] = [
    {
        id: "1",
        name: "Coffee Beans",
        sku: "CB-001",
        quantity: 25,
        unit: "kg",
        costPerUnit: 1500,
        costPerUnitFormatted: "$15.00",
        category: "Beverages",
        stockStatus: "in",
        supplier: "Bean Suppliers Inc.",
        imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "2",
        name: "Milk",
        sku: "ML-002",
        quantity: 5,
        unit: "l",
        costPerUnit: 250,
        costPerUnitFormatted: "$2.50",
        category: "Dairy",
        stockStatus: "low",
        supplier: "Local Dairy Farms"
    },
    {
        id: "3",
        name: "Sugar",
        sku: "SG-003",
        quantity: 0,
        unit: "kg",
        costPerUnit: 100,
        costPerUnitFormatted: "$1.00",
        category: "Dry Goods",
        stockStatus: "out",
        supplier: "Sweet Supplies Co."
    },
    {
        id: "4",
        name: "Napkins",
        sku: "NP-004",
        quantity: 500,
        unit: "pcs",
        costPerUnit: 5,
        costPerUnitFormatted: "$0.05",
        category: "Supplies",
        stockStatus: "in",
        supplier: "Paper Products Ltd."
    }
];

export default function InventoryPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [loading, setLoading] = useState(true);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [stats, setStats] = useState({ total: 0, lowStock: 0, outOfStock: 0 });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [usingMockData, setUsingMockData] = useState(false);
    const { toast } = useToast();

    // Fetch inventory data from API
    const fetchInventory = async () => {
        try {
            setLoading(true);
            setError(null);
            setUsingMockData(false);

            const response = await fetch('/api/inventory', {
                // Set a reasonable timeout
                signal: AbortSignal.timeout(5000)
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch inventory data: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setInventory(data.items || []);

            // Set statistics
            if (data.stats) {
                setStats({
                    total: data.stats.total || 0,
                    lowStock: data.stats.lowStock || 0,
                    outOfStock: data.stats.outOfStock || 0
                });
            }
        } catch (error) {
            console.error('Error fetching inventory:', error);

            // Fall back to mock data
            setUsingMockData(true);
            setInventory(MOCK_INVENTORY);

            // Calculate mock stats
            const mockTotal = MOCK_INVENTORY.length;
            const mockLowStock = MOCK_INVENTORY.filter(item => item.stockStatus === "low").length;
            const mockOutOfStock = MOCK_INVENTORY.filter(item => item.stockStatus === "out").length;

            setStats({
                total: mockTotal,
                lowStock: mockLowStock,
                outOfStock: mockOutOfStock
            });

            // Set the error message
            setError(error instanceof Error ? error.message : 'Unknown error fetching inventory data');

            toast({
                title: "Using demo data",
                description: "Could not connect to the server. Showing sample inventory data instead.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, [toast]);

    const filteredInventory = inventory.filter((item) => {
        // Filter by tab
        if (activeTab === "low" && item.stockStatus !== "low") return false;
        if (activeTab === "out" && item.stockStatus !== "out") return false;

        // Filter by search query
        if (searchQuery) {
            return (
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.sku && item.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.supplier && item.supplier.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        return true;
    });

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const getBadgeStyle = (status: string) => {
        switch (status) {
            case "in":
                return "bg-green-100 text-green-800";
            case "low":
                return "bg-yellow-100 text-yellow-800";
            case "out":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStockStatusLabel = (status: string) => {
        switch (status) {
            case "in":
                return "In Stock";
            case "low":
                return "Low Stock";
            case "out":
                return "Out of Stock";
            default:
                return "Unknown";
        }
    };

    const handleOrderStock = async (id: string) => {
        if (usingMockData) {
            toast({
                title: "Demo Mode",
                description: "Order stock functionality is disabled in demo mode.",
                variant: "destructive"
            });
            return;
        }

        toast({
            title: "Order placed",
            description: `Restocking order placed for item #${id}`,
        });
    };

    const handleNewItemSuccess = () => {
        setDialogOpen(false);
        fetchInventory();
        toast({
            title: "Success",
            description: "New inventory item added successfully",
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e85c2c]"></div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-[#e85c2c]">Inventory Management</h1>
                    <div className="flex gap-2">
                        {usingMockData && (
                            <Button
                                variant="outline"
                                className="bg-white flex items-center gap-1"
                                onClick={fetchInventory}
                            >
                                <RefreshCcw className="h-4 w-4" />
                                Reconnect
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            className="bg-white"
                            disabled={usingMockData}
                        >
                            Update Stock
                        </Button>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-[#e85c2c] hover:bg-[#d24e20] text-white"
                                    disabled={usingMockData}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Stock
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Add New Inventory Item</DialogTitle>
                                    <DialogDescription>
                                        Fill out the form below to add a new item to inventory.
                                    </DialogDescription>
                                </DialogHeader>
                                <InventoryForm onSuccess={handleNewItemSuccess} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {usingMockData && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-center">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                        <div>
                            <p className="text-sm font-medium text-yellow-800">Demo Mode: Using sample data</p>
                            <p className="text-xs text-yellow-700 mt-0.5">
                                {error || "Could not connect to the server. Functionality is limited."}
                            </p>
                        </div>
                    </div>
                )}

                <div>
                    <h2 className="text-xl font-semibold mb-2">Stock Items</h2>
                    <p className="text-muted-foreground text-sm mb-4">View the current stocks levels of items</p>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Search inventory..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                </div>

                <div className="flex border-b mb-4">
                    <button
                        className={`px-4 py-2 ${activeTab === "all" ? "border-b-2 border-[#e85c2c] text-[#e85c2c] font-medium" : "text-gray-600"}`}
                        onClick={() => handleTabChange("all")}
                    >
                        All Items ({stats.total})
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === "low" ? "border-b-2 border-[#e85c2c] text-[#e85c2c] font-medium" : "text-gray-600"}`}
                        onClick={() => handleTabChange("low")}
                    >
                        Low Stock ({stats.lowStock})
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === "out" ? "border-b-2 border-[#e85c2c] text-[#e85c2c] font-medium" : "text-gray-600"}`}
                        onClick={() => handleTabChange("out")}
                    >
                        Out of Stock ({stats.outOfStock})
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {filteredInventory.map((item) => (
                        <Card key={item.id} className="overflow-hidden border border-gray-200">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3">
                                    <img
                                        src={item.imageUrl || `/items/${(item.sku || '').toLowerCase()}.jpg`}
                                        alt={item.name}
                                        className="w-full h-[80px] object-cover rounded-md"
                                        onError={(e) => {
                                            // Fallback to a placeholder if image doesn't load
                                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                                        }}
                                    />
                                </div>
                                <div className="p-3 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-base font-semibold">{item.name}</h3>
                                            <Badge className={getBadgeStyle(item.stockStatus)}>
                                                {getStockStatusLabel(item.stockStatus)}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600">{item.quantity} {item.unit || 'units'}</p>
                                        {item.costPerUnitFormatted && (
                                            <p className="text-xs text-gray-500">{item.costPerUnitFormatted} per {item.unit || 'unit'}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 pt-0">
                                <Button
                                    variant="default"
                                    className="w-full bg-[#e85c2c] hover:bg-[#d24e20] text-white"
                                    onClick={() => handleOrderStock(item.id)}
                                    disabled={item.stockStatus === "in" || usingMockData}
                                >
                                    Order Stock
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredInventory.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg">
                        <Package className="h-16 w-16 text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No inventory items found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
} 