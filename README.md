# perki.bot

Perki Bot is a TypeScript-based Discord bot designed to send birthday greetings to users in a specified Discord channel. It uses Hono as a lightweight web server, Trigger.dev for scheduling daily birthday checks, and Drizzle ORM for database management. The bot is deployed on Fly.io for reliable hosting.

## Features

- Sends automated birthday messages to a Discord channel at 9:00 AM daily.
- Built with Hono for a simple web interface (e.g., health checks).
- Supabase/PostgreSQL database integration with Drizzle ORM.
- TypeScript for type safety and modern JavaScript features.
- Deployed on Fly.io with a single instance for simplicity.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [pnpm](https://pnpm.io/) (package manager)
- [Docker](https://www.docker.com/) (for local testing and Fly.io deployment)
- [Fly.io CLI](https://fly.io/docs/hands-on/install-flyctl/) (for deployment)
- A Discord bot token and channel ID (see [Discord Developer Portal](https://discord.com/developers/applications))

## Installation

1. **Clone the Repository**

   - Run the following command in your terminal:

     ```bash
     git clone https://github.com/your-username/perki-bot.git
     ```

   - Navigate into the project directory:

     ```bash
     cd perki-bot
     ```

2. **Install Dependencies**

   - Install project dependencies using `pnpm`:

     ```bash
     pnpm install
     ```

   - This installs all required packages listed in `package.json`.

3. **Set Up Environment Variables**

   - Create a `.env` file in the project root:

     ```bash
     echo "DISCORD_BOT_TOKEN=your_discord_bot_token" > .env
     echo "DISCORD_CHANNEL_ID=your_channel_id" >> .env
     echo "TRIGGER_API_KEY=your_trigger_dev_api_key" >> .env
     ```

   - Replace the placeholders with your actual values:
     - `DISCORD_BOT_TOKEN`: Obtain from the Discord Developer Portal under your bot's "Bot" section.
     - `DISCORD_CHANNEL_ID`: Enable Developer Mode in Discord, right-click a channel, and select "Copy ID".
     - `TRIGGER_API_KEY`: Get from your Trigger.dev dashboard.

## Usage

### Local Development

1. **Build the Project**

   - Compile TypeScript files to JavaScript:

     ```bash
     pnpm run build
     ```

2. **Run the App**

   - Start the Hono server:

     ```bash
     pnpm start
     ```

   - Access it at `http://localhost:3000`.

3. **Development Mode**

   - Run with automatic recompilation on changes:

     ```bash
     pnpm run dev
     ```

### Docker

1. **Build the Docker Image**

   - Create a Docker image for the app:

     ```bash
     docker build -t perki-bot .
     ```

2. **Run the Container**

   - Start the container with environment variables:

     ```bash
     docker run -it --env-file .env -p 3000:3000 perki-bot
     ```

### Deployment to Fly.io

1. **Initialize Fly.io** (if not already done)

   - Set up the Fly.io app without deploying:

     ```bash
     fly launch --no-deploy
     ```

   - Edit `fly.toml` to set your app name and region if needed.

2. **Set Secrets**

   - Configure sensitive environment variables:

     ```bash
     fly secrets set DISCORD_BOT_TOKEN=your_discord_bot_token
     fly secrets set TRIGGER_API_KEY=your_trigger_dev_api_key
     ```

3. **Deploy**

   - Deploy the app to Fly.io:

     ```bash
     fly deploy
     ```

4. **Check Status**

   - Verify deployment and view logs:

     ```bash
     fly status
     fly logs
     ```

## Configuration

- **Database**: SQLite (`birthdays.db`) managed by Drizzle ORM.
- **Scheduling**: Trigger.dev runs the birthday check daily at 9:00 AM (`0 9 * * *`).
- **Hono**: Serves a basic endpoint at `/` for health checks.

## Debugging

- **Local Shell**

  - Access a shell inside the Docker container:

    ```bash
    docker run -it --env-file .env perki-bot /bin/bash
    ```

- **Fly.io Shell**

  - SSH into the Fly.io machine:

    ```bash
      fly ssh console
    ```

- **Logs**

  - View runtime logs:

    ```bash
    fly logs
    ```

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Hono](https://hono.dev/) for the web framework.
- [Trigger.dev](https://trigger.dev/) for task scheduling.
- [Discord.js](https://discord.js.org/) for Discord integration.
- [Fly.io](https://fly.io/) for hosting.
