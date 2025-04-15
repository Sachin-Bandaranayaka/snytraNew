"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRestaurantTheme } from "@/context/restaurant-theme-context";

type MenuItem = {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    isVegetarian: boolean;
    isGlutenFree: boolean;
    isFeatured: boolean;
};

export default function MenuPage({ params }: { params: { restaurant: string } }) {
    const { settings, theme, isLoading } = useRestaurantTheme();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [vegetarianOnly, setVegetarianOnly] = useState<boolean>(false);
    const [glutenFreeOnly, setGlutenFreeOnly] = useState<boolean>(false);

    const primaryColor = settings?.primaryColor || "#e85c2c";
    const secondaryColor = settings?.secondaryColor || "#f5f1e9";
    const menuLayout = theme?.menuLayout || "grid";
    const buttonStyle = theme?.buttonStyle === 'pill'
        ? 'rounded-full'
        : theme?.buttonStyle === 'square'
            ? 'rounded-none'
            : 'rounded';

    // Fetch menu items
    useEffect(() => {
        const fetchMenuItems = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/${params.restaurant}/menu`);

                if (!response.ok) {
                    throw new Error("Failed to fetch menu items");
                }

                const data = await response.json();
                setMenuItems(data.items);

                // Extract unique categories
                const uniqueCategories = Array.from(
                    new Set(data.items.map((item: MenuItem) => item.category))
                );
                setCategories(["All", ...uniqueCategories]);

                setError(null);
            } catch (err: any) {
                console.error("Error fetching menu items:", err);
                setError(err.message || "Failed to load menu items");
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [params.restaurant]);

    // Apply filters
    useEffect(() => {
        let filtered = [...menuItems];

        // Filter by category
        if (selectedCategory !== "All") {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(
                item =>
                    item.name.toLowerCase().includes(lowerCaseQuery) ||
                    item.description.toLowerCase().includes(lowerCaseQuery)
            );
        }

        // Filter by dietary preferences
        if (vegetarianOnly) {
            filtered = filtered.filter(item => item.isVegetarian);
        }

        if (glutenFreeOnly) {
            filtered = filtered.filter(item => item.isGlutenFree);
        }

        setFilteredItems(filtered);
    }, [menuItems, selectedCategory, searchQuery, vegetarianOnly, glutenFreeOnly]);

    // Loading state
    if (isLoading || loading) {
        return (
            <div className="py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 p-6 rounded-lg text-red-700 text-center">
                        <h2 className="text-xl font-semibold mb-2">Error Loading Menu</h2>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Banner */}
                <div
                    className="relative h-[250px] w-full mb-8 rounded-lg overflow-hidden"
                    style={{ backgroundColor: secondaryColor }}
                >
                    <Image
                        src={settings?.bannerImageUrl || "/restaurant-menu-banner.jpg"}
                        alt="Menu Banner"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h1 className="text-white text-4xl font-bold">Our Menu</h1>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search our menu..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                            style={{
                                borderColor: primaryColor,
                                borderRadius: buttonStyle === 'pill' ? '9999px' : buttonStyle === 'square' ? '0' : '0.375rem'
                            }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <select
                            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white"
                            style={{
                                borderColor: primaryColor,
                                borderRadius: buttonStyle === 'pill' ? '9999px' : buttonStyle === 'square' ? '0' : '0.375rem'
                            }}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={vegetarianOnly}
                                onChange={() => setVegetarianOnly(!vegetarianOnly)}
                                className="h-4 w-4"
                                style={{ accentColor: primaryColor }}
                            />
                            <span>Vegetarian</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={glutenFreeOnly}
                                onChange={() => setGlutenFreeOnly(!glutenFreeOnly)}
                                className="h-4 w-4"
                                style={{ accentColor: primaryColor }}
                            />
                            <span>Gluten-Free</span>
                        </label>
                    </div>
                </div>

                {/* Menu Items */}
                {filteredItems.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold mb-2">No items found</h2>
                        <p className="text-gray-600">Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    <div
                        className={`grid gap-6 ${menuLayout === 'grid'
                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                : menuLayout === 'list'
                                    ? 'grid-cols-1'
                                    : 'grid-cols-1 md:grid-cols-2'
                            }`}
                    >
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className={`bg-white overflow-hidden ${menuLayout === 'grid'
                                        ? 'rounded-lg shadow'
                                        : menuLayout === 'list'
                                            ? 'flex gap-4 rounded-lg shadow p-4'
                                            : 'rounded-lg shadow-lg'
                                    }`}
                            >
                                {menuLayout === 'list' ? (
                                    <>
                                        <div className="relative h-24 w-24 flex-shrink-0">
                                            <Image
                                                src={item.imageUrl || "/placeholder-food.jpg"}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                                <span className="font-bold text-lg" style={{ color: primaryColor }}>
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                                            <div className="flex items-center gap-2">
                                                {item.isVegetarian && (
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Vegetarian</span>
                                                )}
                                                {item.isGlutenFree && (
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Gluten-Free</span>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={item.imageUrl || "/placeholder-food.jpg"}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                            {item.isFeatured && (
                                                <div
                                                    className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white rounded"
                                                    style={{ backgroundColor: primaryColor }}
                                                >
                                                    Featured
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                                <span className="font-bold text-lg" style={{ color: primaryColor }}>
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                                            <div className="flex items-center gap-2">
                                                {item.isVegetarian && (
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Vegetarian</span>
                                                )}
                                                {item.isGlutenFree && (
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Gluten-Free</span>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 