CREATE TABLE IF NOT EXISTS "create_session_request" (
	"session_id" varchar PRIMARY KEY NOT NULL,
	"discord_user_id" varchar,
	"discord_username" varchar,
	"discord_avatar" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "create_user_request" (
	"session_id" varchar,
	"discord_user_id" varchar,
	"discord_username" varchar,
	"discord_avatar" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission" (
	"id" serial PRIMARY KEY NOT NULL,
	"form_id" varchar,
	"user_id" integer,
	"data" varchar,
	"submitted_at" integer DEFAULT null
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"discord_user_id" varchar(18),
	"discord_username" varchar,
	"discord_avatar" varchar,
	CONSTRAINT "user_discord_user_id_unique" UNIQUE("discord_user_id"),
	CONSTRAINT "user_discord_username_unique" UNIQUE("discord_username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
