import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { menuItems, menuCategories, companies } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

// Mock data - in a real app, this would come from a database
const mockMenuItems = [
    {
        id: 1,
        name: "Classic Burger",
        price: 12.99,
        description: "Beef patty, lettuce, tomato, onions, pickles, and special sauce",
        imageUrl: "/burger.jpg",
        category: "Main Courses",
        isVegetarian: false,
        isGlutenFree: false,
        isFeatured: true,
    },
    {
        id: 2,
        name: "Margherita Pizza",
        price: 14.99,
        description: "Fresh mozzarella, tomatoes, and basil on our handmade dough",
        imageUrl: "/pizza.jpg",
        category: "Main Courses",
        isVegetarian: true,
        isGlutenFree: false,
        isFeatured: true,
    },
    {
        id: 3,
        name: "Caesar Salad",
        price: 9.99,
        description: "Romaine lettuce, croutons, parmesan cheese with Caesar dressing",
        imageUrl: "/salad.jpg",
        category: "Appetizers",
        isVegetarian: true,
        isGlutenFree: true,
        isFeatured: false,
    },
    {
        id: 4,
        name: "Chocolate Cake",
        price: 7.99,
        description: "Rich chocolate cake with a molten center",
        imageUrl: "/dessert.jpg",
        category: "Desserts",
        isVegetarian: true,
        isGlutenFree: false,
        isFeatured: true,
    },
    {
        id: 5,
        name: "French Fries",
        price: 4.99,
        description: "Crispy golden fries served with ketchup",
        imageUrl: "/fries.jpg",
        category: "Appetizers",
        isVegetarian: true,
        isGlutenFree: false,
        isFeatured: false,
    },
    {
        id: 6,
        name: "Iced Tea",
        price: 2.99,
        description: "Refreshing iced tea with lemon",
        imageUrl: "/drink.jpg",
        category: "Beverages",
        isVegetarian: true,
        isGlutenFree: true,
        isFeatured: false,
    },
    {
        id: 7,
        name: "Chicken Wings",
        price: 10.99,
        description: "Spicy buffalo wings served with blue cheese dip",
        imageUrl: "/wings.jpg",
        category: "Appetizers",
        isVegetarian: false,
        isGlutenFree: true,
        isFeatured: true,
    },
    {
        id: 8,
        name: "Veggie Burger",
        price: 11.99,
        description: "Plant-based patty with lettuce, tomato, and special sauce",
        imageUrl: "/veggie-burger.jpg",
        category: "Main Courses",
        isVegetarian: true,
        isGlutenFree: false,
        isFeatured: false,
    },
];

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ restaurant: string }> }
) {
    try {
        // First await params itself, then access the restaurant property
        const params = await context.params;
        const restaurantSlug = params.restaurant;

        // Find the company with the matching slug
        const company = await db.query.companies.findFirst({
            where: (companies) => {
                return eq(companies.name, restaurantSlug);
            },
        });

        if (!company) {
            return NextResponse.json(
                { error: "Restaurant not found" },
                { status: 404 }
            );
        }

        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get("category");
        const featured = searchParams.get("featured");
        const vegetarian = searchParams.get("vegetarian");
        const glutenFree = searchParams.get("glutenFree");
        const search = searchParams.get("search");

        // Build the query to get menu items
        let query = db.select({
            id: menuItems.id,
            name: menuItems.name,
            description: menuItems.description,
            price: menuItems.price,
            imageUrl: menuItems.imageUrl,
            isVegetarian: menuItems.isVegetarian,
            isGlutenFree: menuItems.isGlutenFree,
            isFeatured: menuItems.isFeatured,
            categoryId: menuItems.categoryId,
            category: menuCategories.name,
        })
            .from(menuItems)
            .leftJoin(menuCategories, eq(menuItems.categoryId, menuCategories.id))
            .where(eq(menuItems.companyid, company.id));

        // Apply filters
        if (category && category !== "All") {
            query = query.where(eq(menuCategories.name, category));
        }

        if (featured === "true") {
            query = query.where(eq(menuItems.isFeatured, true));
        }

        if (vegetarian === "true") {
            query = query.where(eq(menuItems.isVegetarian, true));
        }

        if (glutenFree === "true") {
            query = query.where(eq(menuItems.isGlutenFree, true));
        }

        // Execute the query
        const items = await query;

        // Process search query separately since it's more complex
        let filteredItems = items;
        if (search) {
            const searchLower = search.toLowerCase();
            filteredItems = items.filter(item =>
                item.name.toLowerCase().includes(searchLower) ||
                (item.description && item.description.toLowerCase().includes(searchLower))
            );
        }

        // Format prices (from cents to dollars) and return
        const formattedItems = filteredItems.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description || "",
            price: item.price / 100, // Convert from cents to dollars
            imageUrl: item.imageUrl || `/placeholder-food.jpg`,
            category: item.category || "Uncategorized",
            isVegetarian: item.isVegetarian || false,
            isGlutenFree: item.isGlutenFree || false,
            isFeatured: item.isFeatured || false,
        }));

        return NextResponse.json({
            items: formattedItems,
            totalCount: formattedItems.length,
            restaurant: restaurantSlug
        });
    } catch (error) {
        console.error("Error fetching restaurant menu:", error);
        return NextResponse.json(
            { error: "Failed to fetch menu items" },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ restaurant: string }> }
) {
    try {
        // First await params itself, then access the restaurant property
        const params = await context.params;
        const restaurantId = params.restaurant;

        return NextResponse.json({
            success: true,
            message: "Menu item added successfully",
            restaurant: restaurantId
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to add menu item"
        }, { status: 500 });
    }
} 