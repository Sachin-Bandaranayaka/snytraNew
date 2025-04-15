import pg from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
}

async function main() {
    const client = new pg.Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log('Connected to the database');

        // Query to get column names of inventory_items table
        const inventoryColumnsQuery = `
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'inventory_items'
      ORDER BY ordinal_position;
    `;

        // Query to get column names of menu_items table
        const menuColumnsQuery = `
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'menu_items'
      ORDER BY ordinal_position;
    `;

        // Query to get column names of orders table
        const ordersColumnsQuery = `
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'orders'
      ORDER BY ordinal_position;
    `;

        // Execute queries
        console.log('=== Inventory Items Columns ===');
        const inventoryResult = await client.query(inventoryColumnsQuery);
        inventoryResult.rows.forEach(row => {
            console.log(`${row.column_name} (${row.data_type})`);
        });

        console.log('\n=== Menu Items Columns ===');
        const menuResult = await client.query(menuColumnsQuery);
        menuResult.rows.forEach(row => {
            console.log(`${row.column_name} (${row.data_type})`);
        });

        console.log('\n=== Orders Columns ===');
        const ordersResult = await client.query(ordersColumnsQuery);
        ordersResult.rows.forEach(row => {
            console.log(`${row.column_name} (${row.data_type})`);
        });

    } catch (error) {
        console.error('Error checking database schema:', error);
    } finally {
        await client.end();
        console.log('Database connection closed');
    }
}

main(); 