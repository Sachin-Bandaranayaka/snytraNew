CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"industry" text,
	"address" text,
	"city" text,
	"state" text,
	"postal_code" text,
	"country" text,
	"business_size" text,
	"number_of_locations" integer,
	"tax_id" text,
	"business_registration" text,
	"expected_order_volume" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "ticket_messages" DROP CONSTRAINT "ticket_messages_ticket_id_support_tickets_id_fk";
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN "stripe_customer_id" text;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN "stripe_subscription_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "company_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "job_title" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "two_factor_enabled" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "ticket_messages" ADD CONSTRAINT "ticket_messages_ticket_id_support_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."support_tickets"("id") ON DELETE no action ON UPDATE no action;