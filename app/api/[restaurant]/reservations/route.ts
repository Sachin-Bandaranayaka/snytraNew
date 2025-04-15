import { NextRequest, NextResponse } from "next/server";

// Mock reservations data - in a real app, this would be stored in a database
let reservations = [
    {
        id: "res-001",
        restaurantId: "my-restaurant",
        name: "John Doe",
        email: "john@example.com",
        phone: "555-123-4567",
        date: "2023-12-15",
        time: "7:00 PM",
        guests: 4,
        specialRequests: "Window seat if possible",
        status: "confirmed",
        createdAt: "2023-11-29T08:30:00Z"
    },
    {
        id: "res-002",
        restaurantId: "my-restaurant",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "555-987-6543",
        date: "2023-12-16",
        time: "6:30 PM",
        guests: 2,
        specialRequests: "Anniversary celebration",
        status: "confirmed",
        createdAt: "2023-11-30T10:15:00Z"
    }
];

export async function GET(
    request: NextRequest,
    { params }: { params: { restaurant: string } }
) {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    const status = searchParams.get("status");

    // Filter reservations based on restaurant and query parameters
    let filteredReservations = reservations.filter(
        reservation => reservation.restaurantId === params.restaurant
    );

    if (date) {
        filteredReservations = filteredReservations.filter(
            reservation => reservation.date === date
        );
    }

    if (status) {
        filteredReservations = filteredReservations.filter(
            reservation => reservation.status === status
        );
    }

    return NextResponse.json({
        reservations: filteredReservations,
        count: filteredReservations.length
    });
}

export async function POST(
    request: NextRequest,
    { params }: { params: { restaurant: string } }
) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ["name", "email", "phone", "date", "time", "guests"];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json({
                    success: false,
                    message: `Missing required field: ${field}`
                }, { status: 400 });
            }
        }

        // Validate date is in the future
        const reservationDate = new Date(`${body.date}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (reservationDate < today) {
            return NextResponse.json({
                success: false,
                message: "Reservation date must be in the future"
            }, { status: 400 });
        }

        // Validate number of guests
        if (body.guests < 1 || body.guests > 20) {
            return NextResponse.json({
                success: false,
                message: "Number of guests must be between 1 and 20. For larger parties, please contact us directly."
            }, { status: 400 });
        }

        // In a real app, you would check availability here
        // For this demo, we'll just create the reservation

        const newReservation = {
            id: `res-${Date.now()}`,
            restaurantId: params.restaurant,
            name: body.name,
            email: body.email,
            phone: body.phone,
            date: body.date,
            time: body.time,
            guests: body.guests,
            specialRequests: body.specialRequests || "",
            status: "confirmed",
            createdAt: new Date().toISOString()
        };

        // In a real app, this would be saved to a database
        reservations.push(newReservation);

        return NextResponse.json({
            success: true,
            message: "Reservation created successfully",
            reservation: newReservation
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating reservation:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to create reservation"
        }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { restaurant: string } }
) {
    try {
        const body = await request.json();

        if (!body.id) {
            return NextResponse.json({
                success: false,
                message: "Reservation ID is required"
            }, { status: 400 });
        }

        // Find the reservation
        const reservationIndex = reservations.findIndex(
            reservation => reservation.id === body.id &&
                reservation.restaurantId === params.restaurant
        );

        if (reservationIndex === -1) {
            return NextResponse.json({
                success: false,
                message: "Reservation not found"
            }, { status: 404 });
        }

        // Update the reservation
        const updatedReservation = {
            ...reservations[reservationIndex],
            ...body,
            restaurantId: params.restaurant // Ensure restaurant ID cannot be changed
        };

        reservations[reservationIndex] = updatedReservation;

        return NextResponse.json({
            success: true,
            message: "Reservation updated successfully",
            reservation: updatedReservation
        });
    } catch (error) {
        console.error("Error updating reservation:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to update reservation"
        }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { restaurant: string } }
) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Reservation ID is required"
            }, { status: 400 });
        }

        // Find the reservation
        const initialLength = reservations.length;
        reservations = reservations.filter(
            reservation => !(reservation.id === id &&
                reservation.restaurantId === params.restaurant)
        );

        if (reservations.length === initialLength) {
            return NextResponse.json({
                success: false,
                message: "Reservation not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Reservation cancelled successfully"
        });
    } catch (error) {
        console.error("Error cancelling reservation:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to cancel reservation"
        }, { status: 500 });
    }
} 