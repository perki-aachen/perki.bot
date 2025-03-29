import { Client, IntentsBitField } from "discord.js";

/** discord client setup. */
export const discord = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages],
});
