import { NextRequest, NextResponse } from "next/server";

// Mock data - in a real app, this would come from a database
const menuItems = [
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
    { params }: { params: { restaurant: string } }
) {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const vegetarian = searchParams.get("vegetarian");
    const glutenFree = searchParams.get("glutenFree");
    const search = searchParams.get("search");

    // Filter menu items based on query parameters
    let filteredItems = [...menuItems];

    if (category && category !== "All") {
        filteredItems = filteredItems.filter(item => item.category === category);
    }

    if (featured === "true") {
        filteredItems = filteredItems.filter(item => item.isFeatured);
    }

    if (vegetarian === "true") {
        filteredItems = filteredItems.filter(item => item.isVegetarian);
    }

    if (glutenFree === "true") {
        filteredItems = filteredItems.filter(item => item.isGlutenFree);
    }

    if (search) {
        const searchLower = search.toLowerCase();
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower)
        );
    }

    // In a real app, you would fetch data specific to the restaurant
    const restaurantId = params.restaurant;

    return NextResponse.json({
        items: filteredItems,
        totalCount: filteredItems.length,
        restaurant: restaurantId
    });
}

export async function POST(
    request: NextRequest,
    { params }: { params: { restaurant: string } }
) {
    try {
        // This would create a new menu item in a real app
        // For this demo, we'll just return a success message
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