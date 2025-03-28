"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Testimonial data structure
interface Testimonial {
    name: string;
    role: string;
    quote: string;
    imageSrc?: string;
}

interface AutoRotatingTestimonialsProps {
    testimonials: Testimonial[];
    rotationInterval?: number; // in milliseconds, default will be 5000 (5 seconds)
}

export default function AutoRotatingTestimonials({
    testimonials,
    rotationInterval = 5000,
}: AutoRotatingTestimonialsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
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

    // Auto-rotate through testimonials
    useEffect(() => {
        if (isPaused || testimonials.length <= 1) return;

        const interval = setInterval(() => {
            if (!isAnimating) {
                goToNext();
            }
        }, rotationInterval);

        return () => clearInterval(interval);
    }, [currentIndex, isAnimating, isPaused, testimonials.length, rotationInterval]);

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
        if (testimonials.length <= 1) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const goToPrev = () => {
        if (testimonials.length <= 1) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index: number) => {
        if (index === currentIndex || testimonials.length <= 1) return;
        setIsAnimating(true);
        setCurrentIndex(index);
    };

    // Pause rotation when user interacts
    const handleUserInteraction = () => {
        setIsPaused(true);
        // Resume autoplay after 10 seconds of inactivity
        const timer = setTimeout(() => setIsPaused(false), 10000);
        return () => clearTimeout(timer);
    };

    // Mobile swipe support
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

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <div className="relative overflow-hidden">
            {testimonials.length > 1 && (
                <>
                    {/* Navigation buttons */}
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md border-gray-200 hover:border-[#e85c2c] hover:text-[#e85c2c]",
                            isMobile ? "h-8 w-8 left-1" : "h-10 w-10",
                            "hidden md:flex"
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
                            isMobile ? "h-8 w-8 right-1" : "h-10 w-10",
                            "hidden md:flex"
                        )}
                        onClick={() => {
                            goToNext();
                            handleUserInteraction();
                        }}
                    >
                        <ChevronRight className={isMobile ? "h-4 w-4" : "h-6 w-6"} />
                    </Button>
                </>
            )}

            {/* Testimonials */}
            <div
                className="relative py-6"
                onMouseEnter={handleUserInteraction}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="relative w-full overflow-hidden">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className={cn(
                                "absolute w-full transition-all duration-500 ease-in-out border-0 shadow-sm overflow-hidden",
                                isAnimating ? "transition-opacity duration-500" : "",
                                index === currentIndex
                                    ? "opacity-100 translate-x-0 relative"
                                    : index < currentIndex || (currentIndex === 0 && index === testimonials.length - 1)
                                        ? "opacity-0 -translate-x-full absolute"
                                        : "opacity-0 translate-x-full absolute"
                            )}
                        >
                            <CardContent className="p-6">
                                <div className="flex flex-col h-full">
                                    <div className="mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#e85c2c"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="opacity-50"
                                        >
                                            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                                            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 flex-grow text-sm md:text-base mb-4">{testimonial.quote}</p>
                                    <div className="flex items-center">
                                        {testimonial.imageSrc && (
                                            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden">
                                                <img
                                                    src={testimonial.imageSrc}
                                                    alt={`${testimonial.name}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-medium text-base">{testimonial.name}</div>
                                            <div className="text-gray-500 text-sm">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Dots indicator */}
            {testimonials.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                    {testimonials.map((_, index) => (
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
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
} 