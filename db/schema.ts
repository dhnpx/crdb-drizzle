import { sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: serial('id').primaryKey(),// not sure if theres a predetermined user id. 
    discordUserId: varchar("discord_user_id", { length: 18 }).unique(),
    discordUsername: varchar("discord_username").unique(),
    discordAvatar: varchar("discord_avatar"),
});

export const createSessionRequest = pgTable("create_session_request", {
    // might need to use foreign key userID instead of discord info? 
    sessionID: varchar("session_id").primaryKey(), 
    discordUserID: varchar("discord_user_id"),
    discordUsername: varchar("discord_username"),
    discordAvatar: varchar("discord_avatar"),
});

export const submission = pgTable("submission", {
    id: serial("id").primaryKey(),
    formID: varchar("form_id"),
    userID: integer("user_id").references(() => user.id),
    data: varchar("data"),
    submittedAt: integer("submitted_at").default(sql`null`), //unix timestamp in milliseconds. null if draft.
    
});

export const createUserRequest = pgTable("create_user_request", {
    sessionID: varchar("session_id"),
    discordUserID: varchar("discord_user_id"),
    discordUsername: varchar("discord_username"),
    discordAvatar: varchar("discord_avatar"),
});
