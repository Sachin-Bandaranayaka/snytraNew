"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CarouselImage {
    id: number;
    title: string;
    description: string | null;
    imageSrc: string;
    altText: string | null;
    carouselType: string;
    order: number;
    isActive: boolean;
}

export default function OrderManagementCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [dashboardImages, setDashboardImages] = useState<CarouselImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch carousel images
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/admin/carousel-images?type=order-management');
                const data = await response.json();

                if (data.success && data.images && data.images.length > 0) {
                    setDashboardImages(data.images);
                } else {
                    // Fallback to default images if no data in DB
                    setDashboardImages([
                        {
                            id: 1,
                            title: "Order Metrics",
                            description: "Track orders in real-time with comprehensive metrics dashboard",
                            imageSrc: "/admin1.png",
                            altText: "Admin Dashboard View 1",
                            carouselType: "order-management",
                            order: 0,
                            isActive: true
                        },
                        {
                            id: 2,
                            title: "Menu Management",
                            description: "Analyze your top-performing menu items and optimize your offerings",
                            imageSrc: "/admin2.png",
                            altText: "Admin Dashboard View 2",
                            carouselType: "order-management",
                            order: 1,
                            isActive: true
                        },
                        {
                            id: 3,
                            title: "Customer Management",
                            description: "Efficiently manage your waiting list and ensure a smooth customer experience",
                            imageSrc: "/admin3.png",
                            altText: "Admin Dashboard View 3",
                            carouselType: "order-management",
                            order: 2,
                            isActive: true
                        }
                    ]);
                }
            } catch (error) {
                console.error("Error fetching carousel images:", error);
                // Use fallback images on error
                setDashboardImages([
                    {
                        id: 1,
                        title: "Order Metrics",
                        description: "Track orders in real-time with comprehensive metrics dashboard",
                        imageSrc: "/admin1.png",
                        altText: "Admin Dashboard View 1",
                        carouselType: "order-management",
                        order: 0,
                        isActive: true
                    },
                    {
                        id: 2,
                        title: "Menu Management",
                        description: "Analyze your top-performing menu items and optimize your offerings",
                        imageSrc: "/admin2.png",
                        altText: "Admin Dashboard View 2",
                        carouselType: "order-management",
                        order: 1,
                        isActive: true
                    },
                    {
                        id: 3,
                        title: "Customer Management",
                        description: "Efficiently manage your waiting list and ensure a smooth customer experience",
                        imageSrc: "/admin3.png",
                        altText: "Admin Dashboard View 3",
                        carouselType: "order-management",
                        order: 2,
                        isActive: true
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Add resize listener
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-cycle through slides
    useEffect(() => {
        if (!autoplay || dashboardImages.length <= 1) return;

        const interval = setInterval(() => {
            if (!isAnimating) {
                goToNext();
            }
        }, 7000); // Longer interval for this section

        return () => clearInterval(interval);
    }, [currentIndex, isAnimating, autoplay, dashboardImages.length]);

    // Handle animation
    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    const goToNext = () => {
        if (dashboardImages.length <= 1) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dashboardImages.length);
    };

    const goToPrev = () => {
        if (dashboardImages.length <= 1) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? dashboardImages.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index: number) => {
        if (index === currentIndex || dashboardImages.length <= 1) return;
        setIsAnimating(true);
        setCurrentIndex(index);
    };

    const handleUserInteraction = () => {
        setAutoplay(false);
        // Resume autoplay after 10 seconds of inactivity
        const timer = setTimeout(() => setAutoplay(true), 10000);
        return () => clearTimeout(timer);
    };

    // Handle swipe gestures for mobile
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
        handleUserInteraction();
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            // Swipe left (next)
            goToNext();
        }

        if (touchEnd - touchStart > 50) {
            // Swipe right (prev)
            goToPrev();
        }
    };

    if (isLoading) {
        return (
            <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#e85c2c] mr-2"></div>
                        <span className="font-medium text-[#e85c2c]">Order Management</span>
                    </div>
                </div>
                <div className="aspect-[16/9] md:aspect-[16/7] bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="mt-3 px-1">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        );
    }

    if (dashboardImages.length === 0) {
        return (
            <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#e85c2c] mr-2"></div>
                        <span className="font-medium text-[#e85c2c]">Order Management</span>
                    </div>
                </div>
                <div className="aspect-[16/9] md:aspect-[16/7] bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">No images available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#e85c2c] mr-2"></div>
                    <span className="font-medium text-[#e85c2c]">Order Management</span>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            goToPrev();
                            handleUserInteraction();
                        }}
                        className="h-6 w-6 rounded-full flex items-center justify-center border border-gray-200 hover:border-[#e85c2c] hover:text-[#e85c2c]"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => {
                            goToNext();
                            handleUserInteraction();
                        }}
                        className="h-6 w-6 rounded-full flex items-center justify-center border border-gray-200 hover:border-[#e85c2c] hover:text-[#e85c2c]"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Image carousel */}
            <div
                className="relative overflow-hidden rounded-lg"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className={cn(
                    "aspect-[16/9] md:aspect-[16/7] relative"
                )}>
                    {dashboardImages.map((image, index) => (
                        <div
                            key={index}
                            className={cn(
                                "absolute inset-0 transition-opacity duration-500",
                                currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                            )}
                        >
                            <div className="absolute top-0 left-0 w-full px-4 py-3 bg-gradient-to-b from-black/50 to-transparent z-20 flex items-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#e85c2c] mr-2"></div>
                                <span className={cn(
                                    "font-medium text-white",
                                    isMobile ? "text-xs" : "text-sm"
                                )}>
                                    {image.title}
                                </span>
                            </div>

                            <Image
                                src={image.imageSrc}
                                alt={image.altText || image.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                className="object-contain"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Dots indicator */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
                    {dashboardImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                goToSlide(index);
                                handleUserInteraction();
                            }}
                            className={cn(
                                "rounded-full transition-colors",
                                index === currentIndex ? "bg-[#e85c2c]" : "bg-white/70 hover:bg-[#e85c2c]/50",
                                isMobile ? "w-1.5 h-1.5" : "w-2 h-2"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Slide description */}
            <div className="mt-3 px-1">
                <p className={cn(
                    "text-gray-600",
                    isMobile ? "text-xs" : "text-sm"
                )}>
                    {dashboardImages[currentIndex].description}
                </p>
            </div>
        </div>
    );
} 