import { db } from '../lib/db.js';
import { users } from '../lib/schema.js';

async function listUsers() {
  try {
    console.log('Fetching users from the database...');
    
    const allUsers = await db.select().from(users);
    
    console.log('\nUsers found:');
    allUsers.forEach(user => {
      console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Role: ${user.role}, CreatedAt: ${user.createdAt}`);
    });
    
    console.log(`\nTotal users: ${allUsers.length}`);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    process.exit(1);
  }
}

listUsers(); 