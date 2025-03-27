"use client";

import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';

export default function UnauthorizedPage() {
    const { user, isLoading } = useAuth();
    const [debugInfo, setDebugInfo] = useState<any>(null);

    useEffect(() => {
        // Check headers from last request for debugging
        const checkAuthState = async () => {
            try {
                // Make a test request to get headers
                const res = await fetch('/api/auth/me', {
                    credentials: 'include',
                    method: 'HEAD'
                });

                // Get all headers for debugging
                const headers: Record<string, string> = {};
                res.headers.forEach((value, key) => {
                    if (key.startsWith('x-')) {
                        headers[key] = value;
                    }
                });

                setDebugInfo({
                    status: res.status,
                    headers,
                    user: user
                });
            } catch (error) {
                console.error('Error checking auth state:', error);
                setDebugInfo({ error: 'Failed to check auth state' });
            }
        };

        if (!isLoading) {
            checkAuthState();
        }
    }, [isLoading, user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
            <div className="mb-6 p-6 bg-red-50 rounded-full">
                <ShieldAlert className="h-16 w-16 text-red-500" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4 max-w-md">
                You do not have permission to access this page. Please sign in with an account that has the required permissions.
            </p>

            {user && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg text-left max-w-md">
                    <p>You are signed in as: <strong>{user.email}</strong></p>
                    <p>Your role: <strong>{user.role}</strong></p>
                    <p className="mt-2 text-sm text-gray-600">
                        Admin access is required for this page.
                    </p>
                </div>
            )}

            {debugInfo && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg text-left text-sm max-w-md overflow-auto">
                    <details>
                        <summary className="cursor-pointer font-medium">Debug Information</summary>
                        <pre className="mt-2 whitespace-pre-wrap">
                            {JSON.stringify(debugInfo, null, 2)}
                        </pre>
                    </details>
                </div>
            )}

            <div className="flex space-x-4">
                <Link href="/signin">
                    <Button>
                        Sign In
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="outline">
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
} 