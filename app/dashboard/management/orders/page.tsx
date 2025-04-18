"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ShoppingCart,
    Clock,
    CreditCard,
    Calendar,
    Filter,
    Search,
    Download,
    MoreHorizontal,
    Check,
    X,
    ChevronRight,
    ChevronLeft,
    Eye,
    Printer,
    Plus,
    AlertCircle,
    ArrowRight
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import OrderForm from "./order-form"
import { ManagementPageLayout, PrimaryButton } from "@/components/ui/management-page-layout"

// Interface definitions
interface OrderItem {
    id: number
    name: string
    price: number
    quantity: number
    subtotal: number
}

interface Customer {
    id: number
    name: string
    email: string | null
    phone: string | null
    address: string | null
}

interface Order {
    id: number
    orderId: string
    status: string
    orderType: string
    subtotal: number
    tax: number
    deliveryFee: number
    total: number
    paymentMethod: string | null
    paymentStatus: string
    notes: string | null
    orderDate: string
    customer: Customer | null
    items: OrderItem[]
    totalFormatted: string
    orderDateFormatted: string
    timeFormatted: string
}

interface PaginationInfo {
    total: number
    page: number
    limit: number
    totalPages: number
}

const getStatusStyle = (status: string) => {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-800 border-green-200"
        case "in-progress":
            return "bg-blue-100 text-blue-800 border-blue-200"
        case "cancelled":
            return "bg-red-100 text-red-800 border-red-200"
        case "created":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
        default:
            return "bg-gray-100 text-gray-800 border-gray-200"
    }
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case "dine-in":
            return <Badge variant="outline" className="font-normal">Dine-in</Badge>
        case "takeaway":
            return <Badge variant="outline" className="font-normal">Takeaway</Badge>
        case "delivery":
            return <Badge variant="outline" className="font-normal">Delivery</Badge>
        default:
            return null
    }
}

export default function OrdersManagementPage() {
    const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [orders, setOrders] = useState<Order[]>([])
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
    const [pagination, setPagination] = useState<PaginationInfo>({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    })
    const [filters, setFilters] = useState({
        status: "all",
        type: "all",
        date: "today",
    })
    const [stats, setStats] = useState({
        completed: 0,
        inProgress: 0,
        created: 0,
        cancelled: 0
    })
    const [dialogOpen, setDialogOpen] = useState(false)

    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const queryParams = new URLSearchParams();

            // Add filters to query params
            if (filters.status !== 'all') queryParams.append('status', filters.status);
            if (filters.type !== 'all') queryParams.append('type', filters.type);
            if (filters.date) queryParams.append('dateRange', filters.date);

            // Add pagination
            queryParams.append('page', currentPage.toString());
            queryParams.append('limit', pagination.limit.toString());

            const response = await fetch(`/api/orders?${queryParams.toString()}`);

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            setOrders(data.orders || []);
            setFilteredOrders(data.orders || []);

            if (data.pagination) {
                setPagination(data.pagination);
            }

            // Calculate stats
            const completed = data.orders.filter(o => o.status === 'completed').length;
            const inProgress = data.orders.filter(o => o.status === 'in-progress').length;
            const created = data.orders.filter(o => o.status === 'created').length;
            const cancelled = data.orders.filter(o => o.status === 'cancelled').length;

            setStats({
                completed,
                inProgress,
                created,
                cancelled
            });

        } catch (error) {
            console.error('Error fetching orders:', error);
            toast({
                title: "Error",
                description: "Failed to load orders. Please try again later.",
                variant: "destructive"
            });

            // Use empty arrays in case of error
            setOrders([]);
            setFilteredOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [toast, currentPage, filters]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);

        if (!e.target.value.trim()) {
            setFilteredOrders(orders);
            return;
        }

        const query = e.target.value.toLowerCase();
        const filtered = orders.filter(order =>
            order.orderId.toLowerCase().includes(query) ||
            (order.customer?.name && order.customer.name.toLowerCase().includes(query)) ||
            order.items.some(item => item.name.toLowerCase().includes(query))
        );

        setFilteredOrders(filtered);
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1); // Reset to first page when changing filters
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value);

        if (value === 'all') {
            setFilters(prev => ({ ...prev, status: 'all' }));
        } else if (value === 'active') {
            setFilters(prev => ({ ...prev, status: 'created' }));
        } else if (value === 'completed') {
            setFilters(prev => ({ ...prev, status: 'completed' }));
        }

        setCurrentPage(1); // Reset to first page when changing tabs
    };

    const goToNextPage = () => {
        if (currentPage < pagination.totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleViewOrder = (orderId: string) => {
        router.push(`/dashboard/management/orders/${orderId}`);
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            toast({
                title: "Status Updated",
                description: `Order ${orderId} has been marked as ${newStatus}`,
            });

            // Refresh orders
            const updatedOrders = orders.map(order => {
                if (order.orderId === orderId) {
                    return { ...order, status: newStatus };
                }
                return order;
            });

            setOrders(updatedOrders);
            setFilteredOrders(updatedOrders);

        } catch (error) {
            console.error('Error updating order status:', error);
            toast({
                title: "Error",
                description: "Failed to update order status. Please try again.",
                variant: "destructive"
            });
        }
    };

    const handlePrintOrder = (orderId: string) => {
        toast({
            title: "Print Started",
            description: `Printing order ${orderId}`
        });
    };

    const handleNewOrderSuccess = () => {
        setDialogOpen(false);
        fetchOrders();
        toast({
            title: "Success",
            description: "New order created successfully",
        });
    };

    const getStatusBadge = (status: string) => {
        const style = getStatusStyle(status);
        let label = status.charAt(0).toUpperCase() + status.slice(1);

        // Replace hyphens with spaces and capitalize each word
        label = label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        return <Badge className={style}>{label}</Badge>;
    };

    // Function to calculate order total
    const getOrderTotal = (items: OrderItem[]) => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Function to get item list as a string
    const getItemsList = (items: OrderItem[]) => {
        return items.map(item => `${item.quantity}x ${item.name}`).join(", ");
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e85c2c]"></div>
            </div>
        );
    }

    return (
        <ManagementPageLayout
            title="Orders Management"
            description="Manage and track all customer orders"
            headerAction={
                <PrimaryButton>New Order</PrimaryButton>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-[#e85c2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Total Orders</p>
                            <p className="text-2xl font-bold">{pagination.total}</p>
                            <p className="text-xs text-gray-500">Orders across all statuses</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-[#e85c2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Pending</p>
                            <p className="text-2xl font-bold">{stats.created}</p>
                            <p className="text-xs text-gray-500">Orders waiting to be processed</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-[#e85c2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">In Progress</p>
                            <p className="text-2xl font-bold">{stats.inProgress}</p>
                            <p className="text-xs text-gray-500">Orders currently being prepared</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-[#e85c2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Completed Today</p>
                            <p className="text-2xl font-bold">{stats.completed}</p>
                            <p className="text-xs text-gray-500">Orders completed today</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card title="All Orders" className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-3">
                        <button className="py-2 border-b-2 border-[#e85c2c] text-[#e85c2c] font-medium">All Orders</button>
                        <button className="py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-800">Active</button>
                        <button className="py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-800">Completed</button>
                    </div>
                    <div>
                        <button className="text-[#e85c2c] font-medium flex items-center gap-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Search orders..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <Select
                        value={filters.status}
                        onValueChange={(value) => handleFilterChange('status', value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="created">Created</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={filters.type}
                        onValueChange={(value) => handleFilterChange('type', value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Order Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="dine-in">Dine-in</SelectItem>
                            <SelectItem value="takeaway">Takeaway</SelectItem>
                            <SelectItem value="delivery">Delivery</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={filters.date}
                        onValueChange={(value) => handleFilterChange('date', value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Date Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="yesterday">Yesterday</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                </div>

                <Tabs defaultValue="all" className="space-y-4" value={activeTab} onValueChange={handleTabChange}>
                    <TabsList>
                        <TabsTrigger value="all">All Orders</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value={activeTab} className="space-y-4">
                        <div className="bg-white shadow rounded-lg overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order) => (
                                            <TableRow key={order.orderId}>
                                                <TableCell className="font-medium">
                                                    {order.orderId}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span>{order.orderDateFormatted}</span>
                                                        <span className="text-xs text-gray-500">{order.timeFormatted}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {order.customer ? (
                                                        <div className="flex items-center">
                                                            <Avatar className="h-8 w-8 mr-2">
                                                                <AvatarFallback>
                                                                    {order.customer.name.substring(0, 2).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <span>{order.customer.name}</span>
                                                                {order.customer.phone && (
                                                                    <span className="text-xs text-gray-500">{order.customer.phone}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-500">Walk-in Customer</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="max-w-[200px] truncate">
                                                        {order.items.length > 0 ? (
                                                            <span>{getItemsList(order.items)}</span>
                                                        ) : (
                                                            <span className="text-gray-500">No items</span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {order.totalFormatted}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(order.status)}
                                                </TableCell>
                                                <TableCell>
                                                    {getTypeIcon(order.orderType)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleViewOrder(order.orderId)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handlePrintOrder(order.orderId)}
                                                        >
                                                            <Printer className="h-4 w-4" />
                                                        </Button>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                {order.status !== 'in-progress' && (
                                                                    <DropdownMenuItem onClick={() => handleStatusChange(order.orderId, 'in-progress')}>
                                                                        Mark as In Progress
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {order.status !== 'completed' && (
                                                                    <DropdownMenuItem onClick={() => handleStatusChange(order.orderId, 'completed')}>
                                                                        Mark as Completed
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {order.status !== 'cancelled' && (
                                                                    <>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem onClick={() => handleStatusChange(order.orderId, 'cancelled')}>
                                                                            Cancel Order
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={8} className="h-24 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                                                    <span className="text-gray-500">No orders found</span>
                                                    <span className="text-sm text-gray-400">Try adjusting your filters</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {pagination.totalPages > 1 && (
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Showing {filteredOrders.length} of {pagination.total} orders
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={goToPrevPage}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </Button>
                                    <div className="text-sm">
                                        Page {currentPage} of {pagination.totalPages}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={goToNextPage}
                                        disabled={currentPage === pagination.totalPages}
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </Card>
        </ManagementPageLayout>
    );
}