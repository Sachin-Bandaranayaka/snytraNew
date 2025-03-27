CREATE TABLE "support_tickets" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "subject" text NOT NULL,
    "description" text NOT NULL,
    "status" text DEFAULT 'open',
    "priority" text DEFAULT 'medium',
    "category" text NOT NULL,
    "assigned_to" integer,
    "last_reply_by" text DEFAULT 'user',
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

CREATE TABLE "ticket_messages" (
    "id" serial PRIMARY KEY NOT NULL,
    "ticket_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "message" text NOT NULL,
    "is_internal" boolean DEFAULT false,
    "attachments" text,
    "created_at" timestamp DEFAULT now()
);

ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;

ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;

ALTER TABLE "ticket_messages" ADD CONSTRAINT "ticket_messages_ticket_id_support_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."support_tickets"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "ticket_messages" ADD CONSTRAINT "ticket_messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action; 