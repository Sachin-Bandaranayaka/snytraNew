import { db } from '@/lib/db';
import { users, userSubscriptions } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
    title: 'User Management - Admin Panel',
};

async function UserManagementPage() {
    // Fetch all users with their subscription status
    const allUsers = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
    })
        .from(users)
        .orderBy(users.createdAt);

    // For each user, check if they have any active subscriptions
    const userList = await Promise.all(
        allUsers.map(async (user) => {
            const subscriptions = await db
                .select()
                .from(userSubscriptions)
                .where(eq(userSubscriptions.userId, user.id))
                .where(eq(userSubscriptions.status, 'active'));

            return {
                ...user,
                hasActiveSubscription: subscriptions.length > 0,
                createdAt: new Date(user.createdAt).toLocaleDateString(),
            };
        })
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <Link href="/admin">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead>Subscription</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            userList.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name || 'N/A'}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin'
                                                ? 'bg-purple-100 text-purple-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs ${user.hasActiveSubscription
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.hasActiveSubscription ? 'Active' : 'None'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Link href={`/admin/users/${user.id}`}>
                                                <Button variant="outline" size="sm">
                                                    View
                                                </Button>
                                            </Link>
                                            {/* We would add more action buttons here later:
                      <Button variant="outline" size="sm" className="text-red-500">
                        Delete
                      </Button>
                      */}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default UserManagementPage; 