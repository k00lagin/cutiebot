# CutieBot

A peak security password generator Telegram bot that provides a super secure password.

## How to Use

1.  Find the [bot](https://t.me/bottomcutiebot) on Telegram.
2.  Send the message `Hi, cutie~`.
3.  The bot will reply with a secure, randomly generated password!

## Self-Hosting as a node app

You can host your own instance of CutieBot by following these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/k00lagin/cutiebot.git
cd cutiebot
```

### 2. Install Dependencies

Install the required Node.js packages using npm:

```bash
npm install
```

### 3. Get a Telegram Bot Token

You'll need a token to authenticate your bot with the Telegram API.

1.  Open your Telegram app and search for **@BotFather**.
2.  Start a chat with BotFather and send the `/newbot` command.
3.  Follow the prompts to choose a name and username for your bot.
4.  BotFather will provide you with an API token. Keep this token secure!

### 4. Configure Environment Variables

Create a `.env` file in the root of the project directory to store your bot token:

```
TELEGRAM_BOT_TOKEN=your_token_here
```

Replace `your_token_here` with the token you received from BotFather.

### 5. Run the Bot

Start the bot with the following command:

```bash
node index.js
```

Your bot is now running! You can interact with it on Telegram.
