import React from 'react';
import { db } from '@/lib/db';
import { users, userSubscriptions, pricingPackages } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, Mail, User, Calendar, CreditCard, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface UserDetailPageProps {
    params: {
        id: string
    };
}

const UserDetailPage: React.FC<UserDetailPageProps> = async ({ params }) => {
    const userId = parseInt(params.id, 10);

    if (isNaN(userId)) {
        return notFound();
    }

    // Fetch user data
    const userData = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

    if (!userData || userData.length === 0) {
        return notFound();
    }

    const user = userData[0];

    // Fetch user's subscription data
    const subscriptionData = await db
        .select({
            subscription: userSubscriptions,
            package: {
                name: pricingPackages.name,
                price: pricingPackages.price,
                billingCycle: pricingPackages.billingCycle,
            },
        })
        .from(userSubscriptions)
        .leftJoin(pricingPackages, eq(userSubscriptions.packageId, pricingPackages.id))
        .where(eq(userSubscriptions.userId, userId))
        .orderBy(userSubscriptions.startDate)
        .limit(10);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
                <Link href="/admin/users">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Users
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="h-5 w-5 mr-2" />
                            Profile Information
                        </CardTitle>
                        <CardDescription>
                            Basic user account details and information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">ID</p>
                            <p className="text-sm text-gray-500">{user.id}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Name</p>
                            <p className="text-sm text-gray-500">{user.name || 'Not provided'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Email</p>
                            <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Role</p>
                            <Badge variant={user.role === 'admin' ? 'secondary' : 'outline'}>
                                {user.role}
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Phone Number</p>
                            <p className="text-sm text-gray-500">{user.phoneNumber || 'Not provided'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Job Title</p>
                            <p className="text-sm text-gray-500">{user.jobTitle || 'Not provided'}</p>
                        </div>
                        {user.companyId && (
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Company ID</p>
                                <p className="text-sm text-gray-500">{user.companyId}</p>
                            </div>
                        )}
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Two-Factor Authentication</p>
                            <Badge variant={user.twoFactorEnabled ? 'success' : 'outline'}>
                                {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Account Created</p>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                <p className="text-sm text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()} at {new Date(user.createdAt).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Last Updated</p>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                <p className="text-sm text-gray-500">
                                    {new Date(user.updatedAt).toLocaleDateString()} at {new Date(user.updatedAt).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Subscription Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-2" />
                            Subscription Details
                        </CardTitle>
                        <CardDescription>User's subscription plan and payment history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {subscriptionData.length === 0 ? (
                            <div className="text-center py-6">
                                <p className="text-sm text-gray-500 mb-4">No subscription history found</p>
                                <Link href={`/admin/subscriptions/new?userId=${user.id}`}>
                                    <Button variant="outline" size="sm">
                                        Add Subscription
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {subscriptionData.map((item, index) => (
                                    <div key={index} className="border rounded-md p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-medium">{item.package.name || 'Unknown Package'}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {item.package.price ? `$${(item.package.price / 100).toFixed(2)}` : 'N/A'}
                                                    {item.package.billingCycle ? ` / ${item.package.billingCycle}` : ''}
                                                </p>
                                            </div>
                                            <Badge variant={
                                                item.subscription.status === 'active' ? 'success' :
                                                    item.subscription.status === 'cancelled' ? 'destructive' : 'outline'
                                            }>
                                                {item.subscription.status}
                                            </Badge>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <p className="text-gray-500">Started</p>
                                                <p>{new Date(item.subscription.startDate).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Ends</p>
                                                <p>{item.subscription.endDate ? new Date(item.subscription.endDate).toLocaleDateString() : 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Payment</p>
                                                <p>{item.subscription.paymentStatus}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">ID</p>
                                                <p className="truncate">{item.subscription.stripeSubscriptionId || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Admin actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                    <CardDescription>Administrative actions for this user account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        {/* The buttons below would be connected to actual functionality in a production app */}
                        <Button variant="outline" size="sm">
                            Reset Password
                        </Button>

                        <Button variant="outline" size="sm">
                            Edit Profile
                        </Button>

                        {user.role === 'admin' ? (
                            <Button variant="outline" size="sm" className="border-orange-200 bg-orange-100 text-orange-700 hover:bg-orange-200">
                                Remove Admin Rights
                            </Button>
                        ) : (
                            <Button variant="outline" size="sm" className="border-purple-200 bg-purple-100 text-purple-700 hover:bg-purple-200">
                                Make Admin
                            </Button>
                        )}

                        <Button variant="outline" size="sm" className="border-red-200 bg-red-100 text-red-700 hover:bg-red-200">
                            Suspend Account
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserDetailPage; 