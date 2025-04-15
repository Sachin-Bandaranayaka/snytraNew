-- Ensure orders table has correct column structure
CREATE TABLE IF NOT EXISTS "temp_orders" (
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

-- Copy data if the original table exists
INSERT INTO "temp_orders" ("id", "orderId", "companyId", "customerId", "status", "orderType", "subtotal", "tax", "deliveryFee", "total", "paymentMethod", "paymentStatus", "transactionId", "notes", "orderDate", "createdAt", "updatedAt")
SELECT "id", "order_id", "companyId", "customer_id", "status", "order_type", "subtotal", "tax", "delivery_fee", "total", "payment_method", "payment_status", "transaction_id", "notes", "order_date", "created_at", "updated_at"
FROM "orders"
ON CONFLICT (id) DO NOTHING;

-- Drop the old table and rename the new one
DROP TABLE IF EXISTS "orders";
ALTER TABLE "temp_orders" RENAME TO "orders"; 