"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import {
    ArrowLeft,
    ShoppingCart,
    Clock,
    Check,
    X,
    User,
    Calendar,
    Phone,
    Home,
    CreditCard,
    Utensils,
    Printer,
    Share2,
    MoreHorizontal,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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

interface TimelineEvent {
    id: number
    status: string
    timestamp: string
    notes: string | null
    userId: number | null
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
    transactionId: string | null
    notes: string | null
    orderDate: string
    customer: Customer | null
    items: OrderItem[]
    timeline: TimelineEvent[]
    subtotalFormatted: string
    taxFormatted: string
    deliveryFeeFormatted: string
    totalFormatted: string
    orderDateFormatted: string
    timeFormatted: string
}

const getStatusStyle = (status: string) => {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-800"
        case "in-progress":
            return "bg-blue-100 text-blue-800"
        case "cancelled":
            return "bg-red-100 text-red-800"
        case "created":
            return "bg-yellow-100 text-yellow-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "completed":
            return <Check className="h-4 w-4" />
        case "in-progress":
            return <Clock className="h-4 w-4" />
        case "cancelled":
            return <X className="h-4 w-4" />
        case "created":
            return <ShoppingCart className="h-4 w-4" />
        default:
            return null
    }
}

export default function OrderDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [order, setOrder] = useState<Order | null>(null)
    const [currentStatus, setCurrentStatus] = useState<string>("")

    // Fetch order details
    useEffect(() => {
        const fetchOrderDetails = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`/api/orders/${params.id}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch order details')
                }

                const orderData = await response.json()
                setOrder(orderData)
                setCurrentStatus(orderData.status)
            } catch (error) {
                console.error('Error fetching order details:', error)
                toast({
                    title: "Error",
                    description: "Failed to load order details. Please try again.",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        if (params.id) {
            fetchOrderDetails()
        }
    }, [params.id, toast])

    const handleStatusChange = async (newStatus: string) => {
        if (!order) return

        try {
            const response = await fetch(`/api/orders/${order.orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus
                })
            })

            if (!response.ok) {
                throw new Error('Failed to update order status')
            }

            setCurrentStatus(newStatus)

            toast({
                title: "Order status updated",
                description: `Order ${order.orderId} marked as ${newStatus}`,
            })

            // Refresh order data to get updated timeline
            const updatedOrderResponse = await fetch(`/api/orders/${order.orderId}`)
            const updatedOrderData = await updatedOrderResponse.json()
            setOrder(updatedOrderData)
        } catch (error) {
            console.error('Error updating order status:', error)
            toast({
                title: "Error",
                description: "Failed to update order status. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handlePrint = () => {
        window.print()
    }

    const handleBackClick = () => {
        router.back()
    }

    if (isLoading) {
        return (
            <div className="flex flex-col p-6 h-full">
                <div className="flex items-center gap-2 mb-6">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleBackClick}
                        className="h-8 w-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">Order Details</h1>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2 animate-pulse">
                        <CardHeader className="h-20 bg-gray-200 rounded-t-lg" />
                        <CardContent className="p-6">
                            <div className="h-60 bg-gray-200 rounded" />
                        </CardContent>
                    </Card>
                    <Card className="animate-pulse">
                        <CardHeader className="h-20 bg-gray-200 rounded-t-lg" />
                        <CardContent className="p-6">
                            <div className="h-80 bg-gray-200 rounded" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="flex flex-col p-6 h-full">
                <div className="flex items-center gap-2 mb-6">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleBackClick}
                        className="h-8 w-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">Order Not Found</h1>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <p>The order you're looking for doesn't exist or you don't have permission to view it.</p>
                        <Button className="mt-4" onClick={handleBackClick}>
                            Go Back to Orders
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Format timestamp for timeline
    const formatTimelineDate = (timestamp: string) => {
        const date = new Date(timestamp)
        return {
            date: date.toISOString().split('T')[0],
            time: date.toTimeString().split(' ')[0].substring(0, 5)
        }
    }

    return (
        <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleBackClick}
                        className="h-8 w-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">Order #{order.orderId}</h1>
                    <div className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleStatusChange("cancelled")}
                                disabled={order.status === "cancelled"}
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel Order
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Order Details */}
                <Card className="md:col-span-2">
                    <CardHeader className="pb-3">
                        <CardTitle>Order Details</CardTitle>
                        <CardDescription>
                            Order placed on {order.orderDateFormatted} at {order.timeFormatted}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="items">
                            <TabsList className="mb-4">
                                <TabsTrigger value="items">
                                    <Utensils className="mr-2 h-4 w-4" />
                                    Items
                                </TabsTrigger>
                                <TabsTrigger value="customer">
                                    <User className="mr-2 h-4 w-4" />
                                    Customer
                                </TabsTrigger>
                                <TabsTrigger value="timeline">
                                    <Clock className="mr-2 h-4 w-4" />
                                    Timeline
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="items" className="space-y-4">
                                <div className="rounded-md border">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Item
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Quantity
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Subtotal
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {order.items.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {`₹${(item.price / 100).toFixed(2)}`}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                                        {`₹${(item.subtotal / 100).toFixed(2)}`}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="border rounded-md p-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span>{order.subtotalFormatted}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <span>{order.taxFormatted}</span>
                                    </div>
                                    {order.deliveryFee > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Delivery Fee</span>
                                            <span>{order.deliveryFeeFormatted}</span>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>{order.totalFormatted}</span>
                                    </div>
                                </div>

                                {order.notes && (
                                    <div className="border rounded-md p-4">
                                        <h4 className="text-sm font-medium mb-2">Order Notes</h4>
                                        <p className="text-sm text-gray-600">{order.notes}</p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="customer" className="space-y-4">
                                <div className="border rounded-md p-4 space-y-3">
                                    {order.customer ? (
                                        <>
                                            <div className="flex items-start gap-3">
                                                <User className="h-5 w-5 text-gray-500 mt-0.5" />
                                                <div>
                                                    <h4 className="text-sm font-medium">Customer Name</h4>
                                                    <p className="text-sm text-gray-600">{order.customer.name}</p>
                                                </div>
                                            </div>
                                            {order.customer.phone && (
                                                <div className="flex items-start gap-3">
                                                    <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                                                    <div>
                                                        <h4 className="text-sm font-medium">Phone Number</h4>
                                                        <p className="text-sm text-gray-600">{order.customer.phone}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {order.customer.email && (
                                                <div className="flex items-start gap-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="h-5 w-5 text-gray-500 mt-0.5"
                                                    >
                                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                    </svg>
                                                    <div>
                                                        <h4 className="text-sm font-medium">Email</h4>
                                                        <p className="text-sm text-gray-600">{order.customer.email}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {order.customer.address && order.orderType === "delivery" && (
                                                <div className="flex items-start gap-3">
                                                    <Home className="h-5 w-5 text-gray-500 mt-0.5" />
                                                    <div>
                                                        <h4 className="text-sm font-medium">Delivery Address</h4>
                                                        <p className="text-sm text-gray-600">{order.customer.address}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-center py-4 text-gray-500">
                                            Guest order or customer information not available
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="timeline" className="space-y-4">
                                <div className="border rounded-md p-4">
                                    <div className="space-y-4">
                                        {order.timeline.map((event, index) => {
                                            const { date, time } = formatTimelineDate(event.timestamp)
                                            return (
                                                <div key={event.id} className="flex items-start">
                                                    <div className="flex-shrink-0 h-4 w-4 rounded-full bg-gray-200 mt-1 mr-3 relative">
                                                        <div className={`absolute inset-0 rounded-full ${event.status === "completed" ? "bg-green-500" :
                                                                event.status === "in-progress" ? "bg-blue-500" :
                                                                    event.status === "cancelled" ? "bg-red-500" :
                                                                        "bg-yellow-500"
                                                            }`} />
                                                    </div>
                                                    <div className="flex flex-col w-full">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <p className="text-sm font-medium">
                                                                    Order {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                                </p>
                                                                {event.notes && (
                                                                    <p className="text-xs text-gray-500">
                                                                        {event.notes}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-gray-500">
                                                                {date} {time}
                                                            </p>
                                                        </div>
                                                        {index < order.timeline.length - 1 && (
                                                            <div className="mt-1 ml-0.5 border-l border-gray-200 h-6" />
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Order Actions */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>Order Actions</CardTitle>
                        <CardDescription>
                            Manage this order
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Update Status</h4>
                            <Select
                                value={currentStatus}
                                onValueChange={handleStatusChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="created">Created</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="border rounded-md p-4 space-y-3">
                            <h4 className="text-sm font-medium">Order Information</h4>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Order ID</span>
                                <span className="font-mono">{order.orderId}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Order Type</span>
                                <Badge variant="outline" className="capitalize">{order.orderType}</Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Date</span>
                                <span>{order.orderDateFormatted}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Time</span>
                                <span>{order.timeFormatted}</span>
                            </div>
                        </div>

                        <div className="border rounded-md p-4 space-y-3">
                            <h4 className="text-sm font-medium">Payment Information</h4>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Payment Method</span>
                                <div className="flex items-center">
                                    <CreditCard className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                                    <span className="capitalize">{order.paymentMethod || 'Not specified'}</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Payment Status</span>
                                <span className={`capitalize ${order.paymentStatus === "paid" ? "text-green-600" :
                                        order.paymentStatus === "pending" ? "text-yellow-600" :
                                            "text-red-600"
                                    }`}>
                                    {order.paymentStatus}
                                </span>
                            </div>
                            {order.transactionId && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Transaction ID</span>
                                    <span className="font-mono text-xs">{order.transactionId}</span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                        <Button variant="outline" onClick={handleBackClick}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Orders
                        </Button>
                        {order.status !== "cancelled" && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleStatusChange("cancelled")}
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel Order
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
} 