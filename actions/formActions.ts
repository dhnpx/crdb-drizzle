import db from "../db/index";
import { user } from "../db/schema";

export const addUser = async (discord_user_id: string, discord_username: string, discord_avatar: string) => {
    await db.insert(user).values({
        discordUserId: discord_user_id,
        discordUsername: discord_username,
        discordAvatar: discord_avatar
    });
};

