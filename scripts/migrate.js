import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Initialize dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

const { Pool } = pg;

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

    // Read all migration files in the drizzle directory
    const drizzleDir = path.join(__dirname, '../drizzle');
    const files = fs.readdirSync(drizzleDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Sort to ensure migrations run in correct order
    
    console.log(`Found ${files.length} migration files to run`);
    
    for (const file of files) {
      console.log(`Running migration: ${file}`);
      
      // Read the SQL file
      const sqlPath = path.join(drizzleDir, file);
      const sql = fs.readFileSync(sqlPath, 'utf8');

      // Split SQL by the statement breakpoint marker
      const statements = sql.split('--> statement-breakpoint');
      
      console.log(`Migration ${file} has ${statements.length} statements`);
      
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
      
      console.log(`Migration ${file} completed`);
    }
    
    console.log('All migrations completed');

    client.release();
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    pool.end();
  }
}

runMigration(); 