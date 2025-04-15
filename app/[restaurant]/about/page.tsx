"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Banner */}
                <div className="relative h-[200px] w-full mb-8 rounded-lg overflow-hidden">
                    <Image
                        src="/restaurant-team.jpg"
                        alt="About Us Banner"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h1 className="text-white text-4xl font-bold">About Us</h1>
                    </div>
                </div>

                {/* Our Story */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-[#e85c2c] mb-6">Our Story</h2>
                            <p className="text-gray-700 mb-4">
                                Founded in 2010, our restaurant began as a small family-owned establishment with a passion for bringing authentic flavors and exceptional dining experiences to our community.
                            </p>
                            <p className="text-gray-700 mb-4">
                                What started as a modest 20-seat venue has grown into one of the city's most beloved culinary destinations. Our commitment to quality ingredients, innovative recipes, and warm hospitality has remained unchanged throughout our journey.
                            </p>
                            <p className="text-gray-700">
                                Today, we continue to honor our roots while evolving with contemporary tastes and dining trends. Every dish that leaves our kitchen carries with it our dedication to culinary excellence and our love for bringing people together through food.
                            </p>
                        </div>
                        <div className="relative h-[400px] w-full">
                            <Image
                                src="/restaurant-story.jpg"
                                alt="Our Restaurant Story"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Our Values */}
                <section className="mb-16 bg-[#f9f5f0] py-12 px-6 rounded-lg">
                    <h2 className="text-3xl font-bold text-[#e85c2c] mb-10 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-white w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="h-8 w-8 text-[#e85c2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Quality</h3>
                            <p className="text-gray-700">
                                We source only the freshest ingredients from local farmers and suppliers, ensuring that every dish meets our high standards of excellence.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="h-8 w-8 text-[#e85c2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Community</h3>
                            <p className="text-gray-700">
                                We believe in creating more than just a place to eat – we strive to build a welcoming environment where connections are made and memories created.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="h-8 w-8 text-[#e85c2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                            <p className="text-gray-700">
                                While respecting culinary traditions, we constantly explore new techniques and flavor combinations to surprise and delight our guests.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Meet Our Team */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#e85c2c] mb-10 text-center">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Chef */}
                        <div className="text-center">
                            <div className="relative h-[250px] w-full mb-4 rounded-lg overflow-hidden">
                                <Image
                                    src="/chef.jpg"
                                    alt="Executive Chef"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Marcus Johnson</h3>
                            <p className="text-[#e85c2c] font-medium mb-3">Executive Chef</p>
                            <p className="text-gray-700 text-sm">
                                With over 15 years of culinary experience, Chef Marcus brings creativity and precision to every dish.
                            </p>
                        </div>

                        {/* Sous Chef */}
                        <div className="text-center">
                            <div className="relative h-[250px] w-full mb-4 rounded-lg overflow-hidden">
                                <Image
                                    src="/sous-chef.jpg"
                                    alt="Sous Chef"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Sophia Chen</h3>
                            <p className="text-[#e85c2c] font-medium mb-3">Sous Chef</p>
                            <p className="text-gray-700 text-sm">
                                Sophia's attention to detail and passion for fusion cuisine adds a unique dimension to our menu.
                            </p>
                        </div>

                        {/* Manager */}
                        <div className="text-center">
                            <div className="relative h-[250px] w-full mb-4 rounded-lg overflow-hidden">
                                <Image
                                    src="/manager.jpg"
                                    alt="Restaurant Manager"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">David Rodriguez</h3>
                            <p className="text-[#e85c2c] font-medium mb-3">Restaurant Manager</p>
                            <p className="text-gray-700 text-sm">
                                David ensures that every aspect of your dining experience exceeds expectations.
                            </p>
                        </div>

                        {/* Sommelier */}
                        <div className="text-center">
                            <div className="relative h-[250px] w-full mb-4 rounded-lg overflow-hidden">
                                <Image
                                    src="/sommelier.jpg"
                                    alt="Sommelier"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Emma Williams</h3>
                            <p className="text-[#e85c2c] font-medium mb-3">Sommelier</p>
                            <p className="text-gray-700 text-sm">
                                Emma's expert knowledge of wines ensures the perfect pairing for your meal.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Achievements */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#e85c2c] mb-10 text-center">Our Achievements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                            <div className="text-5xl font-bold text-[#e85c2c] mb-4">10+</div>
                            <h3 className="text-xl font-semibold mb-3">Years of Excellence</h3>
                            <p className="text-gray-700">
                                Proudly serving our community with passion and dedication for over a decade.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                            <div className="text-5xl font-bold text-[#e85c2c] mb-4">15</div>
                            <h3 className="text-xl font-semibold mb-3">Culinary Awards</h3>
                            <p className="text-gray-700">
                                Recognized for our culinary innovation and excellence in the restaurant industry.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                            <div className="text-5xl font-bold text-[#e85c2c] mb-4">50K+</div>
                            <h3 className="text-xl font-semibold mb-3">Happy Customers</h3>
                            <p className="text-gray-700">
                                Creating memorable dining experiences for thousands of guests each year.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-[#e85c2c] text-white p-10 rounded-lg text-center">
                    <h2 className="text-3xl font-bold mb-6">Come Experience Our Passion</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        We invite you to join us and experience the flavors, atmosphere, and service that make our restaurant special.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/menu"
                            className="bg-white text-[#e85c2c] px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                        >
                            View Our Menu
                        </Link>
                        <Link
                            href="/reservations"
                            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-[#e85c2c] transition-colors"
                        >
                            Make a Reservation
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
} 