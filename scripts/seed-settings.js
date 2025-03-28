import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const { Pool } = pg;

async function seedSettings() {
  // Connect to the database
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });

  try {
    const client = await pool.connect();
    console.log('Connected to database successfully');

    // Insert default maintenance settings if they don't exist
    const insertMaintenanceModeSql = `
      INSERT INTO system_settings (key, value, description, category)
      VALUES ('maintenance_mode', 'false', 'When enabled, the site displays a maintenance page to all non-admin users', 'system')
      ON CONFLICT (key) DO NOTHING;
    `;
    
    const insertMaintenanceMessageSql = `
      INSERT INTO system_settings (key, value, description, category)
      VALUES ('maintenance_message', 'We are currently performing scheduled maintenance. Please check back soon.', 'Message displayed on the maintenance page', 'system')
      ON CONFLICT (key) DO NOTHING;
    `;
    
    // Insert general settings
    const insertCompanyNameSql = `
      INSERT INTO system_settings (key, value, description, category)
      VALUES ('company_name', 'Restaurant Name', 'Your restaurant name displayed throughout the site', 'general')
      ON CONFLICT (key) DO NOTHING;
    `;
    
    const insertSupportEmailSql = `
      INSERT INTO system_settings (key, value, description, category)
      VALUES ('support_email', 'support@example.com', 'Email address for customer support inquiries', 'general')
      ON CONFLICT (key) DO NOTHING;
    `;
    
    const insertBusinessHoursSql = `
      INSERT INTO system_settings (key, value, description, category)
      VALUES ('business_hours', 'Monday-Friday: 9am-10pm, Saturday-Sunday: 10am-11pm', 'Your restaurant business hours', 'general')
      ON CONFLICT (key) DO NOTHING;
    `;
    
    // Execute the insert statements
    await client.query(insertMaintenanceModeSql);
    console.log('Maintenance mode setting inserted');
    
    await client.query(insertMaintenanceMessageSql);
    console.log('Maintenance message setting inserted');
    
    await client.query(insertCompanyNameSql);
    console.log('Company name setting inserted');
    
    await client.query(insertSupportEmailSql);
    console.log('Support email setting inserted');
    
    await client.query(insertBusinessHoursSql);
    console.log('Business hours setting inserted');
    
    console.log('Settings seeded successfully');

    client.release();
  } catch (err) {
    console.error('Seeding settings failed:', err);
  } finally {
    pool.end();
  }
}

seedSettings(); 