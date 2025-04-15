import pg from 'pg';
import * as fs from 'fs';
import * as path from 'path';
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

        // Read the migration SQL file
        const sqlFilePath = path.join(process.cwd(), 'drizzle', '0021_fix_column_naming.sql');
        const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

        // Split the SQL file by statements (separated by semicolons)
        const statements = sqlContent
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        console.log(`Found ${statements.length} SQL statements to execute`);

        // Execute each statement
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            console.log(`Executing statement ${i + 1}: ${statement.substring(0, 50)}...`);

            try {
                await client.query(statement);
                console.log(`Statement ${i + 1} executed successfully`);
            } catch (error: any) {
                // If the column doesn't exist, that's fine - it means the migration was already applied or the table structure is different
                if (error.message.includes('column') && error.message.includes('does not exist')) {
                    console.log(`Statement ${i + 1} skipped: ${error.message}`);
                } else {
                    throw error;
                }
            }
        }

        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Error applying migration:', error);
    } finally {
        await client.end();
        console.log('Database connection closed');
    }
}

main(); 