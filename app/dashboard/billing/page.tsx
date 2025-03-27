"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/components/ui/use-toast";

export default function BillingPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [subscriptionData, setSubscriptionData] = useState<any>(null);
    const [invoices, setInvoices] = useState([]);
    const [hasSubscription, setHasSubscription] = useState(false);

    // Fetch subscription and invoice data
    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                // Fetch subscription data
                const subscriptionResponse = await fetch(`/api/user/subscription?userId=${user.id}`);
                if (!subscriptionResponse.ok) {
                    throw new Error("Failed to fetch subscription data");
                }

                const subData = await subscriptionResponse.json();
                setSubscriptionData(subData);
                setHasSubscription(subData.hasSubscription);

                // Fetch invoice data
                const invoiceResponse = await fetch(`/api/user/invoices?userId=${user.id}`);
                if (!invoiceResponse.ok) {
                    throw new Error("Failed to fetch invoice data");
                }

                const invData = await invoiceResponse.json();
                setInvoices(invData.invoices || []);
            } catch (error) {
                console.error("Error fetching billing data:", error);
                toast({
                    title: "Error",
                    description: "There was an error loading your billing information.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, toast]);

    // Billing summary from real data
    const billingSummary = hasSubscription && subscriptionData?.subscription
        ? {
            nextBillingDate: subscriptionData.stripeSubscription
                ? new Date(subscriptionData.stripeSubscription.current_period_end * 1000).toLocaleDateString()
                : "N/A",
            amount: `$${(subscriptionData.subscription.package.price / 100).toFixed(2)}`,
            plan: subscriptionData.subscription.package.name,
            status: subscriptionData.subscription.subscription.status === 'active' ? 'Active' : 'Inactive',
        }
        : {
            nextBillingDate: "N/A",
            amount: "$0.00",
            plan: "No Active Plan",
            status: "Inactive",
        };

    // Payment methods from Stripe data
    const paymentMethods = subscriptionData?.stripeSubscription?.default_payment_method
        ? [
            {
                id: subscriptionData.stripeSubscription.default_payment_method.id,
                type: subscriptionData.stripeSubscription.default_payment_method.card.brand,
                last4: subscriptionData.stripeSubscription.default_payment_method.card.last4,
                expMonth: subscriptionData.stripeSubscription.default_payment_method.card.exp_month,
                expYear: subscriptionData.stripeSubscription.default_payment_method.card.exp_year,
                isDefault: true,
            }
        ]
        : [];

    // Format date for display
    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString();
    };

    // Format amount for display
    const formatAmount = (amount) => {
        return `$${(amount / 100).toFixed(2)}`;
    };

    // Get status color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800';
            case 'open': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleAddPaymentMethod = () => {
        toast({
            title: "Coming Soon",
            description: "Adding payment methods will be available soon.",
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DashboardNavbar />
                <div className="flex">
                    <DashboardSidebar />
                    <main className="flex-1 p-6">
                        <div className="flex justify-center items-center h-96">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

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
                            <h1 className="text-2xl font-bold">Billing</h1>
                            <p className="text-gray-500">Manage your payment methods and billing preferences</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
                        </div>
                    </div>

                    <Tabs defaultValue="payment-methods" className="mb-8">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                            <TabsTrigger value="billing-history">Billing History</TabsTrigger>
                        </TabsList>

                        {/* Payment Methods Tab */}
                        <TabsContent value="payment-methods">
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Billing Summary</CardTitle>
                                        <CardDescription>Your current subscription and next payment</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Next Billing Date</h3>
                                                <p className="font-medium">{billingSummary.nextBillingDate}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Amount</h3>
                                                <p className="font-medium">{billingSummary.amount}/month</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Plan</h3>
                                                <p className="font-medium">{billingSummary.plan}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${billingSummary.status === 'Active'
                                                        ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                                                        : 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-500/20'
                                                    }`}>
                                                    {billingSummary.status}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Methods</CardTitle>
                                        <CardDescription>Manage your saved payment methods</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {paymentMethods.length > 0 ? (
                                            <div className="space-y-4">
                                                {paymentMethods.map((method) => (
                                                    <div key={method.id} className="flex items-center justify-between border p-4 rounded-lg">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex-shrink-0">
                                                                {method.type === "visa" && (
                                                                    <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect width="48" height="32" rx="4" fill="#EDF2F7" />
                                                                        <path d="M18.435 21.5H15.2133L17.0292 10.5H20.2508L18.435 21.5Z" fill="#2A2A6C" />
                                                                        <path d="M27.91 10.7017C27.2117 10.4683 26.1133 10.2333 24.7883 10.2333C21.8367 10.2333 19.7617 11.7667 19.745 13.9667C19.7283 15.6333 21.235 16.5667 22.3517 17.1333C23.5 17.7167 23.9067 18.0833 23.9067 18.5833C23.89 19.3333 22.985 19.6833 22.1483 19.6833C20.9667 19.6833 20.3333 19.5 19.3767 19.1L18.9867 18.9333L18.5633 21.7C19.39 22.0167 20.9333 22.2833 22.5267 22.3C25.6667 22.3 27.7083 20.7833 27.7267 18.4333C27.7433 17.1 26.9083 16.0667 25.1433 15.2167C24.075 14.6833 23.4083 14.3333 23.4083 13.8C23.425 13.3 23.9917 12.8 25.2067 12.8C26.2317 12.7833 26.9767 13.0167 27.5433 13.25L27.8267 13.3833L28.2517 10.7L27.91 10.7017Z" fill="#2A2A6C" />
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M33.6774 10.5H31.1774C30.3674 10.5 29.7674 10.7333 29.4191 11.5167L25.1191 21.5H28.2924L28.9341 19.7833H32.5841L32.9008 21.5H35.7424L33.6774 10.5ZM29.8424 17.3667C30.0341 16.8667 31.0341 14.1333 31.0341 14.1333C31.0174 14.1667 31.2924 13.4167 31.4424 12.9333L31.6424 14.0167C31.6424 14.0167 32.2424 16.9333 32.3341 17.3667H29.8424Z" fill="#2A2A6C" />
                                                                        <path d="M14.5892 10.5L11.6375 17.8833L11.3442 16.6333C10.8525 15.0667 9.16921 13.3667 7.3042 12.55L9.98754 21.4833H13.1775L17.7775 10.5H14.5892Z" fill="#2A2A6C" />
                                                                        <path d="M9.00005 11.2167C8.70838 11.0833 8.09171 10.9333 7.34171 10.9333C4.59171 10.9333 2.60005 12.4 2.60005 14.6167C2.60005 16.2833 3.94171 17.2 4.99171 17.7667C6.05005 18.3333 6.38338 18.7 6.38338 19.1833C6.38338 19.9167 5.50838 20.25 4.68338 20.25C3.53338 20.25 2.89171 20.0833 1.91671 19.6833L1.53338 19.5L1.12505 22.1333C1.52505 22.3333 2.54171 22.6333 3.60005 22.65C6.50838 22.65 8.45838 21.2 8.47505 18.8C8.47505 17.4833 7.60838 16.45 6.00005 15.6C5.00838 15.0667 4.41671 14.7 4.41671 14.1333C4.41671 13.6167 5.01671 13.1 6.27505 13.1C7.31671 13.0833 8.06671 13.3167 8.64171 13.5667L8.92505 13.7L9.33338 11.2167" fill="#E79800" />
                                                                    </svg>
                                                                )}
                                                                {method.type === "mastercard" && (
                                                                    <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect width="48" height="32" rx="4" fill="#EDF2F7" />
                                                                        <path d="M30.5833 9.33325H17.4166C13.8333 9.33325 10.9166 12.2499 10.9166 15.8333V16.1666C10.9166 19.7499 13.8333 22.6666 17.4166 22.6666H30.5833C34.1666 22.6666 37.0833 19.7499 37.0833 16.1666V15.8333C37.0833 12.2499 34.1666 9.33325 30.5833 9.33325Z" fill="#F7F9FA" />
                                                                        <path d="M18.5 19.8572C20.4 19.8572 22 18.2571 22 16.3571C22 14.4571 20.5 12.8572 18.5 12.8572C16.6 12.8572 15 14.4571 15 16.3571C15 18.2571 16.5 19.8572 18.5 19.8572Z" fill="#D50000" />
                                                                        <path d="M29.5 19.8572C31.4 19.8572 33 18.2571 33 16.3571C33 14.4571 31.5 12.8572 29.5 12.8572C27.6 12.8572 26 14.4571 26 16.3571C26 18.2571 27.5 19.8572 29.5 19.8572Z" fill="#FF6B00" />
                                                                        <path d="M27.4166 12.8572C28.0833 13.7572 28.4166 14.9572 28.4166 16.1572C28.4166 17.4572 28.0833 18.5572 27.4166 19.4572C26.7499 18.5572 26.4166 17.3572 26.4166 16.1572C26.4166 14.9572 26.7499 13.7572 27.4166 12.8572Z" fill="#FF9300" />
                                                                        <path d="M20.5834 12.8572C21.2501 13.7572 21.5834 14.9572 21.5834 16.1572C21.5834 17.4572 21.2501 18.5572 20.5834 19.4572C19.9168 18.5572 19.5834 17.3572 19.5834 16.1572C19.5834 14.9572 19.9168 13.7572 20.5834 12.8572Z" fill="#D50000" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium">{method.type.charAt(0).toUpperCase() + method.type.slice(1)} ending in {method.last4}</p>
                                                                <p className="text-xs text-gray-500">Expires {method.expMonth}/{method.expYear}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-3">
                                                            {method.isDefault && (
                                                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                                    Default
                                                                </span>
                                                            )}
                                                            <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>Edit</Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-gray-500 mb-4">No payment methods found</p>
                                                <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Billing Information</CardTitle>
                                        <CardDescription>Your billing address and tax information</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {user ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Billing Contact</h3>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Billing Address</h3>
                                                    <p className="text-sm text-gray-500">
                                                        {hasSubscription
                                                            ? "Your billing address is on file with Stripe"
                                                            : "No billing address on file"}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-center text-gray-500">Sign in to view billing information</p>
                                        )}
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" onClick={handleAddPaymentMethod}>Update Billing Information</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Billing History Tab */}
                        <TabsContent value="billing-history">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Billing History</CardTitle>
                                            <CardDescription>View and download your past invoices</CardDescription>
                                        </div>
                                        <Link href="/dashboard/invoices">
                                            <Button variant="outline" size="sm">View All Invoices</Button>
                                        </Link>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {invoices.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="text-xs font-medium text-gray-500 border-b">
                                                        <th className="pb-3 text-left">Invoice ID</th>
                                                        <th className="pb-3 text-left">Date</th>
                                                        <th className="pb-3 text-left">Amount</th>
                                                        <th className="pb-3 text-left">Status</th>
                                                        <th className="pb-3 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {invoices.slice(0, 5).map((invoice, index) => (
                                                        <tr key={invoice.id} className="border-b border-gray-100 last:border-none">
                                                            <td className="py-3 text-sm font-medium">
                                                                {invoice.number}
                                                            </td>
                                                            <td className="py-3 text-sm text-gray-500">
                                                                {formatDate(invoice.created)}
                                                            </td>
                                                            <td className="py-3 text-sm">
                                                                {formatAmount(invoice.amount_paid)}
                                                            </td>
                                                            <td className="py-3 text-sm">
                                                                <span
                                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}
                                                                >
                                                                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 text-sm text-right">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="ml-2"
                                                                    onClick={() => window.open(invoice.hosted_invoice_url, '_blank')}
                                                                    disabled={!invoice.hosted_invoice_url}
                                                                >
                                                                    View
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">No billing history available</p>
                                            {!hasSubscription && (
                                                <p className="text-gray-500 mt-2">Subscribe to a plan to see your billing history</p>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                                {invoices.length > 5 && (
                                    <CardFooter className="flex justify-center border-t pt-4">
                                        <Link href="/dashboard/invoices">
                                            <Button variant="outline">View All Invoices</Button>
                                        </Link>
                                    </CardFooter>
                                )}
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
} 