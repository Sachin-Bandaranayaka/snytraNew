"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    CreditCard,
    FileText,
    MessageSquare,
    Download,
    Settings,
    HelpCircle,
    ChevronLeft,
    Star
} from "lucide-react"

interface SidebarProps {
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

export default function DashboardSidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setCollapsed(true);
            }
        };

        // Initial check
        checkScreenSize();

        // Add event listener
        window.addEventListener('resize', checkScreenSize);

        // Clean up
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const navigationItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            title: "My Subscription",
            href: "/dashboard/subscription",
            icon: <Star size={20} />,
        },
        {
            title: "Billing",
            href: "/dashboard/billing",
            icon: <CreditCard size={20} />,
        },
        {
            title: "Invoices",
            href: "/dashboard/invoices",
            icon: <FileText size={20} />,
        },
        {
            title: "Support Tickets",
            href: "/dashboard/tickets",
            icon: <MessageSquare size={20} />,
        },
        {
            title: "Downloads",
            href: "/dashboard/downloads",
            icon: <Download size={20} />,
        },
    ];

    const secondaryNavItems = [
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: <Settings size={20} />,
        },
        {
            title: "Help & Support",
            href: "/dashboard/support",
            icon: <HelpCircle size={20} />,
        },
    ];

    const sidebarClass = cn(
        "bg-white border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto transition-all z-30",
        collapsed ? "w-16" : "w-64",
        isMobile ? (isMobileOpen ? "fixed left-0 top-16" : "fixed -left-64 top-16") : "sticky top-16",
        isMobile && isMobileOpen ? "shadow-xl" : ""
    );

    const handleLinkClick = () => {
        if (isMobile && onMobileClose) {
            onMobileClose();
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            {isMobile && isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-20 md:hidden"
                    onClick={onMobileClose}
                />
            )}

            <aside className={sidebarClass}>
                <div className="p-4">
                    {!isMobile && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCollapsed(!collapsed)}
                            className="mb-6 ml-auto block"
                        >
                            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed ? "rotate-180" : "")} />
                        </Button>
                    )}

                    <nav className="space-y-1">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={handleLinkClick}
                                className={cn(
                                    "flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100",
                                    pathname === item.href
                                        ? "bg-gray-100 text-gray-900 font-medium"
                                        : "",
                                    collapsed ? "justify-center" : "justify-start"
                                )}
                            >
                                <span className="flex-shrink-0">{item.icon}</span>
                                {!collapsed && <span className="ml-3">{item.title}</span>}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8 pt-4 border-t border-gray-200">
                        <nav className="space-y-1">
                            {secondaryNavItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={cn(
                                        "flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100",
                                        pathname === item.href
                                            ? "bg-gray-100 text-gray-900 font-medium"
                                            : "",
                                        collapsed ? "justify-center" : "justify-start"
                                    )}
                                >
                                    <span className="flex-shrink-0">{item.icon}</span>
                                    {!collapsed && <span className="ml-3">{item.title}</span>}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
} 