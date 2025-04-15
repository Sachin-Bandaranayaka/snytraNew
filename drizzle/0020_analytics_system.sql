-- Create table for sales analytics
CREATE TABLE IF NOT EXISTS "sales_analytics" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "date" DATE NOT NULL,
  "total_sales" INTEGER NOT NULL, -- in cents
  "order_count" INTEGER NOT NULL,
  "average_order_value" INTEGER NOT NULL, -- in cents
  "menu_category_breakdown" JSONB,
  "order_type_breakdown" JSONB,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for customer analytics
CREATE TABLE IF NOT EXISTS "customer_analytics" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "date" DATE NOT NULL,
  "new_customers" INTEGER NOT NULL,
  "returning_customers" INTEGER NOT NULL,
  "total_customers" INTEGER NOT NULL,
  "loyatly_signups" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for inventory analytics
CREATE TABLE IF NOT EXISTS "inventory_analytics" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "date" DATE NOT NULL,
  "total_value" INTEGER NOT NULL, -- in cents
  "low_stock_count" INTEGER NOT NULL,
  "out_of_stock_count" INTEGER NOT NULL,
  "waste_value" INTEGER NOT NULL DEFAULT 0, -- in cents
  "category_breakdown" JSONB,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for staff performance
CREATE TABLE IF NOT EXISTS "staff_performance" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "date" DATE NOT NULL,
  "orders_processed" INTEGER NOT NULL DEFAULT 0,
  "sales_total" INTEGER NOT NULL DEFAULT 0, -- in cents
  "hours_worked" DECIMAL(5,2) NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for saved reports
CREATE TABLE IF NOT EXISTS "saved_reports" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "report_type" TEXT NOT NULL, -- sales, inventory, customers, staff, custom
  "parameters" JSONB NOT NULL,
  "last_run" TIMESTAMP,
  "schedule" TEXT, -- daily, weekly, monthly, etc.
  "recipients" JSONB, -- array of email addresses
  "created_by" INTEGER REFERENCES "users"("id"),
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for dashboard widgets
CREATE TABLE IF NOT EXISTS "dashboard_widgets" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "widget_type" TEXT NOT NULL, -- sales_chart, inventory_status, etc.
  "title" TEXT NOT NULL,
  "config" JSONB NOT NULL,
  "position" INTEGER NOT NULL,
  "size" TEXT NOT NULL DEFAULT 'medium', -- small, medium, large
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Add forecasting columns to menu items
ALTER TABLE "menu_items" ADD COLUMN IF NOT EXISTS "projected_sales" INTEGER; 