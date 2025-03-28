CREATE TABLE "system_settings" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" text NOT NULL,
    "value" text NOT NULL,
    "description" text,
    "category" text DEFAULT 'general',
    "updated_by" integer,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    CONSTRAINT "system_settings_key_unique" UNIQUE("key")
);

ALTER TABLE "system_settings" ADD CONSTRAINT "system_settings_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;

-- Insert default settings
INSERT INTO "system_settings" ("key", "value", "description", "category") 
VALUES ('maintenance_mode', 'false', 'When enabled, the site displays a maintenance page to all non-admin users', 'system');

INSERT INTO "system_settings" ("key", "value", "description", "category") 
VALUES ('maintenance_message', 'We are currently performing scheduled maintenance. Please check back soon.', 'Message displayed on the maintenance page', 'system'); 