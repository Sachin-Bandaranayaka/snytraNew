-- Add missing hourly_rate column to users table
ALTER TABLE "users" 
ADD COLUMN IF NOT EXISTS "hourly_rate" INTEGER; 