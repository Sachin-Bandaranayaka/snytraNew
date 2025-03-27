import { db } from '@/lib/db';
import { users, userSubscriptions, blogPosts, pricingPackages } from '@/lib/schema';
import { count } from 'drizzle-orm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, CreditCard, Users, FileText } from 'lucide-react';

async function AdminDashboardPage() {
    // Get counts for dashboard stats
    const [
        userCount,
        subscriptionCount,
        blogPostCount,
        packageCount
    ] = await Promise.all([
        db.select({ count: count() }).from(users),
        db.select({ count: count() }).from(userSubscriptions),
        db.select({ count: count() }).from(blogPosts),
        db.select({ count: count() }).from(pricingPackages)
    ]);

    // Get recent registrations
    const recentUsers = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt
    })
        .from(users)
        .orderBy(users.createdAt)
        .limit(5);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userCount[0].count}</div>
                        <p className="text-xs text-muted-foreground">
                            Registered users
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{subscriptionCount[0].count}</div>
                        <p className="text-xs text-muted-foreground">
                            Paid subscriptions
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{blogPostCount[0].count}</div>
                        <p className="text-xs text-muted-foreground">
                            Published posts
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pricing Packages</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{packageCount[0].count}</div>
                        <p className="text-xs text-muted-foreground">
                            Available packages
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Users */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentUsers.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No users yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {recentUsers.map((user) => (
                                        <div key={user.id} className="flex items-center">
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.name || 'Unnamed User'}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                            <div className="ml-auto text-sm text-muted-foreground">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            <a
                                href="/admin/users"
                                className="flex items-center p-2 rounded-md hover:bg-gray-100"
                            >
                                <Users className="mr-2 h-4 w-4" />
                                <span>Manage Users</span>
                            </a>
                            <a
                                href="/admin/blog"
                                className="flex items-center p-2 rounded-md hover:bg-gray-100"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Manage Blog Posts</span>
                            </a>
                            <a
                                href="/admin/pricing"
                                className="flex items-center p-2 rounded-md hover:bg-gray-100"
                            >
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Manage Pricing Packages</span>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AdminDashboardPage; 