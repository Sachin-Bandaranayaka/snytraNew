"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useRestaurantTheme } from "@/context/restaurant-theme-context";

interface Table {
    id: number;
    tableNumber: string;
    capacity: number;
    location: string;
    status: string;
}

export default function ReservationsPage({ params }: { params: { restaurant: string } }) {
    const router = useRouter();
    const { settings, theme } = useRestaurantTheme();
    const [tables, setTables] = useState<Table[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
        tableId: "",
        specialRequests: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch available tables
    useEffect(() => {
        const fetchTables = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/${params.restaurant}/tables?status=available`);

                if (!response.ok) {
                    throw new Error("Failed to fetch available tables");
                }

                const data = await response.json();
                setTables(data.tables || []);
                setError(null);
            } catch (err) {
                console.error("Error fetching tables:", err);
                setError("Unable to load available tables. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTables();
    }, [params.restaurant]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setFormSubmitted(true);

            // Reset form after 3 seconds and redirect
            setTimeout(() => {
                setFormSubmitted(false);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    date: "",
                    time: "",
                    guests: 2,
                    tableId: "",
                    specialRequests: "",
                });
                router.push(`/${params.restaurant}/reservation-confirmation`);
            }, 3000);
        }, 1500);
    };

    // Generate available time slots
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 11; hour <= 21; hour++) {
            const hourFormatted = hour > 12 ? hour - 12 : hour;
            const amPm = hour >= 12 ? 'PM' : 'AM';
            slots.push(`${hourFormatted}:00 ${amPm}`);
            slots.push(`${hourFormatted}:30 ${amPm}`);
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    // Colors from theme
    const primaryColor = settings?.primaryColor || "#e85c2c";
    const secondaryColor = settings?.secondaryColor || "#f5f1e9";

    return (
        <div className="py-8 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Banner */}
                <div className="relative h-[200px] w-full mb-8 rounded-lg overflow-hidden">
                    <Image
                        src={settings?.bannerImageUrl || "/restaurant-interior.jpg"}
                        alt="Reservations Banner"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h1 className="text-white text-4xl font-bold">Make a Reservation</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Form section */}
                    <div className="lg:col-span-3">
                        {formSubmitted ? (
                            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <h2 className="text-2xl font-semibold text-center text-green-800 mb-2">Reservation Confirmed!</h2>
                                <p className="text-center text-green-700">
                                    Thank you for your reservation. We've sent a confirmation email to {formData.email}.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-2xl font-semibold mb-6">Reservation Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                                            style={{ borderColor: "gray", "--tw-ring-color": primaryColor } as any}
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                                            style={{ borderColor: "gray", "--tw-ring-color": primaryColor } as any}
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                                        style={{ borderColor: "gray", "--tw-ring-color": primaryColor } as any}
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                                            style={{ borderColor: "gray", "--tw-ring-color": primaryColor } as any}
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                                            Time *
                                        </label>
                                        <select
                                            id="time"
                                            name="time"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                                            style={{ borderColor: "gray", "--tw-ring-color": primaryColor } as any}
                                            value={formData.time}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select time</option>
                                            {timeSlots.map((time) => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                                            Number of Guests *
                                        </label>
                                        <select
                                            id="guests"
                                            name="guests"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                                            style={{ borderColor: "gray", "--tw-ring-color": primaryColor } as any}
                                            value={formData.guests}
                                            onChange={handleChange}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                                            ))}
                                            <option value="11">More than 10 people</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Table selection */}
                                {!loading && tables.length > 0 && (
                                    <div className="mb-4">
                                        <label htmlFor="tableId" className="block text-sm font-medium text-gray-700 mb-1">
                                            Select a Table *
                                        </label>
                                        <select
                                            id="tableId"
                                            name="tableId"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                                            style={{ borderColor: "gray", "--tw-ring-color": primaryColor } as any}
                                            value={formData.tableId}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a table</option>
                                            {tables.map((table) => (
                                                <option key={table.id} value={table.id}>
                                                    Table {table.tableNumber} - {table.capacity} {table.capacity === 1 ? 'person' : 'people'}
                                                    {table.location ? ` - ${table.location}` : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {loading && (
                                    <div className="mb-4 p-4 bg-gray-50 rounded-md">
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded"></div>
                                                <div className="h-4 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">Loading available tables...</p>
                                    </div>
                                )}

                                {!loading && error && (
                                    <div className="mb-4 p-4 bg-red-50 rounded-md">
                                        <p className="text-sm text-red-500">{error}</p>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                                        Special Requests (optional)
                                    </label>
                                    <textarea
                                        id="specialRequests"
                                        name="specialRequests"
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                                        style={{ borderColor: "gray", "--tw-ring-color": primaryColor } as any}
                                        value={formData.specialRequests}
                                        onChange={handleChange}
                                        placeholder="Allergies, special occasions, seating preferences, etc."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 px-6 rounded-md flex items-center justify-center font-medium transition-colors text-white"
                                    style={{
                                        backgroundColor: isSubmitting ? `${primaryColor}80` : primaryColor,
                                        cursor: isSubmitting ? "not-allowed" : "pointer"
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        "Book Now"
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Information section */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Reservation Information</h3>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: primaryColor }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <div>
                                        <h4 className="font-medium">Hours of Operation</h4>
                                        <p className="text-gray-600">
                                            {settings?.businessHours || "Monday - Thursday: 11:00 AM - 10:00 PM\nFriday - Saturday: 11:00 AM - 11:00 PM\nSunday: 11:00 AM - 9:00 PM"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: primaryColor }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <div>
                                        <h4 className="font-medium">Location</h4>
                                        <p className="text-gray-600">
                                            {settings?.address || "123 Main Street\nCityville, State 12345"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: primaryColor }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <div>
                                        <h4 className="font-medium">Contact</h4>
                                        <p className="text-gray-600">
                                            Phone: {settings?.phone || "(123) 456-7890"}<br />
                                            Email: {settings?.email || "info@restaurant.com"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: primaryColor }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <div>
                                        <h4 className="font-medium">Reservation Policy</h4>
                                        <ul className="text-gray-600 list-disc ml-4 mt-1 space-y-1">
                                            <li>Reservations can be made up to 30 days in advance</li>
                                            <li>We hold reservations for 15 minutes past the reservation time</li>
                                            <li>For parties of 8 or more, please call us directly</li>
                                            <li>Cancellations should be made at least 24 hours in advance</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 