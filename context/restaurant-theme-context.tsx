"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

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
};

const defaultContext: RestaurantThemeContextType = {
    settings: {},
    theme: {},
    isLoading: true,
    error: null,
    updateSettings: async () => { },
    updateTheme: async () => { },
};

const RestaurantThemeContext = createContext<RestaurantThemeContextType>(defaultContext);

export const useRestaurantTheme = () => useContext(RestaurantThemeContext);

export const RestaurantThemeProvider = ({ children, restaurantSlug }: { children: ReactNode, restaurantSlug?: string }) => {
    const [settings, setSettings] = useState<CompanySettings>({});
    const [theme, setTheme] = useState<ThemeSettings>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchThemeData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            let endpoint = '/api/restaurant-theme';

            // If we're on the public-facing site, use the restaurant-specific endpoint
            if (restaurantSlug) {
                endpoint = `/api/${restaurantSlug}/theme`;
            }

            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error('Failed to fetch theme data');
            }

            const data = await response.json();
            setSettings(data.settings || {});
            setTheme(data.theme || {});
        } catch (err: any) {
            console.error('Error fetching restaurant theme:', err);
            setError(err.message || 'Failed to load theme settings');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchThemeData();
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
            }}
        >
            {children}
        </RestaurantThemeContext.Provider>
    );
}; 