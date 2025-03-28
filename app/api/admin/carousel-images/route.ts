import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { carouselImages } from '@/lib/schema';
import { eq, and, desc, asc } from 'drizzle-orm';
import { getCurrentUser, requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const carouselType = searchParams.get('type');
        const orderParam = searchParams.get('order');

        let query = db.select().from(carouselImages);

        // Filter by carousel type if provided
        if (carouselType) {
            query = query.where(eq(carouselImages.carouselType, carouselType));
        }

        // Sort by order field
        if (orderParam === 'desc') {
            query = query.orderBy(desc(carouselImages.order));
        } else {
            query = query.orderBy(asc(carouselImages.order));
        }

        // Only return active images in non-admin contexts
        const isAdmin = searchParams.get('admin') === 'true';
        if (!isAdmin) {
            query = query.where(eq(carouselImages.isActive, true));
        }

        const images = await query;

        return NextResponse.json({ success: true, images });
    } catch (error) {
        console.error('Error getting carousel images:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to get carousel images' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        // Check if user is admin
        const user = await getCurrentUser();
        if (!user || user.role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized: Admin access required' },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { id, title, description, imageSrc, altText, carouselType, order, isActive } = body;

        // Validate required fields
        if (!title || !imageSrc || !carouselType) {
            return NextResponse.json(
                { success: false, message: 'Title, image source, and carousel type are required' },
                { status: 400 }
            );
        }

        // If ID is provided, update existing record
        if (id) {
            const updated = await db
                .update(carouselImages)
                .set({
                    title,
                    description,
                    imageSrc,
                    altText,
                    carouselType,
                    order: order || 0,
                    isActive: isActive !== undefined ? isActive : true,
                    updatedAt: new Date(),
                    updatedBy: user?.id || null,
                })
                .where(eq(carouselImages.id, id))
                .returning();

            return NextResponse.json({
                success: true,
                message: 'Carousel image updated successfully',
                image: updated[0]
            });
        }
        // Otherwise create a new record
        else {
            const newImage = await db
                .insert(carouselImages)
                .values({
                    title,
                    description,
                    imageSrc,
                    altText,
                    carouselType,
                    order: order || 0,
                    isActive: isActive !== undefined ? isActive : true,
                    createdBy: user?.id || null,
                    updatedBy: user?.id || null,
                })
                .returning();

            return NextResponse.json({
                success: true,
                message: 'Carousel image created successfully',
                image: newImage[0]
            });
        }
    } catch (error) {
        console.error('Error creating/updating carousel image:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create/update carousel image' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        // Check if user is admin
        const user = await getCurrentUser();
        if (!user || user.role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized: Admin access required' },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Image ID is required' },
                { status: 400 }
            );
        }

        await db
            .delete(carouselImages)
            .where(eq(carouselImages.id, parseInt(id)));

        return NextResponse.json({
            success: true,
            message: 'Carousel image deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting carousel image:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete carousel image' },
            { status: 500 }
        );
    }
} 