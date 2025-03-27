import { ReactNode } from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Admin Panel - Restaurant Management System',
    description: 'Admin dashboard for Restaurant Management System',
};

async function AdminLayout({ children }: { children: ReactNode }) {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
        return redirect('/unauthorized');
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Admin Panel</h2>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin" className="block p-2 rounded hover:bg-gray-100">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/users" className="block p-2 rounded hover:bg-gray-100">
                                User Management
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/tickets" className="block p-2 rounded hover:bg-gray-100">
                                Support Tickets
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/blog" className="block p-2 rounded hover:bg-gray-100">
                                Blog Management
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/blog/categories" className="block p-2 rounded hover:bg-gray-100">
                                Blog Categories
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/pricing" className="block p-2 rounded hover:bg-gray-100">
                                Pricing Packages
                            </Link>
                        </li>
                        <li className="pt-4 border-t mt-4">
                            <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100">
                                Back to User Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="block p-2 rounded hover:bg-gray-100">
                                Back to Website
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm">
                    <div className="px-6 py-4 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
                        <div className="flex items-center">
                            <span className="mr-4">{user.name || user.email}</span>
                            <Link href="/api/auth/logout" className="text-sm text-gray-600 hover:text-gray-900">
                                Logout
                            </Link>
                        </div>
                    </div>
                </header>
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout; 