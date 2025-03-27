// This script directly sets a user to admin role via SQL
// Usage: node scripts/set-admin-direct.js your@email.com

const { Client } = require('pg');
require('dotenv').config();

async function setUserToAdmin(email) {
  if (!email) {
    console.error('Please provide an email address');
    console.log('Usage: node scripts/set-admin-direct.js your@email.com');
    process.exit(1);
  }

  // Create a PostgreSQL client using the connection string from .env
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log(`Connecting to database...`);
    await client.connect();
    
    console.log(`Setting user ${email} to admin role...`);
    
    // Find user first
    const findResult = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (findResult.rows.length === 0) {
      console.error(`User with email ${email} not found`);
      process.exit(1);
    }
    
    const user = findResult.rows[0];
    console.log(`Found user: ${user.name || user.email} (ID: ${user.id})`);
    
    // Update user role to admin
    await client.query(
      'UPDATE users SET role = $1 WHERE id = $2',
      ['admin', user.id]
    );
    
    console.log(`User ${email} has been set to admin role successfully!`);
  } catch (error) {
    console.error('Error setting user to admin:', error);
  } finally {
    await client.end();
  }
}

// Get the email from command line arguments
const email = process.argv[2];
setUserToAdmin(email); 