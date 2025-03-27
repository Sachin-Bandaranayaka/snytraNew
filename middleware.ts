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

// Routes that are only accessible to admins - make sure to catch ALL admin routes
const adminRoutes = [
    '/admin',
    '/admin/users',
    '/admin/contacts',
    '/admin/tickets',
    '/admin/blog',
    '/admin/blog/categories',
    '/admin/blog/new',
    '/admin/pricing',
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    console.log(`Middleware running for path: ${pathname}`);

    // Add debugging to headers (visible in network tab)
    const response = NextResponse.next();
    response.headers.set('x-middleware-path', pathname);

    // Check if the path is a protected route
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if the path is an admin route
    const isAdminRoute = pathname.startsWith('/admin');

    console.log(`Protected: ${isProtectedRoute}, Admin: ${isAdminRoute}`);

    response.headers.set('x-is-protected', isProtectedRoute.toString());
    response.headers.set('x-is-admin-route', isAdminRoute.toString());

    // If not a protected route, continue
    if (!isProtectedRoute && !isAdminRoute) {
        return response;
    }

    // Get auth token from cookies
    const token = request.cookies.get('auth-token')?.value;
    response.headers.set('x-has-token', !!token ? 'true' : 'false');

    console.log(`Has token: ${!!token}`);

    // If no token, redirect to login page
    if (!token) {
        response.headers.set('x-redirect-reason', 'no-token');
        return NextResponse.redirect(new URL('/signin?redirect=' + pathname, request.url));
    }

    try {
        // Verify token
        const secret = new TextEncoder().encode(
            process.env.AUTH_SECRET || 'fallback-secret'
        );

        const verifiedToken = await jwtVerify(token, secret);
        const user = verifiedToken.payload as { id: number; email: string; role: string };

        console.log(`User role: ${user.role}, Email: ${user.email}`);

        response.headers.set('x-user-role', user.role || 'none');
        response.headers.set('x-user-email', user.email || 'unknown');

        // If admin route, check if user is admin
        if (isAdminRoute) {
            console.log(`Checking admin access for ${user.email}`);
            if (user.role !== 'admin') {
                console.log(`Access denied: user is ${user.role}, not admin`);
                response.headers.set('x-redirect-reason', 'not-admin');
                return NextResponse.redirect(new URL('/unauthorized', request.url));
            }

            console.log(`Admin access granted to ${user.email}`);
            // User is admin and accessing admin route
            response.headers.set('x-access-granted', 'true');
        }

        // Continue with the request
        return response;
    } catch (error) {
        // If token is invalid or expired, redirect to login
        console.error('Authentication error:', error);
        response.headers.set('x-redirect-reason', 'token-error');
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