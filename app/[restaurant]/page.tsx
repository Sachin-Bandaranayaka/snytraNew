"use client";

import Link from "next/link";
import Image from "next/image";

export default function RestaurantHome() {
    return (
        <div>
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
                    <div className="flex-1 mb-8 md:mb-0 pr-0 md:pr-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#e85c2c] mb-4">
                            Taste the Difference.<br />
                            Experience the Flavor.
                        </h1>
                        <p className="text-gray-700 mb-8">Dine-in, Order, and Reserve Effortlessly.</p>
                        <div className="flex space-x-4">
                            <Link
                                href="/menu"
                                className="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                View Menu
                            </Link>
                            <Link
                                href="/reservations"
                                className="bg-[#e85c2c] text-white px-6 py-3 rounded-md hover:bg-[#d04b1c] transition-colors"
                            >
                                Reserve a Table
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 relative w-full h-[250px] md:h-[400px]">
                        <Image
                            src="/restaurant-interior.jpg"
                            alt="Restaurant Interior"
                            fill
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Restaurant Features */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-[#e85c2c] mb-12">
                        Restaurant Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-red-100 p-3 rounded-full">
                                    <svg
                                        className="h-6 w-6 text-[#e85c2c]"
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
                                <div className="bg-red-100 p-3 rounded-full">
                                    <svg
                                        className="h-6 w-6 text-[#e85c2c]"
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
                                <div className="bg-red-100 p-3 rounded-full">
                                    <svg
                                        className="h-6 w-6 text-[#e85c2c]"
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
                                <div className="bg-red-100 p-3 rounded-full">
                                    <svg
                                        className="h-6 w-6 text-[#e85c2c]"
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
            <section className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#e85c2c] mb-2">
                            Popular Dishes
                        </h2>
                        <p className="text-gray-700">Our best seller</p>
                    </div>

                    <div className="flex justify-center mb-8">
                        <Link
                            href="/menu"
                            className="bg-[#e85c2c] text-white px-6 py-3 rounded-md hover:bg-[#d04b1c] transition-colors"
                        >
                            Order Now
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg">
                                <div className="relative w-full h-40 mb-3">
                                    <Image
                                        src={index % 2 === 0 ? "/burger.jpg" : "/pizza.jpg"}
                                        alt={index % 2 === 0 ? "Burger" : "Pizza"}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <h3 className="font-medium text-gray-800 mb-2">
                                    {index % 2 === 0 ? "Burger" : "Pizza"}
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

            {/* Customer Reviews */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-[#e85c2c] mb-4">
                        Customer Reviews
                    </h2>
                    <p className="text-center text-gray-700 mb-10">What our customers says about us.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 relative mr-4">
                                        <Image
                                            src="/avatar.jpg"
                                            alt="Customer"
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Alex</h3>
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
                                    Great food, great service! The burgers are incredible. Will definitely be back!
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="h-[300px] w-full bg-gray-200 rounded-lg">
                        {/* In a real implementation, you would integrate a map service like Google Maps */}
                        <div className="h-full w-full flex items-center justify-center">
                            <p className="text-gray-500">Restaurant location map</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 