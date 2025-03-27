const { neon } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-http');
const { migrate } = require('drizzle-orm/neon-http/migrator');
const path = require('path');

// Get the database URL from environment variables
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('No DATABASE_URL environment variable found');
  process.exit(1);
}

async function main() {
  console.log('Starting migration...');
  
  try {
    // Create a connection to the database
    const sql = neon(databaseUrl);
    const db = drizzle(sql);
    
    // Run migrations from the 'drizzle' folder
    await migrate(db, { migrationsFolder: path.join(__dirname, '../drizzle') });
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

main(); 