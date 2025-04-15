-- Create restaurant_theme table for storing customization options
CREATE TABLE IF NOT EXISTS "restaurant_theme" (
  "id" SERIAL PRIMARY KEY,
  "company_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "font_family" TEXT DEFAULT 'Inter',
  "menu_layout" TEXT DEFAULT 'grid',
  "hero_style" TEXT DEFAULT 'centered',
  "accent_color" TEXT DEFAULT '#e85c2c',
  "button_style" TEXT DEFAULT 'rounded',
  "custom_css" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Add additional fields to company_settings for more branding options
ALTER TABLE "company_settings" ADD COLUMN IF NOT EXISTS "favicon_url" TEXT;
ALTER TABLE "company_settings" ADD COLUMN IF NOT EXISTS "banner_image_url" TEXT;
ALTER TABLE "company_settings" ADD COLUMN IF NOT EXISTS "footer_text" TEXT;
ALTER TABLE "company_settings" ADD COLUMN IF NOT EXISTS "meta_description" TEXT;
ALTER TABLE "company_settings" ADD COLUMN IF NOT EXISTS "google_analytics_id" TEXT;
ALTER TABLE "company_settings" ADD COLUMN IF NOT EXISTS "custom_domain_verified" BOOLEAN DEFAULT FALSE; 