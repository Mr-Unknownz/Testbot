const { cmd } = require('../lib/command');
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const config = require('../settings/settings.json');

cmd({
    pattern: "save",
    alias: ["send", "statussave", "dahn", "evapan", "evanoko", "Daham"],
    react: "💾",
    desc: "Save any WhatsApp status from anyone (Universal Status Saver)",
    category: "media",
}, async (sock, msg) => {
    try {

        const from = msg.key.remoteJid;
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        // If no reply → show example
        if (!quoted) {
            return await sock.sendMessage(from, {
                text: `❗ *Please reply to a WhatsApp Status to save it!*\n\nExamples:\n• Reply → .save`
            }, { quoted: msg });
        }

        // Detect original uploader
        const participant = msg.message.extendedTextMessage.contextInfo.participant || "Unknown";
        const uploader = participant.split("@")[0];

        // BOT number detect
        const botNumber = sock.user.id.split(":")[0];

        // Destination handling
        let sendTo;

        // If uploader is bot → ALWAYS same chat
        if (uploader === botNumber) {
            sendTo = from;
        } else {
            // normal status → config rule
            sendTo = config.STATUS_SAVE_PATH === "same-chat"
                ? from
                : sock.user.id;
        }

        let buffer, type;

        // IMAGE
        if (quoted.imageMessage) {
            const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
            buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
            type = "image";
        }
        // VIDEO
        else if (quoted.videoMessage) {
            const stream = await downloadContentFromMessage(quoted.videoMessage, 'video');
            buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
            type = "video";
        }
        // Unsupported
        else {
            return sock.sendMessage(from, {
                text: "❌ *Unsupported status type!*"
            }, { quoted: msg });
        }

        // Send the saved media
        await sock.sendMessage(sendTo, {
            [type]: buffer,
            caption: `💾 *Status Saved!*\n👤 Uploader: ${uploader}\n\n${config.FOOTER}`
        }, { quoted: msg });

        // React
        await sock.sendMessage(from, {
            react: { key: msg.key, text: "✅" }
        });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(msg.key.remoteJid, {
            text: "⚠️ Error: " + err.message
        }, { quoted: msg });
    }
});
