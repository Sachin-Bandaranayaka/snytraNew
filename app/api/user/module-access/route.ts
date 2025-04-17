import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { userSubscriptions, pricingPackages, moduleAccess, users } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
    try {
        // Get authenticated user
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        console.log("User role for module access:", user.role)

        // Define modules based on user role
        let modules = [
            { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
        ]

        if (user.role === 'admin') {
            // Admin has access to all modules
            modules = [
                ...modules,
                { id: 'reservations', name: 'Table Reservations', icon: 'Utensils', path: '/dashboard/reservations' },
                { id: 'inventory', name: 'Inventory Management', icon: 'Package', path: '/dashboard/management/inventory' },
                { id: 'orders', name: 'Order Management', icon: 'ShoppingCart', path: '/dashboard/management/orders' },
                { id: 'menu', name: 'Menu Management', icon: 'MenuSquare', path: '/dashboard/management/menu' },
                { id: 'staff', name: 'Staff Management', icon: 'Users', path: '/dashboard/management/staff' },
                { id: 'settings', name: 'Settings', icon: 'Settings', path: '/dashboard/settings' },
                { id: 'website', name: 'Website Management', icon: 'Globe', path: '/dashboard/management/website' },
            ]
        } else if (user.role === 'restaurant_owner') {
            // Restaurant owner has management access
            modules = [
                ...modules,
                { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard/management' },
                { id: 'reservations', name: 'Table Reservations', icon: 'Utensils', path: '/dashboard/reservations' },
                { id: 'orders', name: 'Order Management', icon: 'ShoppingCart', path: '/dashboard/management/orders' },
                { id: 'inventory', name: 'Inventory Management', icon: 'Package', path: '/dashboard/management/inventory' },
                { id: 'menu', name: 'Menu Management', icon: 'MenuSquare', path: '/dashboard/management/menu' },
                { id: 'staff', name: 'Staff Management', icon: 'Users', path: '/dashboard/management/staff' },
                { id: 'website', name: 'Website Management', icon: 'Globe', path: '/dashboard/management/website' },
                { id: 'settings', name: 'Settings', icon: 'Settings', path: '/dashboard/management/settings' },
            ]
        } else {
            // Regular user has limited access
            modules = [
                ...modules,
                { id: 'reservations', name: 'Table Reservations', icon: 'Utensils', path: '/dashboard/reservations' },
                { id: 'orders', name: 'Orders', icon: 'ShoppingCart', path: '/dashboard/orders' },
                { id: 'profile', name: 'Profile', icon: 'User', path: '/dashboard/profile' },
                { id: 'support', name: 'Support', icon: 'LifeBuoy', path: '/dashboard/support' },
            ]
        }

        console.log("Modules being returned:", modules.map(m => m.id))
        return NextResponse.json({ modules })
    } catch (error) {
        console.error('Error fetching module access:', error)
        return NextResponse.json(
            { error: 'Failed to fetch module access' },
            { status: 500 }
        )
    }
} 