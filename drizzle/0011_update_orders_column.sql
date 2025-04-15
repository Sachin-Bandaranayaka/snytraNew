-- Rename company_id column to match the schema
ALTER TABLE IF EXISTS "orders" 
RENAME COLUMN "company_id" TO "companyId"; 