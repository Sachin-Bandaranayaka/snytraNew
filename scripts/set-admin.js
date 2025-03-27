// This script sets a user to admin role
// Usage: npx tsx scripts/set-admin.js your@email.com

import { db } from '../lib/db';
import { users } from '../lib/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function setUserToAdmin(email) {
  if (!email) {
    console.error('Please provide an email address');
    console.log('Usage: npx tsx scripts/set-admin.js your@email.com');
    process.exit(1);
  }

  try {
    console.log(`Setting user ${email} to admin role...`);
    
    // Find the user
    const userResults = await db.select().from(users).where(eq(users.email, email));
    
    if (userResults.length === 0) {
      console.error(`User with email ${email} not found`);
      process.exit(1);
    }
    
    const user = userResults[0];
    console.log(`Found user: ${user.name || user.email} (ID: ${user.id})`);
    
    // Update the user's role to admin
    await db.update(users)
      .set({ role: 'admin' })
      .where(eq(users.id, user.id));
    
    console.log(`User ${email} has been set to admin role`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error setting user to admin:', error);
    process.exit(1);
  }
}

// Get the email from command line arguments
const email = process.argv[2];
setUserToAdmin(email); 