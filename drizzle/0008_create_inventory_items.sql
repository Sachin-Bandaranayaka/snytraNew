CREATE TABLE IF NOT EXISTS "inventory_items" (
    "id" SERIAL PRIMARY KEY,
    "company_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sku" TEXT,
    "category" TEXT,
    "unit" TEXT,
    "quantity" INTEGER DEFAULT 0,
    "reorder_level" INTEGER DEFAULT 10,
    "cost_per_unit" INTEGER,
    "supplier" TEXT,
    "image_url" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
); 