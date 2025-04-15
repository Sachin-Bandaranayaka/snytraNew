-- Create inventory categories table
CREATE TABLE IF NOT EXISTS "inventory_categories" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for inventory suppliers
CREATE TABLE IF NOT EXISTS "suppliers" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "contact_name" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "address" TEXT,
  "website" TEXT,
  "notes" TEXT,
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "payment_terms" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Add fields to inventory_items table
ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "category_id" INTEGER REFERENCES "inventory_categories"("id");
ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "supplier_id" INTEGER REFERENCES "suppliers"("id");
ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "barcode" TEXT;
ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "expiry_tracking" BOOLEAN DEFAULT FALSE;
ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "storage_location" TEXT;
ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "minimum_order_quantity" INTEGER DEFAULT 1;
ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "lead_time_days" INTEGER;
ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "last_ordered_date" TIMESTAMP;
ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "tax_rate" DECIMAL(5,2);
ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "average_cost" INTEGER;

-- Create table for inventory item batches (for expiry tracking)
CREATE TABLE IF NOT EXISTS "inventory_batches" (
  "id" SERIAL PRIMARY KEY,
  "inventory_item_id" INTEGER NOT NULL REFERENCES "inventory_items"("id") ON DELETE CASCADE,
  "batch_number" TEXT,
  "quantity" INTEGER NOT NULL,
  "cost_per_unit" INTEGER,
  "expiry_date" TIMESTAMP,
  "received_date" TIMESTAMP NOT NULL DEFAULT NOW(),
  "notes" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for purchase orders
CREATE TABLE IF NOT EXISTS "purchase_orders" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "supplier_id" INTEGER NOT NULL REFERENCES "suppliers"("id") ON DELETE CASCADE,
  "po_number" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'draft', -- draft, submitted, partial, received, cancelled
  "order_date" TIMESTAMP,
  "expected_delivery_date" TIMESTAMP,
  "delivery_date" TIMESTAMP,
  "subtotal" INTEGER, -- in cents
  "tax" INTEGER, -- in cents
  "shipping" INTEGER, -- in cents
  "total" INTEGER, -- in cents
  "notes" TEXT,
  "created_by" INTEGER REFERENCES "users"("id"),
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for purchase order items
CREATE TABLE IF NOT EXISTS "purchase_order_items" (
  "id" SERIAL PRIMARY KEY,
  "purchase_order_id" INTEGER NOT NULL REFERENCES "purchase_orders"("id") ON DELETE CASCADE,
  "inventory_item_id" INTEGER NOT NULL REFERENCES "inventory_items"("id") ON DELETE CASCADE,
  "quantity" INTEGER NOT NULL,
  "unit_cost" INTEGER NOT NULL, -- in cents
  "received_quantity" INTEGER DEFAULT 0,
  "subtotal" INTEGER NOT NULL, -- in cents
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for inventory transactions
CREATE TABLE IF NOT EXISTS "inventory_transactions" (
  "id" SERIAL PRIMARY KEY,
  "inventory_item_id" INTEGER NOT NULL REFERENCES "inventory_items"("id") ON DELETE CASCADE,
  "batch_id" INTEGER REFERENCES "inventory_batches"("id") ON DELETE SET NULL,
  "quantity" INTEGER NOT NULL, -- positive for additions, negative for deductions
  "transaction_type" TEXT NOT NULL, -- purchase, sale, adjustment, waste, transfer
  "reference_id" TEXT, -- PO number, order number, etc.
  "notes" TEXT,
  "created_by" INTEGER REFERENCES "users"("id"),
  "created_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for recipe ingredients
CREATE TABLE IF NOT EXISTS "recipe_ingredients" (
  "id" SERIAL PRIMARY KEY,
  "menu_item_id" INTEGER NOT NULL REFERENCES "menu_items"("id") ON DELETE CASCADE,
  "inventory_item_id" INTEGER NOT NULL REFERENCES "inventory_items"("id") ON DELETE CASCADE,
  "quantity" DECIMAL(10,2) NOT NULL,
  "unit" TEXT NOT NULL,
  "notes" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  UNIQUE("menu_item_id", "inventory_item_id")
);

-- Add forecasting to menu items
ALTER TABLE "menu_items" ADD COLUMN IF NOT EXISTS "average_daily_orders" INTEGER;
ALTER TABLE "menu_items" ADD COLUMN IF NOT EXISTS "cost_of_goods" INTEGER; -- in cents 