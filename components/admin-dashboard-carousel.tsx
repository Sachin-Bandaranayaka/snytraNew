"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const dashboardImages = [
    { src: "/admin1.png", alt: "Admin Dashboard View 1", caption: "Order Management & Analytics", description: "Track orders in real-time, manage deliveries, and get insights into your restaurant's performance with powerful analytics dashboards." },
    { src: "/admin2.png", alt: "Admin Dashboard View 2", caption: "Menu Performance Tracking", description: "Identify your top-selling items, analyze profit margins, and optimize your menu based on data-driven insights." },
    { src: "/admin3.png", alt: "Admin Dashboard View 3", caption: "Customer Waiting List", description: "Efficiently manage table assignments, track waiting times, and ensure a smooth dining experience for your customers." },
];

export default function AdminDashboardCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

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

    // Auto-cycle through images
    useEffect(() => {
        if (!autoplay) return;

        const interval = setInterval(() => {
            if (!isAnimating) {
                goToNext();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, isAnimating, autoplay]);

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
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dashboardImages.length);
    };

    const goToPrev = () => {
        setIsAnimating(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? dashboardImages.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index: number) => {
        if (index === currentIndex) return;
        setIsAnimating(true);
        setCurrentIndex(index);
    };

    // Pause autoplay when user interacts with carousel
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
        if (touchStart - touchEnd > 75) {
            // Swipe left (next)
            goToNext();
        }

        if (touchEnd - touchStart > 75) {
            // Swipe right (prev)
            goToPrev();
        }
    };

    return (
        <div className="space-y-4">
            <div
                className="relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-md"
                onMouseEnter={handleUserInteraction}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Navigation buttons - hide on mobile, rely on swipe */}
                <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                        "absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md border-gray-200 hover:border-[#e85c2c] hover:text-[#e85c2c]",
                        isMobile ? "h-8 w-8 left-1" : "h-10 w-10"
                    )}
                    onClick={() => {
                        goToPrev();
                        handleUserInteraction();
                    }}
                >
                    <ChevronLeft className={isMobile ? "h-4 w-4" : "h-6 w-6"} />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                        "absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md border-gray-200 hover:border-[#e85c2c] hover:text-[#e85c2c]",
                        isMobile ? "h-8 w-8 right-1" : "h-10 w-10"
                    )}
                    onClick={() => {
                        goToNext();
                        handleUserInteraction();
                    }}
                >
                    <ChevronRight className={isMobile ? "h-4 w-4" : "h-6 w-6"} />
                </Button>

                {/* Main carousel */}
                <div className={cn(
                    "relative overflow-hidden w-full",
                    isMobile ? "aspect-[4/3]" : "aspect-[16/9]"
                )}>
                    {dashboardImages.map((image, index) => (
                        <div
                            key={index}
                            className={cn(
                                "absolute inset-0 transition-transform duration-500 ease-in-out w-full h-full",
                                isAnimating ? "transition-opacity duration-500" : "",
                                index === currentIndex
                                    ? "opacity-100 translate-x-0"
                                    : index < currentIndex || (currentIndex === 0 && index === dashboardImages.length - 1)
                                        ? "opacity-0 -translate-x-full"
                                        : "opacity-0 translate-x-full"
                            )}
                        >
                            <div className={cn(
                                "absolute top-0 left-0 w-full px-4 py-3 bg-gradient-to-b from-black/50 to-transparent z-10 flex items-center",
                                isMobile ? "py-2" : "py-3"
                            )}>
                                <div className="w-3 h-3 rounded-full bg-[#e85c2c] mr-2"></div>
                                <span className={cn(
                                    "font-medium text-white",
                                    isMobile ? "text-xs" : "text-sm md:text-base"
                                )}>
                                    {image.caption}
                                </span>
                            </div>

                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                className="object-contain"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {dashboardImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                goToSlide(index);
                                handleUserInteraction();
                            }}
                            className={cn(
                                "rounded-full transition-colors",
                                index === currentIndex ? "bg-[#e85c2c]" : "bg-gray-300 hover:bg-[#e85c2c]/50",
                                isMobile ? "w-2 h-2" : "w-3 h-3"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Slide description */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm transition-all duration-300">
                <div className="flex items-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#e85c2c] mr-2"></div>
                    <h3 className="font-medium text-[#e85c2c]">{dashboardImages[currentIndex].caption}</h3>
                </div>
                <p className={cn(
                    "text-gray-600",
                    isMobile ? "text-xs" : "text-sm md:text-base"
                )}>
                    {dashboardImages[currentIndex].description}
                </p>
            </div>
        </div>
    );
} 