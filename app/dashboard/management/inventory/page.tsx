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
import {
    ManagementPageLayout,
    PrimaryButton,
    SecondaryButton,
    LoadingSpinner
} from "@/components/ui/management-page-layout"

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

export default function InventoryManagementPage() {
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
        <ManagementPageLayout
            title="Inventory Management"
            description="View the current stocks levels of items"
            headerAction={
                <PrimaryButton>Add New Item</PrimaryButton>
            }
        >
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex items-start gap-3">
                <div className="text-yellow-500 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div>
                    <p className="font-medium text-yellow-800">Demo mode: Using sample data</p>
                    <p className="text-yellow-700 text-sm">Signal timed out</p>
                </div>
            </div>

            <Card title="Stock Items" className="mb-6">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className="relative w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                            />
                        </div>
                        <button className="flex items-center gap-2 text-gray-600 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filter
                        </button>
                    </div>

                    <div className="border-b border-gray-200">
                        <div className="flex gap-6">
                            <button className="py-2 px-3 border-b-2 border-[#e85c2c] text-[#e85c2c] font-medium">
                                All Items ({stats.total})
                            </button>
                            <button className="py-2 px-3 border-b-2 border-transparent text-gray-500 hover:text-gray-800">
                                Low Stock ({stats.lowStock})
                            </button>
                            <button className="py-2 px-3 border-b-2 border-transparent text-gray-500 hover:text-gray-800">
                                Out of Stock ({stats.outOfStock})
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                        {filteredInventory.map((item) => (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <span className="text-gray-500">{item.quantity} {item.unit || 'units'}</span>
                                            {item.costPerUnitFormatted && (
                                                <span className="text-gray-500">{item.costPerUnitFormatted} per {item.unit || 'unit'}</span>
                                            )}
                                        </div>
                                        <Badge variant={getBadgeStyle(item.stockStatus)}>
                                            {getStockStatusLabel(item.stockStatus)}
                                        </Badge>
                                    </div>
                                    <img
                                        src={item.imageUrl || `/items/${(item.sku || '').toLowerCase()}.jpg`}
                                        alt={item.name}
                                        className="w-full h-36 object-cover rounded-md mb-4"
                                        onError={(e) => {
                                            // Fallback to a placeholder if image doesn't load
                                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                                        }}
                                    />
                                    <PrimaryButton className="w-full" onClick={() => handleOrderStock(item.id)} disabled={item.stockStatus === "in" || usingMockData}>
                                        Order Stock
                                    </PrimaryButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </ManagementPageLayout>
    );
} 