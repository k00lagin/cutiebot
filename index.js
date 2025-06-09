import crypto from 'crypto';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.error('Telegram bot token is not provided!');
    console.error('Please create a .env file and add your token as TELEGRAM_BOT_TOKEN=your_token_here');
    process.exit(1);
}

function generateSecurePassword() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const securePassword = Array.from(crypto.getRandomValues(new Uint32Array(16)))
        .map(x => characters[x % characters.length])
        .join('');
    return securePassword;
}

const bot = new TelegramBot(token, { polling: true });

// Hi, cutie~
const TRIGGER_PHRASE = 'hicutie';
const CUTE_GREETINGS = [
    'hiiii',
    'heyy',
    'omg sweetie heyyy',
    'hiii 💕',
    "heeeyyy 😚",
    "haiiiiii 😳💗",
    "hiii handsome 😩💞",
    "oh em gee hiiii 🥺👉👈",
    "heyyy youuuu 😏💖",
    "uwu hii 🌸",
    "haiii bestie 😭💅",
    "h-hewwo?? 👉👈💞",
]

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (msg.text && msg.text.toString().toLowerCase().replace(/[^a-z]/g, '') === TRIGGER_PHRASE) {
        const securePassword = generateSecurePassword();
        const message = `\`${securePassword}\`    ${CUTE_GREETINGS[Math.floor(Math.random() * CUTE_GREETINGS.length)]}`;
        bot.sendMessage(chatId, message, { parse_mode: 'MarkdownV2' });
    }
});

console.log('Bot is wunning... 💕 uwu'); 