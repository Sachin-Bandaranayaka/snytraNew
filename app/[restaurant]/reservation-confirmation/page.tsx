"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useRestaurantTheme } from "@/context/restaurant-theme-context";
import { use } from "react";

export default function ReservationConfirmationPage({ params }: { params: Promise<{ restaurant: string }> }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { settings, theme } = useRestaurantTheme();

    // Use React.use to unwrap the params Promise in client components
    const resolvedParams = use(params);
    const restaurantSlug = resolvedParams.restaurant;

    // Colors from theme
    const primaryColor = settings?.primaryColor || "#e85c2c";
    const secondaryColor = settings?.secondaryColor || "#f5f1e9";

    // In a real application, you would fetch the reservation details based on an ID
    // For now, we're just showing a confirmation page with generic text

    return (
        <div className="py-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Banner */}
                <div className="relative h-[200px] w-full mb-8 rounded-lg overflow-hidden">
                    <Image
                        src={settings?.bannerImageUrl || "/banner.jpg"}
                        alt="Reservation Confirmation Banner"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h1 className="text-white text-4xl font-bold">Reservation Confirmed</h1>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-center mb-4">Thank You for Your Reservation!</h2>

                    <p className="text-center text-gray-600 mb-6">
                        We've sent a confirmation email with all the details. We look forward to serving you!
                    </p>

                    <div className="border-t border-b border-gray-200 py-6 my-6">
                        <h3 className="text-lg font-medium mb-4">Reservation Summary</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Restaurant</p>
                                <p className="font-medium">{settings?.restaurantName || "Restaurant Name"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium">{settings?.address || "123 Main Street, Cityville"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Date & Time</p>
                                <p className="font-medium">Your selected date and time</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Party Size</p>
                                <p className="font-medium">Your selected party size</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Reservation Code</p>
                                <p className="font-medium">ABC12345</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Table</p>
                                <p className="font-medium">Your selected table</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <h3 className="text-lg font-medium">Need to make changes?</h3>
                        <p className="text-gray-600">
                            If you need to modify or cancel your reservation, please contact us directly:
                        </p>
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: primaryColor }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span>{settings?.phone || "(123) 456-7890"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: primaryColor }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span>{settings?.email || "info@restaurant.com"}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${restaurantSlug}`}
                            className="px-6 py-3 rounded-md text-center font-medium transition-colors"
                            style={{ backgroundColor: secondaryColor, color: primaryColor }}
                        >
                            Return to Homepage
                        </Link>
                        <Link
                            href={`/${restaurantSlug}/menu`}
                            className="px-6 py-3 rounded-md text-center font-medium transition-colors text-white"
                            style={{ backgroundColor: primaryColor }}
                        >
                            View Our Menu
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 