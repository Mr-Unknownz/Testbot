const config = require('../settings/settings.json');
const { cmd } = require('../lib/command');

cmd({
    pattern: "lock",
    alias: ["approveon","lockapprove"],
    react: "🔒",
    desc: "Enable approve-new-members mode in the group.",
    category: "group",
    filename: __filename
},
    async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply }) => {
        try {
            if (!isGroup) return reply("> ❌ 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐜𝐚𝐧 𝐨𝐧𝐥𝐲 𝐛𝐞 𝐮𝐬𝐞𝐝 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩𝐬.");
            if (!isAdmins) return reply("> ❌ 𝐎𝐧𝐥𝐲 𝐆𝐫𝐨𝐮𝐩 𝐀𝐝𝐦𝐢𝐧𝐬 𝐂𝐚𝐧 𝐔𝐬𝐞 𝐓𝐡𝐢𝐬.");
            if (!isBotAdmins) return reply("> ❌ 𝐈 𝐧𝐞𝐞𝐝 𝐀𝐝𝐦𝐢𝐧 𝐩𝐫𝐢𝐯𝐢𝐥𝐞𝐠𝐞𝐬 𝐭𝐨 𝐩𝐞𝐫𝐟𝐨𝐫𝐦 𝐭𝐡𝐢𝐬.");

            await conn.groupSettingUpdate(from, { approvalMode: true });

            reply("> ✅ *𝐆ʀᴏᴜᴘ 𝐈ꜱ 𝐋ᴏᴄᴋᴇᴅ.*\n> 🔐 𝐍ᴇᴡ 𝐌ᴇᴍʙᴇʀꜱ 𝐂ᴀɴ'ᴛ 𝐉ᴏɪɴ 𝐒ɪɴᴄᴇ 𝐀ᴅᴍɪɴ 𝐀ᴘᴘʀᴏᴠᴀʟ.");
        } catch (e) {
            console.error("Error enabling approval:", e);
            reply("❌ Failed to enable approve mode. Try again later.");
        }
    });
