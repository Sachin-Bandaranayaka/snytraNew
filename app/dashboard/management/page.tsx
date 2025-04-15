"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import {
    BarChart3,
    Users,
    ShoppingBag,
    Package,
    Utensils,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Calendar,
    DollarSign,
    Check,
    ArrowRight,
    Plus
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

// Sample data - would be replaced with API calls to fetch real data
const salesData = [
    { name: "Mon", sales: 1200 },
    { name: "Tue", sales: 1800 },
    { name: "Wed", sales: 2400 },
    { name: "Thu", sales: 1500 },
    { name: "Fri", sales: 2800 },
    { name: "Sat", sales: 3200 },
    { name: "Sun", sales: 2100 },
]

const orderTypeData = [
    { name: "Dine-in", value: 45 },
    { name: "Takeaway", value: 30 },
    { name: "Delivery", value: 25 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    tableNumber: number;
    status: "waiting" | "in-progress" | "ready" | "completed";
    items: OrderItem[];
}

interface WaitingCustomer {
    id: string;
    name: string;
    partySize: number;
    waitingSince: string;
    status: "waiting";
}

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: "Pizza" | "Salad" | "Pasta" | "Dessert";
}

export default function ManagementDashboard() {
    const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [period, setPeriod] = useState("daily")
    const [stats, setStats] = useState({
        totalSales: "₹21,245",
        totalOrders: 125,
        averageOrderValue: "₹169.96",
        totalCustomers: 45,
        topSellingItems: [
            { name: "Margherita Pizza", quantity: 35, revenue: "₹4,200" },
            { name: "Fish and Chips", quantity: 28, revenue: "₹3,920" },
            { name: "Caesar Salad", quantity: 22, revenue: "₹1,980" },
            { name: "Burger", quantity: 18, revenue: "₹1,620" },
        ],
        lowStockItems: [
            { name: "Minced Beef", inStock: 10, reorderLevel: 20 },
            { name: "Broccoli", inStock: 12, reorderLevel: 15 },
            { name: "Tomatoes", inStock: 8, reorderLevel: 15 },
        ],
    })
    const [orders, setOrders] = useState<Order[]>([])
    const [waitingList, setWaitingList] = useState<WaitingCustomer[]>([])
    const [topSellerMenu, setTopSellerMenu] = useState<MenuItem[]>([])

    useEffect(() => {
        // Mock data to match the UI design
        const mockWaitingList: WaitingCustomer[] = Array(6).fill(null).map((_, i) => ({
            id: `w${i + 1}`,
            name: "John Doe",
            partySize: 4,
            waitingSince: "12:30 PM",
            status: "waiting"
        }));

        const mockOrders: Order[] = Array(8).fill(null).map((_, i) => ({
            id: "123",
            tableNumber: 5,
            status: i % 4 === 1 ? "ready" : "waiting",
            items: [
                { id: 1, name: "Burger", price: 8.99, quantity: 1 },
                { id: 2, name: "Fish and Chips", price: 28.99, quantity: 3 },
                { id: 3, name: "French Fries", price: 5.99, quantity: 2 }
            ]
        }));

        const mockTopSellerMenu: MenuItem[] = [
            {
                id: 1,
                name: "Margherita Pizza",
                description: "Classic tomato sauce, mozzarella cheese, and fresh basil.",
                price: 12.99,
                image: "/items/margherita.jpg",
                category: "Pizza"
            },
            {
                id: 2,
                name: "Macaroni",
                description: "Creamy sauce with pancetta, eggs, and Parmesan cheese.",
                price: 15.99,
                image: "/items/macaroni.jpg",
                category: "Pasta"
            },
            {
                id: 3,
                name: "New York Cheesecake",
                description: "Rich and creamy cheesecake with a graham cracker crust.",
                price: 6.99,
                image: "/items/cheesecake.jpg",
                category: "Dessert"
            },
            {
                id: 4,
                name: "Caesar Salad",
                description: "Crisp romaine lettuce, croutons, and Caesar dressing.",
                price: 8.99,
                image: "/items/caesar-salad.jpg",
                category: "Salad"
            }
        ];

        // Simulate loading delay
        setTimeout(() => {
            setWaitingList(mockWaitingList);
            setOrders(mockOrders);
            setTopSellerMenu(mockTopSellerMenu);
            setIsLoading(false);
        }, 800);
    }, [])

    // Function to handle period change
    const handlePeriodChange = (newPeriod: string) => {
        setPeriod(newPeriod)
        setIsLoading(true)

        // Simulate API call to fetch new data
        setTimeout(() => {
            // This would be replaced with actual API data
            setIsLoading(false)
        }, 500)
    }

    const getStatusBadge = (status: "waiting" | "in-progress" | "ready" | "completed") => {
        switch (status) {
            case "waiting":
                return (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        Waiting
                    </Badge>
                );
            case "ready":
                return (
                    <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Ready
                    </Badge>
                );
            default:
                return null;
        }
    }

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Pizza":
                return "🍕";
            case "Salad":
                return "🥗";
            case "Pasta":
                return "🍝";
            case "Dessert":
                return "🍰";
            default:
                return "🍴";
        }
    }

    const handleViewOrder = (orderId: string) => {
        toast({
            title: "View Order",
            description: `Viewing details for order #${orderId}`,
        });
    }

    const handleManageOrders = () => {
        router.push('/dashboard/management/orders');
    }

    const handleNewMenu = () => {
        router.push('/dashboard/management/menu');
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e85c2c]"></div>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#f7f5f1] min-h-screen">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-[#e85c2c]">Dashboard</h1>
                    <div className="flex gap-4">
                        <div className="bg-gray-800 text-white px-3 py-1 rounded-full flex items-center gap-2">
                            <span>Tax</span>
                            <div className="w-8 h-4 bg-gray-600 rounded-full relative">
                                <div className="absolute left-0 top-0 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="bg-[#e85c2c] text-white px-3 py-1 rounded-full flex items-center gap-2">
                            <span>Online Order</span>
                            <div className="w-8 h-4 bg-[#c04a21] rounded-full relative">
                                <div className="absolute right-0 top-0 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Waiting List (12)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {waitingList.map((customer, index) => (
                            <Card key={index} className="bg-white shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold">{customer.name}</p>
                                        <p className="text-sm text-gray-500">Party of {customer.partySize}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-gray-500">Since {customer.waitingSince}</span>
                                            {getStatusBadge(customer.status)}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Orders (20)</h2>
                    <Button className="bg-[#e85c2c] hover:bg-[#d24e20] text-white" onClick={handleManageOrders}>
                        Manage Orders
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {orders.map((order, index) => (
                        <Card key={index} className="bg-white shadow-sm cursor-pointer transition-all hover:shadow-md" onClick={() => handleViewOrder(order.id)}>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        {order.status === "waiting" && (
                                            <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center">
                                                <Clock className="h-3 w-3 text-yellow-800" />
                                            </div>
                                        )}
                                        {order.status === "ready" && (
                                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                                <Check className="h-3 w-3 text-green-800" />
                                            </div>
                                        )}
                                        <p className="font-semibold">Order #{order.id}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-transparent">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 4V20M20 12L4 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Button>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">• Table {order.tableNumber}</p>

                                <div className="space-y-2">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <div>
                                                <span className="mr-2">{item.quantity}x</span>
                                                <span>{item.name}</span>
                                            </div>
                                            <span>$ {item.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Top Seller Menu</h2>
                    <Button className="bg-[#e85c2c] hover:bg-[#d24e20] text-white" onClick={handleNewMenu}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Menu
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {topSellerMenu.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                            <div className="relative h-36">
                                <img
                                    src={item.image || `https://via.placeholder.com/300x150?text=${item.name}`}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x150?text=${item.name}`;
                                    }}
                                />
                                <div className="absolute top-2 left-2 bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                                    {getCategoryIcon(item.category)} {item.category}
                                </div>
                                {item.category === "Pizza" && (
                                    <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                                        Best Seller
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-3">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                <p className="text-[#e85c2c] font-semibold mt-2">$ {item.price.toFixed(2)}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
} 