import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';

export async function GET(request: NextRequest) {
    try {
        const results = {
            databaseUrl: process.env.DATABASE_URL ? 'Configured (value hidden)' : 'Not configured',
            connectionTest: null,
            rawQueryTest: null,
            tableExistsTests: {},
            error: null
        };

        // Test 1: Direct connection test
        try {
            const directSql = neon(process.env.DATABASE_URL!);
            const connectionTest = await directSql('SELECT 1 as connection_test');
            results.connectionTest = connectionTest.rows?.[0]?.connection_test === 1
                ? 'Success'
                : 'Failed: Unexpected response';
        } catch (error) {
            results.connectionTest = `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }

        // Test 2: Basic raw query test using drizzle
        try {
            const rawTest = await db.execute(sql`SELECT 2 as raw_test`);
            results.rawQueryTest = rawTest.rows?.[0]?.raw_test === 2
                ? 'Success'
                : 'Failed: Unexpected response';
        } catch (error) {
            results.rawQueryTest = `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }

        // Test 3: Check if key tables exist
        const tables = [
            'users', 'menu_items', 'menu_categories', 'inventory_items',
            'orders', 'order_items', 'customers'
        ];

        for (const table of tables) {
            try {
                const tableTest = await db.execute(sql`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_name = ${table}
          ) as table_exists
        `);

                results.tableExistsTests[table] = tableTest.rows?.[0]?.table_exists === true
                    ? 'Table exists'
                    : 'Table does not exist';
            } catch (error) {
                results.tableExistsTests[table] = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
            }
        }

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
} 