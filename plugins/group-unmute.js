const config = require('../settings/settings.json')
const { cmd } = require('../lib/command')

cmd({
    pattern: "unmute",
    alias: ["groupunmute"],
    react: "🔊",
    desc: "Unmute the group (Everyone can send messages).",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("> ❌ This command can only be used in groups.");
        if (!isAdmins) return reply("> ❌ Only group admins can use this command.");
        if (!isBotAdmins) return reply("> ❌ I need to be an admin to unmute the group.");

        // Unmute Group
        await conn.groupSettingUpdate(from, "not_announcement");

        // BUTTON SYSTEM
        if (config.BUTTON === true) {

            await conn.sendMessage(from, {
                text: "> *✅ 𝐆ʀᴏᴜᴘ 𝐇ᴀꜱ 𝐁ᴇᴇɴ 𝐔ɴᴍᴜᴛᴇᴅ. 𝐄ᴠᴇʀʏᴏɴᴇ 𝐂ᴀɴ 𝐒ᴇɴᴅ 𝐌ᴇꜱꜱᴀɢᴇꜱ.*",
                footer: "KING-SANDESH-MD",
                templateButtons: [
                    {
                        index: 1,
                        quickReplyButton: {
                            displayText: "🔕 𝚁𝙴 𝙼𝚄𝚃𝙴",
                            id: ".mute"
                        }
                    },
                    {
                        index: 2,
                        quickReplyButton: {
                            displayText: "🔐 𝙻𝙾𝙲𝙺 𝙶𝚁𝙾𝚄𝙿",
                            id: ".lock"
                        }
                    }
                ],
            }, { quoted: mek });

        } else {
            reply("> *✅ 𝐆ʀᴏᴜᴘ 𝐇ᴀꜱ 𝐁ᴇᴇɴ 𝐔ɴᴍᴜᴛᴇᴅ. 𝐄ᴠᴇʀʏᴏɴᴇ 𝐂ᴀɴ 𝐒ᴇɴᴅ 𝐌ᴇꜱꜱᴀɢᴇꜱ.*");
        }

    } catch (e) {
        console.error("Error unmuting group:", e);
        reply("❌ Failed to unmute the group. Please try again.");
    }
});
