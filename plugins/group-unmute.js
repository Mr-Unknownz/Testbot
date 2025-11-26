const config = require('../settings/settings.json');
const { cmd, commands } = require('../lib/command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');
const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');

cmd({
    pattern: "unmute",
    alias: ["groupunmute"],
    react: "🔊",
    desc: "Unmute the group (Everyone can send messages).",
    category: "group",
    filename: __filename
},
    async (conn, mek, m, { from, isGroup, senderNumber, isAdmins, isBotAdmins, reply }) => {
        try {
            if (!isGroup) return reply("> ❌ This command can only be used in groups.");
            if (!isAdmins) return reply("> ❌ Only group admins can use this command.");
            if (!isBotAdmins) return reply("> ❌ I need to be an admin to unmute the group.");

            await conn.groupSettingUpdate(from, "not_announcement");

            let buttons = [
                {
                    buttonId: ".mute",
                    buttonText: { displayText: "❭❭ 𝙾𝚆𝙽𝙴𝚁 ✗" },
                    type: 1
                },
                {
                    buttonId: ".lock",
                    buttonText: { displayText: "❭❭ 𝙿𝙸𝙽𝙶 ✗" },
                    type: 1
                }
            ];

            const buttonMessage = {
                image: { url: config.ALIVE_IMG },
                caption: "✅ 𝐆ʀᴏᴜᴘ 𝐇ᴀꜱ 𝐁ᴇᴇɴ 𝐔ɴᴍᴜᴛᴇᴅ. 𝐄ᴠᴇʀʏᴏɴᴇ 𝐂ᴀɴ 𝐒ᴇɴᴅ 𝐌ᴇꜱꜱᴀɢᴇꜱ.",
                footer: 'ASHIYA-AI',
                buttons: buttons,
                headerType: 4 // HeaderType එක 4 විදියට සෙට් කරන්න
            };

            const sendMsg = await conn.sendMessage(
                from,
                buttonMessage,
                { quoted: mek }
            )

        } catch (e) {
            console.error("Error unmuting group:", e);
            reply("❌ Failed to unmute the group. Please try again.");
        }
    });
