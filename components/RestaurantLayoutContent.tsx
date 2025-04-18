"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { useRestaurantTheme } from "@/context/restaurant-theme-context";

// Component that uses the theme context
export default function RestaurantLayoutContent({
    children,
    restaurantSlug,
}: {
    children: ReactNode;
    restaurantSlug: string;
}) {
    const { settings, theme, isLoading } = useRestaurantTheme();

    // Default colors in case settings haven't loaded yet
    const primaryColor = settings?.primaryColor || "#e85c2c";
    const secondaryColor = settings?.secondaryColor || "#f5f1e9";
    const accentColor = theme?.accentColor || "#1a1a0f";

    // CSS variables for dynamic theming
    const cssVariables = {
        '--primary': primaryColor,
        '--secondary': secondaryColor,
        '--accent': accentColor,
    };

    // Use site title if available, otherwise use restaurant name
    const siteTitle = settings?.siteTitle || restaurantSlug;

    // Dynamic style for buttons based on theme
    const buttonStyle = theme?.buttonStyle === 'pill'
        ? 'rounded-full'
        : theme?.buttonStyle === 'square'
            ? 'rounded-none'
            : 'rounded';

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading {restaurantSlug}...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={cssVariables}>
            {/* Header/Navbar */}
            <header className="bg-accent text-primary-foreground" className="text-white py-4 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href={`/${restaurantSlug}`} className="flex items-center">
                        <div className="relative h-12 w-12">
                            <Image
                                src={settings?.logoUrl || "/logo.png"}
                                alt={`${siteTitle} Logo`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        {siteTitle && <span className="ml-2 font-semibold">{siteTitle}</span>}
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href={`/${restaurantSlug}`} className="hover:text-orange-300 transition-colors">
                            Home
                        </Link>
                        <Link href={`/${restaurantSlug}/about`} className="hover:text-orange-300 transition-colors">
                            About Us
                        </Link>
                        <Link href={`/${restaurantSlug}/menu`} className="hover:text-orange-300 transition-colors">
                            Menu
                        </Link>
                        <Link href={`/${restaurantSlug}/reservations`} className="hover:text-orange-300 transition-colors">
                            Reservations
                        </Link>
                        <Link href={`/${restaurantSlug}/contact`} className="hover:text-orange-300 transition-colors">
                            Contact Us
                        </Link>
                    </nav>

                    <Link
                        href={`/${restaurantSlug}/signup`}
                        className={`text-white px-4 py-2 ${buttonStyle} hover:opacity-90 transition-colors`}
                        className="bg-[var(--primary)] text-white hover:opacity-90"
                    >
                        Sign Up
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-secondary" className="border-t border-gray-200 pt-10 pb-5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                        <div className="col-span-1">
                            <div className="flex items-center mb-4">
                                <div className="relative h-10 w-10 mr-2">
                                    <Image
                                        src={settings?.logoUrl || "/logo.png"}
                                        alt={`${siteTitle} Logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                {siteTitle && <span className="font-semibold">{siteTitle}</span>}
                            </div>
                            <p className="text-gray-700 text-sm mb-2">
                                {settings?.footerText || "Empowering restaurants, one table at a time."}
                            </p>
                            <p className="text-gray-700 text-sm">Discover seamless dining with Our App</p>
                        </div>

                        <div className="col-span-1">
                            <h3 className="font-medium text-gray-900 mb-4">Features</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li><Link href="#">Reservation system</Link></li>
                                <li><Link href="#">Table management</Link></li>
                                <li><Link href="#">CRM and guest profiles</Link></li>
                                <li><Link href="#">Waitlist</Link></li>
                            </ul>
                        </div>

                        <div className="col-span-1">
                            <h3 className="font-medium text-gray-900 mb-4">Company</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li><Link href={`/${restaurantSlug}/about`}>About us</Link></li>
                                <li><Link href={`/${restaurantSlug}/contact`}>Contact us</Link></li>
                                <li><Link href="#">Privacy policy</Link></li>
                                <li><Link href="#">Terms of service</Link></li>
                                <li><Link href="#">Careers</Link></li>
                                <li><Link href="#">Pricing</Link></li>
                            </ul>
                        </div>

                        <div className="col-span-1">
                            <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li><Link href="#">Blog</Link></li>
                                <li><Link href="#">Research</Link></li>
                                <li><Link href="#">Success stories</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-5">
                        <p className="text-center text-sm text-gray-700">© {new Date().getFullYear()} {siteTitle}. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Custom CSS if provided */}
            {theme?.customCSS && (
                <style jsx global>{`
                    ${theme.customCSS}
                `}</style>
            )}
        </div>
    );
}