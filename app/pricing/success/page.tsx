"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        // In a real implementation, you could verify the session with your API
        // For now, we'll just simulate a successful session verification
        if (sessionId) {
            // Simulate API call
            setTimeout(() => {
                setStatus('success');
            }, 1500);
        } else {
            setStatus('error');
        }
    }, [sessionId]);

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            {status === 'loading' && (
                <div className="py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e85c2c] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Processing your payment...</p>
                </div>
            )}

            {status === 'success' && (
                <>
                    <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
                    <p className="text-gray-600 mb-8">
                        Thank you for your purchase! Your subscription has been activated. You can now access all the features of your chosen plan.
                    </p>

                    <div className="space-y-4">
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white">
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                        <div>
                            <Link
                                href="/contact"
                                className="text-[#e85c2c] hover:text-[#d04a1d] underline block mt-4"
                            >
                                Need help? Contact us
                            </Link>
                        </div>
                    </div>
                </>
            )}

            {status === 'error' && (
                <>
                    <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong</h1>
                    <p className="text-gray-600 mb-8">
                        We couldn't confirm your payment. Please try again or contact our support team for assistance.
                    </p>

                    <div className="space-y-4">
                        <Button className="bg-[#e85c2c] hover:bg-[#d04a1d] text-white">
                            <Link href="/pricing">Return to Pricing</Link>
                        </Button>
                        <div>
                            <Link
                                href="/contact"
                                className="text-[#e85c2c] hover:text-[#d04a1d] underline block mt-4"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default function SuccessPage() {
    return (
        <div className="bg-[#f8f5eb] min-h-screen">
            <Navbar />

            <main className="container mx-auto px-4 py-16">
                <Suspense fallback={
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
                        <div className="py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e85c2c] mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading payment information...</p>
                        </div>
                    </div>
                }>
                    <PaymentSuccessContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
} 