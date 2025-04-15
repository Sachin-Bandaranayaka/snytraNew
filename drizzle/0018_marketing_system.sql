-- Create email marketing campaigns table
CREATE TABLE IF NOT EXISTS "marketing_campaigns" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "type" TEXT NOT NULL, -- email, sms, push
  "status" TEXT NOT NULL DEFAULT 'draft', -- draft, scheduled, in_progress, paused, completed, cancelled
  "audience_type" TEXT NOT NULL, -- all, loyalty_tier, custom_segment
  "audience_filter" JSONB, -- for custom segments
  "loyalty_tier_id" INTEGER REFERENCES "loyalty_tiers"("id"), -- for tier-specific campaigns
  "schedule_date" TIMESTAMP,
  "completed_date" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create email template table
CREATE TABLE IF NOT EXISTS "email_templates" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "is_default" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create campaign content table to link templates to campaigns
CREATE TABLE IF NOT EXISTS "campaign_content" (
  "id" SERIAL PRIMARY KEY,
  "campaign_id" INTEGER NOT NULL REFERENCES "marketing_campaigns"("id") ON DELETE CASCADE,
  "template_id" INTEGER REFERENCES "email_templates"("id"),
  "subject" TEXT,
  "content" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create campaign delivery table
CREATE TABLE IF NOT EXISTS "campaign_delivery" (
  "id" SERIAL PRIMARY KEY,
  "campaign_id" INTEGER NOT NULL REFERENCES "marketing_campaigns"("id") ON DELETE CASCADE,
  "customer_id" INTEGER NOT NULL REFERENCES "customers"("id") ON DELETE CASCADE,
  "status" TEXT NOT NULL DEFAULT 'pending', -- pending, sent, delivered, opened, clicked, bounced, unsubscribed
  "sent_at" TIMESTAMP,
  "delivered_at" TIMESTAMP,
  "opened_at" TIMESTAMP,
  "clicked_at" TIMESTAMP,
  "tracking_code" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create promotions table
CREATE TABLE IF NOT EXISTS "promotions" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "campaign_id" INTEGER REFERENCES "marketing_campaigns"("id") ON DELETE SET NULL,
  "name" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "type" TEXT NOT NULL, -- percent_off, amount_off, free_item, bogo
  "value" INTEGER, -- amount in cents or percent
  "menu_item_id" INTEGER REFERENCES "menu_items"("id"), -- for free_item type
  "minimum_order" INTEGER, -- minimum order amount in cents
  "maximum_discount" INTEGER, -- maximum discount amount in cents
  "is_first_order_only" BOOLEAN DEFAULT FALSE,
  "is_one_time_use" BOOLEAN DEFAULT FALSE,
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "start_date" TIMESTAMP,
  "end_date" TIMESTAMP,
  "usage_limit" INTEGER, -- max number of times this code can be used
  "usage_count" INTEGER DEFAULT 0, -- number of times this code has been used
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create table for tracking promotion usage
CREATE TABLE IF NOT EXISTS "promotion_usage" (
  "id" SERIAL PRIMARY KEY,
  "promotion_id" INTEGER NOT NULL REFERENCES "promotions"("id") ON DELETE CASCADE,
  "order_id" INTEGER NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
  "customer_id" INTEGER NOT NULL REFERENCES "customers"("id") ON DELETE CASCADE,
  "amount" INTEGER NOT NULL, -- discount amount in cents
  "created_at" TIMESTAMP DEFAULT NOW()
);

-- Add promotion_id to orders table
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "promotion_id" INTEGER REFERENCES "promotions"("id");
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "promotion_discount" INTEGER; 