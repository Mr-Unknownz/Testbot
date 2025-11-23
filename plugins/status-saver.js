const { cmd } = require('../lib/command');
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const config = require('../settings');

cmd({
    pattern: "save",
    alias: ["ss", "statussave"],
    react: "💾",
    desc: "Save WhatsApp status",
    category: "media",
}, async (socket, msg, args) => {
    try {
        const from = msg.key.remoteJid;

        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo;
        const quoted = quotedMsg?.quotedMessage;

        if (!quoted) {
            return await socket.sendMessage(from, {
                text: `❗ *Please reply to a WhatsApp Status to save it!*\n\nExamples:\n• Reply to status → .save\n• Reply to status → .ss`
            }, { quoted: msg });
        }

        // -----------------------------
        // 1. GET SENDER NUMBER
        // -----------------------------
        const sender = quotedMsg?.participant || "Unknown";
        const senderNum = sender.split("@")[0];

        // -----------------------------
        // 2. CAPTION SUPPORT
        // -----------------------------
        const userCaption = args?.join(" ") || "";

        // -----------------------------
        // 3. DESTINATION (same-chat / inbox)
        // -----------------------------
        const sendTo = config.STATUS_SAVE_PATH === "same-chat" ? from : socket.user.id;

        let buffer, mimetype;

        // -----------------------------
        // 4. IMAGE STATUS
        // -----------------------------
        if (quoted.imageMessage) {
            const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
            buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
            mimetype = "image/jpeg";
        }
        // -----------------------------
        // 5. VIDEO STATUS
        // -----------------------------
        else if (quoted.videoMessage) {
            const stream = await downloadContentFromMessage(quoted.videoMessage, 'video');
            buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
            mimetype = "video/mp4";
        }
        // -----------------------------
        // 6. ERROR FORMAT
        // -----------------------------
        else {
            return socket.sendMessage(from, {
                text: "❌ *This status type cannot be saved!*"
            }, { quoted: msg });
        }

        // -----------------------------
        // 7. MAKE FINAL CAPTION
        // -----------------------------
        const finalCaption =
`💾 *Status Saved Successfully!*

👤 *Uploaded By:* +${senderNum}
${userCaption ? `\n📝 *Caption:*\n${userCaption}\n` : ""}

${config.FOOTER}`;

        // -----------------------------
        // 8. SEND MEDIA
        // -----------------------------
        await socket.sendMessage(sendTo, {
            [mimetype.startsWith("image") ? "image" : "video"]: buffer,
            caption: finalCaption
        }, { quoted: msg });

        // -----------------------------
        // 9. REACT TO USER
        // -----------------------------
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
