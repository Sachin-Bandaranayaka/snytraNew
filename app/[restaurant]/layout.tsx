"use client";

import { ReactNode } from "react";
import { RestaurantThemeProvider } from "@/context/restaurant-theme-context";
import RestaurantLayoutContent from "@/components/RestaurantLayoutContent";

// Wrapper component to provide the theme context
export default async function RestaurantLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: { restaurant: string };
}) {
    try {
        // Await the params to resolve the promise
        const resolvedParams = await Promise.resolve(params);
        const restaurantSlug = resolvedParams.restaurant;

        return (
            <RestaurantThemeProvider restaurantSlug={restaurantSlug}>
                <RestaurantLayoutContent restaurantSlug={restaurantSlug}>
                    {children}
                </RestaurantLayoutContent>
            </RestaurantThemeProvider>
        );
    } catch (error) {
        console.error("Error in restaurant layout:", error);
        // Provide a fallback UI
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold text-red-500">Error loading restaurant</h1>
                <p>We're having trouble loading this restaurant page.</p>
            </div>
        );
    }
} 