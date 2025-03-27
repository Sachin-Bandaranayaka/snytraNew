-- Add Stripe fields to the user_subscriptions table
ALTER TABLE "user_subscriptions" ADD COLUMN "stripe_customer_id" text;
ALTER TABLE "user_subscriptions" ADD COLUMN "stripe_subscription_id" text; 