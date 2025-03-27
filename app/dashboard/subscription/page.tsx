import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import DashboardNavbar from "@/components/dashboard/navbar";
import DashboardSidebar from "@/components/dashboard/sidebar";

export default function SubscriptionPage() {
    // Current subscription details
    const subscription = {
        plan: "Pro",
        status: "Active",
        nextBillingDate: "May 15, 2023",
        amount: "$49.99/month",
        startDate: "January 15, 2023",
        features: [
            "Online Ordering System",
            "AI Calling Assistant",
            "WhatsApp Integration",
            "SMS Marketing",
            "5 Staff Accounts",
            "24/7 Support",
            "Analytics Dashboard",
            "Custom Branding",
        ],
    };

    // Available plans for upgrade
    const availablePlans = [
        {
            name: "Basic",
            price: "$29.99",
            period: "month",
            description: "Essential features for small restaurants",
            features: [
                "Online Ordering System",
                "Limited AI Calling Assistant",
                "1 Staff Account",
                "Email Support",
                "Basic Analytics",
            ],
            recommended: false,
            current: false,
        },
        {
            name: "Pro",
            price: "$49.99",
            period: "month",
            description: "Advanced features for growing businesses",
            features: [
                "Online Ordering System",
                "AI Calling Assistant",
                "WhatsApp Integration",
                "SMS Marketing",
                "5 Staff Accounts",
                "24/7 Support",
                "Analytics Dashboard",
                "Custom Branding",
            ],
            recommended: true,
            current: true,
        },
        {
            name: "Enterprise",
            price: "$99.99",
            period: "month",
            description: "Complete solution for established restaurants",
            features: [
                "All Pro features",
                "Unlimited Staff Accounts",
                "Priority Support",
                "Advanced Analytics",
                "Multiple Location Support",
                "API Access",
                "Dedicated Account Manager",
                "Custom Integrations",
            ],
            recommended: false,
            current: false,
        },
    ];

    // Subscription history
    const subscriptionHistory = [
        {
            id: "SUB-2023-01",
            date: "January 15, 2023",
            plan: "Pro",
            amount: "$49.99",
            status: "Active",
            statusColor: "bg-green-100 text-green-800",
        },
        {
            id: "SUB-2022-12",
            date: "December 15, 2022",
            plan: "Basic",
            amount: "$29.99",
            status: "Expired",
            statusColor: "bg-gray-100 text-gray-800",
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
                            <h1 className="text-2xl font-bold">My Subscription</h1>
                            <p className="text-gray-500">Manage your subscription plan and billing</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button variant="outline">Contact Support</Button>
                            <Button>Upgrade Plan</Button>
                        </div>
                    </div>

                    <Tabs defaultValue="current" className="mb-8">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="current">Current Plan</TabsTrigger>
                            <TabsTrigger value="plans">Available Plans</TabsTrigger>
                            <TabsTrigger value="history">Subscription History</TabsTrigger>
                        </TabsList>

                        {/* Current Plan Tab */}
                        <TabsContent value="current">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-2">
                                        <CardTitle>Current Subscription Plan</CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                {subscription.plan}
                                            </span>
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                {subscription.status}
                                            </span>
                                        </div>
                                    </div>
                                    <CardDescription>Subscription details and upcoming billing</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Billing Cycle</h3>
                                                <p className="font-medium">{subscription.amount}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Next Billing Date</h3>
                                                <p className="font-medium">{subscription.nextBillingDate}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Start Date</h3>
                                                <p className="font-medium">{subscription.startDate}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Payment Method</h3>
                                                <p className="font-medium">Visa ending in 4242</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-3">Included Features</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {subscription.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="text-green-500"
                                                        >
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                        <span className="text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between border-t pt-6">
                                    <Button variant="outline">Cancel Subscription</Button>
                                    <Button>Change Plan</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        {/* Available Plans Tab */}
                        <TabsContent value="plans">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {availablePlans.map((plan, index) => (
                                    <Card key={index} className={`${plan.recommended ? 'border-blue-500' : ''} ${plan.current ? 'bg-gray-50' : ''}`}>
                                        {plan.recommended && (
                                            <div className="bg-blue-500 text-white text-center text-xs py-1 font-medium">
                                                RECOMMENDED
                                            </div>
                                        )}
                                        <CardHeader>
                                            <CardTitle>{plan.name}</CardTitle>
                                            <div className="mt-2">
                                                <span className="text-2xl font-bold">{plan.price}</span>
                                                <span className="text-gray-500">/{plan.period}</span>
                                            </div>
                                            <CardDescription className="mt-2">{plan.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {plan.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-start space-x-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="text-green-500 mt-0.5"
                                                        >
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                        <span className="text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            {plan.current ? (
                                                <Button className="w-full" disabled>
                                                    Current Plan
                                                </Button>
                                            ) : (
                                                <Button className="w-full">
                                                    {plan.price < "$49.99" ? "Downgrade" : "Upgrade"} to {plan.name}
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Subscription History Tab */}
                        <TabsContent value="history">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Subscription History</CardTitle>
                                    <CardDescription>Your previous subscription plans and changes</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="text-xs font-medium text-gray-500 border-b">
                                                    <th className="pb-3 text-left">Subscription ID</th>
                                                    <th className="pb-3 text-left">Date</th>
                                                    <th className="pb-3 text-left">Plan</th>
                                                    <th className="pb-3 text-left">Amount</th>
                                                    <th className="pb-3 text-left">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subscriptionHistory.map((sub, index) => (
                                                    <tr key={index} className="border-b border-gray-100 last:border-none">
                                                        <td className="py-3 text-sm font-medium">
                                                            {sub.id}
                                                        </td>
                                                        <td className="py-3 text-sm text-gray-500">
                                                            {sub.date}
                                                        </td>
                                                        <td className="py-3 text-sm">
                                                            {sub.plan}
                                                        </td>
                                                        <td className="py-3 text-sm">
                                                            {sub.amount}
                                                        </td>
                                                        <td className="py-3 text-sm">
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-medium ${sub.statusColor}`}
                                                            >
                                                                {sub.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
} 