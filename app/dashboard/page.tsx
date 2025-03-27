import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import DashboardNavbar from "@/components/dashboard/navbar"
import DashboardSidebar from "@/components/dashboard/sidebar"

export default function DashboardPage() {
    // Dashboard statistics
    const statistics = [
        {
            title: "Total Revenue",
            value: "$14,320.50",
            trend: "+12.5%",
            trendDirection: "up",
            period: "vs last month",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            ),
        },
        {
            title: "Orders",
            value: "324",
            trend: "+8.2%",
            trendDirection: "up",
            period: "vs last month",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                </svg>
            ),
        },
        {
            title: "Customers",
            value: "1,254",
            trend: "+18.3%",
            trendDirection: "up",
            period: "vs last month",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-500"
                >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
        {
            title: "Avg Order Value",
            value: "$44.20",
            trend: "-2.1%",
            trendDirection: "down",
            period: "vs last month",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-orange-500"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            ),
        },
    ];

    // Recent orders
    const recentOrders = [
        {
            id: "ORD-1285",
            customer: "John Smith",
            date: "Today, 2:30 PM",
            amount: "$52.40",
            status: "Completed",
            statusColor: "bg-green-100 text-green-800",
        },
        {
            id: "ORD-1284",
            customer: "Sarah Johnson",
            date: "Today, 1:15 PM",
            amount: "$36.25",
            status: "Processing",
            statusColor: "bg-blue-100 text-blue-800",
        },
        {
            id: "ORD-1283",
            customer: "Michael Davis",
            date: "Today, 12:30 PM",
            amount: "$27.50",
            status: "Completed",
            statusColor: "bg-green-100 text-green-800",
        },
        {
            id: "ORD-1282",
            customer: "Emily Wilson",
            date: "Today, 11:45 AM",
            amount: "$64.20",
            status: "Completed",
            statusColor: "bg-green-100 text-green-800",
        },
        {
            id: "ORD-1281",
            customer: "Robert Garcia",
            date: "Today, 10:50 AM",
            amount: "$42.00",
            status: "Cancelled",
            statusColor: "bg-red-100 text-red-800",
        },
    ];

    // Menu performance
    const menuPerformance = [
        {
            item: "Margherita Pizza",
            sales: 142,
            revenue: "$1,704.00",
            growth: "+5.2%",
        },
        {
            item: "Chicken Wings",
            sales: 98,
            revenue: "$1,176.00",
            growth: "+12.8%",
        },
        {
            item: "Caesar Salad",
            sales: 86,
            revenue: "$688.00",
            growth: "-2.1%",
        },
        {
            item: "Pasta Carbonara",
            sales: 78,
            revenue: "$1,014.00",
            growth: "+8.5%",
        },
    ];

    // Notifications
    const notifications = [
        {
            id: 1,
            title: "New Review",
            description: "John D. left a 5-star review for your restaurant.",
            time: "10 minutes ago",
            read: false,
        },
        {
            id: 2,
            title: "Inventory Alert",
            description: "Chicken wings are running low. Consider reordering soon.",
            time: "30 minutes ago",
            read: false,
        },
        {
            id: 3,
            title: "Staff Schedule Updated",
            description: "The staff schedule for next week has been updated.",
            time: "2 hours ago",
            read: true,
        },
        {
            id: 4,
            title: "Payment Received",
            description: "You received a payment of $325.00 for catering services.",
            time: "Yesterday",
            read: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNavbar />

            <div className="flex">
                <DashboardSidebar />

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Page header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-gray-500">Welcome back, Restaurant Owner!</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button variant="outline">Download Report</Button>
                            <Button>View Analytics</Button>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statistics.map((stat, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-500">
                                        {stat.title}
                                    </CardTitle>
                                    {stat.icon}
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <div className="flex items-center pt-1">
                                        <span
                                            className={`text-xs font-medium ${stat.trendDirection === "up"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {stat.trend}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-1">
                                            {stat.period}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Main content area */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Recent Orders */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Recent Orders</CardTitle>
                                    <Link href="/dashboard/orders" className="text-sm text-blue-600 hover:underline">
                                        View All
                                    </Link>
                                </div>
                                <CardDescription>
                                    You have received {recentOrders.length} orders today
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-xs font-medium text-gray-500 border-b">
                                                <th className="pb-3 text-left">Order ID</th>
                                                <th className="pb-3 text-left">Customer</th>
                                                <th className="pb-3 text-left">Date</th>
                                                <th className="pb-3 text-left">Amount</th>
                                                <th className="pb-3 text-left">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentOrders.map((order, index) => (
                                                <tr key={index} className="border-b border-gray-100 last:border-none">
                                                    <td className="py-3 text-sm font-medium">
                                                        {order.id}
                                                    </td>
                                                    <td className="py-3 text-sm">{order.customer}</td>
                                                    <td className="py-3 text-sm text-gray-500">
                                                        {order.date}
                                                    </td>
                                                    <td className="py-3 text-sm">{order.amount}</td>
                                                    <td className="py-3 text-sm">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${order.statusColor}`}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Notifications</CardTitle>
                                    <Button variant="ghost" size="sm" className="h-auto p-0 text-sm text-blue-600 hover:text-blue-800">
                                        Mark all as read
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start ${!notification.read ? "bg-blue-50 -mx-2 p-2 rounded-md" : ""
                                                }`}
                                        >
                                            <div
                                                className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${!notification.read ? "bg-blue-500" : "bg-gray-200"
                                                    }`}
                                            ></div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium">{notification.title}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {notification.description}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t pt-4 flex justify-center">
                                <Button variant="ghost" size="sm" className="text-sm w-full">
                                    View All Notifications
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Menu Performance */}
                    <Card className="mb-8">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Menu Performance</CardTitle>
                                <Link href="/dashboard/menu" className="text-sm text-blue-600 hover:underline">
                                    View Full Menu Analytics
                                </Link>
                            </div>
                            <CardDescription>
                                Your top performing menu items this month
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-xs font-medium text-gray-500 border-b">
                                            <th className="pb-3 text-left">Item</th>
                                            <th className="pb-3 text-right">Sales Count</th>
                                            <th className="pb-3 text-right">Revenue</th>
                                            <th className="pb-3 text-right">Growth</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {menuPerformance.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-100 last:border-none">
                                                <td className="py-3 text-sm font-medium">
                                                    {item.item}
                                                </td>
                                                <td className="py-3 text-sm text-right">{item.sales}</td>
                                                <td className="py-3 text-sm text-right">{item.revenue}</td>
                                                <td className={`py-3 text-sm text-right ${item.growth.startsWith("+") ? "text-green-600" : "text-red-600"
                                                    }`}>
                                                    {item.growth}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-blue-500 mb-4"
                                >
                                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                                    <polyline points="13 2 13 9 20 9" />
                                </svg>
                                <h3 className="font-medium mb-1">Update Menu</h3>
                                <p className="text-sm text-gray-500 mb-4">Add or modify items</p>
                                <Button variant="outline" size="sm" className="w-full">
                                    Go to Menu
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-purple-500 mb-4"
                                >
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <h3 className="font-medium mb-1">Reservations</h3>
                                <p className="text-sm text-gray-500 mb-4">Manage bookings</p>
                                <Button variant="outline" size="sm" className="w-full">
                                    View Calendar
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-green-500 mb-4"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <h3 className="font-medium mb-1">Staff</h3>
                                <p className="text-sm text-gray-500 mb-4">Schedule and manage</p>
                                <Button variant="outline" size="sm" className="w-full">
                                    Staff Portal
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-orange-500 mb-4"
                                >
                                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                </svg>
                                <h3 className="font-medium mb-1">Marketing</h3>
                                <p className="text-sm text-gray-500 mb-4">Promotions & campaigns</p>
                                <Button variant="outline" size="sm" className="w-full">
                                    Create Campaign
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
} 