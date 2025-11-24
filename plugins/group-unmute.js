const config = require('../settings/settings.json')
const { cmd, commands } = require('../lib/command')

cmd({
    pattern: "unmute",
    alias: ["groupunmute"],
    react: "🔊",
    desc: "Unmute the group (Everyone can send messages).",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
        if (!isGroup) return reply("> ❌ This command can only be used in groups.");
        if (!isAdmins) return reply("> ❌ Only group admins can use this command.");
        if (!isBotAdmins) return reply("> ❌ I need to be an admin to unmute the group.");

        await conn.groupSettingUpdate(from, "not_announcement");

        let textMsg = 
`✅ 𝐆ʀᴏᴜᴘ 𝐔ɴᴍᴜᴛᴇᴅ

🔊 𝐄ᴠᴇʀʏᴏɴᴇ 𝐂ᴀɴ 𝐒ᴇɴᴅ 𝐌ᴇꜱꜱᴀɢᴇꜱ 𝐍𝐨𝐰.`;

        // 🧚 Alive-style qMessage
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

        // 🔘 Buttons (Alive style)
        let buttons = [
            { buttonId: ".mute", buttonText: { displayText: "🔇 𝐌ᴜᴛᴇ 𝐆ʀᴏᴜᴘ" }, type: 1 },
            { buttonId: ".lock", buttonText: { displayText: "🔐 𝐋ᴏᴄᴋ 𝐆ʀᴏᴜᴘ" }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                buttons,
                headerType: 1,
                caption: textMsg,
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
            },
            { quoted: qMessage }
        )

    } catch (e) {
        console.error("Error in unmute:", e);
        reply("❌ Failed to unmute the group.");
    }
});
