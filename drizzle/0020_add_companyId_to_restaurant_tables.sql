-- Add companyId to restaurant_tables table
ALTER TABLE "restaurant_tables" ADD COLUMN IF NOT EXISTS "company_id" INTEGER;

-- Add foreign key reference to users table
ALTER TABLE "restaurant_tables" 
    ADD CONSTRAINT "restaurant_tables_company_id_fkey" 
    FOREIGN KEY ("company_id") REFERENCES "users"("id"); 