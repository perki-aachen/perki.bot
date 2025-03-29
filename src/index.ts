import { serve } from "@hono/node-server";
import figlet from "figlet";
import { Hono } from "hono";
import schedule from "node-schedule";
import { db } from "./db";
import { logger } from "./logging";
import { Reminder } from "./utils/reminder.birthday";

const app = new Hono();
const reminder = Reminder.getInstance();

app.get("/", (c) => {
  return c.text(figlet.textSync("perki.bot"));
});

app.get("/profiles", async (c) => {
  const profiles = await db.query.profiles.findMany({ with: { user: true } });
  return c.json({ profiles: [...profiles] });
});

// schedule the background job to run daily at midnight
schedule.scheduleJob("0 0 * * *", reminder.birthday);

const port = 3000;
logger.info(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
