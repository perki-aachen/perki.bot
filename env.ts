import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  PORT: z
    .string()
    .refine((port) => parseInt(port) > 0 && parseInt(port) < 65536, "Invalid port number"),
  DATABASE_URL: z.string().min(1, "Database URL is required"),
  DISCORD_CHANNEL_ID: z.string().min(1, "Discord channel ID is required"),
  DISCORD_BOT_TOKEN: z.string().min(1, "Discord bot token is required"),
});

type env = z.infer<typeof envSchema>;

export const env: env = envSchema.parse(process.env);
