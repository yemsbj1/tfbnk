import axios from "axios";

const TELEGRAM_API_URL = process.env.TELEGRAM_API_URL;
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

export const TelegramSendMessage = async (message: string) => {
  try {
    const response = await axios.post(
      `${TELEGRAM_API_URL}/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message to Telegram", error);
  }
};
