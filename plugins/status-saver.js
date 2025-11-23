const { cmd } = require('../lib/command');
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const config = require('../settings');

cmd({
    pattern: "save",
    alias: ["send", "statussave", "dahn", "evapan", "evanoko", "Daham"],
    react: "💾",
    desc: "Save WhatsApp status by queen jusmy status saving system",
    category: "media",
}, async (socket, msg) => {
    try {
        const from = msg.key.remoteJid;
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted) {
            return await socket.sendMessage(from, {
                text: `❗ *Please reply to a WhatsApp Status to save it!*\n\n🗨️ Examples:\n• Reply to status → .save\n• Reply to status → .statussave`
            }, { quoted: msg });
        }

        const senderFull = quoted.key?.participant || from;
        let uploaderText = "";

        if (senderFull.includes("@g.us")) {
            // Group status
            const senderNumber = senderFull.split("@")[0];
            const groupMetadata = await socket.groupMetadata(senderFull).catch(() => null);
            const groupName = groupMetadata?.subject || "Unknown Group";
            uploaderText = `👥 Group: ${groupName}\n👤 Uploader: ${senderNumber}`;
        } else {
            // Private status
            const senderNumber = senderFull.split("@")[0];
            uploaderText = `👤 ${senderNumber}`;
        }

        // Destination
        const sendTo = config.STATUS_SAVE_PATH === "same-chat" ? from : socket.user.id;

        let buffer, mimetype;

        // IMAGE STATUS
        if (quoted.imageMessage) {
            const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
            buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
            mimetype = "image/jpeg";
        }
        // VIDEO STATUS
        else if (quoted.videoMessage) {
            const stream = await downloadContentFromMessage(quoted.videoMessage, 'video');
            buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
            mimetype = "video/mp4";
        }
        // UNKNOWN FORMAT
        else {
            return socket.sendMessage(from, {
                text: "❌ *This status type cannot be saved...!*"
            }, { quoted: msg });
        }

        // Send media with number + group info
        await socket.sendMessage(sendTo, {
            [mimetype.startsWith("image") ? "image" : "video"]: buffer,
            caption: `💾 *𝐒ᴀᴠᴇᴅ 𝐒ᴛᴀᴛᴜꜱ 𝐒ᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ..!*\n${uploaderText}\n\n${config.FOOTER}`
        }, { quoted: msg });

        // React to user
        await socket.sendMessage(from, {
            react: { text: "✅", key: msg.key }
        });

    } catch (e) {
        console.error(e);
        await socket.sendMessage(msg.key.remoteJid, {
            text: `⚠️ Error: ${e.message}`
        }, { quoted: msg });
    }
});
