import { TextChannel } from "discord.js";
import { env } from "../../env";
import { db } from "../db";
import { logger } from "../logging";
import { discord } from "./discord";

discord.login(env.DISCORD_BOT_TOKEN).catch((error) => {
  logger.error("An error occured while login to discord. Error: ", error);
  process.exit(1);
});

export class Reminder {
  private static instance: Reminder;

  public static getInstance(): Reminder {
    if (!Reminder.instance) {
      Reminder.instance = new Reminder();
    }
    return Reminder.instance;
  }

  constructor() {}

  private lastExecutionTime: Date | null = null;

  public getLastExecutionTime(): Date | null {
    return this.lastExecutionTime;
  }

  public nextExecutionTime(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  }

  public async birthday() {
    logger.info("Checking birthdays ...");
    const today = new Date();
    const profiles = await db.query.profiles.findMany({
      with: { user: true },
    });

    const birthdayList = profiles.filter((profile) => {
      const birthday = profile.birthday;
      if (!birthday) return false;
      return birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth();
    });

    this.lastExecutionTime = new Date();

    if (birthdayList.length === 0) logger.info(`No one has birthday today.`);

    logger.info(`Found ${birthdayList.length} birthday(s) today.`);
    logger.info(`Birthday list: ${JSON.stringify(birthdayList)}`);
    await Promise.all(
      birthdayList.map(async (profile) => {
        const message = `Happy birthday ${profile.user.name}! 🎉🎂`;
        await sendMessage(message);
      })
    );

    async function sendMessage(message: string) {
      logger.info(`Sending message ${message} to CHANNEL ID: ${env.DISCORD_CHANNEL_ID}`);

      const channel = (await discord.channels.fetch(env.DISCORD_CHANNEL_ID)) as TextChannel;
      if (!channel) {
        logger.error("Channel not found");
        return;
      }

      try {
        await channel.send(`${message}`);
      } catch (error) {
        logger.error("An error occured while sending message to discord. Error: ", error);
      }
    }
  }
}
