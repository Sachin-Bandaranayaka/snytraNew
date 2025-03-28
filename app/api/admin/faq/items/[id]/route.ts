import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { faqItems, faqCategories } from "@/lib/schema";
import { getCurrentUser } from "@/lib/auth";
import { z } from "zod";
import { eq } from "drizzle-orm";

// Schema for validation
const updateFaqItemSchema = z.object({
    categoryId: z.number().int().positive().optional(),
    question: z.string().min(5).optional(),
    answer: z.string().min(5).optional(),
    order: z.number().int().nonnegative().optional(),
    isActive: z.boolean().optional(),
});

export async function GET(
    _: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Check auth
        const user = await getCurrentUser();
        if (!user || user.role !== "admin") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { message: "Invalid ID format" },
                { status: 400 }
            );
        }

        // Get the FAQ item with its category info
        const item = await db.select({
            item: faqItems,
            category: {
                id: faqCategories.id,
                title: faqCategories.title,
            },
        })
            .from(faqItems)
            .leftJoin(faqCategories, eq(faqItems.categoryId, faqCategories.id))
            .where(eq(faqItems.id, id))
            .limit(1);

        if (item.length === 0) {
            return NextResponse.json(
                { message: "FAQ item not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(item[0]);
    } catch (error) {
        console.error("Error fetching FAQ item:", error);
        return NextResponse.json(
            { message: "Error fetching FAQ item" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Check auth
        const user = await getCurrentUser();
        if (!user || user.role !== "admin") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { message: "Invalid ID format" },
                { status: 400 }
            );
        }

        // Check if the FAQ item exists
        const existingItem = await db
            .select()
            .from(faqItems)
            .where(eq(faqItems.id, id))
            .limit(1);

        if (existingItem.length === 0) {
            return NextResponse.json(
                { message: "FAQ item not found" },
                { status: 404 }
            );
        }

        // Parse and validate request body
        const body = await req.json();
        const validatedData = updateFaqItemSchema.parse(body);

        // If categoryId is provided, verify it exists
        if (validatedData.categoryId) {
            const category = await db
                .select()
                .from(faqCategories)
                .where(eq(faqCategories.id, validatedData.categoryId))
                .limit(1);

            if (category.length === 0) {
                return NextResponse.json(
                    { message: "Category not found" },
                    { status: 404 }
                );
            }
        }

        // Update the FAQ item
        const updateData = {
            ...validatedData,
            updatedAt: new Date(),
        };

        const result = await db
            .update(faqItems)
            .set(updateData)
            .where(eq(faqItems.id, id))
            .returning();

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Error updating FAQ item:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Validation error", errors: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Error updating FAQ item" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Check auth
        const user = await getCurrentUser();
        if (!user || user.role !== "admin") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { message: "Invalid ID format" },
                { status: 400 }
            );
        }

        // Check if the FAQ item exists
        const existingItem = await db
            .select()
            .from(faqItems)
            .where(eq(faqItems.id, id))
            .limit(1);

        if (existingItem.length === 0) {
            return NextResponse.json(
                { message: "FAQ item not found" },
                { status: 404 }
            );
        }

        // Delete the FAQ item
        await db.delete(faqItems).where(eq(faqItems.id, id));

        return NextResponse.json({ message: "FAQ item deleted successfully" });
    } catch (error) {
        console.error("Error deleting FAQ item:", error);
        return NextResponse.json(
            { message: "Error deleting FAQ item" },
            { status: 500 }
        );
    }
} 