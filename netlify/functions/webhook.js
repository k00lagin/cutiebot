import crypto from 'crypto';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const url = process.env.URL; // Your Netlify site URL

if (!token) {
    throw new Error('Telegram bot token is not provided!');
}

const bot = new TelegramBot(token);

function generateSecurePassword() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const securePassword = Array.from(crypto.getRandomValues(new Uint32Array(16)))
        .map(x => characters[x % characters.length])
        .join('');
    return securePassword;
}

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
];

export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);
        
        if (!body.message || !body.message.chat || !body.message.text) {
            return { statusCode: 200, body: 'OK' };
        }

        const secret_token = event.headers.get("X-Telegram-Bot-Api-Secret-Token");
        if (secret_token !== process.env.TELEGRAM_WEBHOOK_SECRET_TOKEN) {
            return { statusCode: 200, body: 'OK' };
        }

        const chatId = body.message.chat.id;
        const messageText = body.message.text.toString().toLowerCase().replace(/[^a-z]/g, '');

        if (messageText === TRIGGER_PHRASE) {
            const securePassword = generateSecurePassword();
            const message = `\`${securePassword}\`    ${CUTE_GREETINGS[Math.floor(Math.random() * CUTE_GREETINGS.length)]}`;
            await bot.sendMessage(chatId, message, { parse_mode: 'MarkdownV2' });
        }

        if (messageText === 'id') {
            await bot.sendMessage(chatId, `Your chat ID is: ${chatId}`);
        }

        return { statusCode: 200, body: 'OK' };
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: 'Internal Server Error' };
    }
};