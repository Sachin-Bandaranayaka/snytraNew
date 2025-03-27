"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/dashboard/navbar";
import DashboardSidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
            />
            <div className="flex flex-1">
                <DashboardSidebar
                    isMobileOpen={isMobileSidebarOpen}
                    onMobileClose={closeMobileSidebar}
                />
                <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
} 