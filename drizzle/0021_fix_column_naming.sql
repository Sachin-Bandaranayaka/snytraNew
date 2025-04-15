-- Fix column naming inconsistencies for all tables that still use snake_case
-- Instead of camelCase that's expected by the app code

-- Fix menu_items table
ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "company_id" TO "companyId";

ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "category_id" TO "categoryId";

ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "is_vegetarian" TO "isVegetarian";

ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "is_vegan" TO "isVegan";

ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "is_gluten_free" TO "isGlutenFree";

ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "spice_level" TO "spiceLevel";

ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "preparation_time" TO "preparationTime";

ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "is_active" TO "isActive";

ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "is_featured" TO "isFeatured";

ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "display_order" TO "displayOrder";

ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "created_at" TO "createdAt";

ALTER TABLE IF EXISTS "menu_items" 
RENAME COLUMN "updated_at" TO "updatedAt";

-- Fix menu_categories table
ALTER TABLE IF EXISTS "menu_categories" 
RENAME COLUMN "company_id" TO "companyId";

ALTER TABLE IF EXISTS "menu_categories" 
RENAME COLUMN "display_order" TO "displayOrder";

ALTER TABLE IF EXISTS "menu_categories" 
RENAME COLUMN "is_active" TO "isActive";

ALTER TABLE IF EXISTS "menu_categories" 
RENAME COLUMN "created_at" TO "createdAt";

ALTER TABLE IF EXISTS "menu_categories" 
RENAME COLUMN "updated_at" TO "updatedAt";

-- Fix customers table
ALTER TABLE IF EXISTS "customers" 
RENAME COLUMN "company_id" TO "companyId";

ALTER TABLE IF EXISTS "customers" 
RENAME COLUMN "created_at" TO "createdAt";

ALTER TABLE IF EXISTS "customers" 
RENAME COLUMN "updated_at" TO "updatedAt";

-- Fix inventory_items table
ALTER TABLE IF EXISTS "inventory_items" 
RENAME COLUMN "company_id" TO "companyId";

ALTER TABLE IF EXISTS "inventory_items" 
RENAME COLUMN "reorder_level" TO "reorderLevel";

ALTER TABLE IF EXISTS "inventory_items" 
RENAME COLUMN "cost_per_unit" TO "costPerUnit";

ALTER TABLE IF EXISTS "inventory_items" 
RENAME COLUMN "is_active" TO "isActive";

ALTER TABLE IF EXISTS "inventory_items" 
RENAME COLUMN "created_at" TO "createdAt";

ALTER TABLE IF EXISTS "inventory_items" 
RENAME COLUMN "updated_at" TO "updatedAt"; 