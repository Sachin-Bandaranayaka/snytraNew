-- Rebuild the orders table with the correct column names
DROP TABLE IF EXISTS "order_items" CASCADE;
DROP TABLE IF EXISTS "order_timeline" CASCADE;
DROP TABLE IF EXISTS "orders" CASCADE;

-- Now create tables using camelCase column names to match the schema
CREATE TABLE IF NOT EXISTS "orders" (
    "id" SERIAL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL REFERENCES "users"("id"),
    "customerId" INTEGER REFERENCES "customers"("id"),
    "status" TEXT NOT NULL DEFAULT 'created',
    "orderType" TEXT NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "deliveryFee" INTEGER DEFAULT 0,
    "total" INTEGER NOT NULL,
    "paymentMethod" TEXT,
    "paymentStatus" TEXT DEFAULT 'pending',
    "transactionId" TEXT,
    "notes" TEXT,
    "orderDate" TIMESTAMP NOT NULL DEFAULT NOW(),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "order_items" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INTEGER NOT NULL REFERENCES "orders"("id"),
    "menuItemId" INTEGER,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "order_timeline" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INTEGER NOT NULL REFERENCES "orders"("id"),
    "status" TEXT NOT NULL,
    "userId" INTEGER REFERENCES "users"("id"),
    "timestamp" TIMESTAMP DEFAULT NOW() NOT NULL,
    "notes" TEXT
); 