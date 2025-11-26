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
    if (!isGroup) return reply("> ❌ 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬 𝐨𝐧𝐥𝐲.");
    if (!isAdmins) return reply("> ❌ 𝐎𝐧𝐥𝐲 𝐆𝐫𝐨𝐮𝐩 𝐀𝐝𝐦𝐢𝐧𝐬 𝐂𝐚𝐧 𝐔𝐬𝐞 𝐓𝐡𝐢𝐬.");
    if (!isBotAdmins) return reply("> ❌ 𝐈 𝐧𝐞𝐞𝐝 𝐀𝐝𝐦𝐢𝐧 𝐩𝐨𝐰𝐞𝐫𝐬.");

    await conn.groupSettingUpdate(from, { allowNonAdminInvites: false });

    reply("> 🔒 *𝐆ʀᴏᴜᴘ 𝐀𝐩𝐩𝐫𝐨𝐯𝐞 𝐌𝐨𝐝𝐞 𝐄ɴ𝐚𝐛𝐥𝐞𝐝*\n> ✅ 𝐀𝐝𝐦𝐢𝐧 𝐚𝐩𝐩𝐫𝐨𝐯𝐚𝐥 𝐢𝐬 𝐧𝐨𝐰 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐝 𝐟𝐨𝐫 𝐣𝐨𝐢𝐧𝐬.");
} catch (e) {
    console.error(e);
    reply("❌ Failed to enable approve mode.");
}
});
