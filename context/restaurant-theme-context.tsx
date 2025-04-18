"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";

type CompanySettings = {
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    siteTitle?: string;
    siteDescription?: string;
    businessHours?: string;
    address?: string;
    phone?: string;
    email?: string;
    socialMedia?: any;
    customDomain?: string;
    faviconUrl?: string;
    bannerImageUrl?: string;
    footerText?: string;
    metaDescription?: string;
    googleAnalyticsId?: string;
};

type ThemeSettings = {
    fontFamily?: string;
    menuLayout?: string;
    heroStyle?: string;
    accentColor?: string;
    buttonStyle?: string;
    customCSS?: string;
};

type RestaurantThemeContextType = {
    settings: CompanySettings;
    theme: ThemeSettings;
    isLoading: boolean;
    error: string | null;
    updateSettings: (newSettings: Partial<CompanySettings>) => Promise<void>;
    updateTheme: (newTheme: Partial<ThemeSettings>) => Promise<void>;
    refreshTheme: () => Promise<void>;
};

const defaultContext: RestaurantThemeContextType = {
    settings: {},
    theme: {},
    isLoading: true,
    error: null,
    updateSettings: async () => { },
    updateTheme: async () => { },
    refreshTheme: async () => { },
};

const RestaurantThemeContext = createContext<RestaurantThemeContextType>(defaultContext);

export const useRestaurantTheme = () => useContext(RestaurantThemeContext);

export const RestaurantThemeProvider = ({ children, restaurantSlug }: { children: ReactNode, restaurantSlug?: string }) => {
    const [settings, setSettings] = useState<CompanySettings>({});
    const [theme, setTheme] = useState<ThemeSettings>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastFetched, setLastFetched] = useState<number>(0);
    const isFetchingRef = useRef<boolean>(false);
    const hasLoadedOnceRef = useRef<boolean>(false);

    const getThemeEndpoint = () => {
        let endpoint = '/api/restaurant-theme';

        // If we're on the public-facing site, use the restaurant-specific endpoint
        if (restaurantSlug) {
            // Check if restaurantSlug is literally 'restaurant' (which might be causing issues with dynamic routes)
            const slug = restaurantSlug === 'restaurant' ? 'default-restaurant' : restaurantSlug;
            endpoint = `/api/${slug}/theme`;
        }

        return endpoint;
    };

    const fetchThemeData = async (forceRefresh = false) => {
        // Prevent concurrent fetches and throttle requests
        if (isFetchingRef.current) return;

        // If it's been less than 5 seconds (reduced from 10s) since the last fetch 
        // and we're not forcing a refresh and we've already loaded data once, skip the fetch
        const now = Date.now();
        if (!forceRefresh &&
            (now - lastFetched < 5000) &&
            Object.keys(settings).length > 0 &&
            hasLoadedOnceRef.current) {
            return;
        }

        isFetchingRef.current = true;
        setIsLoading(!hasLoadedOnceRef.current); // Only show loading state on first load
        setError(null);

        try {
            const endpoint = getThemeEndpoint();
            // Always add a cache-busting query parameter to prevent browser caching
            const url = `${endpoint}?t=${Date.now()}`;

            const response = await fetch(url, {
                // Add cache control headers to prevent caching
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                },
                // Skip cache on force refresh
                cache: forceRefresh ? 'no-store' : 'default'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch theme data');
            }

            const data = await response.json();

            // Only update if we got valid data
            if (data && (data.settings || data.theme)) {
                console.log("Theme data updated at", new Date().toISOString());
                setSettings(data.settings || {});
                setTheme(data.theme || {});
                setLastFetched(now);
                hasLoadedOnceRef.current = true;
            } else {
                console.warn("Received empty theme data");
            }
        } catch (err: any) {
            console.error('Error fetching restaurant theme:', err);
            setError(err.message || 'Failed to load theme settings');
        } finally {
            setIsLoading(false);
            isFetchingRef.current = false;
        }
    };

    // Refresh theme data on demand (useful for previews)
    const refreshTheme = async () => {
        await fetchThemeData(true);
    };

    useEffect(() => {
        // Reset state when slug changes
        setSettings({});
        setTheme({});
        hasLoadedOnceRef.current = false;
        setIsLoading(true);

        fetchThemeData();

        // Set up an interval to refresh the theme every 30 seconds if this is a preview
        // but only if it's not already fetched and cached
        let refreshInterval: NodeJS.Timeout | null = null;
        if (restaurantSlug === 'preview' && typeof window !== 'undefined') {
            refreshInterval = setInterval(() => {
                // Use a debounced refresh to avoid hammering the API
                if (!isFetchingRef.current && Date.now() - lastFetched > 30000) {
                    fetchThemeData(true);
                }
            }, 30000);
        }

        return () => {
            if (refreshInterval) {
                clearInterval(refreshInterval);
            }
        };
    }, [restaurantSlug]);

    const updateSettings = async (newSettings: Partial<CompanySettings>) => {
        try {
            const response = await fetch('/api/restaurant-theme', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    settings: newSettings,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update settings');
            }

            // Update local state
            setSettings((prev) => ({ ...prev, ...newSettings }));

            // Refresh to ensure we have the latest data, but after a small delay
            setTimeout(() => {
                fetchThemeData(true);
            }, 500);
        } catch (err: any) {
            console.error('Error updating settings:', err);
            setError(err.message || 'Failed to update settings');
        }
    };

    const updateTheme = async (newTheme: Partial<ThemeSettings>) => {
        try {
            const response = await fetch('/api/restaurant-theme', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    theme: newTheme,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update theme');
            }

            // Update local state
            setTheme((prev) => ({ ...prev, ...newTheme }));

            // Refresh to ensure we have the latest data, but after a small delay
            setTimeout(() => {
                fetchThemeData(true);
            }, 500);
        } catch (err: any) {
            console.error('Error updating theme:', err);
            setError(err.message || 'Failed to update theme');
        }
    };

    return (
        <RestaurantThemeContext.Provider
            value={{
                settings,
                theme,
                isLoading,
                error,
                updateSettings,
                updateTheme,
                refreshTheme,
            }}
        >
            {children}
        </RestaurantThemeContext.Provider>
    );
}; 