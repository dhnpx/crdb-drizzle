import { sql } from "drizzle-orm";
import { integer, pgTable, serial, varchar, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial('id').primaryKey(),// not sure if theres a predetermined user id. 
    discordUserId: varchar("discord_user_id", { length: 18 }).unique().notNull(),
    discordUsername: varchar("discord_username").unique().notNull(),
    discordAvatar: varchar("discord_avatar").notNull(),
});

export const sessions= pgTable("sessions", {
    // might need to use foreign key userID instead of discord info? 
    sessionID: uuid("session_id").primaryKey(), 
    userID: integer("user_id").references(() => users.id).notNull(),
});

export const submissions = pgTable("submissions", {
    id: serial("id").primaryKey(),
    formID: varchar("form_id").notNull(),
    userID: integer("user_id").references(() => users.id).notNull(),
    data: varchar("data").notNull(),
    submittedAt: integer("submitted_at").default(sql`null`), //unix timestamp in milliseconds. null if draft.
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertSubmission = typeof submissions.$inferInsert;
export type SelectSubmission = typeof submissions.$inferSelect;

export type InsertSession = typeof sessions.$inferInsert;
export type SelectSession = typeof sessions.$inferSelect;

