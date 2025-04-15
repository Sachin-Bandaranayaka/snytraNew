-- Restaurant Management System Schema

-- Company settings table for tenant-specific configuration
CREATE TABLE "company_settings" (
    "id" serial PRIMARY KEY NOT NULL,
    "company_id" integer NOT NULL,
    "logo_url" text,
    "primary_color" text DEFAULT '#e85c2c',
    "secondary_color" text DEFAULT '#f8f5eb',
    "site_title" text,
    "site_description" text,
    "business_hours" text,
    "address" text,
    "phone" text,
    "email" text,
    "social_media" jsonb,
    "custom_domain" text,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

-- Menu Categories
CREATE TABLE "menu_categories" (
    "id" serial PRIMARY KEY NOT NULL,
    "company_id" integer NOT NULL,
    "name" text NOT NULL,
    "description" text,
    "image_url" text,
    "display_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

-- Menu Items
CREATE TABLE "menu_items" (
    "id" serial PRIMARY KEY NOT NULL,
    "company_id" integer NOT NULL,
    "category_id" integer NOT NULL,
    "name" text NOT NULL,
    "description" text,
    "price" integer NOT NULL, -- Price in cents
    "image_url" text,
    "is_vegetarian" boolean DEFAULT false,
    "is_vegan" boolean DEFAULT false,
    "is_gluten_free" boolean DEFAULT false,
    "spice_level" integer,
    "preparation_time" integer, -- In minutes
    "is_active" boolean DEFAULT true,
    "is_featured" boolean DEFAULT false,
    "display_order" integer DEFAULT 0,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

-- Inventory Items
CREATE TABLE "inventory_items" (
    "id" serial PRIMARY KEY NOT NULL,
    "company_id" integer NOT NULL,
    "name" text NOT NULL,
    "description" text,
    "sku" text,
    "category" text,
    "unit" text,
    "quantity" integer DEFAULT 0,
    "reorder_level" integer DEFAULT 10,
    "cost_per_unit" integer, -- Cost in cents
    "supplier" text,
    "image_url" text,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

-- Customer Orders
CREATE TABLE "orders" (
    "id" serial PRIMARY KEY NOT NULL,
    "company_id" integer NOT NULL,
    "customer_id" integer,
    "table_number" integer,
    "order_number" text NOT NULL,
    "status" text DEFAULT 'pending', -- pending, in-progress, completed, cancelled
    "total_amount" integer NOT NULL, -- Amount in cents
    "payment_status" text DEFAULT 'unpaid', -- unpaid, paid, refunded
    "payment_method" text,
    "order_type" text DEFAULT 'dine-in', -- dine-in, takeaway, delivery
    "delivery_address" text,
    "delivery_fee" integer DEFAULT 0, -- Fee in cents
    "tax_amount" integer DEFAULT 0, -- Tax in cents
    "discount_amount" integer DEFAULT 0, -- Discount in cents
    "special_instructions" text,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

-- Order Items
CREATE TABLE "order_items" (
    "id" serial PRIMARY KEY NOT NULL,
    "order_id" integer NOT NULL,
    "menu_item_id" integer NOT NULL,
    "quantity" integer NOT NULL,
    "unit_price" integer NOT NULL, -- Price in cents
    "total_price" integer NOT NULL, -- Price in cents
    "notes" text,
    "created_at" timestamp DEFAULT now()
);

-- Staff (Users) - will use existing users table with enhanced role permissions
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "position" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "hourly_rate" integer;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "weekly_hours" integer;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "company_id" integer;

-- Module Access Table - to control subscription-based access to different modules
CREATE TABLE "module_access" (
    "id" serial PRIMARY KEY NOT NULL,
    "company_id" integer NOT NULL,
    "module_name" text NOT NULL, -- dashboard, order_management, inventory_management, etc.
    "is_enabled" boolean DEFAULT false,
    "max_users" integer DEFAULT 1,
    "expires_at" timestamp,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

-- Foreign key constraints
ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_company_id_users_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "menu_categories" ADD CONSTRAINT "menu_categories_company_id_users_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_company_id_users_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_menu_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."menu_categories"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_company_id_users_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "orders" ADD CONSTRAINT "orders_company_id_users_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_menu_item_id_menu_items_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_items"("id") ON DELETE restrict ON UPDATE no action;
ALTER TABLE "module_access" ADD CONSTRAINT "module_access_company_id_users_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action; 