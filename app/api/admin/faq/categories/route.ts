import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { faqCategories } from "@/lib/schema";
import { getCurrentUser } from "@/lib/auth";
import { z } from "zod";
import { eq } from "drizzle-orm";

// Schema for validation
const categorySchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
    description: z.string().optional(),
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
        const validatedData = categorySchema.parse(body);

        // Check if slug already exists
        const existingCategory = await db
            .select()
            .from(faqCategories)
            .where(eq(faqCategories.slug, validatedData.slug))
            .limit(1);

        if (existingCategory.length > 0) {
            return NextResponse.json(
                { message: "A category with this slug already exists" },
                { status: 409 }
            );
        }

        // Create new category
        const result = await db.insert(faqCategories).values({
            title: validatedData.title,
            slug: validatedData.slug,
            description: validatedData.description,
            order: validatedData.order,
            isActive: validatedData.isActive,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning();

        return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
        console.error("Error creating FAQ category:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Validation error", errors: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Error creating FAQ category" },
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

        // Get all categories, sorted by order
        const categories = await db
            .select()
            .from(faqCategories)
            .orderBy(faqCategories.order);

        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching FAQ categories:", error);
        return NextResponse.json(
            { message: "Error fetching FAQ categories" },
            { status: 500 }
        );
    }
} 