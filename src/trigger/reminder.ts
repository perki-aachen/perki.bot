import { logger, schedules } from "@trigger.dev/sdk/v3";
import { TextChannel } from "discord.js";
import { env } from "../../env";
import { db } from "../db";
import { ProfileWithUser } from "../db/schema";
import { discord } from "../utils/discord";

export const reminder = schedules.task({
  id: "birthday-reminder-task",
  // Every hour
  cron: "0 * * * *",
  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
  run: async (payload, { ctx }) => {
    // The payload contains the last run timestamp that you can use to check if this is the first run
    // And calculate the time since the last run
    const distanceInMs =
      payload.timestamp.getTime() - (payload.lastTimestamp ?? new Date()).getTime();

    const today = new Date();
    const profileList = await db.query.profiles.findMany({
      with: { user: true },
    });

    const birthdayProfiles = profileList.filter((profile) => {
      const birthday = profile.birthday;
      if (!birthday) return false;
      return birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth();
    });

    for (const profile of birthdayProfiles) {
      await sendBirthdayMessage(profile);
    }
  },
});

async function sendBirthdayMessage(profile: ProfileWithUser) {
  logger.info(`Happy birthday to ${profile.user.name}!`);
  const channel = discord.channels.cache.get(env.DISCORD_CHANNEL_ID) as TextChannel;
  if (!channel) {
    console.error("Channel not found");
    return;
  }

  await channel.send(`Happy birthday ${profile.user.name}! 🎉🎂`);
}
