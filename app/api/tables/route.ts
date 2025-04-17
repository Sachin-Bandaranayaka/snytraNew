import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { restaurantTables, tableReservations } from '@/lib/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

// GET /api/tables - Get all tables with optional filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location');
        const status = searchParams.get('status');
        const minCapacity = searchParams.get('minCapacity');
        const isActive = searchParams.get('isActive');

        let query = db.select().from(restaurantTables);

        // Apply filters
        if (location) {
            query = query.where(eq(restaurantTables.location, location));
        }

        if (status) {
            query = query.where(eq(restaurantTables.status, status));
        }

        if (minCapacity) {
            query = query.where(gte(restaurantTables.capacity, parseInt(minCapacity)));
        }

        if (isActive) {
            query = query.where(eq(restaurantTables.isActive, isActive === 'true'));
        }

        const tables = await query;

        return NextResponse.json({
            success: true,
            tables
        });
    } catch (error) {
        console.error('Error fetching tables:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch tables' },
            { status: 500 }
        );
    }
}

// POST /api/tables - Create a new table
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            tableNumber,
            capacity,
            location,
            shape,
            status,
            isActive
        } = body;

        // Validate required fields
        if (!tableNumber || !capacity) {
            return NextResponse.json(
                { success: false, error: 'Table number and capacity are required' },
                { status: 400 }
            );
        }

        // Check if table number already exists
        const existingTable = await db
            .select()
            .from(restaurantTables)
            .where(eq(restaurantTables.tableNumber, tableNumber))
            .limit(1);

        if (existingTable.length > 0) {
            return NextResponse.json(
                { success: false, error: 'Table number already exists' },
                { status: 409 }
            );
        }

        // Create new table
        const newTable = await db.insert(restaurantTables)
            .values({
                tableNumber,
                capacity,
                location: location || null,
                shape: shape || 'rectangle',
                status: status || 'available',
                isActive: isActive !== undefined ? isActive : true,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .returning();

        return NextResponse.json({
            success: true,
            message: 'Table created successfully',
            table: newTable[0]
        });
    } catch (error) {
        console.error('Error creating table:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create table' },
            { status: 500 }
        );
    }
}

// PATCH /api/tables?id=[id] - Update an existing table
export async function PATCH(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Table ID is required' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const {
            tableNumber,
            capacity,
            location,
            shape,
            status,
            isActive
        } = body;

        // Check if table exists
        const existingTable = await db
            .select()
            .from(restaurantTables)
            .where(eq(restaurantTables.id, parseInt(id)))
            .limit(1);

        if (existingTable.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Table not found' },
                { status: 404 }
            );
        }

        // Check if new table number already exists
        if (tableNumber !== undefined && tableNumber !== existingTable[0].tableNumber) {
            const duplicateTable = await db
                .select()
                .from(restaurantTables)
                .where(eq(restaurantTables.tableNumber, tableNumber))
                .limit(1);

            if (duplicateTable.length > 0) {
                return NextResponse.json(
                    { success: false, error: 'Table number already exists' },
                    { status: 409 }
                );
            }
        }

        // Prepare update data
        const updateData: any = {
            updatedAt: new Date()
        };

        if (tableNumber !== undefined) updateData.tableNumber = tableNumber;
        if (capacity !== undefined) updateData.capacity = capacity;
        if (location !== undefined) updateData.location = location;
        if (shape !== undefined) updateData.shape = shape;
        if (status !== undefined) updateData.status = status;
        if (isActive !== undefined) updateData.isActive = isActive;

        // Update table
        const updatedTable = await db
            .update(restaurantTables)
            .set(updateData)
            .where(eq(restaurantTables.id, parseInt(id)))
            .returning();

        return NextResponse.json({
            success: true,
            message: 'Table updated successfully',
            table: updatedTable[0]
        });
    } catch (error) {
        console.error('Error updating table:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update table' },
            { status: 500 }
        );
    }
}

// DELETE /api/tables?id=[id] - Delete a table
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Table ID is required' },
                { status: 400 }
            );
        }

        // Check if table exists
        const existingTable = await db
            .select()
            .from(restaurantTables)
            .where(eq(restaurantTables.id, parseInt(id)))
            .limit(1);

        if (existingTable.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Table not found' },
                { status: 404 }
            );
        }

        // Check if table has any reservations
        const reservations = await db
            .select()
            .from(tableReservations)
            .where(eq(tableReservations.tableId, parseInt(id)))
            .limit(1);

        if (reservations.length > 0) {
            return NextResponse.json(
                { success: false, error: 'Cannot delete table with active reservations' },
                { status: 400 }
            );
        }

        // Delete table
        await db
            .delete(restaurantTables)
            .where(eq(restaurantTables.id, parseInt(id)));

        return NextResponse.json({
            success: true,
            message: 'Table deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting table:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete table' },
            { status: 500 }
        );
    }
}

// GET /api/tables/availability - Check table availability for a given date and time
export async function getTableAvailability(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');
        const startTime = searchParams.get('startTime');
        const endTime = searchParams.get('endTime');
        const partySize = searchParams.get('partySize');

        if (!date || !startTime || !endTime) {
            return NextResponse.json(
                { success: false, error: 'Date, start time, and end time are required' },
                { status: 400 }
            );
        }

        // Get all active tables
        let tablesQuery = db.select().from(restaurantTables).where(eq(restaurantTables.isActive, true));

        // Filter by party size if provided
        if (partySize) {
            tablesQuery = tablesQuery.where(gte(restaurantTables.capacity, parseInt(partySize)));
        }

        const tables = await tablesQuery;

        // Get all reservations for the given date
        const dateObj = new Date(date);
        const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999));

        const reservations = await db
            .select()
            .from(tableReservations)
            .where(
                and(
                    gte(tableReservations.reservationDate, startOfDay),
                    lte(tableReservations.reservationDate, endOfDay),
                    eq(tableReservations.status, 'confirmed')
                )
            );

        // Check availability for each table
        const availableTables = tables.filter(table => {
            const tableReservations = reservations.filter(res => res.tableId === table.id);

            // Check if any reservation conflicts with the requested time slot
            return !tableReservations.some(res => {
                return (
                    (startTime >= res.startTime && startTime < res.endTime) ||
                    (endTime > res.startTime && endTime <= res.endTime) ||
                    (startTime <= res.startTime && endTime >= res.endTime)
                );
            });
        });

        return NextResponse.json({
            success: true,
            availableTables,
            totalTables: tables.length,
            availableCount: availableTables.length
        });
    } catch (error) {
        console.error('Error checking table availability:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to check table availability' },
            { status: 500 }
        );
    }
} 