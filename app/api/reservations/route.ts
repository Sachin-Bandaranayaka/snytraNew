import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tableReservations, restaurantTables } from '@/lib/schema';
import { eq, and, gte, lte, desc } from 'drizzle-orm';

// GET /api/reservations - Get all reservations with optional filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');
        const status = searchParams.get('status');
        const tableId = searchParams.get('tableId');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        let query = db.select({
            reservation: tableReservations,
            table: restaurantTables
        })
            .from(tableReservations)
            .leftJoin(restaurantTables, eq(tableReservations.tableId, restaurantTables.id))
            .orderBy(desc(tableReservations.reservationDate));

        // Apply filters
        if (date) {
            const dateObj = new Date(date);
            const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0));
            const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999));
            query = query.where(
                and(
                    gte(tableReservations.reservationDate, startOfDay),
                    lte(tableReservations.reservationDate, endOfDay)
                )
            );
        }

        if (startDate && endDate) {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            query = query.where(
                and(
                    gte(tableReservations.reservationDate, startDateObj),
                    lte(tableReservations.reservationDate, endDateObj)
                )
            );
        }

        if (status) {
            query = query.where(eq(tableReservations.status, status));
        }

        if (tableId) {
            query = query.where(eq(tableReservations.tableId, parseInt(tableId)));
        }

        const reservations = await query;

        return NextResponse.json({
            success: true,
            reservations
        });
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch reservations' },
            { status: 500 }
        );
    }
}

// POST /api/reservations - Create a new reservation
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            tableId,
            customerName,
            customerEmail,
            customerPhone,
            partySize,
            reservationDate,
            startTime,
            endTime,
            duration,
            specialRequests,
            status,
            source
        } = body;

        // Validate required fields
        if (!tableId || !customerName || !customerPhone || !partySize || !reservationDate || !startTime || !endTime) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if table exists
        const tableResult = await db.select().from(restaurantTables).where(eq(restaurantTables.id, tableId)).limit(1);
        if (tableResult.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Table not found' },
                { status: 404 }
            );
        }

        // Check if table capacity is sufficient
        if (tableResult[0].capacity < partySize) {
            return NextResponse.json(
                { success: false, error: 'Table capacity is insufficient for party size' },
                { status: 400 }
            );
        }

        // Check for existing reservations in the same time slot
        const reservationDateObj = new Date(reservationDate);
        const existingReservations = await db
            .select()
            .from(tableReservations)
            .where(
                and(
                    eq(tableReservations.tableId, tableId),
                    eq(tableReservations.reservationDate, reservationDateObj),
                    eq(tableReservations.status, 'confirmed')
                )
            );

        // Check for time conflicts (simplified version)
        for (const existingReservation of existingReservations) {
            if (
                (startTime >= existingReservation.startTime && startTime < existingReservation.endTime) ||
                (endTime > existingReservation.startTime && endTime <= existingReservation.endTime) ||
                (startTime <= existingReservation.startTime && endTime >= existingReservation.endTime)
            ) {
                return NextResponse.json(
                    { success: false, error: 'Time slot is already booked' },
                    { status: 409 }
                );
            }
        }

        // Create new reservation
        const newReservation = await db.insert(tableReservations)
            .values({
                tableId,
                customerName,
                customerEmail,
                customerPhone,
                partySize,
                reservationDate: new Date(reservationDate),
                startTime,
                endTime,
                duration: duration || 120,
                specialRequests,
                status: status || 'confirmed',
                source: source || 'website',
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .returning();

        return NextResponse.json({
            success: true,
            message: 'Reservation created successfully',
            reservation: newReservation[0]
        });
    } catch (error) {
        console.error('Error creating reservation:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create reservation' },
            { status: 500 }
        );
    }
}

// PATCH /api/reservations?id=[id] - Update an existing reservation
export async function PATCH(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Reservation ID is required' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const {
            tableId,
            customerName,
            customerEmail,
            customerPhone,
            partySize,
            reservationDate,
            startTime,
            endTime,
            duration,
            specialRequests,
            status,
            notes
        } = body;

        // Check if reservation exists
        const existingReservation = await db
            .select()
            .from(tableReservations)
            .where(eq(tableReservations.id, parseInt(id)))
            .limit(1);

        if (existingReservation.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Reservation not found' },
                { status: 404 }
            );
        }

        // Prepare update data
        const updateData: any = {
            updatedAt: new Date()
        };

        if (tableId !== undefined) updateData.tableId = tableId;
        if (customerName !== undefined) updateData.customerName = customerName;
        if (customerEmail !== undefined) updateData.customerEmail = customerEmail;
        if (customerPhone !== undefined) updateData.customerPhone = customerPhone;
        if (partySize !== undefined) updateData.partySize = partySize;
        if (reservationDate !== undefined) updateData.reservationDate = new Date(reservationDate);
        if (startTime !== undefined) updateData.startTime = startTime;
        if (endTime !== undefined) updateData.endTime = endTime;
        if (duration !== undefined) updateData.duration = duration;
        if (specialRequests !== undefined) updateData.specialRequests = specialRequests;
        if (status !== undefined) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        // Update reservation
        const updatedReservation = await db
            .update(tableReservations)
            .set(updateData)
            .where(eq(tableReservations.id, parseInt(id)))
            .returning();

        return NextResponse.json({
            success: true,
            message: 'Reservation updated successfully',
            reservation: updatedReservation[0]
        });
    } catch (error) {
        console.error('Error updating reservation:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update reservation' },
            { status: 500 }
        );
    }
}

// DELETE /api/reservations?id=[id] - Delete a reservation
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Reservation ID is required' },
                { status: 400 }
            );
        }

        // Check if reservation exists
        const existingReservation = await db
            .select()
            .from(tableReservations)
            .where(eq(tableReservations.id, parseInt(id)))
            .limit(1);

        if (existingReservation.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Reservation not found' },
                { status: 404 }
            );
        }

        // Delete reservation
        await db
            .delete(tableReservations)
            .where(eq(tableReservations.id, parseInt(id)));

        return NextResponse.json({
            success: true,
            message: 'Reservation deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete reservation' },
            { status: 500 }
        );
    }
} 