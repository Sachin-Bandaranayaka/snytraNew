-- Create Module Access Table
CREATE TABLE IF NOT EXISTS "module_access" (
    "id" serial PRIMARY KEY NOT NULL,
    "company_id" integer NOT NULL,
    "module_name" text NOT NULL,
    "is_enabled" boolean NOT NULL DEFAULT false,
    "max_users" integer DEFAULT 1,
    "expires_at" timestamp,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    UNIQUE("company_id", "module_name")
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_module_access_company_id ON "module_access" ("company_id");
CREATE INDEX IF NOT EXISTS idx_module_access_module_name ON "module_access" ("module_name"); 