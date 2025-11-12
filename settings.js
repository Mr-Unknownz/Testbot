const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {

SESSION_ID: process.env.SESSION_ID || 'KSMD~6tIxnTZT#DYHS9x7_iwMEWwO--Dh9Rsft2VW3fSV21iKJ06fmPDg',
MONGODB: process.env.MONGODB || "mongodb://mongo:hSKOyytRSHAikyAFUajcmkoJTEcgoBTR@trolley.proxy.rlwy.net:29757",  
PREFIX: process.env.PREFIX || '.',
ALIVE_IMG: process.env.ALIVE_IMG || 'https://files.catbox.moe/xu4725.jpg',   
FOOTER: process.env.FOOTER || '> *©卩ᴏᴡᴇʀᴇᴅ ʙʏ < | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 🧚‍♀️*',
ALIVE_MSG: process.env.ALIVE_MSG || '👾 Ｗ𝙴𝙻𝙲𝙾𝙼𝙴 𝚃𝙾 < | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 🧚‍♀️',
BOT_NAME: process.env.BOT_NAME || '< | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 🧚‍♀️',
MODE: process.env.MODE === undefined ?"groups" : process.env.MODE,
BUTTON: process.env.BUTTON || 'true',
MENTION_REPLY: process.env.MENTION_REPLY || 'true',
AUTO_REPLY: process.env.AUTO_REPLY || 'true',
AUTO_VOICE: process.env.AUTO_VOICE || 'false',
AUTO_TYPING: process.env.AUTO_TYPING || 'false',
AUTO_BIO: process.env.AUTO_BIO || 'true',
AUTO_RECORDING: process.env.AUTO_RECORDING || 'false',
ANTI_DELETE: process.env.ANTI_DELETE || 'true',
ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || 'inbox', 
OWNER_NAME: process.env.OWNER_NAME || '_Mr Unknown X Luxalgo_',
OWNER_NUMBER: process.env.OWNER_NUMBER || ['94723975388','94741259325'],
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS === undefined ?"true" : process.env.AUTO_READ_STATUS
};
