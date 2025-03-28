"use client";

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If the user is loaded and not an admin, redirect to unauthorized
        if (!isLoading && user) {
            if (user.role !== 'admin') {
                console.log('Not admin, redirecting');
                redirect('/login?callbackUrl=/admin');
            } else {
                console.log('Admin access granted to', user.email);
            }
        } else if (!isLoading && !user) {
            // If no user but finished loading, redirect to login
            console.log('No user, redirecting to login');
            redirect('/login?callbackUrl=/admin');
        }
    }, [user, isLoading, router]);

    // Show loading state while checking
    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e85c2c]"></div>
            </div>
        );
    }

    // Show nothing until we're sure the user is an admin
    if (!user || user.role !== 'admin') {
        return null;
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
                            <Link href="/admin/contacts" className="block p-2 rounded hover:bg-gray-100">
                                Contact Submissions
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
                        <li>
                            <Link href="/admin/faq" className="block p-2 rounded hover:bg-gray-100">
                                FAQ Management
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/settings" className="block p-2 rounded hover:bg-gray-100">
                                Site Settings
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
                            <button
                                onClick={async () => {
                                    await fetch('/api/auth/logout', { method: 'POST' });
                                    window.location.href = '/';
                                }}
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Logout
                            </button>
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