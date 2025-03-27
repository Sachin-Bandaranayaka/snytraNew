import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Routes that require authentication
const protectedRoutes = [
    '/dashboard',
    '/dashboard/profile',
    '/dashboard/settings',
    '/dashboard/orders',
    '/dashboard/menu',
    '/dashboard/reservations',
    '/dashboard/customers',
    '/dashboard/analytics',
    '/dashboard/marketing',
    '/dashboard/inventory',
    '/dashboard/staff',
    '/dashboard/support',
];

// Routes that are only accessible to admins
const adminRoutes = [
    '/admin',
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path is a protected route
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if the path is an admin route
    const isAdminRoute = adminRoutes.some(route =>
        pathname.startsWith(route)
    );

    // If not a protected route, continue
    if (!isProtectedRoute && !isAdminRoute) {
        return NextResponse.next();
    }

    // Get auth token from cookies
    const token = request.cookies.get('auth-token')?.value;

    // If no token, redirect to login page
    if (!token) {
        return NextResponse.redirect(new URL('/signin?redirect=' + pathname, request.url));
    }

    try {
        // Verify token
        const secret = new TextEncoder().encode(
            process.env.AUTH_SECRET || 'fallback-secret'
        );

        const verifiedToken = await jwtVerify(token, secret);
        const user = verifiedToken.payload as { id: number; email: string; role: string };

        // If admin route, check if user is admin
        if (isAdminRoute && user.role !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        // Continue with the request
        return NextResponse.next();
    } catch (error) {
        // If token is invalid or expired, redirect to login
        console.error('Authentication error:', error);
        return NextResponse.redirect(new URL('/signin?redirect=' + pathname, request.url));
    }
}

// Matching paths for middleware execution
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
    ],
}; 