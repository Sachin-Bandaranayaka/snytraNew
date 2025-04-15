-- Create customer loyalty table for tracking points and rewards
CREATE TABLE IF NOT EXISTS "loyalty_program" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL DEFAULT 'Rewards Program',
  "description" TEXT,
  "points_per_dollar" INTEGER NOT NULL DEFAULT 10,
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create loyalty tiers table
CREATE TABLE IF NOT EXISTS "loyalty_tiers" (
  "id" SERIAL PRIMARY KEY,
  "loyalty_program_id" INTEGER NOT NULL REFERENCES "loyalty_program"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "minimum_points" INTEGER NOT NULL,
  "benefits" TEXT,
  "color" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create customer loyalty accounts table
CREATE TABLE IF NOT EXISTS "customer_loyalty" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" INTEGER NOT NULL REFERENCES "customers"("id") ON DELETE CASCADE,
  "loyalty_program_id" INTEGER NOT NULL REFERENCES "loyalty_program"("id") ON DELETE CASCADE,
  "points_balance" INTEGER NOT NULL DEFAULT 0,
  "lifetime_points" INTEGER NOT NULL DEFAULT 0,
  "tier_id" INTEGER REFERENCES "loyalty_tiers"("id"),
  "join_date" TIMESTAMP DEFAULT NOW(),
  "last_activity" TIMESTAMP DEFAULT NOW(),
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  UNIQUE("customer_id", "loyalty_program_id")
);

-- Create loyalty transactions table
CREATE TABLE IF NOT EXISTS "loyalty_transactions" (
  "id" SERIAL PRIMARY KEY,
  "customer_loyalty_id" INTEGER NOT NULL REFERENCES "customer_loyalty"("id") ON DELETE CASCADE,
  "points" INTEGER NOT NULL,
  "type" TEXT NOT NULL, -- earn, redeem, adjust, expire
  "source" TEXT NOT NULL, -- order, promotion, referral, manual, etc.
  "source_id" TEXT, -- ID of the source (e.g., order_id)
  "description" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW()
);

-- Create loyalty rewards table
CREATE TABLE IF NOT EXISTS "loyalty_rewards" (
  "id" SERIAL PRIMARY KEY,
  "loyalty_program_id" INTEGER NOT NULL REFERENCES "loyalty_program"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "point_cost" INTEGER NOT NULL,
  "reward_type" TEXT NOT NULL, -- discount, free_item, gift_card, etc.
  "reward_value" INTEGER, -- value in cents for discounts/gift cards
  "menu_item_id" INTEGER REFERENCES "menu_items"("id"), -- for free_item type
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for tracking redeemed rewards
CREATE TABLE IF NOT EXISTS "redeemed_rewards" (
  "id" SERIAL PRIMARY KEY,
  "customer_loyalty_id" INTEGER NOT NULL REFERENCES "customer_loyalty"("id") ON DELETE CASCADE,
  "reward_id" INTEGER NOT NULL REFERENCES "loyalty_rewards"("id") ON DELETE CASCADE,
  "transaction_id" INTEGER NOT NULL REFERENCES "loyalty_transactions"("id") ON DELETE CASCADE,
  "code" TEXT NOT NULL, -- unique code for the redeemed reward
  "status" TEXT NOT NULL DEFAULT 'active', -- active, used, expired, revoked
  "used_date" TIMESTAMP,
  "expiry_date" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Add loyalty points fields to orders table
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "loyalty_points_earned" INTEGER;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "loyalty_points_redeemed" INTEGER;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "loyalty_discount_amount" INTEGER; 