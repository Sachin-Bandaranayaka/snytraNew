# Database Migration Scripts

This directory contains scripts for setting up and migrating database tables.

## Available Scripts

- `migrate.js` - Main migration script for initial tables
- `migrate-settings.js` - Create and seed system settings table
- `migrate-faq.js` - Create and seed FAQ tables
- `migrate-carousel-testimonials.js` - Create and seed carousel images and testimonials tables
- `set-admin.js` - Set a user as admin
- `set-admin-direct.js` - Set a user as admin directly in the database
- `list-users.js` - List all users in the database
- `test-subscription.js` - Test subscription functionality

## Running Migrations

To run a migration script, use Node.js:

```bash
# Create main tables
node scripts/migrate.js

# Create settings tables
node scripts/migrate-settings.js

# Create FAQ tables
node scripts/migrate-faq.js

# Create carousel and testimonials tables
node scripts/migrate-carousel-testimonials.js
```

## User Management

```bash
# List all users
node scripts/list-users.js

# Set a user as admin
node scripts/set-admin.js

# Set a user as admin directly in the database
node scripts/set-admin-direct.js
```

## Notes

- Make sure your database connection is properly configured in `.env` or `.env.local` before running these scripts.
- These scripts are idempotent - running them multiple times will not create duplicate tables or data.
