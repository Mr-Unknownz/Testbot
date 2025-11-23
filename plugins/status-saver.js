const { cmd } = require('../lib/command');
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const config = require('../settings');

cmd({
    pattern: "save",
    alias: ["ss", "statussave"],
    react: "💾",
    desc: "Save WhatsApp status",
    category: "media",
}, async (socket, msg) => {
    try {
        const from = msg.key.remoteJid;
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted) {
            return await socket.sendMessage(from, {
                text: `❗ *Please reply to a WhatsApp Status to save it!*\n\nExamples:\n• Reply to status → .save\n• Reply to status → .ss`
            }, { quoted: msg });
        }

        // Who posted the status
        const senderNumber = quoted.key?.participant || from;

        // destination
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
                text: "❌ *This status type cannot be saved!*"
            }, { quoted: msg });
        }

        // SEND MEDIA TO LOCATION WITH NUMBER INFO
        await socket.sendMessage(sendTo, {
            [mimetype.startsWith("image") ? "image" : "video"]: buffer,
            caption: `💾 *Saved status successfully!*\n👤 From: ${senderNumber}`
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
