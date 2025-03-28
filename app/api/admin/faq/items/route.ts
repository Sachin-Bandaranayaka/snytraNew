import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { faqItems, faqCategories } from "@/lib/schema";
import { getCurrentUser } from "@/lib/auth";
import { z } from "zod";
import { eq } from "drizzle-orm";

// Schema for validation
const faqItemSchema = z.object({
    categoryId: z.number().int().positive(),
    question: z.string().min(5),
    answer: z.string().min(5),
    order: z.number().int().nonnegative().default(0),
    isActive: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
    try {
        // Check auth
        const user = await getCurrentUser();
        if (!user || user.role !== "admin") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Parse and validate request body
        const body = await req.json();
        const validatedData = faqItemSchema.parse(body);

        // Verify that the category exists
        const categoryResult = await db
            .select()
            .from(faqCategories)
            .where(eq(faqCategories.id, validatedData.categoryId))
            .limit(1);

        const category = categoryResult[0];

        if (!category) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }

        // Create new FAQ item
        const result = await db.insert(faqItems).values({
            categoryId: validatedData.categoryId,
            question: validatedData.question,
            answer: validatedData.answer,
            order: validatedData.order,
            isActive: validatedData.isActive,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning();

        return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
        console.error("Error creating FAQ item:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Validation error", errors: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Error creating FAQ item" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // Check auth
        const user = await getCurrentUser();
        if (!user || user.role !== "admin") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get all FAQ items, sorted by category and order
        const items = await db.select({
            item: faqItems,
            category: {
                id: faqCategories.id,
                title: faqCategories.title,
            },
        })
            .from(faqItems)
            .leftJoin(faqCategories, eq(faqItems.categoryId, faqCategories.id))
            .orderBy(faqCategories.order, faqItems.order);

        return NextResponse.json(items);
    } catch (error) {
        console.error("Error fetching FAQ items:", error);
        return NextResponse.json(
            { message: "Error fetching FAQ items" },
            { status: 500 }
        );
    }
} 