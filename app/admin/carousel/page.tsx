import React from 'react';
import { db } from '@/lib/db';
import { carouselImages } from '@/lib/schema';
import { asc } from 'drizzle-orm';
import { Metadata } from 'next';
import Link from 'next/link';
import CarouselImagesManager from './carousel-images-manager';

export const metadata: Metadata = {
    title: 'Admin | Carousel Images',
    description: 'Manage carousel images',
};

async function getCarouselImages() {
    try {
        const images = await db
            .select()
            .from(carouselImages)
            .orderBy(asc(carouselImages.carouselType), asc(carouselImages.order));
        return { images, error: null };
    } catch (error) {
        console.error('Error fetching carousel images:', error);
        return { images: [], error };
    }
}

export default async function AdminCarouselPage() {
    const { images, error } = await getCarouselImages();

    // Group images by carousel type
    const groupedImages = images.reduce((groups: Record<string, any[]>, image) => {
        const type = image.carouselType || 'general';
        if (!groups[type]) {
            groups[type] = [];
        }
        groups[type].push(image);
        return groups;
    }, {});

    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Carousel Images</h1>
                <p className="text-gray-600">
                    Manage carousel images displayed on your website
                </p>
            </div>

            {error ? (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4 mb-6">
                        <h3 className="text-lg font-medium mb-2">Database Setup Required</h3>
                        <p className="mb-4">
                            The carousel_images table doesn't exist in your database yet. This is likely because the migration hasn't been run.
                        </p>
                        <p className="mb-2">To fix this issue:</p>
                        <ol className="list-decimal pl-5 mb-4 space-y-1">
                            <li>Make sure your database connection is properly configured in .env.local</li>
                            <li>Run the migration script: <code className="bg-yellow-100 px-1 py-0.5 rounded">node scripts/migrate-carousel-testimonials.js</code></li>
                            <li>Refresh this page after the migration completes</li>
                        </ol>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md">
                    <CarouselImagesManager initialImages={images} groupedImages={groupedImages} />
                </div>
            )}
        </div>
    );
} 