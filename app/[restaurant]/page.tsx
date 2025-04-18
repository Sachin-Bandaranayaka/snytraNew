"use client";

import Link from "next/link";
import Image from "next/image";
import { useRestaurantTheme } from "@/context/restaurant-theme-context";
import { useState, useEffect } from "react";

export default function RestaurantHome() {
    const { settings, theme } = useRestaurantTheme();
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Create placeholders for missing images
    const placeholderImages = {
        hero: settings?.heroImage || "https://placehold.co/1200x600?text=Restaurant+Hero",
        food: ["https://placehold.co/600x400?text=Food+Item", "https://placehold.co/600x400?text=Food+Item"],
        avatar: "https://placehold.co/100x100?text=Avatar"
    };

    useEffect(() => {
        // Mark images as loaded to prevent layout shift
        setImagesLoaded(true);
    }, []);

    // Apply theme settings if available
    const primaryColor = settings?.primaryColor || "#e85c2c";
    const secondaryColor = settings?.secondaryColor || "#f8f5eb";
    const accentColor = theme?.accentColor || "#1a1a0f";
    const buttonStyle = theme?.buttonStyle || "rounded";

    const getBorderRadius = () => {
        switch (buttonStyle) {
            case "squared": return "rounded-none";
            case "pill": return "rounded-full";
            default: return "rounded-md";
        }
    };

    const borderRadius = getBorderRadius();

    return (
        <div style={{
            backgroundColor: secondaryColor,
            color: accentColor
        }}>
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
                    <div className="flex-1 mb-8 md:mb-0 pr-0 md:pr-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: primaryColor }}>
                            {settings?.siteTitle || "Restaurant Name"}
                        </h1>
                        <p className="text-gray-700 mb-8">Dine-in, Order, and Reserve Effortlessly.</p>
                        <div className="flex space-x-4">
                            <Link
                                href="#menu"
                                className={`bg-white border border-gray-300 text-gray-800 px-6 py-3 ${borderRadius} hover:bg-gray-50 transition-colors`}
                            >
                                View Menu
                            </Link>
                            <Link
                                href="#contact"
                                className={`px-6 py-3 ${borderRadius} hover:opacity-90 transition-colors text-white`}
                                style={{ backgroundColor: primaryColor }}
                            >
                                Reserve a Table
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 relative w-full h-[250px] md:h-[400px]">
                        <Image
                            src={placeholderImages.hero}
                            alt="Restaurant Interior"
                            fill
                            className="object-cover rounded-lg"
                            priority
                            onError={(e) => {
                                // Fallback to placeholder on error
                                e.currentTarget.src = "https://placehold.co/1200x600?text=Restaurant+Hero";
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Restaurant Features */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: primaryColor }}>
                        Restaurant Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                                    <svg
                                        className="h-6 w-6"
                                        style={{ color: primaryColor }}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M4 5h16v2H4V5zm0 4h16v2H4V9zm0 4h16v2H4v-2zm0 4h12v2H4v-2z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-gray-800 font-medium">Scan & Order Effortlessly</h3>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                                    <svg
                                        className="h-6 w-6"
                                        style={{ color: primaryColor }}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1-8h4v2h-6V7h2v5z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-gray-800 font-medium">Secure & Easy Payments</h3>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                                    <svg
                                        className="h-6 w-6"
                                        style={{ color: primaryColor }}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-gray-800 font-medium">Earn Loyalty Points on Every Visit</h3>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                                    <svg
                                        className="h-6 w-6"
                                        style={{ color: primaryColor }}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M17 3h4v2h-4V3zm-1 4V3H4v4h12zm4 4v-2h-4v2h4zM4 11V7h10v4H4zm12 4v-4h4v4h-4zM4 15v-4h8v4H4zm12 4v-4h4v4h-4zM4 19v-4h6v4H4z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-gray-800 font-medium">Hassle-Free Reservations</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Dishes */}
            <section className="py-12 md:py-16" id="menu">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                            Popular Dishes
                        </h2>
                        <p className="text-gray-700">Our best sellers</p>
                    </div>

                    <div className="flex justify-center mb-8">
                        <Link
                            href="#order"
                            className={`text-white px-6 py-3 ${borderRadius} hover:opacity-90 transition-colors`}
                            style={{ backgroundColor: primaryColor }}
                        >
                            Order Now
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg">
                                <div className="relative w-full h-40 mb-3">
                                    <Image
                                        src={placeholderImages.food[index % 2]}
                                        alt={`Food item ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://placehold.co/600x400?text=Food+Item";
                                        }}
                                    />
                                </div>
                                <h3 className="font-medium text-gray-800 mb-2">
                                    {index % 2 === 0 ? "Signature Dish" : "Special Pizza"}
                                </h3>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="h-5 w-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            {settings?.aboutText && (
                <section className="py-12 md:py-16 bg-white">
                    <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: primaryColor }}>
                            About Us
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {settings.aboutText}
                        </p>
                    </div>
                </section>
            )}

            {/* Customer Reviews */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: primaryColor }}>
                        Customer Reviews
                    </h2>
                    <p className="text-center text-gray-700 mb-10">What our customers say about us.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 relative mr-4">
                                        <Image
                                            src={placeholderImages.avatar}
                                            alt="Customer"
                                            fill
                                            className="object-cover rounded-full"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://placehold.co/100x100?text=Avatar";
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Customer {index + 1}</h3>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="h-4 w-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    Great food, great service! Will definitely be back again.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-12 md:py-16" id="contact">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ color: primaryColor }}>
                        Visit Us
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-xl font-bold mb-4">Contact Information</h3>

                                {settings?.address && (
                                    <div className="flex items-start mb-4">
                                        <svg className="h-5 w-5 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <p className="font-medium">Address</p>
                                            <p className="text-gray-600">{settings.address}</p>
                                        </div>
                                    </div>
                                )}

                                {settings?.contactNumber && (
                                    <div className="flex items-start mb-4">
                                        <svg className="h-5 w-5 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <div>
                                            <p className="font-medium">Phone</p>
                                            <p className="text-gray-600">{settings.contactNumber}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start">
                                    <svg className="h-5 w-5 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Hours</p>
                                        <p className="text-gray-600">Open daily: 10:00 AM - 10:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-[300px] md:h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                            <div className="h-full w-full flex items-center justify-center">
                                <p className="text-gray-500">Restaurant location map</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-white" style={{ backgroundColor: accentColor }}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <p className="mb-4">{settings?.siteTitle || "Restaurant Name"} © {new Date().getFullYear()}</p>
                    <p className="text-sm opacity-75">Website powered by Snytra</p>
                </div>
            </footer>
        </div>
    );
} 