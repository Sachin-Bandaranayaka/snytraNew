"use client";

import { useEffect, useState } from "react";
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
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error-message";
import Link from "next/link";

export default function SubscriptionPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [subscriptionData, setSubscriptionData] = useState<any>(null);
    const [hasSubscription, setHasSubscription] = useState(false);

    // Fetch real subscription data
    useEffect(() => {
        const fetchSubscriptionData = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                setError(null);
                const response = await fetch(`/api/user/subscription?userId=${user.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch subscription data");
                }

                const data = await response.json();
                setSubscriptionData(data);
                setHasSubscription(data.hasSubscription);
            } catch (error) {
                console.error("Error fetching subscription:", error);
                setError("Failed to load subscription details. Please try again later.");
                toast({
                    title: "Error",
                    description: "There was an error loading your subscription details.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubscriptionData();
    }, [user, toast]);

    // Current subscription details (use real data if available)
    const subscription = hasSubscription && subscriptionData?.subscription
        ? {
            plan: subscriptionData.subscription.package.name,
            status: subscriptionData.subscription.subscription.status,
            nextBillingDate: subscriptionData.stripeSubscription
                ? new Date(subscriptionData.stripeSubscription.current_period_end * 1000).toLocaleDateString()
                : "N/A",
            amount: `$${(subscriptionData.subscription.package.price / 100).toFixed(2)}/${subscriptionData.subscription.package.billingCycle}`,
            startDate: new Date(subscriptionData.subscription.subscription.startDate).toLocaleDateString(),
            features: subscriptionData.subscription.package.features
                ? typeof subscriptionData.subscription.package.features === 'string'
                    ? JSON.parse(subscriptionData.subscription.package.features)
                    : subscriptionData.subscription.package.features
                : []
        }
        : {
            plan: "No Active Plan",
            status: "Inactive",
            nextBillingDate: "N/A",
            amount: "$0.00",
            startDate: "N/A",
            features: [],
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
            current: subscription.plan === "Basic",
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
            current: subscription.plan === "Pro",
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
            current: subscription.plan === "Enterprise",
        },
    ];

    const handleManageSubscription = async () => {
        toast({
            title: "Coming Soon",
            description: "Subscription management will be available soon.",
        });
        // TODO: Implement Stripe Customer Portal redirect
    };

    const retryFetch = () => {
        setIsLoading(true);
        // We'll trigger a refetch by simulating a user change
        const fetchSubscriptionData = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                setError(null);
                const response = await fetch(`/api/user/subscription?userId=${user.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch subscription data");
                }

                const data = await response.json();
                setSubscriptionData(data);
                setHasSubscription(data.hasSubscription);
            } catch (error) {
                console.error("Error fetching subscription:", error);
                setError("Failed to load subscription details. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubscriptionData();
    };

    if (isLoading) {
        return <Loading text="Loading your subscription details..." size="lg" />;
    }

    if (error) {
        return (
            <ErrorMessage
                title="Subscription Error"
                message={error}
                retry={retryFetch}
            />
        );
    }

    return (
        <>
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold">My Subscription</h1>
                    <p className="text-gray-500">Manage your subscription plan and billing</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button variant="outline">Contact Support</Button>
                    {!hasSubscription && (
                        <Button>
                            <Link href="/pricing">Choose a Plan</Link>
                        </Button>
                    )}
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
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${hasSubscription && subscription.status === 'active'
                                        ? 'bg-green-50 text-green-700 ring-green-600/20'
                                        : 'bg-gray-50 text-gray-700 ring-gray-600/20'
                                        }`}>
                                        {hasSubscription && subscription.status === 'active' ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                            <CardDescription>Subscription details and upcoming billing</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {hasSubscription ? (
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
                                            <p className="font-medium">
                                                {subscriptionData?.stripeSubscription?.default_payment_method
                                                    ? `Card ending in ${subscriptionData.stripeSubscription.default_payment_method.card.last4}`
                                                    : "On file with Stripe"}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-3">Included Features</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {subscription.features && Array.isArray(subscription.features) &&
                                                subscription.features.map((feature: string, index: number) => (
                                                    <div key={index} className="flex items-center">
                                                        <svg
                                                            className="h-5 w-5 text-green-500 mr-2"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">You don't have an active subscription plan.</p>
                                    <Button asChild>
                                        <Link href="/pricing">Choose a Plan</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                        {hasSubscription && (
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" onClick={handleManageSubscription}>
                                    Manage Billing
                                </Button>
                                <Button variant="outline" className="text-red-600 hover:bg-red-50">
                                    Cancel Subscription
                                </Button>
                            </CardFooter>
                        )}
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
                                    <Button
                                        variant={plan.current ? "outline" : "default"}
                                        className="w-full"
                                        disabled={plan.current}
                                    >
                                        {plan.current ? "Current Plan" : "Select Plan"}
                                    </Button>
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
                            <CardDescription>View your subscription changes and renewals</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {hasSubscription ? (
                                <div className="space-y-4">
                                    <div className="border rounded-lg overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        ID
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Plan
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Amount
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {subscriptionData?.subscription?.subscription?.id || "SUB-1"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(subscriptionData?.subscription?.subscription?.startDate).toLocaleDateString() || "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {subscriptionData?.subscription?.package?.name || "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        ${((subscriptionData?.subscription?.package?.price || 0) / 100).toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                            {subscriptionData?.subscription?.subscription?.status || "Active"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-8 text-center text-gray-500">
                                    <p>No subscription history available.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    );
} 