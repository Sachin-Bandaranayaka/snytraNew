import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'Unauthorized Access - Restaurant Management System',
    description: 'You do not have permission to access this page',
};

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
            <div className="mb-6 p-6 bg-red-50 rounded-full">
                <ShieldAlert className="h-16 w-16 text-red-500" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-8 max-w-md">
                You do not have permission to access this page. Please sign in with an account that has the required permissions.
            </p>

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