DROP TABLE "create_user_request";--> statement-breakpoint
ALTER TABLE "create_session_request" RENAME TO "sessions";--> statement-breakpoint
ALTER TABLE "submission" RENAME TO "submissions";--> statement-breakpoint
ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_discord_user_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_discord_username_unique";--> statement-breakpoint
ALTER TABLE "submissions" DROP CONSTRAINT "submission_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "session_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "discord_user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "discord_username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "discord_avatar" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "submissions" ALTER COLUMN "form_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "submissions" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "submissions" ALTER COLUMN "data" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "discord_user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "discord_username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "discord_avatar" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_discord_user_id_unique" UNIQUE("discord_user_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_discord_username_unique" UNIQUE("discord_username");