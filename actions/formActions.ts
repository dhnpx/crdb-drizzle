import db from "../db/index";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

export const createUser = async (user: schema.InsertUser): Promise<schema.InsertUser[]> => {
    return await db.insert(schema.users).values(user).returning();
};

export const getUserByDiscordUserID = async (discord_user_id: schema.SelectUser["discordUserId"]): Promise<schema.SelectUser[]> => {
    const user = await db.select().from(schema.users).where(eq(schema.users.discordUserId, discord_user_id));
    return user;
}

export const getUserBySessionID = async (session_id: schema.SelectSession["sessionID"]): Promise<Array<
    {
        sessionID: schema.SelectSession["sessionID"],
        discordUserId: schema.SelectUser["discordUserId"],
        discordUsername: schema.SelectUser["discordUsername"],
        discordAvatar: schema.SelectUser["discordAvatar"]
    }>> => {
        const user = await db.select({
            sessionID: schema.sessions.sessionID,
            discordUserId: schema.users.discordUserId,
            discordUsername: schema.users.discordUsername,
            discordAvatar: schema.users.discordAvatar
        }).from(schema.users).innerJoin(schema.sessions, eq(schema.users.id, schema.sessions.userID)).where(eq(schema.sessions.sessionID, session_id));

        return user;
    }

export const deleteUser = async (discordUserId: schema.SelectUser["discordUserId"]) => {
    await db.delete(schema.users).where(eq(schema.users.discordUserId, discordUserId));
}

export const createSubmission = async (submission: schema.InsertSubmission) => {
    await db.insert(schema.submissions).values(submission);
}


export const getSubmissionByID = async (form_id: schema.SelectSubmission["formID"]): Promise<schema.SelectSubmission[]> => {
    const submission = await db.select().from(schema.submissions).where(eq(schema.submissions.formID, form_id));
    return submission;
}
export const deleteSubmissionByID = async (formID: string) => {
    await db.delete(schema.submissions).where(eq(schema.submissions.formID, formID));
}

export const createSession = async (session: schema.InsertSession) => {
    await db.insert(schema.sessions).values(session);
}

export const deleteSessionByID = async (session_id: schema.SelectSession["sessionID"]) => {
    await db.delete(schema.sessions).where(eq(schema.sessions.sessionID, session_id));
};

