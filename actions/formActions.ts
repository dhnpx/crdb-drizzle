import db from "../db/index";
import { users, submissions, InsertUser,SelectUser, InsertSubmission, SelectSubmission} from "../db/schema";
import { eq } from "drizzle-orm";

export const createUser = async (user: InsertUser) => {
    await db.insert(users).values(user);
};

export const getUserByDiscordUserID = async (discord_user_id: string) => {
    const user =  await db.select().from(users).where(eq(users.discordUserId, discord_user_id));
    return user;
}

export const deleteUser = async(discordUserId: string) => {
    await db.delete(users).where(eq(users.discordUserId, discordUserId));
}

export const createSubmission = async (submission: InsertSubmission) => {
    await db.insert(submissions).values(submission);
}


export const getSubmissionByID = async (form_id: SelectSubmission["formID"]) : Promise<SelectSubmission> => {
    const submission = await db.select().from(submissions).where(eq(submissions.formID, form_id));
    return submission;
}
export const deleteSumissionByID = async (formID: string) => {
    await db.delete(submissions).where(eq(submissions.formID, formID));
}


