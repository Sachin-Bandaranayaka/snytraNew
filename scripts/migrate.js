const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function runMigration() {
  // Connect to the database
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const client = await pool.connect();
    console.log('Connected to database successfully');

    // Read the SQL file
    const sqlPath = path.join(__dirname, '../drizzle/0003_stripe_subscription_fields.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Execute the SQL statements
    console.log('Running migration: 0003_stripe_subscription_fields.sql');
    await client.query(sql);
    console.log('Migration completed successfully');

    // Update the journal
    console.log('Updating journal...');
    
    client.release();
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    pool.end();
  }
}

runMigration(); 