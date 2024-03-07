import db from "../db/index";
import { user, submission } from "../db/schema";
import { eq } from "drizzle-orm";

export const addUser = async (discord_user_id: string, discord_username: string, discord_avatar: string) => {
    await db.insert(user).values({
        discordUserId: discord_user_id,
        discordUsername: discord_username,
        discordAvatar: discord_avatar
    });
};

export const createSubmission = async (id: number, formID: string, userID: number, data: string, submittedAt: number) => {
    await db.insert(submission).values({
        id: id,
        formID: formID,
        userID: userID,
        data: data,
        submittedAt: submittedAt,
    });
}

export const deleteUser = async(discordUserId: string) => {
    await db.delete(user).where(eq(user.discordUserId, discordUserId)).returning();
}
