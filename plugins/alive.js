const { cmd } = require('../lib/command');
const os = require("os");
const config = require('../settings/settings.json');
const moment = require("moment-timezone");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions');

const qMessage = {
  key: {
    fromMe: false,
    remoteJid: "status@broadcast",
    participant: "0@s.whatsapp.net",
  },
  message: {
    contactMessage: {
      displayName: "< | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 🧚‍♀️",
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:< | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 🧚‍♀️
TEL:+94741259325
END:VCARD`
    }
  }
};

// 🔢 Convert numbers to emoji digits
function numberToEmoji(str) {
    const nums = {
        "0": "0️⃣",
        "1": "1️⃣",
        "2": "2️⃣",
        "3": "3️⃣",
        "4": "4️⃣",
        "5": "5️⃣",
        "6": "6️⃣",
        "7": "7️⃣",
        "8": "8️⃣",
        "9": "9️⃣"
    };
    return str.split("").map(c => nums[c] || c).join("");
}

cmd({
    pattern: "alive",
    alias: ["status", "online", "bot"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        // 🕒 Sri Lanka Time
        const hour = moment().tz("Asia/Colombo").hour();
        const date = moment().tz("Asia/Colombo").format("YYYY-MM-DD");  
        const time = moment().tz("Asia/Colombo").format("HH:mm:ss");   

        // 👉 Convert to emoji format
        const emojiDate = numberToEmoji(date);
        const emojiTime = numberToEmoji(time);

        let greeting;
        if (hour >= 0 && hour < 12) {
            greeting = "*┇ Ｇ𝙾𝙾𝙳 爪𝙾𝚁𝙽𝙸𝙽𝙶 🌞 ┇*";
        } else if (hour >= 12 && hour < 15) {
            greeting = "*┇ Ｇ𝙾𝙾𝙳 Ａ𝙵𝚃𝙴𝚁𝙽𝙾𝙾Ｎ ☀️ ┇*";
        } else if (hour >= 15 && hour < 18) {
            greeting = "*┇ Ｇ𝙾𝙾𝙳 乇𝚅𝙴𝙽𝙸𝙽Ｇ 🌇 ┇*";
        } else {
            greeting = "*┇ Ｇ𝙾𝙾𝙳 Ｎ𝙸𝙶𝙷Ｔ 🌙 ┇*";
        }

        // Random English quotes/messages
        const messages = [
            "*💫 Keep shining, the bot is alive and ready...!*",
            "*🔥 Energy high, problems low. I'm online...!*",
            "*✨ Life is awesome..! Bot is up and running...!*",
            "*⚡ Stay focused, stay powerful. Bot active now...!*",
            "*🌟 Happiness is key. Bot online and energized...!*",
            "*💡 Creativity flowing, assistance ready anytime...!*",
            "*🚀 Ready for action...! The bot is fully operational...!*",
            "*🎯 Target achieved: Bot is alive and kicking...!*",
            "*🌈 Spread positivity...! The bot is online...!*",
            "*⚡ Lightning fast...! Bot is ready for commands...!*",
            "*🎉 Celebration time...! The bot is up...!*",
            "*💥 Power mode ON! Bot active...!*",
            "*🌟 Star quality...! I'm online...!*",
            "*🔥 Fuelled with energy! Bot ready...!*",
            "*✨ Magic is real...! Bot alive...!*",
            "*💡 Bright ideas flowing...! Bot at your service...!*",
            "*🚀 Launch sequence complete! I'm online...!*",
            "*🎯 Aim high, bot ready to assist...!*",
            "*⚡ Shockwaves incoming...! Bot is alive...!*",
            "*🌈 Rainbow vibes...! Bot active and cheerful..!*"
        ];

        const randomMsg = messages[Math.floor(Math.random() * messages.length)];

        // 1️⃣ Send the greeting + random message
        await conn.sendMessage(from, { text: `👋 ${greeting}\n${randomMsg}` }, { quoted: mek });

        // Memory
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2); // MB
        const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // MB

        // Uptime
        const uptimeSec = os.uptime();
        const hours = Math.floor(uptimeSec / 3600);
        const minutes = Math.floor((uptimeSec % 3600) / 60);
        const seconds = Math.floor(uptimeSec % 60);

        // Platform & architecture
        const platform = os.platform();
        const arch = os.arch();

        //USER
        const senderName = m.pushName || "User"

        const status = `
👋 𝙷𝙴𝙻𝙻𝙾𝚆 *${senderName}*,

${config.ALIVE_MSG}

*╭─「 ᴅᴀᴛᴇ & ᴛɪᴍᴇ 」*
*│*📅 *Ｄᴀᴛᴇ*: 
${emojiDate}
*│*⏰ *Ｔɪᴍᴇ*: 
${emojiTime}
*╰──────────●●►*

*╭──「 ɪɴꜰᴏ 」*
*│👨‍💻 Ｏᴡɴᴇʀ :* ${config.OWNER_NAME}
*│⚡ Ｖᴇʀꜱɪᴏɴ :* 1.0.0
*│📝 Ｐʀᴇꜰɪx :* [${config.PREFIX}]
*│📳 Ｍᴏᴅᴇ :* [${config.MODE}]
*│💾 Ｒᴀᴍ :* ${usedMem}MB / ${totalMem}MB
*│🖥️ Ｐʟᴀᴛꜰᴏʀᴍ :* ${platform} (${arch})
*│⏱️ Ｕᴘᴛɪᴍᴇ :* ${hours}ｈ ${minutes}ｍ ${seconds}ｓ
*╰───────────●●►*
${config.FOOTER}`;

        let buttons = [
            {
                buttonId: ".owner",
                buttonText: { displayText: "❭❭ 𝙾𝚆𝙽𝙴𝚁 ✗" },
                type: 1
            },
            {
                buttonId: ".ping",
                buttonText: { displayText: "❭❭ 𝙿𝙸𝙽𝙶 ✗" },
                type: 1
            }
        ];

        // 2️⃣ Send image + status
        await conn.sendMessage(from, {
            buttons,
            headerType: 1,
            viewOnce: true,
            image: { url: config.ALIVE_IMG },
            caption: status,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402220977044@newsletter',
                    newsletterName: '< | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 🧚‍♀️',
                    serverMessageId: 143
                }
            }
        }, { quoted: qMessage });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});
