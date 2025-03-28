import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { testimonials } from '@/lib/schema';
import { eq, and, desc, asc } from 'drizzle-orm';
import { getCurrentUser, requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const orderParam = searchParams.get('order');

        let query = db.select().from(testimonials);

        // Sort by order field
        if (orderParam === 'desc') {
            query = query.orderBy(desc(testimonials.order));
        } else {
            query = query.orderBy(asc(testimonials.order));
        }

        // Only return active testimonials in non-admin contexts
        const isAdmin = searchParams.get('admin') === 'true';
        if (!isAdmin) {
            query = query.where(eq(testimonials.isActive, true));
        }

        const results = await query;

        return NextResponse.json({ success: true, testimonials: results });
    } catch (error) {
        console.error('Error getting testimonials:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to get testimonials' },
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
        const { id, name, role, quote, imageSrc, order, isActive } = body;

        // Validate required fields
        if (!name || !role || !quote) {
            return NextResponse.json(
                { success: false, message: 'Name, role, and quote are required' },
                { status: 400 }
            );
        }

        // If ID is provided, update existing record
        if (id) {
            const updated = await db
                .update(testimonials)
                .set({
                    name,
                    role,
                    quote,
                    imageSrc,
                    order: order || 0,
                    isActive: isActive !== undefined ? isActive : true,
                    updatedAt: new Date(),
                    updatedBy: user?.id || null,
                })
                .where(eq(testimonials.id, id))
                .returning();

            return NextResponse.json({
                success: true,
                message: 'Testimonial updated successfully',
                testimonial: updated[0]
            });
        }
        // Otherwise create a new record
        else {
            const newTestimonial = await db
                .insert(testimonials)
                .values({
                    name,
                    role,
                    quote,
                    imageSrc,
                    order: order || 0,
                    isActive: isActive !== undefined ? isActive : true,
                    createdBy: user?.id || null,
                    updatedBy: user?.id || null,
                })
                .returning();

            return NextResponse.json({
                success: true,
                message: 'Testimonial created successfully',
                testimonial: newTestimonial[0]
            });
        }
    } catch (error) {
        console.error('Error creating/updating testimonial:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create/update testimonial' },
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
                { success: false, message: 'Testimonial ID is required' },
                { status: 400 }
            );
        }

        await db
            .delete(testimonials)
            .where(eq(testimonials.id, parseInt(id)));

        return NextResponse.json({
            success: true,
            message: 'Testimonial deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete testimonial' },
            { status: 500 }
        );
    }
} 