const config = require('../settings/settings.json')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

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

        await conn.sendMessage(from, {
            text: "✅ 𝐆ʀᴏᴜᴘ 𝐇ᴀꜱ 𝐁ᴇᴇɴ 𝐔ɴᴍᴜᴛᴇᴅ.\n𝐄ᴠᴇʀʏᴏɴᴇ 𝐂ᴀɴ 𝐒ᴇɴᴅ 𝐌ᴇꜱꜱᴀɢᴇꜱ.",
            buttons: [
                {
                    buttonId: "mute",
                    buttonText: { displayText: "🔇 Mute Group" },
                    type: 1
                },
                {
                    buttonId: "lockgroup",
                    buttonText: { displayText: "🔒 Lock Group" },
                    type: 1
                }
            ],
            headerType: 1
        });

    } catch (e) {
        console.error("Error unmuting group:", e);
        reply("❌ Failed to unmute the group. Please try again.");
    }
});
