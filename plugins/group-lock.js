const config = require('../settings/settings.json')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "lockgc",
    alias: ["lock"],
    react: "🔒",
    desc: "Lock the group (Prevents new members from joining).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("> ❌ This command can only be used in groups.");
        if (!isAdmins) return reply("> ❌ Only group admins can use this command.");
        if (!isBotAdmins) return reply("> ❌ I need to be an admin to lock the group.");

        await conn.groupSettingUpdate(from, "locked");
        reply("> *✅ 𝐆ʀᴏᴜᴘ 𝐇ᴀꜱ 𝐁ᴇᴇɴ 𝐋ᴏᴄᴋᴇᴅ. 𝐍ᴇᴡ 𝐌ᴇᴍʙᴇʀꜱ 𝐂ᴀɴ'ᴛ 𝐉ᴏɪɴ.*");
    } catch (e) {
        console.error("Error locking group:", e);
        reply("❌ Failed to lock the group. Please try again.");
    }
});
    
