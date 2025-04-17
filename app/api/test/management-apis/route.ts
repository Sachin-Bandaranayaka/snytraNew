import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { menuItems, orders, inventoryItems } from '@/lib/schema';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        // Check if the user is authenticated
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized - You must be logged in to test the APIs' },
                { status: 401 }
            );
        }

        const results = {
            currentUser: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            menuItems: {
                rawSql: null,
                drizzleQuery: null,
                error: null
            },
            orders: {
                rawSql: null,
                drizzleQuery: null,
                error: null
            },
            inventory: {
                rawSql: null,
                drizzleQuery: null,
                error: null
            }
        };

        // Test Menu Items API
        try {
            // Try with raw SQL
            const rawMenuQuery = `
        SELECT COUNT(*) as count 
        FROM menu_items 
        WHERE "company_id" = ${user.id}
      `;

            const rawMenuResult = await db.execute(rawMenuQuery);
            results.menuItems.rawSql = {
                count: parseInt(rawMenuResult.rows?.[0]?.count || '0'),
                message: 'Raw SQL query successful'
            };

            // Try with Drizzle query
            const drizzleMenuResult = await db.select({
                count: sql`COUNT(*)`
            }).from(menuItems);

            results.menuItems.drizzleQuery = {
                count: Number(drizzleMenuResult[0]?.count || 0),
                message: 'Drizzle query successful'
            };
        } catch (error) {
            results.menuItems.error = error instanceof Error ? error.message : 'Unknown error';
        }

        // Test Orders API
        try {
            // Try with raw SQL
            const rawOrdersQuery = `
        SELECT COUNT(*) as count 
        FROM orders 
        WHERE "company_id" = ${user.id}
      `;

            const rawOrdersResult = await db.execute(rawOrdersQuery);
            results.orders.rawSql = {
                count: parseInt(rawOrdersResult.rows?.[0]?.count || '0'),
                message: 'Raw SQL query successful'
            };

            // Try with Drizzle query
            const drizzleOrdersResult = await db.select({
                count: sql`COUNT(*)`
            }).from(orders);

            results.orders.drizzleQuery = {
                count: Number(drizzleOrdersResult[0]?.count || 0),
                message: 'Drizzle query successful'
            };
        } catch (error) {
            results.orders.error = error instanceof Error ? error.message : 'Unknown error';
        }

        // Test Inventory API
        try {
            // Try with raw SQL
            const rawInventoryQuery = `
        SELECT COUNT(*) as count 
        FROM inventory_items 
        WHERE "company_id" = ${user.id}
      `;

            const rawInventoryResult = await db.execute(rawInventoryQuery);
            results.inventory.rawSql = {
                count: parseInt(rawInventoryResult.rows?.[0]?.count || '0'),
                message: 'Raw SQL query successful'
            };

            // Try with Drizzle query
            const drizzleInventoryResult = await db.select({
                count: sql`COUNT(*)`
            }).from(inventoryItems);

            results.inventory.drizzleQuery = {
                count: Number(drizzleInventoryResult[0]?.count || 0),
                message: 'Drizzle query successful'
            };
        } catch (error) {
            results.inventory.error = error instanceof Error ? error.message : 'Unknown error';
        }

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
} 