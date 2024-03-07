import { sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial('id').primaryKey(),// not sure if theres a predetermined user id. 
    discordUserId: varchar("discord_user_id", { length: 18 }).unique(),
    discordUsername: varchar("discord_username").unique(),
    discordAvatar: varchar("discord_avatar"),
});

export const sessions= pgTable("sessions", {
    // might need to use foreign key userID instead of discord info? 
    sessionID: varchar("session_id").primaryKey(), 
    discordUserID: varchar("discord_user_id"),
    discordUsername: varchar("discord_username"),
    discordAvatar: varchar("discord_avatar"),
});

export const submissions = pgTable("submissions", {
    id: serial("id").primaryKey(),
    formID: varchar("form_id"),
    userID: integer("user_id").references(() => users.id),
    data: varchar("data"),
    submittedAt: integer("submitted_at").default(sql`null`), //unix timestamp in milliseconds. null if draft.
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertSubmission = typeof submissions.$inferInsert;
export type SelectSubmission = typeof submissions.$inferSelect;

export type InsertSession = typeof sessions.$inferInsert;
export type SelectSession = typeof sessions.$inferSelect;

