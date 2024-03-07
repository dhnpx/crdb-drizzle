CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "discord_user_id" varchar(18) UNIQUE NOT NULL,
    "discord_username" varchar UNIQUE NOT NULL,
    "discord_avatar" varchar
);

CREATE TABLE IF NOT EXISTS "sessions" ( 
    "session_id" UUID PRIMARY KEY NOT NULL,
    "user_id" integer REFERENCES users (id)
);
CREATE TABLE IF NOT EXISTS "submissions" ( 
    "id" serial PRIMARY KEY NOT NULL,
    "form_id" varchar NOT NULL,
    "user_id" integer REFERENCES users (id),
    "data" varchar NOT NULL,
    "submitted_at" integer DEFAULT null
);
