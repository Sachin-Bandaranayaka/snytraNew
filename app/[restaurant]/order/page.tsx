"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type MenuItem = {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    quantity: number;
};

export default function OrderPage() {
    const [cartItems, setCartItems] = useState<MenuItem[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Sample cart items for demonstration
    useEffect(() => {
        // In a real app, this would be loaded from localStorage or state management
        const initialItems: MenuItem[] = [
            {
                id: 1,
                name: "Classic Burger",
                price: 12.99,
                description: "Beef patty, lettuce, tomato, onions, pickles, and special sauce",
                imageUrl: "/burger.jpg",
                category: "Main Courses",
                quantity: 2,
            },
            {
                id: 3,
                name: "Caesar Salad",
                price: 9.99,
                description: "Romaine lettuce, croutons, parmesan cheese with Caesar dressing",
                imageUrl: "/salad.jpg",
                category: "Appetizers",
                quantity: 1,
            },
            {
                id: 6,
                name: "Iced Tea",
                price: 2.99,
                description: "Refreshing iced tea with lemon",
                imageUrl: "/drink.jpg",
                category: "Beverages",
                quantity: 2,
            },
        ];

        setCartItems(initialItems);
    }, []);

    // Calculate totals whenever cart items change
    useEffect(() => {
        const calculatedSubtotal = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        const calculatedTax = calculatedSubtotal * 0.08; // 8% tax rate
        const calculatedTotal = calculatedSubtotal + calculatedTax;

        setSubtotal(calculatedSubtotal);
        setTax(calculatedTax);
        setTotal(calculatedTotal);
    }, [cartItems]);

    const updateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setCartItems(
            cartItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (itemId: number) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
    };

    const handleCheckout = () => {
        setIsCheckingOut(true);

        // Simulate API call to process order
        setTimeout(() => {
            setIsCheckingOut(false);
            setOrderPlaced(true);

            // In a real app, clear cart after successful checkout
            setTimeout(() => {
                setCartItems([]);
            }, 3000);
        }, 2000);
    };

    return (
        <div className="py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Order</h1>

                {orderPlaced ? (
                    <div className="bg-green-50 p-8 rounded-lg border border-green-200 text-center">
                        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h2 className="text-2xl font-semibold text-green-800 mb-4">Order Placed Successfully!</h2>
                        <p className="text-green-700 mb-6">
                            Your order has been received and is being prepared. You will receive a notification when it's ready.
                        </p>
                        <div className="text-center">
                            <Link
                                href="/menu"
                                className="bg-[#e85c2c] text-white px-6 py-3 rounded-md inline-block hover:bg-[#d04b1c] transition-colors"
                            >
                                Back to Menu
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            {cartItems.length === 0 ? (
                                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
                                    <p className="text-gray-600 mb-6">
                                        Looks like you haven't added any items to your cart yet.
                                    </p>
                                    <Link
                                        href="/menu"
                                        className="bg-[#e85c2c] text-white px-6 py-3 rounded-md inline-block hover:bg-[#d04b1c] transition-colors"
                                    >
                                        Browse Menu
                                    </Link>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-sm divide-y">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                                            <div className="relative h-20 w-20 flex-shrink-0">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between mb-2">
                                                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                                                    <span className="font-medium text-[#e85c2c]">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center border border-gray-200 rounded-md">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3 py-1">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        {cartItems.length > 0 && (
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax (8%)</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                                            Special Instructions
                                        </label>
                                        <textarea
                                            id="specialInstructions"
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85c2c]"
                                            placeholder="Allergies, preferences, etc."
                                        ></textarea>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut}
                                        className={`w-full bg-[#e85c2c] text-white py-3 px-6 rounded-md flex items-center justify-center font-medium ${isCheckingOut ? "opacity-70 cursor-not-allowed" : "hover:bg-[#d04b1c]"
                                            } transition-colors`}
                                    >
                                        {isCheckingOut ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            "Place Order"
                                        )}
                                    </button>

                                    <div className="mt-6 text-center">
                                        <Link href="/menu" className="text-[#e85c2c] text-sm font-medium hover:underline">
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 