"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/ui/sidebar"
import { SidebarList, SidebarItem } from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    MenuSquare,
    Users,
    Settings,
    Globe,
    ChevronRight,
    ChevronLeft,
    Utensils
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ManagementLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const { toast } = useToast()
    const [collapsed, setCollapsed] = useState(false)
    // Define all possible modules with default false state
    const [moduleAccess, setModuleAccess] = useState({
        dashboard: true, // Show dashboard by default
        reservations: true, // Add reservations module with default access
        orders: false,
        inventory: false,
        menu: false,
        staff: false,
        website: false,
        settings: false,
        profile: false,
        support: false
    })

    // Fetch module access based on subscription
    useEffect(() => {
        const fetchModuleAccess = async () => {
            try {
                const response = await fetch('/api/user/module-access')
                if (response.ok) {
                    const data = await response.json()
                    console.log('API response:', data)

                    if (data.modules && Array.isArray(data.modules)) {
                        console.log('Modules from API:', data.modules)

                        // Start with all modules disabled
                        const newAccessMap = {
                            dashboard: false,
                            reservations: false, // Add reservations module
                            orders: false,
                            inventory: false,
                            menu: false,
                            staff: false,
                            website: false,
                            settings: false,
                            profile: false,
                            support: false
                        }

                        // Enable modules that are present in the response
                        data.modules.forEach((module: { id: string }) => {
                            if (Object.keys(newAccessMap).includes(module.id)) {
                                // @ts-ignore
                                newAccessMap[module.id] = true
                            }
                        })

                        console.log('Access map after processing:', newAccessMap)
                        setModuleAccess(newAccessMap)
                    }
                }
            } catch (error) {
                console.error("Error fetching module access:", error)
                toast({
                    title: "Error",
                    description: "Failed to load your available modules. Please try refreshing.",
                    variant: "destructive",
                })
            }
        }

        fetchModuleAccess()
    }, [toast])

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar
                className={`border-r border-gray-200 bg-white transition-all duration-300 ${collapsed ? 'w-[80px]' : 'w-[260px]'}`}
                defaultCollapsed={false}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center h-16 border-b px-4">
                        {!collapsed && <h2 className="text-lg font-semibold">Management</h2>}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setCollapsed(!collapsed)}
                            className="ml-auto"
                        >
                            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        </Button>
                    </div>
                    <SidebarList className="px-4 py-2">
                        {moduleAccess.dashboard && (
                            <SidebarItem active={pathname === "/dashboard/management"}>
                                <Link
                                    href="/dashboard/management"
                                    className="flex items-center gap-2 py-2"
                                >
                                    <LayoutDashboard size={20} />
                                    {!collapsed && <span>Dashboard</span>}
                                </Link>
                            </SidebarItem>
                        )}

                        {moduleAccess.reservations && (
                            <SidebarItem active={pathname.includes("/dashboard/reservations")}>
                                <Link
                                    href="/dashboard/reservations"
                                    className="flex items-center gap-2 py-2"
                                >
                                    <Utensils size={20} />
                                    {!collapsed && <span>Table Reservations</span>}
                                </Link>
                            </SidebarItem>
                        )}

                        {moduleAccess.orders && (
                            <SidebarItem active={pathname.includes("/dashboard/management/orders")}>
                                <Link
                                    href="/dashboard/management/orders"
                                    className="flex items-center gap-2 py-2"
                                >
                                    <ShoppingCart size={20} />
                                    {!collapsed && <span>Order Management</span>}
                                </Link>
                            </SidebarItem>
                        )}

                        {moduleAccess.inventory && (
                            <SidebarItem active={pathname.includes("/dashboard/management/inventory")}>
                                <Link
                                    href="/dashboard/management/inventory"
                                    className="flex items-center gap-2 py-2"
                                >
                                    <Package size={20} />
                                    {!collapsed && <span>Inventory Management</span>}
                                </Link>
                            </SidebarItem>
                        )}

                        {moduleAccess.menu && (
                            <SidebarItem active={pathname.includes("/dashboard/management/menu")}>
                                <Link
                                    href="/dashboard/management/menu"
                                    className="flex items-center gap-2 py-2"
                                >
                                    <MenuSquare size={20} />
                                    {!collapsed && <span>Menu Management</span>}
                                </Link>
                            </SidebarItem>
                        )}

                        {moduleAccess.staff && (
                            <SidebarItem active={pathname.includes("/dashboard/management/staff")}>
                                <Link
                                    href="/dashboard/management/staff"
                                    className="flex items-center gap-2 py-2"
                                >
                                    <Users size={20} />
                                    {!collapsed && <span>Staff Management</span>}
                                </Link>
                            </SidebarItem>
                        )}

                        {moduleAccess.website && (
                            <SidebarItem active={pathname.includes("/dashboard/management/website")}>
                                <Link
                                    href="/dashboard/management/website"
                                    className="flex items-center gap-2 py-2"
                                >
                                    <Globe size={20} />
                                    {!collapsed && <span>Website Management</span>}
                                </Link>
                            </SidebarItem>
                        )}

                        {moduleAccess.settings && (
                            <SidebarItem active={pathname.includes("/dashboard/management/settings")}>
                                <Link
                                    href="/dashboard/management/settings"
                                    className="flex items-center gap-2 py-2"
                                >
                                    <Settings size={20} />
                                    {!collapsed && <span>Settings</span>}
                                </Link>
                            </SidebarItem>
                        )}
                    </SidebarList>
                </div>
            </Sidebar>
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    )
} 