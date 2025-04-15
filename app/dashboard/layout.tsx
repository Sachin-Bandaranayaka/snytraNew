"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/navbar";
import DashboardSidebar from "@/components/dashboard/sidebar";
import Link from "next/link";
import { SettingsIcon, PaletteIcon } from "@/components/icons/icons";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Only show sidebar on standard client dashboard pages, not management pages
    const showSidebar = !pathname.includes('/dashboard/management');

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const closeMobileSidebar = () => {
        setIsMobileSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <DashboardNavbar
                onMobileMenuToggle={toggleMobileSidebar}
                isMobileMenuOpen={isMobileSidebarOpen}
                showMenuToggle={showSidebar}
            >
                <Link
                    href="/dashboard/settings"
                    className="flex items-center px-3 py-2 text-sm transition-colors rounded-lg hover:text-foreground hover:bg-accent"
                >
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Account Settings
                </Link>
                <Link
                    href="/dashboard/settings/appearance"
                    className="flex items-center px-3 py-2 text-sm transition-colors rounded-lg hover:text-foreground hover:bg-accent"
                >
                    <PaletteIcon className="w-4 h-4 mr-2" />
                    Appearance
                </Link>
            </DashboardNavbar>
            <div className="flex flex-1">
                {showSidebar && (
                    <DashboardSidebar
                        isMobileOpen={isMobileSidebarOpen}
                        onMobileClose={closeMobileSidebar}
                    />
                )}
                <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
} 