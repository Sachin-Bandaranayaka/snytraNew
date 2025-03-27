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
    const sqlPath = path.join(__dirname, '../drizzle/0003_sour_doctor_spectrum.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Split SQL by the statement breakpoint marker
    const statements = sql.split('--> statement-breakpoint');
    
    console.log(`Running migration: 0003_sour_doctor_spectrum.sql (${statements.length} statements)`);
    
    // Execute each SQL statement separately
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (!statement) continue;
      
      try {
        console.log(`Executing statement ${i + 1}/${statements.length}`);
        await client.query(statement);
        console.log(`Statement ${i + 1} executed successfully`);
      } catch (error) {
        console.warn(`Warning: Statement ${i + 1} failed: ${error.message}`);
        // Continue with next statement instead of stopping the entire migration
      }
    }
    
    console.log('Migration completed with some warnings (some statements might have been skipped)');

    client.release();
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    pool.end();
  }
}

runMigration(); 