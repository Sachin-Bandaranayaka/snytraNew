-- Create customers table if not exists
CREATE TABLE IF NOT EXISTS "customers" (
    "id" SERIAL PRIMARY KEY,
    "company_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create orders table if not exists
CREATE TABLE IF NOT EXISTS "orders" (
    "id" SERIAL PRIMARY KEY,
    "order_id" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "customer_id" INTEGER REFERENCES "customers"("id"),
    "status" TEXT NOT NULL DEFAULT 'created',
    "order_type" TEXT NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "delivery_fee" INTEGER DEFAULT 0,
    "total" INTEGER NOT NULL,
    "payment_method" TEXT,
    "payment_status" TEXT DEFAULT 'pending',
    "transaction_id" TEXT,
    "notes" TEXT,
    "order_date" TIMESTAMP NOT NULL DEFAULT NOW(),
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create order items table if not exists
CREATE TABLE IF NOT EXISTS "order_items" (
    "id" SERIAL PRIMARY KEY,
    "order_id" INTEGER NOT NULL REFERENCES "orders"("id"),
    "menu_item_id" INTEGER, -- Can be null for custom items
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP DEFAULT NOW()
);

-- Create order timeline table if not exists
CREATE TABLE IF NOT EXISTS "order_timeline" (
    "id" SERIAL PRIMARY KEY,
    "order_id" INTEGER NOT NULL REFERENCES "orders"("id"),
    "status" TEXT NOT NULL,
    "user_id" INTEGER REFERENCES "users"("id"),
    "timestamp" TIMESTAMP DEFAULT NOW() NOT NULL,
    "notes" TEXT
); 