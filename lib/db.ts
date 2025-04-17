import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Configure Neon connection with timeouts and retries
neonConfig.fetchConnectionCache = true;
neonConfig.fetchTimeout = 10000; // 10 seconds
neonConfig.wsConnectionTimeoutMs = 10000; // 10 seconds

// Ensure the database URL is defined
if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not defined!');
}

let dbInstance: ReturnType<typeof createDbInstance> | null = null;

function createDbInstance() {
    const sql = neon(process.env.DATABASE_URL!);
    return drizzle(sql, { schema });
}

// Export a singleton database instance
export const db = (() => {
    if (!dbInstance) {
        dbInstance = createDbInstance();
    }
    return dbInstance;
})();

// Helper function to execute raw SQL queries with improved error handling
export async function executeQuery(query: string, params: any[] = []) {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not defined');
        }

        // Create a new connection for each query to avoid issues with concurrent requests
        const sql = neon(process.env.DATABASE_URL);

        // Log the query for debugging (but remove in production)
        if (process.env.NODE_ENV !== 'production') {
            console.log('Executing query:', query, 'with params:', params);
        }

        // Execute the query with parameters to avoid SQL injection
        const result = await sql(query, params);
        return result;
    } catch (error) {
        console.error('Database query error:', error);
        // Enhance error details for easier debugging
        const enhancedError = new Error(
            `Database query failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        throw enhancedError;
    }
} 